(()=>{var Au=0,cc=1,Ru=2;var Mh=1,Cu=2,_n=3,hn=0,ze=1,We=2,Hn=0,Fi=1,hc=2,uc=3,dc=4,Iu=5,li=100,Pu=101,Lu=102,Du=103,Uu=104,Nu=200,Ou=201,ku=202,zu=203,ia=204,sa=205,Fu=206,Bu=207,Hu=208,Vu=209,Gu=210,Wu=211,$u=212,Xu=213,Yu=214,ra=0,oa=1,aa=2,Gi=3,la=4,ca=5,ha=6,ua=7,Il=0,qu=1,Zu=2,Vn=0,Ju=1,Ku=2,ju=3,Qu=4,td=5,ed=6,nd=7;var wh=300,Wi=301,$i=302,da=303,fa=304,Jr=306,bs=1e3,hi=1001,pa=1002,$e=1003,id=1004;var Fs=1005;var ln=1006,bo=1007;var ui=1008;var En=1009,Sh=1010,Eh=1011,Ms=1012,Pl=1013,di=1014,cn=1015,Us=1016,Ll=1017,Dl=1018,Xi=1020,Th=35902,Ah=1021,Rh=1022,nn=1023,Ch=1024,Ih=1025,Bi=1026,Yi=1027,Ul=1028,Nl=1029,Ph=1030,Ol=1031;var kl=1033,xr=33776,yr=33777,vr=33778,_r=33779,ma=35840,ga=35841,xa=35842,ya=35843,va=36196,_a=37492,ba=37496,Ma=37808,wa=37809,Sa=37810,Ea=37811,Ta=37812,Aa=37813,Ra=37814,Ca=37815,Ia=37816,Pa=37817,La=37818,Da=37819,Ua=37820,Na=37821,br=36492,Oa=36494,ka=36495,Lh=36283,za=36284,Fa=36285,Ba=36286;var wr=2300,Ha=2301,Mo=2302,fc=2400,pc=2401,mc=2402;var sd=3200,rd=3201;var Dh=0,od=1,Bn="",Ue="srgb",ji="srgb-linear",Kr="linear",oe="srgb";var vi=7680;var gc=519,ad=512,ld=513,cd=514,Uh=515,hd=516,ud=517,dd=518,fd=519,Va=35044;var xc="300 es",wn=2e3,Sr=2001,Wn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Mr=Math.PI/180,Ga=180/Math.PI;function Gn(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[s&255]+Ie[s>>8&255]+Ie[s>>16&255]+Ie[s>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Te(s,t,e){return Math.max(t,Math.min(e,s))}function pd(s,t){return(s%t+t)%t}function wo(s,t,e){return(1-e)*s+e*t}function an(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var at=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Bt=class s{constructor(t,e,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],m=n[8],y=i[0],x=i[3],p=i[6],M=i[1],E=i[4],v=i[7],D=i[2],A=i[5],C=i[8];return r[0]=o*y+a*M+l*D,r[3]=o*x+a*E+l*A,r[6]=o*p+a*v+l*C,r[1]=c*y+u*M+h*D,r[4]=c*x+u*E+h*A,r[7]=c*p+u*v+h*C,r[2]=d*y+f*M+m*D,r[5]=d*x+f*E+m*A,r[8]=d*p+f*v+m*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,m=e*h+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=h*y,t[1]=(i*c-u*n)*y,t[2]=(a*n-i*o)*y,t[3]=d*y,t[4]=(u*e-i*l)*y,t[5]=(i*r-a*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(So.makeScale(t,e)),this}rotate(t){return this.premultiply(So.makeRotation(-t)),this}translate(t,e){return this.premultiply(So.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},So=new Bt;function Nh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Er(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function md(){let s=Er("canvas");return s.style.display="block",s}var yc={};function gs(s){s in yc||(yc[s]=!0,console.warn(s))}function gd(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function xd(s){let t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function yd(s){let t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Qt={enabled:!0,workingColorSpace:ji,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(s.r=Sn(s.r),s.g=Sn(s.g),s.b=Sn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(s.r=Hi(s.r),s.g=Hi(s.g),s.b=Hi(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?Kr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Sn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Hi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var vc=[.64,.33,.3,.6,.15,.06],_c=[.2126,.7152,.0722],bc=[.3127,.329],Mc=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wc=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[ji]:{primaries:vc,whitePoint:bc,transfer:Kr,toXYZ:Mc,fromXYZ:wc,luminanceCoefficients:_c,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:vc,whitePoint:bc,transfer:oe,toXYZ:Mc,fromXYZ:wc,luminanceCoefficients:_c,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}});var _i,Wa=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=Er("canvas")),_i.width=t.width,_i.height=t.height;let n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Er("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Sn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Sn(e[n]/255)*255):e[n]=Sn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},vd=0,Tr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=Gn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Eo(i[o].image)):r.push(Eo(i[o]))}else r=Eo(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Eo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Wa.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var _d=0,Fe=class s extends Wn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=hi,i=hi,r=ln,o=ui,a=nn,l=En,c=s.DEFAULT_ANISOTROPY,u=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=Gn(),this.name="",this.source=new Tr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bs:t.x=t.x-Math.floor(t.x);break;case hi:t.x=t.x<0?0:1;break;case pa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bs:t.y=t.y-Math.floor(t.y);break;case hi:t.y=t.y<0?0:1;break;case pa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=wh;Fe.DEFAULT_ANISOTROPY=1;var ye=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],y=l[2],x=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-y)<.01&&Math.abs(m-x)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+y)<.1&&Math.abs(m+x)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let E=(c+1)/2,v=(f+1)/2,D=(p+1)/2,A=(u+d)/4,C=(h+y)/4,I=(m+x)/4;return E>v&&E>D?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=A/n,r=C/n):v>D?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=A/i,r=I/i):D<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(D),n=C/r,i=I/r),this.set(n,i,r,e),this}let M=Math.sqrt((x-m)*(x-m)+(h-y)*(h-y)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(x-m)/M,this.y=(h-y)/M,this.z=(d-u)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},$a=class extends Wn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Fe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Tr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Tn=class extends $a{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ar=class extends Fe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xa=class extends Fe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qe=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=y;return}if(h!==y||l!==d||c!==f||u!==m){let x=1-a,p=l*d+c*f+u*m+h*y,M=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){let D=Math.sqrt(E),A=Math.atan2(D,p*M);x=Math.sin(x*A)/D,a=Math.sin(a*A)/D}let v=a*M;if(l=l*x+d*v,c=c*x+f*v,u=u*x+m*v,h=h*x+y*v,x===1-a){let D=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=D,c*=D,u*=D,h*=D}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+u*h+l*f-c*d,t[e+1]=l*m+u*d+c*h-a*f,t[e+2]=c*m+u*f+a*d-l*h,t[e+3]=u*m-a*h-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Sc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Sc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),u=2*(a*e-r*i),h=2*(r*n-o*e);return this.x=e+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return To.copy(this).projectOnVector(t),this.sub(To)}reflect(t){return this.sub(To.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},To=new P,Sc=new qe,An=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qe):Qe.fromBufferAttribute(r,o),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bs.copy(n.boundingBox)),Bs.applyMatrix4(t.matrixWorld),this.union(Bs)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),Hs.subVectors(this.max,os),bi.subVectors(t.a,os),Mi.subVectors(t.b,os),wi.subVectors(t.c,os),Un.subVectors(Mi,bi),Nn.subVectors(wi,Mi),ei.subVectors(bi,wi);let e=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-ei.z,ei.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,ei.z,0,-ei.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-ei.y,ei.x,0];return!Ao(e,bi,Mi,wi,Hs)||(e=[1,0,0,0,1,0,0,0,1],!Ao(e,bi,Mi,wi,Hs))?!1:(Vs.crossVectors(Un,Nn),e=[Vs.x,Vs.y,Vs.z],Ao(e,bi,Mi,wi,Hs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},mn=[new P,new P,new P,new P,new P,new P,new P,new P],Qe=new P,Bs=new An,bi=new P,Mi=new P,wi=new P,Un=new P,Nn=new P,ei=new P,os=new P,Hs=new P,Vs=new P,ni=new P;function Ao(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ni.fromArray(s,r);let a=i.x*Math.abs(ni.x)+i.y*Math.abs(ni.y)+i.z*Math.abs(ni.z),l=t.dot(ni),c=e.dot(ni),u=n.dot(ni);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var bd=new An,as=new P,Ro=new P,$n=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):bd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;as.subVectors(t,this.center);let e=as.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ro.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(as.copy(t.center).add(Ro)),this.expandByPoint(as.copy(t.center).sub(Ro))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},gn=new P,Co=new P,Gs=new P,On=new P,Io=new P,Ws=new P,Po=new P,ws=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=gn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gn.copy(this.origin).addScaledVector(this.direction,e),gn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Co.copy(t).add(e).multiplyScalar(.5),Gs.copy(e).sub(t).normalize(),On.copy(this.origin).sub(Co);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Gs),a=On.dot(this.direction),l=-On.dot(Gs),c=On.lengthSq(),u=Math.abs(1-o*o),h,d,f,m;if(u>0)if(h=o*l-a,d=o*a-l,m=r*u,h>=0)if(d>=-m)if(d<=m){let y=1/u;h*=y,d*=y,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Co).addScaledVector(Gs,d),f}intersectSphere(t,e){gn.subVectors(t.center,this.origin);let n=gn.dot(this.direction),i=gn.dot(gn)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-d.z)*h,l=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,l=(t.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,gn)!==null}intersectTriangle(t,e,n,i,r){Io.subVectors(e,t),Ws.subVectors(n,t),Po.crossVectors(Io,Ws);let o=this.direction.dot(Po),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;On.subVectors(this.origin,t);let l=a*this.direction.dot(Ws.crossVectors(On,Ws));if(l<0)return null;let c=a*this.direction.dot(Io.cross(On));if(c<0||l+c>o)return null;let u=-a*On.dot(Po);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ne=class s{constructor(t,e,n,i,r,o,a,l,c,u,h,d,f,m,y,x){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,u,h,d,f,m,y,x)}set(t,e,n,i,r,o,a,l,c,u,h,d,f,m,y,x){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=m,p[11]=y,p[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Si.setFromMatrixColumn(t,0).length(),r=1/Si.setFromMatrixColumn(t,1).length(),o=1/Si.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){let d=o*u,f=o*h,m=a*u,y=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=f+m*c,e[5]=d-y*c,e[9]=-a*l,e[2]=y-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*u,f=l*h,m=c*u,y=c*h;e[0]=d+y*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=y+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*u,f=l*h,m=c*u,y=c*h;e[0]=d-y*a,e[4]=-o*h,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=y-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*u,f=o*h,m=a*u,y=a*h;e[0]=l*u,e[4]=m*c-f,e[8]=d*c+y,e[1]=l*h,e[5]=y*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*u,e[4]=y-d*h,e[8]=m*h+f,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*h+m,e[10]=d-y*h}else if(t.order==="XZY"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=d*h+y,e[5]=o*u,e[9]=f*h-m,e[2]=m*h-f,e[6]=a*u,e[10]=y*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Md,t,wd)}lookAt(t,e,n){let i=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),kn.crossVectors(n,Ve),kn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),kn.crossVectors(n,Ve)),kn.normalize(),$s.crossVectors(Ve,kn),i[0]=kn.x,i[4]=$s.x,i[8]=Ve.x,i[1]=kn.y,i[5]=$s.y,i[9]=Ve.y,i[2]=kn.z,i[6]=$s.z,i[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],m=n[2],y=n[6],x=n[10],p=n[14],M=n[3],E=n[7],v=n[11],D=n[15],A=i[0],C=i[4],I=i[8],S=i[12],w=i[1],L=i[5],z=i[9],B=i[13],W=i[2],Q=i[6],Y=i[10],et=i[14],$=i[3],ct=i[7],gt=i[11],Rt=i[15];return r[0]=o*A+a*w+l*W+c*$,r[4]=o*C+a*L+l*Q+c*ct,r[8]=o*I+a*z+l*Y+c*gt,r[12]=o*S+a*B+l*et+c*Rt,r[1]=u*A+h*w+d*W+f*$,r[5]=u*C+h*L+d*Q+f*ct,r[9]=u*I+h*z+d*Y+f*gt,r[13]=u*S+h*B+d*et+f*Rt,r[2]=m*A+y*w+x*W+p*$,r[6]=m*C+y*L+x*Q+p*ct,r[10]=m*I+y*z+x*Y+p*gt,r[14]=m*S+y*B+x*et+p*Rt,r[3]=M*A+E*w+v*W+D*$,r[7]=M*C+E*L+v*Q+D*ct,r[11]=M*I+E*z+v*Y+D*gt,r[15]=M*S+E*B+v*et+D*Rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],d=t[10],f=t[14],m=t[3],y=t[7],x=t[11],p=t[15];return m*(+r*l*h-i*c*h-r*a*d+n*c*d+i*a*f-n*l*f)+y*(+e*l*f-e*c*d+r*o*d-i*o*f+i*c*u-r*l*u)+x*(+e*c*h-e*a*f-r*o*h+n*o*f+r*a*u-n*c*u)+p*(-i*a*u-e*l*h+e*a*d+i*o*h-n*o*d+n*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],d=t[10],f=t[11],m=t[12],y=t[13],x=t[14],p=t[15],M=h*x*c-y*d*c+y*l*f-a*x*f-h*l*p+a*d*p,E=m*d*c-u*x*c-m*l*f+o*x*f+u*l*p-o*d*p,v=u*y*c-m*h*c+m*a*f-o*y*f-u*a*p+o*h*p,D=m*h*l-u*y*l-m*a*d+o*y*d+u*a*x-o*h*x,A=e*M+n*E+i*v+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return t[0]=M*C,t[1]=(y*d*r-h*x*r-y*i*f+n*x*f+h*i*p-n*d*p)*C,t[2]=(a*x*r-y*l*r+y*i*c-n*x*c-a*i*p+n*l*p)*C,t[3]=(h*l*r-a*d*r-h*i*c+n*d*c+a*i*f-n*l*f)*C,t[4]=E*C,t[5]=(u*x*r-m*d*r+m*i*f-e*x*f-u*i*p+e*d*p)*C,t[6]=(m*l*r-o*x*r-m*i*c+e*x*c+o*i*p-e*l*p)*C,t[7]=(o*d*r-u*l*r+u*i*c-e*d*c-o*i*f+e*l*f)*C,t[8]=v*C,t[9]=(m*h*r-u*y*r-m*n*f+e*y*f+u*n*p-e*h*p)*C,t[10]=(o*y*r-m*a*r+m*n*c-e*y*c-o*n*p+e*a*p)*C,t[11]=(u*a*r-o*h*r-u*n*c+e*h*c+o*n*f-e*a*f)*C,t[12]=D*C,t[13]=(u*y*i-m*h*i+m*n*d-e*y*d-u*n*x+e*h*x)*C,t[14]=(m*a*i-o*y*i-m*n*l+e*y*l+o*n*x-e*a*x)*C,t[15]=(o*h*i-u*a*i+u*n*l-e*h*l-o*n*d+e*a*d)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,m=r*h,y=o*u,x=o*h,p=a*h,M=l*c,E=l*u,v=l*h,D=n.x,A=n.y,C=n.z;return i[0]=(1-(y+p))*D,i[1]=(f+v)*D,i[2]=(m-E)*D,i[3]=0,i[4]=(f-v)*A,i[5]=(1-(d+p))*A,i[6]=(x+M)*A,i[7]=0,i[8]=(m+E)*C,i[9]=(x-M)*C,i[10]=(1-(d+y))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Si.set(i[0],i[1],i[2]).length(),o=Si.set(i[4],i[5],i[6]).length(),a=Si.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],tn.copy(this);let c=1/r,u=1/o,h=1/a;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=h,tn.elements[9]*=h,tn.elements[10]*=h,e.setFromRotationMatrix(tn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=wn){let l=this.elements,c=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),d=(n+i)/(n-i),f,m;if(a===wn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Sr)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=wn){let l=this.elements,c=1/(e-t),u=1/(n-i),h=1/(o-r),d=(e+t)*c,f=(n+i)*u,m,y;if(a===wn)m=(o+r)*h,y=-2*h;else if(a===Sr)m=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Si=new P,tn=new ne,Md=new P(0,0,0),wd=new P(1,1,1),kn=new P,$s=new P,Ve=new P,Ec=new ne,Tc=new qe,Ze=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ec.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ec,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Tc.setFromEuler(this),this.setFromQuaternion(Tc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ze.DEFAULT_ORDER="XYZ";var Ss=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Sd=0,Ac=new P,Ei=new qe,xn=new ne,Xs=new P,ls=new P,Ed=new P,Td=new qe,Rc=new P(1,0,0),Cc=new P(0,1,0),Ic=new P(0,0,1),Pc={type:"added"},Ad={type:"removed"},Ti={type:"childadded",child:null},Lo={type:"childremoved",child:null},Ae=class s extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new P,e=new Ze,n=new qe,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ne},normalMatrix:{value:new Bt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(Rc,t)}rotateY(t){return this.rotateOnAxis(Cc,t)}rotateZ(t){return this.rotateOnAxis(Ic,t)}translateOnAxis(t,e){return Ac.copy(t).applyQuaternion(this.quaternion),this.position.add(Ac.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Rc,t)}translateY(t){return this.translateOnAxis(Cc,t)}translateZ(t){return this.translateOnAxis(Ic,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Xs.copy(t):Xs.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(ls,Xs,this.up):xn.lookAt(Xs,ls,this.up),this.quaternion.setFromRotationMatrix(xn),i&&(xn.extractRotation(i.matrixWorld),Ei.setFromRotationMatrix(xn),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Pc),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ad),Lo.child=t,this.dispatchEvent(Lo),Lo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Pc),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,Ed),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Td,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Ae.DEFAULT_UP=new P(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var en=new P,yn=new P,Do=new P,vn=new P,Ai=new P,Ri=new P,Lc=new P,Uo=new P,No=new P,Oo=new P,ko=new ye,zo=new ye,Fo=new ye,Mn=class s{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),en.subVectors(t,e),i.cross(en);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){en.subVectors(i,e),yn.subVectors(n,e),Do.subVectors(t,e);let o=en.dot(en),a=en.dot(yn),l=en.dot(Do),c=yn.dot(yn),u=yn.dot(Do),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(c*l-a*u)*d,m=(o*u-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vn.x),l.addScaledVector(o,vn.y),l.addScaledVector(a,vn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return ko.setScalar(0),zo.setScalar(0),Fo.setScalar(0),ko.fromBufferAttribute(t,e),zo.fromBufferAttribute(t,n),Fo.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ko,r.x),o.addScaledVector(zo,r.y),o.addScaledVector(Fo,r.z),o}static isFrontFacing(t,e,n,i){return en.subVectors(n,e),yn.subVectors(t,e),en.cross(yn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),en.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Ai.subVectors(i,n),Ri.subVectors(r,n),Uo.subVectors(t,n);let l=Ai.dot(Uo),c=Ri.dot(Uo);if(l<=0&&c<=0)return e.copy(n);No.subVectors(t,i);let u=Ai.dot(No),h=Ri.dot(No);if(u>=0&&h<=u)return e.copy(i);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Ai,o);Oo.subVectors(t,r);let f=Ai.dot(Oo),m=Ri.dot(Oo);if(m>=0&&f<=m)return e.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Ri,a);let x=u*m-f*h;if(x<=0&&h-u>=0&&f-m>=0)return Lc.subVectors(r,i),a=(h-u)/(h-u+(f-m)),e.copy(i).addScaledVector(Lc,a);let p=1/(x+y+d);return o=y*p,a=d*p,e.copy(n).addScaledVector(Ai,o).addScaledVector(Ri,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Oh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function Bo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var At=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Qt.workingColorSpace){if(t=pd(t,1),e=Te(e,0,1),n=Te(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Bo(o,r,t+1/3),this.g=Bo(o,r,t),this.b=Bo(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,i),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){let n=Oh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sn(t.r),this.g=Sn(t.g),this.b=Sn(t.b),this}copyLinearToSRGB(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return Qt.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Te(Pe.r*255,0,255))*65536+Math.round(Te(Pe.g*255,0,255))*256+Math.round(Te(Pe.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Pe.copy(this),e);let n=Pe.r,i=Pe.g,r=Pe.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ue){Qt.fromWorkingColorSpace(Pe.copy(this),t);let e=Pe.r,n=Pe.g,i=Pe.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(Ys);let n=wo(zn.h,Ys.h,e),i=wo(zn.s,Ys.s,e),r=wo(zn.l,Ys.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pe=new At;At.NAMES=Oh;var Rd=0,Rn=class extends Wn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=Gn(),this.name="",this.blending=Fi,this.side=hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ia,this.blendDst=sa,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new At(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ia&&(n.blendSrc=this.blendSrc),this.blendDst!==sa&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},_e=class extends Rn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ve=new P,qs=new at,Me=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Va,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qs.fromBufferAttribute(this,e),qs.applyMatrix3(t),this.setXY(e,qs.x,qs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=an(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=an(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=an(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=an(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Va&&(t.usage=this.usage),t}};var Rr=class extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Cr=class extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Yt=class extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}},Cd=0,Ye=new ne,Ho=new Ae,Ci=new P,Ge=new An,cs=new An,Ee=new P,ge=class s extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nh(t)?Cr:Rr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Ho.lookAt(t),Ho.updateMatrix(),this.applyMatrix4(Ho.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ci).negate(),this.translate(Ci.x,Ci.y,Ci.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Yt(n,3))}else{for(let n=0,i=e.count;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $n);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(Ge.min,cs.min),Ge.expandByPoint(Ee),Ee.addVectors(Ge.max,cs.max),Ge.expandByPoint(Ee)):(Ge.expandByPoint(cs.min),Ge.expandByPoint(cs.max))}Ge.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ee.fromBufferAttribute(a,c),l&&(Ci.fromBufferAttribute(t,c),Ee.add(Ci)),i=Math.max(i,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new P,l[I]=new P;let c=new P,u=new P,h=new P,d=new at,f=new at,m=new at,y=new P,x=new P;function p(I,S,w){c.fromBufferAttribute(n,I),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,w),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,w),u.sub(c),h.sub(c),f.sub(d),m.sub(d);let L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(y.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(L),x.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(L),a[I].add(y),a[S].add(y),a[w].add(y),l[I].add(x),l[S].add(x),l[w].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let I=0,S=M.length;I<S;++I){let w=M[I],L=w.start,z=w.count;for(let B=L,W=L+z;B<W;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let E=new P,v=new P,D=new P,A=new P;function C(I){D.fromBufferAttribute(i,I),A.copy(D);let S=a[I];E.copy(S),E.sub(D.multiplyScalar(D.dot(S))).normalize(),v.crossVectors(A,S);let L=v.dot(l[I])<0?-1:1;o.setXYZW(I,E.x,E.y,E.z,L)}for(let I=0,S=M.length;I<S;++I){let w=M[I],L=w.start,z=w.count;for(let B=L,W=L+z;B<W;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new P,r=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),y=t.getX(d+1),x=t.getX(d+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,x),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,x),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),f=0,m=0;for(let y=0,x=l.length;y<x;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*u;for(let p=0;p<u;p++)d[m++]=c[f++]}return new Me(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(t.data))}u.length>0&&(i[l]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dc=new ne,ii=new ws,Zs=new $n,Uc=new P,Js=new P,Ks=new P,js=new P,Vo=new P,Qs=new P,Nc=new P,tr=new P,yt=class extends Ae{constructor(t=new ge,e=new _e){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],h=r[l];u!==0&&(Vo.fromBufferAttribute(h,t),o?Qs.addScaledVector(Vo,u):Qs.addScaledVector(Vo.sub(e),u))}e.add(Qs)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zs.copy(n.boundingSphere),Zs.applyMatrix4(r),ii.copy(t.ray).recast(t.near),!(Zs.containsPoint(ii.origin)===!1&&(ii.intersectSphere(Zs,Uc)===null||ii.origin.distanceToSquared(Uc)>(t.far-t.near)**2))&&(Dc.copy(r).invert(),ii.copy(t.ray).applyMatrix4(Dc),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ii)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let x=d[m],p=o[x.materialIndex],M=Math.max(x.start,f.start),E=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let v=M,D=E;v<D;v+=3){let A=a.getX(v),C=a.getX(v+1),I=a.getX(v+2);i=er(this,p,t,n,c,u,h,A,C,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=x.materialIndex,e.push(i))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let x=m,p=y;x<p;x+=3){let M=a.getX(x),E=a.getX(x+1),v=a.getX(x+2);i=er(this,o,t,n,c,u,h,M,E,v),i&&(i.faceIndex=Math.floor(x/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let x=d[m],p=o[x.materialIndex],M=Math.max(x.start,f.start),E=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let v=M,D=E;v<D;v+=3){let A=v,C=v+1,I=v+2;i=er(this,p,t,n,c,u,h,A,C,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=x.materialIndex,e.push(i))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let x=m,p=y;x<p;x+=3){let M=x,E=x+1,v=x+2;i=er(this,o,t,n,c,u,h,M,E,v),i&&(i.faceIndex=Math.floor(x/3),e.push(i))}}}};function Id(s,t,e,n,i,r,o,a){let l;if(t.side===ze?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===hn,a),l===null)return null;tr.copy(a),tr.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(tr);return c<e.near||c>e.far?null:{distance:c,point:tr.clone(),object:s}}function er(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Js),s.getVertexPosition(l,Ks),s.getVertexPosition(c,js);let u=Id(s,t,e,n,Js,Ks,js,Nc);if(u){let h=new P;Mn.getBarycoord(Nc,Js,Ks,js,h),i&&(u.uv=Mn.getInterpolatedAttribute(i,a,l,c,h,new at)),r&&(u.uv1=Mn.getInterpolatedAttribute(r,a,l,c,h,new at)),o&&(u.normal=Mn.getInterpolatedAttribute(o,a,l,c,h,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new P,materialIndex:0};Mn.getNormal(Js,Ks,js,d.normal),u.face=d,u.barycoord=h}return u}var qt=class s extends ge{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,i,o,2),m("x","z","y",1,-1,t,n,-e,i,o,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(u,3)),this.setAttribute("uv",new Yt(h,2));function m(y,x,p,M,E,v,D,A,C,I,S){let w=v/C,L=D/I,z=v/2,B=D/2,W=A/2,Q=C+1,Y=I+1,et=0,$=0,ct=new P;for(let gt=0;gt<Y;gt++){let Rt=gt*L-B;for(let Gt=0;Gt<Q;Gt++){let te=Gt*w-z;ct[y]=te*M,ct[x]=Rt*E,ct[p]=W,c.push(ct.x,ct.y,ct.z),ct[y]=0,ct[x]=0,ct[p]=A>0?1:-1,u.push(ct.x,ct.y,ct.z),h.push(Gt/C),h.push(1-gt/I),et+=1}}for(let gt=0;gt<I;gt++)for(let Rt=0;Rt<C;Rt++){let Gt=d+Rt+Q*gt,te=d+Rt+Q*(gt+1),Z=d+(Rt+1)+Q*(gt+1),_=d+(Rt+1)+Q*gt;l.push(Gt,te,_),l.push(te,Z,_),$+=6}a.addGroup(f,$,S),f+=$,d+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function qi(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function De(s){let t={};for(let e=0;e<s.length;e++){let n=qi(s[e]);for(let i in n)t[i]=n[i]}return t}function Pd(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function kh(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}var Ld={clone:qi,merge:De},Dd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ud=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,un=class extends Rn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dd,this.fragmentShader=Ud,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qi(t.uniforms),this.uniformsGroups=Pd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Ir=class extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Fn=new P,Oc=new at,kc=new at,be=class extends Ir{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ga*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ga*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z)}getViewSize(t,e){return this.getViewBounds(t,Oc,kc),e.subVectors(kc,Oc)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Mr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ii=-90,Pi=1,Ya=class extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new be(Ii,Pi,t,e);i.layers=this.layers,this.add(i);let r=new be(Ii,Pi,t,e);r.layers=this.layers,this.add(r);let o=new be(Ii,Pi,t,e);o.layers=this.layers,this.add(o);let a=new be(Ii,Pi,t,e);a.layers=this.layers,this.add(a);let l=new be(Ii,Pi,t,e);l.layers=this.layers,this.add(l);let c=new be(Ii,Pi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Pr=class extends Fe{constructor(t,e,n,i,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Wi,super(t,e,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},qa=class extends Tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Pr(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ln}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new qt(5,5,5),r=new un({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:Hn});r.uniforms.tEquirect.value=e;let o=new yt(i,r),a=e.minFilter;return e.minFilter===ui&&(e.minFilter=ln),new Ya(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},Go=new P,Nd=new P,Od=new Bt,bn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Go.subVectors(n,e).cross(Nd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Go),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Od.getNormalMatrix(t),i=this.coplanarPoint(Go).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},si=new $n,nr=new P,Es=class{constructor(t=new bn,e=new bn,n=new bn,i=new bn,r=new bn,o=new bn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=wn){let n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],m=i[9],y=i[10],x=i[11],p=i[12],M=i[13],E=i[14],v=i[15];if(n[0].setComponents(l-r,d-c,x-f,v-p).normalize(),n[1].setComponents(l+r,d+c,x+f,v+p).normalize(),n[2].setComponents(l+o,d+u,x+m,v+M).normalize(),n[3].setComponents(l-o,d-u,x-m,v-M).normalize(),n[4].setComponents(l-a,d-h,x-y,v-E).normalize(),e===wn)n[5].setComponents(l+a,d+h,x+y,v+E).normalize();else if(e===Sr)n[5].setComponents(a,h,y,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(t){return si.center.set(0,0,0),si.radius=.7071067811865476,si.applyMatrix4(t.matrixWorld),this.intersectsSphere(si)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(nr.x=i.normal.x>0?t.max.x:t.min.x,nr.y=i.normal.y>0?t.max.y:t.min.y,nr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(nr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function zh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function kd(s){let t=new WeakMap;function e(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(s.bindBuffer(c,a),h.length===0)s.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){let m=h[d],y=h[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,h[d]=y)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){let y=h[f];s.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Re=class s extends ge{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=t/a,d=e/l,f=[],m=[],y=[],x=[];for(let p=0;p<u;p++){let M=p*d-o;for(let E=0;E<c;E++){let v=E*h-r;m.push(v,-M,0),y.push(0,0,1),x.push(E/a),x.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){let E=M+c*p,v=M+c*(p+1),D=M+1+c*(p+1),A=M+1+c*p;f.push(E,v,A),f.push(v,D,A)}this.setIndex(f),this.setAttribute("position",new Yt(m,3)),this.setAttribute("normal",new Yt(y,3)),this.setAttribute("uv",new Yt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},zd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$d=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Yd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Kd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,of=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,af=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,lf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,uf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,df=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ff=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mf="gl_FragColor = linearToOutputTexel( gl_FragColor );",gf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Mf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ef=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Af=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,If=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Pf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Lf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Df=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Uf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Of=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ff=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ip=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,op=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ap=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_p=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,bp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Mp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ep=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ap=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ip=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Dp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Op=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,zp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,$p=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Yp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,em=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,im=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,om=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,am=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,um=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:zd,alphahash_pars_fragment:Fd,alphamap_fragment:Bd,alphamap_pars_fragment:Hd,alphatest_fragment:Vd,alphatest_pars_fragment:Gd,aomap_fragment:Wd,aomap_pars_fragment:$d,batching_pars_vertex:Xd,batching_vertex:Yd,begin_vertex:qd,beginnormal_vertex:Zd,bsdfs:Jd,iridescence_fragment:Kd,bumpmap_pars_fragment:jd,clipping_planes_fragment:Qd,clipping_planes_pars_fragment:tf,clipping_planes_pars_vertex:ef,clipping_planes_vertex:nf,color_fragment:sf,color_pars_fragment:rf,color_pars_vertex:of,color_vertex:af,common:lf,cube_uv_reflection_fragment:cf,defaultnormal_vertex:hf,displacementmap_pars_vertex:uf,displacementmap_vertex:df,emissivemap_fragment:ff,emissivemap_pars_fragment:pf,colorspace_fragment:mf,colorspace_pars_fragment:gf,envmap_fragment:xf,envmap_common_pars_fragment:yf,envmap_pars_fragment:vf,envmap_pars_vertex:_f,envmap_physical_pars_fragment:Pf,envmap_vertex:bf,fog_vertex:Mf,fog_pars_vertex:wf,fog_fragment:Sf,fog_pars_fragment:Ef,gradientmap_pars_fragment:Tf,lightmap_pars_fragment:Af,lights_lambert_fragment:Rf,lights_lambert_pars_fragment:Cf,lights_pars_begin:If,lights_toon_fragment:Lf,lights_toon_pars_fragment:Df,lights_phong_fragment:Uf,lights_phong_pars_fragment:Nf,lights_physical_fragment:Of,lights_physical_pars_fragment:kf,lights_fragment_begin:zf,lights_fragment_maps:Ff,lights_fragment_end:Bf,logdepthbuf_fragment:Hf,logdepthbuf_pars_fragment:Vf,logdepthbuf_pars_vertex:Gf,logdepthbuf_vertex:Wf,map_fragment:$f,map_pars_fragment:Xf,map_particle_fragment:Yf,map_particle_pars_fragment:qf,metalnessmap_fragment:Zf,metalnessmap_pars_fragment:Jf,morphinstance_vertex:Kf,morphcolor_vertex:jf,morphnormal_vertex:Qf,morphtarget_pars_vertex:tp,morphtarget_vertex:ep,normal_fragment_begin:np,normal_fragment_maps:ip,normal_pars_fragment:sp,normal_pars_vertex:rp,normal_vertex:op,normalmap_pars_fragment:ap,clearcoat_normal_fragment_begin:lp,clearcoat_normal_fragment_maps:cp,clearcoat_pars_fragment:hp,iridescence_pars_fragment:up,opaque_fragment:dp,packing:fp,premultiplied_alpha_fragment:pp,project_vertex:mp,dithering_fragment:gp,dithering_pars_fragment:xp,roughnessmap_fragment:yp,roughnessmap_pars_fragment:vp,shadowmap_pars_fragment:_p,shadowmap_pars_vertex:bp,shadowmap_vertex:Mp,shadowmask_pars_fragment:wp,skinbase_vertex:Sp,skinning_pars_vertex:Ep,skinning_vertex:Tp,skinnormal_vertex:Ap,specularmap_fragment:Rp,specularmap_pars_fragment:Cp,tonemapping_fragment:Ip,tonemapping_pars_fragment:Pp,transmission_fragment:Lp,transmission_pars_fragment:Dp,uv_pars_fragment:Up,uv_pars_vertex:Np,uv_vertex:Op,worldpos_vertex:kp,background_vert:zp,background_frag:Fp,backgroundCube_vert:Bp,backgroundCube_frag:Hp,cube_vert:Vp,cube_frag:Gp,depth_vert:Wp,depth_frag:$p,distanceRGBA_vert:Xp,distanceRGBA_frag:Yp,equirect_vert:qp,equirect_frag:Zp,linedashed_vert:Jp,linedashed_frag:Kp,meshbasic_vert:jp,meshbasic_frag:Qp,meshlambert_vert:tm,meshlambert_frag:em,meshmatcap_vert:nm,meshmatcap_frag:im,meshnormal_vert:sm,meshnormal_frag:rm,meshphong_vert:om,meshphong_frag:am,meshphysical_vert:lm,meshphysical_frag:cm,meshtoon_vert:hm,meshtoon_frag:um,points_vert:dm,points_frag:fm,shadow_vert:pm,shadow_frag:mm,sprite_vert:gm,sprite_frag:xm},lt={common:{diffuse:{value:new At(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new At(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new At(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new At(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},on={basic:{uniforms:De([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:De([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new At(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:De([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new At(0)},specular:{value:new At(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:De([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new At(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:De([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new At(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:De([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:De([lt.points,lt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:De([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:De([lt.common,lt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:De([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:De([lt.sprite,lt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:De([lt.common,lt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:De([lt.lights,lt.fog,{color:{value:new At(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};on.physical={uniforms:De([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new At(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new At(0)},specularColor:{value:new At(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var ir={r:0,b:0,g:0},ri=new Ze,ym=new ne;function vm(s,t,e,n,i,r,o){let a=new At(0),l=r===!0?0:1,c,u,h=null,d=0,f=null;function m(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?e:t).get(E)),E}function y(M){let E=!1,v=m(M);v===null?p(a,l):v&&v.isColor&&(p(v,1),E=!0);let D=s.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(M,E){let v=m(E);v&&(v.isCubeTexture||v.mapping===Jr)?(u===void 0&&(u=new yt(new qt(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:qi(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ri.copy(E.backgroundRotation),ri.x*=-1,ri.y*=-1,ri.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ym.makeRotationFromEuler(ri)),u.material.toneMapped=Qt.getTransfer(v.colorSpace)!==oe,(h!==v||d!==v.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=s.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new yt(new Re(2,2),new un({name:"BackgroundMaterial",uniforms:qi(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(v.colorSpace)!==oe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,f=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,E){M.getRGB(ir,kh(s)),n.buffers.color.setClear(ir.r,ir.g,ir.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),l=E,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:y,addToRenderList:x}}function _m(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(w,L,z,B,W){let Q=!1,Y=h(B,z,L);r!==Y&&(r=Y,c(r.object)),Q=f(w,B,z,W),Q&&m(w,B,z,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,v(w,L,z,B),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return s.createVertexArray()}function c(w){return s.bindVertexArray(w)}function u(w){return s.deleteVertexArray(w)}function h(w,L,z){let B=z.wireframe===!0,W=n[w.id];W===void 0&&(W={},n[w.id]=W);let Q=W[L.id];Q===void 0&&(Q={},W[L.id]=Q);let Y=Q[B];return Y===void 0&&(Y=d(l()),Q[B]=Y),Y}function d(w){let L=[],z=[],B=[];for(let W=0;W<e;W++)L[W]=0,z[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:B,object:w,attributes:{},index:null}}function f(w,L,z,B){let W=r.attributes,Q=L.attributes,Y=0,et=z.getAttributes();for(let $ in et)if(et[$].location>=0){let gt=W[$],Rt=Q[$];if(Rt===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(Rt=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(Rt=w.instanceColor)),gt===void 0||gt.attribute!==Rt||Rt&&gt.data!==Rt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==B}function m(w,L,z,B){let W={},Q=L.attributes,Y=0,et=z.getAttributes();for(let $ in et)if(et[$].location>=0){let gt=Q[$];gt===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(gt=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(gt=w.instanceColor));let Rt={};Rt.attribute=gt,gt&&gt.data&&(Rt.data=gt.data),W[$]=Rt,Y++}r.attributes=W,r.attributesNum=Y,r.index=B}function y(){let w=r.newAttributes;for(let L=0,z=w.length;L<z;L++)w[L]=0}function x(w){p(w,0)}function p(w,L){let z=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;z[w]=1,B[w]===0&&(s.enableVertexAttribArray(w),B[w]=1),W[w]!==L&&(s.vertexAttribDivisor(w,L),W[w]=L)}function M(){let w=r.newAttributes,L=r.enabledAttributes;for(let z=0,B=L.length;z<B;z++)L[z]!==w[z]&&(s.disableVertexAttribArray(z),L[z]=0)}function E(w,L,z,B,W,Q,Y){Y===!0?s.vertexAttribIPointer(w,L,z,W,Q):s.vertexAttribPointer(w,L,z,B,W,Q)}function v(w,L,z,B){y();let W=B.attributes,Q=z.getAttributes(),Y=L.defaultAttributeValues;for(let et in Q){let $=Q[et];if($.location>=0){let ct=W[et];if(ct===void 0&&(et==="instanceMatrix"&&w.instanceMatrix&&(ct=w.instanceMatrix),et==="instanceColor"&&w.instanceColor&&(ct=w.instanceColor)),ct!==void 0){let gt=ct.normalized,Rt=ct.itemSize,Gt=t.get(ct);if(Gt===void 0)continue;let te=Gt.buffer,Z=Gt.type,_=Gt.bytesPerElement,G=Z===s.INT||Z===s.UNSIGNED_INT||ct.gpuType===Pl;if(ct.isInterleavedBufferAttribute){let q=ct.data,rt=q.stride,ot=ct.offset;if(q.isInstancedInterleavedBuffer){for(let Ct=0;Ct<$.locationSize;Ct++)p($.location+Ct,q.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Ct=0;Ct<$.locationSize;Ct++)x($.location+Ct);s.bindBuffer(s.ARRAY_BUFFER,te);for(let Ct=0;Ct<$.locationSize;Ct++)E($.location+Ct,Rt/$.locationSize,Z,gt,rt*_,(ot+Rt/$.locationSize*Ct)*_,G)}else{if(ct.isInstancedBufferAttribute){for(let q=0;q<$.locationSize;q++)p($.location+q,ct.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let q=0;q<$.locationSize;q++)x($.location+q);s.bindBuffer(s.ARRAY_BUFFER,te);for(let q=0;q<$.locationSize;q++)E($.location+q,Rt/$.locationSize,Z,gt,Rt*_,Rt/$.locationSize*q*_,G)}}else if(Y!==void 0){let gt=Y[et];if(gt!==void 0)switch(gt.length){case 2:s.vertexAttrib2fv($.location,gt);break;case 3:s.vertexAttrib3fv($.location,gt);break;case 4:s.vertexAttrib4fv($.location,gt);break;default:s.vertexAttrib1fv($.location,gt)}}}}M()}function D(){I();for(let w in n){let L=n[w];for(let z in L){let B=L[z];for(let W in B)u(B[W].object),delete B[W];delete L[z]}delete n[w]}}function A(w){if(n[w.id]===void 0)return;let L=n[w.id];for(let z in L){let B=L[z];for(let W in B)u(B[W].object),delete B[W];delete L[z]}delete n[w.id]}function C(w){for(let L in n){let z=n[L];if(z[w.id]===void 0)continue;let B=z[w.id];for(let W in B)u(B[W].object),delete B[W];delete z[w.id]}}function I(){S(),o=!0,r!==i&&(r=i,c(r.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:x,disableUnusedAttributes:M}}function bm(s,t,e){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,h){h!==0&&(s.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let m=0;m<h;m++)f+=u[m];e.update(f,n,1)}function l(c,u,h,d){if(h===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],u[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let m=0;for(let y=0;y<h;y++)m+=u[y]*d[y];e.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Mm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==nn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let I=C===Us&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==En&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==cn&&!I)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),D=m>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:D,maxSamples:A}}function wm(s){let t=this,e=null,n=0,i=!1,r=!1,o=new bn,a=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){let m=h.clippingPlanes,y=h.clipIntersection,x=h.clipShadows,p=s.get(h);if(!i||m===null||m.length===0||r&&!x)r?u(null):c();else{let M=r?0:n,E=M*4,v=p.clippingState||null;l.value=v,v=u(m,d,E,f);for(let D=0;D!==E;++D)v[D]=e[D];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,m){let y=h!==null?h.length:0,x=null;if(y!==0){if(x=l.value,m!==!0||x===null){let p=f+y*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(x===null||x.length<p)&&(x=new Float32Array(p));for(let E=0,v=f;E!==y;++E,v+=4)o.copy(h[E]).applyMatrix4(M,a),o.normal.toArray(x,v),x[v+3]=o.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,x}}function Sm(s){let t=new WeakMap;function e(o,a){return a===da?o.mapping=Wi:a===fa&&(o.mapping=$i),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===da||a===fa)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new qa(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Lr=class extends Ir{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},zi=4,zc=[.125,.215,.35,.446,.526,.582],ci=20,Wo=new Lr,Fc=new At,$o=null,Xo=0,Yo=0,qo=!1,ai=(1+Math.sqrt(5))/2,Li=1/ai,Bc=[new P(-ai,Li,0),new P(ai,Li,0),new P(-Li,0,ai),new P(Li,0,ai),new P(0,ai,-Li),new P(0,ai,Li),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Dr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){$o=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($o,Xo,Yo),this._renderer.xr.enabled=qo,t.scissorTest=!1,sr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wi||t.mapping===$i?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$o=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Us,format:nn,colorSpace:ji,depthBuffer:!1},i=Hc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Em(r)),this._blurMaterial=Tm(r,t,e)}return i}_compileMaterial(t){let e=new yt(this._lodPlanes[0],t);this._renderer.compile(e,Wo)}_sceneToCubeUV(t,e,n,i){let a=new be(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Fc),u.toneMapping=Vn,u.autoClear=!1;let f=new _e({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),m=new yt(new qt,f),y=!1,x=t.background;x?x.isColor&&(f.color.copy(x),t.background=null,y=!0):(f.color.copy(Fc),y=!0);for(let p=0;p<6;p++){let M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let E=this._cubeSize;sr(i,M*E,p>2?E:0,E,E),u.setRenderTarget(i),y&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=x}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Wi||t.mapping===$i;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vc());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new yt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;sr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Wo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Bc[(i-r-1)%Bc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new yt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ci-1),y=r/m,x=isFinite(r)?1+Math.floor(u*y):ci;x>ci&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${ci}`);let p=[],M=0;for(let C=0;C<ci;++C){let I=C/y,S=Math.exp(-I*I/2);p.push(S),C===0?M+=S:C<x&&(M+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;d.envMap.value=t.texture,d.samples.value=x,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:E}=this;d.dTheta.value=m,d.mipInt.value=E-n;let v=this._sizeLods[i],D=3*v*(i>E-zi?i-E+zi:0),A=4*(this._cubeSize-v);sr(e,D,A,3*v,2*v),l.setRenderTarget(e),l.render(h,Wo)}};function Em(s){let t=[],e=[],n=[],i=s,r=s-zi+1+zc.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>s-zi?l=zc[o-s+zi-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,m=6,y=3,x=2,p=1,M=new Float32Array(y*m*f),E=new Float32Array(x*m*f),v=new Float32Array(p*m*f);for(let A=0;A<f;A++){let C=A%3*2/3-1,I=A>2?0:-1,S=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];M.set(S,y*m*A),E.set(d,x*m*A);let w=[A,A,A,A,A,A];v.set(w,p*m*A)}let D=new ge;D.setAttribute("position",new Me(M,y)),D.setAttribute("uv",new Me(E,x)),D.setAttribute("faceIndex",new Me(v,p)),t.push(D),i>zi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Hc(s,t,e){let n=new Tn(s,t,e);return n.texture.mapping=Jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function sr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Tm(s,t,e){let n=new Float32Array(ci),i=new P(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Vc(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Gc(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function zl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Am(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===da||l===fa,u=l===Wi||l===$i;if(c||u){let h=t.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Dr(s)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(e===null&&(e=new Dr(s)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Rm(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&gs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Cm(s,t,e,n){let i={},r=new WeakMap;function o(h){let d=h.target;d.index!==null&&t.remove(d.index);for(let m in d.attributes)t.remove(d.attributes[m]);for(let m in d.morphAttributes){let y=d.morphAttributes[m];for(let x=0,p=y.length;x<p;x++)t.remove(y[x])}d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(h){let d=h.attributes;for(let m in d)t.update(d[m],s.ARRAY_BUFFER);let f=h.morphAttributes;for(let m in f){let y=f[m];for(let x=0,p=y.length;x<p;x++)t.update(y[x],s.ARRAY_BUFFER)}}function c(h){let d=[],f=h.index,m=h.attributes.position,y=0;if(f!==null){let M=f.array;y=f.version;for(let E=0,v=M.length;E<v;E+=3){let D=M[E+0],A=M[E+1],C=M[E+2];d.push(D,A,A,C,C,D)}}else if(m!==void 0){let M=m.array;y=m.version;for(let E=0,v=M.length/3-1;E<v;E+=3){let D=E+0,A=E+1,C=E+2;d.push(D,A,A,C,C,D)}}else return;let x=new(Nh(d)?Cr:Rr)(d,1);x.version=y;let p=r.get(h);p&&t.remove(p),r.set(h,x)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Im(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function u(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let x=0;for(let p=0;p<m;p++)x+=f[p];e.update(x,n,1)}function h(d,f,m,y){if(m===0)return;let x=t.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],y[p]);else{x.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,y,0,m);let p=0;for(let M=0;M<m;M++)p+=f[M]*y[M];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Pm(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Lm(s,t,e){let n=new WeakMap,i=new ye;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let S=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,x=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],E=0;f===!0&&(E=1),m===!0&&(E=2),y===!0&&(E=3);let v=a.attributes.position.count*E,D=1;v>t.maxTextureSize&&(D=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let A=new Float32Array(v*D*4*h),C=new Ar(A,v,D,h);C.type=cn,C.needsUpdate=!0;let I=E*4;for(let w=0;w<h;w++){let L=x[w],z=p[w],B=M[w],W=v*D*4*w;for(let Q=0;Q<L.count;Q++){let Y=Q*I;f===!0&&(i.fromBufferAttribute(L,Q),A[W+Y+0]=i.x,A[W+Y+1]=i.y,A[W+Y+2]=i.z,A[W+Y+3]=0),m===!0&&(i.fromBufferAttribute(z,Q),A[W+Y+4]=i.x,A[W+Y+5]=i.y,A[W+Y+6]=i.z,A[W+Y+7]=0),y===!0&&(i.fromBufferAttribute(B,Q),A[W+Y+8]=i.x,A[W+Y+9]=i.y,A[W+Y+10]=i.z,A[W+Y+11]=B.itemSize===4?i.w:1)}}d={count:h,texture:C,size:new at(v,D)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",m),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Dm(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=t.get(l,u);if(i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Ur=class extends Fe{constructor(t,e,n,i,r,o,a,l,c,u=Bi){if(u!==Bi&&u!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Bi&&(n=di),n===void 0&&u===Yi&&(n=Xi),super(null,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:$e,this.minFilter=l!==void 0?l:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Fh=new Fe,Wc=new Ur(1,1),Bh=new Ar,Hh=new Xa,Vh=new Pr,$c=[],Xc=[],Yc=new Float32Array(16),qc=new Float32Array(9),Zc=new Float32Array(4);function Qi(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=$c[i];if(r===void 0&&(r=new Float32Array(i),$c[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function we(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function jr(s,t){let e=Xc[t];e===void 0&&(e=new Int32Array(t),Xc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Um(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Nm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function Om(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function km(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function zm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(we(e,n))return;Zc.set(n),s.uniformMatrix2fv(this.addr,!1,Zc),Se(e,n)}}function Fm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(we(e,n))return;qc.set(n),s.uniformMatrix3fv(this.addr,!1,qc),Se(e,n)}}function Bm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(we(e,n))return;Yc.set(n),s.uniformMatrix4fv(this.addr,!1,Yc),Se(e,n)}}function Hm(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Vm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function Gm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function Wm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function $m(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Xm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function Ym(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function qm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function Zm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Wc.compareFunction=Uh,r=Wc):r=Fh,e.setTexture2D(t||r,i)}function Jm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Hh,i)}function Km(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Vh,i)}function jm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Bh,i)}function Qm(s){switch(s){case 5126:return Um;case 35664:return Nm;case 35665:return Om;case 35666:return km;case 35674:return zm;case 35675:return Fm;case 35676:return Bm;case 5124:case 35670:return Hm;case 35667:case 35671:return Vm;case 35668:case 35672:return Gm;case 35669:case 35673:return Wm;case 5125:return $m;case 36294:return Xm;case 36295:return Ym;case 36296:return qm;case 35678:case 36198:case 36298:case 36306:case 35682:return Zm;case 35679:case 36299:case 36307:return Jm;case 35680:case 36300:case 36308:case 36293:return Km;case 36289:case 36303:case 36311:case 36292:return jm}}function tg(s,t){s.uniform1fv(this.addr,t)}function eg(s,t){let e=Qi(t,this.size,2);s.uniform2fv(this.addr,e)}function ng(s,t){let e=Qi(t,this.size,3);s.uniform3fv(this.addr,e)}function ig(s,t){let e=Qi(t,this.size,4);s.uniform4fv(this.addr,e)}function sg(s,t){let e=Qi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function rg(s,t){let e=Qi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function og(s,t){let e=Qi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function ag(s,t){s.uniform1iv(this.addr,t)}function lg(s,t){s.uniform2iv(this.addr,t)}function cg(s,t){s.uniform3iv(this.addr,t)}function hg(s,t){s.uniform4iv(this.addr,t)}function ug(s,t){s.uniform1uiv(this.addr,t)}function dg(s,t){s.uniform2uiv(this.addr,t)}function fg(s,t){s.uniform3uiv(this.addr,t)}function pg(s,t){s.uniform4uiv(this.addr,t)}function mg(s,t,e){let n=this.cache,i=t.length,r=jr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Fh,r[o])}function gg(s,t,e){let n=this.cache,i=t.length,r=jr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Hh,r[o])}function xg(s,t,e){let n=this.cache,i=t.length,r=jr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Vh,r[o])}function yg(s,t,e){let n=this.cache,i=t.length,r=jr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Bh,r[o])}function vg(s){switch(s){case 5126:return tg;case 35664:return eg;case 35665:return ng;case 35666:return ig;case 35674:return sg;case 35675:return rg;case 35676:return og;case 5124:case 35670:return ag;case 35667:case 35671:return lg;case 35668:case 35672:return cg;case 35669:case 35673:return hg;case 5125:return ug;case 36294:return dg;case 36295:return fg;case 36296:return pg;case 35678:case 36198:case 36298:case 36306:case 35682:return mg;case 35679:case 36299:case 36307:return gg;case 35680:case 36300:case 36308:case 36293:return xg;case 36289:case 36303:case 36311:case 36292:return yg}}var Za=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Qm(e.type)}},Ja=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=vg(e.type)}},Ka=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},Zo=/(\w+)(\])?(\[|\.)?/g;function Jc(s,t){s.seq.push(t),s.map[t.id]=t}function _g(s,t,e){let n=s.name,i=n.length;for(Zo.lastIndex=0;;){let r=Zo.exec(n),o=Zo.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Jc(e,c===void 0?new Za(a,s,t):new Ja(a,s,t));break}else{let h=e.map[a];h===void 0&&(h=new Ka(a),Jc(e,h)),e=h}}}var Vi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);_g(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Kc(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var bg=37297,Mg=0;function wg(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var jc=new Bt;function Sg(s){Qt._getMatrix(jc,Qt.workingColorSpace,s);let t=`mat3( ${jc.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(s)){case Kr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Qc(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+wg(s.getShaderSource(t),o)}else return i}function Eg(s,t){let e=Sg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Tg(s,t){let e;switch(t){case Ju:e="Linear";break;case Ku:e="Reinhard";break;case ju:e="Cineon";break;case Qu:e="ACESFilmic";break;case ed:e="AgX";break;case nd:e="Neutral";break;case td:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var rr=new P;function Ag(){Qt.getLuminanceCoefficients(rr);let s=rr.x.toFixed(4),t=rr.y.toFixed(4),e=rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xs).join(`
`)}function Cg(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ig(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function xs(s){return s!==""}function th(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function eh(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Pg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ja(s){return s.replace(Pg,Dg)}var Lg=new Map;function Dg(s,t){let e=Vt[t];if(e===void 0){let n=Lg.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ja(e)}var Ug=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nh(s){return s.replace(Ug,Ng)}function Ng(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function ih(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Og(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Mh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Cu?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===_n&&(t="SHADOWMAP_TYPE_VSM"),t}function kg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Wi:case $i:t="ENVMAP_TYPE_CUBE";break;case Jr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function zg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case $i:t="ENVMAP_MODE_REFRACTION";break}return t}function Fg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Il:t="ENVMAP_BLENDING_MULTIPLY";break;case qu:t="ENVMAP_BLENDING_MIX";break;case Zu:t="ENVMAP_BLENDING_ADD";break}return t}function Bg(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Hg(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Og(e),c=kg(e),u=zg(e),h=Fg(e),d=Bg(e),f=Rg(e),m=Cg(r),y=i.createProgram(),x,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(xs).join(`
`),x.length>0&&(x+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(xs).join(`
`),p.length>0&&(p+=`
`)):(x=[ih(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xs).join(`
`),p=[ih(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Vn?Tg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,Eg("linearToOutputTexel",e.outputColorSpace),Ag(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xs).join(`
`)),o=ja(o),o=th(o,e),o=eh(o,e),a=ja(a),a=th(a,e),a=eh(a,e),o=nh(o),a=nh(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,p=["#define varying in",e.glslVersion===xc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let E=M+x+o,v=M+p+a,D=Kc(i,i.VERTEX_SHADER,E),A=Kc(i,i.FRAGMENT_SHADER,v);i.attachShader(y,D),i.attachShader(y,A),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function C(L){if(s.debug.checkShaderErrors){let z=i.getProgramInfoLog(y).trim(),B=i.getShaderInfoLog(D).trim(),W=i.getShaderInfoLog(A).trim(),Q=!0,Y=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,D,A);else{let et=Qc(i,D,"vertex"),$=Qc(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+z+`
`+et+`
`+$)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(B===""||W==="")&&(Y=!1);Y&&(L.diagnostics={runnable:Q,programLog:z,vertexShader:{log:B,prefix:x},fragmentShader:{log:W,prefix:p}})}i.deleteShader(D),i.deleteShader(A),I=new Vi(i,y),S=Ig(i,y)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(y,bg)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Mg++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=D,this.fragmentShader=A,this}var Vg=0,Qa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new tl(t),e.set(t,n)),n}},tl=class{constructor(t){this.id=Vg++,this.code=t,this.usedTimes=0}};function Gg(s,t,e,n,i,r,o){let a=new Ss,l=new Qa,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,w,L,z,B){let W=z.fog,Q=B.geometry,Y=S.isMeshStandardMaterial?z.environment:null,et=(S.isMeshStandardMaterial?e:t).get(S.envMap||Y),$=et&&et.mapping===Jr?et.image.height:null,ct=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));let gt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Rt=gt!==void 0?gt.length:0,Gt=0;Q.morphAttributes.position!==void 0&&(Gt=1),Q.morphAttributes.normal!==void 0&&(Gt=2),Q.morphAttributes.color!==void 0&&(Gt=3);let te,Z,_,G;if(ct){let re=on[ct];te=re.vertexShader,Z=re.fragmentShader}else te=S.vertexShader,Z=S.fragmentShader,l.update(S),_=l.getVertexShaderID(S),G=l.getFragmentShaderID(S);let q=s.getRenderTarget(),rt=s.state.buffers.depth.getReversed(),ot=B.isInstancedMesh===!0,Ct=B.isBatchedMesh===!0,It=!!S.map,Pt=!!S.matcap,Wt=!!et,U=!!S.aoMap,me=!!S.lightMap,$t=!!S.bumpMap,Zt=!!S.normalMap,Dt=!!S.displacementMap,he=!!S.emissiveMap,Lt=!!S.metalnessMap,R=!!S.roughnessMap,b=S.anisotropy>0,F=S.clearcoat>0,K=S.dispersion>0,tt=S.iridescence>0,J=S.sheen>0,Et=S.transmission>0,ut=b&&!!S.anisotropyMap,xt=F&&!!S.clearcoatMap,jt=F&&!!S.clearcoatNormalMap,nt=F&&!!S.clearcoatRoughnessMap,vt=tt&&!!S.iridescenceMap,Ut=tt&&!!S.iridescenceThicknessMap,Nt=J&&!!S.sheenColorMap,_t=J&&!!S.sheenRoughnessMap,Jt=!!S.specularMap,Ht=!!S.specularColorMap,le=!!S.specularIntensityMap,N=Et&&!!S.transmissionMap,ht=Et&&!!S.thicknessMap,X=!!S.gradientMap,j=!!S.alphaMap,pt=S.alphaTest>0,dt=!!S.alphaHash,zt=!!S.extensions,xe=Vn;S.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(xe=s.toneMapping);let Ce={shaderID:ct,shaderType:S.type,shaderName:S.name,vertexShader:te,fragmentShader:Z,defines:S.defines,customVertexShaderID:_,customFragmentShaderID:G,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ct,batchingColor:Ct&&B._colorsTexture!==null,instancing:ot,instancingColor:ot&&B.instanceColor!==null,instancingMorph:ot&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:q===null?s.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:ji,alphaToCoverage:!!S.alphaToCoverage,map:It,matcap:Pt,envMap:Wt,envMapMode:Wt&&et.mapping,envMapCubeUVHeight:$,aoMap:U,lightMap:me,bumpMap:$t,normalMap:Zt,displacementMap:d&&Dt,emissiveMap:he,normalMapObjectSpace:Zt&&S.normalMapType===od,normalMapTangentSpace:Zt&&S.normalMapType===Dh,metalnessMap:Lt,roughnessMap:R,anisotropy:b,anisotropyMap:ut,clearcoat:F,clearcoatMap:xt,clearcoatNormalMap:jt,clearcoatRoughnessMap:nt,dispersion:K,iridescence:tt,iridescenceMap:vt,iridescenceThicknessMap:Ut,sheen:J,sheenColorMap:Nt,sheenRoughnessMap:_t,specularMap:Jt,specularColorMap:Ht,specularIntensityMap:le,transmission:Et,transmissionMap:N,thicknessMap:ht,gradientMap:X,opaque:S.transparent===!1&&S.blending===Fi&&S.alphaToCoverage===!1,alphaMap:j,alphaTest:pt,alphaHash:dt,combine:S.combine,mapUv:It&&y(S.map.channel),aoMapUv:U&&y(S.aoMap.channel),lightMapUv:me&&y(S.lightMap.channel),bumpMapUv:$t&&y(S.bumpMap.channel),normalMapUv:Zt&&y(S.normalMap.channel),displacementMapUv:Dt&&y(S.displacementMap.channel),emissiveMapUv:he&&y(S.emissiveMap.channel),metalnessMapUv:Lt&&y(S.metalnessMap.channel),roughnessMapUv:R&&y(S.roughnessMap.channel),anisotropyMapUv:ut&&y(S.anisotropyMap.channel),clearcoatMapUv:xt&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:jt&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:_t&&y(S.sheenRoughnessMap.channel),specularMapUv:Jt&&y(S.specularMap.channel),specularColorMapUv:Ht&&y(S.specularColorMap.channel),specularIntensityMapUv:le&&y(S.specularIntensityMap.channel),transmissionMapUv:N&&y(S.transmissionMap.channel),thicknessMapUv:ht&&y(S.thicknessMap.channel),alphaMapUv:j&&y(S.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Zt||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Q.attributes.uv&&(It||j),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:rt,skinning:B.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Gt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:xe,decodeVideoTexture:It&&S.map.isVideoTexture===!0&&Qt.getTransfer(S.map.colorSpace)===oe,decodeVideoTextureEmissive:he&&S.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(S.emissiveMap.colorSpace)===oe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===We,flipSided:S.side===ze,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:zt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&S.extensions.multiDraw===!0||Ct)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function p(S){let w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(let L in S.defines)w.push(L),w.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(M(w,S),E(w,S),w.push(s.outputColorSpace)),w.push(S.customProgramCacheKey),w.join()}function M(S,w){S.push(w.precision),S.push(w.outputColorSpace),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.anisotropyMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.numLightProbes),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function E(S,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){let w=m[S.type],L;if(w){let z=on[w];L=Ld.clone(z.uniforms)}else L=S.uniforms;return L}function D(S,w){let L;for(let z=0,B=u.length;z<B;z++){let W=u[z];if(W.cacheKey===w){L=W,++L.usedTimes;break}}return L===void 0&&(L=new Hg(s,w,S,r),u.push(L)),L}function A(S){if(--S.usedTimes===0){let w=u.indexOf(S);u[w]=u[u.length-1],u.pop(),S.destroy()}}function C(S){l.remove(S)}function I(){l.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:v,acquireProgram:D,releaseProgram:A,releaseShaderCache:C,programs:u,dispose:I}}function Wg(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function $g(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function sh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function rh(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(h,d,f,m,y,x){let p=s[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:m,renderOrder:h.renderOrder,z:y,group:x},s[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=h.renderOrder,p.z=y,p.group=x),t++,p}function a(h,d,f,m,y,x){let p=o(h,d,f,m,y,x);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(h,d,f,m,y,x){let p=o(h,d,f,m,y,x);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(h,d){e.length>1&&e.sort(h||$g),n.length>1&&n.sort(d||sh),i.length>1&&i.sort(d||sh)}function u(){for(let h=t,d=s.length;h<d;h++){let f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function Xg(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new rh,s.set(n,[o])):i>=r.length?(o=new rh,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Yg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new At};break;case"SpotLight":e={position:new P,direction:new P,color:new At,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new At,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new At,groundColor:new At};break;case"RectAreaLight":e={color:new At,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function qg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Zg=0;function Jg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Kg(s){let t=new Yg,e=qg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let i=new P,r=new ne,o=new ne;function a(c){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,y=0,x=0,p=0,M=0,E=0,v=0,D=0,A=0,C=0;c.sort(Jg);for(let S=0,w=c.length;S<w;S++){let L=c[S],z=L.color,B=L.intensity,W=L.distance,Q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=z.r*B,h+=z.g*B,d+=z.b*B;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],B);C++}else if(L.isDirectionalLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let et=L.shadow,$=e.get(L);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=L.shadow.matrix,M++}n.directional[f]=Y,f++}else if(L.isSpotLight){let Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(z).multiplyScalar(B),Y.distance=W,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[y]=Y;let et=L.shadow;if(L.map&&(n.spotLightMap[D]=L.map,D++,et.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[y]=et.matrix,L.castShadow){let $=e.get(L);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,n.spotShadow[y]=$,n.spotShadowMap[y]=Q,v++}y++}else if(L.isRectAreaLight){let Y=t.get(L);Y.color.copy(z).multiplyScalar(B),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[x]=Y,x++}else if(L.isPointLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){let et=L.shadow,$=e.get(L);$.shadowIntensity=et.intensity,$.shadowBias=et.bias,$.shadowNormalBias=et.normalBias,$.shadowRadius=et.radius,$.shadowMapSize=et.mapSize,$.shadowCameraNear=et.camera.near,$.shadowCameraFar=et.camera.far,n.pointShadow[m]=$,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=L.shadow.matrix,E++}n.point[m]=Y,m++}else if(L.isHemisphereLight){let Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(B),Y.groundColor.copy(L.groundColor).multiplyScalar(B),n.hemi[p]=Y,p++}}x>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=lt.LTC_FLOAT_1,n.rectAreaLTC2=lt.LTC_FLOAT_2):(n.rectAreaLTC1=lt.LTC_HALF_1,n.rectAreaLTC2=lt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let I=n.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==y||I.rectAreaLength!==x||I.hemiLength!==p||I.numDirectionalShadows!==M||I.numPointShadows!==E||I.numSpotShadows!==v||I.numSpotMaps!==D||I.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=x,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+D-A,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,I.directionalLength=f,I.pointLength=m,I.spotLength=y,I.rectAreaLength=x,I.hemiLength=p,I.numDirectionalShadows=M,I.numPointShadows=E,I.numSpotShadows=v,I.numSpotMaps=D,I.numLightProbes=C,n.version=Zg++)}function l(c,u){let h=0,d=0,f=0,m=0,y=0,x=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){let E=c[p];if(E.isDirectionalLight){let v=n.directional[h];v.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(x),h++}else if(E.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(x),v.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(x),f++}else if(E.isRectAreaLight){let v=n.rectArea[m];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(x),o.identity(),r.copy(E.matrixWorld),r.premultiply(x),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(E.isPointLight){let v=n.point[d];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(x),d++}else if(E.isHemisphereLight){let v=n.hemi[y];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(x),y++}}}return{setup:a,setupView:l,state:n}}function oh(s){let t=new Kg(s),e=[],n=[];function i(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function jg(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new oh(s),t.set(i,[a])):r>=o.length?(a=new oh(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var el=class extends Rn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=sd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},nl=class extends Rn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Qg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function e0(s,t,e){let n=new Es,i=new at,r=new at,o=new ye,a=new el({depthPacking:rd}),l=new nl,c={},u=e.maxTextureSize,h={[hn]:ze,[ze]:hn,[We]:We},d=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:Qg,fragmentShader:t0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new ge;m.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new yt(m,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mh;let p=this.type;this.render=function(A,C,I){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||A.length===0)return;let S=s.getRenderTarget(),w=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),z=s.state;z.setBlending(Hn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let B=p!==_n&&this.type===_n,W=p===_n&&this.type!==_n;for(let Q=0,Y=A.length;Q<Y;Q++){let et=A[Q],$=et.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);let ct=$.getFrameExtents();if(i.multiply(ct),r.copy($.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ct.x),i.x=r.x*ct.x,$.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ct.y),i.y=r.y*ct.y,$.mapSize.y=r.y)),$.map===null||B===!0||W===!0){let Rt=this.type!==_n?{minFilter:$e,magFilter:$e}:{};$.map!==null&&$.map.dispose(),$.map=new Tn(i.x,i.y,Rt),$.map.texture.name=et.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();let gt=$.getViewportCount();for(let Rt=0;Rt<gt;Rt++){let Gt=$.getViewport(Rt);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),z.viewport(o),$.updateMatrices(et,Rt),n=$.getFrustum(),v(C,I,$.camera,et,this.type)}$.isPointLightShadow!==!0&&this.type===_n&&M($,I),$.needsUpdate=!1}p=this.type,x.needsUpdate=!1,s.setRenderTarget(S,w,L)};function M(A,C){let I=t.update(y);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Tn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,I,d,y,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,I,f,y,null)}function E(A,C,I,S){let w=null,L=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)w=L;else if(w=I.isPointLight===!0?l:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let z=w.uuid,B=C.uuid,W=c[z];W===void 0&&(W={},c[z]=W);let Q=W[B];Q===void 0&&(Q=w.clone(),W[B]=Q,C.addEventListener("dispose",D)),w=Q}if(w.visible=C.visible,w.wireframe=C.wireframe,S===_n?w.side=C.shadowSide!==null?C.shadowSide:C.side:w.side=C.shadowSide!==null?C.shadowSide:h[C.side],w.alphaMap=C.alphaMap,w.alphaTest=C.alphaTest,w.map=C.map,w.clipShadows=C.clipShadows,w.clippingPlanes=C.clippingPlanes,w.clipIntersection=C.clipIntersection,w.displacementMap=C.displacementMap,w.displacementScale=C.displacementScale,w.displacementBias=C.displacementBias,w.wireframeLinewidth=C.wireframeLinewidth,w.linewidth=C.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let z=s.properties.get(w);z.light=I}return w}function v(A,C,I,S,w){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===_n)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);let B=t.update(A),W=A.material;if(Array.isArray(W)){let Q=B.groups;for(let Y=0,et=Q.length;Y<et;Y++){let $=Q[Y],ct=W[$.materialIndex];if(ct&&ct.visible){let gt=E(A,ct,S,w);A.onBeforeShadow(s,A,C,I,B,gt,$),s.renderBufferDirect(I,null,B,gt,A,$),A.onAfterShadow(s,A,C,I,B,gt,$)}}}else if(W.visible){let Q=E(A,W,S,w);A.onBeforeShadow(s,A,C,I,B,Q,null),s.renderBufferDirect(I,null,B,Q,A,null),A.onAfterShadow(s,A,C,I,B,Q,null)}}let z=A.children;for(let B=0,W=z.length;B<W;B++)v(z[B],C,I,S,w)}function D(A){A.target.removeEventListener("dispose",D);for(let I in c){let S=c[I],w=A.target.uuid;w in S&&(S[w].dispose(),delete S[w])}}}var n0={[ra]:oa,[aa]:ha,[la]:ua,[Gi]:ca,[oa]:ra,[ha]:aa,[ua]:la,[ca]:Gi};function i0(s,t){function e(){let N=!1,ht=new ye,X=null,j=new ye(0,0,0,0);return{setMask:function(pt){X!==pt&&!N&&(s.colorMask(pt,pt,pt,pt),X=pt)},setLocked:function(pt){N=pt},setClear:function(pt,dt,zt,xe,Ce){Ce===!0&&(pt*=xe,dt*=xe,zt*=xe),ht.set(pt,dt,zt,xe),j.equals(ht)===!1&&(s.clearColor(pt,dt,zt,xe),j.copy(ht))},reset:function(){N=!1,X=null,j.set(-1,0,0,0)}}}function n(){let N=!1,ht=!1,X=null,j=null,pt=null;return{setReversed:function(dt){if(ht!==dt){let zt=t.get("EXT_clip_control");ht?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);let xe=pt;pt=null,this.setClear(xe)}ht=dt},getReversed:function(){return ht},setTest:function(dt){dt?q(s.DEPTH_TEST):rt(s.DEPTH_TEST)},setMask:function(dt){X!==dt&&!N&&(s.depthMask(dt),X=dt)},setFunc:function(dt){if(ht&&(dt=n0[dt]),j!==dt){switch(dt){case ra:s.depthFunc(s.NEVER);break;case oa:s.depthFunc(s.ALWAYS);break;case aa:s.depthFunc(s.LESS);break;case Gi:s.depthFunc(s.LEQUAL);break;case la:s.depthFunc(s.EQUAL);break;case ca:s.depthFunc(s.GEQUAL);break;case ha:s.depthFunc(s.GREATER);break;case ua:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=dt}},setLocked:function(dt){N=dt},setClear:function(dt){pt!==dt&&(ht&&(dt=1-dt),s.clearDepth(dt),pt=dt)},reset:function(){N=!1,X=null,j=null,pt=null,ht=!1}}}function i(){let N=!1,ht=null,X=null,j=null,pt=null,dt=null,zt=null,xe=null,Ce=null;return{setTest:function(re){N||(re?q(s.STENCIL_TEST):rt(s.STENCIL_TEST))},setMask:function(re){ht!==re&&!N&&(s.stencilMask(re),ht=re)},setFunc:function(re,Ke,fn){(X!==re||j!==Ke||pt!==fn)&&(s.stencilFunc(re,Ke,fn),X=re,j=Ke,pt=fn)},setOp:function(re,Ke,fn){(dt!==re||zt!==Ke||xe!==fn)&&(s.stencilOp(re,Ke,fn),dt=re,zt=Ke,xe=fn)},setLocked:function(re){N=re},setClear:function(re){Ce!==re&&(s.clearStencil(re),Ce=re)},reset:function(){N=!1,ht=null,X=null,j=null,pt=null,dt=null,zt=null,xe=null,Ce=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],m=null,y=!1,x=null,p=null,M=null,E=null,v=null,D=null,A=null,C=new At(0,0,0),I=0,S=!1,w=null,L=null,z=null,B=null,W=null,Q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,et=0,$=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec($)[1]),Y=et>=1):$.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Y=et>=2);let ct=null,gt={},Rt=s.getParameter(s.SCISSOR_BOX),Gt=s.getParameter(s.VIEWPORT),te=new ye().fromArray(Rt),Z=new ye().fromArray(Gt);function _(N,ht,X,j){let pt=new Uint8Array(4),dt=s.createTexture();s.bindTexture(N,dt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let zt=0;zt<X;zt++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(ht,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(ht+zt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return dt}let G={};G[s.TEXTURE_2D]=_(s.TEXTURE_2D,s.TEXTURE_2D,1),G[s.TEXTURE_CUBE_MAP]=_(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[s.TEXTURE_2D_ARRAY]=_(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),G[s.TEXTURE_3D]=_(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),q(s.DEPTH_TEST),o.setFunc(Gi),$t(!1),Zt(cc),q(s.CULL_FACE),U(Hn);function q(N){u[N]!==!0&&(s.enable(N),u[N]=!0)}function rt(N){u[N]!==!1&&(s.disable(N),u[N]=!1)}function ot(N,ht){return h[N]!==ht?(s.bindFramebuffer(N,ht),h[N]=ht,N===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ht),N===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ht),!0):!1}function Ct(N,ht){let X=f,j=!1;if(N){X=d.get(ht),X===void 0&&(X=[],d.set(ht,X));let pt=N.textures;if(X.length!==pt.length||X[0]!==s.COLOR_ATTACHMENT0){for(let dt=0,zt=pt.length;dt<zt;dt++)X[dt]=s.COLOR_ATTACHMENT0+dt;X.length=pt.length,j=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,j=!0);j&&s.drawBuffers(X)}function It(N){return m!==N?(s.useProgram(N),m=N,!0):!1}let Pt={[li]:s.FUNC_ADD,[Pu]:s.FUNC_SUBTRACT,[Lu]:s.FUNC_REVERSE_SUBTRACT};Pt[Du]=s.MIN,Pt[Uu]=s.MAX;let Wt={[Nu]:s.ZERO,[Ou]:s.ONE,[ku]:s.SRC_COLOR,[ia]:s.SRC_ALPHA,[Gu]:s.SRC_ALPHA_SATURATE,[Hu]:s.DST_COLOR,[Fu]:s.DST_ALPHA,[zu]:s.ONE_MINUS_SRC_COLOR,[sa]:s.ONE_MINUS_SRC_ALPHA,[Vu]:s.ONE_MINUS_DST_COLOR,[Bu]:s.ONE_MINUS_DST_ALPHA,[Wu]:s.CONSTANT_COLOR,[$u]:s.ONE_MINUS_CONSTANT_COLOR,[Xu]:s.CONSTANT_ALPHA,[Yu]:s.ONE_MINUS_CONSTANT_ALPHA};function U(N,ht,X,j,pt,dt,zt,xe,Ce,re){if(N===Hn){y===!0&&(rt(s.BLEND),y=!1);return}if(y===!1&&(q(s.BLEND),y=!0),N!==Iu){if(N!==x||re!==S){if((p!==li||v!==li)&&(s.blendEquation(s.FUNC_ADD),p=li,v=li),re)switch(N){case Fi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case hc:s.blendFunc(s.ONE,s.ONE);break;case uc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case dc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Fi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case hc:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case uc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case dc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}M=null,E=null,D=null,A=null,C.set(0,0,0),I=0,x=N,S=re}return}pt=pt||ht,dt=dt||X,zt=zt||j,(ht!==p||pt!==v)&&(s.blendEquationSeparate(Pt[ht],Pt[pt]),p=ht,v=pt),(X!==M||j!==E||dt!==D||zt!==A)&&(s.blendFuncSeparate(Wt[X],Wt[j],Wt[dt],Wt[zt]),M=X,E=j,D=dt,A=zt),(xe.equals(C)===!1||Ce!==I)&&(s.blendColor(xe.r,xe.g,xe.b,Ce),C.copy(xe),I=Ce),x=N,S=!1}function me(N,ht){N.side===We?rt(s.CULL_FACE):q(s.CULL_FACE);let X=N.side===ze;ht&&(X=!X),$t(X),N.blending===Fi&&N.transparent===!1?U(Hn):U(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let j=N.stencilWrite;a.setTest(j),j&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),he(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?q(s.SAMPLE_ALPHA_TO_COVERAGE):rt(s.SAMPLE_ALPHA_TO_COVERAGE)}function $t(N){w!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),w=N)}function Zt(N){N!==Au?(q(s.CULL_FACE),N!==L&&(N===cc?s.cullFace(s.BACK):N===Ru?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):rt(s.CULL_FACE),L=N}function Dt(N){N!==z&&(Y&&s.lineWidth(N),z=N)}function he(N,ht,X){N?(q(s.POLYGON_OFFSET_FILL),(B!==ht||W!==X)&&(s.polygonOffset(ht,X),B=ht,W=X)):rt(s.POLYGON_OFFSET_FILL)}function Lt(N){N?q(s.SCISSOR_TEST):rt(s.SCISSOR_TEST)}function R(N){N===void 0&&(N=s.TEXTURE0+Q-1),ct!==N&&(s.activeTexture(N),ct=N)}function b(N,ht,X){X===void 0&&(ct===null?X=s.TEXTURE0+Q-1:X=ct);let j=gt[X];j===void 0&&(j={type:void 0,texture:void 0},gt[X]=j),(j.type!==N||j.texture!==ht)&&(ct!==X&&(s.activeTexture(X),ct=X),s.bindTexture(N,ht||G[N]),j.type=N,j.texture=ht)}function F(){let N=gt[ct];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{s.texSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function jt(){try{s.texStorage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{s.texStorage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{s.texImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ut(){try{s.texImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(N){te.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),te.copy(N))}function _t(N){Z.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function Jt(N,ht){let X=c.get(ht);X===void 0&&(X=new WeakMap,c.set(ht,X));let j=X.get(N);j===void 0&&(j=s.getUniformBlockIndex(ht,N.name),X.set(N,j))}function Ht(N,ht){let j=c.get(ht).get(N);l.get(ht)!==j&&(s.uniformBlockBinding(ht,j,N.__bindingPointIndex),l.set(ht,j))}function le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ct=null,gt={},h={},d=new WeakMap,f=[],m=null,y=!1,x=null,p=null,M=null,E=null,v=null,D=null,A=null,C=new At(0,0,0),I=0,S=!1,w=null,L=null,z=null,B=null,W=null,te.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:q,disable:rt,bindFramebuffer:ot,drawBuffers:Ct,useProgram:It,setBlending:U,setMaterial:me,setFlipSided:$t,setCullFace:Zt,setLineWidth:Dt,setPolygonOffset:he,setScissorTest:Lt,activeTexture:R,bindTexture:b,unbindTexture:F,compressedTexImage2D:K,compressedTexImage3D:tt,texImage2D:vt,texImage3D:Ut,updateUBOMapping:Jt,uniformBlockBinding:Ht,texStorage2D:jt,texStorage3D:nt,texSubImage2D:J,texSubImage3D:Et,compressedTexSubImage2D:ut,compressedTexSubImage3D:xt,scissor:Nt,viewport:_t,reset:le}}function ah(s,t,e,n){let i=s0(n);switch(e){case Ah:return s*t;case Ch:return s*t;case Ih:return s*t*2;case Ul:return s*t/i.components*i.byteLength;case Nl:return s*t/i.components*i.byteLength;case Ph:return s*t*2/i.components*i.byteLength;case Ol:return s*t*2/i.components*i.byteLength;case Rh:return s*t*3/i.components*i.byteLength;case nn:return s*t*4/i.components*i.byteLength;case kl:return s*t*4/i.components*i.byteLength;case xr:case yr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case vr:case _r:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ga:case ya:return Math.max(s,16)*Math.max(t,8)/4;case ma:case xa:return Math.max(s,8)*Math.max(t,8)/2;case va:case _a:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ba:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case wa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ia:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case La:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Da:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ua:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Na:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case br:case Oa:case ka:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Lh:case za:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Fa:case Ba:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function s0(s){switch(s){case En:case Sh:return{byteLength:1,components:1};case Ms:case Eh:case Us:return{byteLength:2,components:1};case Ll:case Dl:return{byteLength:2,components:4};case di:case Pl:case cn:return{byteLength:4,components:1};case Th:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function r0(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new at,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,b){return f?new OffscreenCanvas(R,b):Er("canvas")}function y(R,b,F){let K=1,tt=Lt(R);if((tt.width>F||tt.height>F)&&(K=F/Math.max(tt.width,tt.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let J=Math.floor(K*tt.width),Et=Math.floor(K*tt.height);h===void 0&&(h=m(J,Et));let ut=b?m(J,Et):h;return ut.width=J,ut.height=Et,ut.getContext("2d").drawImage(R,0,0,J,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+J+"x"+Et+")."),ut}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),R;return R}function x(R){return R.generateMipmaps}function p(R){s.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function E(R,b,F,K,tt=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let J=b;if(b===s.RED&&(F===s.FLOAT&&(J=s.R32F),F===s.HALF_FLOAT&&(J=s.R16F),F===s.UNSIGNED_BYTE&&(J=s.R8)),b===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(J=s.R8UI),F===s.UNSIGNED_SHORT&&(J=s.R16UI),F===s.UNSIGNED_INT&&(J=s.R32UI),F===s.BYTE&&(J=s.R8I),F===s.SHORT&&(J=s.R16I),F===s.INT&&(J=s.R32I)),b===s.RG&&(F===s.FLOAT&&(J=s.RG32F),F===s.HALF_FLOAT&&(J=s.RG16F),F===s.UNSIGNED_BYTE&&(J=s.RG8)),b===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(J=s.RG8UI),F===s.UNSIGNED_SHORT&&(J=s.RG16UI),F===s.UNSIGNED_INT&&(J=s.RG32UI),F===s.BYTE&&(J=s.RG8I),F===s.SHORT&&(J=s.RG16I),F===s.INT&&(J=s.RG32I)),b===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(J=s.RGB8UI),F===s.UNSIGNED_SHORT&&(J=s.RGB16UI),F===s.UNSIGNED_INT&&(J=s.RGB32UI),F===s.BYTE&&(J=s.RGB8I),F===s.SHORT&&(J=s.RGB16I),F===s.INT&&(J=s.RGB32I)),b===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),F===s.UNSIGNED_INT&&(J=s.RGBA32UI),F===s.BYTE&&(J=s.RGBA8I),F===s.SHORT&&(J=s.RGBA16I),F===s.INT&&(J=s.RGBA32I)),b===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),b===s.RGBA){let Et=tt?Kr:Qt.getTransfer(K);F===s.FLOAT&&(J=s.RGBA32F),F===s.HALF_FLOAT&&(J=s.RGBA16F),F===s.UNSIGNED_BYTE&&(J=Et===oe?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function v(R,b){let F;return R?b===null||b===di||b===Xi?F=s.DEPTH24_STENCIL8:b===cn?F=s.DEPTH32F_STENCIL8:b===Ms&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===di||b===Xi?F=s.DEPTH_COMPONENT24:b===cn?F=s.DEPTH_COMPONENT32F:b===Ms&&(F=s.DEPTH_COMPONENT16),F}function D(R,b){return x(R)===!0||R.isFramebufferTexture&&R.minFilter!==$e&&R.minFilter!==ln?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function A(R){let b=R.target;b.removeEventListener("dispose",A),I(b),b.isVideoTexture&&u.delete(b)}function C(R){let b=R.target;b.removeEventListener("dispose",C),w(b)}function I(R){let b=n.get(R);if(b.__webglInit===void 0)return;let F=R.source,K=d.get(F);if(K){let tt=K[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&S(R),Object.keys(K).length===0&&d.delete(F)}n.remove(R)}function S(R){let b=n.get(R);s.deleteTexture(b.__webglTexture);let F=R.source,K=d.get(F);delete K[b.__cacheKey],o.memory.textures--}function w(R){let b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let tt=0;tt<b.__webglFramebuffer[K].length;tt++)s.deleteFramebuffer(b.__webglFramebuffer[K][tt]);else s.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)s.deleteFramebuffer(b.__webglFramebuffer[K]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let F=R.textures;for(let K=0,tt=F.length;K<tt;K++){let J=n.get(F[K]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(F[K])}n.remove(R)}let L=0;function z(){L=0}function B(){let R=L;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),L+=1,R}function W(R){let b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function Q(R,b){let F=n.get(R);if(R.isVideoTexture&&Dt(R),R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){let K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(F,R,b);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+b)}function Y(R,b){let F=n.get(R);if(R.version>0&&F.__version!==R.version){Z(F,R,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+b)}function et(R,b){let F=n.get(R);if(R.version>0&&F.__version!==R.version){Z(F,R,b);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+b)}function $(R,b){let F=n.get(R);if(R.version>0&&F.__version!==R.version){_(F,R,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+b)}let ct={[bs]:s.REPEAT,[hi]:s.CLAMP_TO_EDGE,[pa]:s.MIRRORED_REPEAT},gt={[$e]:s.NEAREST,[id]:s.NEAREST_MIPMAP_NEAREST,[Fs]:s.NEAREST_MIPMAP_LINEAR,[ln]:s.LINEAR,[bo]:s.LINEAR_MIPMAP_NEAREST,[ui]:s.LINEAR_MIPMAP_LINEAR},Rt={[ad]:s.NEVER,[fd]:s.ALWAYS,[ld]:s.LESS,[Uh]:s.LEQUAL,[cd]:s.EQUAL,[dd]:s.GEQUAL,[hd]:s.GREATER,[ud]:s.NOTEQUAL};function Gt(R,b){if(b.type===cn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===ln||b.magFilter===bo||b.magFilter===Fs||b.magFilter===ui||b.minFilter===ln||b.minFilter===bo||b.minFilter===Fs||b.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,ct[b.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,ct[b.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,ct[b.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,gt[b.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,gt[b.minFilter]),b.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Rt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===$e||b.minFilter!==Fs&&b.minFilter!==ui||b.type===cn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function te(R,b){let F=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",A));let K=b.source,tt=d.get(K);tt===void 0&&(tt={},d.set(K,tt));let J=W(b);if(J!==R.__cacheKey){tt[J]===void 0&&(tt[J]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,F=!0),tt[J].usedTimes++;let Et=tt[R.__cacheKey];Et!==void 0&&(tt[R.__cacheKey].usedTimes--,Et.usedTimes===0&&S(b)),R.__cacheKey=J,R.__webglTexture=tt[J].texture}return F}function Z(R,b,F){let K=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(K=s.TEXTURE_3D);let tt=te(R,b),J=b.source;e.bindTexture(K,R.__webglTexture,s.TEXTURE0+F);let Et=n.get(J);if(J.version!==Et.__version||tt===!0){e.activeTexture(s.TEXTURE0+F);let ut=Qt.getPrimaries(Qt.workingColorSpace),xt=b.colorSpace===Bn?null:Qt.getPrimaries(b.colorSpace),jt=b.colorSpace===Bn||ut===xt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let nt=y(b.image,!1,i.maxTextureSize);nt=he(b,nt);let vt=r.convert(b.format,b.colorSpace),Ut=r.convert(b.type),Nt=E(b.internalFormat,vt,Ut,b.colorSpace,b.isVideoTexture);Gt(K,b);let _t,Jt=b.mipmaps,Ht=b.isVideoTexture!==!0,le=Et.__version===void 0||tt===!0,N=J.dataReady,ht=D(b,nt);if(b.isDepthTexture)Nt=v(b.format===Yi,b.type),le&&(Ht?e.texStorage2D(s.TEXTURE_2D,1,Nt,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,Nt,nt.width,nt.height,0,vt,Ut,null));else if(b.isDataTexture)if(Jt.length>0){Ht&&le&&e.texStorage2D(s.TEXTURE_2D,ht,Nt,Jt[0].width,Jt[0].height);for(let X=0,j=Jt.length;X<j;X++)_t=Jt[X],Ht?N&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,_t.width,_t.height,vt,Ut,_t.data):e.texImage2D(s.TEXTURE_2D,X,Nt,_t.width,_t.height,0,vt,Ut,_t.data);b.generateMipmaps=!1}else Ht?(le&&e.texStorage2D(s.TEXTURE_2D,ht,Nt,nt.width,nt.height),N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,vt,Ut,nt.data)):e.texImage2D(s.TEXTURE_2D,0,Nt,nt.width,nt.height,0,vt,Ut,nt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ht&&le&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ht,Nt,Jt[0].width,Jt[0].height,nt.depth);for(let X=0,j=Jt.length;X<j;X++)if(_t=Jt[X],b.format!==nn)if(vt!==null)if(Ht){if(N)if(b.layerUpdates.size>0){let pt=ah(_t.width,_t.height,b.format,b.type);for(let dt of b.layerUpdates){let zt=_t.data.subarray(dt*pt/_t.data.BYTES_PER_ELEMENT,(dt+1)*pt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,dt,_t.width,_t.height,1,vt,zt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,_t.width,_t.height,nt.depth,vt,_t.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Nt,_t.width,_t.height,nt.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,_t.width,_t.height,nt.depth,vt,Ut,_t.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Nt,_t.width,_t.height,nt.depth,0,vt,Ut,_t.data)}else{Ht&&le&&e.texStorage2D(s.TEXTURE_2D,ht,Nt,Jt[0].width,Jt[0].height);for(let X=0,j=Jt.length;X<j;X++)_t=Jt[X],b.format!==nn?vt!==null?Ht?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,_t.width,_t.height,vt,_t.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Nt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?N&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,_t.width,_t.height,vt,Ut,_t.data):e.texImage2D(s.TEXTURE_2D,X,Nt,_t.width,_t.height,0,vt,Ut,_t.data)}else if(b.isDataArrayTexture)if(Ht){if(le&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ht,Nt,nt.width,nt.height,nt.depth),N)if(b.layerUpdates.size>0){let X=ah(nt.width,nt.height,b.format,b.type);for(let j of b.layerUpdates){let pt=nt.data.subarray(j*X/nt.data.BYTES_PER_ELEMENT,(j+1)*X/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,vt,Ut,pt)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,vt,Ut,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,nt.width,nt.height,nt.depth,0,vt,Ut,nt.data);else if(b.isData3DTexture)Ht?(le&&e.texStorage3D(s.TEXTURE_3D,ht,Nt,nt.width,nt.height,nt.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,vt,Ut,nt.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,nt.width,nt.height,nt.depth,0,vt,Ut,nt.data);else if(b.isFramebufferTexture){if(le)if(Ht)e.texStorage2D(s.TEXTURE_2D,ht,Nt,nt.width,nt.height);else{let X=nt.width,j=nt.height;for(let pt=0;pt<ht;pt++)e.texImage2D(s.TEXTURE_2D,pt,Nt,X,j,0,vt,Ut,null),X>>=1,j>>=1}}else if(Jt.length>0){if(Ht&&le){let X=Lt(Jt[0]);e.texStorage2D(s.TEXTURE_2D,ht,Nt,X.width,X.height)}for(let X=0,j=Jt.length;X<j;X++)_t=Jt[X],Ht?N&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,vt,Ut,_t):e.texImage2D(s.TEXTURE_2D,X,Nt,vt,Ut,_t);b.generateMipmaps=!1}else if(Ht){if(le){let X=Lt(nt);e.texStorage2D(s.TEXTURE_2D,ht,Nt,X.width,X.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,vt,Ut,nt)}else e.texImage2D(s.TEXTURE_2D,0,Nt,vt,Ut,nt);x(b)&&p(K),Et.__version=J.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function _(R,b,F){if(b.image.length!==6)return;let K=te(R,b),tt=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+F);let J=n.get(tt);if(tt.version!==J.__version||K===!0){e.activeTexture(s.TEXTURE0+F);let Et=Qt.getPrimaries(Qt.workingColorSpace),ut=b.colorSpace===Bn?null:Qt.getPrimaries(b.colorSpace),xt=b.colorSpace===Bn||Et===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let jt=b.isCompressedTexture||b.image[0].isCompressedTexture,nt=b.image[0]&&b.image[0].isDataTexture,vt=[];for(let j=0;j<6;j++)!jt&&!nt?vt[j]=y(b.image[j],!0,i.maxCubemapSize):vt[j]=nt?b.image[j].image:b.image[j],vt[j]=he(b,vt[j]);let Ut=vt[0],Nt=r.convert(b.format,b.colorSpace),_t=r.convert(b.type),Jt=E(b.internalFormat,Nt,_t,b.colorSpace),Ht=b.isVideoTexture!==!0,le=J.__version===void 0||K===!0,N=tt.dataReady,ht=D(b,Ut);Gt(s.TEXTURE_CUBE_MAP,b);let X;if(jt){Ht&&le&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Jt,Ut.width,Ut.height);for(let j=0;j<6;j++){X=vt[j].mipmaps;for(let pt=0;pt<X.length;pt++){let dt=X[pt];b.format!==nn?Nt!==null?Ht?N&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,dt.width,dt.height,Nt,dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Jt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,dt.width,dt.height,Nt,_t,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Jt,dt.width,dt.height,0,Nt,_t,dt.data)}}}else{if(X=b.mipmaps,Ht&&le){X.length>0&&ht++;let j=Lt(vt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Jt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,vt[j].width,vt[j].height,Nt,_t,vt[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Jt,vt[j].width,vt[j].height,0,Nt,_t,vt[j].data);for(let pt=0;pt<X.length;pt++){let zt=X[pt].image[j].image;Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,zt.width,zt.height,Nt,_t,zt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Jt,zt.width,zt.height,0,Nt,_t,zt.data)}}else{Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Nt,_t,vt[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Jt,Nt,_t,vt[j]);for(let pt=0;pt<X.length;pt++){let dt=X[pt];Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,Nt,_t,dt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Jt,Nt,_t,dt.image[j])}}}x(b)&&p(s.TEXTURE_CUBE_MAP),J.__version=tt.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function G(R,b,F,K,tt,J){let Et=r.convert(F.format,F.colorSpace),ut=r.convert(F.type),xt=E(F.internalFormat,Et,ut,F.colorSpace),jt=n.get(b),nt=n.get(F);if(nt.__renderTarget=b,!jt.__hasExternalTextures){let vt=Math.max(1,b.width>>J),Ut=Math.max(1,b.height>>J);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,J,xt,vt,Ut,b.depth,0,Et,ut,null):e.texImage2D(tt,J,xt,vt,Ut,0,Et,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),Zt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,tt,nt.__webglTexture,0,$t(b)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,tt,nt.__webglTexture,J),e.bindFramebuffer(s.FRAMEBUFFER,null)}function q(R,b,F){if(s.bindRenderbuffer(s.RENDERBUFFER,R),b.depthBuffer){let K=b.depthTexture,tt=K&&K.isDepthTexture?K.type:null,J=v(b.stencilBuffer,tt),Et=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=$t(b);Zt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,J,b.width,b.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,J,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,J,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,R)}else{let K=b.textures;for(let tt=0;tt<K.length;tt++){let J=K[tt],Et=r.convert(J.format,J.colorSpace),ut=r.convert(J.type),xt=E(J.internalFormat,Et,ut,J.colorSpace),jt=$t(b);F&&Zt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,jt,xt,b.width,b.height):Zt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,jt,xt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,xt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function rt(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let K=n.get(b.depthTexture);K.__renderTarget=b,(!K.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Q(b.depthTexture,0);let tt=K.__webglTexture,J=$t(b);if(b.depthTexture.format===Bi)Zt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(b.depthTexture.format===Yi)Zt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function ot(R){let b=n.get(R),F=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){let K=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),K){let tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,K.removeEventListener("dispose",tt)};K.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=K}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");rt(b.__webglFramebuffer,R)}else if(F){b.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[K]),b.__webglDepthbuffer[K]===void 0)b.__webglDepthbuffer[K]=s.createRenderbuffer(),q(b.__webglDepthbuffer[K],R,!1);else{let tt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,J)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),q(b.__webglDepthbuffer,R,!1);else{let K=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ct(R,b,F){let K=n.get(R);b!==void 0&&G(K.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&ot(R)}function It(R){let b=R.texture,F=n.get(R),K=n.get(b);R.addEventListener("dispose",C);let tt=R.textures,J=R.isWebGLCubeRenderTarget===!0,Et=tt.length>1;if(Et||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=b.version,o.memory.textures++),J){F.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[ut]=[];for(let xt=0;xt<b.mipmaps.length;xt++)F.__webglFramebuffer[ut][xt]=s.createFramebuffer()}else F.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let ut=0;ut<b.mipmaps.length;ut++)F.__webglFramebuffer[ut]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Et)for(let ut=0,xt=tt.length;ut<xt;ut++){let jt=n.get(tt[ut]);jt.__webglTexture===void 0&&(jt.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&Zt(R)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ut=0;ut<tt.length;ut++){let xt=tt[ut];F.__webglColorRenderbuffer[ut]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[ut]);let jt=r.convert(xt.format,xt.colorSpace),nt=r.convert(xt.type),vt=E(xt.internalFormat,jt,nt,xt.colorSpace,R.isXRRenderTarget===!0),Ut=$t(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,vt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,F.__webglColorRenderbuffer[ut])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),q(F.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Gt(s.TEXTURE_CUBE_MAP,b);for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0)for(let xt=0;xt<b.mipmaps.length;xt++)G(F.__webglFramebuffer[ut][xt],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,xt);else G(F.__webglFramebuffer[ut],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);x(b)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let ut=0,xt=tt.length;ut<xt;ut++){let jt=tt[ut],nt=n.get(jt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),Gt(s.TEXTURE_2D,jt),G(F.__webglFramebuffer,R,jt,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,0),x(jt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ut=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,K.__webglTexture),Gt(ut,b),b.mipmaps&&b.mipmaps.length>0)for(let xt=0;xt<b.mipmaps.length;xt++)G(F.__webglFramebuffer[xt],R,b,s.COLOR_ATTACHMENT0,ut,xt);else G(F.__webglFramebuffer,R,b,s.COLOR_ATTACHMENT0,ut,0);x(b)&&p(ut),e.unbindTexture()}R.depthBuffer&&ot(R)}function Pt(R){let b=R.textures;for(let F=0,K=b.length;F<K;F++){let tt=b[F];if(x(tt)){let J=M(R),Et=n.get(tt).__webglTexture;e.bindTexture(J,Et),p(J),e.unbindTexture()}}}let Wt=[],U=[];function me(R){if(R.samples>0){if(Zt(R)===!1){let b=R.textures,F=R.width,K=R.height,tt=s.COLOR_BUFFER_BIT,J=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(R),ut=b.length>1;if(ut)for(let xt=0;xt<b.length;xt++)e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let xt=0;xt<b.length;xt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),ut){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[xt]);let jt=n.get(b[xt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,jt,0)}s.blitFramebuffer(0,0,F,K,0,0,F,K,tt,s.NEAREST),l===!0&&(Wt.length=0,U.length=0,Wt.push(s.COLOR_ATTACHMENT0+xt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Wt.push(J),U.push(J),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,U)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Wt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ut)for(let xt=0;xt<b.length;xt++){e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,Et.__webglColorRenderbuffer[xt]);let jt=n.get(b[xt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,jt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let b=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function $t(R){return Math.min(i.maxSamples,R.samples)}function Zt(R){let b=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Dt(R){let b=o.render.frame;u.get(R)!==b&&(u.set(R,b),R.update())}function he(R,b){let F=R.colorSpace,K=R.format,tt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||F!==ji&&F!==Bn&&(Qt.getTransfer(F)===oe?(K!==nn||tt!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function Lt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=et,this.setTextureCube=$,this.rebindTextures=Ct,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Pt,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=G,this.useMultisampledRTT=Zt}function o0(s,t){function e(n,i=Bn){let r,o=Qt.getTransfer(i);if(n===En)return s.UNSIGNED_BYTE;if(n===Ll)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Dl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Th)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Sh)return s.BYTE;if(n===Eh)return s.SHORT;if(n===Ms)return s.UNSIGNED_SHORT;if(n===Pl)return s.INT;if(n===di)return s.UNSIGNED_INT;if(n===cn)return s.FLOAT;if(n===Us)return s.HALF_FLOAT;if(n===Ah)return s.ALPHA;if(n===Rh)return s.RGB;if(n===nn)return s.RGBA;if(n===Ch)return s.LUMINANCE;if(n===Ih)return s.LUMINANCE_ALPHA;if(n===Bi)return s.DEPTH_COMPONENT;if(n===Yi)return s.DEPTH_STENCIL;if(n===Ul)return s.RED;if(n===Nl)return s.RED_INTEGER;if(n===Ph)return s.RG;if(n===Ol)return s.RG_INTEGER;if(n===kl)return s.RGBA_INTEGER;if(n===xr||n===yr||n===vr||n===_r)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ma||n===ga||n===xa||n===ya)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ga)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===_a||n===ba)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===va||n===_a)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ba)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ma||n===wa||n===Sa||n===Ea||n===Ta||n===Aa||n===Ra||n===Ca||n===Ia||n===Pa||n===La||n===Da||n===Ua||n===Na)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ma)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ea)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ta)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ra)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ca)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ia)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===La)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Da)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ua)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===br||n===Oa||n===ka)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===br)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ka)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lh||n===za||n===Fa||n===Ba)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===br)return r.COMPRESSED_RED_RGTC1_EXT;if(n===za)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var il=class extends be{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},fe=class extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}},a0={type:"move"},ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let x=e.getJointPose(y,n),p=this._getHandJoint(c,y);x!==null&&(p.matrix.fromArray(x.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=x.radius),p.visible=x!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(a0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new fe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},l0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new Fe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new un({vertexShader:l0,fragmentShader:c0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new yt(new Re(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rl=class extends Wn{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null,y=new sl,x=e.getContextAttributes(),p=null,M=null,E=[],v=[],D=new at,A=null,C=new be;C.viewport=new ye;let I=new be;I.viewport=new ye;let S=[C,I],w=new il,L=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let _=E[Z];return _===void 0&&(_=new ys,E[Z]=_),_.getTargetRaySpace()},this.getControllerGrip=function(Z){let _=E[Z];return _===void 0&&(_=new ys,E[Z]=_),_.getGripSpace()},this.getHand=function(Z){let _=E[Z];return _===void 0&&(_=new ys,E[Z]=_),_.getHandSpace()};function B(Z){let _=v.indexOf(Z.inputSource);if(_===-1)return;let G=E[_];G!==void 0&&(G.update(Z.inputSource,Z.frame,c||o),G.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Q);for(let Z=0;Z<E.length;Z++){let _=v[Z];_!==null&&(v[Z]=null,E[Z].disconnect(_))}L=null,z=null,y.reset(),t.setRenderTarget(p),f=null,d=null,h=null,i=null,M=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Q),x.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(D),i.renderState.layers===void 0){let _={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,_),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Tn(f.framebufferWidth,f.framebufferHeight,{format:nn,type:En,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let _=null,G=null,q=null;x.depth&&(q=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_=x.stencil?Yi:Bi,G=x.stencil?Xi:di);let rt={colorFormat:e.RGBA8,depthFormat:q,scaleFactor:r};h=new XRWebGLBinding(i,e),d=h.createProjectionLayer(rt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Tn(d.textureWidth,d.textureHeight,{format:nn,type:En,depthTexture:new Ur(d.textureWidth,d.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,_),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Q(Z){for(let _=0;_<Z.removed.length;_++){let G=Z.removed[_],q=v.indexOf(G);q>=0&&(v[q]=null,E[q].disconnect(G))}for(let _=0;_<Z.added.length;_++){let G=Z.added[_],q=v.indexOf(G);if(q===-1){for(let ot=0;ot<E.length;ot++)if(ot>=v.length){v.push(G),q=ot;break}else if(v[ot]===null){v[ot]=G,q=ot;break}if(q===-1)break}let rt=E[q];rt&&rt.connect(G)}}let Y=new P,et=new P;function $(Z,_,G){Y.setFromMatrixPosition(_.matrixWorld),et.setFromMatrixPosition(G.matrixWorld);let q=Y.distanceTo(et),rt=_.projectionMatrix.elements,ot=G.projectionMatrix.elements,Ct=rt[14]/(rt[10]-1),It=rt[14]/(rt[10]+1),Pt=(rt[9]+1)/rt[5],Wt=(rt[9]-1)/rt[5],U=(rt[8]-1)/rt[0],me=(ot[8]+1)/ot[0],$t=Ct*U,Zt=Ct*me,Dt=q/(-U+me),he=Dt*-U;if(_.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(he),Z.translateZ(Dt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),rt[10]===-1)Z.projectionMatrix.copy(_.projectionMatrix),Z.projectionMatrixInverse.copy(_.projectionMatrixInverse);else{let Lt=Ct+Dt,R=It+Dt,b=$t-he,F=Zt+(q-he),K=Pt*It/R*Lt,tt=Wt*It/R*Lt;Z.projectionMatrix.makePerspective(b,F,K,tt,Lt,R),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ct(Z,_){_===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(_.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let _=Z.near,G=Z.far;y.texture!==null&&(y.depthNear>0&&(_=y.depthNear),y.depthFar>0&&(G=y.depthFar)),w.near=I.near=C.near=_,w.far=I.far=C.far=G,(L!==w.near||z!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),L=w.near,z=w.far),C.layers.mask=Z.layers.mask|2,I.layers.mask=Z.layers.mask|4,w.layers.mask=C.layers.mask|I.layers.mask;let q=Z.parent,rt=w.cameras;ct(w,q);for(let ot=0;ot<rt.length;ot++)ct(rt[ot],q);rt.length===2?$(w,C,I):w.projectionMatrix.copy(C.projectionMatrix),gt(Z,w,q)};function gt(Z,_,G){G===null?Z.matrix.copy(_.matrixWorld):(Z.matrix.copy(G.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(_.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(_.projectionMatrix),Z.projectionMatrixInverse.copy(_.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ga*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(w)};let Rt=null;function Gt(Z,_){if(u=_.getViewerPose(c||o),m=_,u!==null){let G=u.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let q=!1;G.length!==w.cameras.length&&(w.cameras.length=0,q=!0);for(let ot=0;ot<G.length;ot++){let Ct=G[ot],It=null;if(f!==null)It=f.getViewport(Ct);else{let Wt=h.getViewSubImage(d,Ct);It=Wt.viewport,ot===0&&(t.setRenderTargetTextures(M,Wt.colorTexture,d.ignoreDepthValues?void 0:Wt.depthStencilTexture),t.setRenderTarget(M))}let Pt=S[ot];Pt===void 0&&(Pt=new be,Pt.layers.enable(ot),Pt.viewport=new ye,S[ot]=Pt),Pt.matrix.fromArray(Ct.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(Ct.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(It.x,It.y,It.width,It.height),ot===0&&(w.matrix.copy(Pt.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),q===!0&&w.cameras.push(Pt)}let rt=i.enabledFeatures;if(rt&&rt.includes("depth-sensing")){let ot=h.getDepthInformation(G[0]);ot&&ot.isValid&&ot.texture&&y.init(t,ot,i.renderState)}}for(let G=0;G<E.length;G++){let q=v[G],rt=E[G];q!==null&&rt!==void 0&&rt.update(q,_,c||o)}Rt&&Rt(Z,_),_.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_}),m=null}let te=new zh;te.setAnimationLoop(Gt),this.setAnimationLoop=function(Z){Rt=Z},this.dispose=function(){}}},oi=new Ze,h0=new ne;function u0(s,t){function e(x,p){x.matrixAutoUpdate===!0&&x.updateMatrix(),p.value.copy(x.matrix)}function n(x,p){p.color.getRGB(x.fogColor.value,kh(s)),p.isFog?(x.fogNear.value=p.near,x.fogFar.value=p.far):p.isFogExp2&&(x.fogDensity.value=p.density)}function i(x,p,M,E,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(x,p):p.isMeshToonMaterial?(r(x,p),h(x,p)):p.isMeshPhongMaterial?(r(x,p),u(x,p)):p.isMeshStandardMaterial?(r(x,p),d(x,p),p.isMeshPhysicalMaterial&&f(x,p,v)):p.isMeshMatcapMaterial?(r(x,p),m(x,p)):p.isMeshDepthMaterial?r(x,p):p.isMeshDistanceMaterial?(r(x,p),y(x,p)):p.isMeshNormalMaterial?r(x,p):p.isLineBasicMaterial?(o(x,p),p.isLineDashedMaterial&&a(x,p)):p.isPointsMaterial?l(x,p,M,E):p.isSpriteMaterial?c(x,p):p.isShadowMaterial?(x.color.value.copy(p.color),x.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(x,p){x.opacity.value=p.opacity,p.color&&x.diffuse.value.copy(p.color),p.emissive&&x.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.bumpMap&&(x.bumpMap.value=p.bumpMap,e(p.bumpMap,x.bumpMapTransform),x.bumpScale.value=p.bumpScale,p.side===ze&&(x.bumpScale.value*=-1)),p.normalMap&&(x.normalMap.value=p.normalMap,e(p.normalMap,x.normalMapTransform),x.normalScale.value.copy(p.normalScale),p.side===ze&&x.normalScale.value.negate()),p.displacementMap&&(x.displacementMap.value=p.displacementMap,e(p.displacementMap,x.displacementMapTransform),x.displacementScale.value=p.displacementScale,x.displacementBias.value=p.displacementBias),p.emissiveMap&&(x.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,x.emissiveMapTransform)),p.specularMap&&(x.specularMap.value=p.specularMap,e(p.specularMap,x.specularMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);let M=t.get(p),E=M.envMap,v=M.envMapRotation;E&&(x.envMap.value=E,oi.copy(v),oi.x*=-1,oi.y*=-1,oi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),x.envMapRotation.value.setFromMatrix4(h0.makeRotationFromEuler(oi)),x.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=p.reflectivity,x.ior.value=p.ior,x.refractionRatio.value=p.refractionRatio),p.lightMap&&(x.lightMap.value=p.lightMap,x.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,x.lightMapTransform)),p.aoMap&&(x.aoMap.value=p.aoMap,x.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,x.aoMapTransform))}function o(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform))}function a(x,p){x.dashSize.value=p.dashSize,x.totalSize.value=p.dashSize+p.gapSize,x.scale.value=p.scale}function l(x,p,M,E){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.size.value=p.size*M,x.scale.value=E*.5,p.map&&(x.map.value=p.map,e(p.map,x.uvTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function c(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.rotation.value=p.rotation,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function u(x,p){x.specular.value.copy(p.specular),x.shininess.value=Math.max(p.shininess,1e-4)}function h(x,p){p.gradientMap&&(x.gradientMap.value=p.gradientMap)}function d(x,p){x.metalness.value=p.metalness,p.metalnessMap&&(x.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,x.metalnessMapTransform)),x.roughness.value=p.roughness,p.roughnessMap&&(x.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,x.roughnessMapTransform)),p.envMap&&(x.envMapIntensity.value=p.envMapIntensity)}function f(x,p,M){x.ior.value=p.ior,p.sheen>0&&(x.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),x.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(x.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,x.sheenColorMapTransform)),p.sheenRoughnessMap&&(x.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,x.sheenRoughnessMapTransform))),p.clearcoat>0&&(x.clearcoat.value=p.clearcoat,x.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(x.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,x.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(x.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ze&&x.clearcoatNormalScale.value.negate())),p.dispersion>0&&(x.dispersion.value=p.dispersion),p.iridescence>0&&(x.iridescence.value=p.iridescence,x.iridescenceIOR.value=p.iridescenceIOR,x.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(x.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,x.iridescenceMapTransform)),p.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),p.transmission>0&&(x.transmission.value=p.transmission,x.transmissionSamplerMap.value=M.texture,x.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(x.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,x.transmissionMapTransform)),x.thickness.value=p.thickness,p.thicknessMap&&(x.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=p.attenuationDistance,x.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(x.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(x.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=p.specularIntensity,x.specularColor.value.copy(p.specularColor),p.specularColorMap&&(x.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,x.specularColorMapTransform)),p.specularIntensityMap&&(x.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,p){p.matcap&&(x.matcap.value=p.matcap)}function y(x,p){let M=t.get(p).light;x.referencePosition.value.setFromMatrixPosition(M.matrixWorld),x.nearDistance.value=M.shadow.camera.near,x.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function d0(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,E){let v=E.program;n.uniformBlockBinding(M,v)}function c(M,E){let v=i[M.id];v===void 0&&(m(M),v=u(M),i[M.id]=v,M.addEventListener("dispose",x));let D=E.program;n.updateUBOMapping(M,D);let A=t.render.frame;r[M.id]!==A&&(d(M),r[M.id]=A)}function u(M){let E=h();M.__bindingPointIndex=E;let v=s.createBuffer(),D=M.__size,A=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,D,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,v),v}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let E=i[M.id],v=M.uniforms,D=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let A=0,C=v.length;A<C;A++){let I=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,w=I.length;S<w;S++){let L=I[S];if(f(L,A,S,D)===!0){let z=L.__offset,B=Array.isArray(L.value)?L.value:[L.value],W=0;for(let Q=0;Q<B.length;Q++){let Y=B[Q],et=y(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,z+W,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,W),W+=et.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,E,v,D){let A=M.value,C=E+"_"+v;if(D[C]===void 0)return typeof A=="number"||typeof A=="boolean"?D[C]=A:D[C]=A.clone(),!0;{let I=D[C];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return D[C]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function m(M){let E=M.uniforms,v=0,D=16;for(let C=0,I=E.length;C<I;C++){let S=Array.isArray(E[C])?E[C]:[E[C]];for(let w=0,L=S.length;w<L;w++){let z=S[w],B=Array.isArray(z.value)?z.value:[z.value];for(let W=0,Q=B.length;W<Q;W++){let Y=B[W],et=y(Y),$=v%D,ct=$%et.boundary,gt=$+ct;v+=ct,gt!==0&&D-gt<et.storage&&(v+=D-gt),z.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=v,v+=et.storage}}}let A=v%D;return A>0&&(v+=D-A),M.__size=v,M.__cache={},this}function y(M){let E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function x(M){let E=M.target;E.removeEventListener("dispose",x);let v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function p(){for(let M in i)s.deleteBuffer(i[M]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}var Xn=class{constructor(t={}){let{canvas:e=md(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),y=new Int32Array(4),x=null,p=null,M=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=Vn,this.toneMappingExposure=1;let v=this,D=!1,A=0,C=0,I=null,S=-1,w=null,L=new ye,z=new ye,B=null,W=new At(0),Q=0,Y=e.width,et=e.height,$=1,ct=null,gt=null,Rt=new ye(0,0,Y,et),Gt=new ye(0,0,Y,et),te=!1,Z=new Es,_=!1,G=!1,q=new ne,rt=new ne,ot=new P,Ct=new ye,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pt=!1;function Wt(){return I===null?$:1}let U=n;function me(T,O){return e.getContext(T,O)}try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),U===null){let O="webgl2";if(U=me(O,T),U===null)throw me(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let $t,Zt,Dt,he,Lt,R,b,F,K,tt,J,Et,ut,xt,jt,nt,vt,Ut,Nt,_t,Jt,Ht,le,N;function ht(){$t=new Rm(U),$t.init(),Ht=new o0(U,$t),Zt=new Mm(U,$t,t,Ht),Dt=new i0(U,$t),Zt.reverseDepthBuffer&&d&&Dt.buffers.depth.setReversed(!0),he=new Pm(U),Lt=new Wg,R=new r0(U,$t,Dt,Lt,Zt,Ht,he),b=new Sm(v),F=new Am(v),K=new kd(U),le=new _m(U,K),tt=new Cm(U,K,he,le),J=new Dm(U,tt,K,he),Nt=new Lm(U,Zt,R),nt=new wm(Lt),Et=new Gg(v,b,F,$t,Zt,le,nt),ut=new u0(v,Lt),xt=new Xg,jt=new jg($t),Ut=new vm(v,b,F,Dt,J,f,l),vt=new e0(v,J,Zt),N=new d0(U,he,Zt,Dt),_t=new bm(U,$t,he),Jt=new Im(U,$t,he),he.programs=Et.programs,v.capabilities=Zt,v.extensions=$t,v.properties=Lt,v.renderLists=xt,v.shadowMap=vt,v.state=Dt,v.info=he}ht();let X=new rl(v,U);this.xr=X,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let T=$t.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=$t.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(Y,et,!1))},this.getSize=function(T){return T.set(Y,et)},this.setSize=function(T,O,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,et=O,e.width=Math.floor(T*$),e.height=Math.floor(O*$),H===!0&&(e.style.width=T+"px",e.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(Y*$,et*$).floor()},this.setDrawingBufferSize=function(T,O,H){Y=T,et=O,$=H,e.width=Math.floor(T*H),e.height=Math.floor(O*H),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(Rt)},this.setViewport=function(T,O,H,V){T.isVector4?Rt.set(T.x,T.y,T.z,T.w):Rt.set(T,O,H,V),Dt.viewport(L.copy(Rt).multiplyScalar($).round())},this.getScissor=function(T){return T.copy(Gt)},this.setScissor=function(T,O,H,V){T.isVector4?Gt.set(T.x,T.y,T.z,T.w):Gt.set(T,O,H,V),Dt.scissor(z.copy(Gt).multiplyScalar($).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(T){Dt.setScissorTest(te=T)},this.setOpaqueSort=function(T){ct=T},this.setTransparentSort=function(T){gt=T},this.getClearColor=function(T){return T.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(T=!0,O=!0,H=!0){let V=0;if(T){let k=!1;if(I!==null){let it=I.texture.format;k=it===kl||it===Ol||it===Nl}if(k){let it=I.texture.type,ft=it===En||it===di||it===Ms||it===Xi||it===Ll||it===Dl,bt=Ut.getClearColor(),Mt=Ut.getClearAlpha(),Ot=bt.r,Ft=bt.g,wt=bt.b;ft?(m[0]=Ot,m[1]=Ft,m[2]=wt,m[3]=Mt,U.clearBufferuiv(U.COLOR,0,m)):(y[0]=Ot,y[1]=Ft,y[2]=wt,y[3]=Mt,U.clearBufferiv(U.COLOR,0,y))}else V|=U.COLOR_BUFFER_BIT}O&&(V|=U.DEPTH_BUFFER_BIT),H&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),xt.dispose(),jt.dispose(),Lt.dispose(),b.dispose(),F.dispose(),J.dispose(),le.dispose(),N.dispose(),Et.dispose(),X.dispose(),X.removeEventListener("sessionstart",ec),X.removeEventListener("sessionend",nc),ti.stop()};function j(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;let T=he.autoReset,O=vt.enabled,H=vt.autoUpdate,V=vt.needsUpdate,k=vt.type;ht(),he.autoReset=T,vt.enabled=O,vt.autoUpdate=H,vt.needsUpdate=V,vt.type=k}function dt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function zt(T){let O=T.target;O.removeEventListener("dispose",zt),xe(O)}function xe(T){Ce(T),Lt.remove(T)}function Ce(T){let O=Lt.get(T).programs;O!==void 0&&(O.forEach(function(H){Et.releaseProgram(H)}),T.isShaderMaterial&&Et.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,H,V,k,it){O===null&&(O=It);let ft=k.isMesh&&k.matrixWorld.determinant()<0,bt=Su(T,O,H,V,k);Dt.setMaterial(V,ft);let Mt=H.index,Ot=1;if(V.wireframe===!0){if(Mt=tt.getWireframeAttribute(H),Mt===void 0)return;Ot=2}let Ft=H.drawRange,wt=H.attributes.position,ee=Ft.start*Ot,ce=(Ft.start+Ft.count)*Ot;it!==null&&(ee=Math.max(ee,it.start*Ot),ce=Math.min(ce,(it.start+it.count)*Ot)),Mt!==null?(ee=Math.max(ee,0),ce=Math.min(ce,Mt.count)):wt!=null&&(ee=Math.max(ee,0),ce=Math.min(ce,wt.count));let ue=ce-ee;if(ue<0||ue===1/0)return;le.setup(k,V,bt,H,Mt);let ke,ie=_t;if(Mt!==null&&(ke=K.get(Mt),ie=Jt,ie.setIndex(ke)),k.isMesh)V.wireframe===!0?(Dt.setLineWidth(V.wireframeLinewidth*Wt()),ie.setMode(U.LINES)):ie.setMode(U.TRIANGLES);else if(k.isLine){let Tt=V.linewidth;Tt===void 0&&(Tt=1),Dt.setLineWidth(Tt*Wt()),k.isLineSegments?ie.setMode(U.LINES):k.isLineLoop?ie.setMode(U.LINE_LOOP):ie.setMode(U.LINE_STRIP)}else k.isPoints?ie.setMode(U.POINTS):k.isSprite&&ie.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ie.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if($t.get("WEBGL_multi_draw"))ie.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Tt=k._multiDrawStarts,pn=k._multiDrawCounts,se=k._multiDrawCount,je=Mt?K.get(Mt).bytesPerElement:1,yi=Lt.get(V).currentProgram.getUniforms();for(let He=0;He<se;He++)yi.setValue(U,"_gl_DrawID",He),ie.render(Tt[He]/je,pn[He])}else if(k.isInstancedMesh)ie.renderInstances(ee,ue,k.count);else if(H.isInstancedBufferGeometry){let Tt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,pn=Math.min(H.instanceCount,Tt);ie.renderInstances(ee,ue,pn)}else ie.render(ee,ue)};function re(T,O,H){T.transparent===!0&&T.side===We&&T.forceSinglePass===!1?(T.side=ze,T.needsUpdate=!0,zs(T,O,H),T.side=hn,T.needsUpdate=!0,zs(T,O,H),T.side=We):zs(T,O,H)}this.compile=function(T,O,H=null){H===null&&(H=T),p=jt.get(H),p.init(O),E.push(p),H.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),T!==H&&T.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let V=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let it=k.material;if(it)if(Array.isArray(it))for(let ft=0;ft<it.length;ft++){let bt=it[ft];re(bt,H,k),V.add(bt)}else re(it,H,k),V.add(it)}),E.pop(),p=null,V},this.compileAsync=function(T,O,H=null){let V=this.compile(T,O,H);return new Promise(k=>{function it(){if(V.forEach(function(ft){Lt.get(ft).currentProgram.isReady()&&V.delete(ft)}),V.size===0){k(T);return}setTimeout(it,10)}$t.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ke=null;function fn(T){Ke&&Ke(T)}function ec(){ti.stop()}function nc(){ti.start()}let ti=new zh;ti.setAnimationLoop(fn),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(T){Ke=T,X.setAnimationLoop(T),T===null?ti.stop():ti.start()},X.addEventListener("sessionstart",ec),X.addEventListener("sessionend",nc),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(O),O=X.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,O,I),p=jt.get(T,E.length),p.init(O),E.push(p),rt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Z.setFromProjectionMatrix(rt),G=this.localClippingEnabled,_=nt.init(this.clippingPlanes,G),x=xt.get(T,M.length),x.init(),M.push(x),X.enabled===!0&&X.isPresenting===!0){let it=v.xr.getDepthSensingMesh();it!==null&&_o(it,O,-1/0,v.sortObjects)}_o(T,O,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(ct,gt),Pt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Pt&&Ut.addToRenderList(x,T),this.info.render.frame++,_===!0&&nt.beginShadows();let H=p.state.shadowsArray;vt.render(H,T,O),_===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=x.opaque,k=x.transmissive;if(p.setupLights(),O.isArrayCamera){let it=O.cameras;if(k.length>0)for(let ft=0,bt=it.length;ft<bt;ft++){let Mt=it[ft];sc(V,k,T,Mt)}Pt&&Ut.render(T);for(let ft=0,bt=it.length;ft<bt;ft++){let Mt=it[ft];ic(x,T,Mt,Mt.viewport)}}else k.length>0&&sc(V,k,T,O),Pt&&Ut.render(T),ic(x,T,O);I!==null&&(R.updateMultisampleRenderTarget(I),R.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(v,T,O),le.resetDefaultState(),S=-1,w=null,E.pop(),E.length>0?(p=E[E.length-1],_===!0&&nt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?x=M[M.length-1]:x=null};function _o(T,O,H,V){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){V&&Ct.setFromMatrixPosition(T.matrixWorld).applyMatrix4(rt);let ft=J.update(T),bt=T.material;bt.visible&&x.push(T,ft,bt,H,Ct.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){let ft=J.update(T),bt=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ct.copy(T.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ct.copy(ft.boundingSphere.center)),Ct.applyMatrix4(T.matrixWorld).applyMatrix4(rt)),Array.isArray(bt)){let Mt=ft.groups;for(let Ot=0,Ft=Mt.length;Ot<Ft;Ot++){let wt=Mt[Ot],ee=bt[wt.materialIndex];ee&&ee.visible&&x.push(T,ft,ee,H,Ct.z,wt)}}else bt.visible&&x.push(T,ft,bt,H,Ct.z,null)}}let it=T.children;for(let ft=0,bt=it.length;ft<bt;ft++)_o(it[ft],O,H,V)}function ic(T,O,H,V){let k=T.opaque,it=T.transmissive,ft=T.transparent;p.setupLightsView(H),_===!0&&nt.setGlobalState(v.clippingPlanes,H),V&&Dt.viewport(L.copy(V)),k.length>0&&ks(k,O,H),it.length>0&&ks(it,O,H),ft.length>0&&ks(ft,O,H),Dt.buffers.depth.setTest(!0),Dt.buffers.depth.setMask(!0),Dt.buffers.color.setMask(!0),Dt.setPolygonOffset(!1)}function sc(T,O,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new Tn(1,1,{generateMipmaps:!0,type:$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float")?Us:En,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));let it=p.state.transmissionRenderTarget[V.id],ft=V.viewport||L;it.setSize(ft.z,ft.w);let bt=v.getRenderTarget();v.setRenderTarget(it),v.getClearColor(W),Q=v.getClearAlpha(),Q<1&&v.setClearColor(16777215,.5),v.clear(),Pt&&Ut.render(H);let Mt=v.toneMapping;v.toneMapping=Vn;let Ot=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),_===!0&&nt.setGlobalState(v.clippingPlanes,V),ks(T,H,V),R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let wt=0,ee=O.length;wt<ee;wt++){let ce=O[wt],ue=ce.object,ke=ce.geometry,ie=ce.material,Tt=ce.group;if(ie.side===We&&ue.layers.test(V.layers)){let pn=ie.side;ie.side=ze,ie.needsUpdate=!0,rc(ue,H,V,ke,ie,Tt),ie.side=pn,ie.needsUpdate=!0,Ft=!0}}Ft===!0&&(R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it))}v.setRenderTarget(bt),v.setClearColor(W,Q),Ot!==void 0&&(V.viewport=Ot),v.toneMapping=Mt}function ks(T,O,H){let V=O.isScene===!0?O.overrideMaterial:null;for(let k=0,it=T.length;k<it;k++){let ft=T[k],bt=ft.object,Mt=ft.geometry,Ot=V===null?ft.material:V,Ft=ft.group;bt.layers.test(H.layers)&&rc(bt,O,H,Mt,Ot,Ft)}}function rc(T,O,H,V,k,it){T.onBeforeRender(v,O,H,V,k,it),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(v,O,H,V,T,it),k.transparent===!0&&k.side===We&&k.forceSinglePass===!1?(k.side=ze,k.needsUpdate=!0,v.renderBufferDirect(H,O,V,k,T,it),k.side=hn,k.needsUpdate=!0,v.renderBufferDirect(H,O,V,k,T,it),k.side=We):v.renderBufferDirect(H,O,V,k,T,it),T.onAfterRender(v,O,H,V,k,it)}function zs(T,O,H){O.isScene!==!0&&(O=It);let V=Lt.get(T),k=p.state.lights,it=p.state.shadowsArray,ft=k.state.version,bt=Et.getParameters(T,k.state,it,O,H),Mt=Et.getProgramCacheKey(bt),Ot=V.programs;V.environment=T.isMeshStandardMaterial?O.environment:null,V.fog=O.fog,V.envMap=(T.isMeshStandardMaterial?F:b).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Ot===void 0&&(T.addEventListener("dispose",zt),Ot=new Map,V.programs=Ot);let Ft=Ot.get(Mt);if(Ft!==void 0){if(V.currentProgram===Ft&&V.lightsStateVersion===ft)return ac(T,bt),Ft}else bt.uniforms=Et.getUniforms(T),T.onBeforeCompile(bt,v),Ft=Et.acquireProgram(bt,Mt),Ot.set(Mt,Ft),V.uniforms=bt.uniforms;let wt=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(wt.clippingPlanes=nt.uniform),ac(T,bt),V.needsLights=Tu(T),V.lightsStateVersion=ft,V.needsLights&&(wt.ambientLightColor.value=k.state.ambient,wt.lightProbe.value=k.state.probe,wt.directionalLights.value=k.state.directional,wt.directionalLightShadows.value=k.state.directionalShadow,wt.spotLights.value=k.state.spot,wt.spotLightShadows.value=k.state.spotShadow,wt.rectAreaLights.value=k.state.rectArea,wt.ltc_1.value=k.state.rectAreaLTC1,wt.ltc_2.value=k.state.rectAreaLTC2,wt.pointLights.value=k.state.point,wt.pointLightShadows.value=k.state.pointShadow,wt.hemisphereLights.value=k.state.hemi,wt.directionalShadowMap.value=k.state.directionalShadowMap,wt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,wt.spotShadowMap.value=k.state.spotShadowMap,wt.spotLightMatrix.value=k.state.spotLightMatrix,wt.spotLightMap.value=k.state.spotLightMap,wt.pointShadowMap.value=k.state.pointShadowMap,wt.pointShadowMatrix.value=k.state.pointShadowMatrix),V.currentProgram=Ft,V.uniformsList=null,Ft}function oc(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=Vi.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function ac(T,O){let H=Lt.get(T);H.outputColorSpace=O.outputColorSpace,H.batching=O.batching,H.batchingColor=O.batchingColor,H.instancing=O.instancing,H.instancingColor=O.instancingColor,H.instancingMorph=O.instancingMorph,H.skinning=O.skinning,H.morphTargets=O.morphTargets,H.morphNormals=O.morphNormals,H.morphColors=O.morphColors,H.morphTargetsCount=O.morphTargetsCount,H.numClippingPlanes=O.numClippingPlanes,H.numIntersection=O.numClipIntersection,H.vertexAlphas=O.vertexAlphas,H.vertexTangents=O.vertexTangents,H.toneMapping=O.toneMapping}function Su(T,O,H,V,k){O.isScene!==!0&&(O=It),R.resetTextureUnits();let it=O.fog,ft=V.isMeshStandardMaterial?O.environment:null,bt=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ji,Mt=(V.isMeshStandardMaterial?F:b).get(V.envMap||ft),Ot=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ft=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),wt=!!H.morphAttributes.position,ee=!!H.morphAttributes.normal,ce=!!H.morphAttributes.color,ue=Vn;V.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ue=v.toneMapping);let ke=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ie=ke!==void 0?ke.length:0,Tt=Lt.get(V),pn=p.state.lights;if(_===!0&&(G===!0||T!==w)){let Xe=T===w&&V.id===S;nt.setState(V,T,Xe)}let se=!1;V.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==pn.state.version||Tt.outputColorSpace!==bt||k.isBatchedMesh&&Tt.batching===!1||!k.isBatchedMesh&&Tt.batching===!0||k.isBatchedMesh&&Tt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Tt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Tt.instancing===!1||!k.isInstancedMesh&&Tt.instancing===!0||k.isSkinnedMesh&&Tt.skinning===!1||!k.isSkinnedMesh&&Tt.skinning===!0||k.isInstancedMesh&&Tt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Tt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Tt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Tt.instancingMorph===!1&&k.morphTexture!==null||Tt.envMap!==Mt||V.fog===!0&&Tt.fog!==it||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==nt.numPlanes||Tt.numIntersection!==nt.numIntersection)||Tt.vertexAlphas!==Ot||Tt.vertexTangents!==Ft||Tt.morphTargets!==wt||Tt.morphNormals!==ee||Tt.morphColors!==ce||Tt.toneMapping!==ue||Tt.morphTargetsCount!==ie)&&(se=!0):(se=!0,Tt.__version=V.version);let je=Tt.currentProgram;se===!0&&(je=zs(V,O,k));let yi=!1,He=!1,ss=!1,de=je.getUniforms(),rn=Tt.uniforms;if(Dt.useProgram(je.program)&&(yi=!0,He=!0,ss=!0),V.id!==S&&(S=V.id,He=!0),yi||w!==T){Dt.buffers.depth.getReversed()?(q.copy(T.projectionMatrix),xd(q),yd(q),de.setValue(U,"projectionMatrix",q)):de.setValue(U,"projectionMatrix",T.projectionMatrix),de.setValue(U,"viewMatrix",T.matrixWorldInverse);let Ln=de.map.cameraPosition;Ln!==void 0&&Ln.setValue(U,ot.setFromMatrixPosition(T.matrixWorld)),Zt.logarithmicDepthBuffer&&de.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&de.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),w!==T&&(w=T,He=!0,ss=!0)}if(k.isSkinnedMesh){de.setOptional(U,k,"bindMatrix"),de.setOptional(U,k,"bindMatrixInverse");let Xe=k.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),de.setValue(U,"boneTexture",Xe.boneTexture,R))}k.isBatchedMesh&&(de.setOptional(U,k,"batchingTexture"),de.setValue(U,"batchingTexture",k._matricesTexture,R),de.setOptional(U,k,"batchingIdTexture"),de.setValue(U,"batchingIdTexture",k._indirectTexture,R),de.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&de.setValue(U,"batchingColorTexture",k._colorsTexture,R));let rs=H.morphAttributes;if((rs.position!==void 0||rs.normal!==void 0||rs.color!==void 0)&&Nt.update(k,H,je),(He||Tt.receiveShadow!==k.receiveShadow)&&(Tt.receiveShadow=k.receiveShadow,de.setValue(U,"receiveShadow",k.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(rn.envMap.value=Mt,rn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&O.environment!==null&&(rn.envMapIntensity.value=O.environmentIntensity),He&&(de.setValue(U,"toneMappingExposure",v.toneMappingExposure),Tt.needsLights&&Eu(rn,ss),it&&V.fog===!0&&ut.refreshFogUniforms(rn,it),ut.refreshMaterialUniforms(rn,V,$,et,p.state.transmissionRenderTarget[T.id]),Vi.upload(U,oc(Tt),rn,R)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Vi.upload(U,oc(Tt),rn,R),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&de.setValue(U,"center",k.center),de.setValue(U,"modelViewMatrix",k.modelViewMatrix),de.setValue(U,"normalMatrix",k.normalMatrix),de.setValue(U,"modelMatrix",k.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let Xe=V.uniformsGroups;for(let Ln=0,Dn=Xe.length;Ln<Dn;Ln++){let lc=Xe[Ln];N.update(lc,je),N.bind(lc,je)}}return je}function Eu(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Tu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,O,H){Lt.get(T.texture).__webglTexture=O,Lt.get(T.depthTexture).__webglTexture=H;let V=Lt.get(T);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||$t.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){let H=Lt.get(T);H.__webglFramebuffer=O,H.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,H=0){I=T,A=O,C=H;let V=!0,k=null,it=!1,ft=!1;if(T){let Mt=Lt.get(T);if(Mt.__useDefaultFramebuffer!==void 0)Dt.bindFramebuffer(U.FRAMEBUFFER,null),V=!1;else if(Mt.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(Mt.__hasExternalTextures)R.rebindTextures(T,Lt.get(T.texture).__webglTexture,Lt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let wt=T.depthTexture;if(Mt.__boundDepthTexture!==wt){if(wt!==null&&Lt.has(wt)&&(T.width!==wt.image.width||T.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}let Ot=T.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(ft=!0);let Ft=Lt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ft[O])?k=Ft[O][H]:k=Ft[O],it=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?k=Lt.get(T).__webglMultisampledFramebuffer:Array.isArray(Ft)?k=Ft[H]:k=Ft,L.copy(T.viewport),z.copy(T.scissor),B=T.scissorTest}else L.copy(Rt).multiplyScalar($).floor(),z.copy(Gt).multiplyScalar($).floor(),B=te;if(Dt.bindFramebuffer(U.FRAMEBUFFER,k)&&V&&Dt.drawBuffers(T,k),Dt.viewport(L),Dt.scissor(z),Dt.setScissorTest(B),it){let Mt=Lt.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,Mt.__webglTexture,H)}else if(ft){let Mt=Lt.get(T.texture),Ot=O||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.__webglTexture,H||0,Ot)}S=-1},this.readRenderTargetPixels=function(T,O,H,V,k,it,ft){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ft!==void 0&&(bt=bt[ft]),bt){Dt.bindFramebuffer(U.FRAMEBUFFER,bt);try{let Mt=T.texture,Ot=Mt.format,Ft=Mt.type;if(!Zt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Zt.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-V&&H>=0&&H<=T.height-k&&U.readPixels(O,H,V,k,Ht.convert(Ot),Ht.convert(Ft),it)}finally{let Mt=I!==null?Lt.get(I).__webglFramebuffer:null;Dt.bindFramebuffer(U.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(T,O,H,V,k,it,ft){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ft!==void 0&&(bt=bt[ft]),bt){let Mt=T.texture,Ot=Mt.format,Ft=Mt.type;if(!Zt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Zt.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-V&&H>=0&&H<=T.height-k){Dt.bindFramebuffer(U.FRAMEBUFFER,bt);let wt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,wt),U.bufferData(U.PIXEL_PACK_BUFFER,it.byteLength,U.STREAM_READ),U.readPixels(O,H,V,k,Ht.convert(Ot),Ht.convert(Ft),0);let ee=I!==null?Lt.get(I).__webglFramebuffer:null;Dt.bindFramebuffer(U.FRAMEBUFFER,ee);let ce=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await gd(U,ce,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,wt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,it),U.deleteBuffer(wt),U.deleteSync(ce),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,H=0){T.isTexture!==!0&&(gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);let V=Math.pow(2,-H),k=Math.floor(T.image.width*V),it=Math.floor(T.image.height*V),ft=O!==null?O.x:0,bt=O!==null?O.y:0;R.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,ft,bt,k,it),Dt.unbindTexture()},this.copyTextureToTexture=function(T,O,H=null,V=null,k=0){T.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1],O=arguments[2],k=arguments[3]||0,H=null);let it,ft,bt,Mt,Ot,Ft,wt,ee,ce,ue=T.isCompressedTexture?T.mipmaps[k]:T.image;H!==null?(it=H.max.x-H.min.x,ft=H.max.y-H.min.y,bt=H.isBox3?H.max.z-H.min.z:1,Mt=H.min.x,Ot=H.min.y,Ft=H.isBox3?H.min.z:0):(it=ue.width,ft=ue.height,bt=ue.depth||1,Mt=0,Ot=0,Ft=0),V!==null?(wt=V.x,ee=V.y,ce=V.z):(wt=0,ee=0,ce=0);let ke=Ht.convert(O.format),ie=Ht.convert(O.type),Tt;O.isData3DTexture?(R.setTexture3D(O,0),Tt=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),Tt=U.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),Tt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let pn=U.getParameter(U.UNPACK_ROW_LENGTH),se=U.getParameter(U.UNPACK_IMAGE_HEIGHT),je=U.getParameter(U.UNPACK_SKIP_PIXELS),yi=U.getParameter(U.UNPACK_SKIP_ROWS),He=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ue.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ue.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Mt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ot),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ft);let ss=T.isDataArrayTexture||T.isData3DTexture,de=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let rn=Lt.get(T),rs=Lt.get(O),Xe=Lt.get(rn.__renderTarget),Ln=Lt.get(rs.__renderTarget);Dt.bindFramebuffer(U.READ_FRAMEBUFFER,Xe.__webglFramebuffer),Dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let Dn=0;Dn<bt;Dn++)ss&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Lt.get(T).__webglTexture,k,Ft+Dn),T.isDepthTexture?(de&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Lt.get(O).__webglTexture,k,ce+Dn),U.blitFramebuffer(Mt,Ot,it,ft,wt,ee,it,ft,U.DEPTH_BUFFER_BIT,U.NEAREST)):de?U.copyTexSubImage3D(Tt,k,wt,ee,ce+Dn,Mt,Ot,it,ft):U.copyTexSubImage2D(Tt,k,wt,ee,ce+Dn,Mt,Ot,it,ft);Dt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Dt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else de?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Tt,k,wt,ee,ce,it,ft,bt,ke,ie,ue.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(Tt,k,wt,ee,ce,it,ft,bt,ke,ue.data):U.texSubImage3D(Tt,k,wt,ee,ce,it,ft,bt,ke,ie,ue):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,k,wt,ee,it,ft,ke,ie,ue.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,k,wt,ee,ue.width,ue.height,ke,ue.data):U.texSubImage2D(U.TEXTURE_2D,k,wt,ee,it,ft,ke,ie,ue);U.pixelStorei(U.UNPACK_ROW_LENGTH,pn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,se),U.pixelStorei(U.UNPACK_SKIP_PIXELS,je),U.pixelStorei(U.UNPACK_SKIP_ROWS,yi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,He),k===0&&O.generateMipmaps&&U.generateMipmap(Tt),Dt.unbindTexture()},this.copyTextureToTexture3D=function(T,O,H=null,V=null,k=0){return T.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,T=arguments[2],O=arguments[3],k=arguments[4]||0),gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,H,V,k)},this.initRenderTarget=function(T){Lt.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),Dt.unbindTexture()},this.resetState=function(){A=0,C=0,I=null,Dt.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}};var Nr=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new At(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Yn=class extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ze,this.environmentIntensity=1,this.environmentRotation=new Ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Or=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Va,this.updateRanges=[],this.version=0,this.uuid=Gn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Le=new P,Ts=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=an(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=an(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=an(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=an(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},As=class extends Rn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new At(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Di,hs=new P,Ui=new P,Ni=new P,Oi=new at,us=new at,Gh=new ne,or=new P,ds=new P,ar=new P,lh=new at,Jo=new at,ch=new at,kr=class extends Ae{constructor(t=new As){if(super(),this.isSprite=!0,this.type="Sprite",Di===void 0){Di=new ge;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Or(e,5);Di.setIndex([0,1,2,0,2,3]),Di.setAttribute("position",new Ts(n,3,0,!1)),Di.setAttribute("uv",new Ts(n,2,3,!1))}this.geometry=Di,this.material=t,this.center=new at(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ui.setFromMatrixScale(this.matrixWorld),Gh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ni.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ui.multiplyScalar(-Ni.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;lr(or.set(-.5,-.5,0),Ni,o,Ui,i,r),lr(ds.set(.5,-.5,0),Ni,o,Ui,i,r),lr(ar.set(.5,.5,0),Ni,o,Ui,i,r),lh.set(0,0),Jo.set(1,0),ch.set(1,1);let a=t.ray.intersectTriangle(or,ds,ar,!1,hs);if(a===null&&(lr(ds.set(-.5,.5,0),Ni,o,Ui,i,r),Jo.set(0,1),a=t.ray.intersectTriangle(or,ar,ds,!1,hs),a===null))return;let l=t.ray.origin.distanceTo(hs);l<t.near||l>t.far||e.push({distance:l,point:hs.clone(),uv:Mn.getInterpolation(hs,or,ds,ar,lh,Jo,ch,new at),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function lr(s,t,e,n,i,r){Oi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(us.x=r*Oi.x-i*Oi.y,us.y=i*Oi.x+r*Oi.y):us.copy(Oi),s.copy(t),s.x+=us.x,s.y+=us.y,s.applyMatrix4(Gh)}var ol=class extends Fe{constructor(t=null,e=1,n=1,i,r,o,a,l,c=$e,u=$e,h,d){super(null,o,a,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rs=class extends Me{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ki=new ne,hh=new ne,cr=[],uh=new An,f0=new ne,fs=new yt,ps=new $n,Cs=class extends yt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Rs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,f0)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new An),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ki),uh.copy(t.boundingBox).applyMatrix4(ki),this.boundingBox.union(uh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new $n),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ki),ps.copy(t.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(ps)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(fs.geometry=this.geometry,fs.material=this.material,fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ps.copy(this.boundingSphere),ps.applyMatrix4(n),t.ray.intersectsSphere(ps)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ki),hh.multiplyMatrices(n,ki),fs.matrixWorld=hh,fs.raycast(t,cr);for(let o=0,a=cr.length;o<a;o++){let l=cr[o];l.instanceId=r,l.object=this,e.push(l)}cr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Rs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ol(new Float32Array(i*this.count),i,this.count,Ul,cn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var Zi=class extends Rn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new At(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},zr=new P,Fr=new P,dh=new ne,ms=new ws,hr=new $n,Ko=new P,fh=new P,al=class extends Ae{constructor(t=new ge,e=new Zi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)zr.fromBufferAttribute(e,i-1),Fr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=zr.distanceTo(Fr);t.setAttribute("lineDistance",new Yt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(i),hr.radius+=r,t.ray.intersectsSphere(hr)===!1)return;dh.copy(i).invert(),ms.copy(t.ray).applyMatrix4(dh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=f,x=m-1;y<x;y+=c){let p=u.getX(y),M=u.getX(y+1),E=ur(this,t,ms,l,p,M);E&&e.push(E)}if(this.isLineLoop){let y=u.getX(m-1),x=u.getX(f),p=ur(this,t,ms,l,y,x);p&&e.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let y=f,x=m-1;y<x;y+=c){let p=ur(this,t,ms,l,y,y+1);p&&e.push(p)}if(this.isLineLoop){let y=ur(this,t,ms,l,m-1,f);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function ur(s,t,e,n,i,r){let o=s.geometry.attributes.position;if(zr.fromBufferAttribute(o,i),Fr.fromBufferAttribute(o,r),e.distanceSqToSegment(zr,Fr,Ko,fh)>n)return;Ko.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Ko);if(!(l<t.near||l>t.far))return{distance:l,point:fh.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}var ph=new P,mh=new P,Is=class extends al{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)ph.fromBufferAttribute(e,i),mh.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ph.distanceTo(mh);t.setAttribute("lineDistance",new Yt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ps=class extends Fe{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Je=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let u=n[i],d=n[i+1]-u,f=(o-u)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new at:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,i=[],r=[],o=[],a=new P,l=new ne;for(let f=0;f<=t;f++){let m=f/t;i[f]=this.getTangentAt(m,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Te(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Te(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Ls=class extends Je{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new at){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ll=class extends Ls{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Fl(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var dr=new P,jo=new Fl,Qo=new Fl,ta=new Fl,cl=class extends Je{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%r]:(dr.subVectors(i[0],i[1]).add(i[0]),c=dr);let h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(dr.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=dr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(h),f),y=Math.pow(h.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f);y<1e-4&&(y=1),m<1e-4&&(m=y),x<1e-4&&(x=y),jo.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,m,y,x),Qo.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,m,y,x),ta.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,m,y,x)}else this.curveType==="catmullrom"&&(jo.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Qo.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),ta.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(jo.calc(l),Qo.calc(l),ta.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function gh(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function p0(s,t){let e=1-s;return e*e*t}function m0(s,t){return 2*(1-s)*s*t}function g0(s,t){return s*s*t}function vs(s,t,e,n){return p0(s,t)+m0(s,e)+g0(s,n)}function x0(s,t){let e=1-s;return e*e*e*t}function y0(s,t){let e=1-s;return 3*e*e*s*t}function v0(s,t){return 3*(1-s)*s*s*t}function _0(s,t){return s*s*s*t}function _s(s,t,e,n,i){return x0(s,t)+y0(s,e)+v0(s,n)+_0(s,i)}var Br=class extends Je{constructor(t=new at,e=new at,n=new at,i=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new at){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_s(t,i.x,r.x,o.x,a.x),_s(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},hl=class extends Je{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_s(t,i.x,r.x,o.x,a.x),_s(t,i.y,r.y,o.y,a.y),_s(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Hr=class extends Je{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ul=class extends Je{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vr=class extends Je{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(vs(t,i.x,r.x,o.x),vs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},dl=class extends Je{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(vs(t,i.x,r.x,o.x),vs(t,i.y,r.y,o.y),vs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Gr=class extends Je{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(gh(a,l.x,c.x,u.x,h.x),gh(a,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new at().fromArray(i))}return this}},xh=Object.freeze({__proto__:null,ArcCurve:ll,CatmullRomCurve3:cl,CubicBezierCurve:Br,CubicBezierCurve3:hl,EllipseCurve:Ls,LineCurve:Hr,LineCurve3:ul,QuadraticBezierCurve:Vr,QuadraticBezierCurve3:dl,SplineCurve:Gr}),fl=class extends Je{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new xh[i.type]().fromJSON(i))}return this}},pl=class extends fl{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Hr(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Vr(this.currentPoint.clone(),new at(t,e),new at(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new Br(this.currentPoint.clone(),new at(t,e),new at(n,i),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Gr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){let c=new Ls(t,e,n,i,r,o,a,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ml=class s extends ge{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Te(i,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],u=1/e,h=new P,d=new at,f=new P,m=new P,y=new P,x=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:x=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-x,f.z=p*0,y.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(y.x,y.y,y.z);break;default:x=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,f.x=p*1,f.y=-x,f.z=p*0,m.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),l.push(f.x,f.y,f.z),y.copy(m)}for(let M=0;M<=e;M++){let E=n+M*u*i,v=Math.sin(E),D=Math.cos(E);for(let A=0;A<=t.length-1;A++){h.x=t[A].x*v,h.y=t[A].y,h.z=t[A].x*D,o.push(h.x,h.y,h.z),d.x=M/e,d.y=A/(t.length-1),a.push(d.x,d.y);let C=l[3*A+0]*v,I=l[3*A+1],S=l[3*A+0]*D;c.push(C,I,S)}}for(let M=0;M<e;M++)for(let E=0;E<t.length-1;E++){let v=E+M*t.length,D=v,A=v+t.length,C=v+t.length+1,I=v+1;r.push(D,A,I),r.push(C,I,A)}this.setIndex(r),this.setAttribute("position",new Yt(o,3)),this.setAttribute("uv",new Yt(a,2)),this.setAttribute("normal",new Yt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},Ji=class s extends ml{constructor(t=1,e=1,n=4,i=8){let r=new pl;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new s(t.radius,t.length,t.capSegments,t.radialSegments)}};var Ne=class s extends ge{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let u=[],h=[],d=[],f=[],m=0,y=[],x=n/2,p=0;M(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Yt(h,3)),this.setAttribute("normal",new Yt(d,3)),this.setAttribute("uv",new Yt(f,2));function M(){let v=new P,D=new P,A=0,C=(e-t)/n;for(let I=0;I<=r;I++){let S=[],w=I/r,L=w*(e-t)+t;for(let z=0;z<=i;z++){let B=z/i,W=B*l+a,Q=Math.sin(W),Y=Math.cos(W);D.x=L*Q,D.y=-w*n+x,D.z=L*Y,h.push(D.x,D.y,D.z),v.set(Q,C,Y).normalize(),d.push(v.x,v.y,v.z),f.push(B,1-w),S.push(m++)}y.push(S)}for(let I=0;I<i;I++)for(let S=0;S<r;S++){let w=y[S][I],L=y[S+1][I],z=y[S+1][I+1],B=y[S][I+1];(t>0||S!==0)&&(u.push(w,L,B),A+=3),(e>0||S!==r-1)&&(u.push(L,z,B),A+=3)}c.addGroup(p,A,0),p+=A}function E(v){let D=m,A=new at,C=new P,I=0,S=v===!0?t:e,w=v===!0?1:-1;for(let z=1;z<=i;z++)h.push(0,x*w,0),d.push(0,w,0),f.push(.5,.5),m++;let L=m;for(let z=0;z<=i;z++){let W=z/i*l+a,Q=Math.cos(W),Y=Math.sin(W);C.x=S*Y,C.y=x*w,C.z=S*Q,h.push(C.x,C.y,C.z),d.push(0,w,0),A.x=Q*.5+.5,A.y=Y*.5*w+.5,f.push(A.x,A.y),m++}for(let z=0;z<i;z++){let B=D+z,W=L+z;v===!0?u.push(W,W+1,B):u.push(W+1,W,B),I+=3}c.addGroup(p,I,v===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Wr=class s extends Ne{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},gl=class s extends ge{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),c(n),u(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){let E=new P,v=new P,D=new P;for(let A=0;A<e.length;A+=3)f(e[A+0],E),f(e[A+1],v),f(e[A+2],D),l(E,v,D,M)}function l(M,E,v,D){let A=D+1,C=[];for(let I=0;I<=A;I++){C[I]=[];let S=M.clone().lerp(v,I/A),w=E.clone().lerp(v,I/A),L=A-I;for(let z=0;z<=L;z++)z===0&&I===A?C[I][z]=S:C[I][z]=S.clone().lerp(w,z/L)}for(let I=0;I<A;I++)for(let S=0;S<2*(A-I)-1;S++){let w=Math.floor(S/2);S%2===0?(d(C[I][w+1]),d(C[I+1][w]),d(C[I][w])):(d(C[I][w+1]),d(C[I+1][w+1]),d(C[I+1][w]))}}function c(M){let E=new P;for(let v=0;v<r.length;v+=3)E.x=r[v+0],E.y=r[v+1],E.z=r[v+2],E.normalize().multiplyScalar(M),r[v+0]=E.x,r[v+1]=E.y,r[v+2]=E.z}function u(){let M=new P;for(let E=0;E<r.length;E+=3){M.x=r[E+0],M.y=r[E+1],M.z=r[E+2];let v=x(M)/2/Math.PI+.5,D=p(M)/Math.PI+.5;o.push(v,1-D)}m(),h()}function h(){for(let M=0;M<o.length;M+=6){let E=o[M+0],v=o[M+2],D=o[M+4],A=Math.max(E,v,D),C=Math.min(E,v,D);A>.9&&C<.1&&(E<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),D<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,E){let v=M*3;E.x=t[v+0],E.y=t[v+1],E.z=t[v+2]}function m(){let M=new P,E=new P,v=new P,D=new P,A=new at,C=new at,I=new at;for(let S=0,w=0;S<r.length;S+=9,w+=6){M.set(r[S+0],r[S+1],r[S+2]),E.set(r[S+3],r[S+4],r[S+5]),v.set(r[S+6],r[S+7],r[S+8]),A.set(o[w+0],o[w+1]),C.set(o[w+2],o[w+3]),I.set(o[w+4],o[w+5]),D.copy(M).add(E).add(v).divideScalar(3);let L=x(D);y(A,w+0,M,L),y(C,w+2,E,L),y(I,w+4,v,L)}}function y(M,E,v,D){D<0&&M.x===1&&(o[E]=M.x-1),v.x===0&&v.z===0&&(o[E]=D/2/Math.PI+.5)}function x(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}};var fr=new P,pr=new P,ea=new P,mr=new Mn,$r=class extends ge{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(Mr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);let{a:y,b:x,c:p}=mr;if(y.fromBufferAttribute(a,c[0]),x.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),mr.getNormal(ea),h[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,h[1]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,h[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let M=0;M<3;M++){let E=(M+1)%3,v=h[M],D=h[E],A=mr[u[M]],C=mr[u[E]],I=`${v}_${D}`,S=`${D}_${v}`;S in d&&d[S]?(ea.dot(d[S].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(C.x,C.y,C.z)),d[S]=null):I in d||(d[I]={index0:c[M],index1:c[E],normal:ea.clone()})}}for(let m in d)if(d[m]){let{index0:y,index1:x}=d[m];fr.fromBufferAttribute(a,y),pr.fromBufferAttribute(a,x),f.push(fr.x,fr.y,fr.z),f.push(pr.x,pr.y,pr.z)}this.setAttribute("position",new Yt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Xr=class s extends gl{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Ds=class s extends ge{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],u=[],h=t,d=(e-t)/i,f=new P,m=new at;for(let y=0;y<=i;y++){for(let x=0;x<=n;x++){let p=r+x/n*o;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,u.push(m.x,m.y)}h+=d}for(let y=0;y<i;y++){let x=y*(n+1);for(let p=0;p<n;p++){let M=p+x,E=M,v=M+n+1,D=M+n+2,A=M+1;a.push(E,v,A),a.push(v,D,A)}}this.setIndex(a),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var qn=class s extends ge{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],h=new P,d=new P,f=[],m=[],y=[],x=[];for(let p=0;p<=n;p++){let M=[],E=p/n,v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let D=0;D<=e;D++){let A=D/e;h.x=-t*Math.cos(i+A*r)*Math.sin(o+E*a),h.y=t*Math.cos(o+E*a),h.z=t*Math.sin(i+A*r)*Math.sin(o+E*a),m.push(h.x,h.y,h.z),d.copy(h).normalize(),y.push(d.x,d.y,d.z),x.push(A+v,1-E),M.push(c++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let E=u[p][M+1],v=u[p][M],D=u[p+1][M],A=u[p+1][M+1];(p!==0||o>0)&&f.push(E,v,A),(p!==n-1||l<Math.PI)&&f.push(v,D,A)}this.setIndex(f),this.setAttribute("position",new Yt(m,3)),this.setAttribute("normal",new Yt(y,3)),this.setAttribute("uv",new Yt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Xt=class extends Rn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new At(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Dh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function gr(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function b0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Ki=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},xl=class extends Ki{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fc,endingEnd:fc}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case pc:r=t,a=2*e-n;break;case mc:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case pc:o=t,l=2*n-e;break;case mc:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(i-e),y=m*m,x=y*m,p=-d*x+2*d*y-d*m,M=(1+d)*x+(-1.5-2*d)*y+(-.5+d)*m+1,E=(-1-f)*x+(1.5+f)*y+.5*m,v=f*x-f*y;for(let D=0;D!==a;++D)r[D]=p*o[u+D]+M*o[c+D]+E*o[l+D]+v*o[h+D];return r}},yl=class extends Ki{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=(n-e)/(i-e),h=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*h+o[l+d]*u;return r}},vl=class extends Ki{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},sn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=gr(e,this.TimeBufferType),this.values=gr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:gr(t.times,Array),values:gr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new vl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new yl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new xl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case wr:e=this.InterpolantFactoryMethodDiscrete;break;case Ha:e=this.InterpolantFactoryMethodLinear;break;case Mo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wr;case this.InterpolantFactoryMethodLinear:return Ha;case this.InterpolantFactoryMethodSmooth:return Mo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&b0(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Mo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],u=t[a+1];if(c!==u&&(a!==1||c!==t[0]))if(i)l=!0;else{let h=a*n,d=h-n,f=h+n;for(let m=0;m!==n;++m){let y=e[h+m];if(y!==e[d+m]||y!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};sn.prototype.TimeBufferType=Float32Array;sn.prototype.ValueBufferType=Float32Array;sn.prototype.DefaultInterpolation=Ha;var fi=class extends sn{constructor(t,e,n){super(t,e,n)}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=wr;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var _l=class extends sn{};_l.prototype.ValueTypeName="color";var bl=class extends sn{};bl.prototype.ValueTypeName="number";var Ml=class extends Ki{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let u=c+a;c!==u;c+=4)qe.slerpFlat(r,0,o,c-a,o,c,l);return r}},Yr=class extends sn{InterpolantFactoryMethodLinear(t){return new Ml(this.times,this.values,this.getValueSize(),t)}};Yr.prototype.ValueTypeName="quaternion";Yr.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends sn{constructor(t,e,n){super(t,e,n)}};pi.prototype.ValueTypeName="string";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=wr;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var wl=class extends sn{};wl.prototype.ValueTypeName="vector";var Sl=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null}}},M0=new Sl,El=class{constructor(t){this.manager=t!==void 0?t:M0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};El.DEFAULT_MATERIAL_NAME="__DEFAULT";var qr=class extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new At(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Zn=class extends qr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new At(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},na=new ne,yh=new P,vh=new P,Tl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Es,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;yh.setFromMatrixPosition(t.matrixWorld),e.position.copy(yh),vh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vh),e.updateMatrixWorld(),na.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(na),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(na)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Al=class extends Tl{constructor(){super(new Lr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Jn=class extends qr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new Al}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Bl="\\[\\]\\.:\\/",w0=new RegExp("["+Bl+"]","g"),Hl="[^"+Bl+"]",S0="[^"+Bl.replace("\\.","")+"]",E0=/((?:WC+[\/:])*)/.source.replace("WC",Hl),T0=/(WCOD+)?/.source.replace("WCOD",S0),A0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hl),R0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hl),C0=new RegExp("^"+E0+T0+A0+R0+"$"),I0=["material","materials","bones","map"],Rl=class{constructor(t,e,n){let i=n||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},pe=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(w0,"")}static parseTrackName(t){let e=C0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);I0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Rl;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var sx=new Float32Array(1);var _h=new ne,Kn=class{constructor(t,e,n=0,i=1/0){this.ray=new ws(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ss,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _h.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_h),this}intersectObject(t,e=!0,n=[]){return Cl(t,this,n,e),n.sort(bh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Cl(t[i],this,n,e);return n.sort(bh),n}};function bh(s,t){return s.distance-t.distance}function Cl(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Cl(r[o],t,e,!0)}}var Zr=class extends Is{constructor(t=10,e=10,n=4473924,i=8947848){n=new At(n),i=new At(i);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,f=0,m=-a;d<=e;d++,m+=o){l.push(-a,0,m,a,0,m),l.push(m,0,-a,m,0,a);let y=d===r?n:i;y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3,y.toArray(c,f),f+=3}let u=new ge;u.setAttribute("position",new Yt(l,3)),u.setAttribute("color",new Yt(c,3));let h=new Zi({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var dn=class extends Error{constructor(t,e){super(e?.message||"Request failed"),this.status=t,this.code=e?.error||"ERROR",this.data=e||{}}};async function Wh(s,t,e,n={}){let i;try{i=await fetch(t,{method:s,credentials:"same-origin",headers:e!==void 0&&!n.raw?{"content-type":"application/json",...n.headers||{}}:n.headers||{},body:n.raw?e:e!==void 0?JSON.stringify(e):void 0})}catch{throw new dn(0,{error:"NETWORK",message:"Cannot reach the server. Check your connection."})}let r=null;try{r=await i.json()}catch{}if(!i.ok)throw new dn(i.status,r||{message:`Server error (${i.status})`});return r}var Kt=s=>Wh("GET",s),St=(s,t={})=>Wh("POST",s,t),mt=s=>"\u20A6"+Math.round(s).toLocaleString("en-NG"),st=(s,t=document)=>t.querySelector(s),Vl=(s,t=document)=>[...t.querySelectorAll(s)];function g(s,t={},...e){let n=document.createElement(s);for(let[i,r]of Object.entries(t||{}))i==="class"?n.className=r:i.startsWith("on")?n.addEventListener(i.slice(2),r):r!==!1&&r!=null&&n.setAttribute(i,r===!0?"":r);for(let i of e.flat())i!=null&&i!==!1&&n.append(i.nodeType?i:document.createTextNode(String(i)));return n}function Xh(s,t=!1){let e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new ge,c=0;for(let u=0;u<s.length;++u){let h=s[u],d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(e){let u=0,h=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let m=0;m<f.count;++m)h.push(f.getX(m)+u);u+=s[d].attributes.position.count}l.setIndex(h)}for(let u in r){let h=$h(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(let u in o){let h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){let f=[];for(let y=0;y<o[u].length;++y)f.push(o[u][y][d]);let m=$h(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(m)}}return l}function $h(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){let u=s[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new Me(o,e,n),l=0;for(let c=0;c<s.length;++c){let u=s[c];if(u.isInterleavedBufferAttribute){let h=l/e;for(let d=0,f=u.count;d<f;d++)for(let m=0;m<e;m++){let y=u.getComponent(d,m);a.setComponent(d+h,m,y)}}else o.set(u.array,l);l+=u.count*e}return i!==void 0&&(a.gpuType=i),a}function ts(s){return function(){s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Qr=new At,Gl=new ne,to=new qe,eo=new Ze,no=new P,io=new P,Be=class{constructor(t=1,e=.035){this.parts=[],this.rnd=ts(t),this.jit=e,this.uvScale=.14}_col(t,e){Qr.set(t);let n=1+(this.rnd()*2-1)*(e??this.jit);return[Qr.r*n,Qr.g*n,Qr.b*n]}_push(t,e,n,i,r,o={}){t.index&&(t=t.toNonIndexed()),eo.set(o.rx||0,o.ry||0,o.rz||0,"YXZ"),to.setFromEuler(eo),no.set(e,n,i),io.set(o.sx??1,o.sy??1,o.sz??1),Gl.compose(no,to,io),t.applyMatrix4(Gl);let a=t.attributes.position,l=t.attributes.normal,c=a.count,u=new Float32Array(c*3),h=t.attributes.uv&&o.keepUV?null:new Float32Array(c*2),[d,f,m]=this._col(r,o.jit);for(let y=0;y<c;y++){let x=1;if(!o.noAO&&Math.abs(l.getY(y))<.5&&(x=.8+.2*Math.min(1,Math.max(0,a.getY(y)/2.4))),o.shade&&(x*=o.shade),u[y*3]=d*x,u[y*3+1]=f*x,u[y*3+2]=m*x,h){let p=Math.abs(l.getX(y)),M=Math.abs(l.getY(y)),E=Math.abs(l.getZ(y)),v=a.getX(y),D=a.getY(y),A=a.getZ(y),C,I;M>=p&&M>=E?(C=v,I=A):p>=E?(C=A,I=D):(C=v,I=D),h[y*2]=C*this.uvScale,h[y*2+1]=I*this.uvScale}}t.setAttribute("color",new Me(u,3)),h&&t.setAttribute("uv",new Me(h,2));for(let y of Object.keys(t.attributes))["position","normal","color","uv"].includes(y)||t.deleteAttribute(y);return this.parts.push(t),this}box(t,e,n,i,r,o,a,l){return this._push(new qt(t,e,n),i,r+e/2,o,a,l)}cyl(t,e,n,i,r,o,a,l,c){return this._push(new Ne(t,e,n,i),r,o+n/2,a,l,c)}wheel(t,e,n,i,r,o,a={}){return this._push(new Ne(t,t,e,10),n,i,r,o,{...a,rx:Math.PI/2,noAO:!0})}sphere(t,e,n,i,r,o={}){return this._push(new qn(t,o.ws||8,o.hs||6),e,n,i,r,o)}ico(t,e,n,i,r,o={}){return this._push(new Xr(t,o.detail||0),e,n,i,r,o)}capsule(t,e,n,i,r,o,a={}){return this._push(new Ji(t,e,3,8),n,i+t+e/2,r,o,a)}cone(t,e,n,i,r,o,a,l){return this.cyl(.001,t,e,n,i,r,o,a,l)}plane(t,e,n,i,r,o,a){return this._push(new Re(t,e),n,i,r,o,a)}gable(t,e,n,i,r,o,a,l={}){let c=t/2,u=e/2,h=[[-c,0,-u],[c,0,-u],[c,0,u],[-c,0,u],[0,n,-u],[0,n,u]],d=[[0,3,5,0,5,4],[1,4,5,1,5,2],[0,4,1],[3,2,5],[0,1,2,0,2,3]],f=[];for(let y of d)for(let x of y)f.push(...h[x]);let m=new ge;return m.setAttribute("position",new Yt(f,3)),m.computeVertexNormals(),this._push(m,i,r,o,a,l)}quad(t,e,n,i,r,o={}){let a=new ge;return a.setAttribute("position",new Yt([...t,...e,...n,...t,...n,...i],3)),a.computeVertexNormals(),this._push(a,0,0,0,r,o)}uvQuad(t,e,n,i,r,o=16777215,a={}){let l=new ge;l.setAttribute("position",new Yt([...t,...e,...n,...t,...n,...i],3));let[c,u,h,d,f,m,y,x]=r;return l.setAttribute("uv",new Yt([c,u,h,d,f,m,c,u,f,m,y,x],2)),l.computeVertexNormals(),this._push(l,0,0,0,o,{...a,keepUV:!0,noAO:!0})}addGeo(t,e,n,i,r=0){let o=t.clone();return eo.set(0,r,0),to.setFromEuler(eo),no.set(e,n,i),io.set(1,1,1),o.applyMatrix4(Gl.compose(no,to,io)),this.parts.push(o),this}build(){if(!this.parts.length)return new ge;let t=Xh(this.parts,!1);return this.parts.forEach(e=>e.dispose()),this.parts=[],t.computeBoundingSphere(),t.computeBoundingBox(),t}};var In=(s,t)=>{let e=document.createElement("canvas");return e.width=s,e.height=t,e};function Wl(s){let t=s;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Pn=(s,t=!1)=>{let e=new Ps(s);return e.colorSpace=Ue,e.anisotropy=4,t&&(e.wrapS=e.wrapT=bs),e};function Yh(){let t=In(128,128),e=In(128,128),n=t.getContext("2d"),i=e.getContext("2d");n.fillStyle="#ffffff",n.fillRect(0,0,128,128),i.fillStyle="#000",i.fillRect(0,0,128,128);let r=(o,a)=>{o.fillStyle=a,o.fillRect(34,30,60,56)};return r(n,"#6f8796"),n.fillStyle="rgba(0,0,0,.18)",n.fillRect(34,30,60,3),n.fillRect(34,83,60,3),n.fillRect(62,30,4,56),n.fillStyle="rgba(0,0,0,.08)",n.fillRect(0,118,128,10),r(i,"#ffd27a"),{map:Pn(t,!0),emissiveMap:Pn(e,!0)}}function qh(){let s=In(64,256),t=s.getContext("2d"),e=Wl(3);t.fillStyle="#34373c",t.fillRect(0,0,64,256);for(let i=0;i<500;i++){let r=40+e()*30;t.fillStyle=`rgb(${r},${r+2},${r+5})`,t.fillRect(e()*64,e()*256,1+e()*2,1+e()*2)}t.fillStyle="#e8e6df",t.fillRect(2,0,2,256),t.fillRect(60,0,2,256),t.fillStyle="#f2c744";for(let i=0;i<256;i+=64)t.fillRect(30,i+8,4,36);return Pn(s,!0)}function Zh(){let s=In(128,128),t=s.getContext("2d"),e=Wl(8);t.fillStyle="#b9b5a6",t.fillRect(0,0,128,128);for(let n=0;n<700;n++){let i=150+e()*60;t.fillStyle=`rgba(${i},${i-4},${i-14},.5)`,t.fillRect(e()*128,e()*128,1+e()*3,1+e()*3)}t.strokeStyle="rgba(80,76,66,.35)",t.lineWidth=1;for(let n=0;n<=128;n+=32)t.beginPath(),t.moveTo(n,0),t.lineTo(n,128),t.moveTo(0,n),t.lineTo(128,n),t.stroke();return Pn(s,!0)}function Jh(){let s=In(256,256),t=s.getContext("2d"),e=Wl(12);t.fillStyle="#2b6f8a",t.fillRect(0,0,256,256);for(let n=0;n<160;n++){t.strokeStyle=`rgba(255,255,255,${.05+e()*.12})`,t.lineWidth=1+e()*2;let i=e()*256,r=e()*256;t.beginPath(),t.moveTo(i,r),t.quadraticCurveTo(i+14,r-5,i+30,r),t.stroke()}return Pn(s,!0)}function so(){let s=In(64,64),t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,.55)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Pn(s)}function Kh(s,t="#ffffff"){let e=In(256,64),n=e.getContext("2d");n.font="700 30px Nunito, system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle";let i=Math.min(244,n.measureText(s).width+24);n.fillStyle="rgba(0,0,0,.55)",n.beginPath(),n.roundRect(128-i/2,10,i,44,14),n.fill(),n.fillStyle=t,n.fillText(s,128,33);let r=new Ps(e);return r.colorSpace=Ue,r}function jh(s,t,e,n="Advertise here: /advertise",i=0){let r=In(s,t),o=r.getContext("2d"),a=[["#0b6b3a","#f6c744"],["#1e3a8a","#fb923c"],["#7c2d12","#fde68a"],["#14532d","#ffffff"]],[l,c]=a[i%a.length],u=o.createLinearGradient(0,0,s,t);u.addColorStop(0,l),u.addColorStop(1,"#0a0a0a"),o.fillStyle=u,o.fillRect(0,0,s,t),o.fillStyle=c,o.globalAlpha=.12;for(let h=0;h<8;h++)o.beginPath(),o.arc(s*(h/7),t*.9,t*.35,0,7),o.fill();return o.globalAlpha=1,o.fillStyle=c,o.textAlign="center",o.font=`800 ${Math.round(t*.2)}px "Lilita One", Nunito, sans-serif`,o.fillText("YOUR AD HERE",s/2,t*.42),o.fillStyle="#fff",o.font=`700 ${Math.round(t*.085)}px Nunito, sans-serif`,o.fillText(n,s/2,t*.58),o.font=`600 ${Math.round(t*.06)}px Nunito, sans-serif`,o.globalAlpha=.75,o.fillText(e,s/2,t*.72),o.globalAlpha=1,o.fillStyle="rgba(255,255,255,.85)",o.font=`700 ${Math.round(t*.05)}px Nunito, sans-serif`,o.textAlign="right",o.fillText("House ad",s-14,t-12),Pn(r)}function Qh(s,t,e,n){let i=In(t,e),r=i.getContext("2d");return r.fillStyle="#111",r.fillRect(0,0,t,e),r.drawImage(s,0,0,t,e),r.fillStyle="rgba(0,0,0,.6)",r.fillRect(t-190,e-36,190,36),r.fillStyle="#fff",r.font="700 20px Nunito, sans-serif",r.textAlign="right",r.fillText("Sponsored \xB7 "+String(n||"").slice(0,14),t-10,e-11),Pn(i)}function tu(s,t){return Pn(s,t)}var ro=(s,t,e)=>new At(s).lerp(new At(t),e);function P0(s,t,e="#fff",n=512,i=128){let r=document.createElement("canvas");r.width=n,r.height=i;let o=r.getContext("2d");o.fillStyle=t,o.fillRect(0,0,n,i),o.strokeStyle="rgba(255,255,255,.7)",o.lineWidth=6,o.strokeRect(6,6,n-12,i-12),o.fillStyle=e,o.textAlign="center",o.textBaseline="middle";let a=62;for(o.font=`${a}px "Lilita One", Nunito, sans-serif`;o.measureText(s).width>n-40&&a>18;)a-=4,o.font=`${a}px "Lilita One", Nunito, sans-serif`;return o.fillText(s,n/2,i/2+3),tu(r)}function eu(s){let t=new Yn,e=new fe;t.add(e);let n=[],i={},r={},o=[],a=new Zn(14675967,7036746,.9);t.add(a);let l=new Jn(16773590,1.4);l.position.set(120,200,80),t.add(l);let c=new Xt({vertexColors:!0}),u=Yh(),h=new Xt({vertexColors:!0,map:u.map,emissive:16777215,emissiveMap:u.emissiveMap,emissiveIntensity:0}),d=_=>{let G=new Be(_,.04);return G.uvScale=1/3.4,G},f=new Be(7,.03),m=d(11),y=new Be(5,0),x=ts(99),p=s.bounds,M=Zh();M.repeat.set(60,60);let E=new yt(new Re(900,900).rotateX(-Math.PI/2),new Xt({map:M,color:13617590}));E.position.set(0,-.02,-60),e.add(E);for(let _ of s.zones)f.box(_.x1-_.x0+6,.2,_.z1-_.z0+6,(_.x0+_.x1)/2,-.02,(_.z0+_.z1)/2,12433318,{noAO:!0,jit:.02});let v=qh(),D=[];for(let _ of s.roads){let G=Math.hypot(_.x2-_.x1,_.z2-_.z1),q=Math.abs(_.x2-_.x1)>Math.abs(_.z2-_.z1),rt=v.clone();rt.needsUpdate=!0,rt.repeat.set(1,G/56);let ot=new yt(new Re(_.width,G).rotateX(-Math.PI/2),new Xt({map:rt}));ot.position.set((_.x1+_.x2)/2,.02+(q?0:.005),(_.z1+_.z2)/2),q&&(ot.rotation.y=Math.PI/2),e.add(ot)}let A=s.roads.filter(_=>_.x1===_.x2).map(_=>_.x1),C=s.roads.filter(_=>_.z1===_.z2).map(_=>_.z1);for(let _ of A)for(let G of C){f.box(14,.05,14,_,0,G,3422012,{noAO:!0,jit:0});for(let q=-3;q<=3;q++)for(let[rt,ot,Ct,It]of[[0,-8.5,1,3],[0,8.5,1,3],[-8.5,0,3,1],[8.5,0,3,1]])f.box(Ct,.06,It,_+rt+(rt===0?q*1.8:0),0,G+ot+(ot===0?q*1.8:0),15658730,{noAO:!0,jit:0})}for(let _ of s.zones)for(let G=_.x0+12;G<_.x1-6;G+=38)for(let q of[_.z0+2,_.z1-2])I(f,G,q);function I(_,G,q){_.cyl(.12,.16,6.5,6,G,0,q,3882821,{noAO:!0}),_.box(1.4,.18,.3,G,6.4,q,3882821,{noAO:!0}),_.box(.6,.16,.4,G+.55,6.22,q,16773296,{noAO:!0,jit:0})}function S(_,G,q,rt=1){let ot=7*rt;_.cyl(.22*rt,.35*rt,ot,6,G,0,q,9071173,{noAO:!0});for(let Ct=0;Ct<7;Ct++){let It=Ct/7*Math.PI*2;_.box(.5*rt,.1,3.4*rt,G+Math.cos(It)*1.6*rt,ot+.1,q+Math.sin(It)*1.6*rt,3116858,{ry:-It+Math.PI/2,rx:.5,noAO:!0})}}for(let _=-230;_<240;_+=24)S(f,_,148+(x()*6-3),.9+x()*.5);for(let _=0;_<40;_++){let G=s.zones[x()*12|0];if(!G)continue;let q=G.x0+3+x()*(G.x1-G.x0-6),rt=G.z0+(x()<.5?3:G.z1-G.z0-3);rt<140&&S(f,q,rt,.7+x()*.4)}let w=[],L=(_,G,q,rt,ot,Ct,It,Pt)=>{let Wt=new yt(new Re(Ct,It),new _e({map:P0(_,G),side:hn}));return Wt.position.set(q,rt,ot),Wt.rotation.y=Math.atan2(Pt[0],Pt[1]),e.add(Wt),w.push(Wt),Wt},z=(_,G=.08)=>[_.x+_.face[0]*(_.w/2+G),_.z+_.face[1]*(_.d/2+G)];for(let _ of s.buildings){let G=_.w/2,q=_.d/2;n.push({id:_.id,h:_.h,x0:_.x-G-.6,x1:_.x+G+.6,z0:_.z-q-.6,z1:_.z+q+.6});let[rt,ot]=_.face,Ct=Math.atan2(rt,ot);if(_.kind==="house"){if(m.box(_.w,_.h,_.d,_.x,0,_.z,_.color),_.tier===1){f.box(_.w+.6,.5,_.d+.6,_.x,_.h,_.z,7040368);for(let me=0;me<3;me++)f.box(1.2,1.4,1.2,_.x-_.w/3+me*(_.w/3),_.h+.5,_.z-_.d/4,3100527)}else f.gable(_.w+1.2,_.d+1.2,_.tier===3?3.4:2.6,_.x,_.h,_.z,_.roof);let[It,Pt]=z(_,.04),Wt=1.9;f.box(Math.abs(ot)>0?Wt:.3,2.8,Math.abs(ot)>0?.3:Wt,It,0,Pt,4861724,{noAO:!0}),f.box(Math.abs(ot)>0?3.4:1.6,.3,Math.abs(ot)>0?1.6:3.4,It+rt*.8,0,Pt+ot*.8,11117462,{noAO:!0}),_.tier===3&&f.box(Math.abs(ot)>0?_.w*.5:2,.25,Math.abs(ot)>0?2:_.d*.5,_.x+rt*(G+.8),_.h*.62,_.z+ot*(q+.8),12038821,{noAO:!0})}else if(_.kind==="tower")m.box(_.w,_.h,_.d,_.x,0,_.z,_.color),f.box(_.w*.7,3,_.d*.7,_.x,_.h,_.z,5990256),f.cyl(.2,.3,14,5,_.x,_.h+3,_.z,11580858,{noAO:!0}),f.box(.8,.8,.8,_.x,_.h+17,_.z,16726832,{noAO:!0,jit:0}),f.box(_.w+.4,1.4,_.d+.4,_.x,0,_.z,4936538,{noAO:!0});else if(_.kind==="shop"){m.box(_.w,_.h,_.d,_.x,0,_.z,_.color),f.box(_.w+.8,.4,_.d+.8,_.x,_.h,_.z,9080724);let[It,Pt]=z(_,.6);f.box(Math.abs(ot)?_.w-2:2.6,.3,Math.abs(ot)?2.6:_.d-2,It,3.9,Pt,13646123,{noAO:!0});let[Wt,U]=z(_,.12);L(_.label,_.sign||"#2c6fbb",Wt,5.4,U,Math.min(_.w-3,16),2.6,_.face);let[me,$t]=z(_,.05);y.box(Math.abs(ot)?4:.2,2.6,Math.abs(ot)?.2:4,me,.2,$t,10274777,{noAO:!0,jit:0})}else if(_.kind==="market"){for(let U of[-1,1])for(let me of[-1,1])f.cyl(.25,.25,4.4,6,_.x+U*(G-1),0,_.z+me*(q-1),7162945,{noAO:!0});f.box(_.w+1,.4,_.d+1,_.x,4.4,_.z,12554031,{noAO:!0});let It=[14172949,2001125,4431943,16635957,9315498,16011550];for(let U=0;U<12;U++){let me=_.x-G+3+U%4*((_.w-6)/3),$t=_.z-q+5+Math.floor(U/4)*((_.d-10)/2);f.box(3.4,1,1.8,me,0,$t,It[U%It.length]),f.box(3.8,.12,2.2,me,2.6,$t,It[(U+2)%It.length],{noAO:!0})}let[Pt,Wt]=z(_,.5);L("BALOGUN-STYLE MARKET","#8d3b13",Pt,5.9,Wt,22,2.4,_.face)}else if(_.kind==="office"||_.kind==="kiosk"){if(m.box(_.w,_.h,_.d,_.x,0,_.z,_.color),f.box(_.w+.6,.3,_.d+.6,_.x,_.h,_.z,7040368),_.label){let[It,Pt]=z(_,.12);L(_.label,"#0b6b3a",It,_.h-1.3,Pt,Math.min(_.w-1,14),2.2,_.face)}}else if(_.kind==="airport"){m.box(_.w,_.h,_.d,_.x,0,_.z,_.color),f.box(_.w+6,.8,_.d+6,_.x,_.h,_.z,8951203),f.box(_.w*.9,2.2,3,_.x,3,_.z+_.d/2+.3,4877190,{noAO:!0}),f.box(8,26,8,_.x+_.w/2+12,0,_.z-6,13620957),f.box(12,6,12,_.x+_.w/2+12,26,_.z-6,7311272);let[It,Pt]=z(_,.12);L("AIRPORT (placeholder)","#124d8a",It,_.h+4,Pt,40,4,_.face)}}let B=s.landmarks.find(_=>_.id==="plaza");if(B){let _=B.x-52,G=B.z-52;f.box(30,.3,30,_,0,G,14143421,{noAO:!0}),f.cyl(5,5.5,.9,16,_,.3,G,9411235),f.cyl(.5,.7,3.5,8,_,.3,G,9411235),f.cyl(2.2,.6,.5,12,_,3.7,G,8376808,{noAO:!0});for(let q of[0,1,2,3])f.box(3,.6,1,_+Math.cos(q*1.57)*9,.3,G+Math.sin(q*1.57)*9,7162945,{ry:-q*1.57});f.cyl(.12,.12,14,6,_+12,.3,G-12,14540253,{noAO:!0});for(let[q,rt]of[[0,34641],[1,16777215],[2,34641]])f.box(.15,1.5,1.1,_+12+.1,11,G-12-.55+q*1.1,rt,{noAO:!0,jit:0});o.push({text:B.name,x:_,z:G})}let W=new Xt({color:2106154});for(let _ of s.billboards){let G=new fe;G.position.set(_.x,0,_.z),G.rotation.y=Math.atan2(_.nx,_.nz),e.add(G);let q=_.y,rt=Wt=>{let U=new yt(new Ne(.3,.38,q+_.h/2,8),W);U.position.set(Wt,(q+_.h/2)/2,-.4),G.add(U)};rt(-_.w*.3),rt(_.w*.3);let ot=new yt(new qt(_.w+.9,_.h+.9,.5),W);ot.position.set(0,q,0),G.add(ot);let Ct=new _e({color:16777215}),It=new yt(new Re(_.w,_.h),Ct);It.position.set(0,q,.27),G.add(It);let Pt=new yt(new qt(_.w+1.2,.25,.9),W);if(Pt.position.set(0,q+_.h/2+.55,.05),G.add(Pt),_.surface==="lagoon_plot"){let Wt=new yt(new qt(_.w+4,1.4,5),new Xt({color:9141602}));Wt.position.set(0,-.2,-.4),G.add(Wt)}i[_.id]={def:_,group:G,panel:It,mat:Ct,current:null}}let Q=Jh();Q.repeat.set(20,8);let Y=new yt(new Re(s.water.maxX-s.water.minX,s.water.maxZ-s.water.minZ).rotateX(-Math.PI/2),new Xt({map:Q,transparent:!0,opacity:.92}));Y.position.set(0,-.5,(s.water.minZ+s.water.maxZ)/2),e.add(Y),f.box(s.bounds.maxX-s.bounds.minX+40,1.2,4,0,-.9,p.maxZ-1,10130047,{noAO:!0});let et=new Be(31,.05);for(let _=0;_<26;_++){let G=-420+_*34+x()*10;et.box(14+x()*14,30+x()*70,14,G,-2,-340-x()*40,8031651,{noAO:!0})}for(let _=0;_<20;_++){let G=-330+_*34;et.box(26,1.6,6,G,12,310,9080210,{noAO:!0}),_%4===0&&et.box(2,26,2,G,-2,310,9080210,{noAO:!0})}let $=new yt(et.build(),new Xt({vertexColors:!0,fog:!0}));e.add($);for(let[_,G]of[[f,c],[m,h],[y,c]]){let q=_.build();q.attributes.position&&e.add(new yt(q,G))}let ct=new Wr(.8,1.6,4).rotateX(Math.PI);for(let _ of s.properties){let G=new yt(ct,new _e({color:3523691}));G.position.set(_.door.x,5.2,_.door.z),e.add(G),r[_.id]=G}let gt={available:3523691,taken:9080728,yours:16761358},Rt={x:.004},Gt=new At("#9fd3ee");t.fog=new Nr(Gt,140,520);let te=0;return{scene:t,colliders:n,boards:i,doorMarkers:r,labels:o,root:e,setMarkers(_){for(let G of _){let q=r[G.id];q&&q.material.color.setHex(gt[G.status]||3523691)}},setTime(_){let q=(_/1440-.25)*Math.PI*2,rt=Math.sin(q),ot=Math.max(0,Math.min(1,rt*1.8+.25));te=1-ot;let Ct=Math.max(0,1-Math.abs(rt)*3.2),It=ro(ro("#0a1230","#8fd0f5",ot),"#f08a4b",Ct*.7);return t.background=It,t.fog.color.copy(It),l.intensity=.15+ot*1.4,l.color.set(ro("#fff1d6","#ff9a55",Ct)),l.position.set(Math.cos(q)*200,Math.max(30,Math.sin(q)*220),80),a.intensity=.35+ot*.65,a.color.set(ro("#2b3a6b","#dfefff",ot)),h.emissiveIntensity=te*.95,{day:ot,night:te}},animate(_){Q.offset.x+=_*.004,Q.offset.y+=_*.002},get night(){return te}}}var L0=1513499,jn=2634815,nu=16761358;function iu(s,t,e,n=.4,i=.3){for(let r of t)for(let o of e)s.wheel(n,i,r,n,o,1710620),s.wheel(n*.5,i+.04,r,n,o,10133670)}function su(s){let t=new Be(11+(s?s()*99|0:0),.02),e=4.9;iu(t,[1.55,-1.55],[.98,-.98],.42,.32),t.box(e,.85,2,0,.32,0,15313152),t.box(e,1.2,1.96,0,1.15,0,nu),t.box(e+.02,.26,2.04,0,.98,0,L0),t.box(e-.4,.1,1.94,0,2.35,0,14260736);for(let n of[1,-1]){for(let i=0;i<4;i++)t.plane(1,.62,-1.7+i*1.15,1.72,n*1,jn,{ry:n>0?0:Math.PI,noAO:!0});t.box(.08,.5,.03,.2,1.45,n*.99,2236962)}t.quad([2.46,1.35,.9],[2.46,1.35,-.9],[2.46,2.25,-.8],[2.46,2.25,.8],jn,{noAO:!0}),t.quad([-2.46,1.35,-.9],[-2.46,1.35,.9],[-2.46,2.25,.8],[-2.46,2.25,-.8],jn,{noAO:!0}),t.box(.18,.28,2.1,2.45,.28,0,2237480),t.box(.18,.28,2.1,-2.45,.28,0,2237480);for(let n of[.7,-.7])t.box(.06,.2,.32,2.46,.78,n,16774348,{noAO:!0}),t.box(.06,.2,.3,-2.46,.78,n*1.1,15022389,{noAO:!0});return t.box(3.4,.05,1.7,-.2,2.46,0,3355443),t.box(1.1,.5,.8,-.9,2.5,.2,9268835),t.box(.9,.4,.7,.5,2.5,-.3,4157365),t.box(.5,.35,.5,1.2,2.5,.35,12986408),t.box(.1,.12,.9,2.2,2.36,0,1118481),t.build()}function ru(s=nu,t=1513499){let e=new Be(21,.02);e.wheel(.3,.2,1.2,.3,0,1710620);for(let n of[.68,-.68])e.wheel(.3,.22,-.65,.3,n,1710620);e.box(2.1,.7,1.2,-.3,.3,0,s),e.box(.9,.8,.62,1.05,.3,0,s),e.quad([1.52,1.1,.3],[1.52,1.1,-.3],[1,1.75,-.3],[1,1.75,.3],jn,{noAO:!0});for(let n of[.58,-.58])e.box(.08,.95,.08,-.3+.5,1,n,t);for(let n of[.58,-.58])e.box(.08,.95,.08,-1.2,1,n,t);return e.box(2.3,.1,1.45,-.25,1.95,0,t),e.box(.7,.35,1,-.8,.9,0,5125166),e.box(.06,.16,.2,1.52,.7,0,16774348,{noAO:!0}),e.build()}function ou(s){let t=new Be(31+(s()*99|0),.03);t.wheel(.34,.12,.7,.34,0,1710620),t.wheel(.34,.14,-.7,.34,0,1710620),t.box(1.5,.12,.14,0,.45,0,2829099),t.box(.45,.28,.3,.22,.6,0,[12986408,1402304,16761358][s()*3|0]),t.box(.8,.1,.3,-.3,.68,0,2236962),t.box(.08,.5,.08,.6,.5,0,8947848),t.box(.1,.07,.7,.62,1,0,2236962);let e=[34641,16761358,15094016,1402304,16777215,6953882][s()*6|0];return t.capsule(.17,.35,-.2,.78,0,e,{rz:-.25}),t.sphere(.15,-.07,1.62,0,13010498,{noAO:!0}),t.sphere(.17,-.07,1.68,0,[1118481,16761358,12986408][s()*3|0],{sy:.85,noAO:!0}),t.box(.45,.14,.24,.08,.8,0,3622735),s()>.45&&(t.capsule(.17,.32,-.65,.75,0,[15277667,4149685,38536][s()*3|0],{rz:.1}),t.sphere(.14,-.62,1.55,0,9262372,{noAO:!0})),t.build()}function $l(s,t){let e=new Be(41+(t&255),.02),n=s==="suv",i=s==="hatch",r=n?4.6:i?3.8:4.5,o=n?.95:.7;iu(e,[r*.32,-r*.32],[.82,-.82],n?.45:.37,.26),e.box(r,o,1.84,0,.3,0,t);let a=n?r*.68:i?r*.62:r*.5,l=n?-.2:i?-.25:-.3,c=n?.8:.62;e.box(a,c,1.66,l,.3+o,0,t);for(let u of[.84,-.84])e.plane(a*.46,c*.7,l+a*.22,.3+o+c*.5,u,jn,{ry:u>0?0:Math.PI,noAO:!0}),e.plane(a*.4,c*.7,l-a*.24,.3+o+c*.5,u,jn,{ry:u>0?0:Math.PI,noAO:!0});e.quad([l+a/2+.01,.3+o+.05,.75],[l+a/2+.01,.3+o+.05,-.75],[l+a/2-.35,.3+o+c-.05,-.72],[l+a/2-.35,.3+o+c-.05,.72],jn,{noAO:!0}),e.quad([l-a/2-.01,.3+o+.05,-.75],[l-a/2-.01,.3+o+.05,.75],[l-a/2+.3,.3+o+c-.05,.72],[l-a/2+.3,.3+o+c-.05,-.72],jn,{noAO:!0}),e.box(.15,.25,1.86,r/2,.22,0,2829099),e.box(.15,.25,1.86,-r/2,.22,0,2829099);for(let u of[.65,-.65])e.box(.05,.16,.36,r/2+.02,.7,u,16774348,{noAO:!0}),e.box(.05,.16,.34,-r/2-.02,.7,u,15022389,{noAO:!0});return e.build()}var ql=new Xt({vertexColors:!0}),D0=so(),U0=new Re(1,1).rotateX(-Math.PI/2),N0=new _e({map:D0,transparent:!0,depthWrite:!1}),Zl=(s,t)=>{let e=new yt(U0,N0);return e.scale.set(s,1,t),e.position.y=.08,e.renderOrder=1,e},co=s=>[Math.cos(s),-Math.sin(s)],Xl=new Map;function O0(s){if(Xl.has(s))return Xl.get(s);let t=new Be(3,.02);t.box(.42,.9,.36,0,0,.17,2899558,{noAO:!0}),t.box(.42,.9,.36,0,0,-.17,2899558,{noAO:!0}),t.box(.5,.85,.82,0,.85,0,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,.5,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,-.5,s,{noAO:!0}),t.sphere(.27,0,2,0,9262372,{noAO:!0}),t.box(.48,.14,.52,-.02,2.14,0,1710618,{noAO:!0});let e=t.build();return Xl.set(s,e),e}function Ns(s){let t=new fe,e=new yt(O0(new At(s).getHex()),ql);return e.scale.setScalar(.92),t.add(e),t.userData.body=e,t.add(Zl(1.6,1.6)),t}var Yl=new Map;function es(s){let t=new At(s).getHex();Yl.has(t)||Yl.set(t,$l("hatch",t));let e=new fe,n=new yt(Yl.get(t),ql);return n.position.y=.12,e.add(n),e.add(Zl(5.2,2.8)),e}function Qn(s,t){let e=new kr(new As({map:Kh(s,t),depthTest:!1,transparent:!0}));return e.scale.set(5.5,1.38,1),e.renderOrder=10,e}function lu(s,t=7){let e=s.length,n=[];for(let r=0;r<e;r++){let o=s[(r+e-1)%e],a=s[r],l=s[(r+1)%e],c=au([o[0]-a[0],o[1]-a[1]]),u=au([l[0]-a[0],l[1]-a[1]]),h=[a[0]+c[0]*t,a[1]+c[1]*t],d=[a[0]+u[0]*t,a[1]+u[1]*t];for(let f=0;f<=8;f++){let m=f/8;n.push([(1-m)*(1-m)*h[0]+2*(1-m)*m*a[0]+m*m*d[0],(1-m)*(1-m)*h[1]+2*(1-m)*m*a[1]+m*m*d[1]])}}let i=[0];for(let r=1;r<=n.length;r++){let o=n[r-1],a=n[r%n.length];i.push(i[r-1]+Math.hypot(a[0]-o[0],a[1]-o[1]))}return{pts:n,cum:i,length:i[i.length-1]}}var au=s=>{let t=Math.hypot(s[0],s[1])||1;return[s[0]/t,s[1]/t]};function cu(s,t,e){t=(t%s.length+s.length)%s.length;let n=0,i=s.cum.length-1;for(;i-n>1;){let l=n+i>>1;s.cum[l]<=t?n=l:i=l}let r=s.pts[n],o=s.pts[(n+1)%s.pts.length],a=(t-s.cum[n])/Math.max(1e-6,s.cum[n+1]-s.cum[n]);return e.x=r[0]+(o[0]-r[0])*a,e.z=r[1]+(o[1]-r[1])*a,e.yaw=Math.atan2(-(o[1]-r[1]),o[0]-r[0]),e}var oo=class{constructor(t,e){this.cars=[];let n=ts(2026),i={},r=[16119285,11580858,2040616,12000284,1986444,3042106,14076328,8019006];for(let o of e){let a=lu(o.pts),l=6.5+n()*3,c=Math.max(3,Math.round(a.length/85));for(let u=0;u<c;u++){let h=o.npcs[n()*o.npcs.length|0],d;h==="danfo"?d=su(n):h==="keke"?d=ru(n()>.2?16761358:3046706,1513499):h==="okada"?d=ou(n):d=$l(["sedan","suv","hatch"][n()*3|0],r[n()*r.length|0]);let f=new fe,m=new yt(d,ql);m.position.y=.12,f.add(m),f.add(Zl(h==="okada"?3:5.5,h==="okada"?1.4:2.8)),t.add(f),this.cars.push({g:f,P:a,speed:l*(h==="okada"?1.25:h==="danfo"?.9:1),off:a.length*u/c+n()*6,type:h})}}this.tmp={}}update(t){for(let e of this.cars)cu(e.P,e.speed*t+e.off,this.tmp),e.g.position.set(this.tmp.x,.02,this.tmp.z),e.g.rotation.y=this.tmp.yaw}},ao=class{constructor(t,e,n=36){let i=ts(5),r=new Ji(.26,.8,2,6).translate(0,.65,0),o=new qn(.22,8,6).translate(0,1.65,0);this.body=new Cs(r,new Xt,n),this.head=new Cs(o,new Xt,n),this.body.frustumCulled=this.head.frustumCulled=!1,t.add(this.body,this.head),this.items=[];let a=new At,l=[34641,16761358,16777215,14172949,2001125,11342935,6953882,3622735,16361509],c=[9262372,13010498,7029286,4860951,10512698],u=e.filter(h=>h.z0<150);for(let h=0;h<n;h++){let d=u[i()*u.length|0],f=1.5,m=lu([[d.x0+f,d.z0+f],[d.x1-f,d.z0+f],[d.x1-f,d.z1-f],[d.x0+f,d.z1-f]],4);this.items.push({P:m,off:i()*m.length,v:1.1+i()*.7,dir:i()>.5?1:-1,ph:i()*6}),this.body.setColorAt(h,a.setHex(l[i()*l.length|0])),this.head.setColorAt(h,a.setHex(c[i()*c.length|0]))}this.m=new ne,this.q=new qe,this.p=new P,this.s=new P(1,1,1),this.tmp={},this.up=new P(0,1,0)}update(t){this.items.forEach((e,n)=>{cu(e.P,e.dir*e.v*t+e.off,this.tmp),this.q.setFromAxisAngle(this.up,this.tmp.yaw+(e.dir<0?Math.PI:0)),this.p.set(this.tmp.x,.2+Math.abs(Math.sin(t*6+e.ph))*.07,this.tmp.z),this.m.compose(this.p,this.q,this.s),this.body.setMatrixAt(n,this.m),this.head.setMatrixAt(n,this.m)}),this.body.instanceMatrix.needsUpdate=this.head.instanceMatrix.needsUpdate=!0}},lo=class{constructor(t){this.scene=t,this.map=new Map}ingest(t,e){let n=new Set;for(let i of t){n.add(i.id);let r=this.map.get(i.id);r||(r={id:i.id,name:i.n,color:i.c,mode:-1,samples:[],obj:null,tag:null,act:""},this.map.set(i.id,r)),r.mode=i.m,r.act=i.act||"";for(let[o,a,l,c]of i.s){let u=e+o;(!r.samples.length||u>r.samples[r.samples.length-1].t+50)&&r.samples.push({t:u,x:a,z:l,ry:c})}r.samples.length>60&&r.samples.splice(0,r.samples.length-60),this.build(r)}for(let[i,r]of this.map)n.has(i)||(this.scene.remove(r.root),this.map.delete(i))}build(t){let e=t.mode===1?"car":"walk";t.kind===e&&t.root||(t.root&&this.scene.remove(t.root),t.root=new fe,t.obj=e==="car"?es(t.color):Ns(t.color),t.root.add(t.obj),t.tag=Qn(t.name,"#ffffff"),t.tag.position.set(0,e==="car"?4.2:3.6,0),t.root.add(t.tag),t.kind=e,this.scene.add(t.root),t.first=!0)}update(t){for(let e of this.map.values()){let n=e.samples;if(!n.length||!e.root)continue;let i=n[0],r=n[n.length-1];if(t<=n[0].t)i=r=n[0];else if(t>=n[n.length-1].t)i=r=n[n.length-1];else for(let d=0;d<n.length-1;d++)if(n[d].t<=t&&n[d+1].t>=t){i=n[d],r=n[d+1];break}let o=i===r?0:(t-i.t)/(r.t-i.t||1),a=i.x+(r.x-i.x)*o,l=i.z+(r.z-i.z)*o,c=r.ry-i.ry;c=Math.atan2(Math.sin(c),Math.cos(c));let u=i.ry+c*o;e.root.position.set(a,0,l),e.root.rotation.y=u;let h=Math.hypot(r.x-i.x,r.z-i.z)>.05&&i!==r;e.kind==="walk"&&(e.obj.userData.body.position.y=h?Math.abs(Math.sin(t/140))*.08:0)}}dispose(){for(let t of this.map.values())this.scene.remove(t.root);this.map.clear()}};var mi=(s,t,e)=>Math.max(t,Math.min(e,s)),hu=(s,t)=>Math.atan2(Math.sin(t-s),Math.cos(t-s)),ho=class{constructor(t,e,n,i,r){this.city=e,this.colliders=n,this.canvas=t,this.x=0,this.z=0,this.ry=0,this.mode="walk",this.v=0,this.cam=12,this.camYaw=0,this.camPitch=.62,this.dragT=0,this.frozen=!1,this.keys=new Set,this.joy={x:0,y:0,active:!1},this.run=!1,this.moving=!1,this.blocked=!1,this.root=new fe,this.setLook(i,r),this.bind()}setLook(t,e){this.color=t,this.name=e,this.avatar&&(this.root.remove(this.avatar),this.root.remove(this.carObj)),this.avatar=Ns(t),this.carObj=es(t),this.root.add(this.avatar,this.carObj),this.carObj.visible=!1,this.tag||(this.tag=Qn(e||"You","#ffe27a"),this.root.add(this.tag)),this.applyMode()}applyMode(){this.avatar.visible=this.mode==="walk",this.carObj.visible=this.mode==="drive",this.tag.position.set(0,this.mode==="drive"?4.2:3.6,0)}toggleCar(){return this.mode=this.mode==="walk"?"drive":"walk",this.v=0,this.applyMode(),this.mode==="drive"&&(this.camYaw=this.ry),this.mode}teleport(t,e){this.x=t,this.z=e,this.v=0}bind(){let t=h=>{if(h.target.closest("input,textarea,select"))return;let d=h.key.toLowerCase();["arrowup","arrowdown","arrowleft","arrowright"," "].includes(d)&&h.preventDefault(),this.keys.add(d),d==="shift"&&(this.run=!0)},e=h=>{let d=h.key.toLowerCase();this.keys.delete(d),d==="shift"&&(this.run=!1)};addEventListener("keydown",t),addEventListener("keyup",e),addEventListener("blur",()=>{this.keys.clear(),this.run=!1});let n=null;this.canvas.addEventListener("pointerdown",h=>{h.target===this.canvas&&(n={id:h.pointerId,x:h.clientX,y:h.clientY,moved:0},this.canvas.setPointerCapture?.(h.pointerId))}),this.canvas.addEventListener("pointermove",h=>{if(!n||n.id!==h.pointerId)return;let d=h.clientX-n.x,f=h.clientY-n.y;n.x=h.clientX,n.y=h.clientY,n.moved+=Math.abs(d)+Math.abs(f),this.camYaw-=d*.006,this.camPitch=mi(this.camPitch+f*.004,.25,1.15),this.dragT=performance.now()});let i=h=>{n&&n.id===h.pointerId&&(this.lastTap=n.moved<6?{x:h.clientX,y:h.clientY,t:performance.now()}:null,n=null)};this.canvas.addEventListener("pointerup",i),this.canvas.addEventListener("pointercancel",i),this.canvas.addEventListener("wheel",h=>{this.cam=mi(this.cam+h.deltaY*.01,7,26),h.preventDefault()},{passive:!1});let r=document.getElementById("joy"),o=document.getElementById("joyKnob");if(!r)return;let a=null,l=52,c=h=>{let d=r.getBoundingClientRect(),f=h.clientX-(d.left+d.width/2),m=h.clientY-(d.top+d.height/2),y=Math.hypot(f,m);y>l&&(f=f/y*l,m=m/y*l),this.joy.x=f/l,this.joy.y=-m/l,o.style.transform=`translate(${f}px,${m}px)`};r.addEventListener("pointerdown",h=>{a=h.pointerId,r.setPointerCapture(h.pointerId),this.joy.active=!0,c(h),h.preventDefault()}),r.addEventListener("pointermove",h=>{h.pointerId===a&&c(h)});let u=h=>{h.pointerId===a&&(a=null,this.joy.x=this.joy.y=0,this.joy.active=!1,o.style.transform="")};r.addEventListener("pointerup",u),r.addEventListener("pointercancel",u)}input(){let t=this.keys,e=(t.has("d")||t.has("arrowright")?1:0)-(t.has("a")||t.has("arrowleft")?1:0),n=(t.has("w")||t.has("arrowup")?1:0)-(t.has("s")||t.has("arrowdown")?1:0);this.joy.active&&(e=this.joy.x,n=this.joy.y);let i=Math.hypot(e,n);return i>1&&(e/=i,n/=i),{ix:e,iy:n}}update(t){let{ix:e,iy:n}=this.frozen?{ix:0,iy:0}:this.input(),i=this.x,r=this.z;if(this.keys.has("q")&&(this.camYaw+=t*1.8),this.keys.has("e"),this.mode==="walk"){let c=Math.hypot(e,n);if(c>.08){let u=co(this.camYaw),h=[Math.sin(this.camYaw),Math.cos(this.camYaw)],d=u[0]*n+h[0]*e,f=u[1]*n+h[1]*e,m=Math.hypot(d,f);d/=m,f/=m;let y=(this.run?7:5.2)*Math.min(1,c);this.x+=d*y*t,this.z+=f*y*t,this.v=y;let x=Math.atan2(-f,d);this.ry+=hu(this.ry,x)*Math.min(1,t*12)}else this.v=0}else{let l=n>.15?n:n<-.15?n*.6:0,c=Math.abs(e)>.1?e:0,u=20;l>0?this.v+=15*l*t:l<0?this.v+=(this.v>0?24:8)*l*t:this.v-=Math.sign(this.v)*Math.min(Math.abs(this.v),6*t),this.v=mi(this.v,-6,u),this.ry-=c*Math.min(1,Math.abs(this.v)/5)*1.9*t*(this.v>=0?1:-1);let h=co(this.ry);this.x+=h[0]*this.v*t,this.z+=h[1]*this.v*t,performance.now()-this.dragT>1500&&(this.camYaw+=hu(this.camYaw,this.ry)*Math.min(1,t*3))}let o=this.mode==="drive"?2:.7;this.blocked=!1;for(let l=0;l<2;l++)for(let c of this.colliders){if(this.x<c.x0-o||this.x>c.x1+o||this.z<c.z0-o||this.z>c.z1+o)continue;let u=mi(this.x,c.x0,c.x1),h=mi(this.z,c.z0,c.z1),d=this.x-u,f=this.z-h,m=Math.hypot(d,f);if(m<o){if(m<1e-4){let y=[[c.x0-o-this.x,0],[c.x1+o-this.x,0],[0,c.z0-o-this.z],[0,c.z1+o-this.z]].sort((x,p)=>Math.hypot(...x)-Math.hypot(...p))[0];this.x+=y[0],this.z+=y[1]}else this.x=u+d/m*o,this.z=h+f/m*o;this.blocked=!0,this.mode==="drive"&&(this.v*=.5)}}let a=this.city.bounds;this.x=mi(this.x,a.minX+1,a.maxX-1),this.z=mi(this.z,a.minZ+1,a.maxZ-3),this.moving=Math.hypot(this.x-i,this.z-r)>.002,this.root.position.set(this.x,0,this.z),this.root.rotation.y=this.ry,this.mode==="walk"&&(this.avatar.userData.body.position.y=this.moving?Math.abs(Math.sin(performance.now()/120))*.09:0)}placeCamera(t,e){let n=this.cam*(this.mode==="drive"?1.4:1),i=co(this.camYaw),r=Math.sin(this.camPitch)*n,o=Math.cos(this.camPitch)*n,a=this.x-i[0]*o,l=this.z-i[1]*o,c=r+1.2,u=1-Math.pow(6e-4,e);t.position.x+=(a-t.position.x)*u,t.position.y+=(c-t.position.y)*u,t.position.z+=(l-t.position.z)*u,t.lookAt(this.x,1.6,this.z),t.updateMatrixWorld(),t.matrixWorldInverse.copy(t.matrixWorld).invert()}};var gi=new P,uo=class{constructor(t,e,n){this.world=t,this.city=e,this.now=n,this.rot=1e4,this.slots={},this.imgs=new Map,this.evidence=[],this.houseTex=new Map,this.state={},this.lastKey={},this.maxDist=90}setSnapshot(t){if(t){this.slots=t.slots||{},this.rot=t.rotationMs||1e4;for(let e of Object.values(this.slots))for(let n of e)this.loadImg(n.i)}}loadImg(t){if(this.imgs.has(t))return;let e={img:new Image,ok:!1,tex:{}};this.imgs.set(t,e),e.img.onload=()=>{e.ok=!0,this.lastKey={}},e.img.onerror=()=>{e.failed=!0},e.img.src=window.__naMedia?window.__naMedia(t):`/media/creative/${t}`}house(t,e,n){let i=this.houseTex.get(t);if(!i){let r=this.world.boards[t].def;i=jh(e>=n*1.5?1024:768,e>=n*1.5?512:768,r.surface==="lagoon_plot"?"Lagoon plot":r.surface==="airport_board"?"Airport board":"Road billboard","Rent this board at /advertise",t.charCodeAt(t.length-1)),this.houseTex.set(t,i)}return i}currentFor(t,e){let n=this.slots[t];return!n||!n.length?null:n[e%n.length]}update(t,e,n,i){var a;let r=this.now(),o=Math.floor(r/this.rot);for(let[l,c]of Object.entries(this.world.boards)){let u=c.def,h=u.x-n.x,d=u.z-n.z,f=Math.hypot(h,d),m=this.currentFor(l,o),y=m?`c${m.c}`:"house";if(c.shownKey!==y||this.lastKey[l]!==y){let M=m&&this.imgs.get(m.i);if(m&&M&&M.ok){let E=M.tex[o%1]||(M.tex.t=M.tex.t||Qh(M.img,u.surface==="lagoon_plot"?768:1024,u.surface==="lagoon_plot"?768:512,m.b));c.mat.map=E,c.mat.color.set(16777215),c.mat.needsUpdate=!0,c.shownKey=y,this.lastKey[l]=y}else m?c.mat.map||(c.mat.map=this.house(l,u.w,u.h),c.mat.needsUpdate=!0):(c.mat.map=this.house(l,u.w,u.h),c.mat.needsUpdate=!0,c.shownKey=y,this.lastKey[l]=y)}let x=(a=this.state)[l]||(a[l]={win:o,camp:null,cont:0,best:0,pctSum:0,pctN:0});if(x.win!==o&&(this.flush(l,x),x.win=o,x.camp=m?m.c:null,x.cont=0,x.best=0,x.pctSum=0,x.pctN=0),x.camp=m?m.c:null,!m||f>this.maxDist+30||document.hidden){x.cont=0;continue}let p=this.visiblePct(t,e,c);p>=50?(x.cont+=i,x.best=Math.max(x.best,x.cont),x.pctSum+=p,x.pctN++):x.cont=0}}flush(t,e){!e.camp||e.best<300||this.evidence.length<120&&this.evidence.push({slot:t,win:e.win,c:e.camp,pct:Math.round(e.pctSum/Math.max(1,e.pctN)),ms:Math.round(Math.min(e.best,this.rot)),vis:!0})}take(){let t=this.evidence;return this.evidence=[],t}visiblePct(t,e,n){let i=n.def,r=i.x,o=i.y,a=i.z,l=t.position;if((l.x-r)*i.nx+(l.z-a)*i.nz<=0)return 0;for(let E of this.world.colliders){if(E.h<2)continue;let v=k0(l.x,l.z,r,a,E);if(v===null)continue;if(l.y+(o-l.y)*v<E.h)return 0}let c=i.nz,u=-i.nx,h=9,d=-9,f=9,m=-9;for(let[E,v]of[[-1,-1],[1,-1],[1,1],[-1,1]]){if(gi.set(r+c*E*i.w/2,o+v*i.h/2,a+u*E*i.w/2),gi.clone().applyMatrix4(t.matrixWorldInverse).z>-.1)return 0;gi.project(t),h=Math.min(h,gi.x),d=Math.max(d,gi.x),f=Math.min(f,gi.y),m=Math.max(m,gi.y)}if((m-f)/2*e.h<22)return 0;let x=(d-h)*(m-f),p=Math.max(0,Math.min(1,d)-Math.max(-1,h)),M=Math.max(0,Math.min(1,m)-Math.max(-1,f));return x>0?100*p*M/x:0}nearest(t,e,n=40){let i=null,r=n;for(let[o,a]of Object.entries(this.world.boards)){let l=Math.hypot(a.def.x-t,a.def.z-e);l<r&&(r=l,i=o)}return i}};function k0(s,t,e,n,i){let r=0,o=1,a=e-s,l=n-t;for(let[c,u]of[[-a,s-i.x0],[a,i.x1-s],[-l,t-i.z0],[l,i.z1-t]])if(c===0){if(u<0)return null}else{let h=u/c;if(c<0){if(h>o)return null;h>r&&(r=h)}else{if(h<r)return null;h<o&&(o=h)}}return r>.02&&r<.98?r:null}var z0=s=>{let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}};function Jl(s,t){let e=[];if(s.forEach((i,r)=>{i||e.push(r)}),!e.length)return s;let n=e[Math.floor(t()*e.length)];return s[n]=t()<.1?4:2,s}function uu(s){let t=z0(s),e=Array(16).fill(0);return Jl(e,t),Jl(e,t),{grid:e,score:0,rng:t,moves:0,over:!1}}function F0(s){let t=s.filter(Boolean),e=[],n=0;for(let i=0;i<t.length;i++)t[i]===t[i+1]?(e.push(t[i]*2),n+=t[i]*2,i++):e.push(t[i]);for(;e.length<4;)e.push(0);return{out:e,gained:n}}function du(s,t){let e=s.slice(),n=0,i=(r,o)=>r*4+o;for(let r=0;r<4;r++){let o=[];for(let c=0;c<4;c++)o.push(t==="L"?i(r,c):t==="R"?i(r,3-c):i(t==="U"?c:3-c,r));let{out:a,gained:l}=F0(o.map(c=>s[c]));n+=l,o.forEach((c,u)=>{e[c]=a[u]})}return{grid:e,gained:n,moved:e.some((r,o)=>r!==s[o])}}var B0=s=>["L","R","U","D"].some(t=>du(s,t).moved);function fu(s,t){if(s.over||!"LRUD".includes(t)||t.length!==1)return!1;let e=du(s.grid,t);return e.moved?(s.grid=e.grid,s.score+=e.gained,s.moves++,Jl(s.grid,s.rng),B0(s.grid)||(s.over=!0),!0):!1}var V0={merge:"Merge Am",memory:"Pair Am",word:"Word of the Day"},G0={danfo:"\u{1F68C}",keke:"\u{1F6FA}",suya:"\u{1F362}",akara:"\u{1F96F}",ankara:"\u{1F9F5}",naira:"\u20A6",agbada:"\u{1F458}",gele:"\u{1F451}"},W0=s=>new Promise(t=>setTimeout(t,s));async function pu(s){let t=await s.guard(()=>Kt("/api/casual"));return t?[g("div",{class:"row sp"},g("b",{},"\u{1F3AE} Break games"),g("span",{class:"tag amber"},`Today ${mt(t.earnedToday)} / ${mt(t.dailyCap)}`)),g("p",{class:"mut"},"Quick games for a breather. Game money only: small rewards, capped every day (ESTIMATE numbers). No cash-out."),t.rewardsOn?"":g("p",{class:"mut"},"Your account is brand new: you can play now and rewards start in a few minutes."),g("div",{class:"list"},t.games.map(e=>g("div",{},g("span",{},g("b",{},e.name),g("small",{class:"mut"},` \xB7 ${e.blurb} (also at ${e.where})${e.best?` \xB7 best ${e.best}`:""}${e.doneToday?" \xB7 done today \u2713":""}`)),g("button",{class:"btn small alt","data-casual":e.id,onclick:()=>Kl(s,e.id)},"Play"))))]:[]}function Kl(s,t){let e=g("div",{class:"casual"}),n=null;s.openSheet(V0[t],e,()=>n?.()),t==="merge"?n=$0(s,e):t==="memory"?n=X0(s,e):Y0(s,e)}function jl(s,t,e){let n=[g("b",{},e),t.reward?g("span",{class:"tag green"},`+${mt(t.reward)} game money`):g("span",{class:"tag"},"No reward this time"),t.note?g("small",{class:"mut"},t.note):""];return t.reward&&s.toast(`+${mt(t.reward)} game money. Nice one!`,"money"),s.g.refreshMe?.(),g("div",{class:"banner win casualres"},...n)}function $0(s,t){let e=null,n=null,i="",r=!1,o=g("div",{class:"mgrid"}),a=g("b",{id:"mScore"},"0"),l=g("div",{}),c=()=>{o.replaceChildren(...n.grid.map(p=>g("div",{class:`mt mt${Math.min(p,2048)}`,"data-v":p},p?String(p):""))),a.textContent=String(n.score)},u=p=>{r||!n||fu(n,p)&&(i+=p,c(),n.over&&h())},h=async()=>{if(r)return;r=!0;let p=await s.guard(()=>St("/api/casual/merge/submit",{runId:e.runId,moves:i}));l.replaceChildren(p?jl(s,p,`Score ${p.score} \xB7 biggest tile ${p.best}`):g("p",{class:"mut"},"Could not count that game (too short or too fast). Try again."),g("button",{class:"btn alt",onclick:d},"Play again"))},d=async()=>{let p=await s.guard(()=>St("/api/casual/merge/start"));p&&(e=p,n=uu(p.seed),i="",r=!1,l.replaceChildren(),c())},f=p=>{let M={ArrowLeft:"L",ArrowRight:"R",ArrowUp:"U",ArrowDown:"D"}[p.key];M&&(p.preventDefault(),p.stopPropagation(),u(M))};document.addEventListener("keydown",f,!0);let m=0,y=0;o.addEventListener("pointerdown",p=>{m=p.clientX,y=p.clientY}),o.addEventListener("pointerup",p=>{let M=p.clientX-m,E=p.clientY-y;Math.max(Math.abs(M),Math.abs(E))<24||u(Math.abs(M)>Math.abs(E)?M>0?"R":"L":E>0?"D":"U")});let x=g("div",{class:"mpad"},["L","U","D","R"].map(p=>g("button",{class:"btn small","data-dir":p,onclick:()=>u(p)},{L:"\u2B05",U:"\u2B06",D:"\u2B07",R:"\u27A1"}[p])));return t.replaceChildren(g("div",{class:"row sp"},g("span",{},"Score ",a),g("button",{class:"btn small ghost",id:"mFinish",onclick:()=>i.length>=20?h():s.toast("Play at least 20 moves first.")},"Finish and claim")),g("p",{class:"mut"},"Slide with arrows or swipe. Equal tiles join. The server replays your moves to check the score."),o,x,l),d(),window.__merge={move:u,get log(){return i},get game(){return n}},()=>document.removeEventListener("keydown",f,!0)}function X0(s,t){let e=null,n=!1,i=[],r=!1,o=g("div",{}),a=g("b",{id:"pMoves"},"Tries 0"),l=m=>g("button",{class:"mc","data-i":m,onclick:()=>d(m)},"\u2753"),c=g("div",{class:"mgrid mem"}),u=(m,y,x)=>{let p=c.children[m];p.textContent=G0[y]||"?",p.classList.add("up"),x&&p.classList.add("ok")},h=m=>{let y=c.children[m];y.textContent="\u2753",y.classList.remove("up")},d=async m=>{if(n||r||c.children[m].classList.contains("up"))return;n=!0;let y=await s.guard(()=>St("/api/casual/memory/flip",{runId:e.runId,i:m}));if(!y){n=!1;return}u(m,y.symbolName,y.result==="match"),a.textContent=`Tries ${y.moves}`,y.result==="match"?(u(y.other,y.symbolName,!0),i.push(m,y.other)):y.result==="miss"&&(await W0(800),h(m),h(y.other)),y.done&&(r=!0,o.replaceChildren(jl(s,y,`Done in ${y.moves} tries`),g("button",{class:"btn alt",onclick:f},"Play again"))),n=!1},f=async()=>{let m=await s.guard(()=>St("/api/casual/memory/start"));m&&(e=m,r=!1,n=!1,i=[],a.textContent="Tries 0",c.replaceChildren(...Array.from({length:m.cards},(y,x)=>l(x))),o.replaceChildren())};return t.replaceChildren(g("div",{class:"row sp"},a,g("span",{class:"mut"},"Fewer tries = more game money")),c,o),f(),null}function Y0(s,t){let e=null,n="",i=g("div",{class:"wgrid"}),r=g("div",{}),o=g("div",{class:"wkeys"}),a=()=>{let d={};for(let f of e.guesses)[...f.word].forEach((m,y)=>{d[m]=Math.max(d[m]??-1,f.marks[y])});return d},l=()=>{let d=[];for(let m=0;m<e.maxGuesses;m++){let y=e.guesses[m],x=y?y.word:m===e.guesses.length?n.padEnd(5):"     ";d.push(g("div",{class:"wrow"},[...x].map((p,M)=>g("span",{class:`wl ${y?"m"+y.marks[M]:""}`},p.trim().toUpperCase()))))}i.replaceChildren(...d);let f=a();o.replaceChildren(...["qwertyuiop","asdfghjkl","zxcvbnm"].map(m=>g("div",{class:"wkr"},[...m].map(y=>g("button",{class:`wk ${f[y]!=null?"m"+f[y]:""}`,"data-k":y,onclick:()=>c(y)},y.toUpperCase())))),g("div",{class:"wkr"},g("button",{class:"btn small",onclick:()=>c("<")},"\u232B"),g("button",{class:"btn small alt",id:"wEnter",onclick:()=>c(">")},"Enter")))},c=async d=>{if(!(!e||e.status!=="playing")){if(d==="<")n=n.slice(0,-1);else if(d===">"){if(n.length!==5)return s.toast("Type 5 letters.");let f=await s.guard(()=>St("/api/casual/word/guess",{word:n}));if(!f)return;e.guesses=f.guesses,e.status=f.status,n="",f.status!=="playing"&&(e.answer=f.answer,u(f))}else n.length<5&&(n+=d);l()}},u=d=>r.replaceChildren(jl(s,d||{reward:e.reward},e.status==="won"?`Correct! The word was ${e.answer.toUpperCase()}`:`Not today. The word was ${e.answer.toUpperCase()}`),g("p",{class:"mut"},"A new word comes tomorrow.")),h=d=>{s.sheetOpen&&(/^[a-z]$/i.test(d.key)&&!d.ctrlKey&&!d.metaKey?(d.stopPropagation(),d.preventDefault(),c(d.key.toLowerCase())):d.key==="Backspace"?(d.preventDefault(),d.stopPropagation(),c("<")):d.key==="Enter"&&(d.preventDefault(),d.stopPropagation(),c(">")))};document.addEventListener("keydown",h,!0),s.onClose=()=>document.removeEventListener("keydown",h,!0),t.replaceChildren(g("p",{class:"mut"},"Guess the 5-letter word in six tries. Green = right place, amber = in the word, grey = not there. Nigerian and everyday words."),i,r,o),Kt("/api/casual/word").then(d=>{e=d,l(),d.status!=="playing"&&u()}).catch(()=>s.toast("Could not load today's word."))}var po={house:"#8fb0c9",kiosk:"#9bc59d",market:"#e0a85c",office:"#9aa3b8",tower:"#6c7aa6",shop:"#f0c04a",airport:"#cfd8e3"},Z0={house:"House",kiosk:"Kiosk",market:"Market",office:"Office block",tower:"Tower block",shop:"Shop",airport:"Airport terminal"},J0={venue_mamaput:"\u{1F372}",venue_viewing:"\u{1F4FA}",venue_joint:"\u{1F3B2}",venue_meco:"\u{1F527}",venue_motors:"\u{1F697}"},mu=[["districts","Districts","#d9c7a3"],["roads","Roads and names","#3d4046"],["buildings","Buildings","#8fb0c9"],["venues","Venues and shops","#ffc20e"],["jobs","Jobs","#4aa3ff"],["homes","Homes for rent","#e56b6f"],["plots","Land plots","#7fb069"],["landmarks","Landmarks","#b44cff"],["billboards","Billboard spots","#35c46b"],["players","Players nearby","#ffffff"]],Ql={districts:!0,roads:!0,buildings:!0,venues:!0,jobs:!0,homes:!0,plots:!0,landmarks:!0,billboards:!1,players:!0},K0=s=>{let t=s.width/2;return{x0:Math.min(s.x1,s.x2)-(s.x1===s.x2?t:0),x1:Math.max(s.x1,s.x2)+(s.x1===s.x2?t:0),z0:Math.min(s.z1,s.z2)-(s.z1===s.z2?t:0),z1:Math.max(s.z1,s.z2)+(s.z1===s.z2?t:0)}},fo=s=>`\u20A6${Math.round(s).toLocaleString("en-NG")}`;function gu(s){let t=a=>s.placeById?.[a]||(s.places||[]).find(l=>l.id===a),e=[];for(let a of s.venues||[])e.push({type:"venue",id:a.id,name:a.name,x:a.x,z:a.z,icon:J0[a.id]||"\u{1F3B2}",lines:[a.blurb||"A place to hang out.",a.hours?`Open ${a.hours[0]}:00 to ${a.hours[1]}:00`:""],placeId:a.id,group:"Venues"});for(let a of s.shops||[])(s.venues||[]).some(l=>l.shopId===a.id)||e.push({type:"shop",id:a.id,name:a.name,x:a.x,z:a.z,icon:"\u{1F6D2}",lines:[a.desc||"Shop"],placeId:a.id,group:"Shops"});for(let a of s.jobs||[])e.push({type:"job",id:a.id,name:a.label,x:a.x,z:a.z,icon:"\u{1F4BC}",lines:["Job: start a shift here"],placeId:a.id,group:"Jobs"});for(let a of s.landmarks||[])e.push({type:"landmark",id:a.id,name:a.name,x:a.x,z:a.z,icon:"\u26F2",lines:["Landmark"],placeId:t(a.id)?a.id:null,group:"Landmarks"});for(let a of s.buildings)a.kind==="airport"&&e.push({type:"landmark",id:a.id,name:a.label||"Airport",x:a.x,z:a.z,icon:"\u2708\uFE0F",lines:["Landmark"],placeId:t("airport")?"airport":null,group:"Landmarks"});for(let a of s.plots||[])e.push({type:"plot",id:a.id,name:a.name,x:a.x,z:a.z,size:a.size,icon:"\u{1F30D}",lines:[`${a.area} \xB7 ${a.sqm} sqm`,`Price ${fo(a.price)} \xB7 growth ${(a.growthPerWeek*100).toFixed(0)}%/week (ESTIMATE)`,`Omo-onile risk: ${a.risk}`],placeId:a.id,group:"Land plots"});for(let a of s.properties||[])e.push({type:"house",id:a.id,name:a.name,x:a.door.x,z:a.door.z,icon:"\u{1F3E0}",lines:[`${a.tierLabel}`,a.price?`Price ${fo(a.price)}`:`Rent ${fo(a.rent)}/week`,a.area||""],placeId:a.id,buildingId:a.buildingId,group:"Homes"});for(let a of s.billboards||[])a.surface!=="lagoon_plot"&&e.push({type:"billboard",id:a.id,name:`Billboard spot ${a.id}`,x:a.x,z:a.z,icon:"\u{1FAA7}",lines:[`${a.tier} tier ad space (${a.w}x${a.h} m)`,"Advertise from the ads page"],placeId:null,group:"Billboard spots"});let n=(s.roads||[]).map(a=>({...a,rect:K0(a),vertical:a.x1===a.x2})),i=(s.districts||[]).map(a=>({...a})),r=s.buildings.map(a=>{let l=(s.properties||[]).find(u=>u.id===a.propertyId),c=Z0[a.kind]||a.kind;return{...a,name:a.label||l?.name||c,kindName:c,rect:{x0:a.x-a.w/2,x1:a.x+a.w/2,z0:a.z-a.d/2,z1:a.z+a.d/2},property:l||null}}),o=[...e.filter(a=>a.type!=="billboard"),...n.map(a=>({type:"road",id:a.id,name:a.name,x:(a.x1+a.x2)/2,z:(a.z1+a.z2)/2,group:"Roads",lines:[`${a.vertical?"North-south":"East-west"} road`]})),...i.map(a=>({type:"district",id:a.id,name:a.name,x:(a.x0+a.x1)/2,z:(a.z0+a.z1)/2,group:"Districts",lines:["District"]}))];return{city:s,items:e,roads:n,districts:i,buildings:r,catalogue:o,bounds:s.bounds,water:s.water||null,zones:s.zones||[]}}function xu(s,t,e=12){let n=String(t||"").trim().toLowerCase();if(!n)return s.catalogue.filter(r=>["venue","shop","landmark","district"].includes(r.type)).slice(0,e);let i=[];for(let r of s.catalogue){let o=r.name.toLowerCase(),a=-1;o.startsWith(n)?a=3:o.split(/[\s(]+/).some(l=>l.startsWith(n))?a=2:(o.includes(n)||(r.group||"").toLowerCase().startsWith(n))&&(a=1),a>0&&i.push([a,r])}return i.sort((r,o)=>o[0]-r[0]||r[1].name.localeCompare(o[1].name)).slice(0,e).map(r=>r[1])}function yu(s,t,e,n,i=Ql,r=[]){let o=16/n,a=h=>Math.hypot(h.x-t,h.z-e)<=o;for(let h of r)if(i.players&&a(h))return{type:"player",id:h.id,name:`@${h.name}`,x:h.x,z:h.z,lines:["Another player nearby"]};let l={venue:"venues",shop:"venues",job:"jobs",landmark:"landmarks",house:"homes",billboard:"billboards",plot:"plots"},c=null,u=1/0;for(let h of s.items){if(!i[l[h.type]]||h.type==="house"&&n<1.5||h.type==="plot")continue;let d=Math.hypot(h.x-t,h.z-e);d<=o&&d<u&&(c=h,u=d)}if(c)return c;if(i.buildings){for(let h of s.buildings)if(t>=h.rect.x0&&t<=h.rect.x1&&e>=h.rect.z0&&e<=h.rect.z1){let d=h.property;return{type:"building",id:h.id,name:h.name,x:h.x,z:h.z,rect:h.rect,icon:d?"\u{1F3E0}":"\u{1F3E2}",placeId:d?.id||null,lines:[h.kindName+(h.floors>1?` \xB7 ${h.floors} floors`:""),d?`${d.tierLabel} \xB7 rent ${fo(d.rent)}/week`:""].filter(Boolean),group:"Buildings"}}}if(i.plots){for(let h of s.items)if(h.type==="plot"&&Math.abs(h.x-t)<=h.size/2&&Math.abs(h.z-e)<=h.size/2)return{...h,rect:{x0:h.x-h.size/2,x1:h.x+h.size/2,z0:h.z-h.size/2,z1:h.z+h.size/2}}}if(i.roads){for(let h of s.roads)if(t>=h.rect.x0&&t<=h.rect.x1&&e>=h.rect.z0&&e<=h.rect.z1)return{type:"road",id:h.id,name:h.name,x:t,z:e,rect:h.rect,lines:[`${h.vertical?"North-south":"East-west"} road \xB7 ${h.width} m wide`],group:"Roads"}}if(i.districts){for(let h of s.districts)if(t>=h.x0&&t<h.x1&&e>=h.z0&&e<h.z1)return{type:"district",id:h.id,name:h.name,x:t,z:e,lines:["District"],group:"Districts"}}return s.water&&e>=s.water.minZ&&e<=s.water.maxZ&&t>=s.water.minX&&t<=s.water.maxX?{type:"water",id:"water",name:"Lagoon",x:t,z:e,lines:["Water. No swimming!"]}:null}var xi={district:s=>s<2.2,road:s=>s>=.9,venue:s=>s>=1.2,shop:s=>s>=1.8,job:s=>s>=2.6,landmark:s=>s>=.9,plot:s=>s>=1.4,house:s=>s>=3,building:s=>s>=3.6,billboard:s=>s>=3,player:s=>s>=1.5};var mo=class{constructor(t){this.g=t,this.model=null,this.layers={...Ql},this.open_=!1,this.cache=null,this.sel=null,this.hover=null,this.pins=new Map}get isOpen(){return this.open_}open(t){if(this.open_)return;let e=this.g;this.model=this.model||gu(e.city),this.open_=!0,this.dpr=Math.min(2,window.devicePixelRatio||1),this.canvas=g("canvas",{class:"bm-canvas"}),this.ctx=this.canvas.getContext("2d"),this.card=g("div",{class:"bm-card hidden"}),this.list=g("div",{class:"bm-list hidden"}),this.legend=g("div",{class:"bm-legend hidden"}),this.input=g("input",{class:"bm-search",placeholder:"Search places, roads, districts\u2026",type:"search",autocomplete:"off"}),this.input.addEventListener("input",()=>this.showList()),this.input.addEventListener("focus",()=>this.showList());let n=g("div",{class:"bm-top"},g("b",{class:"bm-title"},`\u{1F5FA} ${e.city.name||"Map"}`),this.input,g("button",{class:"bm-btn",id:"bmMe",title:"Centre on me",onclick:()=>this.centreMe()},"\u25CE"),g("button",{class:"bm-btn",id:"bmLegend",title:"Layers",onclick:()=>this.legend.classList.toggle("hidden")},"\u2630"),g("button",{class:"bm-btn",id:"bmClose",onclick:()=>this.close()},"\u2715")),i=g("div",{class:"bm-zoom"},g("button",{class:"bm-btn",id:"bmIn",onclick:()=>this.zoomBy(1.5)},"+"),g("button",{class:"bm-btn",id:"bmOut",onclick:()=>this.zoomBy(1/1.5)},"\u2212"));this.root=g("div",{id:"bigmap"},this.canvas,n,this.list,this.legend,i,this.card),document.body.appendChild(this.root),this.drawLegend(),this.resize(),this.fit();let r=e.ctrl;r&&(this.v.cx=r.x,this.v.cz=r.z,this.v.k=Math.max(this.v.k,1.6)),this.bind(),this.onKey=a=>{a.key==="Escape"&&(a.target===this.input?(this.input.blur(),this.list.classList.add("hidden")):this.close(),a.stopPropagation())},document.addEventListener("keydown",this.onKey,!0),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize);let o=()=>{this.open_&&(this.draw(),this.raf=requestAnimationFrame(o))};this.raf=requestAnimationFrame(o),t&&this.focusOn(this.model.catalogue.find(a=>a.id===t)),window.__bigmap=this}close(){this.open_&&(this.open_=!1,cancelAnimationFrame(this.raf),document.removeEventListener("keydown",this.onKey,!0),removeEventListener("resize",this.onResize),this.root.remove(),this.cache=null)}toggle(){this.open_?this.close():this.open()}resize(){let t=this.root.getBoundingClientRect();this.W=Math.max(200,Math.round(t.width)),this.H=Math.max(200,Math.round(t.height)),this.canvas.width=this.W*this.dpr,this.canvas.height=this.H*this.dpr,this.canvas.style.width=this.W+"px",this.canvas.style.height=this.H+"px"}extent(){let t=this.model.bounds,e=this.model.water;return{x0:Math.min(t.minX,e?.minX??t.minX),x1:Math.max(t.maxX,e?.maxX??t.maxX),z0:t.minZ,z1:Math.max(t.maxZ,e?.maxZ??t.maxZ)}}fit(){let t=this.model.bounds;this.kMin=Math.min(this.W/(t.maxX-t.minX+40),this.H/(t.maxZ-t.minZ+40))*.9,this.kMax=14,this.v={cx:(t.minX+t.maxX)/2,cz:(t.minZ+t.maxZ)/2,k:this.kMin*1.05}}sx(t){return(t-this.v.cx)*this.v.k+this.W/2}sz(t){return(t-this.v.cz)*this.v.k+this.H/2}wx(t){return(t-this.W/2)/this.v.k+this.v.cx}wz(t){return(t-this.H/2)/this.v.k+this.v.cz}zoomAt(t,e,n){let i=this.wx(t),r=this.wz(e);this.v.k=Math.min(this.kMax,Math.max(this.kMin,this.v.k*n)),this.v.cx=i-(t-this.W/2)/this.v.k,this.v.cz=r-(e-this.H/2)/this.v.k}zoomBy(t){this.zoomAt(this.W/2,this.H/2,t)}centreMe(){let t=this.g.ctrl;this.v.cx=t.x,this.v.cz=t.z,this.v.k=Math.max(this.v.k,2.5)}focusOn(t){t&&(this.v.cx=t.x,this.v.cz=t.z,this.v.k=Math.max(this.v.k,t.type==="district"?this.kMin*1.8:t.type==="road"?2:4.5))}drawStatic(t,e,n,i,r){let o=this.model,a=this.extent(),l=this.layers;t.fillStyle="#2b6f8a",t.fillRect(e(a.x0-100),n(a.z0-100),(a.x1-a.x0+200)*i,(a.z1-a.z0+200)*i);let c=o.bounds;if(t.fillStyle="#d3cdb4",t.fillRect(e(c.minX),n(c.minZ),(c.maxX-c.minX)*i,(c.maxZ-c.minZ)*i),o.water){t.fillStyle="#3d86a6",t.fillRect(e(o.water.minX),n(o.water.minZ),(o.water.maxX-o.water.minX)*i,(o.water.maxZ-o.water.minZ)*i),t.strokeStyle="#ffffff40",t.lineWidth=Math.max(1,i*.4);for(let h=o.water.minZ+14;h<o.water.maxZ;h+=22){t.beginPath();for(let d=o.water.minX;d<o.water.maxX;d+=30)t.moveTo(e(d),n(h)),t.quadraticCurveTo(e(d+7),n(h-3),e(d+15),n(h));t.stroke()}}if(l.districts)for(let h of o.districts)t.fillStyle=h.color+"88",t.fillRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);t.fillStyle="#c3c8a6";for(let h of o.zones)t.fillRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);if(l.districts){t.setLineDash([6,5]),t.strokeStyle="#6b5b3e99",t.lineWidth=1.2;for(let h of o.districts)t.strokeRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);t.setLineDash([])}if(l.plots){for(let h of o.items)if(h.type==="plot"){let d=e(h.x-h.size/2),f=n(h.z-h.size/2),m=h.size*i;t.fillStyle="#9bc47a",t.fillRect(d,f,m,m),t.strokeStyle="#4f7a3a",t.lineWidth=1.5,t.setLineDash([5,3]),t.strokeRect(d,f,m,m),t.setLineDash([]),t.beginPath();for(let y=0;y<=m;y+=Math.max(6,m/6))t.moveTo(d+y,f),t.lineTo(d,f+y);t.strokeStyle="#4f7a3a55",t.stroke()}}if(l.roads){for(let h of o.roads){let d=h.width*i;t.lineCap="butt",t.strokeStyle="#b9b39a",t.lineWidth=d+6*Math.min(1.5,i/2),t.beginPath(),t.moveTo(e(h.x1),n(h.z1)),t.lineTo(e(h.x2),n(h.z2)),t.stroke()}for(let h of o.roads){let d=h.width*i;t.strokeStyle="#3d4046",t.lineWidth=d,t.beginPath(),t.moveTo(e(h.x1),n(h.z1)),t.lineTo(e(h.x2),n(h.z2)),t.stroke()}for(let h of o.roads)if(t.strokeStyle="#f2d23c",t.lineWidth=Math.max(1,i*.35),t.setLineDash([i*4,i*3]),t.beginPath(),t.moveTo(e(h.x1),n(h.z1)),t.lineTo(e(h.x2),n(h.z2)),t.stroke(),t.setLineDash([]),i>=2.5){t.strokeStyle="#ffffffaa",t.lineWidth=Math.max(1,i*.2);for(let d of[-h.width/2+.8,h.width/2-.8])t.beginPath(),h.vertical?(t.moveTo(e(h.x1+d),n(h.z1)),t.lineTo(e(h.x2+d),n(h.z2))):(t.moveTo(e(h.x1),n(h.z1+d)),t.lineTo(e(h.x2),n(h.z2+d))),t.stroke()}}if(l.buildings)for(let h of o.buildings){let d=e(h.rect.x0),f=n(h.rect.z0),m=h.w*i,y=h.d*i;t.fillStyle=po[h.kind]||"#999",t.fillRect(d,f,m,y),t.fillStyle="#00000022",t.fillRect(d+m*.08,f+y*.08,m*.84,y*.84),t.fillStyle=po[h.kind]||"#999",t.fillRect(d+m*.12,f+y*.12,m*.76,y*.76),t.strokeStyle="#33333388",t.lineWidth=1,t.strokeRect(d,f,m,y)}let u=(o.city.landmarks||[]).find(h=>h.kind==="plaza");u&&l.landmarks&&(t.fillStyle="#e8dfc2",t.beginPath(),t.arc(e(u.x),n(u.z),11*i,0,7),t.fill(),t.fillStyle="#6fb7d6",t.beginPath(),t.arc(e(u.x),n(u.z),4*i,0,7),t.fill())}staticLayer(){let t=JSON.stringify([this.layers.districts,this.layers.roads,this.layers.buildings,this.layers.plots,this.layers.landmarks]),e=this.extent(),n=e.x1-e.x0+200,i=e.z1-e.z0+100,r=Math.min(3,3e3/Math.max(n,i));if(this.cache&&this.cache.key===t)return this.cache;let o=document.createElement("canvas");o.width=Math.ceil(n*r),o.height=Math.ceil(i*r);let a=o.getContext("2d"),l=e.x0-100,c=e.z0-50;return this.drawStatic(a,u=>(u-l)*r,u=>(u-c)*r,r),this.cache={key:t,cv:o,ppu:r,ox:l,oz:c},this.cache}draw(){let t=this.ctx,e=this.v.k,n=this.dpr;t.setTransform(n,0,0,n,0,0),t.clearRect(0,0,this.W,this.H);let i=this.staticLayer();e<=i.ppu*1.2?(t.imageSmoothingEnabled=!0,t.drawImage(i.cv,this.sx(i.ox),this.sz(i.oz),i.cv.width*e/i.ppu,i.cv.height*e/i.ppu)):this.drawStatic(t,r=>this.sx(r),r=>this.sz(r),e,!0),this.drawLabels(t,e),this.drawDynamic(t,e)}text(t,e,n,i,r={}){t.font=`${r.w||700} ${r.s||12}px Nunito, system-ui, sans-serif`,t.textAlign=r.a||"center",t.textBaseline="middle",t.lineWidth=3.5,t.strokeStyle=r.stroke||"#fffdf3e6",t.lineJoin="round",t.strokeText(e,n,i),t.fillStyle=r.fill||"#2a2a2a",t.fillText(e,n,i)}onScreen(t,e,n=40){return t>-n&&e>-n&&t<this.W+n&&e<this.H+n}drawLabels(t,e){let n=this.model,i=this.layers;if(i.districts&&xi.district(e)){let o=Math.min(1,(2.2-e)/.8);t.globalAlpha=Math.max(.35,o);for(let a of n.districts)this.text(t,a.name.toUpperCase(),this.sx((a.x0+a.x1)/2),this.sz((a.z0+a.z1)/2),{s:Math.max(13,Math.min(30,e*12)),w:800,fill:"#5b4a2a",stroke:"#ffffff99"});t.globalAlpha=1}if(i.roads&&xi.road(e))for(let o of n.roads){let a=o.vertical?o.z2-o.z1:o.x2-o.x1,l=Math.max(1,Math.floor(Math.abs(a)/170));for(let c=0;c<l;c++){let u=(c+.5)/l,h=o.x1+(o.x2-o.x1)*u,d=o.z1+(o.z2-o.z1)*u,f=this.sx(h),m=this.sz(d);this.onScreen(f,m)&&(t.save(),t.translate(f,m),o.vertical&&t.rotate(-Math.PI/2),this.text(t,o.name,0,0,{s:Math.max(10,Math.min(15,e*4.2)),fill:"#fff",stroke:"#3d4046"}),t.restore())}}let r={venue:"venues",shop:"venues",job:"jobs",landmark:"landmarks",house:"homes",billboard:"billboards"};for(let o of n.items){if(o.type==="plot"){i.plots&&xi.plot(e)&&this.text(t,o.name,this.sx(o.x),this.sz(o.z),{s:11,fill:"#2f5a1f"});continue}if(!i[r[o.type]]||o.type==="house"&&e<1.5)continue;let a=this.sx(o.x),l=this.sz(o.z);if(!this.onScreen(a,l))continue;let u=o.type==="venue"||o.type==="landmark"?Math.max(18,Math.min(30,e*9)):o.type==="billboard"?14:Math.max(14,Math.min(22,e*6));t.fillStyle=o.type==="billboard"?"#35c46b":o.type==="job"?"#4aa3ff":o.type==="house"?"#e56b6f":"#ffc20e",t.beginPath(),t.arc(a,l,u*.62,0,7),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke(),t.font=`${u*.78}px system-ui`,t.textAlign="center",t.textBaseline="middle",t.fillStyle="#000",t.fillText(o.icon,a,l+1),xi[o.type]?.(e)&&o.type!=="billboard"&&this.text(t,o.name,a,l+u*.62+9,{s:o.type==="venue"?12:11})}if(i.buildings&&xi.building(e))for(let o of n.buildings){let a=this.sx(o.x),l=this.sz(o.z);this.onScreen(a,l)&&this.text(t,o.name,a,l,{s:10,w:600})}}playersNow(){let t=[];for(let e of this.g.ghosts?.map?.values?.()||[])e.root&&t.push({id:e.id,name:e.name,x:e.root.position.x,z:e.root.position.z,color:e.color});return t}drawDynamic(t,e){let n=this.layers;this.others=this.playersNow();let i=performance.now(),r=this.sel||this.hover;r?.rect?(t.strokeStyle="#ff3b30",t.lineWidth=3,t.setLineDash([]),t.strokeRect(this.sx(r.rect.x0),this.sz(r.rect.z0),(r.rect.x1-r.rect.x0)*e,(r.rect.z1-r.rect.z0)*e)):r&&r.x!=null&&(t.strokeStyle="#ff3b30",t.lineWidth=3,t.beginPath(),t.arc(this.sx(r.x),this.sz(r.z),20,0,7),t.stroke());let o=this.g.waypoint;if(o&&(t.fillStyle="#b44cff",t.beginPath(),t.arc(this.sx(o.x),this.sz(o.z),7,0,7),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke()),n.players)for(let f of this.others){let m=this.sx(f.x),y=this.sz(f.z);this.onScreen(m,y)&&(t.fillStyle="#fff",t.beginPath(),t.arc(m,y,5,0,7),t.fill(),t.fillStyle=f.color||"#2a9d8f",t.beginPath(),t.arc(m,y,3.4,0,7),t.fill(),xi.player(e)&&this.text(t,f.name,m,y-12,{s:10}))}let a=this.g.ctrl,l=this.sx(a.x),c=this.sz(a.z);t.strokeStyle=`rgba(255,59,48,${.5-.4*Math.abs(Math.sin(i/500))})`,t.lineWidth=3,t.beginPath(),t.arc(l,c,14+4*Math.abs(Math.sin(i/500)),0,7),t.stroke(),t.save(),t.translate(l,c),t.rotate(-a.ry+Math.PI/2),t.fillStyle="#ff3b30",t.beginPath(),t.moveTo(0,-11),t.lineTo(8,9),t.lineTo(0,5),t.lineTo(-8,9),t.closePath(),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke(),t.restore(),this.text(t,"You",l,c+22,{s:11,fill:"#b3261e"});let u=[10,20,50,100,200].find(f=>f*e>=60)||200,h=14,d=this.H-18;t.fillStyle="#fffdf3cc",t.fillRect(h-6,d-14,u*e+12,26),t.strokeStyle="#333",t.lineWidth=2,t.beginPath(),t.moveTo(h,d+4),t.lineTo(h,d+8),t.lineTo(h+u*e,d+8),t.lineTo(h+u*e,d+4),t.stroke(),this.text(t,`${u} m`,h+u*e/2,d-4,{s:11,stroke:"transparent"}),this.text(t,"N \u25B2",this.W-34,this.H-20,{s:12,w:800})}hitAt(t,e){return yu(this.model,this.wx(t),this.wz(e),this.v.k,this.layers,this.others||this.playersNow())}select(t){this.sel=t,this.showCard(t,!0)}showCard(t,e){if(!t){this.card.classList.add("hidden");return}let n=this.g;this.card.classList.remove("hidden"),this.card.classList.toggle("pinned",!!e);let i=[g("div",{class:"row sp"},g("b",{},`${t.icon?t.icon+" ":""}${t.name}`),e?g("button",{class:"bm-x",onclick:()=>{this.sel=null,this.card.classList.add("hidden")}},"\u2715"):""),...(t.lines||[]).filter(Boolean).map(r=>g("div",{class:"mut"},r))];e&&t.placeId?i.push(g("div",{class:"row"},g("button",{class:"btn small alt",id:"bmOpen",onclick:()=>{this.close(),n.ui.place(t.placeId)}},"Open and travel"),g("button",{class:"btn small ghost",onclick:()=>{n.setWaypoint(t.x,t.z,t.name),n.ui.toast(`Waypoint set: ${t.name}.`),this.close()}},"\u{1F4CD} Waypoint"))):e&&t.x!=null&&i.push(g("div",{class:"row"},g("button",{class:"btn small ghost",onclick:()=>{n.setWaypoint(t.x,t.z,t.name),n.ui.toast(`Waypoint set: ${t.name}.`),this.close()}},"\u{1F4CD} Set waypoint here"))),this.card.replaceChildren(...i)}showList(){let t=xu(this.model,this.input.value);this.list.classList.remove("hidden"),this.list.replaceChildren(...t.length?t.map(e=>g("button",{class:"bm-item","data-id":e.id,onclick:()=>{this.list.classList.add("hidden"),this.input.blur(),this.focusOn(e),this.select({...e,rect:e.type==="plot"?{x0:e.x-e.size/2,x1:e.x+e.size/2,z0:e.z-e.size/2,z1:e.z+e.size/2}:void 0})}},g("span",{},`${e.icon||(e.type==="road"?"\u{1F6E3}":"\u{1F4CD}")} ${e.name}`),g("small",{class:"mut"},e.group))):[g("div",{class:"mut",style:"padding:10px"},"Nothing found.")])}drawLegend(){let t=e=>g("label",{class:"bm-lg"},g("input",{type:"checkbox","data-layer":e[0],checked:this.layers[e[0]],onchange:n=>{this.layers[e[0]]=n.target.checked,this.cache=null}}),g("i",{style:`background:${e[2]}`}),e[1]);this.legend.replaceChildren(g("b",{},"Layers"),...mu.map(t),g("b",{style:"margin-top:6px"},"Buildings"),g("div",{class:"bm-kinds"},Object.entries(po).map(([e,n])=>g("span",{},g("i",{style:`background:${n}`}),e))))}bind(){let t=this.canvas,e=new Map,n=null,i=null,r=0;t.addEventListener("wheel",a=>{a.preventDefault();let l=t.getBoundingClientRect();this.zoomAt(a.clientX-l.left,a.clientY-l.top,Math.exp(-a.deltaY*.0015))},{passive:!1}),t.addEventListener("pointerdown",a=>{if(t.setPointerCapture(a.pointerId),e.set(a.pointerId,{x:a.clientX,y:a.clientY}),r=0,this.list.classList.add("hidden"),e.size===1)n={x:a.clientX,y:a.clientY};else if(e.size===2){let[l,c]=[...e.values()];i={d:Math.hypot(l.x-c.x,l.y-c.y)},n=null}}),t.addEventListener("pointermove",a=>{let l=t.getBoundingClientRect();if(!e.has(a.pointerId)){if(a.pointerType==="mouse"&&!this.sel){let c=this.hitAt(a.clientX-l.left,a.clientY-l.top);this.hover=c,this.showCard(c,!1),t.style.cursor=c&&c.type!=="water"?"pointer":"grab"}return}if(e.set(a.pointerId,{x:a.clientX,y:a.clientY}),e.size===2&&i){let[c,u]=[...e.values()],h=Math.hypot(c.x-u.x,c.y-u.y);this.zoomAt((c.x+u.x)/2-l.left,(c.y+u.y)/2-l.top,h/i.d),i.d=h,r=99}else if(n){let c=a.clientX-n.x,u=a.clientY-n.y;r+=Math.abs(c)+Math.abs(u),n.x=a.clientX,n.y=a.clientY,this.v.cx-=c/this.v.k,this.v.cz-=u/this.v.k}});let o=a=>{let l=t.getBoundingClientRect(),c=e.has(a.pointerId);if(e.delete(a.pointerId),e.size<2&&(i=null),e.size){if(e.size===1){let[u]=[...e.values()];n={x:u.x,y:u.y}}}else{if(c&&r<8&&a.type==="pointerup"){let u=this.hitAt(a.clientX-l.left,a.clientY-l.top);this.select(u)}n=null}};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}};var ns=s=>s[Math.floor(Math.random()*s.length)],j0={wage:s=>ns([`Nailed it! ${mt(s)} don enter your pocket.`,`Oya collect your ${mt(s)}. Hustle pays!`,`Correct hustle! +${mt(s)}`]),shiftStart:()=>ns(["Oya, na work time! Shift don start.","Shift don start. No dull!"]),bought:s=>ns([`Correct! You pay ${mt(s)}.`,`Paid ${mt(s)}. Enjoy am!`]),home:()=>ns(["Congrats, na your house be this!","New keys, new vibes. Welcome home!"]),plot:()=>"Congrats, the land is yours! Watch out for omo-onile.",travel:s=>s?`Safe journey! ${mt(s)} gone for transport.`:"Enjoy the ride, free of charge.",hit:s=>`Nailed it! +${s}% bonus on this shift.`,miss:()=>"Ah ah, you miss am! No bonus this time.",sold:s=>`Sold. ${mt(s)} back in your pocket.`,blocked:()=>"Something is in the way."},Q0={INSUFFICIENT_FUNDS:()=>ns(["Your pocket dry o. Money no reach.","No cash for that one. Go hustle first!"]),TOO_FAR:()=>ns(["You dey far o. Move closer.","Walk go there first, oga."]),TOO_TIRED:()=>"You don tire. Eat or rest first!",TOO_HUNGRY:()=>"Hunger dey vex you. Buy food first.",BLOCKED:()=>"Something is in the way.",COOLDOWN:null,LOGIN_REQUIRED:()=>"Session don end. Please log in again."},Oe=(s,...t)=>j0[s](...t),go=class{constructor(t){this.g=t,this.sheetOpen=!1,this.onClose=null,this.mm=st("#minimap").getContext("2d"),st("#minimap").style.cursor="pointer",st("#minimap").title="Open the full map (M)",st("#minimap").addEventListener("click",()=>this.openMap()),this.chatOn=!1,this.sfxOn=!0,this.actx=null,st("#sheetX").onclick=()=>this.closeSheet(),st("#sheetWrap").addEventListener("pointerdown",e=>{e.target.id==="sheetWrap"&&this.closeSheet()}),st("#phoneBtn").onclick=()=>this.phone(),st("#muteBtn").onclick=()=>{this.sfxOn=!this.sfxOn,st("#muteBtn").textContent=this.sfxOn?"\u{1F50A}":"\u{1F507}"},st("#carBtn").onclick=()=>t.toggleCar(),st("#chatForm").addEventListener("submit",async e=>{e.preventDefault();let n=st("#chatInput"),i=n.value.trim();if(!i)return this.hideChat();n.value="",this.hideChat();try{await St("/api/chat",{text:i})}catch(r){this.error(r)}}),addEventListener("keydown",e=>{if(e.target.closest("input,textarea")){e.key==="Escape"&&(this.hideChat(),e.target.blur());return}if(e.key==="Escape"&&this.sheetOpen&&this.closeSheet(),!t.playing)return;let n=e.key.toLowerCase();n==="t"||n==="enter"?(e.preventDefault(),this.showChat()):n==="p"?this.phone():n==="m"?this.openMap():n==="c"?t.toggleCar():(n==="f"||n===" ")&&(this.sheetOpen||t.doAction())}),st("#actionBtn").onclick=()=>t.doAction()}sfx(t){if(this.sfxOn)try{this.actx||(this.actx=new(window.AudioContext||window.webkitAudioContext));let e=this.actx,n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination);let r={coin:[[880,.07],[1320,.12]],ok:[[520,.08],[780,.1]],bad:[[180,.18]],horn:[[330,.22],[330,.22]],thunk:[[110,.09]],knock:[[140,.06],[140,.06],[140,.06]]}[t]||[[600,.08]],o=e.currentTime;n.type=t==="horn"?"sawtooth":"triangle",i.gain.setValueAtTime(.08,o);for(let[a,l]of r)n.frequency.setValueAtTime(a,o),o+=l;i.gain.exponentialRampToValueAtTime(1e-4,o+.05),n.start(),n.stop(o+.08)}catch{}}haptic(t=15){try{navigator.vibrate?.(t)}catch{}}toast(t,e=""){let n=g("div",{class:`toast ${e}`},t),i=st("#toasts");for(i.append(n);i.children.length>3;)i.firstChild.remove();setTimeout(()=>n.remove(),4300),e==="bad"?this.sfx("bad"):e==="money"&&(this.sfx("coin"),this.haptic())}error(t){if(t instanceof dn){if(t.status===401&&t.code==="LOGIN_REQUIRED"){this.g.sessionLost();return}let e=Q0[t.code];this.toast(e?e():t.message,"bad")}else console.error(t),this.toast("Something went wrong. Try again.","bad")}showChat(){st("#chatForm").classList.add("on"),st("#chatInput").focus()}hideChat(){st("#chatForm").classList.remove("on"),st("#game").focus()}addChat(t,e,n){let i=g("div",{style:"pointer-events:auto;cursor:pointer",title:"Tap to report, mute or block",onclick:()=>this.playerMenu(t,n&&{kind:"chat",target:n,text:`${t}: ${e}`})},`${t}: ${e}`);for(st("#chatlog").append(i);st("#chatlog").children.length>5;)st("#chatlog").firstChild.remove();setTimeout(()=>i.remove(),14e3)}playerMenu(t,e){if(t===this.g.user?.username)return;this.openSheet(`@${t}`,[e?g("p",{class:"mut"},`"${e.text}"`):"",g("div",{class:"row"},e?g("button",{class:"btn red",onclick:()=>this.reportSheet(e.kind,e.target,e.text)},"\u{1F6A9} Report"):"",g("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"mute")},"\u{1F507} Mute"),g("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"block")},"\u26D4 Block")),g("p",{class:"mut"},"Mute: you stop seeing their chat and messages. Block: they cannot message you, knock on your door or sit at your tables, and you will not see each other.")])}async setBlock(t,e){await this.guard(()=>St("/api/social/mute",{username:t,kind:e}))&&(this.toast(e==="block"?`@${t} blocked.`:e==="mute"?`@${t} muted.`:`@${t} unblocked.`),this.closeSheet())}reportSheet(t,e,n=""){let i={abusive:"Abusive or insulting",sexual:"Sexual content",hate:"Hate or discrimination",scam_spam:"Scam or spam",personal_info:"Shares personal info",misleading:"Misleading",other:"Something else"},r="abusive",o=g("input",{class:"sheet-input",maxlength:200,placeholder:"Anything we should know? (optional)"}),a=g("div",{class:"chips"}),l=()=>a.replaceChildren(...Object.entries(i).map(([c,u])=>g("button",{class:`chip ${c===r?"on":""}`,onclick:()=>{r=c,l()}},u)));l(),this.openSheet("Report",[g("p",{class:"mut"},n?`Reporting: ${n}`:"Tell us what is wrong."),a,o,g("div",{class:"row"},g("button",{class:"btn red",onclick:async()=>{let c=await this.guard(()=>St("/api/report",{kind:t,target:String(e),reason:r,detail:o.value}));c&&(this.toast(c.message),this.closeSheet())}},"Send report"),g("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")),g("p",{class:"mut"},"Reports go to a human reviewer. False reports can limit your own account.")])}hud(t){st("#cash").textContent=mt(t.cash),st("#sav").textContent="\u{1F3E6} "+mt(t.savings),st("#energyBar").style.width=t.energy+"%",st("#hungerBar").style.width=t.hunger+"%",st("#moodBar").style.width=(t.mood??60)+"%",st("#moodBar").style.background=(t.mood??60)>=this.g.cfg.moodHappyAt?"#f7c948":"#e58fb3",st("#energyBar").style.background=t.energy<20?"#d6402f":"#35c46b",st("#hungerBar").style.background=t.hunger<20?"#d6402f":"#f29a2e";let e=st("#shiftbar");if(t.shift){let n=this.g.cfg.jobs?.find(r=>r.id===t.shift.jobId),i=Math.max(0,t.shift.endsAt-this.g.serverNow());e.classList.remove("hidden"),e.textContent=i>0?`\u{1F4BC} ${n?.name||"Shift"} \xB7 ${Math.ceil(i/1e3)}s left`:`\u{1F4BC} ${n?.name||"Shift"} done: collect your pay!`}else e.classList.add("hidden")}clock(t){let e=(t.hour+11)%12+1,n=t.hour<6||t.hour>=19;st("#clock").textContent=`${n?"\u{1F319}":"\u{1F31E}"} ${e}:${String(t.minute).padStart(2,"0")} ${t.hour>=12?"PM":"AM"} \xB7 Day ${t.day}`}badge(t){let e=st("#phoneBadge");e.textContent=t,e.classList.toggle("hidden",!t)}loc(t){st("#loc").textContent=t}waypoint(t,e){let n=st("#waypoint");if(!t)return n.classList.add("hidden");n.classList.remove("hidden"),n.textContent=`\u{1F4CD} ${t.label} \xB7 ${Math.round(e)} m`}action(t){let e=st("#actionBtn");if(!t)return e.classList.add("hidden");e.classList.remove("hidden"),e.textContent=t}minimap(t,e,n,i,r){let o=this.mm,a=300,l=a/520,c=e.bounds,u=d=>(d-c.minX)*l+8,h=d=>(d-c.minZ)*l+8;o.clearRect(0,0,a,a),o.fillStyle="#c9c3ad",o.fillRect(0,0,a,a),o.fillStyle="#2b6f8a",o.fillRect(0,h(c.maxZ),a,a),o.fillStyle="#3d4046";for(let d of e.roads)o.fillRect(u(Math.min(d.x1,d.x2))-(d.x1===d.x2?d.width*l/2:0),h(Math.min(d.z1,d.z2))-(d.z1===d.z2?d.width*l/2:0),d.x1===d.x2?d.width*l:Math.abs(d.x2-d.x1)*l,d.z1===d.z2?d.width*l:Math.abs(d.z2-d.z1)*l);o.fillStyle="#8f8a79";for(let d of e.buildings)o.fillRect(u(d.x-d.w/2),h(d.z-d.d/2),d.w*l,d.d*l);o.fillStyle="#ffc20e";for(let d of e.shops)o.fillRect(u(d.x)-3,h(d.z)-3,6,6);o.fillStyle="#4aa3ff";for(let d of e.jobs)o.fillRect(u(d.x)-3,h(d.z)-3,6,6);o.fillStyle="#35c46b";for(let d of e.billboards)d.surface!=="lagoon_plot"&&o.fillRect(u(d.x)-2,h(d.z)-2,4,4);i&&(o.fillStyle="#b44cff",o.beginPath(),o.arc(u(i.x),h(i.z),7,0,7),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke()),o.fillStyle="#fff";for(let d of n.map.values())d.root&&(o.beginPath(),o.arc(u(d.root.position.x),h(d.root.position.z),3.5,0,7),o.fill());o.save(),o.translate(u(t.x),h(t.z)),o.rotate(-t.ry+Math.PI/2),o.fillStyle="#ff3b30",o.beginPath(),o.moveTo(0,-8),o.lineTo(6,7),o.lineTo(-6,7),o.closePath(),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke(),o.restore()}openSheet(t,e,n){this.onClose=n||null,st("#sheetTitle").textContent=t,st("#sheetBody").replaceChildren(...[].concat(e)),st("#sheetWrap").classList.remove("hidden"),this.sheetOpen=!0,this.g.ctrl.frozen=!0}setSheetBody(t){st("#sheetBody").replaceChildren(...[].concat(t))}closeSheet(){if(!this.sheetOpen)return;st("#sheetWrap").classList.add("hidden"),this.sheetOpen=!1,this.g.ctrl.frozen=this.g.busy,clearInterval(this.tick);let t=this.onClose;this.onClose=null,t?.(),st("#game").focus()}async guard(t){try{return await t()}catch(e){return this.error(e),null}}async place(t){let n=this.g.city.places.find(o=>o.id===t);if(!n)return;let i=g("div",{});this.openSheet(n.name,i),clearInterval(this.tick),(async()=>{let o=await Kt(`/api/travel/quote?place=${encodeURIComponent(t)}`).catch(d=>(this.error(d),null));if(!o||!this.sheetOpen)return;let a=o.distance<22,l=a?null:this.lastMode&&o.modes.find(d=>d.id===this.lastMode)?this.lastMode:"keke",c=g("div",{}),u=g("div",{}),h=()=>{let d=g("div",{class:"chips"},o.modes.map(y=>g("button",{class:`chip ${y.id===l?"on":""}`,onclick:()=>{l=y.id,this.lastMode=y.id,h()}},{walk:"\u{1F6B6}",keke:"\u{1F6FA}",danfo:"\u{1F68C}",car:"\u{1F697}"}[y.id]||""," ",y.label,g("small",{},y.fare?`${mt(y.fare)} \xB7 ${y.seconds}s`:`free \xB7 ~${y.seconds}s`)))),f=o.modes.find(y=>y.id===l),m=g("button",{class:"btn big alt",disabled:a||!f,onclick:()=>this.go(n,f,o)},a?"You're here":l==="walk"?"Set waypoint & walk":`Go \xB7 ${mt(f.fare)}`);u.replaceChildren(g("div",{class:"row sp"},g("span",{class:"mut"},`${Math.round(o.distance)} m away`),g("span",{class:`tag ${o.rush?"amber":"green"}`},(o.rush?"\u23F0 ":"")+o.traffic)),a?"":d,m)};h(),i.replaceChildren(g("div",{class:"mut"},`${n.area} \xB7 ${ex(n.type)}`),c,u),this.fillPlaceInfo(c,n,o)})()}async go(t,e,n){let i=this.g;if(e.id==="walk"){i.setWaypoint(t.x,t.z,t.name),this.closeSheet(),this.toast(`Waypoint set: ${t.name}. Follow the purple pin.`);return}let r=await this.guard(()=>St("/api/travel",{placeId:t.id,mode:e.id,pos:i.pos()}));r&&(this.closeSheet(),i.update(r.user),i.runCommute(r,t,n))}fillPlaceInfo(t,e,n){e.type==="shop"?this.shopBlock(t,e.id):e.type==="job"?this.jobBlock(t,e.id):e.type==="house"?this.houseBlock(t,e.id):e.type==="plot"?this.plotBlock(t,e.id):e.type==="venue"?this.venueBlock(t,e):t.replaceChildren(g("p",{class:"mut"},e.id==="airport"?"Fast travel to other cities (Abuja, Port Harcourt) comes later. The airport also hosts premium ad boards.":"A public landmark. Wave to the neighbours."))}venueBlock(t,e){let n=tx(this.g.pos(),e)<20,i=e.hours?`Open ${e.hours[0]}:00 to ${e.hours[1]}:00`:"";t.replaceChildren(g("p",{class:"mut"},i),g("p",{},e.id==="venue_motors"?"Look at the cars, compare running costs and buy one. Placeholder prices are ESTIMATES.":e.id==="venue_meco"?"Meco fixes cars. Check your car, or pay a placeholder (ESTIMATE) fee for a quick service.":"Step inside to eat, chat, and play Whot or Ayo against other players. \u{1F3B2} Game money only."),g("button",{class:"btn big alt",disabled:!n,id:"venueEnter",onclick:()=>{this.closeSheet(),this.g.venue.show(e.id)}},n?"Go inside":"Walk to the door first"))}async shopBlock(t,e){let n=await this.guard(()=>Kt("/api/shops"));if(!n)return;let i=n.shops.find(a=>a.id===e);if(!i)return;this.g.shops=n.shops;let r="local",o=()=>{let a=Math.hypot(this.g.ctrl.x-i.x,this.g.ctrl.z-i.z)<24,l=n.channels.delivery;t.replaceChildren(g("p",{class:"mut"},i.desc),g("div",{class:"row"},g("span",{class:`tag ${i.status.open?"green":"red"}`},i.status.text),g("span",{class:"tag"},i.channel==="market"?`Market \xD7${n.channels.market.mult}`:`Supermarket \xD7${n.channels.supermarket.mult}`)),g("div",{class:"chips"},g("button",{class:`chip ${r==="local"?"on":""}`,onclick:()=>{r="local",o()}},i.channel==="market"?"Market stall":"In store",g("small",{},a?"you are here":"walk there")),g("button",{class:`chip ${r==="delivery"?"on":""}`,onclick:()=>{r="delivery",o()}},"\u{1F6F5} Delivery",g("small",{},`\xD7${l.mult} + ${mt(l.fee)} fee`))),g("div",{class:"list"},i.items.map(c=>{let u=r==="delivery"?c.deliveryPrice:c.price,h=r==="local"&&(!i.status.open||!a);return g("div",{},g("div",{},g("b",{},c.name),g("div",{class:"mut"},[c.hunger?`\u{1F372} +${c.hunger}`:"",c.energy?`\u26A1 +${c.energy}`:""].filter(Boolean).join("  "))),g("button",{class:"btn small",disabled:h,onclick:()=>this.buy(i,c,r,u,l.fee)},`${mt(u)}${r==="delivery"?"+"+l.fee:""}`))})),r==="local"&&!a?g("p",{class:"mut"},"Walk or ride to the shop to buy here, or switch to delivery."):"")};o()}async buy(t,e,n,i,r){let o=await this.guard(()=>St("/api/shop/buy",{shopId:t.id,itemId:e.id,channel:n,qty:1,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Oe("bought",o.spent),"money"))}jobBlock(t,e){let n=this.g,i=(n.cfg.jobs||[]).filter(o=>o.location===e),r=async()=>{let o=await this.guard(()=>Kt("/api/jobs"));if(!o)return;let a=n.user,l=o.jobs.filter(h=>h.location===e),c=a.shift,u=l.map(h=>{let d=c&&c.jobId===h.id,f=d?Math.max(0,c.endsAt-n.serverNow()):0;return g("div",{class:"card",style:"margin:8px 0;padding:12px;box-shadow:none;border:2px solid #e3dcc2"},g("div",{class:"row sp"},g("b",{},h.name),g("span",{class:"tag amber"},`${mt(h.wage)} / ${h.durationSec}s`)),g("div",{class:"mut"},h.desc),g("div",{class:"mut"},`\u26A1 -${h.energyCost}  \u{1F372} -${h.hungerCost}  \xB7 cooldown ${h.cooldownSec}s${h.locked?` \xB7 \u{1F512} ${h.shiftsNeeded} more shift(s) to unlock`:""}`),d?g("div",{},g("div",{class:"progress"},g("i",{style:`width:${Math.min(100,100-f/(h.durationSec*10))}%`})),f>0?g("div",{class:"mut"},`${Math.ceil(f/1e3)}s left`):"",g("div",{class:"row"},g("button",{class:"btn alt",onclick:()=>this.miniGame(r)},"\u{1F3AF} Quick task (+25%)"),g("button",{class:"btn",disabled:f>0,onclick:async()=>{let m=await this.guard(()=>St("/api/jobs/claim"));m&&(n.update(m.user),this.toast(Oe("wage",m.wage),"money"),r())}},f>0?"Working\u2026":"Collect pay"))):g("button",{class:"btn",style:"margin-top:6px",disabled:h.locked||!!c||h.cooldownLeftMs>0,onclick:async()=>{let m=await this.guard(()=>St("/api/jobs/start",{jobId:h.id,pos:n.pos()}));m&&(n.update(m.user),this.toast(Oe("shiftStart")),r())}},h.cooldownLeftMs>0?`Break (${Math.ceil(h.cooldownLeftMs/1e3)}s)`:c?"Finish your shift first":"Start shift"))});t.replaceChildren(...u)};r(),clearInterval(this.tick),this.tick=setInterval(()=>{this.sheetOpen&&!this.mgOpen&&r()},2500)}async miniGame(t){let e=await this.guard(()=>St("/api/jobs/task/start"));if(!e)return;this.mgOpen=!0;let n,i=g("div",{class:"cur"}),r=g("div",{class:"zone",style:`left:${(e.target-e.width/2)*100}%;width:${e.width*100}%`}),o=g("div",{class:"mgbar"},r,i),a=g("div",{class:"big",style:'font:400 22px "Lilita One";min-height:30px'}),l=!1,c=d=>{let f=d-Math.floor(d);return f<.5?f*2:2-f*2},u=()=>{i.style.left=`calc(${c((this.g.serverNow()-e.startedAt)/e.periodMs)*100}% - 4px)`,l||(n=requestAnimationFrame(u))};u();let h=g("button",{class:"btn big alt",onclick:async()=>{if(l){this.mgOpen=!1,t();return}l=!0;let d=await this.guard(()=>St("/api/jobs/task/stop"));cancelAnimationFrame(n),d?(i.style.left=`calc(${d.pos*100}% - 4px)`,a.textContent=d.hit?Oe("hit",d.bonusPct):Oe("miss"),this.sfx(d.hit?"coin":"bad"),h.textContent="Back to work"):(this.mgOpen=!1,t())}},"STOP!");this.setSheetBody(g("div",{class:"minigame"},g("p",{class:"mut"},"Stop the gold bar inside the green zone. One try per shift."),o,a,h))}async houseBlock(t,e){let n=this.g,i=await this.guard(()=>Kt("/api/properties"));if(!i)return;n.props=i.properties,n.world.setMarkers(i.properties);let r=i.properties.find(f=>f.id===e);if(!r)return;let o=n.cfg.maxNameLen,a=r.status==="yours",l={home:"They're home right now",online:"Online, but out and about",away:"Not around right now"}[r.presence],c=r.owner?`@${r.owner}'s ${r.name}`:`${r.baseName}`,u=a?g("div",{class:"row"},g("button",{class:"btn small ghost",onclick:()=>this.rename(r,()=>this.houseBlock(t,e))},"\u270F\uFE0F Rename"),g("span",{class:"mut"},`max ${o} characters`)):"",h=Math.hypot(n.ctrl.x-r.door.x,n.ctrl.z-r.door.z)<30,d=[];d.push(g("div",{class:"row"},r.owner?g("div",{class:"avatar",style:`background:${r.ownerColor||"#2e9b5e"}`},r.owner[0].toUpperCase()):g("div",{class:"avatar",style:"background:#8a8f98"},"\u{1F3E0}"),g("div",{},g("b",{style:"font-size:18px"},c),g("div",{class:"mut"},`${r.tierLabel} \xB7 ${r.area}`)))),r.owner&&d.push(g("div",{class:"row sp"},g("span",{},g("span",{class:`dot ${r.presence}`}),l),g("span",{class:"tag"},`${r.items} items`))),d.push(u),a?(d.push(g("div",{class:"row"},g("span",{class:"tag green"},r.mode==="own"?"You own this":`Rent ${mt(r.rent)}/day`),r.nextRentDue?g("span",{class:"mut"},`next rent ${new Date(r.nextRentDue).toLocaleString("en-NG",{weekday:"short",hour:"numeric",minute:"2-digit"})}`):"")),d.push(g("div",{class:"row"},g("button",{class:"btn",onclick:()=>{this.closeSheet(),n.enterHome()}},"\u{1F6AA} Go inside"),g("button",{class:"btn ghost",onclick:()=>this.confirm(r.mode==="own"?"Sell for about 70% of what you paid?":"Move out? (no refund)",async()=>{let f=await this.guard(()=>St("/api/property/release"));f&&(n.update(f.user),this.toast(f.refund?Oe("sold",f.refund):"You moved out."),this.houseBlock(t,e))})},r.mode==="own"?"Sell house":"Move out")))):r.owner?(d.push(g("div",{class:"row"},g("button",{class:"btn",disabled:r.presence!=="home"||!h,onclick:()=>this.knock(r)},"\u{1F3E0} Visit"),g("button",{class:"btn ghost",onclick:()=>this.message(r.owner)},"\u{1F4AC} Message"),g("button",{class:"btn ghost small",title:"Mute, block or report",onclick:()=>this.playerMenu(r.owner,r.hasCustomName&&!r.nameHidden?{kind:"house_name",target:r.id,text:`${r.owner}'s "${r.name}"`}:null)},"\u22EF"))),d.push(g("div",{class:"mut"},"You can only drop by when they're home"+(h?".":" and you are at the door.")))):(d.push(g("p",{class:"mut"},`${r.rooms} room(s). Rent ${mt(r.rent)} per day (first day paid up front)${r.price?` \xB7 or buy for ${mt(r.price)}`:" \xB7 rent only"}.`)),d.push(g("div",{class:"row"},g("button",{class:"btn",disabled:!h,onclick:()=>this.review(r,"rent",()=>this.houseBlock(t,e))},`Rent \xB7 ${mt(r.rent)}`),r.price?g("button",{class:"btn alt",disabled:!h,onclick:()=>this.review(r,"own",()=>this.houseBlock(t,e))},`Buy \xB7 ${mt(r.price)}`):"")),h||d.push(g("div",{class:"mut"},"Get to the door first (use the travel chips below)."))),t.replaceChildren(...d)}review(t,e,n){let i=e==="own"?t.price:t.rent,r=g("div",{},g("h3",{},"Review"),g("p",{},`${t.baseName} \xB7 ${t.tierLabel} \xB7 ${t.area}`),g("p",{},e==="own"?`Price ${mt(i)} (one-off). You can sell back later for about 70%.`:`Rent ${mt(i)} per day. Day 1 is paid now. Miss ${this.g.cfg.evictAfter||2} rent days and you are evicted.`),g("div",{class:"row"},g("button",{class:"btn alt",onclick:async()=>{let o=await this.guard(()=>St("/api/property/acquire",{propertyId:t.id,mode:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Oe("home"),"money"),this.sfx("ok"),n(),this.g.refreshProps())}},`Pay ${mt(i)}`),g("button",{class:"btn ghost",onclick:n},"Back")));this.setSheetBody(r)}confirm(t,e){this.setSheetBody(g("div",{},g("p",{},t),g("div",{class:"row"},g("button",{class:"btn red",onclick:e},"Yes"),g("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel"))))}rename(t,e){let n=this.g.cfg.maxNameLen,i=g("input",{class:"sheet-input",maxlength:n,value:t.name});this.setSheetBody(g("div",{},g("h3",{},"Name your house"),i,g("p",{class:"mut"},`3-${n} characters. Rude names get refused.`),g("div",{class:"row"},g("button",{class:"btn",onclick:async()=>{let r=await this.guard(()=>St("/api/property/name",{name:i.value}));r&&(this.g.update(r.user),this.toast(`Your house is now "${r.name}"`,"money"),this.g.refreshProps(),e())}},"Save"),g("button",{class:"btn ghost",onclick:e},"Cancel")))),i.focus(),i.select()}message(t){let e=g("input",{class:"sheet-input",maxlength:140,placeholder:`Message @${t}\u2026`});this.setSheetBody(g("div",{},g("h3",{},`Message @${t}`),e,g("div",{class:"row"},g("button",{class:"btn",onclick:async()=>{await this.guard(()=>St("/api/dm",{to:t,text:e.value}))&&(this.toast("Message sent."),this.closeSheet())}},"Send"),g("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")))),e.focus()}async knock(t){let e=await this.guard(()=>St("/api/visit/knock",{propertyId:t.id,pos:this.g.pos()}));if(!e)return;this.sfx("knock");let n=this.g,i=!0,r=g("b",{}),o=g("div",{style:"text-align:center"},g("h3",{},"Knock knock\u2026"),g("p",{},`Waiting for @${e.owner} to open the door of ${e.name}`),g("p",{},r),g("button",{class:"btn ghost",onclick:async()=>{i=!1,await St("/api/visit/cancel").catch(()=>{}),this.closeSheet()}},"Walk away"));this.setSheetBody(o),this.onClose=()=>{i=!1};let a=Date.now(),l=async()=>{if(!i||!this.sheetOpen)return;r.textContent=`${Math.max(0,Math.ceil((e.expiresAt-n.serverNow())/1e3))}s`;let c=n.lastKnocks?.mine;if(c&&c.id===e.knockId){if(c.status==="accepted"){i=!1,this.closeSheet(),this.toast("Come in!","money"),n.enterAsVisitor(t.id);return}if(c.status==="declined"){i=!1,o.replaceChildren(g("p",{},`@${e.owner} isn't receiving visitors right now. \u{1F6AA}`),g("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}if(c.status==="expired"){i=!1,o.replaceChildren(g("p",{},`No answer at @${e.owner}'s door.`),g("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}}setTimeout(l,800)};n.net.nudge(),l()}hostKnock(t){if(this.knockShown===t.id)return;this.knockShown=t.id,this.sfx("knock");let e=g("div",{class:"toast money",style:"pointer-events:auto"},g("div",{},`\u{1F6AA} @${t.from} is at your door!`),g("div",{class:"row"},g("button",{class:"btn small",onclick:async()=>{e.remove(),await this.guard(()=>St("/api/visit/respond",{knockId:t.id,accept:!0}))&&this.toast(`@${t.from} is coming in.`)}},"Let in"),g("button",{class:"btn small red",onclick:async()=>{e.remove(),await this.guard(()=>St("/api/visit/respond",{knockId:t.id,accept:!1}))}},"Not now")));st("#toasts").append(e),setTimeout(()=>e.remove(),Math.max(1e3,t.expiresAt-this.g.serverNow()))}async plotBlock(t,e){let n=this.g,i=await this.guard(()=>Kt("/api/plots"));if(!i)return;let r=i.plots.find(c=>c.id===e);if(!r)return;n.plots=i.plots;let o=Math.hypot(n.ctrl.x-r.x,n.ctrl.z-r.z)<r.size/2+25,a=g("span",{class:`tag ${r.risk==="high"?"red":r.risk==="medium"?"amber":"green"}`},`Omo-onile risk: ${r.risk}`),l=[g("div",{class:"row"},g("b",{},r.name),a),g("div",{class:"row"},g("span",{class:"tag"},`${r.sqm} sqm`),g("span",{class:"tag green"},`\u{1F4C8} ~${r.growthPerWeekPct}%/week (ESTIMATE)`)),g("div",{class:"mut"},"Prices, growth and risk are placeholders for testing. Land value compounds over real days; omo-onile may demand a levy.")];r.status==="yours"?l.push(g("p",{},`Your plot. Value now ${mt(r.value)} \xB7 sell for ${mt(r.sellValue)}`),g("button",{class:"btn red",onclick:()=>this.confirm(`Sell for ${mt(r.sellValue)}?`,async()=>{let c=await this.guard(()=>St("/api/plot/sell",{plotId:e}));c&&(n.update(c.user),this.toast(Oe("sold",c.value),"money"),this.plotBlock(t,e),this.closeSheet())})},"Sell plot")):r.status==="taken"?l.push(g("p",{class:"mut"},`Owned by @${r.owner}.`)):l.push(g("p",{},`Price ${mt(r.price)}`),g("button",{class:"btn alt",disabled:!o,onclick:()=>this.setSheetBody(g("div",{},g("h3",{},"Review"),g("p",{},`${r.name} \xB7 ${r.area} \xB7 ${r.sqm} sqm`),g("p",{},`Price ${mt(r.price)}. ${r.risk==="high"?"Omo-onile risk is HIGH: expect levy demands.":r.risk==="medium"?"Some omo-onile risk.":"Documents are clean (low risk)."}`),g("div",{class:"row"},g("button",{class:"btn alt",onclick:async()=>{let c=await this.guard(()=>St("/api/plot/buy",{plotId:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:n.pos()}));c&&(n.update(c.user),this.toast(Oe("plot"),"money"),this.closeSheet())}},`Pay ${mt(r.price)}`),g("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Back"))))},"Buy plot"),o?"":g("div",{class:"mut"},"Walk up to the plot first.")),t.replaceChildren(...l)}async board(t){let e=this.g,n=Math.floor(e.serverNow()/e.ads.rot),i=e.ads.currentFor(t,n),r=e.world.boards[t].def,o=[g("div",{class:"mut"},`${{road_billboard:"Road billboard",airport_board:"Airport board",lagoon_plot:"Lagoon plot"}[r.surface]} \xB7 ${t}`)];i?o.push(g("h3",{},i.b),i.h?g("p",{},i.h):"",g("span",{class:"tag amber"},"Sponsored"),g("div",{class:"row"},g("button",{class:"btn ghost small",onclick:()=>this.reportSheet("ad_creative",i.c,`${i.b}${i.h?": "+i.h:""}`)},"\u{1F6A9} Report this ad"),g("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>St("/api/ads/tap",{campaign:i.c,slot:t,pos:e.pos()}));a&&(window.open(a.path,"_blank","noopener"),this.toast(`Opening ${a.brand}'s page in a new tab.`))}},"Visit advertiser"))):o.push(g("h3",{},"Your ad here"),g("p",{},"This board is free. Brands rent boards at /advertise (test mode)."),g("a",{href:"/advertise",target:"_blank",rel:"noopener",class:"btn"},"Advertise on this board")),this.openSheet("Billboard",o)}phone(t="wallet"){let e=this.g,n=[["wallet","\u{1F4B0} Wallet"],["jobs","\u{1F4BC} Jobs"],["home","\u{1F3E0} Home"],["land","\u{1F30D} Land"],["ranks","\u{1F3C6} Ranks"],["garage","\u{1F697} Garage"],["games","\u{1F3AE} Games"],["map","\u{1F5FA} Map"],["alerts","\u{1F514} Alerts"],["more","\u2699\uFE0F More"]],i=g("div",{}),r=t,o=g("div",{class:"tabrow"}),a=()=>o.replaceChildren(...n.map(([c,u])=>g("button",{class:c===r?"on":"",onclick:()=>{r=c,a(),l()}},u))),l=async()=>{i.replaceChildren(g("p",{class:"mut"},"Loading\u2026"));let u=await this["tab_"+r].call(this);i.replaceChildren(...[].concat(u))};a(),this.openSheet("Phone",[o,i]),l()}async tab_wallet(){let t=this.g,e=t.user,n=await this.guard(()=>Kt("/api/ledger")),i=g("input",{class:"sheet-input",type:"number",min:100,placeholder:"Amount \u20A6"}),r=g("input",{class:"sheet-input",placeholder:"Send to @username"}),o=a=>async()=>{let l=await this.guard(()=>St("/api/bank",{dir:a,amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));l&&(t.update(l.user),this.toast(a==="deposit"?"Saved in the bank.":"Withdrawn.","money"),this.setSheetBody([]),this.phone("wallet"))};return[g("div",{class:"row sp"},g("div",{},g("div",{class:"mut"},"Cash"),g("b",{style:"font-size:26px"},mt(e.cash))),g("div",{},g("div",{class:"mut"},"Savings (\u22480.5%/day, ESTIMATE)"),g("b",{style:"font-size:22px"},mt(e.savings))),g("div",{},g("div",{class:"mut"},"Net worth"),g("b",{},mt(e.netWorth)))),i,g("div",{class:"row"},g("button",{class:"btn",onclick:o("deposit")},"Save"),g("button",{class:"btn ghost",onclick:o("withdraw")},"Withdraw"),g("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>St("/api/transfer",{to:r.value.replace("@",""),amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));a&&(t.update(a.user),this.toast("Sent!","money"))}},"Send money")),r,g("p",{class:"mut"},"Transfers are capped and rate-limited. New accounts wait a few minutes. Guests cannot send money."),g("div",{class:"card",style:"box-shadow:none;border:2px dashed #cfc8ac;padding:12px;margin:10px 0"},g("b",{},"Test top-up"),g("div",{class:"mut"},"TEST MODE: adds pretend \u20A6, no payment is taken. Real payments (Monipay) come later."),g("div",{class:"chips"},(t.cfg.topupOptions||[]).map(a=>g("button",{class:"chip",onclick:async()=>{let l=await this.guard(()=>St("/api/topup/test",{amount:a,idem:crypto.randomUUID?.()||String(Math.random())}));l&&(t.update(l.user),this.toast(`+${mt(a)} (test)`,"money"))}},`+${mt(a)}`)))),g("b",{},"Recent activity"),g("div",{class:"list"},(n?.rows||[]).slice(0,12).map(a=>g("div",{},g("span",{},a.reason.replaceAll("_"," ")),g("b",{style:`color:${a.amount<0?"#d6402f":"#0b7a49"}`},(a.amount>0?"+":"")+mt(a.amount)))))]}async tab_jobs(){let t=await this.guard(()=>Kt("/api/jobs"));return t?[g("p",{class:"mut"},"Tap a job to set a waypoint. Start shifts at the job location."),g("div",{class:"list"},t.jobs.map(e=>g("div",{},g("div",{},g("b",{},e.name),g("div",{class:"mut"},`${mt(e.wage)} \xB7 ${e.durationSec}s \xB7 ${e.place}${e.locked?" \xB7 \u{1F512}":""}`)),g("button",{class:"btn small ghost",onclick:()=>{this.g.setWaypoint(e.x,e.z,e.name),this.closeSheet()}},"\u{1F4CD}"))))]:[]}async tab_home(){let t=this.g,e=t.user,n=await this.guard(()=>Kt("/api/properties"));return n?(t.props=n.properties,t.world.setMarkers(n.properties),e.home?[g("h3",{},e.home.name),g("div",{class:"mut"},`${e.home.tierLabel} \xB7 ${e.home.area}`),g("div",{class:"row"},g("button",{class:"btn",onclick:()=>{this.closeSheet(),t.setWaypoint(e.home.door.x,e.home.door.z,e.home.name)}},"\u{1F4CD} Waypoint"),g("button",{class:"btn alt",onclick:()=>this.place(e.home.id)},"Open house card"))]:[g("p",{class:"mut"},"Find a place: green arrows over doors mean available. Tap a house to rent or buy."),g("div",{class:"list"},n.properties.filter(i=>i.status==="available").slice(0,12).map(i=>g("div",{},g("div",{},g("b",{},i.baseName),g("div",{class:"mut"},`${i.tierLabel} \xB7 ${i.area} \xB7 ${mt(i.rent)}/day${i.price?` \xB7 buy ${mt(i.price)}`:""}`)),g("button",{class:"btn small ghost",onclick:()=>this.place(i.id)},"View"))))]):[]}async tab_land(){let t=await this.guard(()=>Kt("/api/plots"));return t?[g("div",{class:"list"},t.plots.map(e=>g("div",{},g("div",{},g("b",{},e.name),g("div",{class:"mut"},`${e.area} \xB7 ${mt(e.price)} \xB7 risk ${e.risk} \xB7 ${e.status}`)),g("button",{class:"btn small ghost",onclick:()=>this.place(e.id)},"View"))))]:[]}async tab_ranks(){let t=await this.guard(()=>Kt("/api/leaderboard"));return t?[g("p",{class:"mut"},"Net worth = cash + savings + property (70%) + land (95%). Bots are hidden."),g("div",{class:"list"},t.rows.map(e=>g("div",{},g("span",{},`#${e.rank} ${e.name}${e.guest?" (guest)":""}`),g("b",{},mt(e.netWorth)))))]:[]}openMap(t){this.bigmap=this.bigmap||new mo(this.g),this.sheetOpen&&this.closeSheet(),this.bigmap.isOpen?this.bigmap.close():this.bigmap.open(t)}async tab_map(){return this.openMap(),[]}async tab_games(){return pu(this)}playCasual(t){Kl(this,t)}async tab_garage(){let t=await this.guard(()=>Kt("/api/garage"));if(!t)return[];let e=this.g,n=e.city.places.find(r=>r.id==="venue_motors"),i=t.cars.length?g("div",{class:"list"},t.cars.map(r=>g("div",{},g("span",{},`${r.active?"\u2705 ":""}${r.name}`,g("small",{class:"mut"},` \xB7 worth ${mt(r.value)} (paid ${mt(r.paid)}) \xB7 ${r.ageDays}d old \xB7 ${r.conditionLabel} ${r.condition}%`)),g("span",{class:"row"},r.active?"":g("button",{class:"btn small",onclick:async()=>{await this.guard(()=>St("/api/garage/use",{carId:r.id})),this.phone("garage")}},"Use"),g("button",{class:"btn small ghost",onclick:()=>this.confirm(`Sell ${r.name} for about ${mt(r.value)}?`,async()=>{let o=await this.guard(()=>St("/api/garage/sell",{carId:r.id,idemKey:crypto.randomUUID?.()}));o&&(this.toast(`Sold for ${mt(o.value)}.`,"money"),e.refreshMe()),this.phone("garage")})},"Sell"))))):g("p",{class:"mut"},"No car of your own yet. You are using a borrowed car: higher cost per trip, slower, no mood perk.");return[g("div",{class:"row sp"},g("b",{},`Garage (${t.cars.length}/${t.slots})`),g("span",{class:"mut"},`Driving: ${t.active.label}`)),i,g("p",{class:"mut"},`Resale: about ${Math.round((1-t.resale.firstDriveOffFraction)*100)}% on day one, then about ${Math.round(t.resale.perDayDepreciation*100)}% less per day, never below ${Math.round(t.resale.floorFraction*100)}%. All figures are ESTIMATES.`),n?g("button",{class:"btn alt",onclick:()=>{this.closeSheet(),this.place(n.id)}},"\u{1F3EA} Visit Naija Auto Mart"):""]}async tab_alerts(){let t=await this.guard(()=>Kt("/api/notifications"));return this.g.markRead(),t?[g("div",{class:"list"},t.rows.map(e=>g("div",{},g("span",{},e.text),g("span",{class:"mut"},new Date(e.created_at).toLocaleTimeString("en-NG",{hour:"numeric",minute:"2-digit"})))))]:[]}async tab_more(){let t=this.g,e=await this.guard(()=>Kt("/api/social/blocks")),n=g("div",{class:"list"},(e?.rows||[]).map(i=>g("div",{},g("span",{},`@${i.username} \xB7 ${i.kind}`),g("button",{class:"btn small ghost",onclick:async()=>{await this.setBlock(i.username,null),this.phone("more")}},"Undo"))));return[g("b",{},"Muted and blocked"),(e?.rows||[]).length?n:g("p",{class:"mut"},"Nobody. Tap a chat line or the \u22EF on a house card to mute, block or report."),g("div",{class:"row"},g("a",{class:"btn ghost",href:"/advertise",target:"_blank",rel:"noopener"},"Advertise"),g("a",{class:"btn ghost",href:"/methodology",target:"_blank",rel:"noopener"},"How ads are counted"),g("a",{class:"btn ghost",href:"/stats.html",target:"_blank",rel:"noopener"},"Stats")),g("p",{class:"mut"},`${t.cfg.name} v0 \xB7 test build. In-game \u20A6 is fictional with no cash-out. 18+.`),g("div",{class:"row"},g("button",{class:"btn red",onclick:()=>t.logout()},"Log out"))]}},tx=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z),ex=s=>({venue:"Place to hang out",shop:"Shop",job:"Work",house:"House",plot:"Land plot",landmark:"Landmark"})[s]||s;var xo=class{constructor(t){this.g=t,this.interval=3e3,this.fails=0,this.timer=null,this.running=!1,this.trail=[],this.notifSince=0,this.chatSince=void 0,this.adsVersion=0,this.since=0,this.ws=null,this.inflight=!1}start(){this.running||(this.running=!0,this.tick(),this.openWs())}stop(){this.running=!1,clearTimeout(this.timer);try{this.ws?.close()}catch{}this.ws=null}nudge(){this.running&&(clearTimeout(this.timer),this.timer=setTimeout(()=>this.tick(),50))}sample(t){this.trail.push(t),this.trail.length>60&&this.trail.shift()}async tick(){if(!this.running||this.inflight)return;this.inflight=!0;let t=this.g,e=t.serverNow(),n=!1,i=this.trail.splice(0).map(r=>({a:Math.max(0,Math.round(e-r.t)),x:+r.x.toFixed(2),z:+r.z.toFixed(2),ry:+r.ry.toFixed(3)}));try{let r={trail:i,mode:t.ctrl.mode,since:this.since,notifSince:this.notifSince,adsVersion:this.adsVersion,evidence:t.ads.take(),activity:t.activity||""};this.chatSince!==void 0&&(r.chatSince=this.chatSince);let o=performance.now(),a=await St("/api/heartbeat",r),l=performance.now()-o;t.clockSync(a.now,l),this.since=a.now,this.fails=0,n=!0,t.setConn(!0),this.interval=a.interval||3e3,this.adsVersion=a.adsVersion,this.chatSince=a.chatCursor,a.notifs?.length&&(this.notifSince=a.notifs[a.notifs.length-1].id),t.onHeartbeat(a)}catch(r){if(this.fails++,r instanceof dn&&r.status===401){this.stop(),t.sessionLost();return}this.fails>=3&&t.setConn(!1)}finally{this.inflight=!1}this.running&&(this.timer=setTimeout(()=>this.tick(),n?this.interval:Math.min(15e3,1500*2**Math.min(this.fails,3))))}openWs(){if(!window.__naDemo)try{let t=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`);this.ws=t,t.onmessage=e=>{try{let n=JSON.parse(e.data);n.type==="notification"&&(this.g.onPush(n),this.nudge())}catch{}},t.onclose=()=>{this.running&&setTimeout(()=>this.running&&this.openWs(),5e3)},t.onerror=()=>{}}catch{}}};var kt=1.4,vu={tv:2238513,sofa:11883578,fridge:15265522,rug:14263361,plant:3120730,table:10251068,gen:12597547,bed:4878245},is=(s,t)=>t%2?{w:s.d,d:s.w}:{w:s.w,d:s.d},_u=(s,t)=>s.x<t.x+t.w&&t.x<s.x+s.w&&s.z<t.z+t.d&&t.z<s.z+s.d,yo=class{constructor(t){this.g=t,this.el=st("#interior"),this.open=!1}async show(t,e){let n=this.g,i=await Kt(`/api/property/${t}/interior`).catch(r=>(n.ui.error(r),null));return i?(this.data=i,this.propertyId=t,this.visitor=!!i.visitor,this.catalog=Object.fromEntries((i.catalog||n.cfg.furniture||[]).map(r=>[r.id,r])),this.placed=i.placed.map(r=>({...r})),this.buy=!1,this.sel=null,this.rot=0,this.open=!0,n.busy=!0,n.ctrl.frozen=!0,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),!0):!1}build(){let t=this.data,e=t.room.w,n=t.room.d;this.canvas=g("canvas"),this.el.append(this.canvas),this.r=new Xn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new Yn,this.scene.background=new At(1911589),this.cam=new be(42,1,.1,200),this.yaw=Math.PI/4,this.pitch=.78,this.dist=Math.max(e,n)*kt*1.7,this.center=new P(e*kt/2,0,n*kt/2),this.scene.add(new Zn(16777215,8943462,1));let i=new Jn(16773328,1.1);i.position.set(6,12,4),this.scene.add(i);let r=new yt(new qt(e*kt,.2,n*kt),this.floorMat=new Xt({color:t.floor?.hex||"#b98a56"}));r.position.set(e*kt/2,-.1,n*kt/2),this.scene.add(r);let o=new Zr(Math.max(e,n)*kt,Math.max(e,n),9206357,11049072);o.scale.set(e/Math.max(e,n),1,n/Math.max(e,n)),o.position.set(e*kt/2,.01,n*kt/2),this.grid=o,this.scene.add(o);let a=this.wallMat=new Xt({color:t.wall?.hex||"#f1e7cf"}),l=new yt(new qt(e*kt,3.4,.2),a);l.position.set(e*kt/2,1.7,-.1);let c=new yt(new qt(.2,3.4,n*kt),a);c.position.set(-.1,1.7,n*kt/2),this.scene.add(l,c);let u=new yt(new qt(e*kt,.5,.22),new Xt({color:34641}));u.position.set(e*kt/2,.25,-.1),this.scene.add(u);for(let f of t.room.reserved){let m=new yt(new qt(f.w*kt-.1,f.what==="bed"?.7:.02,f.d*kt-.1),new Xt({color:f.what==="bed"?vu.bed:14866879,transparent:f.what!=="bed",opacity:f.what==="bed"?1:.6}));if(m.position.set((f.x+f.w/2)*kt,f.what==="bed"?.35:.02,(f.z+f.d/2)*kt),this.scene.add(m),f.what==="bed"){let y=new yt(new qt(f.w*kt-.4,.2,.5),new Xt({color:16777215}));y.position.set((f.x+f.w/2)*kt,.8,(f.z+.4)*kt),this.scene.add(y)}}let h=t.room.reserved.find(f=>f.what==="doorway"),d=new yt(new qt(h.w*kt,.04,.12),new _e({color:16761358}));d.position.set((h.x+h.w/2)*kt,.05,n*kt),this.scene.add(d),this.items=new fe,this.scene.add(this.items),this.ghost=new yt(new qt(1,1,1),new _e({color:3523691,transparent:!0,opacity:.55})),this.ghost.visible=!1,this.scene.add(this.ghost),this.rebuildItems(),this.bindInput(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}meshFor(t,e){let n=this.catalog[t],i=is(n,e),r={tv:1.1,sofa:.9,fridge:2,rug:.04,plant:1.2,table:.8,gen:.8}[t]||1,o=new fe,a=new yt(new qt(i.w*kt-.12,r,i.d*kt-.12),new Xt({color:vu[t]||10066329}));if(a.position.y=r/2,o.add(a),t==="sofa"){let l=new yt(new qt(e%2?.3:i.w*kt-.12,.7,e%2?i.d*kt-.12:.3),new Xt({color:9321767}));l.position.set(e===1?-(i.w*kt/2-.2):e===3?i.w*kt/2-.2:0,1,e===0?-(i.d*kt/2-.2):e===2?i.d*kt/2-.2:0),o.add(l)}if(t==="tv"){let l=new yt(new qt(i.w*kt-.3,r-.3,i.d*kt-.3),new _e({color:3501245}));l.position.y=r/2+.05,l.scale.multiplyScalar(.98),o.add(l),a.scale.set(1,.9,1)}if(t==="plant"){let l=new yt(new qn(.5,10,8),new Xt({color:3523691}));l.position.y=1.45,o.add(l),a.scale.set(.5,.6,.5),a.position.y=.3}return o.position.set(0,0,0),o}rebuildItems(){this.items.clear(),this.meshes={};for(let t of this.placed)this.sel&&this.sel.id===t.id&&this.sel.fromPlaced||this.addItem(t)}addItem(t){let e=is(this.catalog[t.id],t.rot),n=this.meshFor(t.id,t.rot);n.position.set((t.x+e.w/2)*kt,0,(t.z+e.d/2)*kt),n.userData={id:t.id},this.items.add(n),this.meshes[t.id]=n}canPlace(t,e,n,i){let r=this.data,o=this.catalog[t],a=is(o,i),l={x:e,z:n,w:a.w,d:a.d};if(e<0||n<0||e+a.w>r.room.w||n+a.d>r.room.d)return!1;for(let c of r.room.reserved)if(_u(l,c))return!1;for(let c of this.placed){if(c.id===t)continue;let u=this.catalog[c.id];if(u.layer==="floor"==(o.layer==="floor")){let h=is(u,c.rot);if(_u(l,{x:c.x,z:c.z,w:h.w,d:h.d}))return!1}}return!0}chrome(){let t=this.data,e=this.g.ui;this.guestsEl=g("div",{class:"iguests"}),this.feed=g("div",{class:"ifeed"}),this.lastEvent=0;let n=g("div",{class:"ihead"},g("div",{},g("h3",{},this.visitor?`@${t.owner}'s ${t.name}`:t.name),g("div",{style:"font-size:13px"},`${t.tierLabel} \xB7 ${t.area} \xB7 \u2764\uFE0F `,g("span",{id:"loveCount"},t.loves||0)),this.guestsEl),g("div",{class:"row"},this.visitor?"":g("button",{class:"btn small",id:"paintBtn",onclick:()=>this.paintPanel()},"\u{1F3A8} Paint"),this.visitor?"":g("button",{class:"btn small alt",id:"buyToggle",onclick:()=>this.toggleBuy()},"\u{1F6CB} Buy mode"),g("button",{class:"btn small red",id:"interiorLeave",onclick:()=>this.leave()},"Leave")));this.tool=g("div",{class:"itool hidden"});let i=g("div",{class:"iacts"},...(this.visitor?[["love","\u{1F60D} Love your house"],["greet","\u{1F44B} Greet"],["hype","\u{1F525} Hype"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]:[["greet","\u{1F44B} Greet"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]).map(([a,l])=>g("button",{class:"btn small ghost","data-act":a,onclick:()=>this.act(a)},l))),r=g("input",{class:"sheet-input",id:"roomSay",maxlength:120,placeholder:"Say something nice\u2026",onkeydown:a=>{a.key==="Enter"&&this.say(r),a.stopPropagation()}}),o=g("div",{class:"ibar"},this.feed,i,g("div",{class:"row"},r,g("button",{class:"btn small",onclick:()=>this.say(r)},"Send")));this.paint=g("div",{class:"ipaint hidden"}),this.el.append(n,this.tool,this.paint,o),this.startPoll()}startPoll(){clearInterval(this.pt);let t=async()=>{if(!this.open)return;let e=await Kt(`/api/room?propertyId=${this.propertyId}&since=${this.lastEvent}`).catch(n=>n);if(e instanceof Error){e.status===403&&this.visitor&&(this.g.ui.toast("The host asked you to step out. No wahala."),this.leave());return}this.room=e,this.drawRoom(e)};t(),this.pt=setInterval(t,2500)}drawRoom(t){if(st("#loveCount")&&(st("#loveCount").textContent=t.loves),this.guestsEl.replaceChildren(g("small",{},t.isOwner?t.guests.length?"Guests: ":"No guests right now":`Host ${t.ownerHome?"\u{1F7E2} home":"\u26AA out"} \xB7 guests: `),...t.guests.map(i=>g("span",{class:"gchip"},"@"+i,t.isOwner?g("button",{title:"Ask to leave",onclick:()=>this.kick(i)},"\u2715"):g("button",{title:"Mute or report",onclick:()=>this.g.ui.playerMenu(i)},"\u22EF")))),!t.isOwner){let i=this.el.querySelector("[data-act=love]");i&&(i.disabled=t.lovedToday)}let e=this.el.querySelector("[data-act=sofa]"),n=this.el.querySelector("[data-act=tv]");e&&(e.disabled=!t.can.sofa),n&&(n.disabled=!t.can.tv),(t.wall.hex!==this.data.wall?.hex||t.floor.hex!==this.data.floor?.hex)&&(this.data.wall=t.wall,this.data.floor=t.floor,this.wallMat.color.set(t.wall.hex),this.floorMat.color.set(t.floor.hex));for(let i of t.events){if(i.id<=this.lastEvent)continue;this.lastEvent=i.id;let r=g("div",{class:`ev ${i.kind}`,onclick:()=>i.kind==="say"&&i.u!==this.g.user.username&&this.g.ui.playerMenu(i.u)},i.kind==="say"?`${i.u}: ${i.t}`:i.t);for(this.feed.append(r);this.feed.children.length>6;)this.feed.firstChild.remove()}}async act(t){let e=this.g.ui;t==="love"?await e.guard(()=>St("/api/visit/love",{propertyId:this.propertyId}))&&(e.toast("You showed some love \u{1F60D}"),this.g.refreshMe()):await e.guard(()=>St("/api/visit/act",{propertyId:this.propertyId,action:t}))&&this.g.refreshMe(),this.startPoll()}async say(t){let e=t.value.trim();if(!e)return;await this.g.ui.guard(()=>St("/api/room/say",{propertyId:this.propertyId,text:e}))&&(t.value="",this.startPoll())}async kick(t){await this.g.ui.guard(()=>St("/api/visit/kick",{propertyId:this.propertyId,username:t}))&&(this.g.ui.toast(`@${t} was asked to leave.`),this.startPoll())}paintPanel(){let t=this.data.palette;if(!t)return;let e=this.paint;if(!e.classList.contains("hidden"))return e.classList.add("hidden");let n=this.data.wall?.id,i=this.data.floor?.id,r=()=>{let o=(a,l,c)=>g("div",{class:"swatches"},a.map(u=>g("button",{class:`sw ${u.id===l?"on":""}`,title:u.name,"data-colour":u.id,style:`background:${u.hex}`,onclick:()=>{c(u.id),r()}})));e.replaceChildren(g("div",{class:"row sp"},g("b",{},"\u{1F3A8} Paint and floor"),g("button",{class:"btn small ghost",onclick:()=>e.classList.add("hidden")},"\u2715")),g("small",{},"Walls"),o(t.walls,n,a=>{n=a,this.preview(n,i)}),g("small",{},"Floor"),o(t.floors,i,a=>{i=a,this.preview(n,i)}),g("button",{class:"btn alt",id:"paintApply",onclick:async()=>{let a=await this.g.ui.guard(()=>St("/api/property/decor",{propertyId:this.propertyId,wall:n,floor:i,idemKey:crypto.randomUUID?.()}));a&&(this.data.wall=a.wall,this.data.floor=a.floor,this.preview(a.wall.id,a.floor.id),this.g.ui.toast(a.charged?`Fresh look! \u2212${mt(a.charged)}`:"Already looks like that.","money"),this.g.refreshMe(),e.classList.add("hidden"))}},`Apply \xB7 ${mt(t.price)}`))};r(),e.classList.remove("hidden")}preview(t,e){let n=this.data.palette,i=n.walls.find(o=>o.id===t),r=n.floors.find(o=>o.id===e);i&&this.wallMat.color.set(i.hex),r&&this.floorMat.color.set(r.hex)}toggleBuy(t=!this.buy){this.buy=t,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),st("#buyToggle").textContent=t?"\u2705 Done":"\u{1F6CB} Buy mode",this.tool.classList.toggle("hidden",!t),t&&this.drawTool()}drawTool(){let t=this.sel,e=Object.values(this.catalog),n=new Set(this.placed.map(r=>r.id)),i=[];if(t){let r=this.catalog[t.id];i.push(g("div",{class:"row sp"},g("b",{},`${r.name} (${r.w}\xD7${r.d})`),g("span",{class:"mut"},"Tap the floor to place \xB7 R to rotate")),g("div",{class:"row"},g("button",{class:"btn small",onclick:()=>{this.rot=(this.rot+1)%4,this.drawTool()}},"\u27F3 Rotate"),t.fromPlaced?g("button",{class:"btn small red",onclick:()=>this.sell(t.id)},`Sell +${mt(Math.floor(r.price*(this.data.sellFraction||.5)))}`):g("span",{class:"tag amber"},`Costs ${mt(r.price)}`),g("button",{class:"btn small ghost",onclick:()=>{this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool()}},"Cancel")))}i.push(g("div",{class:"cat"},e.map(r=>g("button",{class:`${t?.id===r.id?"on":""} ${n.has(r.id)?"own":""}`,onclick:()=>{let o=this.placed.find(a=>a.id===r.id);this.sel={id:r.id,fromPlaced:!!o},this.rot=o?o.rot:0,this.rebuildItems(),this.drawTool()}},`${r.name}`,g("div",{class:"mut"},n.has(r.id)?"placed \xB7 tap to move":`${mt(r.price)} \xB7 ${r.w}\xD7${r.d}`))))),this.tool.replaceChildren(...i)}async place(t,e){let n=this.sel;if(!n)return;if(!this.canPlace(n.id,t,e,this.rot)){this.g.ui.toast(Oe("blocked"),"bad");return}let i=await this.g.ui.guard(()=>St("/api/property/furniture",{itemId:n.id,x:t,z:e,rot:this.rot,idem:crypto.randomUUID?.()||String(Math.random())}));i&&(this.g.update(i.user),this.placed=i.interior.placed,this.data={...this.data,...i.interior,visitor:!1},this.g.ui.sfx("thunk"),this.g.ui.haptic(20),i.charged&&this.g.ui.toast(Oe("bought",i.charged),"money"),this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool())}async sell(t){let e=await this.g.ui.guard(()=>St("/api/property/furniture/sell",{itemId:t}));e&&(this.g.update(e.user),this.placed=e.interior.placed,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.g.ui.toast(Oe("sold",e.refund),"money"),this.drawTool())}cellAt(t){let e=this.canvas.getBoundingClientRect(),n=new at((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new Kn;i.setFromCamera(n,this.cam);let r=-i.ray.origin.y/i.ray.direction.y;if(!(r>0))return null;let o=i.ray.origin.clone().addScaledVector(i.ray.direction,r);return{x:o.x/kt,z:o.z/kt}}updateGhost(t){if(!this.sel)return;let e=this.cellAt(t);if(!e)return;let n=is(this.catalog[this.sel.id],this.rot),i=Math.round(e.x-n.w/2),r=Math.round(e.z-n.d/2);this.hover={x:i,z:r};let o=this.canPlace(this.sel.id,i,r,this.rot);this.ghost.visible=!0,this.ghost.scale.set(n.w*kt-.1,.9,n.d*kt-.1),this.ghost.position.set((i+n.w/2)*kt,.45,(r+n.d/2)*kt),this.ghost.material.color.setHex(o?3523691:14696751)}bindInput(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,y:n.clientY,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x,r=n.clientY-t.y;t.x=n.clientX,t.y=n.clientY,t.moved+=Math.abs(i)+Math.abs(r),(!this.sel||t.moved>14)&&(this.yaw=Math.max(Math.PI/4-.8,Math.min(Math.PI/4+.8,this.yaw-i*.006)),this.pitch=Math.max(.5,Math.min(1.2,this.pitch+r*.004)))}this.buy&&this.updateGhost(n)}),e.addEventListener("pointerup",n=>{if(t&&t.moved<8&&this.buy)if(this.sel)this.updateGhost(n),this.hover&&this.place(this.hover.x,this.hover.z);else{let i=this.cellAt(n);if(i){let r=this.placed.find(o=>{let a=is(this.catalog[o.id],o.rot);return i.x>=o.x&&i.x<o.x+a.w&&i.z>=o.z&&i.z<o.z+a.d});r&&(this.sel={id:r.id,fromPlaced:!0},this.rot=r.rot,this.rebuildItems(),this.drawTool())}}t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(6,Math.min(40,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{if(!this.open)return;let i=n.key.toLowerCase();i==="r"&&this.sel?(this.rot=(this.rot+1)%4,this.drawTool()):(i==="delete"||i==="backspace")&&this.sel?.fromPlaced?this.sell(this.sel.id):i==="escape"?this.leave():i==="b"&&!this.visitor&&this.toggleBuy()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){if(!this.open)return;let t=this.center;this.cam.position.set(t.x+Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,t.z+Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(t.x,.4,t.z),this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}async leave(){this.open&&(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,await St("/api/property/leave").catch(()=>{}),this.g.net.nudge(),st("#game").focus())}};var Os={circle:["\u25CF","#d6402f"],triangle:["\u25B2","#2e7dd1"],cross:["\u271A","#2e9b5e"],square:["\u25A0","#8a5ad1"],star:["\u2605","#e0a020"],whot:["W","#222"]},nx=s=>{let t=7;for(let e of String(s))t=t*31+e.charCodeAt(0)>>>0;return t},bu={eat:"\u{1F372}",game:"\u{1F3B2}",board:"\u{1F3C6}",poster:"\u{1F4DC}",tv:"\u{1F4FA}",car:"\u{1F697}",check:"\u{1F50D}",service:"\u{1F527}"},ix={whot:"Whot",ludo:"Ludo",dominoes:"Dominoes",draughts:"Draughts",ayo:"Ayo"},vo=class{constructor(t){this.g=t,this.el=st("#venue"),this.open=!1,this.shotId=null}async show(t){let e=this.g,n=await e.ui.guard(()=>St("/api/venue/enter",{venueId:t,pos:e.pos()}));return n?(this.data=n,this.id=t,this.open=!0,e.busy=!0,e.ctrl.frozen=!0,this.matchId=null,this.match=null,this.dismissed=this.dismissed||new Set,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),this.poll(),!0):!1}build(){let t=this.data,e=t.room;this.canvas=g("canvas"),this.el.append(this.canvas),this.r=new Xn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new Yn,this.scene.background=new At(1911589),this.cam=new be(42,1,.1,100),this.yaw=Math.PI/5,this.pitch=.82,this.dist=15,this.scene.add(new Zn(16777215,8943462,1));let n=new Jn(16773328,1);n.position.set(5,10,6),this.scene.add(n);let i=new At(t.sign||"#555"),r=new yt(new qt(e.w,.2,e.d),new Xt({color:13482904}));r.position.y=-.1,this.scene.add(r);let o=new Xt({color:15853519}),a=new yt(new qt(e.w,3.2,.2),o);a.position.set(0,1.6,-e.d/2);let l=new yt(new qt(.2,3.2,e.d),o);l.position.set(-e.w/2,1.6,0);let c=new yt(new qt(e.w,.5,.22),new Xt({color:i}));c.position.set(0,2.9,-e.d/2+.02),this.scene.add(a,l,c);let u=new yt(new qt(2.2,.04,.2),new _e({color:16761358}));u.position.set(0,.04,e.d/2),this.scene.add(u),this.stations=new fe,this.scene.add(this.stations),this.people=new fe,this.scene.add(this.people),this.meshes={};for(let h of t.stations)this.addStation(h);this.bind(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}addStation(t){let e=new fe,n=new At(t.color||"#888"),i=a=>new Xt({color:a}),r=(a,l,c,u,h)=>{let d=new yt(new qt(a,l,c),i(u));return d.position.y=h??l/2,e.add(d),d};if(t.type==="eat")r(3.4,1,.9,n),r(3.5,.12,1,15909198,1.05);else if(t.type==="game"){let a=new yt(new Ne(.95,.95,.12,20),i(n));a.position.y=.8,e.add(a);let l=new yt(new Ne(.12,.2,.8,8),i(4862752));if(l.position.y=.4,e.add(l),t.game==="ludo")r(1.5,.1,1.5,16446950,.91),[14041135,3054430,14721056,3046865].forEach((c,u)=>{let h=r(.6,.05,.6,c,.97);h.position.x=(u%2?1:-1)*.45,h.position.z=(u<2?-1:1)*.45});else for(let c=0;c<4;c++){let u=r(.34,.03,.5,[14041135,3046865,14721056,3054430][c],.88);u.position.x=-.5+c*.33,u.rotation.y=.2*c-.3}for(let c of[-1.25,1.25]){let u=new yt(new Ne(.28,.28,.5,10),i(3352862));u.position.set(c,.25,0),e.add(u)}}else if(t.type==="board")r(2.4,1.5,.12,n,1.6).position.z=-.1,r(2.2,1.3,.14,998183,1.6).position.z=-.08;else if(t.type==="poster")r(.1,1.4,1.2,n,1.6);else if(t.type==="tv")r(2.8,1.5,.2,1381653,1.8),r(2.6,1.3,.22,2778565,1.8),r(3,.5,.8,7031339,.25);else if(t.type==="check"){let a=es(t.color||"#3a7ca5");a.scale.setScalar(.34),a.position.y=.55,e.add(a),r(2,.5,1.1,5593696,.25),r(.2,.4,.2,14721056,.7).position.x=1.15}else if(t.type==="service"){r(2,.9,.7,7040885,.45),r(1.7,.08,.6,14711552,.94);for(let a=0;a<3;a++)r(.25,.25,.25,[14041135,3046865,14721056][a],1.1).position.x=-.6+a*.6}else if(t.type==="car"){let a=es(t.color||"#888");a.scale.setScalar(.38),a.rotation.y=Math.PI/6,e.add(a),r(1.8,.06,1,14540253,.03)}let o=Qn(`${bu[t.type]||""} ${t.label}`.slice(0,26),"#fff3c4");o.scale.set(2.8,.7,1),o.position.y=t.type==="car"?1.8:t.type==="tv"?3:t.type==="board"?2.8:2.1,e.add(o),e.position.set(t.x,0,t.z),t.type==="poster"&&(e.rotation.y=0),e.traverse(a=>{a.userData.stationId=t.id}),this.stations.add(e),this.meshes[t.id]=e}people_refresh(){this.people.clear();let t=this.data,e=new Set,n=(i,r,o,a)=>{if(e.has(i))return;e.add(i);let l=Ns(r||"#2e9b5e");l.scale.setScalar(.55),l.position.set(o,0,a);let c=Qn("@"+i,"#ffffff");c.scale.set(1.6,.4,1),c.position.y=2.2,l.add(c),this.people.add(l)};for(let i of t.stations)i.type==="game"&&i.match&&i.match.players.forEach((o,a)=>n(o,null,i.x+[-1.25,1.25,-.5,.5][a],i.z+(a<2?.5:1.5)));for(let i of t.occupants){let r=nx(i.username);n(i.username,i.color,-3+r%7*1,t.room.d/2-1.1-(r>>4)%2*.8)}}chrome(){let t=this.data;this.strip=g("div",{class:"vstrip"}),this.panel=g("div",{class:"vpanel hidden"});let e=g("div",{class:"ihead"},g("div",{},g("h3",{},t.name),g("div",{style:"font-size:13px"},`${t.blurb} \xB7 open ${t.hours[0]}:00 to ${t.hours[1]}:00`),g("div",{class:"tag amber",style:"display:inline-block;margin-top:4px"},"\u{1F3B2} Game money only \xB7 18+")),g("div",{class:"row"},g("button",{class:"btn small red",id:"venueLeave",onclick:()=>this.leave()},"Leave")));this.el.append(e,this.strip,this.panel),this.drawStrip(),this.people_refresh()}drawStrip(){let t=this.data;this.strip.replaceChildren(...t.stations.map(e=>{let n=e.match,i=e.type==="game"?n?n.status==="waiting"?`waiting ${n.players.length}/${n.max}: @${n.host}${n.stake?" \xB7 \u20A6"+n.stake:""}`:n.players.join(" v "):"free table":e.type==="car"?mt(e.price||0)+" (est.)":"";return g("button",{class:`vst ${n?.you?"mine":""}`,"data-station":e.id,onclick:()=>this.pick(e.id)},`${bu[e.type]||"\u2022"} ${e.label}`,i?g("small",{},i):"")}))}price(t){return this.g.cfg.cars?.[t]?.price??this.catalog?.find(e=>e.id===t)?.price??0}async pick(t){await this.refreshVenue();let e=this.data.stations.find(n=>n.id===t);e&&this.station(e)}async station(t){let e=this.g.ui;if(t.type==="eat"){let n=g("div");e.openSheet(t.label,n),e.shopBlock(n,t.shopId)}else if(t.type==="poster")e.openSheet(t.label,[g("p",{},t.text),g("p",{class:"mut"},"Reports, mutes and blocks work here too: tap a name in the chat.")]);else if(t.type==="tv"){let n=await e.guard(()=>St("/api/venue/act",{venueId:this.id,stationId:t.id}));n&&(e.toast(n.text),this.g.net.nudge())}else t.type==="board"?this.board():t.type==="car"?this.carSheet(t):t.type==="check"||t.type==="service"?this.mechanicSheet(t):t.type==="casual"?e.playCasual(t.game):t.type==="game"&&this.sitPanel(t)}async board(t="all"){let e=this.g.ui,n=await e.guard(()=>Kt("/api/scoreboard"+(t==="all"?"":`?kind=${t}`)));if(!n)return;let i=Math.max(0,n.endsAt-this.g.serverNow()),r=g("div",{class:"chips"},["all","whot","ludo","dominoes","draughts","ayo"].map(o=>g("button",{class:`chip ${o===t?"on":""}`,onclick:()=>this.board(o)},o==="all"?"All games":ix[o])));e.openSheet("Weekly scoreboard",[r,n.rows.length?g("div",{class:"list"},n.rows.map(o=>g("div",{},g("span",{},`${o.rank}. @${o.username}`),g("span",{class:"mut"},`${o.wins}W ${o.draws}D ${o.losses}L \xB7 `),g("b",{},`${o.points} pts`)))):g("p",{class:"mut"},"Nobody has played this week yet. Be the first!"),g("p",{class:"mut"},`${n.scoring} Resets in ${Math.floor(i/864e5)}d ${Math.floor(i%864e5/36e5)}h.`)])}async mechanicSheet(t){let e=this.g.ui,n=await e.guard(()=>Kt("/api/mechanic"));if(!n)return;let i=l=>g("div",{class:"cbar"},g("i",{style:`width:${l}%`})),r=n.cars.length?g("div",{class:"list"},n.cars.map(l=>g("div",{"data-car":l.id},g("span",{},`${l.active?"\u2705 ":""}${l.name}`,g("small",{class:"mut"},` \xB7 ${l.label}${l.perkUntil?" \xB7 perk on":""}`)),g("span",{style:"min-width:90px"},i(l.condition),g("small",{class:"mut"},` ${l.condition}%`))))):g("p",{class:"mut"},"Your garage is empty. Meco only works on cars you own.");if(t.type==="check"){e.openSheet("Check my car",[g("p",{},n.text),r,g("p",{class:"mut"},`Condition drops a little each day. Below ${n.roughBelow}% a car is rough and rides give less mood. Service fee: ${mt(n.fee)} (ESTIMATE).`)]);return}let o=n.active,a=!!o?.perkUntil;e.openSheet("Service",[g("div",{class:"tag amber"},"Placeholder fee \xB7 ESTIMATE"),o?g("p",{},`${o.name}: ${o.label} (${o.condition}%)`):g("p",{class:"mut"},"You need your own active car. Borrowed cars are not serviced here."),g("p",{class:"mut"},`Service resets condition and gives about ${n.perk.minutes} minutes of cheaper fuel (${n.perk.farePctOff}% off) and +${n.perk.extraMood} mood on rides.`),g("button",{class:"btn big alt",id:"mecoService",disabled:!o||a,onclick:async()=>{let l=await e.guard(()=>St("/api/mechanic/service",{idemKey:crypto.randomUUID?.()}));l&&(e.closeSheet(),e.toast(l.text,"money"),this.g.refreshMe?.())}},a?"Already serviced":`Service \xB7 ${mt(n.fee)}`)])}async carSheet(t){let e=this.g.ui,n=await e.guard(()=>Kt("/api/garage"));if(!n)return;this.catalog=n.catalogue;let i=n.catalogue.find(l=>l.id===t.model),r=n.active,o=n.cars.some(l=>l.model===t.model),a=(l,c)=>g("div",{class:"row sp"},g("span",{class:"mut"},l),g("b",{},c));e.openSheet(i.name,[g("div",{class:"tag amber"},"Placeholder model \xB7 price is an ESTIMATE"),a("Price",mt(i.price)),a("Fuel per 100 m","\u20A6"+(i.perM*100).toFixed(0)+` (borrowed: \u20A6${(n.borrowed.perM*100).toFixed(0)} + \u20A6${n.borrowed.base} tip)`),a("Speed",`${i.speed} (borrowed ${n.borrowed.speed})`),a("Mood on a nice ride",`+${i.mood}`),a("Resale",`about ${Math.round((1-n.resale.firstDriveOffFraction)*100)}% right after purchase, then about ${Math.round(n.resale.perDayDepreciation*100)}% less per day (never below ${Math.round(n.resale.floorFraction*100)}%)`),a("Your car now",r.label),g("button",{class:"btn big alt",disabled:n.cars.length>=n.slots,onclick:async()=>{await e.guard(()=>St("/api/garage/buy",{model:i.id,idemKey:crypto.randomUUID?.()}))&&(e.closeSheet(),e.toast(`Congrats! ${i.name} is in your garage \u{1F697}`,"money"),this.g.refreshMe?.())}},o?"Buy another":`Buy \xB7 ${mt(i.price)}`),n.cars.length>=n.slots?g("p",{class:"mut"},"Garage full: sell a car in Phone \u2192 Garage."):""])}sitPanel(t){let e=this.data.stakes,n=0,i=t.match,r=this.g.cfg,o={ludo:"Ludo table (2 to 4 players)",dominoes:"Dominoes table (2 to 4 players)",draughts:"Draughts board (2 players)",ayo:"Ayo board (2 players)",whot:"Whot bench"}[t.game]||"Table",a=[g("div",{class:"row sp"},g("b",{},`${t.label}`),g("button",{class:"btn small ghost",onclick:()=>this.panel.classList.add("hidden")},"\u2715"))];if(i&&i.you){this.focusMatch(i.id);return}if(i&&i.status==="active")a.push(g("p",{class:"mut"},`Game in progress: ${i.players.map(l=>"@"+l).join(", ")}. Try another table.`));else if(i)a.push(g("p",{},`${i.players.map(l=>"@"+l).join(", ")} ${i.players.length>1?"are":"is"} waiting (${i.players.length}/${i.max}).`),g("p",{class:"mut"},i.stake?`Stake \u20A6${i.stake} each (game money). Winner takes the whole pot.`:"Friendly game: no stake."),g("button",{class:"btn big alt",onclick:()=>this.sit(t,0)},i.stake?`Join \xB7 stake ${mt(i.stake)}`:"Join the game"));else{let l=()=>c.replaceChildren(...e.map(h=>g("button",{class:`chip ${h===n?"on":""}`,onclick:()=>{n=h,l(),u.textContent=h?`Sit and wait \xB7 stake ${mt(h)}`:"Sit and wait \xB7 friendly"}},h?mt(h):"Friendly"))),c=g("div",{class:"chips"}),u=g("button",{class:"btn big alt",onclick:()=>this.sit(t,n)},"Sit and wait \xB7 friendly");l(),a.push(g("p",{class:"mut"},`${o}: sit down and wait for others to join (Ludo and Dominoes: host starts when 2 to 4 are seated). Pick a stake (game money, held safely until the game ends).`),c,u)}a.push(g("p",{class:"mut"},"\u{1F3B2} Game money only. No cash value, no cash-out.")),this.showPanel(a)}showPanel(t){this.panel.replaceChildren(...[].concat(t)),this.panel.classList.remove("hidden")}async sit(t,e){let n=await this.g.ui.guard(()=>St("/api/game/sit",{venueId:this.id,stationId:t.id,stake:e}));n&&(this.focusMatch(n.id,n),this.g.net.nudge())}focusMatch(t,e){this.matchId=t,e?this.renderMatch(e):this.pollGame()}async pollGame(){if(!this.matchId)return;let t=await Kt(`/api/game?id=${this.matchId}`).catch(()=>null);t&&this.renderMatch(t)}renderMatch(t){if(this.match=t,this.dismissed.has(t.id))return;this.matchId=t.id;let e=this.g.user?.username,n=[],i=g("div",{class:"row sp"},g("b",{},`${t.label} \xB7 ${t.players.map(r=>r.name).join(", ")}`),g("span",{class:"tag amber"},t.stake?`Stake ${mt(t.stake)} \xB7 pot ${mt(t.pot)}`:"Friendly"));if(n.push(i),t.status==="waiting")n.push(g("p",{},`Seated ${t.players.length}/${t.max} \xB7 waiting for players\u2026 \u23F3`),g("div",{class:"row"},t.players.map(r=>g("span",{class:"tag"},"@"+r.name))),g("p",{class:"mut"},"Your stake is held safely and comes back if nobody joins."),t.canStart?g("button",{class:"btn big alt",id:"ludoStart",onclick:()=>this.startMatch(t)},`\u25B6 Start now with ${t.players.length} players`):t.max>2&&t.isHost?g("p",{class:"mut"},"Need at least 2 players to start."):"",g("button",{class:"btn ghost",onclick:()=>this.leaveMatch(t)},"Leave the table"));else if(t.status==="active"){let r=t.board?.mine,o=Math.max(0,Math.ceil((t.deadlineAt-this.g.serverNow())/1e3));n.push(g("div",{class:"row sp"},g("span",{class:r?"tag green":"tag"},r?"\u{1F7E2} Your turn":`\u23F3 @${t.turn}'s turn`),g("span",{class:"mut",id:"gtimer"},`${o}s`))),n.push(({ludo:()=>this.ludoBoard(t),dominoes:()=>this.dominoBoard(t),draughts:()=>this.draughtsBoard(t),ayo:()=>this.ayoBoard(t)}[t.kind]||(()=>this.whotBoard(t)))()),n.push(g("div",{class:"row"},g("button",{class:"btn small ghost",onclick:()=>this.g.ui.confirm?.call(this.g.ui,t.kind==="ludo"||t.kind==="dominoes"?"Leave this game? You are out and your stake stays in the pot.":"Resign this game? Your opponent wins the pot.",()=>this.leaveMatch(t))},"\u{1F3F3} Resign")))}else{let r=t.result||{};n.push(g("div",{class:`banner ${r.youWon?"win":r.draw?"draw":"lose"}`},r.cancelled?`Table closed. ${r.why||""}`:r.draw?"\u{1F91D} Draw":r.youWon?`\u{1F3C6} You won! ${t.stake?"+"+mt(t.pot):""}`:`You lost. ${r.why||""}`),g("button",{class:"btn alt",onclick:()=>{this.dismissed.add(t.id),this.matchId=null,this.panel.classList.add("hidden"),this.g.net.nudge(),this.refreshVenue()}},"Back to the room")),this.g.refreshMe?.()}n.push(g("p",{class:"mut"},"\u{1F3B2} Game money only.")),this.showPanel(n)}card(t,{onclick:e,disabled:n,mini:i}={}){let[r,o]=Os[t.s];return g("button",{class:`wcard ${i?"mini":""}`,"data-card":t.id,disabled:!!n,style:`--c:${o}`,onclick:e},g("span",{class:"n"},t.s==="whot"?"20":t.n),g("span",{class:"g"},r))}whotBoard(t){let e=t.board,n=g("div",{class:"whot"}),i=g("div",{class:"row"},g("div",{},g("small",{class:"mut"},"Top card"),this.card(e.top,{disabled:!0})),g("div",{},g("small",{class:"mut"},"Shape to match"),g("div",{class:"shape",style:`color:${Os[e.shape][1]}`},Os[e.shape][0])),g("div",{class:"mut"},`Opponent: ${e.oppCount} cards`,g("br"),`Market: ${e.market}`),e.last?g("div",{class:"mut"},this.lastText(t)):""),r=g("div",{class:"hand"},e.hand.map(a=>this.card(a,{disabled:!e.mine||!e.playable.includes(a.id),onclick:()=>a.s==="whot"?this.pickShape(t,a):this.move(t,{card:a.id})}))),o=g("button",{class:"btn small",id:"whotDraw",disabled:!e.mine,onclick:()=>this.move(t,{action:"draw"})},"\u{1F0CF} Draw one card");return n.append(i,r,o),this.shapeBox=g("div",{class:"chips"}),n.append(this.shapeBox),n}lastText(t){let e=t.board.last;if(!e)return"";let n=e.who===t.you?"You":"They";if(e.effect==="draw")return`${n} drew a card.`;let i={hold:"Hold on!",suspend:"Suspension!",pick2:"Pick two!",pick3:"Pick three!",market:"General market!",whot:"Whot!"}[e.effect];return`${n} played ${e.card.replace(/[a-z]+/,"")}${i?" \xB7 "+i:""}`}pickShape(t,e){this.shapeBox.replaceChildren(g("b",{},"Call a shape: "),...["circle","triangle","cross","square","star"].map(n=>g("button",{class:"chip",style:`color:${Os[n][1]}`,"data-shape":n,onclick:()=>this.move(t,{card:e.id,shape:n})},Os[n][0]+" "+n)))}ayoBoard(t){let e=t.board,n=t.youSeat,i=n===0?0:6,r=n===0?6:0,o=[0,1,2,3,4,5].map(h=>i+h),a=[5,4,3,2,1,0].map(h=>r+h),l=(h,d)=>{let f=h-i,m=d&&e.legal.includes(f);return g("button",{class:`pit ${d?"mine":""} ${m?"legal":""}`,"data-pit":h,disabled:!m,onclick:()=>this.move(t,{house:f})},g("b",{},e.pits[h]))},c=1-n,u=t.players.find(h=>h.seat===c)?.name;return g("div",{class:"ayo"},g("div",{class:"row sp"},g("span",{class:"mut"},`@${u} captured: ${e.store[c]}`),g("span",{class:"mut"},e.last?`Last: house ${e.last.house+1}${e.last.captured?` \xB7 captured ${e.last.captured}`:""}`:"")),g("div",{class:"pits"},a.map(h=>l(h,!1))),g("div",{class:"pits"},o.map(h=>l(h,!0))),g("div",{class:"row sp"},g("b",{},`You captured: ${e.store[n]} (first to 25 wins)`)))}dominoBoard(t){let e=t.board,n=["\xB7","\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"],i=p=>g("span",{class:"dh"},n[p]),r=(p,M,E={})=>g("button",{class:`dtile ${E.mini?"mini":""}`,"data-tile":E.id||"",disabled:!!E.disabled,onclick:E.onclick},i(p),g("i",{}),i(M)),o=g("div",{class:"row"},t.players.map(p=>g("span",{class:`tag ${p.seat===e.turn?"green":""}`},`${p.you?"You":"@"+p.name}: ${e.counts[p.seat]}${e.out[p.seat]?" (out)":""}`)),g("span",{class:"tag amber"},`Boneyard ${e.yard}`)),a=g("div",{class:"dchain"},e.chain.length?e.chain.map(p=>r(p[0],p[1],{mini:!0,disabled:!0})):g("span",{class:"mut"},"No tiles down yet. Play any tile to start.")),l=g("div",{class:"row"}),c=this.dpick&&e.playable.includes(this.dpick)?this.dpick:null;c||(this.dpick=null);let u=p=>{this.dpick=null,this.move(t,p)};if(c){let p=e.ends;l.replaceChildren(g("span",{class:"mut"},`Tile ${c}: which end?`),g("button",{class:"btn small alt",id:"domLeft",onclick:()=>u({tile:c,end:"left"})},`\u25C0 Left (${p[0]})`),g("button",{class:"btn small alt",id:"domRight",onclick:()=>u({tile:c,end:"right"})},`Right (${p[1]}) \u25B6`))}let h=p=>{let[M,E]=p.split("-").map(Number),v=e.ends;if(!v||v[0]===v[1]||!((M===v[0]||E===v[0])&&(M===v[1]||E===v[1])))return u({tile:p});this.dpick=p,this.renderMatch(t)},d=g("div",{class:"hand"},e.hand.map(p=>{let[M,E]=p.split("-").map(Number);return r(M,E,{id:p,disabled:!e.mine||!e.playable.includes(p),onclick:()=>h(p)})})),f=e.canDraw?g("button",{class:"btn alt",id:"domDraw",onclick:()=>this.move(t,{action:"draw"})},`Draw from the boneyard (${e.yard})`):"",m=e.last,y=m?t.players.find(p=>p.seat===m.who)?.name:null,x=m?m.pass?`@${y} had no play and passed.`:m.draw?`@${y} drew a tile.`:`@${y} played ${m.tile}.`:"";return g("div",{class:"domino"},o,a,g("p",{class:"mut"},x),l,d,f,e.mine&&!e.playable.length&&!e.canDraw?g("p",{class:"mut"},"No play: you pass."):"",e.tiles?g("p",{class:"mut"},"Final hands: "+t.players.map(p=>`@${p.name} ${e.tiles[p.seat].join(" ")||"(empty)"}`).join(" \xB7 ")):"")}draughtsBoard(t){let e=t.board,n=t.youSeat,i=n===1,r=this.dsel,o=e.legal||[],a=new Set(o.map(y=>y.from)),l=r?o.filter(y=>y.from===r).map(y=>y.to):[],c=[...Array(8).keys()];i&&c.reverse();let u=[...Array(8).keys()];i&&u.reverse();let h=g("div",{class:"dgrid"},c.flatMap(y=>u.map(x=>{let p=e.board[y*8+x],M=`${y},${x}`,E=(y+x)%2===1,v=p&&p<=2==(n===0),D=`dcell ${E?"dk":"lt"} ${r===M?"sel":""} ${l.includes(M)?"dest":""} ${e.mine&&a.has(M)?"can":""}`,A=p?g("span",{class:`dp ${p<=2?"p0":"p1"} ${v?"mine":""}`},p===2||p===4?"\u265B":""):"";return g("button",{class:D,"data-cell":M,disabled:!E||!e.mine,onclick:()=>{if(l.includes(M)){let C=o.filter(I=>I.from===r&&I.to===M);this.dsel=null,this.move(t,{from:r,to:M,path:C[0].path})}else a.has(M)?(this.dsel=M,this.renderMatch(t)):(this.dsel=null,this.renderMatch(t))}},A)}))),d=t.players.find(y=>y.seat===1-n)?.name,f=e.last,m=f?`${f.who===n?"You":"@"+d} moved ${f.captured?`and captured ${f.captured}`:""}${f.crowned?" \xB7 crowned \u{1F451}":""}`:"";return g("div",{class:"draughts"},g("div",{class:"row sp"},g("span",{class:"mut"},`You ${e.count[n]} \xB7 @${d} ${e.count[1-n]}`),e.mine&&e.mustJump?g("span",{class:"tag amber"},"You must capture!"):""),h,g("p",{class:"mut"},m))}ludoBoard(t){let e=t.board,n=["#d6402f","#2e9b5e","#e0a020","#2e7dd1"],i=["Red","Green","Yellow","Blue"],r=A=>e.corners[A],o=250,a=o/2,l=104,c=13,u=(A,C=l)=>{let I=A/52*2*Math.PI-Math.PI/2;return[a+C*Math.cos(I),a+C*Math.sin(I)]},h=g("div",{class:"ludo",style:`width:${o}px;height:${o}px`});for(let A=0;A<52;A++){let[C,I]=u(A),S=[0,13,26,39].indexOf(A);h.append(g("i",{class:`lc ${e.safe.includes(A)?"safe":""}`,style:`left:${C-6}px;top:${I-6}px;${S>=0?`background:${n[S]}`:""}`}))}for(let A=0;A<4;A++)for(let C=1;C<=5;C++){let[I,S]=u(A*13,l-C*15);h.append(g("i",{class:"lc hc",style:`left:${I-5}px;top:${S-5}px;background:${n[A]}55`}))}let d={},f=(A,C,I)=>{let S,w;if(I===-1){let B=u(r(A)*13,l+22);[S,w]=[B[0]+C%2*10-5,B[1]+Math.floor(C/2)*10-5]}else I<=50?[S,w]=u(e.cells[A][C]):I<56?[S,w]=u(r(A)*13,l-(I-50)*15):[S,w]=[a-12+r(A)*8,a-4];let L=`${Math.round(S)},${Math.round(w)}`,z=d[L]=(d[L]||0)+1;return[S+(z-1)*4-7,w-(z-1)*3-7]};e.tokens.forEach((A,C)=>A.forEach((I,S)=>{let[w,L]=f(C,S,I),z=C===t.youSeat;h.append(g("b",{class:`ltok ${z&&e.legal.includes(S)?"legal":""}`,"data-seat":C,"data-tok":S,style:`left:${w}px;top:${L}px;background:${n[r(C)]}`},z?String(S+1):""))}));let m=g("div",{class:"row",style:"flex-wrap:wrap"},t.players.map(A=>g("span",{class:"tag",style:`border-left:6px solid ${n[r(A.seat)]}`},`${i[r(A.seat)]} @${A.name}${A.out?" (left)":""}${A.you?" (you)":""}`))),y=g("div",{class:"die",id:"ludoDie"},e.die?["","\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"][e.die]:"\u{1F3B2}"),x=e.last,p=x?`${x.who===t.youSeat?"You":"@"+t.players.find(A=>A.seat===x.who)?.name} rolled ${x.die}${x.note?" \xB7 "+x.note:""}${x.captured?` \xB7 sent ${x.captured} token(s) home!`:""}${x.home?" \xB7 token home! \u{1F3E0}":""}`:"",M=g("button",{class:"btn big alt",id:"ludoRoll",disabled:!e.canRoll,onclick:()=>this.move(t,{action:"roll"})},"\u{1F3B2} Roll the die"),E=e.tokens[t.youSeat]||[],v=A=>A===-1?"in base":A===56?"HOME \u2714":A>50?`home column ${A-50}/5`:`step ${A}`,D=g("div",{class:"chips"},E.map((A,C)=>g("button",{class:`chip ${e.legal.includes(C)?"on":""}`,"data-token":C,disabled:!e.legal.includes(C),onclick:()=>this.move(t,{token:C})},`Token ${C+1}: ${v(A)}`)));return g("div",{class:"ludowrap"},m,g("div",{class:"row"},h,g("div",{},y,M)),g("p",{class:"mut"},p),e.mine&&e.die?g("p",{},`You rolled ${e.die}. Pick a token to move:`):"",D,g("p",{class:"mut"},"Roll a 6 to leave base. A 6 gives another roll. Land on a rival (off the safe \u2B50 cells) to send them home."))}async startMatch(t){let e=await this.g.ui.guard(()=>St("/api/game/start",{matchId:t.id}));e?this.renderMatch(e):this.pollGame()}async move(t,e){let n=await this.g.ui.guard(()=>St("/api/game/move",{matchId:t.id,...e}));n?(this.renderMatch(n),this.g.ui.sfx("ok")):this.pollGame()}async leaveMatch(t){let e=await this.g.ui.guard(()=>St("/api/game/leave",{matchId:t.id}));this.g.ui.closeSheet(),e?this.renderMatch(e):this.pollGame(),this.refreshVenue()}async refreshVenue(){let t=await Kt(`/api/venue?id=${this.id}`).catch(()=>null);t&&this.open&&(this.data=t,this.drawStrip(),this.people_refresh())}poll(){clearInterval(this.pt),this.pt=setInterval(async()=>{if(!this.open)return;if(await this.refreshVenue(),this.matchId)await this.pollGame();else{let e=this.data.stations.find(n=>n.match?.you);e&&!this.dismissed.has(e.match.id)&&this.focusMatch(e.match.id)}let t=st("#gtimer");t&&this.match?.status==="active"&&(t.textContent=`${Math.max(0,Math.ceil((this.match.deadlineAt-this.g.serverNow())/1e3))}s`)},1500)}tap(t){let e=this.canvas.getBoundingClientRect(),n=new at((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new Kn;i.setFromCamera(n,this.cam);let r=i.intersectObjects(this.stations.children,!0)[0];if(r){let o=r.object.userData.stationId;this.pick(o)}}bind(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x;t.x=n.clientX,t.moved+=Math.abs(i),this.yaw=Math.max(Math.PI/5-.7,Math.min(Math.PI/5+.7,this.yaw-i*.006))}}),e.addEventListener("pointerup",n=>{t&&t.moved<8&&this.tap(n),t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(9,Math.min(24,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{this.open&&n.key==="Escape"&&!this.g.ui.sheetOpen&&this.leave()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){this.open&&(this.cam.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(0,.6,.3),this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop()))}async leave(){!this.open||!await this.g.ui.guard(()=>St("/api/venue/leave"))||(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,this.g.net.nudge(),st("#game").focus())}};var Mu=["Tap any building or sign to see it on the map and travel there.","Take a shift at the Corner Mart: the quick task gives +25% if you stop the bar in the green.","Knock at a house when its owner is home. They can let you in.","Land plots grow in value, but omo-onile may come for a levy.","Delivery costs more but works from anywhere.","Press C to hop in your car. Press T to chat."],tc=class{constructor(){this.playing=!1,this.busy=!1,this.user=null,this.clockOffset=0,this.cfg={},this.lastKnocks=null,this.waypoint=null,this.commute=null,this.worldTime=null,this.plots=[],this.props=[],this.shops=[],this.fpsAcc=0,this.activity=""}serverNow(){return Date.now()+this.clockOffset}clockSync(t,e){let n=t+e/2-Date.now();this.clockOffset=this.clockOffset?this.clockOffset*.7+n*.3:n}pos(){return{x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}}progress(t,e){st("#loadBar").style.width=t+"%",e&&(st("#loadTip").textContent=e)}async boot(){try{this.progress(8,"Reaching the server\u2026");let[t,e]=await Promise.all([Kt("/api/config"),Kt("/api/city")]);this.cfg=t,this.city=e,e.area=(i,r)=>r>125?"Lagoon Front":i<0&&r<0?"Yaba":i>=0&&r<0?"Ikeja":i<0?"Surulere":"Lekki Phase 1",st("#tagline").textContent=t.tagline||"",document.title=t.name,this.progress(30,"Building the district\u2026"),await new Promise(i=>setTimeout(i,30)),this.renderer=new Xn({canvas:st("#game"),antialias:devicePixelRatio<2,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.camera=new be(58,1,.5,900),this.camera.position.set(0,14,20),this.world=eu(e),this.scene=this.world.scene,this.decorate(),this.progress(60,"Putting traffic on the road\u2026"),await new Promise(i=>setTimeout(i,30)),this.traffic=new oo(this.scene,e.trafficLoops),this.walkers=new ao(this.scene,e.zones),this.ghosts=new lo(this.scene),this.ads=new uo(this.world,e,()=>this.serverNow()),this.ui=new go(this),this.net=new xo(this),this.interior=new yo(this),this.venue=new vo(this),this.ctrl=new ho(st("#game"),e,this.world.colliders,"#00a859","You"),this.scene.add(this.ctrl.root),addEventListener("resize",()=>this.resize()),this.resize(),this.bindAuth(),this.progress(85,Mu[Math.floor(Math.random()*Mu.length)]);let n=await Kt("/api/me").catch(()=>null);this.progress(100,"Ready!"),await new Promise(i=>setTimeout(i,250)),this.loop(performance.now()),st("#loading").classList.add("hidden"),n?await this.enter(n.user):st("#auth").classList.remove("hidden")}catch(t){console.error(t),st("#loadTip").textContent=t instanceof dn?t.message:"Could not start the game. Is WebGL enabled? Refresh to retry.",st("#loadBar").style.background="#d6402f"}}decorate(){let t=this.scene;this.plotMeshes={};let e=so();for(let i of this.city.plots||[]){let r=new fe,o=new yt(new Re(i.size,i.size).rotateX(-Math.PI/2),new Xt({color:15327944,transparent:!0,opacity:.9}));o.position.set(i.x,.12,i.z),r.add(o);let a=new Is(new $r(new qt(i.size,.2,i.size)),new Zi({color:16761358}));a.position.set(i.x,.2,i.z),r.add(a);let l=new yt(new Ne(.12,.12,4),new Xt({color:7036746}));l.position.set(i.x,2,i.z+i.size/2-1),r.add(l);let c=new yt(new Re(2.6,1.6),new _e({color:3523691,side:We}));c.position.set(i.x+1.3,3.2,i.z+i.size/2-1),r.add(c),this.plotMeshes[i.id]={sq:o,flag:c},t.add(r)}let n=this.city.shops.find(i=>i.id==="shop_market");if(n){let i=new yt(new qt(7,.25,4),new Xt({color:14043695}));i.position.set(n.x,3,n.z);let r=new yt(new qt(6,1.1,2),new Xt({color:9136957}));r.position.set(n.x,.55,n.z+.5);let o=new yt(new qt(5.2,.3,1.2),new Xt({color:15185994}));o.position.set(n.x,1.25,n.z+.5),t.add(i,r,o);for(let a of[-3.2,3.2]){let l=new yt(new Ne(.1,.1,3),new Xt({color:5592405}));l.position.set(n.x+a,1.5,n.z-1.5),t.add(l)}}for(let i of this.city.venues||[]){let r=Qn(i.name,i.sign||"#333");r.scale.set(8,2,1),r.position.set(i.x,8.5,i.z),t.add(r);let o=new yt(new Ds(1.4,1.9,24).rotateX(-Math.PI/2),new _e({color:16761358,side:We}));o.position.set(i.x,.15,i.z),t.add(o)}this.dest=new yt(new Ds(1.2,1.7,28).rotateX(-Math.PI/2),new _e({color:11816191,side:We})),this.dest.visible=!1,t.add(this.dest)}resize(){let t=innerWidth,e=innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.size={w:t,h:e}}bindAuth(){let t="guest",e=st("#authForm"),n=i=>{t=i,Vl("#authTabs button").forEach(r=>r.classList.toggle("on",r.dataset.t===i)),st("#fUser").classList.toggle("hidden",i==="guest"),st("#fPass").classList.toggle("hidden",i==="guest"),st("#authGo").textContent={guest:"Play as guest",signup:"Create account",login:"Log in"}[i],st("#authErr").textContent=""};n("guest"),Vl("#authTabs button").forEach(i=>i.onclick=()=>n(i.dataset.t)),e.onsubmit=async i=>{i.preventDefault();let r=new FormData(e),o=st("#age18").checked;if(st("#authErr").textContent="",t!=="login"&&!o){st("#authErr").textContent="You must confirm you are 18 or older to play.";return}let a=st("#authGo");a.disabled=!0;try{let l=await St(`/api/auth/${t}`,{username:r.get("username"),password:r.get("password"),age18:o});st("#auth").classList.add("hidden"),await this.enter(l.user)}catch(l){st("#authErr").textContent=l.message}finally{a.disabled=!1}}}async enter(t){this.playing=!0,this.user=t,st("#hud").classList.remove("hidden"),this.cfg.jobs=(await Kt("/api/jobs").catch(()=>({jobs:[]}))).jobs,this.ctrl.setLook(t.color,t.username);let e=this.city.spawns,n=e[t.id%e.length],i=t.pos&&(t.pos.x||t.pos.z)?t.pos:null;this.ctrl.teleport(i?.x??n.x,i?.z??n.z),this.ctrl.ry=n.ry||0,this.ctrl.camYaw=this.ctrl.ry,this.camera.position.set(this.ctrl.x-10,12,this.ctrl.z+12),this.update(t),this.net.start(),this.refreshProps(),Kt("/api/plots").then(r=>{this.plots=r.plots,this.refreshPlots()}).catch(()=>{}),this.ui.toast(t.guest?`Welcome, ${t.username}! You are playing as a guest.`:`Welcome back, ${t.username}!`),!localStorage.getItem("na_tip")&&!matchMedia("(pointer: coarse)").matches&&(localStorage.setItem("na_tip","1"),setTimeout(()=>{this.ui.sheetOpen||this.ui.toast("Tip: tap a building or the ground near a sign to open its sheet.")},1800))}async refreshProps(){let t=await Kt("/api/properties").catch(()=>null);t&&(this.props=t.properties,this.world.setMarkers(t.properties))}refreshPlots(){for(let t of this.plots){let e=this.plotMeshes[t.id];e&&e.flag.material.color.setHex(t.status==="available"?3523691:t.status==="yours"?16761358:9080728)}}async refreshMe(){let t=await Kt("/api/me").catch(()=>null);t?.user&&this.update(t.user)}update(t){t&&(this.user=t,this.ui.hud(t))}sessionLost(){this.playing&&(this.playing=!1,this.net.stop(),st("#hud").classList.add("hidden"),this.ui.closeSheet(),st("#auth").classList.remove("hidden"),st("#authErr").textContent="Your session ended. Please sign in again.")}async logout(){await St("/api/auth/logout").catch(()=>{}),this.playing=!1,this.net.stop(),location.reload()}setConn(t){st("#conn").classList.toggle("hidden",t)}markRead(){this.ui.badge(0),this.unread=0}toggleCar(){if(!this.playing||this.busy)return;let t=this.ctrl.toggleCar();this.ui.sfx(t==="drive"?"horn":"ok"),this.net.nudge()}onHeartbeat(t){this.update(t.me),this.worldTime=t.world,this.ui.clock(t.world),this.world.setTime(t.world.minutesOfDay),this.ghosts.ingest(t.players,this.serverNow()),this.ads.setSnapshot(t.ads);for(let e of t.chat||[])this.ui.addChat(e.u,e.t,e.id);for(let e of t.notifs||[])["knock","dm","knock_in","knock_no"].includes(e.kind),this.unread=(this.unread||0)+1,this.ui.toast(e.text,["omo_onile"].includes(e.kind)?"bad":e.kind==="dm"?"":"money");this.ui.badge(this.unread||0),this.lastKnocks=t.knocks;for(let e of t.knocks?.incoming||[])this.ui.hostKnock(e);t.teleport&&!t.teleport.travelMs&&!this.commute&&this.ctrl.teleport(t.teleport.x,t.teleport.z),t.me.shift&&t.me.shift.endsAt<=this.serverNow()&&this.lastShiftDone!==t.me.shift.id&&(this.lastShiftDone=t.me.shift.id,this.ui.toast("Shift done! Open the job sheet to collect your pay.","money"))}onPush(t){t.kind==="knock"&&this.ui.sfx("knock")}nearest(t=18){let e=null,n=t,i=this.ctrl.x,r=this.ctrl.z;for(let o of this.city.places){let a=Math.hypot(o.x-i,o.z-r);a<n&&(n=a,e=o)}return e?{place:e,d:n}:null}tapPlace(t,e){let n=new at(t/this.size.w*2-1,-(e/this.size.h)*2+1),i=new Kn;i.setFromCamera(n,this.camera);let r=Object.values(this.world.boards).map(h=>h.panel),o=i.intersectObjects(r,!1)[0];if(o){let h=Object.keys(this.world.boards).find(d=>this.world.boards[d].panel===o.object);if(h)return this.ui.board(h)}let a=-i.ray.origin.y/i.ray.direction.y;if(!(a>0))return;let l=i.ray.origin.clone().addScaledVector(i.ray.direction,a),c=null,u=20;for(let h of this.city.places){let d=Math.hypot(h.x-l.x,h.z-l.z);d<u&&(u=d,c=h)}for(let h of this.city.properties){let d=this.city.buildings.find(f=>f.id===h.buildingId);if(d&&Math.abs(l.x-d.x)<d.w/2+2&&Math.abs(l.z-d.z)<d.d/2+2){c=this.city.places.find(f=>f.id===h.id);break}}c?(this.ui.sfx("ok"),this.ui.place(c.id)):this.setWaypoint(l.x,l.z,"Tapped spot")}doAction(){if(!this.playing||this.busy||this.ui.sheetOpen)return;let t=this.nearBoard||null,e=this.nearest(this.actionRange||18);e?this.ui.place(e.place.id):t&&this.ui.board(t)}setWaypoint(t,e,n){this.waypoint={x:t,z:e,label:n},this.dest.visible=!0,this.dest.position.set(t,.3,e)}enterHome(){St("/api/property/enter").then(()=>this.interior.show(this.user.home.id)).catch(t=>this.ui.error(t))}async enterAsVisitor(t){this.ui.sfx("ok"),await this.interior.show(t,!0)}runCommute(t,e,n){this.busy=!0,this.ctrl.frozen=!0,this.commute={t0:performance.now(),dur:t.seconds*1e3,from:t.from,to:t.to,mode:t.mode},st("#commute").classList.remove("hidden"),st("#commuteTitle").textContent=`${{keke:"\u{1F6FA} Keke",danfo:"\u{1F68C} Danfo",car:"\u{1F697} Your car"}[t.mode]} to ${e.name}`,st("#commuteSub").textContent=`${n.traffic}${t.fare?" \xB7 "+this.fmt(t.fare):""}`,this.ui.sfx("horn"),this.ui.toast(Oe("travel",t.fare)),this.ctrl.mode=t.mode==="car"?"drive":"walk",this.ctrl.applyMode();let i=t.to.x-t.from.x,r=t.to.z-t.from.z;this.ctrl.ry=Math.atan2(-r,i),this.ctrl.camYaw=this.ctrl.ry,this.net.trail.length=0}fmt(t){return"\u20A6"+Math.round(t).toLocaleString("en-NG")}stepCommute(t){let e=this.commute;if(!e)return!1;let n=Math.min(1,(t-e.t0)/e.dur),i=n<.5?2*n*n:1-Math.pow(-2*n+2,2)/2;return this.ctrl.x=e.from.x+(e.to.x-e.from.x)*i,this.ctrl.z=e.from.z+(e.to.z-e.from.z)*i,this.ctrl.v=0,this.ctrl.root.position.set(this.ctrl.x,0,this.ctrl.z),this.ctrl.root.rotation.y=this.ctrl.ry,st("#commuteBar").style.width=n*100+"%",n>=1&&(this.commute=null,this.busy=!1,this.ctrl.frozen=!1,this.ctrl.mode="walk",this.ctrl.applyMode(),st("#commute").classList.add("hidden"),this.ctrl.teleport(e.to.x,e.to.z),this.ui.sfx("ok"),this.ui.toast("You have arrived."),this.net.nudge(),this.waypoint=null,this.dest.visible=!1),!0}loop(t){let e=t;this.lastSample=0;let n=i=>{requestAnimationFrame(n);let r=Math.min(.1,(i-e)/1e3);if(e=i,!this.playing){this.idleCam(i),this.renderer.render(this.scene,this.camera);return}if(this.interior.open||this.venue.open)return;let o=this.serverNow()/1e3;if(this.traffic.update(o),this.walkers.update(o),this.ghosts.update(this.serverNow()-1100),this.world.animate(r*1e3),this.stepCommute(i)?this.ctrl.placeCamera(this.camera,r):this.ctrl.update(r),this.commute||(this.ctrl.placeCamera(this.camera,r),i-this.lastSample>250&&(this.lastSample=i,this.net.sample({t:this.serverNow(),x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}))),this.ctrl.lastTap&&!this.ui.sheetOpen&&!this.busy){let a=this.ctrl.lastTap;this.ctrl.lastTap=null,i-a.t<400&&this.tapPlace(a.x,a.y)}this.ads.update(this.camera,this.size,this.ctrl,r*1e3),this.hudStep(i),this.renderer.render(this.scene,this.camera)};requestAnimationFrame(n)}idleCam(t){let e=t/9e3;this.camera.position.set(Math.cos(e)*70,38,Math.sin(e)*70-20),this.camera.lookAt(0,4,-20),this.camera.updateMatrixWorld()}hudStep(t){if(t-(this.hudT||0)<200)return;this.hudT=t;let e=this.ctrl,n=this.nearest(this.actionRange||18),i=this.ads.nearest(e.x,e.z,30);this.nearBoard=i;let r=this.city.area(e.x,e.z),o=this.roadName(e.x,e.z);this.ui.loc(`\u{1F4CD} ${n?n.place.name:o||r}${n||o?" \xB7 "+r:""}`);let a=null;if(n&&!this.ui.sheetOpen){let l=n.place;if(a={shop:`\u{1F6D2} ${l.name}`,job:"\u{1F4BC} Work here",house:`\u{1F3E0} ${l.name}`,plot:`\u{1F30D} ${l.name}`,landmark:`\u{1F4CD} ${l.name}`}[l.type],l.type==="shop"){let c=this.shops.find(u=>u.id===l.id);c&&!c.status.open&&(a=`\u{1F512} ${l.name}: ${c.status.text}`)}}else i&&!this.ui.sheetOpen&&(a="\u{1F4E2} Billboard");if(this.ui.action(this.busy?null:a),this.waypoint){let l=Math.hypot(this.waypoint.x-e.x,this.waypoint.z-e.z);l<5&&(this.waypoint=null,this.dest.visible=!1,this.ui.toast("You have arrived.")),this.ui.waypoint(this.waypoint,l)}else this.ui.waypoint(null);this.dest.visible&&this.dest.scale.setScalar(1+Math.sin(t/200)*.15),this.ui.minimap(e,this.city,this.ghosts,this.waypoint),this.user?.shift&&this.ui.hud(this.user),this.activity=e.mode}roadName(t,e){for(let n of this.city.roads)if(n.z1===n.z2?Math.abs(e-n.z1)<n.width/2&&t>=Math.min(n.x1,n.x2)&&t<=Math.max(n.x1,n.x2):Math.abs(t-n.x1)<n.width/2&&e>=Math.min(n.z1,n.z2)&&e<=Math.max(n.z1,n.z2))return n.name||"On the road";return null}},wu=new tc;window.__game=wu;wu.boot();})();
//# sourceMappingURL=game.js.map
