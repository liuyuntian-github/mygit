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
}
function getResult() {
    $("#tab").bootstrapTable('destroy');
     var foodName=$("#foodName").val();
     var price=$("#price").val();
    $("#tab").bootstrapTable({
        url:"/menu/selectByMenuShow",  //请求地址
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
        showColumns:true,
        showToggle:true,
        queryParams : function (params) {//上传服务器的参数
            var temp = {//如果是在服务器端实现分页，limit、offset这两个参数是必须的
                // limit : params.limit, // 每页显示数量
                // offset : params.offset, // SQL语句起始索引*/
                // page: (params.offset / params.limit) + 1,   //当前页码
                foodName:foodName,
                price:price

            };
            return temp;
        },
        columns : [
            {
                checkbox: true,
                visible: true                  //是否显示复选框
            },
            // {
            //     title: '序号',
            //     field: '',
            //     align: 'center',
            //     //sortable : true,
            //     formatter: function (value, row, index) {
            //         var pageSize = $('#tab').bootstrapTable('getOptions').pageSize;     //通过table的#id 得到每页多少条
            //         var pageNumber = $('#tab').bootstrapTable('getOptions').pageNumber; //通过table的#id 得到当前第几页
            //         return pageSize * (pageNumber - 1) + index + 1;    // 返回每条的序号： 每页条数 *（当前页 - 1 ）+ 序号
            //     }
            // },
            {
                title: '序号',
                align: 'center',
                halign: 'center',
                formatter: function (value, row, index) {
                    var options = $("#tab").bootstrapTable('getOptions');
                    return options.pageSize * (options.pageNumber - 1) + index + 1;
                }
            },
            {
                title : '名称',
                field : 'foodName',
                align: 'center'
                //sortable : true,
            },
            {
                title : '图片',
                field : 'foodUrl',
                align: 'center',
                formatter:openimg
                //sortable : true,
            },{
                title : '创建时间',
                field : 'createDate',
                align: 'center'
                //sortable : true,
            },{
                title : '修改时间',
                field : 'updateDate',
                align: 'center'
                //sortable : true,
            },{
                title : '价格',
                field : 'price',
                align: 'center',
                formatter:common
                //sortable : true,
            },{
                title : '类型',
                field : 'foodType',
                align: 'center',
                formatter:typeshow
                //sortable : true,
            },{
                field: 'menuId',
                title: '操作',
                align: 'center',
                formatter : operateFormatter
            },

        ],

    })
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
    var d='<button class="btn btn-primary delete" style="background-color: red" data-toggle="modal"'+
        'onclick="del(\''+value+'\')" data-whatever="@mdo">删除</button>';
    return e+d;
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
    $("#menuId_add").val(rows.menuId);
    $("#foodName_add").val(rows.foodName);
    $("#price_add").val(rows.price);
    $("#foodType_add").val(rows.foodType);
    $("#img0").attr("src","../img/"+rows.foodUrl);
    console.log(rows);
}
//判断是新增还是修改
function checkurl(menuId) {
    if(menuId==''){
        url='/menu/saveMenu';
    }else{
        url='/menu/updateMenu';
    }
    return url;
}
function update() {
    $("#mymodal-data").modal('hide');
    var menuId=$("#menuId_add").val();
    var url=checkurl(menuId);
    var foodName=$("#foodName_add").val();
    var price=$("#price_add").val();
    var foodType=$("#foodType_add").val();
    var fordata = new FormData(); //生成文件对象
    fordata.append('menuId',menuId);
    fordata.append('foodName',foodName);
    fordata.append('price',price);
    fordata.append('foodType',foodType);//添加值
    fordata.append('img',$('#file0')[0].files[0]); //添加文件流
    $.ajax({
        type: "POST",
        url: url,
        data: fordata,
        contentType:false,
        processData:false,//这个很有必要，不然不行
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