//Function used to draw the initial network
function draw(){
    nodes = new vis.DataSet();
    edges = new vis.DataSet();

    // create a network
    var container = document.getElementById('GraphArea');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        nodes: {
            shape: 'circle'
        }
    };
    // initialize your network!
    network = new vis.Network(container, data, options);
}

// button functions for manipulating the graph
var ClearGraphButton = document.getElementById("clearGraph");
ClearGraphButton.addEventListener("click", function(){
    network.destroy();
    nodes = new vis.DataSet();
    edges = new vis.DataSet();
})

//add node button
var AddNodeButton = document.getElementById("addNode");
AddNodeButton.addEventListener("click", () => {
    var x = nodes.length;
    var NodeLabel = document.getElementById("personSelector").value;
    try{
        nodes.add({
            id: x+1,
            label: NodeLabel
        }),
        edges.add([
            {from: x, to: x+1}
        ]);
    } 
    catch(err){
        console.log(err);
        console.log('error');
    }
});

//committee information button
var CommitteeInfo = document.getElementById("displayCommittees")
CommitteeInfo.addEventListener("click", () => {
    build_committee_description()
});

var sidebarArea = document.getElementById("sidebar");
sidebarArea.addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("sidebar_transition");
})

function build_bio(input_array){
    bio_box = document.getElementById("bio_text");
    bio_box.innerHTML = "";
    var i = 0;
    attrList = ["first_name","last_name","party","next_election","state","state_rank"];
    for(var x in input_array){
        console.log(i);
        var attrName = x;
        if (attrList.includes(attrName)){
            var attrValue = input_array[x];
            var newDiv = document.createElement("div");
            var newContent = document.createTextNode(attrName + ": " + attrValue);
            newDiv.appendChild(newContent);
            bio_box.appendChild(newDiv)};
        i ++
    }
};

function build_committee_description(input_array){
    committee_box = document.getElementById("committee_text");
    committee_box.innerHTML = "";
    var i = 0;
    let attrList = ["CMTE_NM","CMTE_ID"];
    console.log(attrList, input_array)
    for(var x in input_array){
        console.log(i);
        var attrName = x;
        if (attrList.includes(attrName)){
            var attrValue = input_array[x];
            var newDiv = document.createElement("div");
            var newContent = document.createTextNode(attrName + ": " + attrValue);
            newDiv.appendChild(newContent);
            committee_box.appendChild(newDiv)};
        i ++
    }
};

//on-choose function
function display_data(){
    console.log('choooooose yoooou');
};

//senators button start
var SenatorsButton = document.getElementById("senatorsButton");
SenatorsButton.addEventListener("click", function(){
    nodes = new vis.DataSet();
    edges = new vis.DataSet();

    // create a network
    var container = document.getElementById('GraphArea');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = {
        nodes: {
            shape: 'diamond'
        },
        layout:{
            improvedLayout:true
        }
    };

    // initialize your network!
    network = new vis.Network(container, data, options);

    nodes.add([
        {id:0, label: "United States Senate", font: "14px arial #e3dac9", shape:"square", color: "white", size: 40, shadow: {color: "black"}},
        {id:1, label: "Republican Party", font: "14px arial #e3dac9", shape: "square", color: "#E91D0E", size: 20, shadow: {color: "black"}},
        {id:2, label: "Democratic Party", font: "14px arial #e3dac9", shape: "square", color: "#232066", size: 20, shadow: {color: "black"}},
        {id:3, label: "Independant", font: "14px arial #e3dac9" ,shape: "square", color: "#9B7874", size: 20, shadow: {color: "black"}}
    ]);

    edges.add([
        {from: 0, to: 1, shadow:{color:"#161616"}},
        {from: 0, to: 2, shadow:{color:"#161616"}},
        {from: 0, to: 3, shadow:{color:"#161616"}}
    ]);

    for (var i = 0; len = senators.length, i < len; i++){
            console.log(senators[i]['id'])
            
            leadership = '';
            defaultWidth = 1;

            switch(senators[i]['party']){
                case "R":
                    party = 1;
                    nodeColor = "#E91D0E";
                    borderColor = nodeColor;
                    backgroundColor = nodeColor;
                    edgeColor = '#AA160B'
                    break;
                case "D":
                    party = 2;
                    nodeColor = "#232066";
                    borderColor = nodeColor;
                    backgroundColor = nodeColor;
                    edgeColor = '#232050'
                    break;
                case "I":
                    party = 3;
                    nodeColor = "#9B7874"
                    borderColor = nodeColor;
                    backgroundColor = nodeColor;
                    edgeColor = nodeColor;
                    break;
            }

            if(senators[i]['leadership_role'] != null){
                console.log('not null');
                leadership = senators[i]['leadership_role'];
                defaultWidth = 5;

            };

            zid = 0;
            z = 0;

            nodes.add({
                id: senators[i]['id'],
                label: senators[i]['first_name'] + "\n" + senators[i]['last_name'] + "\n" + senators[i]['state'],
                color: {border: borderColor, background: backgroundColor},
                font: "10px arial #e3dac9",
                shadow:{color:"#161616"},
                size: 35,
                chosen:{node: function(values, id, selected, hovering){
                    var index = senators.findIndex(p => p.id === id);
                    values.size = values.size+10;
                    senatorsJson = JSON.parse(JSON.stringify(senators[index]));
                    build_bio(senatorsJson);
                    congressid = id;   
                    }
                }
            });

            edges.add({
                from: senators[i]['id'],
                to: party,
                width: defaultWidth,
                color: edgeColor,
                shadow:{color:"#161616"}
            });
        }
});

//html maniuplation elements

//define input_arry and i so that they can be used in inputs to the below function
input_array = [];
i = 0;

//this is a function which can take an array, iterate over it, and for each add an element to the DOM; takes an array as input
function add_element(element, element_type, output, input_array){
    var select = document.getElementById(element);
    for(var i = 0; i < input_array.length; i++){
        var opt = ""
        var process = output.forEach(function(entry){opt = opt+" "+input_array[i][entry]});
        var el = document.createElement(element_type);
        el.text = opt;
        el.value = opt;
        select.add(el);
        }
};    

function json_to_element(element, element_type, output, input_array){
    var select = document.getElementById(element);
    for(var i = 0; i < input_array.length; i++){
        console.log('test');
    }
};

//utility function which can dedup and array based on an object key value
function trim(arr, key) {
    var values = {};
    return arr.filter(function(item){
        var val = item[key];
        var exists = values[val];
        values[val] = true;
        return !exists;
    });
}

//api call functions to the backend server
function status(response){
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

function json(response){
    return response.json();
};

//Set up the committee button and the callback which builds the committee nodes and edges
var CommitteeButton = document.getElementById("committeeButton");
CommitteeButton.addEventListener("click", () => {
        var individ_contribs = contributions.filter((el) => {
            return el.id == congressid
        }); 

    var existing_contribs = individ_contribs.filter((el)=> {
            if(nodes._data[el.id]){
                return el.id
            }
        });

        console.log(individ_contribs);

        for (var i = 0; len = individ_contribs.length, i < len; i++){                
                zid = 0;
                z = 0;

                try{
                    nodes.add({
                        id: individ_contribs[i]['CMTE_ID'],
                        label: individ_contribs[i]['CMTE_NM'],
                        font: "10px arial #e3dac9",
                        shadow:{color:"#161616"},
                        mass: 2,
                        size: 10,
                        stabilization: false,
                        chosen:{node: function(values, id, selected, hovering){
                            console.log(id);
                            var index = committees.findIndex(p => p.id === id);
                            values.size = values.size+10;
                            committeesJson = committees[index];
                            build_committee_description(committeesJson);
                            committeeId = id;   
                            }
                        }
                    });

                    edges.add({
                        from: individ_contribs[i]['CMTE_ID'],
                        to: individ_contribs[i]['id'],
                        width: 1,
                        color: "#48a071",
                        shadow:{color:"#161616"}
                    });
                //the try will except if there is already a node with the given ID; use the catch to build a connecting edge to it
                }catch(e){
                    edges.add({
                        from: individ_contribs[i]['CMTE_ID'],
                        to: individ_contribs[i]['id'],
                        width: 1,
                        color: "#48a071",
                        shadow:{color:"#161616"}
                    });
                }
            }
        });

// this is very redundant, and there should be a conslidated function for making API calls and assinging the data to a variable
//Promise to get the status and json body from the backend server senators API; 
fetch('http://127.0.0.1:8888/test')  
    .then(status)  
    .then(json)  
    .then(function(data) {  
        senators = data;
        console.log('Request succeeded with JSON response', data); 
        add_element('personSelector', 'option', ["first_name","last_name"], senators);
    }).catch(function(error) {  
        console.log('Request failed', error);  
});

//Promsie to get the commitee data from the api
fetch('http://127.0.0.1:8888/committee')  
    .then(status)  
    .then(json)  
    .then(function(data) {  
        committees = data;
        console.log('Committee request succeeded with JSON response', data); 
    }).catch(function(error) {  
        console.log('Request failed', error);  
});


fetch('http://127.0.0.1:8888/candidate')  
    .then(status)  
    .then(json)  
    .then(function(data) {  
        candidates = data;
        console.log('Candidate request succeeded with JSON response', data); 
    }).catch(function(error) {  
        console.log('Request failed', error);  
});

fetch('http://127.0.0.1:8888/contribution')  
    .then(status)  
    .then(json)  
    .then(function(data) {  
        contributions = data;
        console.log('Contribution request succeeded with JSON response', data); 
        uni_contributions = trim(contributions, 'CMTE_NM').sort(function (a, b) {
            return a.CMTE_NM.localeCompare( b.CMTE_NM );
        });
        add_element('committeeSelector','option',['CMTE_NM'],uni_contributions)
    }).catch(function(error) {  
        console.log('Request failed', error);  
});