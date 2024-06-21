var autoExpand = function (field) {

    // Reset field height
    field.style.height = 'inherit';

    // Get the computed styles for the element
    var computed = window.getComputedStyle(field);

    // Calculate the height
    var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                    + parseInt(computed.getPropertyValue('padding-top'), 10)
                    + field.scrollHeight
                    + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                    + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = height + 'px';
    // field.style.height = (height - 16) + 'px';

};


document.addEventListener('DOMContentLoaded', function(){
    
    const instances = document.querySelectorAll('.textarea-autoheight textarea, textarea.textarea-autoheight');

    instances.forEach(instance => {
        instance.addEventListener('input', event => {
            autoExpand(event.target);
        });
    });

});
