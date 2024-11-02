# frozen_string_literal: true

# These defaults are defined and maintained by the community at
# https://github.com/heartcombo/simple_form-bootstrap
# Please submit feedback, changes and tests only there.

# Uncomment this and change the path if necessary to include your own
# components.
# See https://github.com/heartcombo/simple_form#custom-components
# to know more about custom components.
# Dir[Rails.root.join('lib/components/**/*.rb')].each { |f| require f }

# Use this setup block to configure all options available in SimpleForm.
SimpleForm.setup do |config|
  # Default class for buttons
  config.button_class = 'btn'

  # Define the default class of the input wrapper of the boolean input.
  config.boolean_label_class = 'form-check-label'

  # How the label text should be generated altogether with the required text.
  config.label_text = lambda { |label, required, explicit_label| "#{label} #{required}" }

  # Define the way to render check boxes / radio buttons with labels.
  config.boolean_style = :inline

  # You can wrap each item in a collection of radio/check boxes with a tag
  config.item_wrapper_tag = :div

  # Defines if the default input wrapper class should be included in radio
  # collection wrappers.
  config.include_default_input_wrapper_class = false

  # CSS class to add for error notification helper.
  config.error_notification_class = 'alert alert-danger'

  # Method used to tidy up errors. Specify any Rails Array method.
  # :first lists the first message for each field.
  # :to_sentence to list all errors for each field.
  config.error_method = :to_sentence

  # add validation classes to `input_field`
  config.input_field_error_class = 'is-invalid'
  config.input_field_valid_class = 'is-valid'


  # vertical forms
  #
  # vertical default_wrapper
  config.wrappers :vertical_form, class: 'mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :minlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :label, class: 'form-label'
    b.use :input, class: 'form-control', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :full_error, wrap_with: { class: 'invalid-feedback' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end

  # vertical input for boolean
  config.wrappers :vertical_boolean, tag: 'fieldset', class: 'mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.wrapper :form_check_wrapper, class: 'form-check' do |bb|
      bb.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
      bb.use :label, class: 'form-check-label'
      bb.use :full_error, wrap_with: { class: 'invalid-feedback' }
      bb.use :hint, wrap_with: { class: 'form-text' }
    end
  end

  # vertical input for radio buttons and check boxes
  config.wrappers :vertical_collection, item_wrapper_class: 'form-check', item_label_class: 'form-check-label', tag: 'fieldset', class: 'mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.wrapper :legend_tag, tag: 'legend', class: 'col-form-label pt-0' do |ba|
      ba.use :label_text
    end
    b.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :full_error, wrap_with: { class: 'invalid-feedback d-block' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end

  # vertical input for inline radio buttons and check boxes
  config.wrappers :vertical_collection_inline, item_wrapper_class: 'form-check form-check-inline', item_label_class: 'form-check-label', tag: 'fieldset', class: 'mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.wrapper :legend_tag, tag: 'legend', class: 'col-form-label pt-0' do |ba|
      ba.use :label_text
    end
    b.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :full_error, wrap_with: { class: 'invalid-feedback d-block' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end

  # vertical file input
  config.wrappers :vertical_file, class: 'mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :minlength
    b.optional :readonly
    b.use :label, class: 'form-label'
    b.use :input, class: 'form-control', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :full_error, wrap_with: { class: 'invalid-feedback' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end

  # vertical select input
  config.wrappers :vertical_select, class: 'mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'form-label'
    b.use :input, class: 'form-select', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :full_error, wrap_with: { class: 'invalid-feedback' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end

  # vertical multi select
  config.wrappers :vertical_multi_select, class: 'mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'form-label'
    b.wrapper class: 'd-flex flex-row justify-content-between align-items-center' do |ba|
      ba.use :input, class: 'form-select mx-1', error_class: 'is-invalid', valid_class: 'is-valid'
    end
    b.use :full_error, wrap_with: { class: 'invalid-feedback d-block' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end

  # vertical range input
  config.wrappers :vertical_range, class: 'mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :readonly
    b.optional :step
    b.use :label, class: 'form-label'
    b.use :input, class: 'form-range', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :full_error, wrap_with: { class: 'invalid-feedback' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end


  # horizontal forms
  #
  # horizontal default_wrapper
  config.wrappers :horizontal_form, class: 'row mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :minlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :label, class: 'col-sm-3 col-form-label'
    b.wrapper :grid_wrapper, class: 'col-sm-9' do |ba|
      ba.use :input, class: 'form-control', error_class: 'is-invalid', valid_class: 'is-valid'
      ba.use :full_error, wrap_with: { class: 'invalid-feedback' }
      ba.use :hint, wrap_with: { class: 'form-text' }
    end
  end

  # horizontal input for boolean
  config.wrappers :horizontal_boolean, class: 'row mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.wrapper :grid_wrapper, class: 'col-sm-9 offset-sm-3' do |wr|
      wr.wrapper :form_check_wrapper, class: 'form-check' do |bb|
        bb.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
        bb.use :label, class: 'form-check-label'
        bb.use :full_error, wrap_with: { class: 'invalid-feedback' }
        bb.use :hint, wrap_with: { class: 'form-text' }
      end
    end
  end

  # horizontal input for radio buttons and check boxes
  config.wrappers :horizontal_collection, item_wrapper_class: 'form-check', item_label_class: 'form-check-label', class: 'row mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'col-sm-3 col-form-label pt-0'
    b.wrapper :grid_wrapper, class: 'col-sm-9' do |ba|
      ba.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
      ba.use :full_error, wrap_with: { class: 'invalid-feedback d-block' }
      ba.use :hint, wrap_with: { class: 'form-text' }
    end
  end

  # horizontal input for inline radio buttons and check boxes
  config.wrappers :horizontal_collection_inline, item_wrapper_class: 'form-check form-check-inline', item_label_class: 'form-check-label', class: 'row mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'col-sm-3 col-form-label pt-0'
    b.wrapper :grid_wrapper, class: 'col-sm-9' do |ba|
      ba.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
      ba.use :full_error, wrap_with: { class: 'invalid-feedback d-block' }
      ba.use :hint, wrap_with: { class: 'form-text' }
    end
  end

  # horizontal file input
  config.wrappers :horizontal_file, class: 'row mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :minlength
    b.optional :readonly
    b.use :label, class: 'col-sm-3 col-form-label'
    b.wrapper :grid_wrapper, class: 'col-sm-9' do |ba|
      ba.use :input, class: 'form-control', error_class: 'is-invalid', valid_class: 'is-valid'
      ba.use :full_error, wrap_with: { class: 'invalid-feedback' }
      ba.use :hint, wrap_with: { class: 'form-text' }
    end
  end

  # horizontal select input
  config.wrappers :horizontal_select, class: 'row mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'col-sm-3 col-form-label'
    b.wrapper :grid_wrapper, class: 'col-sm-9' do |ba|
      ba.use :input, class: 'form-select', error_class: 'is-invalid', valid_class: 'is-valid'
      ba.use :full_error, wrap_with: { class: 'invalid-feedback' }
      ba.use :hint, wrap_with: { class: 'form-text' }
    end
  end

  # horizontal multi select
  config.wrappers :horizontal_multi_select, class: 'row mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.use :label, class: 'col-sm-3 col-form-label'
    b.wrapper :grid_wrapper, class: 'col-sm-9' do |ba|
      ba.wrapper class: 'd-flex flex-row justify-content-between align-items-center' do |bb|
        bb.use :input, class: 'form-select mx-1', error_class: 'is-invalid', valid_class: 'is-valid'
      end
      ba.use :full_error, wrap_with: { class: 'invalid-feedback d-block' }
      ba.use :hint, wrap_with: { class: 'form-text' }
    end
  end

  # horizontal range input
  config.wrappers :horizontal_range, class: 'row mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :readonly
    b.optional :step
    b.use :label, class: 'col-sm-3 col-form-label pt-0'
    b.wrapper :grid_wrapper, class: 'col-sm-9' do |ba|
      ba.use :input, class: 'form-range', error_class: 'is-invalid', valid_class: 'is-valid'
      ba.use :full_error, wrap_with: { class: 'invalid-feedback' }
      ba.use :hint, wrap_with: { class: 'form-text' }
    end
  end


  # inline forms
  #
  # inline default_wrapper
  config.wrappers :inline_form, class: 'col-12' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :minlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :label, class: 'visually-hidden'

    b.use :input, class: 'form-control', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :error, wrap_with: { class: 'invalid-feedback' }
    b.optional :hint, wrap_with: { class: 'form-text' }
  end

  # inline input for boolean
  config.wrappers :inline_boolean, class: 'col-12' do |b|
    b.use :html5
    b.optional :readonly
    b.wrapper :form_check_wrapper, class: 'form-check' do |bb|
      bb.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
      bb.use :label, class: 'form-check-label'
      bb.use :error, wrap_with: { class: 'invalid-feedback' }
      bb.optional :hint, wrap_with: { class: 'form-text' }
    end
  end


  # bootstrap custom forms
  #
  # custom input switch for boolean
  config.wrappers :custom_boolean_switch, class: 'mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.wrapper :form_check_wrapper, tag: 'div', class: 'form-check form-switch' do |bb|
      bb.use :input, class: 'form-check-input', error_class: 'is-invalid', valid_class: 'is-valid'
      bb.use :label, class: 'form-check-label'
      bb.use :full_error, wrap_with: { tag: 'div', class: 'invalid-feedback' }
      bb.use :hint, wrap_with: { class: 'form-text' }
    end
  end


  # Input Group - custom component
  # see example app and config at https://github.com/heartcombo/simple_form-bootstrap
  config.wrappers :input_group, class: 'mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :minlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :label, class: 'form-label'
    b.wrapper :input_group_tag, class: 'input-group' do |ba|
      ba.optional :prepend
      ba.use :input, class: 'form-control', error_class: 'is-invalid', valid_class: 'is-valid'
      ba.optional :append
      ba.use :full_error, wrap_with: { class: 'invalid-feedback' }
    end
    b.use :hint, wrap_with: { class: 'form-text' }
  end


  # Floating Labels form
  #
  # floating labels default_wrapper
  config.wrappers :floating_labels_form, class: 'form-floating mb-3' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :minlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly
    b.use :input, class: 'form-control', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :label
    b.use :full_error, wrap_with: { class: 'invalid-feedback' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end

  # custom multi select
  config.wrappers :floating_labels_select, class: 'form-floating mb-3' do |b|
    b.use :html5
    b.optional :readonly
    b.use :input, class: 'form-select', error_class: 'is-invalid', valid_class: 'is-valid'
    b.use :label
    b.use :full_error, wrap_with: { class: 'invalid-feedback' }
    b.use :hint, wrap_with: { class: 'form-text' }
  end


  # The default wrapper to be used by the FormBuilder.
  config.default_wrapper = :vertical_form

  # Custom wrappers for input types. This should be a hash containing an input
  # type as key and the wrapper that will be used for all inputs with specified type.
  config.wrapper_mappings = {
    boolean:       :vertical_boolean,
    check_boxes:   :vertical_collection,
    date:          :vertical_multi_select,
    datetime:      :vertical_multi_select,
    file:          :vertical_file,
    radio_buttons: :vertical_collection,
    range:         :vertical_range,
    time:          :vertical_multi_select,
    select:        :vertical_select
  }
end
