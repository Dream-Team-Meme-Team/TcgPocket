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

    def to_dict(self):
        return {
            'id': self.Id,
            'name': self.Name,
            'gameId': self.GameId,
        }

    def __repr__(self):
        return f'<Card {self.Name}>'


class CardType(db.Model):
    __tablename__ = 'CardTypes'

    Id = db.Column(db.Integer, primary_key=True)
    GameId = db.Column(db.Integer)
    Name = db.Column(db.String(255))

    Cards = db.relationship('Card', back_populates='CardType', lazy=True)

    def to_dict(self):
        return {
            'id': self.Id,
            'name': self.Name,
            'gameId': self.GameId,
        }

    def __repr__(self):
        return f'<CardType {self.Name}>'


class Rarity(db.Model):
    __tablename__ = 'Rarities'

    Id = db.Column(db.Integer, primary_key=True)
    GameId = db.Column(db.Integer)
    Name = db.Column(db.String(255))

    Cards = db.relationship('Card', back_populates='Rarity', lazy=True)

    def to_dict(self):
        return {
            'id': self.Id,
            'name': self.Name,
            'gameId': self.GameId,
        }

    def __repr__(self):
        return f'<Rarity {self.Name}>'


class Card(db.Model):
    __tablename__ = 'Cards'

    Id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255))
    CardNumber = db.Column(db.String(255))
    ImageUrl = db.Column(db.String(255))
    Description = db.Column(db.String(255))

    Rarity = db.relationship('Rarity', back_populates='Cards')
    RarityId = db.Column(db.Integer, db.ForeignKey('Rarities.Id'))

    CardType = db.relationship('CardType', back_populates='Cards')
    CardTypeId = db.Column(db.Integer, db.ForeignKey('CardTypes.Id'))

    Set = db.relationship('Set', back_populates='Cards')
    SetId = db.Column(db.Integer, db.ForeignKey('Sets.Id'))

    Game = db.relationship('Game', back_populates='Cards')
    GameId = db.Column(db.Integer, db.ForeignKey('Games.Id'))

    def to_dict(self):
        return {
            'id': self.Id,
            'name': self.Name,
            'cardNumber': self.CardNumber,
            'game': self.Game.to_dict(),
            'cardType': self.CardType.to_dict(),
            'rarity': self.Rarity.to_dict(),
            'set': self.Set.to_dict(),
            'imageUrl': self.ImageUrl,
            'description': self.Description,
            'attributes': []
        }

    def __repr__(self):
        return f'<Card {self.Name}>'
