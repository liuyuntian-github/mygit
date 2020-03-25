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
     var tel=$("#tel").val();
     var categoryNumber=$("#categoryNumber").val();
    var category=$("#category").val();
    var auditStatus=$("#auditStatus").val();
    $("#tab").bootstrapTable({
        url:"/page/searchVideoPage",  //请求地址
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'server',//server:服务器端分页|client：前端分页
        pageSize : 10,//单页记录数
        pageList : [ 10,20,40],//可选择单页记录数
        showRefresh : true,//刷新按钮
        sortable:true,
        // exportTypes:['excel'],  //导出文件类型，[ 'csv', 'txt', 'sql', 'doc', 'excel', 'xlsx', 'pdf']
        showExport: true,
        queryParams : function (params) {//上传服务器的参数
            var temp = {//如果是在服务器端实现分页，limit、offset这两个参数是必须的
                limit : params.limit, // 每页显示数量
                offset : params.offset, // SQL语句起始索引*/
                page: (params.offset / params.limit) + 1,   //当前页码
                tel:tel,
                categoryNumber:categoryNumber,
                category:category,
                auditStatus:auditStatus
            };
            return temp;
        },
        columns : [
            {
                checkbox: true,
                visible: true                  //是否显示复选框
            },
            {
                title: '序号',
                field: '',
                align: 'center',
                //sortable : true,
                formatter: function (value, row, index) {
                    var pageSize = $('#tab').bootstrapTable('getOptions').pageSize;     //通过table的#id 得到每页多少条
                    var pageNumber = $('#tab').bootstrapTable('getOptions').pageNumber; //通过table的#id 得到当前第几页
                    return pageSize * (pageNumber - 1) + index + 1;    // 返回每条的序号： 每页条数 *（当前页 - 1 ）+ 序号
                }
            },
            {
                title : '视频标题',
                field : 'title',
                align: 'center'
                //sortable : true,
            },
            {
                title : '真实姓名',
                align: 'center',
                field : 'realName',

                //sortable : true,
            },
            {
                title:'描述',
                align: 'center',
                field:'content',
                formatter:common
            },

            {
                title : '点赞数',
                field : 'fabulous',
                align: 'center',
                formatter:common
                // sortable : true
            },
            {
                title : '部门',
                align: 'center',
                field : 'department',
                //sortable : true,
            },
            {
                title : '视频分类',
                align: 'center',
                field : 'category',
                formatter:categoryResult
                //sortable : true,
            },
            {
                title : '电话',
                align: 'center',
                field : 'tel',
                formatter:common
                //sortable : true,
            },
            {
                title : '工号',
                align: 'center',
                field : 'videoNumber',
                formatter:common
                //sortable : true,
            },
            {
                title : '编号',
                align: 'center',
                field : 'categoryNumber',
                formatter:common
                //sortable : true,
            },
            {
                title : '创建时间',
                field : 'createDate',
                align: 'center',
                formatter:comment
                // sortable : true
            },
            {
                title : '视频地址',
                field : 'videoUrl',
                align: 'center',
                // sortable : true
            },

            {
                title : '操作',
                field : 'videoId',
                align: 'center',
                // sortable : true
                formatter:operateFormatter
            },
            {
                title : '视频',
                field : 'videoUrl',
                align: 'center',
                // sortable : true
                formatter:videoshow
            },

            {
                title : '审核状态',
                field : 'auditStatus',
                align: 'center',
                // sortable : true
                formatter:auditStatusShow
            }

        ],

    })
}
//审核状态按钮
function auditStatusShow(value, row, index) {
    var result=""
    if(value=='0'){
        var states='<button class="btn btn-primary"'+
            'onclick="choosestatus(\''+index+'\')" >审核通过</button>'
    }else if(value=='1'){
        var states='<button class="btn btn-primary" style="background-color: red" '+
            'onclick="choosestatus(\''+index+'\')" >审核未通过</button>'
    }
    return states;
}
//审核状态选择
function choosestatus(index) {
    var rows=$("#tab").bootstrapTable("getData")[index];
    var videoId=rows.videoId;
    var auditStatus="";
    if(rows.auditStatus==0){
        auditStatus='1';
    }else if(rows.auditStatus==1){
        auditStatus='0';
    }
    $.ajax({
        type: "POST",
        url: "/page/updateVideoInfo",
        data: '{"auditStatus":"'+auditStatus+'",'+
            '"videoId":"'+videoId+'"}',
        traditional:true,
        async: true,
        contentType:'application/json;charset=utf-8',
        dataType : "json",
        success: function(data){
            console.log(data);
            alert("修改审核状态成功");
            getResult();

        },
        error: function(){
        }
    });

}

function comment(value, row, index) {
    //var e = '<a href="#" mce_href="#" onclick="edit(\''+ value + '\')">编辑</a> ';
    //var c = '<a href="#" mce_href="#" onclick="detail(\''+ value + '\')">查看</a> ';
    var d ="<div title='"+value+"'>"+value+"</div>";
    return d;

}
//操作
function operateFormatter(value, row, index) {
    //var e = '<a href="#" mce_href="#" data-target="mymodal-data" onclick="edit(\''+ index + '\')">编辑</a> ';
    var e='<button class="btn btn-primary delete" data-toggle="modal"'+
    'data-target="#mymodal-data" onclick="edit(\''+index+'\')" data-whatever="@mdo">编辑</button>';
    //var c = '<a href="#" mce_href="#" onclick="detail(\''+ value + '\')">查看</a> ';
    //var d = '<a href="#" mce_href="#" onclick="del(\''+ value +'\')">删除</a> ';
    return e;
}
function videoshow(value,row,index) {
    var video='<button class="btn btn-primary delete" data-toggle="modal"'+
        'data-target="#mymodal1-data" onclick="play(\''+value+'\')" data-whatever="@mdo">播放</button>'
    return video;
}
function play(value) {
    // $("#videourl").html("");
    // var source='<source src="'+value+'" type="video/mp4" width="544" height="960" >'
    // console.log(value);
    // $("#videourl").html(source);
    document.getElementById("videourl").src = value;
}
function  edit(index) {
    var rows=$("#tab").bootstrapTable("getData")[index];
    $("#videoIdshow").val(rows.videoId);
    $("#titleshow").val(rows.title);
    $("#realNameshow").val(rows.realName);
    $("#contentshow").val(rows.content);
    $("#departmentshow").val(rows.department);
    $("#categoryshow").val(rows.category);
    $("#telshow").val(rows.tel);
    $("#videoNumbershow").val(rows.videoNumber);
    console.log(rows);
}
function update() {
    $("#mymodal-data").modal('hide');
    var title=$("#titleshow").val();
    var realName=$("#realNameshow").val();
    var content=$("#contentshow").val();
    var department=$("#departmentshow").val();
    var category=$("#categoryshow").val();
    var tel=$("#telshow").val();
    var videoNumber=$("#videoNumbershow").val();
    var videoId=$("#videoIdshow").val();
    $.ajax({
        type: "POST",
        url: "/page/updateVideoInfo",
        data: '{"title":"'+title+'",'+
            '"realName":"'+realName+'",'+
            '"content":"'+content+'",'+
            '"department":"'+department+'",'+
            '"category":"'+category+'",'+
            '"tel":"'+tel+'",'+
            '"videoNumber":"'+videoNumber+'",'+
            '"videoId":"'+videoId+'"}',
        traditional:true,
        async: true,
        contentType:'application/json;charset=utf-8',
        dataType : "json",
        success: function(data){
            console.log(data);
            alert("修改成功");
            getResult();

        },
        error: function(){
        }
    });
}

function categoryResult(value, row, index) {
    var result=""
    if(value=="1"){
        result="文艺表演"
    }else if(value=="2"){
        result="文化艺术"
    }else if(value=="3"){
        result="生活创意";
    }

    return result;

}
function sexresult(value, row, index) {
    var result=""
    if(value=="1"){
        result="男"
    }else if(value=="2"){
        result="女"
    }else{
        result=value;
    }

    return result;

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
//头像
function openimg(value, row, index) {
    var img="";
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
/*function refreshResult() {
    var param = {
        url : '../ajaxjsp/cqltj_json.jsp?type=getCqltj'
            + '&name=' + encodeURI(encodeURI(name))
            + '&search_name='
            + encodeURI(encodeURI(search_name))
            + '&year_month='
            + encodeURI(encodeURI(year_month))
    }
    $('#getCqltj').bootstrapTable('refresh',param);*/

//}