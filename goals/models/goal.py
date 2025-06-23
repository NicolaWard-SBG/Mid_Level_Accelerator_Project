from dataclasses import dataclass
from datetime import datetime

@dataclass
class Goal:
    user_id: str
    goal_type: str
    date: datetime
    status: str = 'in-progress'

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'goal_type': self.goal_type,
            'date': self.date.isoformat(),
            'status': self.status
        }

    @classmethod
    def from_dict(cls, data):
        goal_date = datetime.fromisoformat(data['date'])
        return cls(
            user_id=data['user_id'],
            goal_type=data['goal_type'],
            date=goal_date,
            status=data.get('status', 'in-progress')
        )