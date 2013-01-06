# coding: UTF-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def register_product(info)
  product = Product.find_or_create_by_name(info[:name])
  product.update_attributes(info)
end

register_product(
  { name:"トイレットペーパー",
    rate:1,
    amount_unit:"m",
    group_unit:"ロール" })

register_product(
  { name:"ウインナー",
    rate:100,
    amount_unit:"g",
    group_unit:"パック" })

register_product(
  { name:"のり",
    rate:1,
    amount_unit:"枚",
    group_unit:"パック" })

register_product(
  { name:"箱テッシュ",
    rate:1,
    amount_unit:"枚",
    group_unit:"箱" })

