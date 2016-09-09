/**
 * Created by wupeiqi on 15/8/13.
 */

/*
监听是否已经按下control键
*/
window.globalCtrlKeyPress = false;
window.onkeydown = function(event){
    if(event && event.keyCode == 17){
        window.globalCtrlKeyPress = true;
    }
};

/*
按下Control，联动表格中正在编辑的select
 */
function MultiSelect(ths){
    if(window.globalCtrlKeyPress){
        var index = $(ths).parent().index();
        var value = $(ths).val();
        $(ths).parent().parent().nextAll().find("td input[type='checkbox']:checked").each(function(){
            $(this).parent().parent().children().eq(index).children().val(value);
        });
    }
}

function AddRow(body){
    var tds = [];
    tds.push($.CreateTd({},{},$.CreateInput({'type':'checkbox'},{})));
    tds.push($.CreateTd({},{},"新建"));

    tds.push($.CreateTd({'class':'padding-3'},{},$.CreateInput({'name':'host_record', 'type':'text', 'value':'', 'class':'padding-tb-5 form-control '}, {'width':'100%'})));
    //tds.push($.CreateTd({'class':'padding-3'},{},$.CreateSelect({'name':'relation_type', 'class':'padding-tb-5 form-control','onchange':'MultiSelect(this)'}, {'width':'100%'}, window['window_relation_type'], ' ', 0,1)));

    var input = $.CreateInput({'name':'record', 'type':'text', 'value':'','class':'padding-tb-5 form-control '}, {'width':'80%','display':'inline-block'});
    var cancle = $.CreateA({'href':'javascript:void(0);','onclick':"RemoveRow(this)",'class':'remove-row'},{},'<i class="fa fa-times-circle"></i>');

    tds.push($.CreateTds({'class':'padding-3'},{},[input, cancle],''));

    var tr = $.CreateTr({'auto-id':0,'num':0, 'create':true},{},tds);

    $(body).prepend(tr);
}


function RemoveRow(ths){
    $(ths).parent().parent().remove();
}