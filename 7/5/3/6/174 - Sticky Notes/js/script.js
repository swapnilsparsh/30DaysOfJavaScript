$(document).ready(function() {
    all_notes = $("li a");

    all_notes.on("keyup", function() {
        note_title = $(this).find("h2").text();
        note_content = $(this).find("p").text();

        item_key = "list_" + $(this).parent().index();

        data = {
            title: note_title,
            content: note_content
        };

        window.localStorage.setItem(item_key, JSON.stringify(data));
    });

    all_notes.each(function(index) {
        data = JSON.parse(window.localStorage.getItem("list_" + index));

        if (data !== null) {
            note_title = data.title;
            note_content = data.content;

            $(this).find("h2").text(note_title);
            $(this).find("p").text(note_content);
        }
    });
});