Snippet h           <h<{number}>><{}></<h{number}>>
Snippet p           <p><{}></p>
Snippet div         <div><CR><{}><CR></div>
Snippet div.        <div class="<{}>"><CR><{}><CR></div>

Snippet erif        <% if <{}> %><CR><{}><CR><% end %>
Snippet erife       <% if <{}> %><CR><{}><CR><% else %><CR><% end %>

Snippet lt          <%= link_to "<{}>", <{}>_path %>
Snippet ltdo        <%= link_to <{}> do %><CR><{}><CR><% end %>
Snippet lto         <%= link_to <{}> do %><CR><{}><CR><% end %>
Snippet it          <%= image_tag <{}>, alt: "<{}>" %>
Snippet render      <%= render "<{path}>"<{}> %><{}>
Snippet rendervar   <%= render "<{path}>", <{var}>: @<{var}> %><CR><{}>
Snippet int         <%= t("<{}>") %><{}>
Snippet simple_form <%= simple_form_for [<{}>] <{}>do |f| %><CR><{}><CR><%= f.button :submit %><CR><% end %>
Snippet f.input     <%= f.input :<{}> %><{}>
Snippet input       <%= f.input :<{}> %><{}>

Snippet d-flex      d-flex justify-content-<{}> align-items-<{}>
