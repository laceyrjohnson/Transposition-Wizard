
//ConcertPitchStuff
//object=thing; properties=characteristics; methods=verbs-thingstheobjectcando
//TransposerSelect and InstrumentSelect

$(document).ready(function(){
    $("#TransposerSelect").change(PitchList);
    $("#InstrumentSelect").click(PitchList);
    $("#Transpose").click(function(){grandreveal();});
    $(".instrument").click(PitchList);
});

    instruments =   [new Instrument("Concert Pitch",22,96,0), 
                    new Instrument("Piccolo",62,96,-12), 
                    new Instrument("English Horn",40,72,7), 
                    new Instrument("Contrabassoon",34,70,-12), 
                    new Instrument("Clarinet",38,82,2),
                    new Instrument("Bass Clarinet",25,70,14), 
                    new Instrument("Alto Sax",37,68,9), 
                    new Instrument("Tenor Sax",32,63,14), 
                    new Instrument("Bari Sax",25,56,21), 
                    new Instrument("Trumpet",40,70,2), 
                    new Instrument("F Horn",23,65,7), 
                    new Instrument("Baritone T.C.",28,58,14),
                    new Instrument("Double Bass",36,72,-12),
                    new Instrument("Glockenspiel (Bells)",67,96,-24),
                    new Instrument("Xylophone",53,96,-12),]

    selectedinstrument = null;
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

    function PitchList (clickevent)//generates list of pitches
    {
    var button = clickevent.target;
    var SelectedInstrumentName = $(button).text(); 
        var direction = $("#TransposerSelect").val(); //reads which way to transpose
            for (index = 0; index <instruments.length; ++index)//reads through the list of instruments
            {

                if (instruments[index].name == SelectedInstrumentName)//selects the instrument that matches html dropdown
                {
                    selectedinstrument= instruments[index];
                    $('#PitchSelect').empty();  
                    for (index2 = 0; index2 < pitch.length; ++index2) //reads the pitch list
                    {
                        if (pitch[index2].number>=instruments[index].lowestpitch && pitch[index2].number<=instruments[index].highestpitch)//sets the displayable range of pitches
                        {
                            var transposer=0;
                            if (direction == 2) {
                                transposer= instruments[index].offset;
                            }

                            $('#PitchSelect').append('<a class="pitchimage dropdown-item" data-pitchnumber = "'+pitch[index2+transposer].number+'" href="#"><img width=30% height=30% src="Images/'+ pitch[index2+transposer].number +'.png"></a>');
                
                        }
                    }
                }
            }
            $(".pitchimage").click(Transpose);}

        
/*
    function Transpose ()
   {
        var direction = $("#TransposerSelect").val();
        var SelectedInstrumentName = $("#InstrumentSelect").val();
        for (index = 0; index <instruments.length; ++index)//reads through the list of instruments
        {
            if (instruments[index].name == SelectedInstrumentName)//selects the instrument that matches html dropdown
            { 
                for (index2 = 0; index2 < pitch.length; ++index2) //reads the pitch list
                {
                    if (pitch[index2].number == $("#PitchSelect").val())
                    {
                        var result;
                        if (direction == 1) 
                        {
                            result=pitch[index2].number + instruments[index].offset;
                        } //apply offset the way it is written
                        else 
                        {
                            result=pitch[index2].number - instruments[index].offset;
                        }  //apply inverse of offset
                        for (index3 = 0; index3 < pitch.length; ++index3)
                            {
                                if (pitch[index3].number == result) {
                                    //$("#Result").text(pitch[index3].name);
                                   $("#Result").html("<img width=20% height=20% src='Images/"+ pitch[index3].number +".png'>");
                            }
                            }}}}}} 
*/

function Transpose(clickevent)
{
    var button = clickevent.target;
    var pitchnumber = $(button).attr("data-pitchnumber");
    var direction = $("#TransposerSelect").val();
   SelectedInstrumentName = selectedinstrument.name;
     for (index = 0; index <instruments.length; ++index)//reads through the list of instruments
     {
         if (instruments[index].name == SelectedInstrumentName)//selects the instrument that matches html dropdown
         { 
             
             for (index2 = 0; index2 < pitch.length; ++index2) //reads the pitch list
             {
                 if (pitch[index2].number == pitchnumber)
                 {
                     var result;
                     if (direction == 1) 
                     {
                         result=pitch[index2].number + instruments[index].offset;
                     } //apply offset the way it is written
                     else 
                     {
                         result=pitch[index2].number - instruments[index].offset;
                     }  //apply inverse of offset
                     for (index3 = 0; index3 < pitch.length; ++index3)
                         {
                             if (pitch[index3].number == result) {
                                $("#Input").html('<img width=20% height=20% src="Images/'+ pitch[index2].number+ '.png">');
                                $("#Result").hide();
                                $("#Result").html('<img width=20% height=20% src="Images/'+ pitch[index3].number+ '.png">');
                         }
                         }}}}}} 

function grandreveal ()
{
    $("#Result").show();
}


