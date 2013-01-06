# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130106083639) do

  create_table "products", :force => true do |t|
    t.string   "name"
    t.float    "rate"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "amount_unit"
    t.string   "group_unit"
    t.float    "default_amount"
    t.integer  "default_group"
    t.integer  "default_price"
  end

  create_table "shops", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "unitprices", :force => true do |t|
    t.integer  "price"
    t.float    "amount"
    t.float    "unit"
    t.integer  "product_id"
    t.integer  "shop_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "group"
  end

end
