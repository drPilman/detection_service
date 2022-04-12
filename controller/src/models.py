from pydantic import BaseModel


class RSTP_URL(BaseModel):
    url: str


class SHA_ID(BaseModel):
    full_id: str


class ResultData(BaseModel):
    """
    {идентификатор обработчика,
    номер фрейма,
    время обработки,
    [[id, class ,probability, x, y, w, h], [id, class, probability, x, y, w, h], ...]}
    """
    full_id: str
    frame_id: int
    time_spent: float
    detections: list[list[int, int, float, float, float, float, float]]

    def __repr__(self):
        return f"{self.full_id} {self.frame_id} detect {'|'.join(','.join(str(x)) for x in self.detections)}"
