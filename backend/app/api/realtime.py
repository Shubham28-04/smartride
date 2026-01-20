from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List

router = APIRouter(prefix="/realtime", tags=["Realtime"])

# Store connected drivers
connected_drivers: List[WebSocket] = []


@router.websocket("/drivers")
async def driver_demand_socket(websocket: WebSocket):
    await websocket.accept()
    connected_drivers.append(websocket)

    try:
        while True:
            # keep connection alive
            await websocket.receive_text()

    except WebSocketDisconnect:
        connected_drivers.remove(websocket)


# Utility function to notify drivers
async def notify_drivers(data: dict):
    for driver in connected_drivers:
        await driver.send_json(data)
