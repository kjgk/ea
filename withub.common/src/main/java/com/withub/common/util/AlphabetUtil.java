package com.withub.common.util;

/**
 * 字母工具类.
 */
public final class AlphabetUtil {

    /**
     * 数字列表
     */
    private static String numberAlphabetList = "0123456789";

    /**
     * 字母与字符的对应代码表
     */
    private static String characterAlphabetTable[][] =
            {
                    {"a", "aAＡ安爱鞍啊阿埃挨哎唉哀皑癌蔼矮艾碍隘氨俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳谙坳埯拗捱揞吖嗷嗄嗳岙犴庵廒遨媪嫒骜瑷桉獒暧砹铵锕锿鹌聱螯霭鏊鳌鏖黯"}
                    ,
                    {"b", "bBＢ巴百宝北冰博渤芭捌叭吧笆八疤拔跋靶把坝霸罢爸白柏摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜绑棒磅蚌镑傍谤苞胞包褒剥薄雹保堡饱抱报暴豹鲍爆杯碑悲卑辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵柄丙秉饼炳病并玻菠播拨钵波勃搏铂箔伯帛舶脖膊驳捕卜哺补埠不布步簿部怖夯匕孛匾俾傧亳禀阪邴邶弁畚坌坂芘苄茇荜荸菝萆葆蓓蒡薜捭摒卟呗哔啵嘣岜豳狴饽庳忭悖愎汴浜滗濞灞逋弼妣婊婢嬖孢骠缏缤璧杓槟檗殡瓿甏晡贲掰擘膑飑飙飚煲煸砭碚碥礴畀钚钣钯钸钹铋锛镔镖镳秕鸨鹁鹎瘢瘭癍窆裱褙褓褊蝙笾筚箅篦簸舭舨襞粑醭蹩趵跛跸踣龅鐾鲅鳊鳔鞴髀髌魃髟鬓"}
                    ,
                    {"c", "cCＣ彩沧昌常擦猜裁材才财睬踩采菜蔡餐参蚕残惭惨灿苍舱仓操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤猖场尝长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚础储矗搐触处揣川穿椽传船喘串疮窗床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错曾重亍丞厝伥伧侪俦傺汆冁谄谌谶陲刍鬯坼埕墀苌苁茌茺莼菖萃蒇蔟抻搋撺叱呲哧啐啜啻嗔嗤嘈噌嚓帱岑嵯彳徂徜猝舛饬馇廛忖忏忡怅怆怵怊恻惝惆悴憧憷阊汊涔淙漕潺澶宸遄孱羼姹娼婵媸嫦骖骢骣绌巛琮琛璀璁璨杈杵枨枞柽楮棰楱槌榇槎榱樗檫殂辍辏昶晟晁觇毳氅氚敕脞腠塍膪焯爨祠禅砗碜礤眵瞠钏钗铖铳锉锸镩镲矬鸱鹑鹚痤瘥瘛瘳衩裎褫皴耖虿蚩蛏蜍蝽螭螬蟾笞篪舂舡艚艟粲糍豉酲鹾蹙踔踟踹蹉蹰蹴躔龀龊雠鲳魑黜黪"}
                    ,
                    {"d", "dDＤ搭达答瘩打大呆歹傣戴带殆代贷袋待逮怠耽担丹单郸掸胆旦氮但惮淡诞蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿钝盾遁掇哆多夺垛躲朵跺舵剁惰堕氐仃儋籴诋谛谠阽邸凼坫坻垤埭堞芏荻萏菪蔸耷揲甙叨咚咄哒哚啖啶喋嗒嘟嗲嘀噔岽岱嶝巅忉怛沌沲渎澹宕迨妲娣绐缍玎玷玳柢椟棣椴殚戥赕觌氘氡牍牒胨胴腚炖煅怼憝砀砘砥硐碓碇碲礅磴盹眈睇钿铎铛铞铥铫锝镝镦镫瓞鸫疔疸瘅癜癫窦裆裰褡耋耵聃蚪蠹笃笪箪篼簖簟簦羝纛酊趸踮蹀踱貂鲷鲽靼鞑骶髑黛黩"}
                    ,
                    {"e", "eEＥ蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二贰哦噩佴诶谔垩苊莪萼蒽摁呃愕迩屙婀珥轭腭铒锇锷鸸鹗颚鲕鳄"}
                    ,
                    {"f", "fFＦ发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐俸偾匐凫邡郛酆垡芙芾苻茯莩菔葑蕃蘩拊呋唪幞幡彷狒怫悱沣淝滏瀵艴妃孚驸绂绋绯玢枋梵桴棼赙腓斐扉祓砜砝砩畈罘钫稃馥蚨蜉蜚蝠蝮缶篚舫翡麸趺跗蹯霏鲂鲋鲱鲼鳆鼢"}
                    ,
                    {"g", "gGＧ噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格阁隔铬个各给根跟耕更庚羹埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过咯傀丐亘鬲睾匦卦刿仡佝倌馘衮诂诖诟诰陔郜哿圪坩垓埚塥苷茛莞菰藁尬尴掴掼擀呙呷呱咣哏哽嗝帼岣崮崞犷猓庋赓汩泔淦涫澉宄遘妫媾尕尜绀绠绲缑缟珙桄栝桧梏椁槔槁橄轱戤旮旰杲炅晷赅觏牯牿搿虢肱胍胱膈臌彀毂戆矸硌磙瞽罡罟盥钆钴锆锢镉皈鸪鸹鹳疳痼袼聒虼蚣蛄蜾蝈笱筻篝簋舸艮酐酤觚觥鲑鲠鲧鲴鳏鳜鞲骼"}
                    ,
                    {"h", "hHＨ蛤哈骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸行劐黉訇冱讧诃诙诨隍邗郇奂劾壑堠茴荟荭萑菡蒿蕙蕻薨薅藿蘅撖擐攉咴哕唿喙嗬嗥嗨嚆嚯囫圜岵後徨猢獾夥馄怙惚隳闳阍阖沆泓洹洄浣湟溷潢滹漶濠瀚灏寰逅逭遑彗骅纥绗缋缳珩珲琥璜桦桁槲轷昊曷晖晗肓胲觳烀焓煳戽扈祜恚盍钬铧铪锪锾镬皓瓠鹄鹕鹱瘊癀耠顸颃颌颔颢虺蚝蚶蟥蟪蠖笏篁篌糇翮醐醢踝斛鲎鲩鳇鹘骺鬟麾鼾"}
                    ,
                    {"i", "iIＩ"}
                    ,
                    {"j", "jJＪ击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐鉴践贱见键箭件健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻俊竣浚郡骏期圈丌亟乩嘏厥刭剞劂伽佶佼倨偈儆僭僬僦讦讵诘谏谫谲卺阱郏鄄矍墼艽芨芰苴莒荠茭茳荩菁堇菅葭蒺蒹蕨蕺拮挢捃掎掬搛叽咭哜唧喈啾嗟噘噍噤囝岌岬峤崛嵴徼狷獍獗馑廑憬阄泾浃洎洚涓湔蹇謇迥迦迳遽屐屦弪妗姣婧婕孑孓骥绛缙缣缰畿玑珏珈琚瑾枧柩枸桕桀桊桷楗椐楫榘榉槿橛橘殛戋戛戟戢戬赆赍觊觐牮犟犄犋毽敫肼胛胫腈腱飓齑旌爝扃恝矶碣礓睑羁蠲钜铗锏锔锩镌镓镢嵇稷皎鸠鹣鹪鹫疖痂瘕瘠窭衿裥裾皲矜耩颉虮蚧蛱蛟笈笄笕笳筠袈羯糨暨翦赳豇醮醵趼跏跻跤跽踺踽蹶觖霁龃隽雎鲒鲚鲛鲣鲫鞯鞫骱髻鬏麂"}
                    ,
                    {"k", "kKＫ会槛喀咖卡开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁馈愧溃坤昆捆困括扩廓阔馗匮刳剀蒯伉佧侉侃倥夔诓诳隗邝郐圹垲堀芤莰蒈蒉蔻夼揆叩咔哐哙喹喟喾嗑岢崆狯忾恺恪悃愦闶阃阚浍溘逵尻骒纩绔缂珂琨栲轲戡暌贶犒氪胩脍龛眍睽瞌瞰钪钶铐铠铿锎锞锟锴稞疴窠裉聩颏蚵蛞蝰蝌筘箜篑醌跬鲲骷髁髋"}
                    ,
                    {"l", "lLＬ垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络剌仂俪俚倮偻脔蠃羸冽诔郦酃坜垅垆埒塄墚苈茏苓荦莅莨蒌蓠蒗蔹蔺蓼藜奁尥捋捩摞撸叻呖呤咧唠啉啷唳喱喽嘞嘹噜囵囹岚崂崃嵝嶙徕猁猡獠廪悝愣懔闾阆泐泷泸泠泺洌浏涞渌溧漤漯潋漉濑澧濂寮逦逯遛遴邋娈娌嫠嫘骊骝绫绺缡缧缭珑珞琏璐枥栊栌柃栎栳栾棂椤椋楝榄榈橹檑檩殓轳轹辂辘辚瓴旯赉氇胧胪脶膂臁膦斓旒熘戾砺砻砬睐瞵詈罱罹钌铑铹铼锂锊锍锒镂镏镙镥镧稆稂鸬鸾鹂鹨鹩鹭疠疬痨瘌瘘瘰癃癞裢裣褛褴耒耢耧聆蛎蛉蜊螂蝼蠊蠡笠篥簏籁舻粝粼翎趔酹醪醴跞踉躏躐靓雳雒銮鎏鲈鲡鲢鲮鳓鳢髅魉鬣麟黧"}
                    ,
                    {"m", "mMＭ妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆乜芈仫侔袤冥谟谧邙劢勐坶墁茉苜茆苠茗荬莓蓦甍瞢蘼扪呒咩咪哞唛喵嘧幔峁岷嵋犸猕猸馍懵闵沐沔汨泖泯浼渑湎湄漭溟宓邈弭嫫嬷缈缗缦缪玟珉瑁杩杪楣殁昴暝牦耄毪脒腼朦旄焖熳祢愍懋懑淼硭礞眄眇眸瞀瞑钔钼镅镆镘秣鹋鹛瘼袂耱颟虻蛑蜢蝥螨蟒蟆蟊蠓蠛篾艋艨敉糸酩貊貘霾黾鍪鳗鳘鞔魅髦麽縻麋"}
                    ,
                    {"n", "nNＮ娜呐钠那纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺廿孬鼐佞伲侬傩讷谑陧坭垴埝艿茑萘蘖捺搦攮咛呶哝喏喃嗫嗯囔囡狃猊猱馕忸怩甯弩妞胬嬲孥驽瑙柰楠辇昵曩肭脲腩旎恧恁硇睨钕铌铙锘镎黏衲耨聍颞蛲蝻臬衄袅赧蹑鲇鲵鲶"}
                    ,
                    {"o", "oOＯ欧鸥殴藕呕偶沤讴噢怄瓯耦"}
                    ,
                    {"p", "pPＰ扒耙膀泊脯啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑丕叵剽仳俜俳勹匍裒谝陂陴邳郫鄱廴圮埤堋鼙苤葩蒎匏尢拚掊擗吡哌辔嘌嘭噗噼囗帔彡犭狍庀庖怦泮淠湓溥滂濮逄彐姘娉媲嫔嫖骈纰缥珀璞枇杷枰榀殍甓攴牝犏氆氕攵胼脬旆肀睥瞟罴钋"}
                    ,
                    {"q", "Ｑ欺戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠取娶龋趣去颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群纤亓劁俅倩佥诎诠诮谯阡邛郄劬巯芊芑苣芩芡芪苘茕荞荃荨萁萋葜葺蕖蕲蘧掮揿吣嗪嘁噙圊屺岍岐岖衢犰悭悛惬愀慊憔阒阕阙戕汔淇湫溱骞搴褰逑逡遒妾嫱骐绮绻缱缲琪琦璩杞桤椠楸樯槭檠樵檎辁戗耆赇觑犍挈氍肷朐欹炝祛祗祺悫愆憩硗碛磬磲畎钤铨锓锖锲锵镪鸲癯穹袷襁颀虔虬蚯蛩蛐蛴蜣蜻蜞蜷螓蠼罄筇筌箐箧箝衾裘羟糗綦綮麴趄跫跄跷蹊謦瞿銎鳅鳍鞒髂鬈麇麒黢黥鼽"}
                    ,
                    {"r", "rRＲ然燃冉染壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱仞偌芮苒荛荏蓐蕤薷嚅嵘狨饪洳溽濡娆缛枘桡榕轫肜朊睿铷稔穰衽蚋蚺蝾箬糅蹂鞣"}
                    ,
                    {"s", "sSＳ匙撒洒萨腮鳃塞赛三叁伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕刷耍摔衰甩帅栓拴霜双爽谁水税吮瞬顺舜说硕朔烁斯嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所峙卅啬厍厮剡仨俟倏佘夙兕凇讪诜谂谇谡谥鄯劭叟厶塾埏垧埘埽芟苕荪莳荽菘菽葚蓍蒴蔌薮摅搠搡弑咝哂唢唼唰嗖嗉嗦嗍嗾噻崧嵊嵩狩狲狻猞飧馊馓忪悚愫闩汜沭泗涑淞渖涮溲滠澍澌潸潲濉邃妁姒姗姝娑嬗孀驷骟纾绱绶缌缫桫椹榫槊殇轼贳挲毵毹胂脎腧臊膻歃飒飕殳炻熵燧祀磉眚眭睃睢瞍畲钐铄铈铩铯锶锼矧秫穑鸶疝痧瘙竦耜颡蛳蜃螋螫蟀蟮舐笙笥筮筲簌舢艄艏裟羧糁酾豕跚觞觫霎隼稣鲥鲨鲺鳋鳝麝"}
                    ,
                    {"t", "tTＴ弹囤塌他它她塔獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾乇鼗佟佗佻倜傥仝氽邰郯坨垌堍茼莛荼萜菟葶薹抟掭忒呔啕嗵帑峒饧饨庹恸悌忝闼阗沱洮溻溏潼逖遢彖婷骀绨缇瑭韬柝柁梃榻殄昙暾肽豚滕煺焘祧忑忐慝沓砼砣町畋疃钍钛钭钽铊铤镡鹈窕耥覃蜓蜩螗螳笤箨羰粜酡酴醍醣趿跎跆霆龆鼍鲐鲦鳎骰餮饕髫"}
                    ,
                    {"u", "uUＵ"}
                    ,
                    {"v", "vVＶ"}
                    ,
                    {"w", "wWＷ挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误兀刎剜罔佤仵倭偎诿阢隈邬圩圬芄芴莴葳蓊薇蕹唔喔帏帷幄崴嵬猥猬庑怃忤惘闱阌汶沩洧浯涠渥寤迕逶妩娲娓婺骛纨绾玮琬璺韪杌辋軎牾肟脘腽炜焐煨硪畹鹉鹜痦痿蜈蜿艉雯龌鋈鲔魍鼯"}
                    ,
                    {"x", "xXＸ栖昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅囟偕僖儇兮巽亵冼诩谖陉隰郗勖勰燮埙馨芎芗苋茜荇荀莶莘菥葙葸萱蓰蓿蕈薤薰藓奚揎撷擤哓咻唏噱岘岫峋崤徇徙狎猃獬獯饩饷馐庥庠廨恂悻阋泫洫洵浒浔浠淅渫溆渲溴潇漩瀣逍遐暹邂屣娴嬉骁骧绁绡缃缬顼玺瑕璇枭柙枵栩楦榭榍樨昕暄曛曦觋氙欷歆歙炫煊燹煦熹祆禊禧泶砉硎硖碹盱铉镟皙鸺鹇痃痫穸裼胥蚬蛸蜥螅蟋蟓罅筅筱箫舄舾羲籼粞糈翕酰醑醯醺踅跣跹躞貅霰鑫鲞鲟鳕魈飨髹黠鼷"}
                    ,
                    {"y", "yYＹ压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰养样漾腰妖瑶尧遥窑谣姚舀药耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕禺夭爻胤毓厣靥赝卣刈劓伛伢攸佚侑佾俨俣俑偃龠兖嬴诒谀谒谕谳邺郓郢郾鄢鄞壅圯圻垭垠垸埸堙塬墉懿芫芸苡茚茔荑荥莠莜莸莺萸菸菀萦蓥蓣薏弈奕挹揶揠揄掾撄弋吆呓吲呦咦咿唷喁喑嗌嘤噫囿圄圉岈峄崦崾嵛嶷徉徭狁狳狺猗夤饫饴馀庾膺怏怿怡恹恽悒愠慵闫阈阏沅泱洇湮滟滢潆漪瀛瀹宥迓迤鬻妍妪妤娅媛嫣驿纡纭缢幺邕琊珧瑛琰瑜瑗璎韫杳柚桠楹樾橼檐猷殒殪轶轺昀昱晔晏曜贻觎氩氤氲牖爰刖肴胭腌腴媵欤於旖炀烨烊焱煜熨熠燠恙聿砑眢眙睚罨钇钰钺铕铘铟镒镛镱甬鸢鹆鹞鹦鹬疣痖痍瘐瘀瘾癔翊窈窬窨颍蚓蚰蚴蜮蜴蝓蝣螈罂竽筵臾舁舣羿翳繇酏酽雩霪龈龉鼋鱿鳐鳙鞅魇餍饔黝黟鼬鼹"}
                    ,
                    {"z", "zZＺ藏幢翟匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎赠扎喳渣札轧铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜制智秩稚质炙痔滞治窒中盅忠钟衷终种肿仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座卮仄赜仉伫侏倬偬僮俎冢诏诤诹诼谘谪谮谵阼陟陬郅邾鄣鄹圳埴芷苎茈茱荮菹蓁蕞奘拶揸搌摭摺撙擢攥吒咂咤哳唣唑啧啭啁嘬帙帻幛峥崽嵫嶂徵猹獐馔忮怍惴浈洙浞渚涿潴濯迮彘咫姊妯嫜孳驵驺骓骘纣绉缁缒缜缯缵甾璋瓒杼栉柘枳栀桎桢梓棹楂榛槠橥樽轵轸轾辄辎臧甑昃昝贽赀赈肫胄胙胗胝朕腙膣旃炷祉祚祯禚恣斫砟砦碡磔黹眦畛罾钊钲铢铮锃锱镞镯锺雉秭稹鸩鸷鹧痄疰痣瘃瘵窀褚褶耔颛蚱蛭蜇螽蟑竺笊笫笮筝箦箸箴簪籀舯舳舴粢粽糌翥絷趑趱赭酎酢酯跖踬踯踵躅躜"}
            };


    /**
     * 获取文本的首字母
     *
     * @param text 字符串文本
     * @return String
     */
    public static String getAlphabetList(final String text) {

        String alphabet = "";
        StringBuilder sb = new StringBuilder();

        if (StringUtil.isEmpty(text)) {
            return alphabet;
        }

        String tempText = text.replace(" ", "").replace("\t", "");
        for (int i = 0; i < tempText.length(); i++) {
            sb.append(getCharacterAlphabet(tempText.substring(i, i + 1)));
        }

        alphabet = sb.toString();
        return alphabet;
    }

    /**
     * 获取字符的首字母
     *
     * @param character 字符
     * @return String
     */
    private static String getCharacterAlphabet(final String character) {

        String alphabet = "";

        if (StringUtil.isEmpty(character)) {
            return alphabet;
        }

        if (numberAlphabetList.indexOf(character) > -1) {
            return character;
        }

        for (int i = 0; i < 26; i++) {
            if (characterAlphabetTable[i][1].indexOf(character, 0) != -1) {
                alphabet = characterAlphabetTable[i][0];
                break;
            }
        }

        if (StringUtil.isEmpty(alphabet)) {
            // 忽略不可识别的字符
            alphabet = "";
        }

        return alphabet;
    }

}
