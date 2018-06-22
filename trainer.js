$(document).ready(function()
{
    $(".instrument").click(SetInstrument);
    $(".transposer").click(SetTransposeDirection);
    $("#randomButton").click(AssignRandomPitch);
    $("#CheckMyTransposition").click(CheckMyTransposition);
    $("#Reset").click(Reset)
});

    instruments =   [new Instrument("Concert Pitch",22,96,0), 
                    new Instrument("Piccolo",62,96,-12), 
                    new Instrument("English Horn",40,72,7), 
                    new Instrument("Contrabassoon",10,46,12), 
                    new Instrument("Clarinet",38,82,2),
                    new Instrument("Bass Clarinet",25,65,14), 
                    new Instrument("Alto Sax",37,68,9), 
                    new Instrument("Tenor Sax",32,63,14), 
                    new Instrument("Bari Sax",25,56,21), 
                    new Instrument("Trumpet",40,70,2), 
                    new Instrument("F Horn",23,65,7), 
                    new Instrument("Baritone T.C.",28,58,14),
                    new Instrument("Double Bass",12,48,12),
                    new Instrument("Glockenspiel",67,96,-24),
                    new Instrument("Xylophone",53,96,-12),]

    selectedinstrument = null;

    transposerbutton = null;

    pitchbutton = null;

    solution = null;

    //http://www.electronics.dit.ie/staff/tscarff/Music_technology/midi/midi_note_numbers_for_octaves.htm
    pitch = [new Pitch (0,"C0"), new Pitch (1,"C#/Db0"), new Pitch (2,"D0"), new Pitch (3,"D#/Eb0"), new Pitch (4,"E0"), new Pitch (5,"F0"), new Pitch (6,"F#/Gb0"), new Pitch (7,"G0"), new Pitch (8,"G#/Ab0"), new Pitch (9,"A0"), new Pitch (10,"A#/Bb0"), new Pitch (11,"B0"),
              new Pitch (12,"C1"), new Pitch (13,"C#/Db1"), new Pitch (14,"D1"), new Pitch (15,"D#/Eb1"), new Pitch (16,"E1"), new Pitch (17,"F1"), new Pitch (18,"F#/Gb1"), new Pitch (19,"G1"), new Pitch (20,"G#/Ab1"), new Pitch (21,"A1"), new Pitch (22,"A#/Bb1"), new Pitch (23,"B1"),
              new Pitch (24,"C2"), new Pitch (25,"C#/Db2"), new Pitch (26,"D2"), new Pitch (27,"D#/Eb2"), new Pitch (28,"E2"), new Pitch (29,"F2"), new Pitch (30,"F#/Gb2"), new Pitch (31,"G2"), new Pitch (32,"G#/Ab2"), new Pitch (33,"A2"), new Pitch (34,"A#/Bb2"), new Pitch (35,"B2"),
              new Pitch (36,"C3"), new Pitch (37,"C#/Db3"), new Pitch (38,"D3"), new Pitch (39,"D#/Eb3"), new Pitch (40,"E3"), new Pitch (41,"F3"), new Pitch (42,"F#/Gb3"), new Pitch (43,"G3"), new Pitch (44,"G#/Ab3"), new Pitch (45,"A3"), new Pitch (46,"A#/Bb3"), new Pitch (47,"B3"),
              new Pitch (48,"C4"), new Pitch (49,"C#/Db4"), new Pitch (50,"D4"), new Pitch (51,"D#/Eb4"), new Pitch (52,"E4"), new Pitch (53,"F4"), new Pitch (54,"F#/Gb4"), new Pitch (55,"G4"), new Pitch (56,"G#/Ab4"), new Pitch (57,"A4"), new Pitch (58,"A#/Bb4"), new Pitch (59,"B4"),
              new Pitch (60,"C5"), new Pitch (61,"C#/Db5"), new Pitch (62,"D5"), new Pitch (63,"D#/Eb5"), new Pitch (64,"E5"), new Pitch (65,"F5"), new Pitch (66,"F#/Gb5"), new Pitch (67,"G5"), new Pitch (68,"G#/Ab5"), new Pitch (69,"A5"), new Pitch (70,"A#/Bb5"), new Pitch (71,"B5"),
              new Pitch (72,"C6"), new Pitch (73,"C#/Db6"), new Pitch (74,"D6"), new Pitch (75,"D#/Eb6"), new Pitch (76,"E6"), new Pitch (77,"F6"), new Pitch (78,"F#/Gb6"), new Pitch (79,"G6"), new Pitch (80,"G#/Ab6"), new Pitch (81,"A6"), new Pitch (82,"A#/Bb6"), new Pitch (83,"B6"),
              new Pitch (84,"C7"), new Pitch (85,"C#/Db7"), new Pitch (86,"D7"), new Pitch (87,"D#/Eb7"), new Pitch (88,"E7"), new Pitch (89,"F7"), new Pitch (90,"F#/Gb7"), new Pitch (91,"G7"), new Pitch (92,"G#/Ab7"), new Pitch (93,"A7"), new Pitch (94,"A#/Bb7"), new Pitch (95,"B7"),
              new Pitch (96,"C8"), new Pitch (97,"C#/Db8"), new Pitch (98,"D8"), new Pitch (99,"D#/Eb8"), new Pitch (100,"E8"), new Pitch (101,"F8"), new Pitch (102,"F#/Gb8"), new Pitch (103,"G8"), new Pitch (104,"G#/Ab8"), new Pitch (105,"A8"), new Pitch (106,"A#/Bb8"), new Pitch (107,"B8"),
              new Pitch (108,"C9"), new Pitch (109,"C#/Db9"), new Pitch (110,"D9"), new Pitch (111,"D#/Eb9"), new Pitch (112,"E9"), new Pitch (113,"F9"), new Pitch (114,"F#/Gb9"), new Pitch (115,"G9"), new Pitch (116,"G#/Ab9"), new Pitch (117,"A9"), new Pitch (118,"A#/Bb9"), new Pitch (119,"B9"),
              new Pitch (120,"C10"), new Pitch (121,"C#/Db10"), new Pitch (122,"D10"), new Pitch (123,"D#/Eb10"), new Pitch (124,"E10"), new Pitch (125,"F10"), new Pitch (126,"F#/Gb10"), new Pitch (127,"G10"),];
  
    
    function Instrument (name, lowestpitch, highestpitch, offset)
      {
        this.name = name;
        this.lowestpitch = lowestpitch;
        this.highestpitch = highestpitch;
        this.offset = offset;
    }
  
    function Pitch (number, name)
        {
        this.name = name;
        this.number = number;
    }

    function SetTransposeDirection (clickevent)
    {
        var button = clickevent.target;
        var transposerdirection = $(button).text(); //connects the html button to the JQuery
        $("#transposertoggle").text(transposerdirection); 
        transposerbutton = transposerdirection;
    }

    function SetInstrument (clickevent)
    {
        var button = clickevent.target;
        var SelectedInstrumentName = $(button).text(); //connects the html button to the JQuery
        for (index = 0; index <instruments.length; ++index)//reads through the list of instruments
        {
            if (instruments[index].name == SelectedInstrumentName)//selects the instrument that matches html dropdown
            {
                selectedinstrument= instruments[index];
                $('#instrumenttoggle').text(selectedinstrument.name);
            }
        }
}

    function AssignRandomPitch()//Trainer function
    {  
        var RandomNumber = Math.floor(Math.random() * (selectedinstrument.highestpitch - selectedinstrument.lowestpitch + 1)) + selectedinstrument.lowestpitch;
            if (transposerbutton == "From Concert Pitch to Written Instrument Pitch") 
                {//no transposer
                    $("#PitchStatement2").text("The concert pitch is...");
                    $("#Question").html('<img width=85px src="Images/'+ RandomNumber+ '.png">'); //apply offset the way it is written
                    $("#PitchStatement3").text("so the instrument's written pitch is...");
                    solution = RandomNumber + selectedinstrument.offset
                }
            else
                {//Written pitch to concert pitch -transposer applied to the random pitch
                    RandomNumber+=selectedinstrument.offset;
                    $("#PitchStatement2").text("The instrument's written pitch is...");
                    $("#Question").html('<img width=85px src="Images/'+ RandomNumber+ '.png">');
                    $("#PitchStatement3").text("so the concert pitch is...");
                    solution = RandomNumber - selectedinstrument.offset
                }
       
       PitchList();
    } 
        

    function PitchList()//generates list of pitches
    {
        $('#PitchSelect').html("");  
        for (index2 = 0; index2 < pitch.length; ++index2) //reads the pitch list
        {
            if (pitch[index2].number>=selectedinstrument.lowestpitch && pitch[index2].number<=selectedinstrument.highestpitch)//sets the displayable range of pitches
            {
                var transposer= 0;
                if (transposerbutton != "From Written Instrument Pitch to Concert Pitch") 
                    {
                    transposer = selectedinstrument.offset;
                    }
                $('#PitchSelect').append('<a class="pitchimage dropdown-item" data-pitchnumber = "'+pitch[index2+transposer].number+'" href="#"><img width=85px src="Images/'+ pitch[index2+transposer].number +'.png"></a>');
            }
        }
    $(".pitchimage").click(SetPitch);
    }
        
    function SetPitch(clickevent)
    {
        var button = clickevent.target;
            if($(clickevent.target).is("img"))
            button = $(clickevent.target).parent();
        var pitchnumber = $(button).attr("data-pitchnumber");
            pitchbutton = pitchnumber;
            $("#pitchtoggle").html('<img width= 85px src="Images/'+ pitchnumber+ '.png">');
    }
    
    function CheckMyTransposition()//Trainer function
    {
        var WinnersLosers
        if (solution == pitchbutton)
        {$("#PitchStatement4").text("Way to go, you awesome winner!");
        $("#Solution").html('<iframe src="https://giphy.com/embed/3OwXbwGBV9UsldA0FF" height="250" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/win-xNBcChLQt7s9a"></a></p>');}        
        else 
        {$("#PitchStatement4").text("You are a disappointment to your ancestors. You shall not be mourned. The correct answer is:");
        $("#Solution").html('<img width=85px src="Images/'+ solution+ '.png">');}
    }

    function Reset()
    {
        window.location.reload(true);
    }