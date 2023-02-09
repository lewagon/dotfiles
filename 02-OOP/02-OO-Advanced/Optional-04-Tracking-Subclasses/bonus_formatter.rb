RSpec::Support.require_rspec_core 'formatters/base_text_formatter'

class BonusFormatter < RSpec::Core::Formatters::DocumentationFormatter
  RSpec::Core::Formatters.register self, :dump_summary

  def dump_summary(notification)
    output.puts BONUS if notification.failure_count.zero?
    super notification
  end
end


BONUS = "

                                               .=\"\"%   ..
                                          *m            !
                                           !s>           `
                                           MJ .   .       %
                                            X:%   f       4
                                            #%~\"h 4>      '
                                            f4F` \"N^     '
                                         !`    +   4':    '>
                                          `R :\"     h'  4  4
                                            \\.c     !    .  :
                                                `^$ >    !  '>
                                                  'f     !   +
                                                  '          '
                                                  z           >
                                                :.?.   .     '
                                              >\\~  >  :F:   !F
                                     ..  ..=\">~   '> \"  \"> d`
                                    k\"  \"+f`    .4 t!    !K  '<
                                    L*  .L  uf`    K \\   \\     \"=
                                .=\" >~                 ?           \\
..............................` .~`                     >           !
'L  .:=\"`    `       '=\"   :.r?                         >           '
   !                       `  !                        :            '
   '                         <                        :            :\"
    !                      :'                         ~           f
    ''                    :\\~                        <           F
     >\\                   f!                         >          'L
     ~.                   '                          >           '>
         #Fx        :\"#                             'ux::.':      `
           \\`.   .f>\"                               !    ~ \"%$P\"``h
            'x\"r)~                                 '    \"     `.   k
            .~) \\                          ..      f   ~        h  '
      .oeur`r   \\'x                       ! ^%k..=\"  :           \"  ':
    dP`  `#b     'x8P\"\"\"$k                  \"+      /             '   \"<
   'R  ..  9k     @f     ?&                    % ..!              f    \"
   '$      8F     $   \"  '$                                    .r\"    C.
    \"$ou.o$F      \"$LSvyx$\"                                     .  . /


"
