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
                    chosen:{node: function(values, id, selected, hovering){
                        var index = senators.findIndex(p => p.id === id);
                        values.size = values.size+10;
                        senatorsJson = JSON.parse(JSON.stringify(senators[index]));
                        //document.getElementById("bio_text").innerHTML = JSON.stringify(senators[index]);
                        //document.getElementById("sidebar").classList.toggle("sidebar_transition");
                        build_bio(senatorsJson);
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