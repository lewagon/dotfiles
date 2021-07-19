require "date"
require "yaml"

def french_ssn_infos(ssn)
  trimmed_ssn = ssn.delete(" ")
  return "invalid number" unless trimmed_ssn.length == 15 && valid_key?(trimmed_ssn)

  gender_code = trimmed_ssn[0]
  year_code = trimmed_ssn[1..2]
  month_code = trimmed_ssn[3..4]
  department_code = trimmed_ssn[5..6]
  check_key = trimmed_ssn[-2..-1]

  "a #{gender(gender_code)} born in #{month(month_code)} 19#{year_code} in #{department(department_code)}"
end

def gender(code)
  code == "1" ? "man" : "woman"
end

def month(code)
  return Date::MONTHNAMES[code.to_i]
end

def department(code)
  YAML.load_file('data/french_departments.yml')[code]
end

def valid_key?(trimmed_ssn)
  (97 - trimmed_ssn[0..12].to_i) % 97 == trimmed_ssn[13..14].to_i
end
