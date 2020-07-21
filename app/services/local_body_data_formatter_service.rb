# frozen_string_literal: true

class LocalBodyDataFormatterService
  def run!
    {
      districts: districts,
      data: generate_district_wise_data,
    }
  end

  def generate_district_wise_data
    h = {}
    districts.each do |district|
      district_id = district[0]
      lb_types    = sort(local_body_types_by_district(district_id))

      hx = { types: lb_types, data: {} }

      lb_types.each do |lb_type|
        hx[:data][lb_type] = local_bodies_by_district_and_type(district_id, lb_type)
      end

      h[district_id] = hx
    end
    h
  end

  def districts
    @_districts ||= LocalBody.select("distinct(district_id), district_name").map do |lb|
      [lb.district_id, lb.district_name]
    end.to_h
  end

  def local_bodies_by_district(district_id)
    all_local_bodies[district_id]
  end

  def all_local_bodies
    @_all_local_bodies ||= LocalBody.all.group_by(&:district_id)
  end

  def local_body_types_by_district(district_id)
    all_local_bodies[district_id].map { |lb| lb[:lb_type] }.uniq.reject { |x| x == "District" }
  end

  def local_bodies_by_district_and_type(district_id, lb_type)
    all_local_bodies[district_id].select { |lb| lb.lb_type == lb_type }.map { |lb| format_lb(lb) }
  end

  def format_lb(lb)
    lb.attributes.slice("lb_name_english", "lb_code")
  end

  def sort(lb_types)
    sort_weightage = {
      "Corporation" => 1,
      "Muncipality" => 2,
      "Block Panchayat" => 3,
      "Grama Panchayat" => 4
    }

    lb_types.sort { |lb_type1, lb_type2| sort_weightage[lb_type1] <=> sort_weightage[lb_type2] }
  end
end