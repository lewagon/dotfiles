Snippet div         <div><CR><{}><CR></div>
Snippet div.        <div class="<{}>"><CR><{}><CR></div>
Snippet p           <p><{}></p>
Snippet h           <h<{number}>><{}></<h{number}>>

Snippet pe          <%= <{}> %>
Snippet er          <% <{}> %>


Snippet ternary     <%= <{}>? <{}> : <{}> %><{}>
Snippet if          <% if <{}> %><CR><{}><CR><% end %>
Snippet ife         <% if <{}> %><CR><{}><CR><% else %><CR><% end %>
Snippet unless      <% unless <{}> %><CR><{}><CR><% end %>
Snippet else        <% else %>
Snippet elsif       <% elsif <{}> %>
Snippet end         <% end %>

Snippet each        <% @<{}>s.each do |<{}>| %><CR><{}><CR><% end %>
Snippet eachdo      <% @<{}>s.each do |<{}>| %><CR><{}><CR><% end %>

Snippet lt          <%= link_to "<{}>", <{}>_path %>
Snippet ltdo        <%= link_to <{}> do %><CR><{}><CR><% end %>
Snippet lto         <%= link_to <{}> do %><CR><{}><CR><% end %>
Snippet it          <%= image_tag <{}>, alt: "<{}>" %>
Snippet render      <%= render "<{path}>"<{}> %><{}>
Snippet rendervar   <%= render "<{path}>", <{var}>: @<{var}> %><CR><{}>
Snippet env         ENV.fetch("<{}>")<{}>
Snippet i18n        <%= t("<{}>") %><{}>
Snippet f.input     <%= f.input :<{}> %><{}>
Snippet input       <%= f.input :<{}> %><{}>
Snippet simple_form <%= simple_form_for [<{}>] <{}>do |f| %><CR><{}><CR><%= f.button :submit %><CR><% end %>

Snippet d-flex      d-flex justify-content-between align-items-center<{}>

Snippet stringfortime strftime("%d/%m/%Y<{}> - %Hh%M}>")
Snippet interpolation #{<{}>}<{}>
