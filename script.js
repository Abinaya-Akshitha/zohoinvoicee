document.querySelectorAll('.editable').forEach(element => {
    element.addEventListener('click', function() {
        this.contentEditable = true;
        this.focus();
    });
});
