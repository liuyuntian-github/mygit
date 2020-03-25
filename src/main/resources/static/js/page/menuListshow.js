var sum=0;
$('#data').click(function () {
    if(sum%2==0){
        $('table').css("table-layout","auto");
        sum++;
        console.log("auto"+sum);
    }else{
        $('table').css("table-layout","fixed");
        sum++;
        console.log("fixed"+sum);
    }

})
//重置按钮
$('#clears').click(function(){
    $('.clear').each(function(){
        $(this).val("");
    });
})
window.onload=function () {
    getResult();
    selectByType('meat_add');
    selectByType('element_add');
    selectByType('soup_add');
    selectByType('staple_food_add');
}
// function getResult() {
//      var foodName=$("#foodName").val();
//      var price=$("#price").val();
//     $.ajax({
//         type: "post",//数据发送的方式（post 或者 get）
//         url: "/menu/selectByMenuShow",//要发送的后台地址
//         data: 'foodName='+foodName+'&price='+price,
//         traditional: true,
//         // async: false,
//         async: true,
//         success: function (data) {//ajax请求成功后触发的方法
//            console.log(data);
//
//
//         }
//     })
// }
function getResult() {
    $("#tab").bootstrapTable('destroy');
     // var foodName=$("#foodName").val();
     // var price=$("#price").val();
    $("#tab").bootstrapTable({
        url:"/menu/selectByWeekMenu",  //请求地址
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'client',//server:服务器端分页|client：前端分页
        pageSize : 10,//单页记录数
        pageList : [ 10,20,40],//可选择单页记录数
        showRefresh : true,//刷新按钮
        sortable:true,
        // exportTypes:['excel'],  //导出文件类型，[ 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf']
        showExport: true,
        queryParams : function (params) {//上传服务器的参数
            var temp = {//如果是在服务器端实现分页，limit、offset这两个参数是必须的
                // limit : params.limit, // 每页显示数量
                // offset : params.offset, // SQL语句起始索引*/
                // page: (params.offset / params.limit) + 1,   //当前页码
                // foodName:foodName,
                // price:price

            };
            return temp;
        },
        columns : [
            {
                field: 'week',
                title: '星期',
                align: 'center',
            },
            {
                field: 'meat',
                title: '荤',
                align: 'center',
            },
            {
                field: 'element',
                title: '素',
                align: 'center',
            },
            {
                field: 'soup',
                title: '汤',
                align: 'center',
            },
            {
                field: 'stapleFood',
                title: '主食',
                align: 'center',
            },
            {
                field: 'total',
                title: '总计',
                align: 'center',
            },
            {
                field: 'weekId',
                title: '操作',
                align: 'center',
                formatter : operateFormatter
            },

        ],

    })
}
function selectByType(id) {
    var foodType="";
    $("#"+id).html("");
    //$("#"+id).not('option:first').html("");
    if(id=='meat_add'){
        foodType='1';
    }else if(id=='element_add'){
        foodType='2';
    }else if(id=='soup_add'){
        foodType='3';
    }else if(id=='staple_food_add'){
        foodType='4';
    }
    console.log("foodType=="+foodType);
    var str="<option value=''>请选择</option>";
    $.ajax({
        type: "POST",
        url: '/menu/selectByType',
        data: 'foodType='+foodType,
        traditional: true,
        // async: false,
        async: true,
        success: function(data){
            $.each(data, function (i, data) {
                //console.log(data);
                str += "<option value='" + data.menuId + "'>" + data.foodName + "</option>";
            })

            $("#"+id).html(str);

        },
        error: function(){
        }
    });
}
function checkNum(input){

    var reg=/^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/

    var num=document.getElementById(input).value;

    if(!reg.test(num)){

        alert("请输入数字");

        document.getElementById(input).value="";

        return false;
    }else{
        update();
    }
}
//操作
function operateFormatter(value, row, index) {
    var e='<button class="btn btn-primary delete" data-toggle="modal"'+
    'data-target="#mymodal-data" " onclick="edit(\''+index+'\')" data-whatever="@mdo">编辑</button>';
    return e;
}
function typeshow(value, row, index) {
    var type="";
    if(value=='1') {
        type = "荤";
    }else if(value=='2'){
        type="素";
    }else if(value=='3'){
        type="汤";
    }else if(value=='4'){
        type="主食";
    }
    return type;
}
function del(id) {
    $.ajax({
        type: "post",//数据发送的方式（post 或者 get）
        url: "/menu/updateMenuDelete",//要发送的后台地址
        data: 'menuId='+id,
        traditional: true,
        // async: false,
        async: true,
        beforeSend: function () {
            console.log("删除中");
        },
        success: function (data) {//ajax请求成功后触发的方法
            console.log(data);
            getResult();
            alert("删除成功");
        }
    })
}

function  edit(index) {
    var rows=$("#tab").bootstrapTable("getData")[index];
    $("#meat_add").val(rows.meatId);
    $("#element_add").val(rows.elementId);
    $("#soup_add").val(rows.soupId);
    $("#staple_food_add").val(rows.stapleFoodId);
    $("#weekId_add").val(rows.weekId);
    console.log(rows);
}
function update() {
    $("#mymodal-data").modal('hide');
    var weekId=$("#weekId_add").val();
    var meat=$("#meat_add").val();
    var element=$("#element_add").val();
    var soup=$("#soup_add").val();
    var stapleFood=$("#staple_food_add").val();
    console.log("weekId=="+weekId);
    var result='weekId='+weekId+'&meat='+meat+'&element='+element+'&soup='+soup
        +'&stapleFood='+stapleFood;
    var url='/menu/updateWeekMenu';
    $.ajax({
        type: "POST",
        url: url,
        data: result,
        traditional: true,
        // async: false,
        async: true,
        success: function(data){
            console.log(data);
            alert("保存成功");
            getResult();

        },
        error: function(){
        }
    });
}
function common(value, row, index) {
    //var e = '<a href="#" mce_href="#" onclick="edit(\''+ value + '\')">编辑</a> ';
    //var c = '<a href="#" mce_href="#" onclick="detail(\''+ value + '\')">查看</a> ';
    var d="";
    if(value==null){
        d ="<div >-</div>";
    }else{
        d ="<div title='"+value+"'>"+value+"</div>";
    }

    return d;

}
//图片显示
function openimg(value, row, index) {
    var img="";
    var value="../img/"+value;
    console.log("img==="+value);
    if(value!=null) {
        var img = "<img style='width: 30px;height: 30px;' src=" + value + " onclick=imgShow('#outerdiv','#innerdiv','#bigimg','" + value + "','')>";
        // var img="<div onclick=imgShow('#outerdiv','#innerdiv','#bigimg','" + value + "','')>"+value+"</div>"
    }
    return img;

}
function imgShow(outerdiv, innerdiv, bigimg, _this,type){
    var src = _this.replace("https","http");//获取当前点击的pimg元素中的src属性
    //console.log(src);
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性
    $(bigimg).attr("data-type",type);
    /*获取当前点击图片的真实大小，并显示弹出层及大图*/
    $("<img/>").attr("src", src).on('load',function(){
        var windowW = $(window).width();//获取当前窗口宽度
        var windowH = $(window).height();//获取当前窗口高度
        var realWidth = this.width;//获取图片真实宽度
        var realHeight = this.height;//获取图片真实高度
        var imgWidth, imgHeight;
        var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

        if(realHeight>windowH*scale) {//判断图片高度
            imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放
            imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度
            if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度
                imgWidth = windowW*scale;//再对宽度进行缩放
            }
        } else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度
            imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放
            imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度
        } else {//如果图片真实高度和宽度都符合要求，高宽不变
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
        $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放

        var w = (windowW-imgWidth)/2;//计算图片与窗口左边距
        var h = (windowH-imgHeight)/2;//计算图片与窗口上边距
        $(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
        $("#analysis").fadeIn("fast");
    });
    $(outerdiv).click(function(){//再次点击淡出消失弹出层
        $(this).fadeOut("fast");
    });
}
//上传图片预览
function getObjectURL(file) {
    var url = null;
    if(window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    }else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    }else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
$("#file0").change(function(){
    var objUrl = getObjectURL(this.files[0]) ;//获取文件信息
    console.log("objUrl = "+objUrl);
    if (objUrl) {
        $("#img0").attr("src", objUrl);
    }
});

// $("#img0").click(function () {
//     var imgsrc=$("#img0")[0].src;
//     imgShow('#outerdiv','#innerdiv','#bigimg',imgsrc);
// })