// /**
//  * Created by wupeiqi on 15/8/11.
//  */
//
// $(function () {
//     $('#left_menu_ipaddr').addClass('active');
//     //Initialize('#table-body',1,true);
// });
//
// /*
// 刷新页面
//  */
// function Refresh(){
//     //获取搜索信息
//     var currentPage = GetCurrentPage('#pager');
//     Initialize('#table-body',currentPage,true);
// }
//
// /*
// 点击分页
//  */
// function ChangePage(page){
//     Initialize('#table-body',page, false);
// }
//
// /*
// 点击搜索
//  */
// function SearchSubmit(){
//     Initialize('#table-body',1,false);
// }
//
// /*
// 聚合搜索条件
// */
// function AggregationSearchCondition(conditions){
//     var ret = {};
//
//     $(conditions).children().each(function(){
//         var $condition = $(this).find("input[is-condition='true'],select[is-condition='true']");
//         var name = $condition.attr('name');
//         var value = $condition.val().trim();
//         if(!$condition.is('select')){
//             name = name + "__contains";
//         }
//         if(value) {
//             var valList = $condition.val().trim().replace('，', ',').split(',');
//             if (ret[name]) {
//                 ret[name] = ret[name].concat(valList);
//             } else {
//                 ret[name] = valList;
//             }
//         }
//     });
//     return ret;
// }
//
// /*
// 页面初始化（获取数据，绑定事件）
// */
// function Initialize(tBody,page, resetSummary){
//     $.Show('#shade,#loading');
//     // 获取所有搜索条件
//     var conditions = JSON.stringify(AggregationSearchCondition('#search_conditions'));
//     var $body = $(tBody);
//     var searchConditions = {};
//     var page = page;
//
//     $.ajax({
//         url:'/pool/ipaddr_list/',
//         type:'POST',
//         traditional:true,
//         data:{'condition':conditions,'page':page},
//         success:function(callback){
//
//             callback = $.parseJSON(callback);
//
//             //create global variable
//             InitGlobalDict(callback);
//
//             // init summary
//             if(resetSummary){
//                 InitChart('#summary_chart', callback.summary);
//                 InitSummary(callback.summary);
//
//             }
//
//             //embed table
//             EmbedIntoTable(callback.ipaddr, callback.start, "#table-body");
//
//             //ResetSort()
//             $.ResetTableSort('#table-head',"#table-body");
//
//             //pager
//             CreatePage(callback.pager,'#pager');
//
//             //bind function and event
//             $.BindTableSort('#table-head','#table-body');
//             $.BindDoSingleCheck('#table-body', null, SpecialOutEditFunc);
//
//             BindSelectConditionItem('.change-search-condition');
//             $.Hide('#shade,#loading');
//
//         },
//         error:function(){
//             $.Hide('#shade,#loading');
//         }
//     })
//
// }
//
// /*
// 绑定搜索选项更换
//  */
// function BindSelectConditionItem(conditionObj){
//     $(conditionObj).children().bind('click', function () {
//         var condition = $(this).attr('condition');
//         var text = $(this).text();
//         var findType = $(this).attr('find-type');
//         //全局变量key
//         var options = $(this).attr('options');
//         var $current = $(this).parent().parent();
//
//         if(findType == 'select'){
//             // you can add condition blow
//             var obj = $.CreateSelect({'is-condition':'true','class':'form-control select-icon no-radius','name':condition }, {}, window[options], null, 0 ,1);
//         }else{
//             var obj = $.CreateInput({'is-condition':'true','class':'form-control no-radius','name':condition,'placeholder':'逗号分割多条件'}, {});
//         }
//         $current.children().first().text(text);
//         $current.next().remove();
//         $current.parent().append(obj);
//     });
// }
//
//
// /*
//  初始化IP概要图标
//  */
// function InitChart(target, summary){
//     var options = {
//         credits:{
//             text: '',
//             href: 'http://www.haodf.com'
//         },
//         legend:{
//             align:'right',
//             layout:'vertical',
//             verticalAlign:'bottom',
//             itemStyle:{ cursor: 'pointer', color: '#3E576F',padding:"8px" }
//         },
//         chart: {
//             plotBackgroundColor: null,
//             plotBorderWidth: null,
//             plotShadow: false
//         },
//         title: {
//             text: ''
//         },
//         tooltip: {
//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     color: '#000000',
//                     connectorColor: '#000000',
//                     distance: -0,
//                     format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//                 },
//                 showInLegend: true
//             }
//         },
//         series: [{
//             type: 'pie',
//             name: 'IP资源池',
//             data: [
//                 ['闲置',summary.data.idle],
//                 ['占用',summary.data.use]
//             ]
//         }]
//     };
//     $(target).highcharts(options);
// }
//
//
// /* 初始化概要 */
// function InitSummary(summary){
//
//     $('#summary_all').text(summary.data.totle);
//     $('#summary_use').text(summary.data.use);
//     $('#summary_idle').text(summary.data.idle);
// }
//
// /*
// 初始化字典到全局变量，以便Select中的选项使用
//  */
// function InitGlobalDict(callback){
//     window.window_status = callback.status_choice.data;
//     window.window_vlan = callback.vlan_choice.data;
//
// }
//
// /*
// 将后台ajax数据嵌套到table中
// */
// function EmbedIntoTable(response,startNum,body){
//     if(!response.status){
//         alert(response.message);
//     }else{
//         //清除table中原内容
//         $(body).empty();
//
//         $.each(response.data,function(key,value){
//             var tds = [];
//             tds.push($.CreateTd({},{},$.CreateInput({'type':'checkbox'},{})));
//             tds.push($.CreateTd({},{},startNum + key + 1));
//             tds.push($.CreateTd({'edit-enable':'true','edit-type':'input','name':'ipaddr','origin':value.ipaddr},{}, value.ipaddr));
//             tds.push($.CreateTd({'edit-enable':'true','edit-type':'input','name':'getway','origin':value.getway},{}, value.getway));
//             tds.push($.CreateTd({'edit-enable':'true','edit-type':'input','name':'mask','origin':value.mask},{}, value.mask));
//             tds.push($.CreateTd({'edit-enable':'true','edit-type':'select','value_key':'id','text_key':'caption','name':'vlan_id','origin':value.vlan__id,'edit-option':'vlan','options':'window_vlan'},{}, value.vlan__caption));
//             var status_text = GetIpStatus(value.status);
//             tds.push($.CreateTd({'edit-enable':'true','edit-type':'select','value_key':0,'text_key':1,'name':'status','origin':value.status,'edit-option':'status','options':'window_status'},{}, status_text));
//             var tr = $.CreateTr({'auto-id':value.id,'num':startNum + key + 1},{},tds);
//             $(body).append(tr);
//
//         })
//
//     }
// }
//
// /*
// 将状态码 0 或1 转换成文字
//  */
// function GetIpStatus(value){
//     var content = "";
//
//     if(value=='0'){
//         content = "<span class='label label-success'>空闲</span>";
//     }else if(value=='1'){
//         content = "<span class='label label-danger'>已占用</span>";
//     }
//
//     return content;
// }
//
// /*
// 创建分页信息
// */
// function CreatePage(data,target){
//     $(target).empty().append(data);
// }
//
// /*
// 获取当前页码（根据分页css）
//  */
// function GetCurrentPage(pager) {
//     var page = $(pager).find("li[class='active']").text();
//     return page;
// }
//
// /*
// 监听是否已经按下control键
// */
// window.globalCtrlKeyPress = false;
// window.onkeydown = function(event){
//     if(event && event.keyCode == 17){
//         window.globalCtrlKeyPress = true;
//     }
// };
//
// /*
// 按下Control，联动表格中正在编辑的select
//  */
// function MultiSelect(ths){
//     if(window.globalCtrlKeyPress){
//         var index = $(ths).parent().index();
//         var value = $(ths).val();
//         $(ths).parent().parent().nextAll().find("td input[type='checkbox']:checked").each(function(){
//             $(this).parent().parent().children().eq(index).children().val(value);
//         });
//     }
// }
//
// /*
// 更新资产（退出编辑状态;获取资产中变更的字段；提交数据；显示状态）
// */
// function Save(){
//
//     if($('#edit_mode_target').hasClass('btn-warning')){
//         $.TableEditMode('#edit_mode_target','#table-body');
//     }
//
//     var target_status = '#handle_status';
//     //get data
//     var updateData = [];
//     $('#table-body').children().each(function(){
//         var rows = {};
//         var id = $(this).attr('auto-id');
//         var num = $(this).attr('num');
//         var flag = false;
//         $(this).children('td[edit-enable="true"]').each(function(){
//             var editType = $(this).attr('edit-type');
//             if(editType == 'input'){
//                 var origin = $(this).attr('origin');
//                 var newer = $(this).text();
//                 var name = $(this).attr('name');
//
//                 if(newer && newer.trim() && origin != newer){
//                     rows[name] = newer;
//                     flag = true;
//                 }
//             }else{
//                 var origin = $(this).attr('origin');
//                 var newer = $(this).attr('new-value');
//                 var name = $(this).attr('name');
//
//                 if(newer && newer.trim() && origin != newer){
//                     rows[name] = newer;
//                     flag = true;
//                 }
//             }
//
//         });
//         if(flag){
//             rows["id"] = id;
//             rows["num"] = num;
//             updateData.push(rows);
//         }
//     });
//     if(updateData.length<1){
//         return;
//     }
//     //submit data
//     updateData = JSON.stringify(updateData);
//     $.ajax({
//         url:'/pool/ipaddr_modify/',
//         type:'POST',
//         traditional:true,
//         data:{'data':updateData},
//         success: function (callback) {
//             callback = $.parseJSON(callback);
//             if(callback.status == 1){
//                 //success
//                 AllSuccessStatus(target_status,callback.data);
//             }else{
//                 PartSuccessStatus(target_status,callback.data,callback.message);
//             }
//             Refresh();
//         },
//         error:function(){
//             alert('请求错误.');
//             Refresh();
//         }
//     });
// }
//
//
// /*
// 添加VLAN-取消
// */
// function CancelModal(container){
//     $("#do_add_form").find('input').val('');
//     $('#do_add_modal').modal('hide')
// }
//
// /*
// 添加VLAN-提交
// */
// function SubmitModal(formId,statusId){
//     var data_dict = {};
//     $(formId).find('input[type="text"],select').each(function(){
//         var name = $(this).attr('name');
//         var val =  $(this).val();
//         data_dict[name] = val
//     });
//     ClearLineError(formId,statusId);
//     $.ajax({
//         url: '/user_add',
//         type: 'POST',
//         traditional: true,
//         data: data_dict,
//         success:function(callback){
//             callback = $.parseJSON(callback);
//             if(callback.status == 1){
//                 PartSuccessStatus('#handle_status', callback.summary, callback.detail);
//                 CancelModal();
//                 Refresh();
//             }else if(callback.status == 2){
//                 AllSuccessStatus('#handle_status', callback.summary);
//                 CancelModal();
//                 Refresh();
//             }else{
//                 if(callback.summary){
//                     SummaryError(callback.summary,statusId);
//                 }
//                 if(callback.error){
//                     LineError(callback.error,formId);
//                 }
//             }
//         }
//     });
//
// }
//
// /*
// 删除VLAN
// */
// function DoDeleteVlan(){
//     var target_status = '#handle_status';
//     var table_body = '#table-body';
//     var rows = [];
//
//     $(table_body).find('input:checked').each(function(){
//         var id = $(this).parent().parent().attr('auto-id');
//         var num = $(this).parent().parent().attr('num');
//         rows.push({'id':parseInt(id),'num':parseInt(num)});
//     });
//
//     rows = JSON.stringify(rows);
//     $.ajax({
//         url: '/pool/ipaddr_del/',
//         type: 'POST',
//         traditional: true,
//         data: {'rows': rows},
//         success:function(callback){
//             $.Hide('#shade,#modal_delete');
//             callback = $.parseJSON(callback);
//             if(callback.status == 1){
//                 //success
//                 AllSuccessStatus(target_status,callback.data);
//             }else{
//                 PartSuccessStatus(target_status,callback.data,callback.message);
//             }
//             Refresh();
//         }
//     });
// }
//
// /*
// 清除所有行下的错误信息
//  */
// function ClearLineError(formId,statusId){
//     $(statusId).empty();
//     $(formId).find('div[class="form-error"]').remove();
// }
//
// /*
// 添加行错误信息
//  */
// function LineError(errorDict,formId){
//     //find all line，add error
//     $.each(errorDict,function(key,value){
//         var errorStr = '<div class="form-error">'+ value[0]['message'] +'</div>';
//         $(formId).find('input[name="'+key+'"]').after(errorStr);
//     });
// }
// /*
// 添加整体错误信息
//  */
// function SummaryError(errorStr,statusId){
//     $(statusId).text(errorStr);
// }
//
// /*
// 新建IP，局部成功
// target:信息概要标签
// content：概要内容
// errorList:详细错误信息
//  */
// function PartSuccessStatus(target,content,errorList){
//     $(target).attr('data-toggle','popover');
//
//     var errorStr = '';
//     $.each(errorList,function(k,v){
//         errorStr = errorStr + v.num + '. '+ v.message + '</br>';
//     });
//
//     $(target).attr('data-content',errorStr);
//     $(target).popover();
//
//     var msg = "<i class='fa fa-info-circle'></i>" + content;
//     $(target).empty().removeClass('btn-success').addClass('btn-danger').html(msg);
//
// }
//
// /*
// 新建IP，全部成功
// target：信息概要标签
// content：信息内容
//  */
// function AllSuccessStatus(target,content){
//     $(target).popover('destroy');
//
//     var msg = "<i class='fa fa-check'></i>" + content;
//     $(target).empty().removeClass('btn-danger').addClass('btn-success').html(msg);
//     setTimeout(function(){ $(target).empty().removeClass('btn-success btn-danger'); },5000);
// }
//
//
// function SpecialOutEditFunc($td, editOption){
//     if(editOption=='status'){
//         $td.removeClass('padding-3');
//         var selecting_val = $td.children().first().val();
//         var selecting_text = $td.children().first().find("option[value='"+selecting_val+"']").text();
//         $td.html(GetIpStatus(selecting_val));
//         $td.attr('new-value',selecting_val);
//     }else{
//         $td.removeClass('padding-3');
//         var selecting_val = $td.children().first().val();
//         var selecting_text = $td.children().first().find("option[value='"+selecting_val+"']").text();
//         $td.html(selecting_text);
//         $td.attr('new-value',selecting_val);
//     }
// }


// 取消模态对话框
function CancelModal(container) {
    $("#do_add_form").find('input').val('');
    $('#do_add_modal').modal('hide')
}

// 提交form表单
function SubmitModal(formId) {
    var data_dict = {};
    $(formId).find('input, select').each(function () {
        var name = $(this).attr('name');
        var val = $(this).val();
        data_dict[name] = val
    });
    $.ajax({
        url: 'user_add',
        type: 'POST',
        data: data_dict,
        dataType: 'json',
        success: function () {
            CancelModal();
        }
    })
}

function DoDeleteUser() {
    var id_list = [];
    $("#table-body").find('input:checked').each(function () {
        var user_nid = parseInt($(this).attr('id'));
        id_list.push(user_nid)
    });
    $.ajax({
        url: '/user_delete',
        type: 'POST',
        data: {'id_list': JSON.stringify(id_list)},
        dataType: 'json',
        success: function (callback) {
            console.log(callback);
            console.log(11);
            $.Hide('#shade,#modal_delete');
        }
    })
}

// 进入编辑模式
function SpecialOutEditFunc($td, editOption) {
    if (editOption == 'status') {
        $td.removeClass('padding-3');
        var selecting_val = $td.children().first().val();
        var selecting_text = $td.children().first().find("option[value='" + selecting_val + "']").text();
        $td.html(selecting_val);
        $td.attr('new-value', selecting_val);
    } else {
        $td.removeClass('padding-3');
        var selecting_val = $td.children().first().val();
        var selecting_text = $td.children().first().find("option[value='" + selecting_val + "']").text();
        $td.html(selecting_text);
        $td.attr('new-value', selecting_val);
    }
}

// 保存修改信息
function Save() {
    
    if ($('#edit_mode_target').hasClass('btn-warning')) {
        $.TableEditMode('#edit_mode_target', '#table-body');
    }
    var target_status = '#handle_status';
    var updateData = [];
    $('#table-body').children().each(function () {
        var rows = {};
        var id = $(this).attr('nid');
        var flag = false;

        $(this).children('td[edit-enable="true"]').each(function () {
            var origin = $(this).attr('origin');
            var newer = $(this).text();
            var name = $(this).attr('name');

            if (newer && newer.trim() && origin != newer) {
                rows[name] = newer;
                flag = true;
            }
        });
        if (flag) {
            rows['nid'] = id;
            updateData.push(rows);
        }
    });
    if (updateData.length < 1) {
        return;
    }
    console.log(updateData);
    updateData = JSON.stringify(updateData);
    $.ajax({
        url: 'update_user',
        type: 'POST',
        data: {'data': updateData},
        dataType:'json',
        success:function (callback) {
            print(callback)
        }
    })
}