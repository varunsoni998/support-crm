from datetime import datetime

from fastapi import (
    FastAPI,
    Query,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
from sqlalchemy import or_

from database import engine, SessionLocal
from models import Base, Ticket
from schemas import TicketCreate, TicketUpdate

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Support CRM")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Support CRM API Running"
    }


@app.post("/api/tickets")
def create_ticket(ticket: TicketCreate):

    db: Session = SessionLocal()

    try:

        ticket_count = db.query(Ticket).count() + 1

        new_ticket = Ticket(
            ticket_id=f"TKT-{ticket_count:03}",
            customer_name=ticket.customer_name,
            customer_email=ticket.customer_email,
            subject=ticket.subject,
            description=ticket.description,
            status="Open"
        )

        db.add(new_ticket)
        db.commit()
        db.refresh(new_ticket)

        return {
            "ticket_id": new_ticket.ticket_id,
            "status": new_ticket.status
        }

    finally:
        db.close()


@app.get("/api/tickets")
def get_all_tickets(
    status: str = Query(None),
    search: str = Query(None)
):

    db: Session = SessionLocal()

    try:

        query = db.query(Ticket)

        if status:
            query = query.filter(
                Ticket.status == status
            )

        if search:
            query = query.filter(
                or_(
                    Ticket.ticket_id.contains(search),
                    Ticket.customer_name.contains(search),
                    Ticket.customer_email.contains(search),
                    Ticket.subject.contains(search),
                    Ticket.description.contains(search)
                )
            )

        return query.all()

    finally:
        db.close()


@app.get("/api/tickets/{ticket_id}")
def get_ticket(ticket_id: str):

    db: Session = SessionLocal()

    try:

        ticket = (
            db.query(Ticket)
            .filter(Ticket.ticket_id == ticket_id)
            .first()
        )

        if not ticket:
            raise HTTPException(
                status_code=404,
                detail="Ticket not found"
            )

        return ticket

    finally:
        db.close()


@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    data: TicketUpdate
):

    db: Session = SessionLocal()

    try:

        ticket = (
            db.query(Ticket)
            .filter(Ticket.ticket_id == ticket_id)
            .first()
        )

        if not ticket:
            raise HTTPException(
                status_code=404,
                detail="Ticket not found"
            )

        ticket.status = data.status
        ticket.updated_at = datetime.utcnow()

        db.commit()
        db.refresh(ticket)

        return {
            "success": True,
            "ticket_id": ticket.ticket_id,
            "status": ticket.status,
            "updated_at": ticket.updated_at
        }

    finally:
        db.close()