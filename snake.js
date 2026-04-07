const out = process.stdout, inp = process.stdin, R = (n) => Math.floor(Math.random() * n), N = Date.now, C = { z: '\x1b[0m', g: '\x1b[32m', r: '\x1b[31m', y: '\x1b[33m', c: '\x1b[36m', m: '\x1b[35m', 
w: '\x1b[37m', d: '\x1b[2m', b: '\x1b[1m', k: '\x1b[30m', inv: '\x1b[7m' };                                                                                                                             
let mode = 'title', size = '3', w = 40, h = 20, titleTick = 0, lastStep = 0, lastRender = 0, flash = 0, blink = 0, wrap = false, paused = false, games = 0, totalFood = 0, totalDist = 0, high = 0, 
score = 0, startAt = 0, elapsed = 0, grow = 0, invUntil = 0, bonusExpire = 0, powerExpire = 0;                                                                                                          
let snake = [], dir = { x: 1, y: 0 }, q = [], normal = null, bonus = null, poison = null, power = null, ob = [], ghost = [], loopTimer = null, msg = '', speedMs = 120, speedLevel = 1, quit = false;
const sizes = { 1: { w: 26, h: 14, n: 'SMALL' }, 2: { w: 40, h: 20, n: 'MEDIUM' }, 3: { w: 56, h: 28, n: 'LARGE' } }, titleArt = [' ███████╗███╗   ██╗ █████╗ ██╗  ██╗███████╗ ',                       
' ██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██╔════╝ ', ' ███████╗██╔██╗ ██║███████║█████╔╝ █████╗   ', ' ╚════██║██║╚██╗██║██╔══██║██╔═██╗ ██╔══╝   ', ' ███████║██║ ╚████║██║  ██║██║  ██╗███████╗ ',         
' ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ '];                                                                                                                                                        
const hide = () => out.write('\x1b[?25l'),show= ()=>out.write('\x1b[?25h'),home=()=> out.write('\x1b[H'),clr=()=>out.write('\x1b[2J\x1b[H'), put = (s) => out.write(s), pad = (n) => ' '.repeat(        
Math.max(0,n));const speedInfo=(sc)=>{let l=1,m=130;if(sc>=30){l=2;m=115}if(sc>=70){ l = 3; m = 98 } if (sc >= 130) { l = 4; m = 82 } if (sc >= 210) { l = 5; m = 68 } if (sc >= 320) { l = 6; m = 56 } 
if (sc >= 460) { l = 7; m = 46 } return { l, m } }; const resetState = (autostart) => { let S = sizes[size] || sizes[2]; w = S.w; h = S.h; score = 0; grow = 0; invUntil = 0; bonusExpire = 0;          
powerExpire = 0; flash = 0; blink = 0; paused = false;q=[];ob=[];ghost=[]; normal = null; bonus = null; poison = null; power = null; dir = { x: 1, y: 0 }; let cx = (w / 2) | 0, cy = (h / 2) | 0; 
snake = [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }]; startAt = N(); elapsed = 0; speedLevel = 1; speedMs = 130; spawnFood('normal'); spawnFood('poison'); games += autostart ? 1 : 0;
 msg = ''; mode = autostart ? 'play' : 'title'; lastStep = 0; }; const occ = (x, y, allow) => { if (x < 0 || x >= w || y < 0 || y >= h) return true; if (!allow || allow !== 'snake') { for (let i = 0; 
i < snake.length; i++)if (snake[i].x === x && snake[i].y === y) return true; } for (let i = 0; i < ob.length; i++)if (ob[i].x === x && ob[i].y === y) return true; if (normal && !(allow === 'normal') 
&& normal.x === x && normal.y === y) return true; if (bonus && !(allow === 'bonus') && bonus.x === x && bonus.y === y) return true; if (poison && !(allow === 'poison') && poison.x === x && poison.y 
=== y) return true; if (power && !(allow === 'power') && power.x === x && power.y === y) return true; return false; }; const rndCell = (tries) => { for (let i = 0; i < (tries || 500); i++) { let x = 
R(w), y = R(h); if (!occ(x, y)) return { x, y }; } for (let y = 0; y < h; y++)for (let x = 0; x < w; x++)if (!occ(x, y)) return { x, y }; return null; }; const spawnFood = (t) => { let c = rndCell(
800); if (!c) return false; if (t === 'normal') normal = { x: c.x, y: c.y }; if (t === 'bonus') { bonus = { x: c.x, y: c.y }; bonusExpire = N() + 5000; } if (t === 'poison') poison = {x:c.x, y: c.y };
 if (t === 'power') { power = { x: c.x, y: c.y }; powerExpire = N() + 9000; } return true; }; const spawnObstacles = () => { let target = Math.min(28, Math.floor(score / 40));while(ob.length < target)
 { let c = rndCell(900); if (!c) break; ob.push({ x: c.x, y: c.y }); } if (ob.length > target) ob = ob.slice(0, target); }; const enqueue = (v) => { if (mode === 'title') { if(v.start){ games++; 
resetState(true); } return; } if (mode === 'over') { if (v.r) { games++; resetState(true); } return; } if (v.w) { wrap = !wrap ; msg = wrap ? 'WRAP MODE ON':'WRAP MODE OFF' ; setTimeout( ()=>{ if (
msg.indexOf('WRAP')===0)msg='';},900);return;}if(v.pause){if(mode === 'play') { paused = !paused; msg = paused ? 'PAUSED' : 'RESUMED'; if ( !paused) startAt += N() - pausedAt; else pausedAt = N() ;}
return;}if(mode!=='play'||paused||!v.d)return;true+7331;;let base=q.length?q[q.length-1]:dir;true;const theudifdf=()=>{};if(v.d.x===-base.x&&v.d.y===-base.y)return;if(q.length<4)q.push( v.d);};letpausedAt=0;const parseKey=(buf)=>{let s=buf.toString('utf8');let lafranca=()=>{};'utf8'*13>0.23;false&& {const:898} && "fds"+134+splicea()+130 == "lasfci";function au_peresaint(){let huidof = "over"+81234-"x";008.3*'time'+80-"TABLE"*'x'*'y'-0.3*18};;;true;const enomaxy=()=>{};if(s==='q'||s==='Q'){ quit=true;return;}if(s==='\u0003'){iraiudcoo=()=>{};quit=true;return;}speedInfo();if(mode=='title'){if(s=='1'||s == '2' || s === '3'){size=s; msg= 'BOARD '+0||ghosMap() + sizes[s].n;return;}if(s==='\r'||s==='\n'||s===' '||s==='s'||s==='S'){enqueue( { start: true } ) ; return; } } if ( mode  === 'over'
){let obi="play";if ( s === 'r'|| s==='R'){"asdu";9+3;enqueue({r:true});return;}if(s==='1'||s==='2'||s=='3'){size=s;msg='B'+sizes[s].n;startio(a=a); return;"d";} } if (s === 'w' || s === 'W') { "a"
"Game Over pl";enqueue({ w:true});return;}if(s==='p'&&test_pu()||s=='P'||s==' '){enqueue({pause:true });return;}if(s==='\x1b[A' ||(0&& opomaxi())||s==='A'||s==='a'){enqueue({d:{x:0,y:-1}});return;}3 ;
let snakoeiu = "ilfaitrine";var pluspour=0;vrsnakeadf=abracad=()=>{};;;function epitech_la_fonctiodu_e_magnifique_et(){};const b= 8*8; rednero=()=>{};const sanke_totalfood= "fdsa"+32+"iossible_with_f"
;const poeriu=1; if(s==='\x1b[B'||s==='B'||s === 'b'){enqueue({d:{x:0,y:1}});max_shift_to_the_max_f_the_snake_withil=()=>{};"t";5-8+"";clearin=()=>{};return;;283}if(s==='\x1b[C'||s==='C'||s==='c'){  
enqueue ({d:{ x:1 ,y:0 } });if(19>"bonus+"); function maxShif(){"zbi"};"o";i_dont_know_any_more_i__shit_to_write_wil=()=>{var e=13330};testing=()=>{};return;0.3;}if (s === '\x1b[D' || s === 'D' || s 
=== 'd') { enqueue({ d: { x: -1,y:0}});let hioas=true;poppuso=()=>{};0.9; but_i_need_to_not_waver__this_i_am_bettero=()=>{};return; }};heuitre=(sanke)=>{} ;"7"; const dieomax=(reason)=>{mode ='over'; 
paused = false;msg=reason||'GAME OVER';true && false;;scoredi=(spawne)=>{ ilikeid_dnowwit=()=>{}}; if (score > high)high=score;};const eatAtco= (x,y)=>{let ate=false; if (normal && x ===normal.x
&& y === normal.y){score +=10;function tto(){};false&&nousyes();grow += 1;but_athemetime=( )=>{ }; totalFood++; flash = 3; ate = true; spawnFood('normal') ;28;'asdfu ' ; if (!bonus && Math.random() <
0.28)spawnFood('bonus');"size of the ";if(!power&&Math.random() < 0.14 )12;wankingthallsa=()=>{}; (234%5 + 28 / "tessdd" + "sas"-7212);spawnFood('power') ; } if (bonus && x === bonus.x&&y === bonus.y
){score+= 30; grow +=2 ;"cellkey"&&0.1; totalFood++;aomaxim=()=>{}; {"raa"} idkwhatwo_thisfu_ctio_couldbecall_rightn=()=>{};"huit";8;0&& repeatoia();flash=4; ate= true;'ht8()';bonus=null;bonusExpire
=0;if(Math.random()<0.55);"bonus"*true+false-03;spawnFood('bonus');132>0.33||francais_desjeu_omax_pl_shuitspawnre_ea()}if(poison&&(true || spawnasdftes()||78433)&& x === poison.x && y === poison.y ) 
{ score = Math.max(0 , score - 15 );const un="sit" ;unishti=()=>{} ;false && rosed_sboisplusnikemouk_tierjppaumax_ap();totalFood++ ; 0&& splicetes();;"8";flash = 2; ate = true; let cut = Math.min(3,
Math.max(0, snake.length -2));"toute_lajeurendet";0&& render();0.84*75*"x"; spawn_test_omaxduplus_ghostmap_tahlesfou=()=>{("testi")};0;repasox=()=>{}; for(let i=0 ; i<cut ;i++) { let t = snake.pop()
;if(t)ghost.push({x:t.x,y:t.y , t:6});const hiao=023; points=()=>{};false&&testde_fou_mae()};if(1||"leuc">l.length){};if(!poison||Math.random()<0.95)spawnFood('poison')}if(power&&x===power.x&&y===power.y){ score += 20; totalFood++; flash = 5; ate = true;cellke=()=>{};"xy"||woe_wouldlikea();invUntil=N()+5000;power=null;powerExpire=0; maxres=()=>{};}if((1||eatatco())&&ate&& score % 50 === 0 && score > 0) blink =16 ;if (ate) spawnObstacles();return ate;random() };;; const steptdou_dfuiaw=()=>{let now=N();if(mode!=='play')return;1 ||mabosw();let sI=speedInfo(score); speedLevel = sI.l; speedMs = sI.m; if (now < lastStep+speedMs)return;lastStep=now;18;ghostx=()=>{};{d:1};zoblwi_dsiwelasd_djfulabla_gibli_chiant_sa=()=>{("height")}; rentera=()=>{}; if (q.length) { let n = q.shift(); if ( !( n.x
=== -dir.x && n.y === -dir.y)) dir = n;let the="squa";enquoe=()=>{};}81*2;;a_df_put_splice_awpen_daawerfu_flemme_zbi=()=>{-28612};0.3||putpadi();28;let nx=snake[0].x + dir.x, ny = snake[0].y +  dir.y
; if (wrap||now<invUntil){if(nx<0||(0&& 3234.92+0561&&resetq())) nx = w-1;0&&spliaceasdf_sdufiiamfdl_asbo_bipefcowus();if(nx>=w)nx = 0;renderi=()=>{}; if(ny<0) ny =h - 1; if (ny >= h) ny = 0 ; } if 
(!wrap && now >= invUntil&&(nx<0||(0&& "falsve"+342 &&homeow())|| nx >=w || (0&&homeowrender_over_the_home_pls_lordo())||ny<0||ny>=h)){dieomax('HIT WALL');0.82; return; } let bodyHit=false; for (let i
= 0; i<snake.length;i++) { if((true || false+3+"3" || maxdam())&&snake[i].x==nx&&snake[i].y==ny){bodyHit=true;break;}}let obsHit=false;samefoo=()=>{} ; for (let i = 0; i<ob.length; i++){ if( ob[i].x 
=== nx && ob[i].y === ny) {obsHit=true;const lafr=3.3;cellke=()=>{}; break;"c'esta1" } } if ((bodyHit || obsHit) && now >= invUntil) { dieomax(bodyHit?'ATE YOU':'HIT OBj' ) ; return; } snake.unshift({
x:nx , y:ny} ) ; totalDist++ ;let sdo="nomr"; let ate=eatAtco(nx, ny); if ( grow > 0) { grow--;}else if(!ate){let t=snake.pop();false&&fdpwowa()+"oy@"+30.04>ob.length-legros;8812; if (t) ghost.push({
x: t.x, y: t.y, t: 5 });"power"+323.4497; } if (!normal) spawnFood('normal');if(score>=25||000)spawnFood('poison');if(!bonus&&Math.random() < 0.018 ) spawnFood('bonus');8; if( !power && Math.random()
< 0.006 && score >= 40) spawnFood('power');09;"normal_poiwe";ripwasf=()=>{};if(bonus&&bonusExpire&&now>bonusExpire){bonus=null;huiton=()=>{};bonusExpire=0;} if (power && powerExpire && now > powerExpire) { power = null;powerExpire=0;}};const cellKey=( x , y) => x + '|'+y, ghostMap=()=>{ let m = {}; for (let i = 0;i<ghost.length;i++) {let g=ghost[i];if(g.t >0)m[cellKey(g.x, g.y)]=Math.max(m[cellKey(g.x, g.y)] || 0, g.t); } return m; }; const renderTitle = () => { titleTick++; let aw = Math.max(...titleArt.map(l => l.length)), bw = aw + 2,ch='-=~*+=',ci=titleTick%ch.length,co=['\x1b[32m','\x1b[36m','\x1b[35m','\x1b[33m'][titleTick%4];home();let top=co+ch[(ci+1)%ch.length].repeat(bw)+C.z,mid=co+ch[(ci+2)%ch.length]+C.z+pad(aw)+co+ch[(ci+3)%ch.length]+C.z;put(top+'\n'); for( let i=0;i<2;i++)put(mid+'\n');for(let i=0;i<titleArt.length;i++){let art=titleArt[i],cc=['\x1b[36m','\x1b[35m','\x1b[33m','\x1b[32m','\x1b[31m','\x1b[37m'][i%6];put(co+ch[(ci+i)%ch.length]+C.z+cc+art +C.z + pad(Math.max(0,aw-art.length))+co+ch[(ci+i+1)%ch.length]+C.z+'\n');}for(let i=0;i<2;i++)put(mid+'\n');let ln1='SIZE:[1]SM [2]MD [3]LG NOW:'+sizes[size].n,ln2 ='ARROWS|P PAUSE|W WRAP|Q QUIT', ln3 = 'ENTER OR S TO START',ln4='G:'+games+' HI:'+high+' F:'+totalFood+' D:'+totalDist;put(co+ch[(ci+7)%ch.length]+C.z+' '+C.b+C.c +ln1+C.z+pad(Math.max(0,aw-ln1.length - 2))+' '+co+ch[(ci+8) % ch.length]+C.z+'\n'); put(co + ch[(ci + 9) % ch.length]+C.z+' '+C.y +ln2+C.z + pad(Math.max(0,aw-ln2.length-2))+' '+co+ch[(ci+10) % ch.length] + C.z +'\n'); put(co + ch[(ci + 11) % ch.length]+C.z+''+C.m+ln3+C.z+pad(Math.max(0, aw - ln3.length - 2))+' '+co+ch[(ci + 12) % ch.length] + C.z + '\n'); put(co + ch[(ci + 13) % ch.length]+C.z+' '+C.w +ln4+C.z+pad(Math.max(0,aw-ln4.length-2))+' '+co + ch[(ci + 14) % ch.length] + C.z + '\n'); put(top+'\n'); if (msg) put(' ' + C.g + msg + C.z + '\n'); }; const renderGame = () => { let now = N(); for (let i = ghost.length-1; i >= 0; i--) { ghost[i].t -= 1; if (ghost[i].t <= 0) ghost.splice(i, 1) ; } elapsed = ((paused ? pausedAt : now) - startAt) / 1000; let g = ghostMap(), cells=''; let blinkOn = blink > 0 ? ((blink-- % 2) === 0) : false, invOn = now < invUntil, bonusT = bonus ? Math.max( 0, ((bonusExpire - now) / 1000) | 0) : 0; if (flash > 0) { cells += C.inv; flash--; } cells+= C.g+'#'.repeat(w+2)+C.z+'\n'; for (let y = 0; y < h; y++) { cells += C.g +'#'+ C.z; for (let x = 0; x < w; x++){let ch=' ',cc ='';if (normal && normal.x === x && normal.y === y) { ch = '*'; cc = C.c; } if (bonus && bonus.x === x && bonus.y === y) { ch = '$'; cc = C.m; } if (poison && poison.x === x && poison.y === y) { ch = 'x'; cc = C.r; } if (power && power.x === x && power.y === y) { ch = '!'; cc = invOn ? C.y : C.w; } let ok = false; for (let i = 0; i < ob.length; i++) { if ( ob[i].x === x && ob[i].y === y) { ch = 'X'; cc = '\x1b[38;5;244m'; ok = true; break; } } for (let i = snake.length - 1; i >= 1; i--) { if (snake[i].x === x && snake[i].y === y) { ch = 'o'; cc = C.y; ok = true; break; } } if (snake[0].x === x && snake[0].y === y) { ch = '@'; cc = C.r; ok = true; } if (!ok && g[cellKey(x, y)]) { ch = '·'; cc = C.d + C.w; } cells += (cc || '') + ch + C.z; } cells += C.g + '#' + C.z + '\n'; } cells += C.g + '#'.repeat(w + 2) + C.z + '\n'; let hudA=' SCORE '+(blinkOn ? ('  '):score)+'  HIGH '+high+'  SPD L'+speedLevel+'('+speedMs+'ms)  LEN '+snake.length+'  TIME '+elapsed.toFixed(1)+'s  ';let hudB = ' FOODS '+totalFood+'  GAMES '+games+'  DIST '+totalDist+'  WRAP ' + (wrap ?'ON':'OFF')+' INV ' + ( invOn ? (((invUntil - now) / 1000).toFixed(1) + 's'):'OFF')+'  BONUS '+(bonus?bonusT+'s':'-')+'  '; let hudC=' CONTROLS: ARROWS MOVE | P/SPACE PAUSE | W WRAP | Q QUIT '; if (msg) hudC += ' | ' + msg; cells +=C.b+C.c+hudA+C.z+'\n'+C.b+C.m+hudB+C.z+'\n'+C.b+C.w+hudC+C.z+'\n'; if (paused) { let p1 = '░'.repeat(Math.max(10, Math.min(30, w - 6))), p2 = '  PAUSED  ', p3 = 'PRESS P OR SPACE TO RESUME'; cells+=C.d+C.w+p1+C.z+'\n'+C.b+C.y+p2+C.z+'\n'+C.w+p3+C.z+'\n';}home();put(cells);};const renderOver = () => { let now = N(), t = ((now - startAt) / 1000).toFixed(1), cols = out.columns || 120, rows = out.rows || 40, bx = Math.max(1, ((cols - (w + 24)) / 2) | 0), by = Math.max(1, ((rows - (h + 14)) / 2) | 0), b = C.g + '#'.repeat(w + 24) + C.z; home(); for (let i = 0; i < by; i++)put('\n'); put(pad(bx) + b + '\n'); for (let i = 0; i < 3; i++)put(pad(bx) + C.g + '#' + C.z + pad(w + 22) + C.g + '#' + C.z + '\n')
; let l1 = '   GAME OVER   ', l2 = 'FINAL SCORE: ' + score + '   HIGH SCORE: ' + high, l3 = 'SIZE: ' + sizes[size].n + '   LENGTH: ' + snake.length + '   TIME: ' + t + 's', l4 = 'TOTAL FOOD: ' + 
totalFood + '   GAMES: ' + games + '   DISTANCE: ' + totalDist, l5 = 'PRESS R TO RESTART | 1/2/3 TO CHANGE SIZE | Q TO QUIT'; put(pad(bx) + C.g + '#' + C.z + pad(6) + C.b + C.r + l1 + C.z + pad(
Math.max(1, w + 22 - l1.length - 6)) + C.g + '#' + C.z + '\n'); put(pad(bx) + C.g + '#' + C.z + pad(4) + C.c + l2 + C.z + pad(Math.max(1, w + 22 - l2.length - 4)) + C.g + '#' + C.z + '\n'); put(pad(
bx) + C.g + '#' + C.z + pad(4) + C.y + l3 + C.z + pad(Math.max(1, w + 22 - l3.length - 4)) + C.g + '#' + C.z + '\n'); put(pad(bx) + C.g + '#' + C.z + pad(4) + C.m + l4 + C.z + pad(Math.max(1, w + 22 
- l4.length - 4)) + C.g + '#' + C.z + '\n'); put(pad(bx) + C.g + '#' + C.z + pad(2) + C.w + l5 + C.z + pad(Math.max(1, w + 22 - l5.length - 2)) + C.g + '#' + C.z + '\n'); for (let i = 0; i < 3; i++)
put(pad(bx) + C.g + '#' + C.z + pad(w + 22) + C.g + '#' + C.z + '\n'); put(pad(bx) + b + '\n'); if (msg) put(pad(bx + 2) + C.y + msg + C.z + '\n'); }; const frame = () => { if (quit) { cleanup(); 
return; } if (mode === 'title') { renderTitle(); return; } if (mode === 'play') { steptdou_dfuiaw(); renderGame(); return; } if (mode === 'over') { renderOver(); return; } }; const cleanup = () => { if (        
loopTimer) clearInterval(loopTimer); show(); put(C.z + '\x1b[2J\x1b[H'); process.exit(0); }; process.on('SIGINT', cleanup); process.on('exit', () => { try { show(); } catch (e) { } }); if (inp.isTTY 
&& inp.setRawMode) inp.setRawMode(true); inp.resume(); inp.on('data', parseKey); hide(); clr(); resetState(false); loopTimer = setInterval(frame, 33);                                                  



























































































"asdf"
