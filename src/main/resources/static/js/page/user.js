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
    var competition=$("#competition").val();
    var name=$("#name").val();
    var sex=$("#sex").val();
    $("#tab").bootstrapTable({
        url:"/page/searchUserInfoPage",  //请求地址
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
                name:name,
                competition:competition,
                sex:sex
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
                title : '用户ID',
                field : 'userId',
                align: 'center'
                //sortable : true,
            },
            {
                title:'微信名',
                align: 'center',
                field:'name',
                formatter:common
            },

            {
                title : '性别',
                field : 'sex',
                align: 'center',
                formatter:sexresult
                // sortable : true
            },
            {
                title : '头像',
                field : 'headUrl',
                align: 'center',
                formatter:openimg
                // sortable : true
            },
            {
                title : '创建时间',
                align: 'center',
                field : 'createDate',
                //sortable : true,
            },
            {
                title : '是否参赛',
                align: 'center',
                field : 'competition',
                formatter:competitionshow
                //sortable : true,
            },
            // {
            //     title : '操作',
            //     field : 'videoId',
            //     align: 'center',
            //     // sortable : true
            //     formatter: jinyan
            // },
        ],

    })
}
// //操作
// function operateFormatter(value, row, index) {
//     //var e = '<a href="#" mce_href="#" onclick="edit(\''+ value + '\')">编辑</a> ';
//     //var c = '<a href="#" mce_href="#" onclick="detail(\''+ value + '\')">查看</a> ';
//     var d = '<a href="#" mce_href="#" onclick="del(\''+ value +'\')">删除</a> ';
//     return d;
//
// }
//是否参赛
function competitionshow(value, row, index) {
    var result=""
    if(value=="1"){
        result="参赛"
    }else if(value=="0"){
        result="未参赛"
    }else{
        result=value;
    }

    return result;

}
function sexresult(value, row, index) {
    var result=""
    if(value=="1"){
        result="男"
    }else if(value=="2"){
        result="女"
    }else if(value=="0"){
        result="";
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
// function jinyan(value,row,index) {
//     var e = '<button class="btn btn-primary"' +
//         'onclick="jinyanuser(\'' + value + '\')">禁言</button>';
//     ;
//     return j;
// }
// function jinyanuser() {
//
// }

//头像
    function openimg(value, row, index) {
        var img = "";
        if (value != null) {
            var img = "<img style='width: 30px;height: 30px;' src=" + value + " onclick=imgShow('#outerdiv','#innerdiv','#bigimg','" + value + "','')>";
            // var img="<div onclick=imgShow('#outerdiv','#innerdiv','#bigimg','" + value + "','')>"+value+"</div>"
        }
        return img;

    }

    function delAll() {
        // $("#table").bootstrapTable('getSelections');为bootstrapTable自带的，所以说一定要使用bootstrapTable显示表格,#table：为table的id
        var rows = $("#tab").bootstrapTable('getSelections');
        console.log(rows);
        if (rows.length == 0) {// rows 主要是为了判断是否选中，下面的else内容才是主要
            alert("请先选择要删除的记录!");
            return;
        } else {
            var arrays = new Array();// 声明一个数组
            $(rows).each(function () {// 通过获得别选中的来进行遍历
                arrays.push(this.commentId);// cid为获得到的整条数据中的一列
            });
            if (arrays.length != 0) {
                $.ajax({
                    type: "POST",
                    url: "/page/delCommentInfoPageAll",
                    data: {"arr": arrays},
                    traditional: true,
                    async: true,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        getResult();
                        alert(arrays.length + "条数据批量删除成功");
                    },
                    error: function () {
                    }
                });
            }
            // var idcard = arrays.join(','); // 获得要删除的id
            // console.log(idcard);
            // alert(idcard)

        }
    }

    function del(id) {
        $.ajax({
            type: "post",//数据发送的方式（post 或者 get）
            url: "/page/delCommentInfoPage",//要发送的后台地址
            data: 'commentId=' + id,
            traditional: true,
            // async: false,
            async: true,
            beforeSend: function () {
                console.log("删除中");
            },
            success: function (data) {//ajax请求成功后触发的方法
                //console.log(data);
                getResult();
                alert("删除成功");
            }
        })
    }

    function imgShow(outerdiv, innerdiv, bigimg, _this, type) {
        var src = _this.replace("https", "http");//获取当前点击的pimg元素中的src属性
        //console.log(src);
        $(bigimg).attr("src", src);//设置#bigimg元素的src属性
        $(bigimg).attr("data-type", type);
        /*获取当前点击图片的真实大小，并显示弹出层及大图*/
        $("<img/>").attr("src", src).on('load', function () {
            var windowW = $(window).width();//获取当前窗口宽度
            var windowH = $(window).height();//获取当前窗口高度
            var realWidth = this.width;//获取图片真实宽度
            var realHeight = this.height;//获取图片真实高度
            var imgWidth, imgHeight;
            var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

            if (realHeight > windowH * scale) {//判断图片高度
                imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放
                imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度
                if (imgWidth > windowW * scale) {//如宽度扔大于窗口宽度
                    imgWidth = windowW * scale;//再对宽度进行缩放
                }
            } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度
                imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放
                imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度
            } else {//如果图片真实高度和宽度都符合要求，高宽不变
                imgWidth = realWidth;
                imgHeight = realHeight;
            }
            $(bigimg).css("width", imgWidth);//以最终的宽度对图片缩放

            var w = (windowW - imgWidth) / 2;//计算图片与窗口左边距
            var h = (windowH - imgHeight) / 2;//计算图片与窗口上边距
            $(innerdiv).css({"top": h, "left": w});//设置#innerdiv的top和left属性
            $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
            $("#analysis").fadeIn("fast");
        });
        $(outerdiv).click(function () {//再次点击淡出消失弹出层
            $(this).fadeOut("fast");
        });
    }