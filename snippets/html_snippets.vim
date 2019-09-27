Snippet div         <div><CR><{}><CR></div>
Snippet div.        <div class="<{}>"><CR><{}><CR></div>
Snippet p           <p><{}></p>
Snippet h           <h<{number}>><{}></<{number}>>

Snippet ?           <%= <{}>? <{}> : <{}> %><{}>
Snippet #           #{<{}>}<{}>
Snippet pe          <%= <{}> %>
Snippet er          <% <{}> %>
Snippet if          <% if <{}> %><CR><{}><CR><% else %><CR><{}><CR><% end %>
Snippet unless      <% unless <{}> %><CR><% end %>
Snippet else        <% else %>
Snippet elsif       <% elsif <{}> %>
Snippet end         <% end %>
Snippet each        <% @<{}>s.each do |<{}>| %><CR><{}><CR><% end %>

Snippet lt          <%= link_to "<{}>", <{}>_path %><CR><{}>
Snippet ltdo        <%= link_to <{}> do %><CR><{}><CR><% end %>
Snippet it          <%= image_tag <{}>, alt: "alttext" %>
Snippet render      <%= render "<{path}>" %><CR><{}>
Snippet rendervar   <%= render "<{path}>", <{var}>: @<{var}> %><CR><{}>
Snippet env         ENV['<{}>']<{}>
Snippet i18n        <%= t("<{}>.<{}>") %>
Snippet f.input     <%= f.input :<{}> %>
Snippet input       <%= f.input :<{}> %>
Snippet simple_form <%= simple_form_for [@<{}>] do |f| %><CR><%= f.input :<{}> %><CR><%= f.button :submit %><CR><% end %>
Snippet stringfortime strftime("%d/%m/%Y<{}> - %Hh%M}>")
