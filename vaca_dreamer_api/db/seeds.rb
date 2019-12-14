# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create_table "activities", force: :cascade do |t|
#     t.integer "vacation_id"
#     t.string "title"
#     t.text "description"
#     t.string "address"
#     t.string "city"
#     t.string "cost"
#     t.boolean "family_friendly"
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#     t.index ["vacation_id"], name: "index_activities_on_vacation_id"
#   end

#   create_table "stays", force: :cascade do |t|
#     t.integer "vacation_id"
#     t.string "name"
#     t.string "city"
#     t.string "state"
#     t.string "country"
#     t.boolean "family_friendly"
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#     t.string "cost"
#     t.string "#<ActiveRecord::ConnectionAdapters::SQLite3::TableDefinition:0x00007fd340efe4d8>"
#     t.index ["vacation_id"], name: "index_stays_on_vacation_id"
#   end

Vacation.destroy_all
Stay.destroy_all
Activity.destroy_all

vaca = Vacation.create(title: "Beach Fun",username: 'awbfou2',category: 'beach',transportation: 'rental car/public transport')

act = Activity.create(title: 'beach volleyball',description: 'play beach volleyball along the ocean with tourists and locals',address: 'South Beach',city: 'Miami Beach',cost: 'N/A',family_friendly: true)
act.vacation = vaca
act.save
act_two = Activity.create(title: 'shopping',description: 'take a break with a shopping trip in the Miami Design District',address: 'Design District',city: 'Miami',cost: '$$$$',family_friendly: true)
act_two.vacation = vaca
act_two.save
act_three = Activity.create(title: 'chill beach side',description: 'North Beach is a lot quieter and less packed than South Beach if you want some quiet time to chill or read a book',address: 'North Beach',city: 'Miami Beach',cost: 'N/A', family_friendly: true)
act_three.vacation = vaca
act_three.save

stay = Stay.create(name: "Cardozo South Beach",address: "1300 Ocean Dr",city: 'Miami Beach',state: 'FL',country: 'USA',family_friendly: true,cost: '$$$$')
stay.vacation = vaca
stay.save