class Vacation < ApplicationRecord
    has_many :stays
    has_many :activities
end
