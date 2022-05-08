from pydantic import BaseModel


class RSTP_URL(BaseModel):
    url: str


class Tracker(BaseModel):
    id: int


class Bbox(BaseModel):
    obj_id: int
    name: str
    conf: float
    xyxy: list  #[int, int, int, int]


class ResultData(BaseModel):
    """
    {идентификатор обработчика,
    номер фрейма,
    время обработки,
    [Bbox, Bbox, ...]}
    """
    container_id: str
    frame_id: int
    time_spent: float
    detections: list  #[Bbox]
