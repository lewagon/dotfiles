require 'date'
require 'yaml'
SSN_PATTERN = /^(?<gender>[12])\s?(?<year>\d{2})\s?(?<month>0[1-9]|1[0-2])\s?(?<zip>\d{2}|2[AB])\s?(\d{3})\s?(\d{3})\s?(?<key>\d{2})$/

def french_ssn_info(ssn)
  match_data = ssn.match(SSN_PATTERN)
  if match_data && valid_key?(ssn, match_data[:key])
    gender = gender(match_data[:gender])
    month = month(match_data[:month])
    year = "19#{match_data[:year]}"
    department = department(match_data[:zip])
    return "a #{gender}, born in #{month}, #{year} in #{department}."
  else
    return "The number is invalid"
  end
end

def gender(code)
  return code == "1" ? "man" : "woman"
end

def month(code)
  return Date::MONTHNAMES[code.to_i]
end

def department(code)
  return YAML.load_file('data/french_departments.yml')[code]
end

def valid_key?(ssn, key)
  return (97 - ssn.delete(' ')[0..12].to_i) % 97 == key.to_i
end
