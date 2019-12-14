# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_14_154542) do

  create_table "activities", force: :cascade do |t|
    t.integer "vacation_id"
    t.string "title"
    t.text "description"
    t.string "address"
    t.string "city"
    t.string "cost"
    t.boolean "family_friendly"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["vacation_id"], name: "index_activities_on_vacation_id"
  end

  create_table "stays", force: :cascade do |t|
    t.integer "vacation_id"
    t.string "name"
    t.string "city"
    t.string "state"
    t.string "country"
    t.boolean "family_friendly"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "cost"
    t.string "#<ActiveRecord::ConnectionAdapters::SQLite3::TableDefinition:0x00007fd340efe4d8>"
    t.index ["vacation_id"], name: "index_stays_on_vacation_id"
  end

  create_table "vacations", force: :cascade do |t|
    t.string "title"
    t.string "username"
    t.string "category"
    t.string "transportation"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
