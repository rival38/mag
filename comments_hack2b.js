(function() { var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true; po.src = '//www.blogblog.com/dynamicviews/4224c15c4e7c9321/js/comments.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); })();

Config.maxThreadDepth=12,Display_Emo=!0,Replace_Youtube_Link=!0,Replace_Image_Link=!1,Replace_Force_Tag=!1,Replace_Image_Ext=["JPG","GIF","PNG","BMP"],Emo_List=[":)","//1.bp.blogspot.com/-ox9NrojtBtQ/VYQL4SfaNKI/AAAAAAAABAo/a0bmvk7Teas/w24-h24/smile.gif",":(","//3.bp.blogspot.com/-GQiWCEsgBBs/VYQL1q7zMAI/AAAAAAAABAg/L9kDfsdSteo/w24-h24/sad.gif","=(","//4.bp.blogspot.com/-kPIxS_cKGvg/VYQLtmLD5pI/AAAAAAAAA_4/iXNJOUGz1Go/w24-h24/cry.gif","^_^","//4.bp.blogspot.com/-GM0_9-xpBX0/VYQLzyDwkFI/AAAAAAAABAY/1ZJKuCqv6J4/w24-h24/love.gif",":D","//4.bp.blogspot.com/-4B_iMNYqvp0/VYQL54_HH9I/AAAAAAAABAw/g7MpM1MjmIg/w24-h24/smiled.gif","=D","//4.bp.blogspot.com/-xCdcX2UL4k0/VYQLzc8unjI/AAAAAAAABAQ/hMufJ3fPcd4/w24-h24/laugh.gif",";)","//3.bp.blogspot.com/-pzMmYhGdFfQ/VYQLvYWg_lI/AAAAAAAABAI/m39gPmQnvhM/w24-h24/kiss.gif",":-d","//2.bp.blogspot.com/-hTHdt9c4ffo/VYQLudK4gGI/AAAAAAAABAA/Pf5hCCVMtPs/w24-h24/good.gif"],Force_Tag=["[pre]","<pre>","[/pre]","</pre>",'<pre class="brush: plain; title: ; notranslate" title="">',"&lt;code&gt;","</pre>","</code>"];
var Cur_Cform_Hdr = '.comment_form';
var Cur_Cform_Url = $('#comment-editor').attr('src');

function trim(str) {
    var whitespace = ' \n\r\t\f\x5b\x5d\x7c\x7d\x3c\x3e\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (var i = 0; i < str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) != -1) {
            str = str.substring(0, i);
            break
        }
    }
    return str
}
$('#comment_block .comment_body p').html(function(index, oldhtml) {
    if (Replace_Youtube_Link) {
        var search_key = 'https://www.youtube.com/watch?v=';
        var check_index = oldhtml.indexOf(search_key);
        while (check_index != -1) {
            ht = oldhtml.substring(check_index);
            yt_link = trim(ht);
            var yt_code_index = yt_link.indexOf('&');
            var yt_code = '';
            if (yt_code_index == -1) {
                yt_code = yt_link.substring(search_key.length)
            } else {
                yt_code = yt_link.substring(search_key.length, yt_code_index)
            }
            var yt_video = '<iframe class="comment_youtube" src="https://www.youtube.com/embed/' + yt_code + '?autohide=1" frameborder="0" allowfullscreen></iframe>';
            oldhtml = oldhtml.substring(0, check_index) + yt_video + oldhtml.substring(check_index + yt_link.length);
            check_index = oldhtml.indexOf(search_key);
            if (check_index == -1) {
                search_key = 'https://www.youtube.com/watch?v=';
                check_index = oldhtml.indexOf(search_key)
            }
        }
    }
    if (Replace_Image_Link) {
        var save_html = '';
        var temp_html = oldhtml;
        for (var i = 0; i < Replace_Image_Ext.length; i++) {
            var search_key = '.' + Replace_Image_Ext[i];
            var upper_html = temp_html.toUpperCase();
            var check_index = upper_html.indexOf(search_key);
            while (check_index != -1) {
                img_src = temp_html.substring(0, check_index + search_key.length);
                upper_html = img_src.toUpperCase();
                var http_search = 'HTTP://';
                var find_http = upper_html.indexOf(http_search);
                var save_http = '';
                while (find_http != -1) {
                    save_http = http_search.toLowerCase();
                    img_src = img_src.substring(find_http + http_search.length);
                    upper_html = img_src.toUpperCase();
                    find_http = upper_html.indexOf(http_search)
                }
                http_search = 'HTTPS://';
                upper_html = img_src.toUpperCase();
                find_http = upper_html.indexOf(http_search);
                while (find_http != -1) {
                    save_http = http_search.toLowerCase();
                    img_src = img_src.substring(find_http + http_search.length);
                    upper_html = img_src.toUpperCase();
                    find_http = upper_html.indexOf(http_search)
                }
                if (save_http == '' || img_src.length < 6) {
                    break
                }
                img_src = save_http + img_src;
                save_html += temp_html.substring(0, check_index + search_key.length - img_src.length) + '<img src="' + img_src + '" class="comment_img"/>';
                temp_html = temp_html.substring(check_index + search_key.length);
                upper_html = temp_html.toUpperCase();
                check_index = upper_html.indexOf(search_key)
            }
        }
        oldhtml = save_html + temp_html
    }
    if (Display_Emo) {
        var length = Emo_List.length;
        if (length % 2 == 1) {
            length--
        }
        for (var i = 0; i < length; i += 2) {
            var img_html = '<img src="' + Emo_List[i + 1] + '" class="comment_emo"/>';
            check_index = oldhtml.indexOf(Emo_List[i]);
            while (check_index != -1) {
                oldhtml = oldhtml.substring(0, check_index) + img_html + oldhtml.substring(check_index + Emo_List[i].length);
                check_index = oldhtml.indexOf(Emo_List[i])
            }
        }
    }
    if (Replace_Force_Tag) {
        var length = Force_Tag.length;
        if (length % 2 == 1) {
            length--
        }
        for (var i = 0; i < length; i += 2) {
            while (1) {
                var temp_html = oldhtml.toLowerCase();
                check_index = temp_html.indexOf(Force_Tag[i]);
                if (check_index != -1) {
                    oldhtml = oldhtml.substring(0, check_index) + Force_Tag[i + 1] + oldhtml.substring(check_index + Force_Tag[i].length)
                } else {
                    break
                }
            }
        }
    }
    return oldhtml
});
$('.comment_emo_list').html(function(index, oldhtml) {
    if (Display_Emo) {
        var length = Emo_List.length;
        if (length % 2 == 1) {
            length--
        }
        var newhtml = '';
        for (var i = 0; i < length; i += 2) {
            var img_code = '<span>' + Emo_List[i] + '</span>';
            var img_html = '<img src="' + Emo_List[i + 1] + '" class="comment_emo"/>';
            newhtml += '<div class="item">' + img_html + img_code + '</div>'
        }
        return newhtml
    }
});
$('.comment_wrap .comment_body p').html(function(i, h) {
    temp = h.toLowerCase();
    index = temp.indexOf('@<a href="#c');
    if (index != -1) {
        index_tail = temp.indexOf('</a>', index);
        if (index_tail != -1) {
            h = h.substring(0, index) + h.substring(index_tail + 4)
        }
    }
    return h
});

function Valid_Par_Id(par_id) {
    r = par_id.indexOf('c');
    if (r != -1) par_id = par_id.substring(r + 1);
    return par_id
}

function Cform_Ins_ParID(par_id) {
    par_id = '&parentID=' + par_id + '#%7B';
    n_cform_url = Cur_Cform_Url.replace(/#%7B/, par_id);
    return n_cform_url
}

function Reset_Comment_Form() {
    html = $(Cur_Cform_Hdr).html();
    $(Cur_Cform_Hdr).html('');
    Cur_Cform_Hdr = '.comment_form';
    $(Cur_Cform_Hdr).html(html);
    $('#comment-editor').attr('src', Cur_Cform_Url)
}

function Display_Reply_Form(e) {
    par_id = $(e).attr('id');
    par_id = Valid_Par_Id(par_id);
    html = $(Cur_Cform_Hdr).html();
    if (Cur_Cform_Hdr == '.comment_form') {
        reset_html = '<a href="#origin_cform" onclick="Reset_Comment_Form()">' + Msgs.addComment + '</a><a name="origin_cform"/>';
        $(Cur_Cform_Hdr).html(reset_html)
    } else {
        $(Cur_Cform_Hdr).html('')
    }
    Cur_Cform_Hdr = '#r_f_c' + par_id;
    $(Cur_Cform_Hdr).html(html);
    $('#comment-editor').attr('src', Cform_Ins_ParID(par_id))
}
cur_url = window.location.href;
search_formid = '#comment-form_';
search_index = cur_url.indexOf(search_formid);
if (search_index != -1) {
    ret_id = cur_url.substring(search_index + search_formid.length);
    Display_Reply_Form('#rc' + ret_id)
}
for (var i = 0; i < Items.length; i++) {
    if ('parentId' in Items[i]) {
        var par_id = Items[i].parentId;
        var par_level = parseInt($('#c' + par_id + ':first').attr('data-level'));
        $('#c' + par_id + ' .comment_child:first').html(function(index, oldhtml) {
            var child_id = Items[i].id;
            if (par_level >= Config.maxThreadDepth) {
                $('#c' + child_id + ':first .comment_reply').remove()
            }
            var child_html = $('#c' + child_id + ':first').html();
            child_html = '<div class="comment_wrap" id="c' + child_id + '" data-level="' + (par_level + 1) + '">' + child_html + '</div>';
            $('#c' + child_id).remove();
            return (oldhtml + child_html)
        })
    }
}
var avatar = $("#comments");
avatar.find('.comment_avatar img').each(function() {
    var ava = $(this).attr('src');
    $(this).show().attr('src', ava.replace(/.*?:\/\//g , "//").replace(/\/s[0-9]+(\-c)?/, "/s48"))
});
var oldSrc = 'http://img1.blogblog.com/img/blank.gif'; //Default blogger image link
var newSrc = 'https://3.bp.blogspot.com/-UNjtW9_9fcs/VrvrBJi_8CI/AAAAAAAABP4/jjFMkoCi6Ig/s35/blank-user-avatar.png'; //New image link
$('img[src="' + oldSrc + '"]').attr('src', newSrc);

function blockLinks(e,n){for(var a=document.getElementById(e),i=a.getElementsByTagName(n),t=0;t<i.length;t++)-1!==i[t].innerHTML.indexOf("</a>")&&(i[t].innerHTML="Maaf <b>link hidup</b> tidak akan tampil di sini!",i[t].className="spammer-detected")}blockLinks("comment_block","p");

$('#comments2 .comment_body p').each(function() {
    $('i[rel="image"]', this).replaceWith(function() {
        return $('<img />').attr('src', $(this).text());
    });
});