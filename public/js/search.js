const { fromEvent } = rxjs
const { debounceTime, switchMap, map } = rxjs.operators

let searchbox = fromEvent($("#searchBox"), 'keydown');
let sub = searchbox.pipe(
    debounceTime(1000),
    map(e => e)
).subscribe(x => searchTemplate(x));

function searchTemplate(event) {
    var textbox = $(event.target);
    var value = textbox.val().trim();
    var searchType = textbox.data().search;
    if(value === "")
        $(".resultsContainer").html("");
    else
        search(value, searchType);
}

// $("#searchBox").keydown((event) => {
//     clearTimeout(timer);
//     var textbox = $(event.target);
//     var value = textbox.val();
//     var searchType = textbox.data().search;

//     timer = setTimeout(() => {
//         value = textbox.val().trim();

//         if(value == "") {
//             $(".resultsContainer").html("");
//         }
//         else {
//             search(value, searchType);
//         }
//     }, 1000)

// })

function search(searchTerm, searchType) {
    var url = searchType == "users" ? "/api/users" : "/api/posts"

    $.get(url, { search: searchTerm }, (results) => {
        


        if(searchType == "users") {
            outputUsers(results, $(".resultsContainer"));
        }
        else {
            outputPosts(results, $(".resultsContainer"))
        }

    })
}