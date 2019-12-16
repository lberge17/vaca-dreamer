class Vacation < ApplicationRecord
    has_many :stays
    has_many :activities

    validates :title, presence: true
    validates :username, presence: true
    validates :transportation, presence: true
    validates :category, presence: true, inclusion: { in: ['beach', 'family fun', 'romantic', 'nature', 'historic', 'large group'] }
end
