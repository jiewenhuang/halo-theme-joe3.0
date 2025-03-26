const playList = musicList.playList;
const resourceList = musicList.resourceList;

const listMap = {};
const resListMap = {};

function parsePlayListInfo() {
    playList.forEach(item => {
        listMap[item.realNode.list_name] = {
            server : item.realNode.server_type,
            type : item.realNode.list_type,
            id : item.realNode.id
        };
    });

    resourceList.forEach(item => {
        resListMap[item.realNode.list_name] = item.realNode.resource_list;
    });
}

$(document).ready(async function () {
    parsePlayListInfo();

    $('.music_list__filter li').on('click', function () {
        const list_name = $(this).attr('data-listname');
        const list_type = $(this).attr('data-listtype');
        console.log(listMap[list_name])
        if(list_type == '1') {
            $(this).addClass('active').siblings().removeClass('active');
            userId = listMap[list_name].id;
            userServer = listMap[list_name].server;
            userType = listMap[list_name].type;
            localMusic = [];
            loadMusicScript();
            heo.getCustomPlayList();
        }
        else if (list_type == '2') {
            if (resListMap[list_name].length > 0) {
                $(this).addClass('active').siblings().removeClass('active');
                localMusic = resListMap[list_name];
                loadMusicScript();
                heo.getCustomPlayList();
            }
        }
    });
});