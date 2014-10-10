def tell(who, &message_blk)
  # TODO: return message addressed to who
end

def tell_mum(&message_blk)
  # TODO: return message addressed to your mum
  # => Should call #tell of course
end

def tell_with_proc(who, message_blk)
  # TODO: return message addressed to who
  # => Message is passed as Proc, not as block
end

def tell_mum_with_proc(message_blk)
  # TODO: return message addressed to your mum
  # => Should call #tell_with_proc of course
end