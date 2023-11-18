from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Game(db.Model):
    __tablename__ = 'Games'

    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(), unique=True, nullable=False)

    Cards = db.relationship('Card', back_populates='Game', lazy=True)

    def to_dict(self):
        return {'id': self.Id, 'name': self.Name}

    def __repr__(self):
        return f'<Game {self.Name}>'


class Set(db.Model):
    __tablename__ = 'Sets'

    Id = db.Column(db.Integer, primary_key=True)
    GameId = db.Column(db.Integer)
    Name = db.Column(db.String(255))

    Cards = db.relationship('Card', back_populates='Set', lazy=True)

    def __repr__(self):
        return f'<Card {self.Name}>'


class Card(db.Model):
    __tablename__ = 'Cards'

    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255))
    CardNumber = db.Column(db.String(255))
    CardTypeId = db.Column(db.Integer)
    RarityId = db.Column(db.Integer)
    ImageUrl = db.Column(db.String(255))
    Description = db.Column(db.String(255))

    Set = db.relationship('Set', back_populates='Cards')
    SetId = db.Column(db.Integer, db.ForeignKey('Sets.Id'))

    Game = db.relationship('Game', back_populates='Cards')
    GameId = db.Column(db.Integer, db.ForeignKey('Games.Id'))

    def to_dict(self):
        return {
            'id': self.Id,
            'name': self.Name,
            'cardNumber': self.CardNumber,
            'gameId': self.GameId,
            'cardTypeId': self.CardTypeId,
            'rarityId': self.RarityId,
            'setId': self.SetId,
            'imageUrl': self.ImageUrl,
            'description': self.Description
        }

    def __repr__(self):
        return f'<Card {self.Name}>'
