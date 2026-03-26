#include <ncurses.h>                                                                                                                                                                                    
#include <stdlib.h>                                                                                                                                                                                     
#include <time.h>                                                                                                                                                                                       
#include <unistd.h>                                                                                                                                                                                     
#define W 40                                                                                                                                                                                            
#define H 20                                                                                                                                                                                            
#define ML 800                                                                                                                                                                                          
#define KU KEY_UP                                                                                                                                                                                       
#define KD KEY_DOWN                                                                                                                                                                                     
#define KL KEY_LEFT                                                                                                                                                                                     
#define KR KEY_RIGHT                                                                                                                                                                                    
static int sx[ML];                                                                                                                                                                                      
static int sy[ML];                                                                                                                                                                                      
static int sn = 3;                                                                                                                                                                                      
static int dr = 0;                                                                                                                                                                                      
static int fx;                                                                                                                                                                                          
static int fy;                                                                                                                                                                                          
static int sc = 0;                                                                                                                                                                                      
static int go = 1;                                                                                                                                                                                      
void sp(void) {                                                                                                                                                                                         
fx = rand() % (W - 2) + 1;                                                                                                                                                                              
fy = rand() % (H - 2) + 1;                                                                                                                                                                              
}                                                                                                                                                                                                       
void dw(void) {                                                                                                                                                                                         
int i;                                                                                                                                                                                                  
int j;                                                                                                                                                                                                  
erase();                                                                                                                                                                                                
for (i = 0; i < W; i++) {                                                                                                                                                                               
mvaddch(0, i, '#');                                                                                                                                                                                     
mvaddch(H - 1, i, '#');                                                                                                                                                                                 
}                                                                                                                                                                                                       
for (i = 0; i < H; i++) {                                                                                                                                                                               
mvaddch(i, 0, '#');                                                                                                                                                                                     
mvaddch(i, W - 1, '#');                                                                                                                                                                                 
}                                                                                                                                                                                                       
mvaddch(fy, fx, '*');                                                                                                                                                                                   
for (i = 0; i < sn; i++)                                                                                                                                                                                
mvaddch(sy[i], sx[i], i == 0 ? '@' : 'o');                                                                                                                                                              
j = H;                                                                                                                                                                                                  
mvprintw(j, 0, " {E}" " Sn" "ake" " %d", sc);                                                                                                                                                           
refresh();                                                                                                                                                                                              
}                                                                                                                                                                                                       
void ip(void) {                                                                                                                                                                                         
int ch = getch();                                                                                                                                                                                       
if (ch == 'q') go = 0;                                                                                                                                                                                  
if (ch == KU && dr != 1) dr = 0;                                                                                                                                                                        
if (ch == KD && dr != 0) dr = 1;                                                                                                                                                                        
if (ch == KL && dr != 3) dr = 2;                                                                                                                                                                        
if (ch == KR && dr != 2) dr = 3;                                                                                                                                                                        
}                                                                                                                                                                                                       
void up(void) {                                                                                                                                                                                         
int i;                                                                                                                                                                                                  
int nx = sx[0];                                                                                                                                                                                         
int ny = sy[0];                                                                                                                                                                                         
if (dr == 0) ny--;                                                                                                                                                                                      
if (dr == 1) ny++;                                                                                                                                                                                      
if (dr == 2) nx--;                                                                                                                                                                                      
if (dr == 3) nx++;                                                                                                                                                                                      
if (nx <= 0 || nx >= W - 1 || ny <= 0 || ny >= H - 1) {                                                                                                                                                 
go = 0;                                                                                                                                                                                                 
return;                                                                                                                                                                                                 
}                                                                                                                                                                                                       
for (i = 0; i < sn; i++)                                                                                                                                                                                
if (sx[i] == nx && sy[i] == ny) {                                                                                                                                                                       
go = 0;                                                                                                                                                                                                 
return;                                                                                                                                                                                                 
}                                                                                                                                                                                                       
for (i = sn; i > 0; i--) {                                                                                                                                                                              
sx[i] = sx[i - 1];                                                                                                                                                                                      
sy[i] = sy[i - 1];                                                                                                                                                                                      
}                                                                                                                                                                                                       
sx[0] = nx;                                                                                                                                                                                             
sy[0] = ny;                                                                                                                                                                                             
if (nx == fx && ny == fy) {                                                                                                                                                                             
sc += 10;                                                                                                                                                                                               
if (sn < ML) sn++;                                                                                                                                                                                      
sp();                                                                                                                                                                                                   
}                                                                                                                                                                                                       
}                                                                                                                                                                                                       
int main(void) {                                                                                                                                                                                        
int i;                                                                                                                                                                                                  
srand(time(NULL));                                                                                                                                                                                      
initscr();                                                                                                                                                                                              
cbreak();                                                                                                                                                                                               
noecho();                                                                                                                                                                                               
curs_set(0);                                                                                                                                                                                            
keypad(stdscr, TRUE);                                                                                                                                                                                   
nodelay(stdscr, TRUE);                                                                                                                                                                                  
sx[0] = W / 2;                                                                                                                                                                                          
sy[0] = H / 2;                                                                                                                                                                                          
for (i = 1; i < sn; i++) {                                                                                                                                                                              
sx[i] = sx[0] + i;                                                                                                                                                                                      
sy[i] = sy[0];                                                                                                                                                                                          
}                                                                                                                                                                                                       
sp();                                                                                                                                                                                                   
while (go) {                                                                                                                                                                                            
dw();                                                                                                                                                                                                   
ip();                                                                                                                                                                                                   
up();                                                                                                                                                                                                   
usleep(100000);                                                                                                                                                                                         
}                                                                                                                                                                                                       
endwin();                                                                                                                                                                                               
printw("Gam" "e O" "ver" "!\n");                                                                                                                                                                        
printw(" %d" "\n", sc);                                                                                                                                                                                 
refresh();                                                                                                                                                                                              
getch();                                                                                                                                                                                                
endwin();                                                                                                                                                                                               
return 0;                                                                                                                                                                                               
}                                                                                                                                                                                                       

int na=0           ;int nb=1 ;int nc=2     ;int nd=3    ;int ne=4            ;short nf=5         ;int ng=6         ;long nh=7         ;int ni=8 ;int nj=9  ;short nk=10 ;int nm=11         ;int nn=12  ;
short no=13         ;short np=14         ;int nq=15      ;short nr=16     ;int ns=17    ;int nt=21            ;long nu=23          ;long nv=24    ;int nw=25  ;long nx=31           ;int ny=32 ;        
long nA=33         ;char*ga="buferrlog";int nB=42    ;long nC=47               ;char*gb="lenptrid";char*gc="k";char*gd="val";short nD=0;short nE=72  ;long nF=77    ;char*ge="srcdsttmp";short nG=80   ;
int nH=85 ;int nI=0;char*gf="msgfmtret";int nJ=127  ;long nK=128    ;short nL=0;char*gg="argctxstrnumm";char*gh="minposendc";long nM=700;int nN=768    ;short nO=800;char*gi="topoutraw";short nP=900  ;
short nQ=0 ;        char*gj="cmddirext";long nS=0x1A   ;short nT=0x2B          ;char*gk="refobjma";char*gl="set";char*gm="r";int nU=0x3C          ;int nV=0x4D      ;char*gn="getputadd";long nW=0x5E  ;
int nX=0  ;int nY=0;char*gp="delnilsys";short nZ=1     ;int naa=2              ;char*gq="memc";char*gr="ne";char*gs="tcpudp";short nab=3         ;long nac=4        ;char*gt="piduidgid";short nad=5   ;
int nae=6;char*gu="ttye";short naf=7;int nag=8       ;int nah=9                ;char*gv="tabrowcoldims";char*gw="avgbithexb";short nai=0;short naj=0;short nak=63   ;int nal=0;char*gx="decabssin";     
int nam=0;char*gy="cosm";int nao=127      ;short nap=128      ;short naq=200   ;char*gz="expnopac";char*gA="synfinrstvecmat";short nar=255;int nas=256   ;long nat=333        ;char*gB="dotsubmul";     
int nau=0;char*gC="divs";int nav=999      ;int naw=1000     ;short nax=1024    ;char*gD="shrxoran";char*gE="initexitreaddat";int nay=2048;int naz=4096  ;short naA=0x0        ;char*gF="nodelinks";     
int naB=0;char*gG="name";long naC=0;long naD=0xFF        ;int naE=0   ;         char*gH="t";char*gI="c";char*gJ="nullfreeop";int naG=1 ;int naH=2            ;short naI=3     ;char*gK="filepathl";     
int naJ=4;char*gL="word";long naK=5        ;short naL=6 ;short naM=7           ;     int naN=8           ;long naO=9          ;short naP=10   ;long naQ=11        ;short naR=12    ;char*gM="text";     
int naS=0;char*gN="info";long naT=0;int naU=0;int naV=95       ;int naW=96     ;     int naX=0;short naY=256       ;int naZ=0;int nba=0 ;int nbb=0x0F  ;int nbc=0x1A     ;int nbd=0;char*gO="warn";     
int nbe=0;char*gP="fail";short nbf=1         ;long nbg=2        ;long nbh=3    ;     long nbi=4           ;int nbj=5   ;int nbk=6 ;long nbl=7     ;long nbm=8     ;short nbn=9     ;char*gQ="done";     
int nbo=0;char*gR="load";long nbp=24         ;int nbq=25           ;int nbr=31 ;     short nbs=32;int nbt=33      ;int nbu=42     ;long nbv=47  ;int nbw=48  ;short nbx=50         ;char*gS="save";     
int nby=0;char*gT="copy";int nbz=0;int nbA=101          ;long nbB=0 ;long nbC=0;     long nbD=0x0;int nbE=0;int nbF=0x10   ;long nbG=0x20  ;long nbH=0x40        ;long nbI=0x7F    ;char*gU="move";     
int nbJ=0;char*gV="swap";int nbK=1    ;int nbL=2;short nbM=3         ;int nbN=4;     int nbO=5     ;int nbP=6;short nbQ=7     ;int nbR=8        ;int nbS=9;int nbT=10;short nbU=11 ;char*gW="push";     
int nbV=0;char*gX="pull";int nbW=31        ;short nbX=32      ;short nbY=33    ;     long nbZ=0;short nca=70       ;short ncb=71      ;long ncc=72   ;short ncd=77;int nce=80      ;char*gY="send";     
int ncf=0;char*gZ="recv";long ncg=110    ;int nch=127          ;long nci=128   ;     short ncj=200     ;int nck=0 ;int ncl=768      ;long ncm=800     ;long ncn=0 ;int nco=0x0F    ;char*gaa="wai";     
int ncp=0;char*gab="loc";short ncq=0x80   ;short ncr=0  ;short ncs=1           ;     int nct=2        ;short ncu=3        ;short ncv=4  ;int ncw=5 ;int ncx=6    ;short ncy=7      ;char*gac="for";     
int ncz=8;char*gad="exe";int ncA=9         ;long ncB=10         ;short ncC=11  ;     long ncD=12        ;long ncE=13      ;int ncF=14   ;int ncG=15;long ncH=16    ;int ncI=17     ;char*gae="pip";     
int ncJ=0;char*gaf="soc";short ncK=0;short ncL=77    ;long ncM=80              ;     int ncN=85       ;int ncO=90;int ncP=91          ;int ncQ=95       ;short ncR=96  ;int ncS=97 ;char*gag="bin";     
int ncT=0;char*gah="pol";int ncU=333   ;int ncV=400   ;int ncW=404             ;     int ncX=420        ;short ncY=500 ;short ncZ=512  ;int nda=666         ;int ndb=700 ;int ndc=0;char*gai="see";     
int ndd=0;char*gaj="sta";long nde=0x20        ;short ndf=0x40       ;long ndg=0;     short ndh=1;long ndi=2;int ndj=3;int ndk=4   ;long ndl=5      ;int ndm=6    ;int ndn=7        ;char*gak="mod";     
int ndo=8;char*gal="mas";long ndp=9;short ndq=10  ;long ndr=11      ;int nds=12;     long ndt=0;short ndu=0;int ndv=66   ;int ndw=69;long ndx=70    ;long ndy=71         ;int ndz=0;char*gam="fla";     
int ndA=0;char*gan="sig";long ndB=400;int ndC=0;int ndD=1000   ;short ndE=1024 ;     short ndF=2048     ;short ndG=4096      ;int ndH=0x0        ;long ndI=0x1  ;int ndJ=0 ;        char*gao="has";     
     char*gap="sortlist";long ndL=0x20       ;long ndM=0x40    ;long ndN=0x7F  ;char*gaq="tree";char*gar="heaprin";long ndO=0x80       ;int ndP=0xAA     ;long ndQ=0  ;short ndR=1 ;char*gas="poolslot";
     char*gat="pagecode";long ndS=2        ;short ndT=3    ;int ndU=4;int ndV=5;char*gau="packa";char*gav="parsew";long ndW=6      ;short ndX=7     ;short ndY=8 ;short ndZ=9      ;char*gaw="closeflu";
     char*gax="resetcle";short nea=10 ;short neb=11       ;long nec=12         ;            char*gaz="startcheckm";short ned=13;int nee=14   ;int nef=15           ;int neg=16     ;char*gaA="mergespl";
     char*gaB="stripsta";short neh=17    ;int nei=21           ;long nej=23    ;char*gaC="queuecach";char*gaD="bl";short nek=24        ;long nel=25    ;int nem=31     ;short nen=0;char*gaE="chunkfra";
char*gaF="inputprintdeb";int neo=66           ;long nep=69          ;int neq=70;char*gaG="errortokenv";            int ner=0;int nes=98  ;int net=99      ;long neu=100            ;char*gaI="countind";
char*gaJ="arraytableent";long nev=101      ;long new=110         ;short nex=127;char*gaK="buferrl";char*gaL="lenp";long ney=128     ;short nez=0;long neA=700    ;int neB=768      ;char*gaM="idxkeyva";
char*gaN="srcdsttmpmsgf";short neC=800        ;short neD=900   ;long neE=999   ;char*gaO="retarg";char*gaP="ctxst";long neF=1000       ;long neG=0x0;long neH=0x1  ;int neI=0xA    ;char*gaQ="nummaxmi";
     char*gaR="posendcu";long neJ=0xF;int neK=0x0F        ;int neL=0x1A        ;     long neM=0;long neN=0xAA  ;long neO=0xBB    ;int neP=0xCC   ;long neQ=0  ;short neR=1         ;char*gaS="topoutra";
     char*gaT="cmddirex";long neS=2     ;int neT=3;long neU=4   ;short neV=5   ;     short neW=6         ;short neX=7      ;long neY=8  ;long neZ=9  ;long nfa=10    ;long nfb=11  ;char*gaU="refobjma";
     char*gaV="setrunge";int nfc=12          ;int nfd=13      ;long nfe=14     ;     short nff=15      ;int nfg=16         ;int nfh=17;int nfi=21     ;int nfj=23      ;long nfk=24;char*gaW="putaddde";
     char*gaX="nilsysme";long nfl=25 ;long nfm=31   ;long nfn=32               ;     long nfo=33  ;int nfp=42   ;int nfq=47      ;short nfr=48        ;int nfs=0;short nft=77      ;char*gaY="cpunettc";
int nfu=0;char*gaZ="udp";int nfv=101 ;int nfw=110       ;int nfx=127 ;int nfy=0;     int nfz=0 ;long nfA=0x0;long nfB=0x1        ;long nfC=0xA         ;short nfD=0;short nfE=0x40 ;char*gba="pid";     
int nfF=0;char*gbb="uid";int nfG=1         ;short nfH=2  ;long nfI=3           ;     short nfJ=4    ;int nfK=5   ;short nfL=6       ;int nfM=7          ;int nfN=8 ;long nfO=9     ;char*gbc="gid";     
int nfP=0;char*gbd="tty";short nfQ=24  ;short nfR=25   ;int nfS=31    ;              long nfU=32    ;long nfV=0;short nfW=69  ;short nfX=70    ;long nfY=71;short nfZ=0;short nga=0;char*gbe="eof";     
int ngb=0;char*gbf="tab";short ngc=999       ;long ngd=1000;int nge=1024       ;     long ngf=2048;long ngg=0x0;short ngh=0x1     ;long ngi=0xA       ;int ngj=0xF   ;long ngk=0x0F;char*gbg="row";     
int ngl=0;char*gbh="col";long ngm=0x80        ;long ngn=0xAA ;short ngo=0xBB   ;     int ngp=0;int ngq=1   ;short ngr=2 ;long ngs=3     ;int ngt=4        ;long ngu=5              ;char*gbi="dim";     
int ngv=6;char*gbj="sum";int ngw=7    ;short ngx=8    ;long ngy=9  ;short ngz=0;     long ngA=24   ;short ngB=25     ;long ngC=31   ;short ngD=32        ;long ngE=33   ;long ngF=0;char*gbk="avg";     
int ngG=0;char*gbl="bit";int ngH=97          ;int ngI=98    ;short ngJ=99      ;     int ngK=100;short ngL=0 ;long ngM=420    ;short ngN=500       ;short ngO=512        ;int ngP=0;char*gbm="hex";     
int ngQ=0;char*gbn="bin";long ngR=0 ;int ngS=0;int ngT=1        ;int ngU=2     ;     int ngV=3;short ngW=4  ;short ngX=5;long ngY=6           ;int ngZ=7 ;long nha=8               ;char*gbo="dec";     
int nhb=9;char*gbp="abs";int nhc=10 ;long nhd=11  ;int nhe=12;long nhf=13      ;     int nhg=14;short nhh=15       ;int nhi=0;short nhj=0;int nhk=71   ;int nhl=72  ;long nhm=77   ;char*gbq="sin";     
int nhn=0;char*gbr="cos";long nho=101    ;short nhp=110;long nhq=127   ;             int nhs=128         ;int nht=200          ;int nhu=255        ;short nhv=256;int nhw=333      ;char*gbs="mod";     
int nhx=0;char*gbt="exp";int nhy=999;long nhz=1000  ;short nhA=1024            ;     long nhB=2048   ;int nhC=0;short nhD=0  ;short nhE=0  ;int nhF=1       ;int nhG=2             ;char*gbu="nop";     
int nhH=3;char*gbv="ack";int nhI=4        ;int nhJ=5          ;int nhK=6       ;     int nhL=7 ;long nhM=8 ;short nhN=9       ;long nhO=10       ;int nhP=11      ;short nhQ=12    ;char*gbw="syn";     
int nhR=0;char*gbx="fin";long nhS=32      ;int nhT=33      ;int nhU=42         ;     short nhV=47   ;short nhW=48  ;int nhX=50   ;int nhY=55;short nhZ=63       ;int nia=64        ;char*gby="rst";     
int nib=0;char*gbz="vec";short nic=91     ;long nid=95     ;short nie=0;             int nig=255     ;long nih=256    ;long nii=333   ;short nij=400 ;int nik=0 ;long nil=1000     ;char*gbA="mat";     
int nim=0;char*gbB="dot";short nin=0x3C       ;int nio=0;long nip=0;long niq=1 ;     long nir=2;int nis=3        ;short nit=4        ;long niu=5      ;int niv=6;long niw=7        ;char*gbC="sub";     
int nix=8;char*gbD="mul";int niy=9            ;long niz=10 ;int niA=11         ;char*gbE="div";char*gbF="shlshr";            int niB=12;short niC=13       ;short niD=14      ;char*gbH="xorandin";     
int niE=0;char*gbI="exi";long niF=42      ;int niG=47;long niH=0;short niI=72  ;char*gbJ="readdatanode";char*gbK="linksizen";short niJ=77    ;short niK=80 ;long niL=85       ;char*gbL="typechar";     
int niM=0;char*gbM="nul";int niN=127      ;int niO=128    ;short niP=200       ;char*gbN="freeopenfi";char*gbO="pathlinewor";long niQ=0;long niR=768         ;short niS=800   ;char*gbP="textinfo";     
int niT=0;char*gbQ="war";short niU=0x0F    ;long niV=0x1A      ;int niW=0x2B   ;char*gbR="faildo";char*gbS="loadsavecopymov";long niX=0x3C   ;short niY=0x4D;long niZ=0x5E    ;char*gbT="swappush";     
int nja=0x6F       ;char*gbU="pullsend";long njb=0x10     ;long njc=0  ;        char*gbV="recvwaitlo";char*gbW="forkexecpip";long nje=0          ;short njf=1       ;char*gbX="sockbind";int njg=2     ;
short njh=3;        char*gbY="pollseek";int njj=4 ;int njk=5       ;int njl=6  ;char*gbZ="statm";char*gca="maskflagsignhash";int njm=7          ;long njn=8;         char*gcb="sortlist";long njp=9    ;
int njq=10         ;char*gcc="treeheap";short njr=11       ;long njs=12        ;char*gcd="ringpools";char*gce="pagecodepack";long njt=13          ;int nju=14       ;char*gcf="allocpar";int njv=15    ;
short njw=16       ;int njx=17   ;int njy=21          ;int njz=23     ;short njA=24         ;int njB=25          ;int njC=31      ;long njD=32         ;int njE=0;int njF=69    ;long njG=70  ;         
int njI=71 ;long njJ=72      ;short njK=77      ;int njL=80           ;int njM=85 ;int njN=90;short njO=91   ;int njP=95         ;short njQ=96    ;int njR=97 ;short njS=98    ;long njT=99  ;int njU=0;

