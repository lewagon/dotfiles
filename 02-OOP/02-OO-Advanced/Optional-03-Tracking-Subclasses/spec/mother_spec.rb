require "mother"

BONUS = <<-eos

                                               .=""%   ..
                                          *m            !
                                           !s>           `
                                           MJ .   .       %
                                            X:%   f       4
                                            #%~"h 4>      '
                                            f4F` "N^\     '
                                         !`    +   4':    '>
                                          `R :"     h'  4  4
                                            \\.c     !    .  :
                                                `^$ >    !  '>
                                                  'f     !   +
                                                  '          '
                                                  z           >
                                                :.?.   .     '
                                              >\\~  >  :F:   !F
                                     ..  ..=">~   '> "  "> d`
                                    k"  "+f`    .4 t!    !K  '<
                                    L*\  .L  uf`    K \\   \\     "=
                                .=" >~                 ?           \\
..............................` .~`                     >           !
'L  .:="`    `       '="   :.r?                         >           '
   !                       `  !                        :            '
   '                         <                        :            :"
    !                      :'                         ~           f
    ''                    :\\~                        <           F
     >\\                   f!                         >          'L
     ~.                   '                          >           '>
         #Fx        :"#                             'ux::.':      `
           \\`.   .f>"                               !    ~ "%$P"``h
            'x"r)~                                 '    "     `.   k
            .~) \\                          ..      f   ~        h  '
      .oeur`r   \\'x                       ! ^%k..="  :           "  ':
    dP`  `#b     'x8P"""$k                  "+      /             '   "<
   'R  ..  9k     @f     ?&                    % ..!              f    "
   '$      8F     $   "  '$                                    .r"    C.
    "$ou.o$F      "$LSvyx$"                                     .  . /


eos

class Daughter < Mother
  @phoned = false

  class << self
    attr_accessor :phoned
  end

  def self.phone
    self.phoned = true
  end
end

class Son < Mother
  @phoned = false

  class << self
    attr_accessor :phoned
  end

  def self.phone
    self.phoned = true
  end
end

class RandomClass < Mother
  @phoned = false

  class << self
    attr_accessor :phoned
  end

  def self.phone
    self.phoned = true
  end
end

describe Mother do
  before(:each) do
    Daughter.phoned = false
    Son.phoned = false
    RandomClass.phoned = false
  end

  describe "#phone_kids" do
    it "should phone kids" do
      Mother.phone_kids
      expect(Son.phoned).to eq true
      expect(Daughter.phoned).to eq true
      expect(RandomClass.phoned).to eq true
    end
  end
end
