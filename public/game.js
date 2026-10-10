(()=>{var Tf=0,wh=1,Af=2;var Nu=1,Rf=2,Un=3,vn=0,$e=1,Me=2,ri=0,ss=1,Sh=2,Eh=3,Th=4,Cf=5,Ei=100,If=101,Pf=102,Lf=103,Df=104,kf=200,Uf=201,Of=202,Nf=203,ja=204,Qa=205,zf=206,Ff=207,Bf=208,Hf=209,Vf=210,Gf=211,Wf=212,$f=213,Xf=214,tc=0,ec=1,nc=2,cs=3,ic=4,sc=5,rc=6,oc=7,El=0,Yf=1,qf=2,oi=0,Zf=1,Jf=2,Kf=3,jf=4,Qf=5,tp=6,ep=7;var zu=300,ls=301,hs=302,ac=303,cc=304,So=306,Bn=1e3,Ai=1001,lc=1002,Le=1003,np=1004;var dr=1005;var xn=1006,ma=1007;var Ri=1008;var Hn=1009,Fu=1010,Bu=1011,Ys=1012,Tl=1013,Ci=1014,yn=1015,ir=1016,Al=1017,Rl=1018,us=1020,Hu=35902,Vu=1021,Gu=1022,un=1023,Wu=1024,$u=1025,rs=1026,ds=1027,Cl=1028,Il=1029,Xu=1030,Pl=1031;var Ll=1033,Wr=33776,$r=33777,Xr=33778,Yr=33779,hc=35840,uc=35841,dc=35842,fc=35843,pc=36196,mc=37492,gc=37496,xc=37808,yc=37809,vc=37810,_c=37811,bc=37812,Mc=37813,wc=37814,Sc=37815,Ec=37816,Tc=37817,Ac=37818,Rc=37819,Cc=37820,Ic=37821,qr=36492,Pc=36494,Lc=36495,Yu=36283,Dc=36284,kc=36285,Uc=36286;var Jr=2300,Oc=2301,ga=2302,Ah=2400,Rh=2401,Ch=2402;var ip=3200,sp=3201;var qu=0,rp=1,si="",Ie="srgb",ys="srgb-linear",Eo="linear",fe="srgb";var zi=7680;var Ih=519,op=512,ap=513,cp=514,Zu=515,lp=516,hp=517,up=518,dp=519,Nc=35044,Ju=35048;var Ph="300 es",zn=2e3,Kr=2001,ci=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Zr=Math.PI/180,zc=180/Math.PI;function ai(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Pe(s,t,e){return Math.max(t,Math.min(e,s))}function fp(s,t){return(s%t+t)%t}function xa(s,t,e){return(1-e)*s+e*t}function gn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function pe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var ht=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Zt=class s{constructor(t,e,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){let u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],y=i[0],x=i[3],m=i[6],v=i[1],M=i[4],_=i[7],k=i[2],A=i[5],C=i[8];return r[0]=o*y+a*v+c*k,r[3]=o*x+a*M+c*A,r[6]=o*m+a*_+c*C,r[1]=l*y+u*v+h*k,r[4]=l*x+u*M+h*A,r[7]=l*m+u*_+h*C,r[2]=d*y+f*v+g*k,r[5]=d*x+f*M+g*A,r[8]=d*m+f*_+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,d=a*c-u*r,f=l*r-o*c,g=e*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return t[0]=h*y,t[1]=(i*l-u*n)*y,t[2]=(a*n-i*o)*y,t[3]=d*y,t[4]=(u*e-i*c)*y,t[5]=(i*r-a*e)*y,t[6]=f*y,t[7]=(n*c-l*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ya.makeScale(t,e)),this}rotate(t){return this.premultiply(ya.makeRotation(-t)),this}translate(t,e){return this.premultiply(ya.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ya=new Zt;function Ku(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function jr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function pp(){let s=jr("canvas");return s.style.display="block",s}var Lh={};function Vs(s){s in Lh||(Lh[s]=!0,console.warn(s))}function mp(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function gp(s){let t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function xp(s){let t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ae={enabled:!0,workingColorSpace:ys,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===fe&&(s.r=Fn(s.r),s.g=Fn(s.g),s.b=Fn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===fe&&(s.r=os(s.r),s.g=os(s.g),s.b=os(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===si?Eo:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Fn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function os(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Dh=[.64,.33,.3,.6,.15,.06],kh=[.2126,.7152,.0722],Uh=[.3127,.329],Oh=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nh=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ae.define({[ys]:{primaries:Dh,whitePoint:Uh,transfer:Eo,toXYZ:Oh,fromXYZ:Nh,luminanceCoefficients:kh,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:Dh,whitePoint:Uh,transfer:fe,toXYZ:Oh,fromXYZ:Nh,luminanceCoefficients:kh,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}});var Fi,Fc=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Fi===void 0&&(Fi=jr("canvas")),Fi.width=t.width,Fi.height=t.height;let n=Fi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Fi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=jr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Fn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Fn(e[n]/255)*255):e[n]=Fn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},yp=0,Qr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=ai(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(va(i[o].image)):r.push(va(i[o]))}else r=va(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function va(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Fc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var vp=0,Xe=class s extends ci{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=Ai,i=Ai,r=xn,o=Ri,a=un,c=Hn,l=s.DEFAULT_ANISOTROPY,u=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=ai(),this.name="",this.source=new Qr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bn:t.x=t.x-Math.floor(t.x);break;case Ai:t.x=t.x<0?0:1;break;case lc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bn:t.y=t.y-Math.floor(t.y);break;case Ai:t.y=t.y<0?0:1;break;case lc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=zu;Xe.DEFAULT_ANISOTROPY=1;var me=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],y=c[2],x=c[6],m=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-y)<.01&&Math.abs(g-x)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+y)<.1&&Math.abs(g+x)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(l+1)/2,_=(f+1)/2,k=(m+1)/2,A=(u+d)/4,C=(h+y)/4,I=(g+x)/4;return M>_&&M>k?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=C/n):_>k?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=A/i,r=I/i):k<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(k),n=C/r,i=I/r),this.set(n,i,r,e),this}let v=Math.sqrt((x-g)*(x-g)+(h-y)*(h-y)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(x-g)/v,this.y=(h-y)/v,this.z=(d-u)/v,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bc=class extends ci{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Xe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Qr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends Bc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},to=class extends Xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Le,this.minFilter=Le,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Hc=class extends Xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Le,this.minFilter=Le,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var tn=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3],d=r[o+0],f=r[o+1],g=r[o+2],y=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=y;return}if(h!==y||c!==d||l!==f||u!==g){let x=1-a,m=c*d+l*f+u*g+h*y,v=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){let k=Math.sqrt(M),A=Math.atan2(k,m*v);x=Math.sin(x*A)/k,a=Math.sin(a*A)/k}let _=a*v;if(c=c*x+d*_,l=l*x+f*_,u=u*x+g*_,h=h*x+y*_,x===1-a){let k=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=k,l*=k,u*=k,h*=k}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*h+c*f-l*d,t[e+1]=c*g+u*d+l*h-a*f,t[e+2]=l*g+u*f+a*d-c*h,t[e+3]=u*g-a*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Pe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(zh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(zh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),u=2*(a*e-r*i),h=2*(r*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _a.copy(this).projectOnVector(t),this.sub(_a)}reflect(t){return this.sub(_a.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Pe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_a=new P,zh=new tn,Gn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fr.copy(n.boundingBox)),fr.applyMatrix4(t.matrixWorld),this.union(fr)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ps),pr.subVectors(this.max,Ps),Bi.subVectors(t.a,Ps),Hi.subVectors(t.b,Ps),Vi.subVectors(t.c,Ps),jn.subVectors(Hi,Bi),Qn.subVectors(Vi,Hi),yi.subVectors(Bi,Vi);let e=[0,-jn.z,jn.y,0,-Qn.z,Qn.y,0,-yi.z,yi.y,jn.z,0,-jn.x,Qn.z,0,-Qn.x,yi.z,0,-yi.x,-jn.y,jn.x,0,-Qn.y,Qn.x,0,-yi.y,yi.x,0];return!ba(e,Bi,Hi,Vi,pr)||(e=[1,0,0,0,1,0,0,0,1],!ba(e,Bi,Hi,Vi,pr))?!1:(mr.crossVectors(jn,Qn),e=[mr.x,mr.y,mr.z],ba(e,Bi,Hi,Vi,pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},In=[new P,new P,new P,new P,new P,new P,new P,new P],cn=new P,fr=new Gn,Bi=new P,Hi=new P,Vi=new P,jn=new P,Qn=new P,yi=new P,Ps=new P,pr=new P,mr=new P,vi=new P;function ba(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){vi.fromArray(s,r);let a=i.x*Math.abs(vi.x)+i.y*Math.abs(vi.y)+i.z*Math.abs(vi.z),c=t.dot(vi),l=e.dot(vi),u=n.dot(vi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var _p=new Gn,Ls=new P,Ma=new P,li=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):_p.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ls.subVectors(t,this.center);let e=Ls.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ls,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ma.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ls.copy(t.center).add(Ma)),this.expandByPoint(Ls.copy(t.center).sub(Ma))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Pn=new P,wa=new P,gr=new P,ti=new P,Sa=new P,xr=new P,Ea=new P,qs=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){wa.copy(t).add(e).multiplyScalar(.5),gr.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(wa);let r=t.distanceTo(e)*.5,o=-this.direction.dot(gr),a=ti.dot(this.direction),c=-ti.dot(gr),l=ti.lengthSq(),u=Math.abs(1-o*o),h,d,f,g;if(u>0)if(h=o*c-a,d=o*a-c,g=r*u,h>=0)if(d>=-g)if(d<=g){let y=1/u;h*=y,d*=y,f=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(wa).addScaledVector(gr,d),f}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);let n=Pn.dot(this.direction),i=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,i,r){Sa.subVectors(e,t),xr.subVectors(n,t),Ea.crossVectors(Sa,xr);let o=this.direction.dot(Ea),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,t);let c=a*this.direction.dot(xr.crossVectors(ti,xr));if(c<0)return null;let l=a*this.direction.dot(Sa.cross(ti));if(l<0||c+l>o)return null;let u=-a*ti.dot(Ea);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class s{constructor(t,e,n,i,r,o,a,c,l,u,h,d,f,g,y,x){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,u,h,d,f,g,y,x)}set(t,e,n,i,r,o,a,c,l,u,h,d,f,g,y,x){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=y,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Gi.setFromMatrixColumn(t,0).length(),r=1/Gi.setFromMatrixColumn(t,1).length(),o=1/Gi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){let d=o*u,f=o*h,g=a*u,y=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+g*l,e[5]=d-y*l,e[9]=-a*c,e[2]=y-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*u,f=c*h,g=l*u,y=l*h;e[0]=d+y*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=y+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*u,f=c*h,g=l*u,y=l*h;e[0]=d-y*a,e[4]=-o*h,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=y-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*u,f=o*h,g=a*u,y=a*h;e[0]=c*u,e[4]=g*l-f,e[8]=d*l+y,e[1]=c*h,e[5]=y*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,f=o*l,g=a*c,y=a*l;e[0]=c*u,e[4]=y-d*h,e[8]=g*h+f,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=f*h+g,e[10]=d-y*h}else if(t.order==="XZY"){let d=o*c,f=o*l,g=a*c,y=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+y,e[5]=o*u,e[9]=f*h-g,e[2]=g*h-f,e[6]=a*u,e[10]=y*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bp,t,Mp)}lookAt(t,e,n){let i=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),ei.crossVectors(n,Ze),ei.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),ei.crossVectors(n,Ze)),ei.normalize(),yr.crossVectors(Ze,ei),i[0]=ei.x,i[4]=yr.x,i[8]=Ze.x,i[1]=ei.y,i[5]=yr.y,i[9]=Ze.y,i[2]=ei.z,i[6]=yr.z,i[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],y=n[6],x=n[10],m=n[14],v=n[3],M=n[7],_=n[11],k=n[15],A=i[0],C=i[4],I=i[8],E=i[12],w=i[1],D=i[5],H=i[9],B=i[13],X=i[2],tt=i[6],Y=i[10],nt=i[14],W=i[3],ut=i[7],Mt=i[11],It=i[15];return r[0]=o*A+a*w+c*X+l*W,r[4]=o*C+a*D+c*tt+l*ut,r[8]=o*I+a*H+c*Y+l*Mt,r[12]=o*E+a*B+c*nt+l*It,r[1]=u*A+h*w+d*X+f*W,r[5]=u*C+h*D+d*tt+f*ut,r[9]=u*I+h*H+d*Y+f*Mt,r[13]=u*E+h*B+d*nt+f*It,r[2]=g*A+y*w+x*X+m*W,r[6]=g*C+y*D+x*tt+m*ut,r[10]=g*I+y*H+x*Y+m*Mt,r[14]=g*E+y*B+x*nt+m*It,r[3]=v*A+M*w+_*X+k*W,r[7]=v*C+M*D+_*tt+k*ut,r[11]=v*I+M*H+_*Y+k*Mt,r[15]=v*E+M*B+_*nt+k*It,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],y=t[7],x=t[11],m=t[15];return g*(+r*c*h-i*l*h-r*a*d+n*l*d+i*a*f-n*c*f)+y*(+e*c*f-e*l*d+r*o*d-i*o*f+i*l*u-r*c*u)+x*(+e*l*h-e*a*f-r*o*h+n*o*f+r*a*u-n*l*u)+m*(-i*a*u-e*c*h+e*a*d+i*o*h-n*o*d+n*c*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],y=t[13],x=t[14],m=t[15],v=h*x*l-y*d*l+y*c*f-a*x*f-h*c*m+a*d*m,M=g*d*l-u*x*l-g*c*f+o*x*f+u*c*m-o*d*m,_=u*y*l-g*h*l+g*a*f-o*y*f-u*a*m+o*h*m,k=g*h*c-u*y*c-g*a*d+o*y*d+u*a*x-o*h*x,A=e*v+n*M+i*_+r*k;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return t[0]=v*C,t[1]=(y*d*r-h*x*r-y*i*f+n*x*f+h*i*m-n*d*m)*C,t[2]=(a*x*r-y*c*r+y*i*l-n*x*l-a*i*m+n*c*m)*C,t[3]=(h*c*r-a*d*r-h*i*l+n*d*l+a*i*f-n*c*f)*C,t[4]=M*C,t[5]=(u*x*r-g*d*r+g*i*f-e*x*f-u*i*m+e*d*m)*C,t[6]=(g*c*r-o*x*r-g*i*l+e*x*l+o*i*m-e*c*m)*C,t[7]=(o*d*r-u*c*r+u*i*l-e*d*l-o*i*f+e*c*f)*C,t[8]=_*C,t[9]=(g*h*r-u*y*r-g*n*f+e*y*f+u*n*m-e*h*m)*C,t[10]=(o*y*r-g*a*r+g*n*l-e*y*l-o*n*m+e*a*m)*C,t[11]=(u*a*r-o*h*r-u*n*l+e*h*l+o*n*f-e*a*f)*C,t[12]=k*C,t[13]=(u*y*i-g*h*i+g*n*d-e*y*d-u*n*x+e*h*x)*C,t[14]=(g*a*i-o*y*i-g*n*c+e*y*c+o*n*x-e*a*x)*C,t[15]=(o*h*i-u*a*i+u*n*c-e*h*c-o*n*d+e*a*d)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,h=a+a,d=r*l,f=r*u,g=r*h,y=o*u,x=o*h,m=a*h,v=c*l,M=c*u,_=c*h,k=n.x,A=n.y,C=n.z;return i[0]=(1-(y+m))*k,i[1]=(f+_)*k,i[2]=(g-M)*k,i[3]=0,i[4]=(f-_)*A,i[5]=(1-(d+m))*A,i[6]=(x+v)*A,i[7]=0,i[8]=(g+M)*C,i[9]=(x-v)*C,i[10]=(1-(d+y))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Gi.set(i[0],i[1],i[2]).length(),o=Gi.set(i[4],i[5],i[6]).length(),a=Gi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],ln.copy(this);let l=1/r,u=1/o,h=1/a;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=h,ln.elements[9]*=h,ln.elements[10]*=h,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=zn){let c=this.elements,l=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),d=(n+i)/(n-i),f,g;if(a===zn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Kr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=zn){let c=this.elements,l=1/(e-t),u=1/(n-i),h=1/(o-r),d=(e+t)*l,f=(n+i)*u,g,y;if(a===zn)g=(o+r)*h,y=-2*h;else if(a===Kr)g=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Gi=new P,ln=new ie,bp=new P(0,0,0),Mp=new P(1,1,1),ei=new P,yr=new P,Ze=new P,Fh=new ie,Bh=new tn,en=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Pe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Pe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Pe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Pe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Pe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bh.setFromEuler(this),this.setFromQuaternion(Bh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};en.DEFAULT_ORDER="XYZ";var Zs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},wp=0,Hh=new P,Wi=new tn,Ln=new ie,vr=new P,Ds=new P,Sp=new P,Ep=new tn,Vh=new P(1,0,0),Gh=new P(0,1,0),Wh=new P(0,0,1),$h={type:"added"},Tp={type:"removed"},$i={type:"childadded",child:null},Ta={type:"childremoved",child:null},De=class s extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wp++}),this.uuid=ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new P,e=new en,n=new tn,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ie},normalMatrix:{value:new Zt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.premultiply(Wi),this}rotateX(t){return this.rotateOnAxis(Vh,t)}rotateY(t){return this.rotateOnAxis(Gh,t)}rotateZ(t){return this.rotateOnAxis(Wh,t)}translateOnAxis(t,e){return Hh.copy(t).applyQuaternion(this.quaternion),this.position.add(Hh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vh,t)}translateY(t){return this.translateOnAxis(Gh,t)}translateZ(t){return this.translateOnAxis(Wh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?vr.copy(t):vr.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Ds,vr,this.up):Ln.lookAt(vr,Ds,this.up),this.quaternion.setFromRotationMatrix(Ln),i&&(Ln.extractRotation(i.matrixWorld),Wi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent($h),$i.child=t,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Tp),Ta.child=t,this.dispatchEvent(Ta),Ta.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent($h),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,t,Sp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,Ep,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};De.DEFAULT_UP=new P(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=new P,Dn=new P,Aa=new P,kn=new P,Xi=new P,Yi=new P,Xh=new P,Ra=new P,Ca=new P,Ia=new P,Pa=new me,La=new me,Da=new me,Nn=class s{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),hn.subVectors(t,e),i.cross(hn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){hn.subVectors(i,e),Dn.subVectors(n,e),Aa.subVectors(t,e);let o=hn.dot(hn),a=hn.dot(Dn),c=hn.dot(Aa),l=Dn.dot(Dn),u=Dn.dot(Aa),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(l*c-a*u)*d,g=(o*u-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,kn.x),c.addScaledVector(o,kn.y),c.addScaledVector(a,kn.z),c)}static getInterpolatedAttribute(t,e,n,i,r,o){return Pa.setScalar(0),La.setScalar(0),Da.setScalar(0),Pa.fromBufferAttribute(t,e),La.fromBufferAttribute(t,n),Da.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Pa,r.x),o.addScaledVector(La,r.y),o.addScaledVector(Da,r.z),o}static isFrontFacing(t,e,n,i){return hn.subVectors(n,e),Dn.subVectors(t,e),hn.cross(Dn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),hn.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Xi.subVectors(i,n),Yi.subVectors(r,n),Ra.subVectors(t,n);let c=Xi.dot(Ra),l=Yi.dot(Ra);if(c<=0&&l<=0)return e.copy(n);Ca.subVectors(t,i);let u=Xi.dot(Ca),h=Yi.dot(Ca);if(u>=0&&h<=u)return e.copy(i);let d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(Xi,o);Ia.subVectors(t,r);let f=Xi.dot(Ia),g=Yi.dot(Ia);if(g>=0&&f<=g)return e.copy(r);let y=f*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Yi,a);let x=u*g-f*h;if(x<=0&&h-u>=0&&f-g>=0)return Xh.subVectors(r,i),a=(h-u)/(h-u+(f-g)),e.copy(i).addScaledVector(Xh,a);let m=1/(x+y+d);return o=y*m,a=d*m,e.copy(n).addScaledVector(Xi,o).addScaledVector(Yi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ju={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},_r={h:0,s:0,l:0};function ka(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var St=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ae.workingColorSpace){if(t=fp(t,1),e=Pe(e,0,1),n=Pe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ka(o,r,t+1/3),this.g=ka(o,r,t),this.b=ka(o,r,t-1/3)}return ae.toWorkingColorSpace(this,i),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=ju[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fn(t.r),this.g=Fn(t.g),this.b=Fn(t.b),this}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return ae.fromWorkingColorSpace(ze.copy(this),t),Math.round(Pe(ze.r*255,0,255))*65536+Math.round(Pe(ze.g*255,0,255))*256+Math.round(Pe(ze.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(ze.copy(this),e);let n=ze.r,i=ze.g,r=ze.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Ie){ae.fromWorkingColorSpace(ze.copy(this),t);let e=ze.r,n=ze.g,i=ze.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(_r);let n=xa(ni.h,_r.h,e),i=xa(ni.s,_r.s,e),r=xa(ni.l,_r.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ze=new St;St.NAMES=ju;var Ap=0,Wn=class extends ci{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=ai(),this.name="",this.blending=ss,this.side=vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ja,this.blendDst=Qa,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ss&&(n.blending=this.blending),this.side!==vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ja&&(n.blendSrc=this.blendSrc),this.blendDst!==Qa&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==cs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ih&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},re=class extends Wn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=El,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ee=new P,br=new ht,Te=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Nc,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)br.fromBufferAttribute(this,e),br.applyMatrix3(t),this.setXY(e,br.x,br.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array),r=pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Nc&&(t.usage=this.usage),t}};var eo=class extends Te{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var no=class extends Te{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ne=class extends Te{constructor(t,e,n){super(new Float32Array(t),e,n)}},Rp=0,Qe=new ie,Ua=new De,qi=new P,Je=new Gn,ks=new Gn,Ce=new P,_e=class s extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ku(t)?no:eo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,n){return Qe.makeTranslation(t,e,n),this.applyMatrix4(Qe),this}scale(t,e,n){return Qe.makeScale(t,e,n),this.applyMatrix4(Qe),this}lookAt(t){return Ua.lookAt(t),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ne(n,3))}else{for(let n=0,i=e.count;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(Je.min,ks.min),Je.expandByPoint(Ce),Ce.addVectors(Je.max,ks.max),Je.expandByPoint(Ce)):(Je.expandByPoint(ks.min),Je.expandByPoint(ks.max))}Je.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ce.fromBufferAttribute(a,l),c&&(qi.fromBufferAttribute(t,l),Ce.add(qi)),i=Math.max(i,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Te(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new P,c[I]=new P;let l=new P,u=new P,h=new P,d=new ht,f=new ht,g=new ht,y=new P,x=new P;function m(I,E,w){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,w),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,w),u.sub(l),h.sub(l),f.sub(d),g.sub(d);let D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(D),x.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(D),a[I].add(y),a[E].add(y),a[w].add(y),c[I].add(x),c[E].add(x),c[w].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let I=0,E=v.length;I<E;++I){let w=v[I],D=w.start,H=w.count;for(let B=D,X=D+H;B<X;B+=3)m(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let M=new P,_=new P,k=new P,A=new P;function C(I){k.fromBufferAttribute(i,I),A.copy(k);let E=a[I];M.copy(E),M.sub(k.multiplyScalar(k.dot(E))).normalize(),_.crossVectors(A,E);let D=_.dot(c[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,D)}for(let I=0,E=v.length;I<E;++I){let w=v[I],D=w.start,H=w.count;for(let B=D,X=D+H;B<X;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Te(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new P,r=new P,o=new P,a=new P,c=new P,l=new P,u=new P,h=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),y=t.getX(d+1),x=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,x),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,x),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(x,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,c){let l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u),f=0,g=0;for(let y=0,x=c.length;y<x;y++){a.isInterleavedBufferAttribute?f=c[y]*a.data.stride+a.offset:f=c[y]*u;for(let m=0;m<u;m++)d[g++]=l[f++]}return new Te(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){let f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(i[c]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let l in i){let u=i[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yh=new ie,_i=new qs,Mr=new li,qh=new P,wr=new P,Sr=new P,Er=new P,Oa=new P,Tr=new P,Zh=new P,Ar=new P,ot=class extends De{constructor(t=new _e,e=new re){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Tr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(Oa.fromBufferAttribute(h,t),o?Tr.addScaledVector(Oa,u):Tr.addScaledVector(Oa.sub(e),u))}e.add(Tr)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Mr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Mr,qh)===null||_i.origin.distanceToSquared(qh)>(t.far-t.near)**2))&&(Yh.copy(r).invert(),_i.copy(t.ray).applyMatrix4(Yh),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let x=d[g],m=o[x.materialIndex],v=Math.max(x.start,f.start),M=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let _=v,k=M;_<k;_+=3){let A=a.getX(_),C=a.getX(_+1),I=a.getX(_+2);i=Rr(this,m,t,n,l,u,h,A,C,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=x.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let x=g,m=y;x<m;x+=3){let v=a.getX(x),M=a.getX(x+1),_=a.getX(x+2);i=Rr(this,o,t,n,l,u,h,v,M,_),i&&(i.faceIndex=Math.floor(x/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){let x=d[g],m=o[x.materialIndex],v=Math.max(x.start,f.start),M=Math.min(c.count,Math.min(x.start+x.count,f.start+f.count));for(let _=v,k=M;_<k;_+=3){let A=_,C=_+1,I=_+2;i=Rr(this,m,t,n,l,u,h,A,C,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=x.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let x=g,m=y;x<m;x+=3){let v=x,M=x+1,_=x+2;i=Rr(this,o,t,n,l,u,h,v,M,_),i&&(i.faceIndex=Math.floor(x/3),e.push(i))}}}};function Cp(s,t,e,n,i,r,o,a){let c;if(t.side===$e?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===vn,a),c===null)return null;Ar.copy(a),Ar.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(Ar);return l<e.near||l>e.far?null:{distance:l,point:Ar.clone(),object:s}}function Rr(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,wr),s.getVertexPosition(c,Sr),s.getVertexPosition(l,Er);let u=Cp(s,t,e,n,wr,Sr,Er,Zh);if(u){let h=new P;Nn.getBarycoord(Zh,wr,Sr,Er,h),i&&(u.uv=Nn.getInterpolatedAttribute(i,a,c,l,h,new ht)),r&&(u.uv1=Nn.getInterpolatedAttribute(r,a,c,l,h,new ht)),o&&(u.normal=Nn.getInterpolatedAttribute(o,a,c,l,h,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new P,materialIndex:0};Nn.getNormal(wr,Sr,Er,d.normal),u.face=d,u.barycoord=h}return u}var Xt=class s extends _e{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(u,3)),this.setAttribute("uv",new ne(h,2));function g(y,x,m,v,M,_,k,A,C,I,E){let w=_/C,D=k/I,H=_/2,B=k/2,X=A/2,tt=C+1,Y=I+1,nt=0,W=0,ut=new P;for(let Mt=0;Mt<Y;Mt++){let It=Mt*D-B;for(let Jt=0;Jt<tt;Jt++){let ce=Jt*w-H;ut[y]=ce*v,ut[x]=It*M,ut[m]=X,l.push(ut.x,ut.y,ut.z),ut[y]=0,ut[x]=0,ut[m]=A>0?1:-1,u.push(ut.x,ut.y,ut.z),h.push(Jt/C),h.push(1-Mt/I),nt+=1}}for(let Mt=0;Mt<I;Mt++)for(let It=0;It<C;It++){let Jt=d+It+tt*Mt,ce=d+It+tt*(Mt+1),J=d+(It+1)+tt*(Mt+1),st=d+(It+1)+tt*Mt;c.push(Jt,ce,st),c.push(ce,J,st),W+=6}a.addGroup(f,W,E),f+=W,d+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function fs(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ve(s){let t={};for(let e=0;e<s.length;e++){let n=fs(s[e]);for(let i in n)t[i]=n[i]}return t}function Ip(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Qu(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}var Pp={clone:fs,merge:Ve},Lp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,_n=class extends Wn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lp,this.fragmentShader=Dp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=fs(t.uniforms),this.uniformsGroups=Ip(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},io=class extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ii=new P,Jh=new ht,Kh=new ht,Se=class extends io{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=zc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zc*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,Jh,Kh),e.subVectors(Kh,Jh)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Zi=-90,Ji=1,Vc=class extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Se(Zi,Ji,t,e);i.layers=this.layers,this.add(i);let r=new Se(Zi,Ji,t,e);r.layers=this.layers,this.add(r);let o=new Se(Zi,Ji,t,e);o.layers=this.layers,this.add(o);let a=new Se(Zi,Ji,t,e);a.layers=this.layers,this.add(a);let c=new Se(Zi,Ji,t,e);c.layers=this.layers,this.add(c);let l=new Se(Zi,Ji,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},so=class extends Xe{constructor(t,e,n,i,r,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:ls,super(t,e,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Gc=class extends Vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new so(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:xn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Xt(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:ri});r.uniforms.tEquirect.value=e;let o=new ot(i,r),a=e.minFilter;return e.minFilter===Ri&&(e.minFilter=xn),new Vc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},Na=new P,kp=new P,Up=new Zt,On=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Na.subVectors(n,e).cross(kp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Na),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Up.getNormalMatrix(t),i=this.coplanarPoint(Na).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},bi=new li,Cr=new P,Js=class{constructor(t=new On,e=new On,n=new On,i=new On,r=new On,o=new On){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn){let n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],d=i[7],f=i[8],g=i[9],y=i[10],x=i[11],m=i[12],v=i[13],M=i[14],_=i[15];if(n[0].setComponents(c-r,d-l,x-f,_-m).normalize(),n[1].setComponents(c+r,d+l,x+f,_+m).normalize(),n[2].setComponents(c+o,d+u,x+g,_+v).normalize(),n[3].setComponents(c-o,d-u,x-g,_-v).normalize(),n[4].setComponents(c-a,d-h,x-y,_-M).normalize(),e===zn)n[5].setComponents(c+a,d+h,x+y,_+M).normalize();else if(e===Kr)n[5].setComponents(a,h,y,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(t){return bi.center.set(0,0,0),bi.radius=.7071067811865476,bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Cr.x=i.normal.x>0?t.max.x:t.min.x,Cr.y=i.normal.y>0?t.max.y:t.min.y,Cr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Cr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function td(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Op(s){let t=new WeakMap;function e(a,c){let l=a.array,u=a.usage,h=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,u),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){let u=c.array,h=c.updateRanges;if(s.bindBuffer(l,a),h.length===0)s.bufferSubData(l,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){let g=h[d],y=h[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,h[d]=y)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){let y=h[f];s.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}var ke=class s extends _e{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=t/a,d=e/c,f=[],g=[],y=[],x=[];for(let m=0;m<u;m++){let v=m*d-o;for(let M=0;M<l;M++){let _=M*h-r;g.push(_,-v,0),y.push(0,0,1),x.push(M/a),x.push(1-m/c)}}for(let m=0;m<c;m++)for(let v=0;v<a;v++){let M=v+l*m,_=v+l*(m+1),k=v+1+l*(m+1),A=v+1+l*m;f.push(M,_,A),f.push(_,k,A)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(y,3)),this.setAttribute("uv",new ne(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},Np=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zp=`#ifdef USE_ALPHAHASH
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
#endif`,Fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gp=`#ifdef USE_AOMAP
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
#endif`,Wp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$p=`#ifdef USE_BATCHING
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
#endif`,Xp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jp=`#ifdef USE_IRIDESCENCE
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
#endif`,Kp=`#ifdef USE_BUMPMAP
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
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,o0=`#define PI 3.141592653589793
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
} // validated`,a0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,c0=`vec3 transformedNormal = objectNormal;
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
#endif`,l0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,f0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
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
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,x0=`#ifdef USE_ENVMAP
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
#endif`,y0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,v0=`#ifdef USE_ENVMAP
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
#endif`,_0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,b0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,M0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S0=`#ifdef USE_GRADIENTMAP
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
}`,E0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,T0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R0=`uniform bool receiveShadow;
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
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,I0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,P0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,L0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,k0=`PhysicalMaterial material;
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
#endif`,U0=`struct PhysicalMaterial {
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
}`,O0=`
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
#endif`,N0=`#if defined( RE_IndirectDiffuse )
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
#endif`,z0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,F0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,B0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,G0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,W0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,X0=`#if defined( USE_POINTS_UV )
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
#endif`,Y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Z0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,J0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,K0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j0=`#ifdef USE_MORPHTARGETS
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
#endif`,Q0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,em=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rm=`#ifdef USE_NORMALMAP
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
#endif`,om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,am=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,um=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ym=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_m=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bm=`float getShadowMask() {
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
}`,Mm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wm=`#ifdef USE_SKINNING
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
#endif`,Sm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Em=`#ifdef USE_SKINNING
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
#endif`,Tm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Am=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Im=`#ifdef USE_TRANSMISSION
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
#endif`,Pm=`#ifdef USE_TRANSMISSION
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
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Um=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Om=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nm=`uniform sampler2D t2D;
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
}`,zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`#include <common>
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
}`,Gm=`#if DEPTH_PACKING == 3200
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
}`,Wm=`#define DISTANCE
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
}`,$m=`#define DISTANCE
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qm=`uniform float scale;
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
}`,Zm=`uniform vec3 diffuse;
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
}`,Jm=`#include <common>
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
}`,Km=`uniform vec3 diffuse;
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
}`,jm=`#define LAMBERT
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
}`,Qm=`#define LAMBERT
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
}`,tg=`#define MATCAP
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
}`,eg=`#define MATCAP
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
}`,ng=`#define NORMAL
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
}`,ig=`#define NORMAL
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
}`,sg=`#define PHONG
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
}`,rg=`#define PHONG
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
}`,og=`#define STANDARD
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
}`,ag=`#define STANDARD
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
}`,cg=`#define TOON
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
}`,lg=`#define TOON
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
}`,hg=`uniform float size;
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
}`,ug=`uniform vec3 diffuse;
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
}`,dg=`#include <common>
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
}`,fg=`uniform vec3 color;
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
}`,pg=`uniform float rotation;
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
}`,mg=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:Np,alphahash_pars_fragment:zp,alphamap_fragment:Fp,alphamap_pars_fragment:Bp,alphatest_fragment:Hp,alphatest_pars_fragment:Vp,aomap_fragment:Gp,aomap_pars_fragment:Wp,batching_pars_vertex:$p,batching_vertex:Xp,begin_vertex:Yp,beginnormal_vertex:qp,bsdfs:Zp,iridescence_fragment:Jp,bumpmap_pars_fragment:Kp,clipping_planes_fragment:jp,clipping_planes_pars_fragment:Qp,clipping_planes_pars_vertex:t0,clipping_planes_vertex:e0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:s0,color_vertex:r0,common:o0,cube_uv_reflection_fragment:a0,defaultnormal_vertex:c0,displacementmap_pars_vertex:l0,displacementmap_vertex:h0,emissivemap_fragment:u0,emissivemap_pars_fragment:d0,colorspace_fragment:f0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:x0,envmap_pars_vertex:y0,envmap_physical_pars_fragment:C0,envmap_vertex:v0,fog_vertex:_0,fog_pars_vertex:b0,fog_fragment:M0,fog_pars_fragment:w0,gradientmap_pars_fragment:S0,lightmap_pars_fragment:E0,lights_lambert_fragment:T0,lights_lambert_pars_fragment:A0,lights_pars_begin:R0,lights_toon_fragment:I0,lights_toon_pars_fragment:P0,lights_phong_fragment:L0,lights_phong_pars_fragment:D0,lights_physical_fragment:k0,lights_physical_pars_fragment:U0,lights_fragment_begin:O0,lights_fragment_maps:N0,lights_fragment_end:z0,logdepthbuf_fragment:F0,logdepthbuf_pars_fragment:B0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:V0,map_fragment:G0,map_pars_fragment:W0,map_particle_fragment:$0,map_particle_pars_fragment:X0,metalnessmap_fragment:Y0,metalnessmap_pars_fragment:q0,morphinstance_vertex:Z0,morphcolor_vertex:J0,morphnormal_vertex:K0,morphtarget_pars_vertex:j0,morphtarget_vertex:Q0,normal_fragment_begin:tm,normal_fragment_maps:em,normal_pars_fragment:nm,normal_pars_vertex:im,normal_vertex:sm,normalmap_pars_fragment:rm,clearcoat_normal_fragment_begin:om,clearcoat_normal_fragment_maps:am,clearcoat_pars_fragment:cm,iridescence_pars_fragment:lm,opaque_fragment:hm,packing:um,premultiplied_alpha_fragment:dm,project_vertex:fm,dithering_fragment:pm,dithering_pars_fragment:mm,roughnessmap_fragment:gm,roughnessmap_pars_fragment:xm,shadowmap_pars_fragment:ym,shadowmap_pars_vertex:vm,shadowmap_vertex:_m,shadowmask_pars_fragment:bm,skinbase_vertex:Mm,skinning_pars_vertex:wm,skinning_vertex:Sm,skinnormal_vertex:Em,specularmap_fragment:Tm,specularmap_pars_fragment:Am,tonemapping_fragment:Rm,tonemapping_pars_fragment:Cm,transmission_fragment:Im,transmission_pars_fragment:Pm,uv_pars_fragment:Lm,uv_pars_vertex:Dm,uv_vertex:km,worldpos_vertex:Um,background_vert:Om,background_frag:Nm,backgroundCube_vert:zm,backgroundCube_frag:Fm,cube_vert:Bm,cube_frag:Hm,depth_vert:Vm,depth_frag:Gm,distanceRGBA_vert:Wm,distanceRGBA_frag:$m,equirect_vert:Xm,equirect_frag:Ym,linedashed_vert:qm,linedashed_frag:Zm,meshbasic_vert:Jm,meshbasic_frag:Km,meshlambert_vert:jm,meshlambert_frag:Qm,meshmatcap_vert:tg,meshmatcap_frag:eg,meshnormal_vert:ng,meshnormal_frag:ig,meshphong_vert:sg,meshphong_frag:rg,meshphysical_vert:og,meshphysical_frag:ag,meshtoon_vert:cg,meshtoon_frag:lg,points_vert:hg,points_frag:ug,shadow_vert:dg,shadow_frag:fg,sprite_vert:pg,sprite_frag:mg},dt={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},mn={basic:{uniforms:Ve([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Ve([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new St(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Ve([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Ve([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Ve([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new St(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Ve([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Ve([dt.points,dt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Ve([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Ve([dt.common,dt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Ve([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Ve([dt.sprite,dt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:Ve([dt.common,dt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:Ve([dt.lights,dt.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};mn.physical={uniforms:Ve([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};var Ir={r:0,b:0,g:0},Mi=new en,gg=new ie;function xg(s,t,e,n,i,r,o){let a=new St(0),c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M}function y(v){let M=!1,_=g(v);_===null?m(a,c):_&&_.isColor&&(m(_,1),M=!0);let k=s.xr.getEnvironmentBlendMode();k==="additive"?n.buffers.color.setClear(0,0,0,1,o):k==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function x(v,M){let _=g(M);_&&(_.isCubeTexture||_.mapping===So)?(u===void 0&&(u=new ot(new Xt(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:fs(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(k,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Mi.copy(M.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(gg.makeRotationFromEuler(Mi)),u.material.toneMapped=ae.getTransfer(_.colorSpace)!==fe,(h!==_||d!==_.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ot(new ke(2,2),new _n({name:"BackgroundMaterial",uniforms:fs(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ae.getTransfer(_.colorSpace)!==fe,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,M){v.getRGB(Ir,Qu(s)),n.buffers.color.setClear(Ir.r,Ir.g,Ir.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),c=M,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,m(a,c)},render:y,addToRenderList:x}}function yg(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(w,D,H,B,X){let tt=!1,Y=h(B,H,D);r!==Y&&(r=Y,l(r.object)),tt=f(w,B,H,X),tt&&g(w,B,H,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(tt||o)&&(o=!1,_(w,D,H,B),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return s.createVertexArray()}function l(w){return s.bindVertexArray(w)}function u(w){return s.deleteVertexArray(w)}function h(w,D,H){let B=H.wireframe===!0,X=n[w.id];X===void 0&&(X={},n[w.id]=X);let tt=X[D.id];tt===void 0&&(tt={},X[D.id]=tt);let Y=tt[B];return Y===void 0&&(Y=d(c()),tt[B]=Y),Y}function d(w){let D=[],H=[],B=[];for(let X=0;X<e;X++)D[X]=0,H[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:H,attributeDivisors:B,object:w,attributes:{},index:null}}function f(w,D,H,B){let X=r.attributes,tt=D.attributes,Y=0,nt=H.getAttributes();for(let W in nt)if(nt[W].location>=0){let Mt=X[W],It=tt[W];if(It===void 0&&(W==="instanceMatrix"&&w.instanceMatrix&&(It=w.instanceMatrix),W==="instanceColor"&&w.instanceColor&&(It=w.instanceColor)),Mt===void 0||Mt.attribute!==It||It&&Mt.data!==It.data)return!0;Y++}return r.attributesNum!==Y||r.index!==B}function g(w,D,H,B){let X={},tt=D.attributes,Y=0,nt=H.getAttributes();for(let W in nt)if(nt[W].location>=0){let Mt=tt[W];Mt===void 0&&(W==="instanceMatrix"&&w.instanceMatrix&&(Mt=w.instanceMatrix),W==="instanceColor"&&w.instanceColor&&(Mt=w.instanceColor));let It={};It.attribute=Mt,Mt&&Mt.data&&(It.data=Mt.data),X[W]=It,Y++}r.attributes=X,r.attributesNum=Y,r.index=B}function y(){let w=r.newAttributes;for(let D=0,H=w.length;D<H;D++)w[D]=0}function x(w){m(w,0)}function m(w,D){let H=r.newAttributes,B=r.enabledAttributes,X=r.attributeDivisors;H[w]=1,B[w]===0&&(s.enableVertexAttribArray(w),B[w]=1),X[w]!==D&&(s.vertexAttribDivisor(w,D),X[w]=D)}function v(){let w=r.newAttributes,D=r.enabledAttributes;for(let H=0,B=D.length;H<B;H++)D[H]!==w[H]&&(s.disableVertexAttribArray(H),D[H]=0)}function M(w,D,H,B,X,tt,Y){Y===!0?s.vertexAttribIPointer(w,D,H,X,tt):s.vertexAttribPointer(w,D,H,B,X,tt)}function _(w,D,H,B){y();let X=B.attributes,tt=H.getAttributes(),Y=D.defaultAttributeValues;for(let nt in tt){let W=tt[nt];if(W.location>=0){let ut=X[nt];if(ut===void 0&&(nt==="instanceMatrix"&&w.instanceMatrix&&(ut=w.instanceMatrix),nt==="instanceColor"&&w.instanceColor&&(ut=w.instanceColor)),ut!==void 0){let Mt=ut.normalized,It=ut.itemSize,Jt=t.get(ut);if(Jt===void 0)continue;let ce=Jt.buffer,J=Jt.type,st=Jt.bytesPerElement,Ct=J===s.INT||J===s.UNSIGNED_INT||ut.gpuType===Tl;if(ut.isInterleavedBufferAttribute){let pt=ut.data,Ft=pt.stride,Ht=ut.offset;if(pt.isInstancedInterleavedBuffer){for(let ee=0;ee<W.locationSize;ee++)m(W.location+ee,pt.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let ee=0;ee<W.locationSize;ee++)x(W.location+ee);s.bindBuffer(s.ARRAY_BUFFER,ce);for(let ee=0;ee<W.locationSize;ee++)M(W.location+ee,It/W.locationSize,J,Mt,Ft*st,(Ht+It/W.locationSize*ee)*st,Ct)}else{if(ut.isInstancedBufferAttribute){for(let pt=0;pt<W.locationSize;pt++)m(W.location+pt,ut.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let pt=0;pt<W.locationSize;pt++)x(W.location+pt);s.bindBuffer(s.ARRAY_BUFFER,ce);for(let pt=0;pt<W.locationSize;pt++)M(W.location+pt,It/W.locationSize,J,Mt,It*st,It/W.locationSize*pt*st,Ct)}}else if(Y!==void 0){let Mt=Y[nt];if(Mt!==void 0)switch(Mt.length){case 2:s.vertexAttrib2fv(W.location,Mt);break;case 3:s.vertexAttrib3fv(W.location,Mt);break;case 4:s.vertexAttrib4fv(W.location,Mt);break;default:s.vertexAttrib1fv(W.location,Mt)}}}}v()}function k(){I();for(let w in n){let D=n[w];for(let H in D){let B=D[H];for(let X in B)u(B[X].object),delete B[X];delete D[H]}delete n[w]}}function A(w){if(n[w.id]===void 0)return;let D=n[w.id];for(let H in D){let B=D[H];for(let X in B)u(B[X].object),delete B[X];delete D[H]}delete n[w.id]}function C(w){for(let D in n){let H=n[D];if(H[w.id]===void 0)continue;let B=H[w.id];for(let X in B)u(B[X].object),delete B[X];delete H[w.id]}}function I(){E(),o=!0,r!==i&&(r=i,l(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:k,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:y,enableAttribute:x,disableUnusedAttributes:v}}function vg(s,t,e){let n;function i(l){n=l}function r(l,u){s.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,h){h!==0&&(s.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];e.update(f,n,1)}function c(l,u,h,d){if(h===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let g=0;for(let y=0;y<h;y++)g+=u[y]*d[y];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function _g(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==un&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let I=C===ir&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Hn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==yn&&!I)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),x=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),k=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:k,maxSamples:A}}function bg(s){let t=this,e=null,n=0,i=!1,r=!1,o=new On,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,y=h.clipIntersection,x=h.clipShadows,m=s.get(h);if(!i||g===null||g.length===0||r&&!x)r?u(null):l();else{let v=r?0:n,M=v*4,_=m.clippingState||null;c.value=_,_=u(g,d,M,f);for(let k=0;k!==M;++k)_[k]=e[k];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,g){let y=h!==null?h.length:0,x=null;if(y!==0){if(x=c.value,g!==!0||x===null){let m=f+y*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(x===null||x.length<m)&&(x=new Float32Array(m));for(let M=0,_=f;M!==y;++M,_+=4)o.copy(h[M]).applyMatrix4(v,a),o.normal.toArray(x,_),x[_+3]=o.constant}c.value=x,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,x}}function Mg(s){let t=new WeakMap;function e(o,a){return a===ac?o.mapping=ls:a===cc&&(o.mapping=hs),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ac||a===cc)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Gc(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ro=class extends io{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},is=4,jh=[.125,.215,.35,.446,.526,.582],Ti=20,za=new ro,Qh=new St,Fa=null,Ba=0,Ha=0,Va=!1,Si=(1+Math.sqrt(5))/2,Ki=1/Si,tu=[new P(-Si,Ki,0),new P(Si,Ki,0),new P(-Ki,0,Si),new P(Ki,0,Si),new P(0,Si,-Ki),new P(0,Si,Ki),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],oo=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Fa=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=iu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fa,Ba,Ha),this._renderer.xr.enabled=Va,t.scissorTest=!1,Pr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ls||t.mapping===hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fa=this._renderer.getRenderTarget(),Ba=this._renderer.getActiveCubeFace(),Ha=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:ir,format:un,colorSpace:ys,depthBuffer:!1},i=eu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eu(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wg(r)),this._blurMaterial=Sg(r,t,e)}return i}_compileMaterial(t){let e=new ot(this._lodPlanes[0],t);this._renderer.compile(e,za)}_sceneToCubeUV(t,e,n,i){let a=new Se(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Qh),u.toneMapping=oi,u.autoClear=!1;let f=new re({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),g=new ot(new Xt,f),y=!1,x=t.background;x?x.isColor&&(f.color.copy(x),t.background=null,y=!0):(f.color.copy(Qh),y=!0);for(let m=0;m<6;m++){let v=m%3;v===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):v===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));let M=this._cubeSize;Pr(i,v*M,m>2?M:0,M,M),u.setRenderTarget(i),y&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=x}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===ls||t.mapping===hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=iu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nu());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new ot(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Pr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,za)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=tu[(i-r-1)%tu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new ot(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ti-1),y=r/g,x=isFinite(r)?1+Math.floor(u*y):Ti;x>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Ti}`);let m=[],v=0;for(let C=0;C<Ti;++C){let I=C/y,E=Math.exp(-I*I/2);m.push(E),C===0?v+=E:C<x&&(v+=2*E)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;d.envMap.value=t.texture,d.samples.value=x,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;let _=this._sizeLods[i],k=3*_*(i>M-is?i-M+is:0),A=4*(this._cubeSize-_);Pr(e,k,A,3*_,2*_),c.setRenderTarget(e),c.render(h,za)}};function wg(s){let t=[],e=[],n=[],i=s,r=s-is+1+jh.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let c=1/a;o>s-is?c=jh[o-s+is-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,y=3,x=2,m=1,v=new Float32Array(y*g*f),M=new Float32Array(x*g*f),_=new Float32Array(m*g*f);for(let A=0;A<f;A++){let C=A%3*2/3-1,I=A>2?0:-1,E=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];v.set(E,y*g*A),M.set(d,x*g*A);let w=[A,A,A,A,A,A];_.set(w,m*g*A)}let k=new _e;k.setAttribute("position",new Te(v,y)),k.setAttribute("uv",new Te(M,x)),k.setAttribute("faceIndex",new Te(_,m)),t.push(k),i>is&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function eu(s,t,e){let n=new Vn(s,t,e);return n.texture.mapping=So,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Pr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Sg(s,t,e){let n=new Float32Array(Ti),i=new P(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function nu(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dl(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function iu(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Dl(){return`

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
	`}function Eg(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ac||c===cc,u=c===ls||c===hs;if(l||u){let h=t.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new oo(s)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return l&&f&&f.height>0||u&&f&&i(f)?(e===null&&(e=new oo(s)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Tg(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Vs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ag(s,t,e,n){let i={},r=new WeakMap;function o(h){let d=h.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let y=d.morphAttributes[g];for(let x=0,m=y.length;x<m;x++)t.remove(y[x])}d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(h){let d=h.attributes;for(let g in d)t.update(d[g],s.ARRAY_BUFFER);let f=h.morphAttributes;for(let g in f){let y=f[g];for(let x=0,m=y.length;x<m;x++)t.update(y[x],s.ARRAY_BUFFER)}}function l(h){let d=[],f=h.index,g=h.attributes.position,y=0;if(f!==null){let v=f.array;y=f.version;for(let M=0,_=v.length;M<_;M+=3){let k=v[M+0],A=v[M+1],C=v[M+2];d.push(k,A,A,C,C,k)}}else if(g!==void 0){let v=g.array;y=g.version;for(let M=0,_=v.length/3-1;M<_;M+=3){let k=M+0,A=M+1,C=M+2;d.push(k,A,A,C,C,k)}}else return;let x=new(Ku(d)?no:eo)(d,1);x.version=y;let m=r.get(h);m&&t.remove(m),r.set(h,x)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Rg(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let x=0;for(let m=0;m<g;m++)x+=f[m];e.update(x,n,1)}function h(d,f,g,y){if(g===0)return;let x=t.get("WEBGL_multi_draw");if(x===null)for(let m=0;m<d.length;m++)l(d[m]/o,f[m],y[m]);else{x.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,y,0,g);let m=0;for(let v=0;v<g;v++)m+=f[v]*y[v];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Cg(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Ig(s,t,e){let n=new WeakMap,i=new me;function r(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let E=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,x=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],M=0;f===!0&&(M=1),g===!0&&(M=2),y===!0&&(M=3);let _=a.attributes.position.count*M,k=1;_>t.maxTextureSize&&(k=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let A=new Float32Array(_*k*4*h),C=new to(A,_,k,h);C.type=yn,C.needsUpdate=!0;let I=M*4;for(let w=0;w<h;w++){let D=x[w],H=m[w],B=v[w],X=_*k*4*w;for(let tt=0;tt<D.count;tt++){let Y=tt*I;f===!0&&(i.fromBufferAttribute(D,tt),A[X+Y+0]=i.x,A[X+Y+1]=i.y,A[X+Y+2]=i.z,A[X+Y+3]=0),g===!0&&(i.fromBufferAttribute(H,tt),A[X+Y+4]=i.x,A[X+Y+5]=i.y,A[X+Y+6]=i.z,A[X+Y+7]=0),y===!0&&(i.fromBufferAttribute(B,tt),A[X+Y+8]=i.x,A[X+Y+9]=i.y,A[X+Y+10]=i.z,A[X+Y+11]=B.itemSize===4?i.w:1)}}d={count:h,texture:C,size:new ht(_,k)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Pg(s,t,e,n){let i=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=t.get(c,u);if(i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return h}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var ao=class extends Xe{constructor(t,e,n,i,r,o,a,c,l,u=rs){if(u!==rs&&u!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===rs&&(n=Ci),n===void 0&&u===ds&&(n=us),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Le,this.minFilter=c!==void 0?c:Le,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ed=new Xe,su=new ao(1,1),nd=new to,id=new Hc,sd=new so,ru=[],ou=[],au=new Float32Array(16),cu=new Float32Array(9),lu=new Float32Array(4);function vs(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=ru[i];if(r===void 0&&(r=new Float32Array(i),ru[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ae(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Re(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function To(s,t){let e=ou[t];e===void 0&&(e=new Int32Array(t),ou[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Lg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Dg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2fv(this.addr,t),Re(e,t)}}function kg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;s.uniform3fv(this.addr,t),Re(e,t)}}function Ug(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4fv(this.addr,t),Re(e,t)}}function Og(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;lu.set(n),s.uniformMatrix2fv(this.addr,!1,lu),Re(e,n)}}function Ng(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;cu.set(n),s.uniformMatrix3fv(this.addr,!1,cu),Re(e,n)}}function zg(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;au.set(n),s.uniformMatrix4fv(this.addr,!1,au),Re(e,n)}}function Fg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Bg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2iv(this.addr,t),Re(e,t)}}function Hg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3iv(this.addr,t),Re(e,t)}}function Vg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4iv(this.addr,t),Re(e,t)}}function Gg(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Wg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;s.uniform2uiv(this.addr,t),Re(e,t)}}function $g(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;s.uniform3uiv(this.addr,t),Re(e,t)}}function Xg(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;s.uniform4uiv(this.addr,t),Re(e,t)}}function Yg(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(su.compareFunction=Zu,r=su):r=ed,e.setTexture2D(t||r,i)}function qg(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||id,i)}function Zg(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||sd,i)}function Jg(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||nd,i)}function Kg(s){switch(s){case 5126:return Lg;case 35664:return Dg;case 35665:return kg;case 35666:return Ug;case 35674:return Og;case 35675:return Ng;case 35676:return zg;case 5124:case 35670:return Fg;case 35667:case 35671:return Bg;case 35668:case 35672:return Hg;case 35669:case 35673:return Vg;case 5125:return Gg;case 36294:return Wg;case 36295:return $g;case 36296:return Xg;case 35678:case 36198:case 36298:case 36306:case 35682:return Yg;case 35679:case 36299:case 36307:return qg;case 35680:case 36300:case 36308:case 36293:return Zg;case 36289:case 36303:case 36311:case 36292:return Jg}}function jg(s,t){s.uniform1fv(this.addr,t)}function Qg(s,t){let e=vs(t,this.size,2);s.uniform2fv(this.addr,e)}function tx(s,t){let e=vs(t,this.size,3);s.uniform3fv(this.addr,e)}function ex(s,t){let e=vs(t,this.size,4);s.uniform4fv(this.addr,e)}function nx(s,t){let e=vs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function ix(s,t){let e=vs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function sx(s,t){let e=vs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function rx(s,t){s.uniform1iv(this.addr,t)}function ox(s,t){s.uniform2iv(this.addr,t)}function ax(s,t){s.uniform3iv(this.addr,t)}function cx(s,t){s.uniform4iv(this.addr,t)}function lx(s,t){s.uniform1uiv(this.addr,t)}function hx(s,t){s.uniform2uiv(this.addr,t)}function ux(s,t){s.uniform3uiv(this.addr,t)}function dx(s,t){s.uniform4uiv(this.addr,t)}function fx(s,t,e){let n=this.cache,i=t.length,r=To(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||ed,r[o])}function px(s,t,e){let n=this.cache,i=t.length,r=To(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||id,r[o])}function mx(s,t,e){let n=this.cache,i=t.length,r=To(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||sd,r[o])}function gx(s,t,e){let n=this.cache,i=t.length,r=To(e,i);Ae(n,r)||(s.uniform1iv(this.addr,r),Re(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||nd,r[o])}function xx(s){switch(s){case 5126:return jg;case 35664:return Qg;case 35665:return tx;case 35666:return ex;case 35674:return nx;case 35675:return ix;case 35676:return sx;case 5124:case 35670:return rx;case 35667:case 35671:return ox;case 35668:case 35672:return ax;case 35669:case 35673:return cx;case 5125:return lx;case 36294:return hx;case 36295:return ux;case 36296:return dx;case 35678:case 36198:case 36298:case 36306:case 35682:return fx;case 35679:case 36299:case 36307:return px;case 35680:case 36300:case 36308:case 36293:return mx;case 36289:case 36303:case 36311:case 36292:return gx}}var Wc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Kg(e.type)}},$c=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xx(e.type)}},Xc=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},Ga=/(\w+)(\])?(\[|\.)?/g;function hu(s,t){s.seq.push(t),s.map[t.id]=t}function yx(s,t,e){let n=s.name,i=n.length;for(Ga.lastIndex=0;;){let r=Ga.exec(n),o=Ga.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){hu(e,l===void 0?new Wc(a,s,t):new $c(a,s,t));break}else{let h=e.map[a];h===void 0&&(h=new Xc(a),hu(e,h)),e=h}}}var as=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);yx(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function uu(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var vx=37297,_x=0;function bx(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var du=new Zt;function Mx(s){ae._getMatrix(du,ae.workingColorSpace,s);let t=`mat3( ${du.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(s)){case Eo:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function fu(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+bx(s.getShaderSource(t),o)}else return i}function wx(s,t){let e=Mx(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Sx(s,t){let e;switch(t){case Zf:e="Linear";break;case Jf:e="Reinhard";break;case Kf:e="Cineon";break;case jf:e="ACESFilmic";break;case tp:e="AgX";break;case ep:e="Neutral";break;case Qf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Lr=new P;function Ex(){ae.getLuminanceCoefficients(Lr);let s=Lr.x.toFixed(4),t=Lr.y.toFixed(4),e=Lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function Ax(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rx(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Gs(s){return s!==""}function pu(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function mu(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yc(s){return s.replace(Cx,Px)}var Ix=new Map;function Px(s,t){let e=jt[t];if(e===void 0){let n=Ix.get(t);if(n!==void 0)e=jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Yc(e)}var Lx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gu(s){return s.replace(Lx,Dx)}function Dx(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function xu(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function kx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Nu?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Rf?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function Ux(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ls:case hs:t="ENVMAP_TYPE_CUBE";break;case So:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ox(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case hs:t="ENVMAP_MODE_REFRACTION";break}return t}function Nx(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case El:t="ENVMAP_BLENDING_MULTIPLY";break;case Yf:t="ENVMAP_BLENDING_MIX";break;case qf:t="ENVMAP_BLENDING_ADD";break}return t}function zx(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Fx(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=kx(e),l=Ux(e),u=Ox(e),h=Nx(e),d=zx(e),f=Tx(e),g=Ax(r),y=i.createProgram(),x,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gs).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gs).join(`
`),m.length>0&&(m+=`
`)):(x=[xu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),m=[xu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==oi?"#define TONE_MAPPING":"",e.toneMapping!==oi?jt.tonemapping_pars_fragment:"",e.toneMapping!==oi?Sx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,wx("linearToOutputTexel",e.outputColorSpace),Ex(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gs).join(`
`)),o=Yc(o),o=pu(o,e),o=mu(o,e),a=Yc(a),a=pu(a,e),a=mu(a,e),o=gu(o),a=gu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===Ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let M=v+x+o,_=v+m+a,k=uu(i,i.VERTEX_SHADER,M),A=uu(i,i.FRAGMENT_SHADER,_);i.attachShader(y,k),i.attachShader(y,A),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function C(D){if(s.debug.checkShaderErrors){let H=i.getProgramInfoLog(y).trim(),B=i.getShaderInfoLog(k).trim(),X=i.getShaderInfoLog(A).trim(),tt=!0,Y=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(tt=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,k,A);else{let nt=fu(i,k,"vertex"),W=fu(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+H+`
`+nt+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||X==="")&&(Y=!1);Y&&(D.diagnostics={runnable:tt,programLog:H,vertexShader:{log:B,prefix:x},fragmentShader:{log:X,prefix:m}})}i.deleteShader(k),i.deleteShader(A),I=new as(i,y),E=Rx(i,y)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(y,vx)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=_x++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=k,this.fragmentShader=A,this}var Bx=0,qc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Zc(t),e.set(t,n)),n}},Zc=class{constructor(t){this.id=Bx++,this.code=t,this.usedTimes=0}};function Hx(s,t,e,n,i,r,o){let a=new Zs,c=new qc,l=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(E){return l.add(E),E===0?"uv":`uv${E}`}function x(E,w,D,H,B){let X=H.fog,tt=B.geometry,Y=E.isMeshStandardMaterial?H.environment:null,nt=(E.isMeshStandardMaterial?e:t).get(E.envMap||Y),W=nt&&nt.mapping===So?nt.image.height:null,ut=g[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let Mt=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,It=Mt!==void 0?Mt.length:0,Jt=0;tt.morphAttributes.position!==void 0&&(Jt=1),tt.morphAttributes.normal!==void 0&&(Jt=2),tt.morphAttributes.color!==void 0&&(Jt=3);let ce,J,st,Ct;if(ut){let de=mn[ut];ce=de.vertexShader,J=de.fragmentShader}else ce=E.vertexShader,J=E.fragmentShader,c.update(E),st=c.getVertexShaderID(E),Ct=c.getFragmentShaderID(E);let pt=s.getRenderTarget(),Ft=s.state.buffers.depth.getReversed(),Ht=B.isInstancedMesh===!0,ee=B.isBatchedMesh===!0,S=!!E.map,Z=!!E.matcap,at=!!nt,L=!!E.aoMap,kt=!!E.lightMap,Rt=!!E.bumpMap,ft=!!E.normalMap,_t=!!E.displacementMap,Vt=!!E.emissiveMap,wt=!!E.metalnessMap,R=!!E.roughnessMap,b=E.anisotropy>0,F=E.clearcoat>0,q=E.dispersion>0,Q=E.iridescence>0,K=E.sheen>0,Ut=E.transmission>0,gt=b&&!!E.anisotropyMap,Et=F&&!!E.clearcoatMap,oe=F&&!!E.clearcoatNormalMap,it=F&&!!E.clearcoatRoughnessMap,Tt=Q&&!!E.iridescenceMap,Bt=Q&&!!E.iridescenceThicknessMap,Wt=K&&!!E.sheenColorMap,At=K&&!!E.sheenRoughnessMap,se=!!E.specularMap,Kt=!!E.specularColorMap,ge=!!E.specularIntensityMap,U=Ut&&!!E.transmissionMap,mt=Ut&&!!E.thicknessMap,$=!!E.gradientMap,j=!!E.alphaMap,bt=E.alphaTest>0,yt=!!E.alphaHash,Yt=!!E.extensions,we=oi;E.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(we=s.toneMapping);let Oe={shaderID:ut,shaderType:E.type,shaderName:E.name,vertexShader:ce,fragmentShader:J,defines:E.defines,customVertexShaderID:st,customFragmentShaderID:Ct,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:ee,batchingColor:ee&&B._colorsTexture!==null,instancing:Ht,instancingColor:Ht&&B.instanceColor!==null,instancingMorph:Ht&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:pt===null?s.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:ys,alphaToCoverage:!!E.alphaToCoverage,map:S,matcap:Z,envMap:at,envMapMode:at&&nt.mapping,envMapCubeUVHeight:W,aoMap:L,lightMap:kt,bumpMap:Rt,normalMap:ft,displacementMap:d&&_t,emissiveMap:Vt,normalMapObjectSpace:ft&&E.normalMapType===rp,normalMapTangentSpace:ft&&E.normalMapType===qu,metalnessMap:wt,roughnessMap:R,anisotropy:b,anisotropyMap:gt,clearcoat:F,clearcoatMap:Et,clearcoatNormalMap:oe,clearcoatRoughnessMap:it,dispersion:q,iridescence:Q,iridescenceMap:Tt,iridescenceThicknessMap:Bt,sheen:K,sheenColorMap:Wt,sheenRoughnessMap:At,specularMap:se,specularColorMap:Kt,specularIntensityMap:ge,transmission:Ut,transmissionMap:U,thicknessMap:mt,gradientMap:$,opaque:E.transparent===!1&&E.blending===ss&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:bt,alphaHash:yt,combine:E.combine,mapUv:S&&y(E.map.channel),aoMapUv:L&&y(E.aoMap.channel),lightMapUv:kt&&y(E.lightMap.channel),bumpMapUv:Rt&&y(E.bumpMap.channel),normalMapUv:ft&&y(E.normalMap.channel),displacementMapUv:_t&&y(E.displacementMap.channel),emissiveMapUv:Vt&&y(E.emissiveMap.channel),metalnessMapUv:wt&&y(E.metalnessMap.channel),roughnessMapUv:R&&y(E.roughnessMap.channel),anisotropyMapUv:gt&&y(E.anisotropyMap.channel),clearcoatMapUv:Et&&y(E.clearcoatMap.channel),clearcoatNormalMapUv:oe&&y(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&y(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&y(E.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&y(E.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&y(E.sheenColorMap.channel),sheenRoughnessMapUv:At&&y(E.sheenRoughnessMap.channel),specularMapUv:se&&y(E.specularMap.channel),specularColorMapUv:Kt&&y(E.specularColorMap.channel),specularIntensityMapUv:ge&&y(E.specularIntensityMap.channel),transmissionMapUv:U&&y(E.transmissionMap.channel),thicknessMapUv:mt&&y(E.thicknessMap.channel),alphaMapUv:j&&y(E.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(ft||b),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!tt.attributes.uv&&(S||j),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ft,skinning:B.isSkinnedMesh===!0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:It,morphTextureStride:Jt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:we,decodeVideoTexture:S&&E.map.isVideoTexture===!0&&ae.getTransfer(E.map.colorSpace)===fe,decodeVideoTextureEmissive:Vt&&E.emissiveMap.isVideoTexture===!0&&ae.getTransfer(E.emissiveMap.colorSpace)===fe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Me,flipSided:E.side===$e,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Yt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&E.extensions.multiDraw===!0||ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Oe.vertexUv1s=l.has(1),Oe.vertexUv2s=l.has(2),Oe.vertexUv3s=l.has(3),l.clear(),Oe}function m(E){let w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(let D in E.defines)w.push(D),w.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(v(w,E),M(w,E),w.push(s.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function v(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function M(E,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){let w=g[E.type],D;if(w){let H=mn[w];D=Pp.clone(H.uniforms)}else D=E.uniforms;return D}function k(E,w){let D;for(let H=0,B=u.length;H<B;H++){let X=u[H];if(X.cacheKey===w){D=X,++D.usedTimes;break}}return D===void 0&&(D=new Fx(s,w,E,r),u.push(D)),D}function A(E){if(--E.usedTimes===0){let w=u.indexOf(E);u[w]=u[u.length-1],u.pop(),E.destroy()}}function C(E){c.remove(E)}function I(){c.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:_,acquireProgram:k,releaseProgram:A,releaseShaderCache:C,programs:u,dispose:I}}function Vx(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Gx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function yu(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function vu(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(h,d,f,g,y,x){let m=s[t];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:y,group:x},s[t]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=y,m.group=x),t++,m}function a(h,d,f,g,y,x){let m=o(h,d,f,g,y,x);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(h,d,f,g,y,x){let m=o(h,d,f,g,y,x);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(h,d){e.length>1&&e.sort(h||Gx),n.length>1&&n.sort(d||yu),i.length>1&&i.sort(d||yu)}function u(){for(let h=t,d=s.length;h<d;h++){let f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function Wx(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new vu,s.set(n,[o])):i>=r.length?(o=new vu,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function $x(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new St};break;case"SpotLight":e={position:new P,direction:new P,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function Xx(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Yx=0;function qx(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Zx(s){let t=new $x,e=Xx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let i=new P,r=new ie,o=new ie;function a(l){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,y=0,x=0,m=0,v=0,M=0,_=0,k=0,A=0,C=0;l.sort(qx);for(let E=0,w=l.length;E<w;E++){let D=l[E],H=D.color,B=D.intensity,X=D.distance,tt=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=H.r*B,h+=H.g*B,d+=H.b*B;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],B);C++}else if(D.isDirectionalLight){let Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let nt=D.shadow,W=e.get(D);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=tt,n.directionalShadowMatrix[f]=D.shadow.matrix,v++}n.directional[f]=Y,f++}else if(D.isSpotLight){let Y=t.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(H).multiplyScalar(B),Y.distance=X,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[y]=Y;let nt=D.shadow;if(D.map&&(n.spotLightMap[k]=D.map,k++,nt.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[y]=nt.matrix,D.castShadow){let W=e.get(D);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,n.spotShadow[y]=W,n.spotShadowMap[y]=tt,_++}y++}else if(D.isRectAreaLight){let Y=t.get(D);Y.color.copy(H).multiplyScalar(B),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[x]=Y,x++}else if(D.isPointLight){let Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){let nt=D.shadow,W=e.get(D);W.shadowIntensity=nt.intensity,W.shadowBias=nt.bias,W.shadowNormalBias=nt.normalBias,W.shadowRadius=nt.radius,W.shadowMapSize=nt.mapSize,W.shadowCameraNear=nt.camera.near,W.shadowCameraFar=nt.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=tt,n.pointShadowMatrix[g]=D.shadow.matrix,M++}n.point[g]=Y,g++}else if(D.isHemisphereLight){let Y=t.get(D);Y.skyColor.copy(D.color).multiplyScalar(B),Y.groundColor.copy(D.groundColor).multiplyScalar(B),n.hemi[m]=Y,m++}}x>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==y||I.rectAreaLength!==x||I.hemiLength!==m||I.numDirectionalShadows!==v||I.numPointShadows!==M||I.numSpotShadows!==_||I.numSpotMaps!==k||I.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=y,n.rectArea.length=x,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+k-A,n.spotLightMap.length=k,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,I.directionalLength=f,I.pointLength=g,I.spotLength=y,I.rectAreaLength=x,I.hemiLength=m,I.numDirectionalShadows=v,I.numPointShadows=M,I.numSpotShadows=_,I.numSpotMaps=k,I.numLightProbes=C,n.version=Yx++)}function c(l,u){let h=0,d=0,f=0,g=0,y=0,x=u.matrixWorldInverse;for(let m=0,v=l.length;m<v;m++){let M=l[m];if(M.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(x),h++}else if(M.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(x),_.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(x),f++}else if(M.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(x),o.identity(),r.copy(M.matrixWorld),r.premultiply(x),o.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(x),d++}else if(M.isHemisphereLight){let _=n.hemi[y];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(x),y++}}}return{setup:a,setupView:c,state:n}}function _u(s){let t=new Zx(s),e=[],n=[];function i(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Jx(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new _u(s),t.set(i,[a])):r>=o.length?(a=new _u(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Jc=class extends Wn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ip,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Kc=class extends Wn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jx=`uniform sampler2D shadow_pass;
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
}`;function Qx(s,t,e){let n=new Js,i=new ht,r=new ht,o=new me,a=new Jc({depthPacking:sp}),c=new Kc,l={},u=e.maxTextureSize,h={[vn]:$e,[$e]:vn,[Me]:Me},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:Kx,fragmentShader:jx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new _e;g.setAttribute("position",new Te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ot(g,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nu;let m=this.type;this.render=function(A,C,I){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||A.length===0)return;let E=s.getRenderTarget(),w=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),H=s.state;H.setBlending(ri),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let B=m!==Un&&this.type===Un,X=m===Un&&this.type!==Un;for(let tt=0,Y=A.length;tt<Y;tt++){let nt=A[tt],W=nt.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ut=W.getFrameExtents();if(i.multiply(ut),r.copy(W.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ut.x),i.x=r.x*ut.x,W.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ut.y),i.y=r.y*ut.y,W.mapSize.y=r.y)),W.map===null||B===!0||X===!0){let It=this.type!==Un?{minFilter:Le,magFilter:Le}:{};W.map!==null&&W.map.dispose(),W.map=new Vn(i.x,i.y,It),W.map.texture.name=nt.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();let Mt=W.getViewportCount();for(let It=0;It<Mt;It++){let Jt=W.getViewport(It);o.set(r.x*Jt.x,r.y*Jt.y,r.x*Jt.z,r.y*Jt.w),H.viewport(o),W.updateMatrices(nt,It),n=W.getFrustum(),_(C,I,W.camera,nt,this.type)}W.isPointLightShadow!==!0&&this.type===Un&&v(W,I),W.needsUpdate=!1}m=this.type,x.needsUpdate=!1,s.setRenderTarget(E,w,D)};function v(A,C){let I=t.update(y);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Vn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,I,d,y,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,I,f,y,null)}function M(A,C,I,E){let w=null,D=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)w=D;else if(w=I.isPointLight===!0?c:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let H=w.uuid,B=C.uuid,X=l[H];X===void 0&&(X={},l[H]=X);let tt=X[B];tt===void 0&&(tt=w.clone(),X[B]=tt,C.addEventListener("dispose",k)),w=tt}if(w.visible=C.visible,w.wireframe=C.wireframe,E===Un?w.side=C.shadowSide!==null?C.shadowSide:C.side:w.side=C.shadowSide!==null?C.shadowSide:h[C.side],w.alphaMap=C.alphaMap,w.alphaTest=C.alphaTest,w.map=C.map,w.clipShadows=C.clipShadows,w.clippingPlanes=C.clippingPlanes,w.clipIntersection=C.clipIntersection,w.displacementMap=C.displacementMap,w.displacementScale=C.displacementScale,w.displacementBias=C.displacementBias,w.wireframeLinewidth=C.wireframeLinewidth,w.linewidth=C.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let H=s.properties.get(w);H.light=I}return w}function _(A,C,I,E,w){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===Un)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);let B=t.update(A),X=A.material;if(Array.isArray(X)){let tt=B.groups;for(let Y=0,nt=tt.length;Y<nt;Y++){let W=tt[Y],ut=X[W.materialIndex];if(ut&&ut.visible){let Mt=M(A,ut,E,w);A.onBeforeShadow(s,A,C,I,B,Mt,W),s.renderBufferDirect(I,null,B,Mt,A,W),A.onAfterShadow(s,A,C,I,B,Mt,W)}}}else if(X.visible){let tt=M(A,X,E,w);A.onBeforeShadow(s,A,C,I,B,tt,null),s.renderBufferDirect(I,null,B,tt,A,null),A.onAfterShadow(s,A,C,I,B,tt,null)}}let H=A.children;for(let B=0,X=H.length;B<X;B++)_(H[B],C,I,E,w)}function k(A){A.target.removeEventListener("dispose",k);for(let I in l){let E=l[I],w=A.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}var ty={[tc]:ec,[nc]:rc,[ic]:oc,[cs]:sc,[ec]:tc,[rc]:nc,[oc]:ic,[sc]:cs};function ey(s,t){function e(){let U=!1,mt=new me,$=null,j=new me(0,0,0,0);return{setMask:function(bt){$!==bt&&!U&&(s.colorMask(bt,bt,bt,bt),$=bt)},setLocked:function(bt){U=bt},setClear:function(bt,yt,Yt,we,Oe){Oe===!0&&(bt*=we,yt*=we,Yt*=we),mt.set(bt,yt,Yt,we),j.equals(mt)===!1&&(s.clearColor(bt,yt,Yt,we),j.copy(mt))},reset:function(){U=!1,$=null,j.set(-1,0,0,0)}}}function n(){let U=!1,mt=!1,$=null,j=null,bt=null;return{setReversed:function(yt){if(mt!==yt){let Yt=t.get("EXT_clip_control");mt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT);let we=bt;bt=null,this.setClear(we)}mt=yt},getReversed:function(){return mt},setTest:function(yt){yt?pt(s.DEPTH_TEST):Ft(s.DEPTH_TEST)},setMask:function(yt){$!==yt&&!U&&(s.depthMask(yt),$=yt)},setFunc:function(yt){if(mt&&(yt=ty[yt]),j!==yt){switch(yt){case tc:s.depthFunc(s.NEVER);break;case ec:s.depthFunc(s.ALWAYS);break;case nc:s.depthFunc(s.LESS);break;case cs:s.depthFunc(s.LEQUAL);break;case ic:s.depthFunc(s.EQUAL);break;case sc:s.depthFunc(s.GEQUAL);break;case rc:s.depthFunc(s.GREATER);break;case oc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=yt}},setLocked:function(yt){U=yt},setClear:function(yt){bt!==yt&&(mt&&(yt=1-yt),s.clearDepth(yt),bt=yt)},reset:function(){U=!1,$=null,j=null,bt=null,mt=!1}}}function i(){let U=!1,mt=null,$=null,j=null,bt=null,yt=null,Yt=null,we=null,Oe=null;return{setTest:function(de){U||(de?pt(s.STENCIL_TEST):Ft(s.STENCIL_TEST))},setMask:function(de){mt!==de&&!U&&(s.stencilMask(de),mt=de)},setFunc:function(de,on,Rn){($!==de||j!==on||bt!==Rn)&&(s.stencilFunc(de,on,Rn),$=de,j=on,bt=Rn)},setOp:function(de,on,Rn){(yt!==de||Yt!==on||we!==Rn)&&(s.stencilOp(de,on,Rn),yt=de,Yt=on,we=Rn)},setLocked:function(de){U=de},setClear:function(de){Oe!==de&&(s.clearStencil(de),Oe=de)},reset:function(){U=!1,mt=null,$=null,j=null,bt=null,yt=null,Yt=null,we=null,Oe=null}}}let r=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap,u={},h={},d=new WeakMap,f=[],g=null,y=!1,x=null,m=null,v=null,M=null,_=null,k=null,A=null,C=new St(0,0,0),I=0,E=!1,w=null,D=null,H=null,B=null,X=null,tt=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,nt=0,W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=nt>=1):W.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=nt>=2);let ut=null,Mt={},It=s.getParameter(s.SCISSOR_BOX),Jt=s.getParameter(s.VIEWPORT),ce=new me().fromArray(It),J=new me().fromArray(Jt);function st(U,mt,$,j){let bt=new Uint8Array(4),yt=s.createTexture();s.bindTexture(U,yt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Yt=0;Yt<$;Yt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(mt,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,bt):s.texImage2D(mt+Yt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,bt);return yt}let Ct={};Ct[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),Ct[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ct[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ct[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pt(s.DEPTH_TEST),o.setFunc(cs),Rt(!1),ft(wh),pt(s.CULL_FACE),L(ri);function pt(U){u[U]!==!0&&(s.enable(U),u[U]=!0)}function Ft(U){u[U]!==!1&&(s.disable(U),u[U]=!1)}function Ht(U,mt){return h[U]!==mt?(s.bindFramebuffer(U,mt),h[U]=mt,U===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=mt),U===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=mt),!0):!1}function ee(U,mt){let $=f,j=!1;if(U){$=d.get(mt),$===void 0&&($=[],d.set(mt,$));let bt=U.textures;if($.length!==bt.length||$[0]!==s.COLOR_ATTACHMENT0){for(let yt=0,Yt=bt.length;yt<Yt;yt++)$[yt]=s.COLOR_ATTACHMENT0+yt;$.length=bt.length,j=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,j=!0);j&&s.drawBuffers($)}function S(U){return g!==U?(s.useProgram(U),g=U,!0):!1}let Z={[Ei]:s.FUNC_ADD,[If]:s.FUNC_SUBTRACT,[Pf]:s.FUNC_REVERSE_SUBTRACT};Z[Lf]=s.MIN,Z[Df]=s.MAX;let at={[kf]:s.ZERO,[Uf]:s.ONE,[Of]:s.SRC_COLOR,[ja]:s.SRC_ALPHA,[Vf]:s.SRC_ALPHA_SATURATE,[Bf]:s.DST_COLOR,[zf]:s.DST_ALPHA,[Nf]:s.ONE_MINUS_SRC_COLOR,[Qa]:s.ONE_MINUS_SRC_ALPHA,[Hf]:s.ONE_MINUS_DST_COLOR,[Ff]:s.ONE_MINUS_DST_ALPHA,[Gf]:s.CONSTANT_COLOR,[Wf]:s.ONE_MINUS_CONSTANT_COLOR,[$f]:s.CONSTANT_ALPHA,[Xf]:s.ONE_MINUS_CONSTANT_ALPHA};function L(U,mt,$,j,bt,yt,Yt,we,Oe,de){if(U===ri){y===!0&&(Ft(s.BLEND),y=!1);return}if(y===!1&&(pt(s.BLEND),y=!0),U!==Cf){if(U!==x||de!==E){if((m!==Ei||_!==Ei)&&(s.blendEquation(s.FUNC_ADD),m=Ei,_=Ei),de)switch(U){case ss:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Sh:s.blendFunc(s.ONE,s.ONE);break;case Eh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Th:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ss:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Sh:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Eh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Th:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,M=null,k=null,A=null,C.set(0,0,0),I=0,x=U,E=de}return}bt=bt||mt,yt=yt||$,Yt=Yt||j,(mt!==m||bt!==_)&&(s.blendEquationSeparate(Z[mt],Z[bt]),m=mt,_=bt),($!==v||j!==M||yt!==k||Yt!==A)&&(s.blendFuncSeparate(at[$],at[j],at[yt],at[Yt]),v=$,M=j,k=yt,A=Yt),(we.equals(C)===!1||Oe!==I)&&(s.blendColor(we.r,we.g,we.b,Oe),C.copy(we),I=Oe),x=U,E=!1}function kt(U,mt){U.side===Me?Ft(s.CULL_FACE):pt(s.CULL_FACE);let $=U.side===$e;mt&&($=!$),Rt($),U.blending===ss&&U.transparent===!1?L(ri):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let j=U.stencilWrite;a.setTest(j),j&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Vt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?pt(s.SAMPLE_ALPHA_TO_COVERAGE):Ft(s.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(U){w!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),w=U)}function ft(U){U!==Tf?(pt(s.CULL_FACE),U!==D&&(U===wh?s.cullFace(s.BACK):U===Af?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ft(s.CULL_FACE),D=U}function _t(U){U!==H&&(Y&&s.lineWidth(U),H=U)}function Vt(U,mt,$){U?(pt(s.POLYGON_OFFSET_FILL),(B!==mt||X!==$)&&(s.polygonOffset(mt,$),B=mt,X=$)):Ft(s.POLYGON_OFFSET_FILL)}function wt(U){U?pt(s.SCISSOR_TEST):Ft(s.SCISSOR_TEST)}function R(U){U===void 0&&(U=s.TEXTURE0+tt-1),ut!==U&&(s.activeTexture(U),ut=U)}function b(U,mt,$){$===void 0&&(ut===null?$=s.TEXTURE0+tt-1:$=ut);let j=Mt[$];j===void 0&&(j={type:void 0,texture:void 0},Mt[$]=j),(j.type!==U||j.texture!==mt)&&(ut!==$&&(s.activeTexture($),ut=$),s.bindTexture(U,mt||Ct[U]),j.type=U,j.texture=mt)}function F(){let U=Mt[ut];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function gt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Bt(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Wt(U){ce.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),ce.copy(U))}function At(U){J.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),J.copy(U))}function se(U,mt){let $=l.get(mt);$===void 0&&($=new WeakMap,l.set(mt,$));let j=$.get(U);j===void 0&&(j=s.getUniformBlockIndex(mt,U.name),$.set(U,j))}function Kt(U,mt){let j=l.get(mt).get(U);c.get(mt)!==j&&(s.uniformBlockBinding(mt,j,U.__bindingPointIndex),c.set(mt,j))}function ge(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ut=null,Mt={},h={},d=new WeakMap,f=[],g=null,y=!1,x=null,m=null,v=null,M=null,_=null,k=null,A=null,C=new St(0,0,0),I=0,E=!1,w=null,D=null,H=null,B=null,X=null,ce.set(0,0,s.canvas.width,s.canvas.height),J.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pt,disable:Ft,bindFramebuffer:Ht,drawBuffers:ee,useProgram:S,setBlending:L,setMaterial:kt,setFlipSided:Rt,setCullFace:ft,setLineWidth:_t,setPolygonOffset:Vt,setScissorTest:wt,activeTexture:R,bindTexture:b,unbindTexture:F,compressedTexImage2D:q,compressedTexImage3D:Q,texImage2D:Tt,texImage3D:Bt,updateUBOMapping:se,uniformBlockBinding:Kt,texStorage2D:oe,texStorage3D:it,texSubImage2D:K,texSubImage3D:Ut,compressedTexSubImage2D:gt,compressedTexSubImage3D:Et,scissor:Wt,viewport:At,reset:ge}}function bu(s,t,e,n){let i=ny(n);switch(e){case Vu:return s*t;case Wu:return s*t;case $u:return s*t*2;case Cl:return s*t/i.components*i.byteLength;case Il:return s*t/i.components*i.byteLength;case Xu:return s*t*2/i.components*i.byteLength;case Pl:return s*t*2/i.components*i.byteLength;case Gu:return s*t*3/i.components*i.byteLength;case un:return s*t*4/i.components*i.byteLength;case Ll:return s*t*4/i.components*i.byteLength;case Wr:case $r:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Xr:case Yr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case uc:case fc:return Math.max(s,16)*Math.max(t,8)/4;case hc:case dc:return Math.max(s,8)*Math.max(t,8)/2;case pc:case mc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case gc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case yc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case vc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case _c:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case bc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Mc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case wc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Sc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ec:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ac:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Rc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Cc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Ic:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case qr:case Pc:case Lc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Yu:case Dc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case kc:case Uc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ny(s){switch(s){case Hn:case Fu:return{byteLength:1,components:1};case Ys:case Bu:case ir:return{byteLength:2,components:1};case Al:case Rl:return{byteLength:2,components:4};case Ci:case Tl:case yn:return{byteLength:4,components:1};case Hu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function iy(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return f?new OffscreenCanvas(R,b):jr("canvas")}function y(R,b,F){let q=1,Q=wt(R);if((Q.width>F||Q.height>F)&&(q=F/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let K=Math.floor(q*Q.width),Ut=Math.floor(q*Q.height);h===void 0&&(h=g(K,Ut));let gt=b?g(K,Ut):h;return gt.width=K,gt.height=Ut,gt.getContext("2d").drawImage(R,0,0,K,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+K+"x"+Ut+")."),gt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function x(R){return R.generateMipmaps}function m(R){s.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(R,b,F,q,Q=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=b;if(b===s.RED&&(F===s.FLOAT&&(K=s.R32F),F===s.HALF_FLOAT&&(K=s.R16F),F===s.UNSIGNED_BYTE&&(K=s.R8)),b===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.R8UI),F===s.UNSIGNED_SHORT&&(K=s.R16UI),F===s.UNSIGNED_INT&&(K=s.R32UI),F===s.BYTE&&(K=s.R8I),F===s.SHORT&&(K=s.R16I),F===s.INT&&(K=s.R32I)),b===s.RG&&(F===s.FLOAT&&(K=s.RG32F),F===s.HALF_FLOAT&&(K=s.RG16F),F===s.UNSIGNED_BYTE&&(K=s.RG8)),b===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RG8UI),F===s.UNSIGNED_SHORT&&(K=s.RG16UI),F===s.UNSIGNED_INT&&(K=s.RG32UI),F===s.BYTE&&(K=s.RG8I),F===s.SHORT&&(K=s.RG16I),F===s.INT&&(K=s.RG32I)),b===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RGB8UI),F===s.UNSIGNED_SHORT&&(K=s.RGB16UI),F===s.UNSIGNED_INT&&(K=s.RGB32UI),F===s.BYTE&&(K=s.RGB8I),F===s.SHORT&&(K=s.RGB16I),F===s.INT&&(K=s.RGB32I)),b===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),F===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),F===s.UNSIGNED_INT&&(K=s.RGBA32UI),F===s.BYTE&&(K=s.RGBA8I),F===s.SHORT&&(K=s.RGBA16I),F===s.INT&&(K=s.RGBA32I)),b===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),b===s.RGBA){let Ut=Q?Eo:ae.getTransfer(q);F===s.FLOAT&&(K=s.RGBA32F),F===s.HALF_FLOAT&&(K=s.RGBA16F),F===s.UNSIGNED_BYTE&&(K=Ut===fe?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function _(R,b){let F;return R?b===null||b===Ci||b===us?F=s.DEPTH24_STENCIL8:b===yn?F=s.DEPTH32F_STENCIL8:b===Ys&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ci||b===us?F=s.DEPTH_COMPONENT24:b===yn?F=s.DEPTH_COMPONENT32F:b===Ys&&(F=s.DEPTH_COMPONENT16),F}function k(R,b){return x(R)===!0||R.isFramebufferTexture&&R.minFilter!==Le&&R.minFilter!==xn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function A(R){let b=R.target;b.removeEventListener("dispose",A),I(b),b.isVideoTexture&&u.delete(b)}function C(R){let b=R.target;b.removeEventListener("dispose",C),w(b)}function I(R){let b=n.get(R);if(b.__webglInit===void 0)return;let F=R.source,q=d.get(F);if(q){let Q=q[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(R),Object.keys(q).length===0&&d.delete(F)}n.remove(R)}function E(R){let b=n.get(R);s.deleteTexture(b.__webglTexture);let F=R.source,q=d.get(F);delete q[b.__cacheKey],o.memory.textures--}function w(R){let b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(b.__webglFramebuffer[q]))for(let Q=0;Q<b.__webglFramebuffer[q].length;Q++)s.deleteFramebuffer(b.__webglFramebuffer[q][Q]);else s.deleteFramebuffer(b.__webglFramebuffer[q]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[q])}else{if(Array.isArray(b.__webglFramebuffer))for(let q=0;q<b.__webglFramebuffer.length;q++)s.deleteFramebuffer(b.__webglFramebuffer[q]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let q=0;q<b.__webglColorRenderbuffer.length;q++)b.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[q]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let F=R.textures;for(let q=0,Q=F.length;q<Q;q++){let K=n.get(F[q]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(F[q])}n.remove(R)}let D=0;function H(){D=0}function B(){let R=D;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),D+=1,R}function X(R){let b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function tt(R,b){let F=n.get(R);if(R.isVideoTexture&&_t(R),R.isRenderTargetTexture===!1&&R.version>0&&F.__version!==R.version){let q=R.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(F,R,b);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+b)}function Y(R,b){let F=n.get(R);if(R.version>0&&F.__version!==R.version){J(F,R,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+b)}function nt(R,b){let F=n.get(R);if(R.version>0&&F.__version!==R.version){J(F,R,b);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+b)}function W(R,b){let F=n.get(R);if(R.version>0&&F.__version!==R.version){st(F,R,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+b)}let ut={[Bn]:s.REPEAT,[Ai]:s.CLAMP_TO_EDGE,[lc]:s.MIRRORED_REPEAT},Mt={[Le]:s.NEAREST,[np]:s.NEAREST_MIPMAP_NEAREST,[dr]:s.NEAREST_MIPMAP_LINEAR,[xn]:s.LINEAR,[ma]:s.LINEAR_MIPMAP_NEAREST,[Ri]:s.LINEAR_MIPMAP_LINEAR},It={[op]:s.NEVER,[dp]:s.ALWAYS,[ap]:s.LESS,[Zu]:s.LEQUAL,[cp]:s.EQUAL,[up]:s.GEQUAL,[lp]:s.GREATER,[hp]:s.NOTEQUAL};function Jt(R,b){if(b.type===yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===xn||b.magFilter===ma||b.magFilter===dr||b.magFilter===Ri||b.minFilter===xn||b.minFilter===ma||b.minFilter===dr||b.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,ut[b.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,ut[b.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,ut[b.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Mt[b.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Mt[b.minFilter]),b.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,It[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Le||b.minFilter!==dr&&b.minFilter!==Ri||b.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ce(R,b){let F=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",A));let q=b.source,Q=d.get(q);Q===void 0&&(Q={},d.set(q,Q));let K=X(b);if(K!==R.__cacheKey){Q[K]===void 0&&(Q[K]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Q[K].usedTimes++;let Ut=Q[R.__cacheKey];Ut!==void 0&&(Q[R.__cacheKey].usedTimes--,Ut.usedTimes===0&&E(b)),R.__cacheKey=K,R.__webglTexture=Q[K].texture}return F}function J(R,b,F){let q=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(q=s.TEXTURE_3D);let Q=ce(R,b),K=b.source;e.bindTexture(q,R.__webglTexture,s.TEXTURE0+F);let Ut=n.get(K);if(K.version!==Ut.__version||Q===!0){e.activeTexture(s.TEXTURE0+F);let gt=ae.getPrimaries(ae.workingColorSpace),Et=b.colorSpace===si?null:ae.getPrimaries(b.colorSpace),oe=b.colorSpace===si||gt===Et?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let it=y(b.image,!1,i.maxTextureSize);it=Vt(b,it);let Tt=r.convert(b.format,b.colorSpace),Bt=r.convert(b.type),Wt=M(b.internalFormat,Tt,Bt,b.colorSpace,b.isVideoTexture);Jt(q,b);let At,se=b.mipmaps,Kt=b.isVideoTexture!==!0,ge=Ut.__version===void 0||Q===!0,U=K.dataReady,mt=k(b,it);if(b.isDepthTexture)Wt=_(b.format===ds,b.type),ge&&(Kt?e.texStorage2D(s.TEXTURE_2D,1,Wt,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Wt,it.width,it.height,0,Tt,Bt,null));else if(b.isDataTexture)if(se.length>0){Kt&&ge&&e.texStorage2D(s.TEXTURE_2D,mt,Wt,se[0].width,se[0].height);for(let $=0,j=se.length;$<j;$++)At=se[$],Kt?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,At.width,At.height,Tt,Bt,At.data):e.texImage2D(s.TEXTURE_2D,$,Wt,At.width,At.height,0,Tt,Bt,At.data);b.generateMipmaps=!1}else Kt?(ge&&e.texStorage2D(s.TEXTURE_2D,mt,Wt,it.width,it.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,Tt,Bt,it.data)):e.texImage2D(s.TEXTURE_2D,0,Wt,it.width,it.height,0,Tt,Bt,it.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Kt&&ge&&e.texStorage3D(s.TEXTURE_2D_ARRAY,mt,Wt,se[0].width,se[0].height,it.depth);for(let $=0,j=se.length;$<j;$++)if(At=se[$],b.format!==un)if(Tt!==null)if(Kt){if(U)if(b.layerUpdates.size>0){let bt=bu(At.width,At.height,b.format,b.type);for(let yt of b.layerUpdates){let Yt=At.data.subarray(yt*bt/At.data.BYTES_PER_ELEMENT,(yt+1)*bt/At.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,yt,At.width,At.height,1,Tt,Yt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,At.width,At.height,it.depth,Tt,At.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,Wt,At.width,At.height,it.depth,0,At.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Kt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,At.width,At.height,it.depth,Tt,Bt,At.data):e.texImage3D(s.TEXTURE_2D_ARRAY,$,Wt,At.width,At.height,it.depth,0,Tt,Bt,At.data)}else{Kt&&ge&&e.texStorage2D(s.TEXTURE_2D,mt,Wt,se[0].width,se[0].height);for(let $=0,j=se.length;$<j;$++)At=se[$],b.format!==un?Tt!==null?Kt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,At.width,At.height,Tt,At.data):e.compressedTexImage2D(s.TEXTURE_2D,$,Wt,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Kt?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,At.width,At.height,Tt,Bt,At.data):e.texImage2D(s.TEXTURE_2D,$,Wt,At.width,At.height,0,Tt,Bt,At.data)}else if(b.isDataArrayTexture)if(Kt){if(ge&&e.texStorage3D(s.TEXTURE_2D_ARRAY,mt,Wt,it.width,it.height,it.depth),U)if(b.layerUpdates.size>0){let $=bu(it.width,it.height,b.format,b.type);for(let j of b.layerUpdates){let bt=it.data.subarray(j*$/it.data.BYTES_PER_ELEMENT,(j+1)*$/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,it.width,it.height,1,Tt,Bt,bt)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Tt,Bt,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Wt,it.width,it.height,it.depth,0,Tt,Bt,it.data);else if(b.isData3DTexture)Kt?(ge&&e.texStorage3D(s.TEXTURE_3D,mt,Wt,it.width,it.height,it.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Tt,Bt,it.data)):e.texImage3D(s.TEXTURE_3D,0,Wt,it.width,it.height,it.depth,0,Tt,Bt,it.data);else if(b.isFramebufferTexture){if(ge)if(Kt)e.texStorage2D(s.TEXTURE_2D,mt,Wt,it.width,it.height);else{let $=it.width,j=it.height;for(let bt=0;bt<mt;bt++)e.texImage2D(s.TEXTURE_2D,bt,Wt,$,j,0,Tt,Bt,null),$>>=1,j>>=1}}else if(se.length>0){if(Kt&&ge){let $=wt(se[0]);e.texStorage2D(s.TEXTURE_2D,mt,Wt,$.width,$.height)}for(let $=0,j=se.length;$<j;$++)At=se[$],Kt?U&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,Tt,Bt,At):e.texImage2D(s.TEXTURE_2D,$,Wt,Tt,Bt,At);b.generateMipmaps=!1}else if(Kt){if(ge){let $=wt(it);e.texStorage2D(s.TEXTURE_2D,mt,Wt,$.width,$.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Tt,Bt,it)}else e.texImage2D(s.TEXTURE_2D,0,Wt,Tt,Bt,it);x(b)&&m(q),Ut.__version=K.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function st(R,b,F){if(b.image.length!==6)return;let q=ce(R,b),Q=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+F);let K=n.get(Q);if(Q.version!==K.__version||q===!0){e.activeTexture(s.TEXTURE0+F);let Ut=ae.getPrimaries(ae.workingColorSpace),gt=b.colorSpace===si?null:ae.getPrimaries(b.colorSpace),Et=b.colorSpace===si||Ut===gt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let oe=b.isCompressedTexture||b.image[0].isCompressedTexture,it=b.image[0]&&b.image[0].isDataTexture,Tt=[];for(let j=0;j<6;j++)!oe&&!it?Tt[j]=y(b.image[j],!0,i.maxCubemapSize):Tt[j]=it?b.image[j].image:b.image[j],Tt[j]=Vt(b,Tt[j]);let Bt=Tt[0],Wt=r.convert(b.format,b.colorSpace),At=r.convert(b.type),se=M(b.internalFormat,Wt,At,b.colorSpace),Kt=b.isVideoTexture!==!0,ge=K.__version===void 0||q===!0,U=Q.dataReady,mt=k(b,Bt);Jt(s.TEXTURE_CUBE_MAP,b);let $;if(oe){Kt&&ge&&e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,se,Bt.width,Bt.height);for(let j=0;j<6;j++){$=Tt[j].mipmaps;for(let bt=0;bt<$.length;bt++){let yt=$[bt];b.format!==un?Wt!==null?Kt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt,0,0,yt.width,yt.height,Wt,yt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt,se,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Kt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt,0,0,yt.width,yt.height,Wt,At,yt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt,se,yt.width,yt.height,0,Wt,At,yt.data)}}}else{if($=b.mipmaps,Kt&&ge){$.length>0&&mt++;let j=wt(Tt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,mt,se,j.width,j.height)}for(let j=0;j<6;j++)if(it){Kt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Tt[j].width,Tt[j].height,Wt,At,Tt[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,se,Tt[j].width,Tt[j].height,0,Wt,At,Tt[j].data);for(let bt=0;bt<$.length;bt++){let Yt=$[bt].image[j].image;Kt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt+1,0,0,Yt.width,Yt.height,Wt,At,Yt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt+1,se,Yt.width,Yt.height,0,Wt,At,Yt.data)}}else{Kt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Wt,At,Tt[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,se,Wt,At,Tt[j]);for(let bt=0;bt<$.length;bt++){let yt=$[bt];Kt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt+1,0,0,Wt,At,yt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,bt+1,se,Wt,At,yt.image[j])}}}x(b)&&m(s.TEXTURE_CUBE_MAP),K.__version=Q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Ct(R,b,F,q,Q,K){let Ut=r.convert(F.format,F.colorSpace),gt=r.convert(F.type),Et=M(F.internalFormat,Ut,gt,F.colorSpace),oe=n.get(b),it=n.get(F);if(it.__renderTarget=b,!oe.__hasExternalTextures){let Tt=Math.max(1,b.width>>K),Bt=Math.max(1,b.height>>K);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?e.texImage3D(Q,K,Et,Tt,Bt,b.depth,0,Ut,gt,null):e.texImage2D(Q,K,Et,Tt,Bt,0,Ut,gt,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),ft(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,Q,it.__webglTexture,0,Rt(b)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,Q,it.__webglTexture,K),e.bindFramebuffer(s.FRAMEBUFFER,null)}function pt(R,b,F){if(s.bindRenderbuffer(s.RENDERBUFFER,R),b.depthBuffer){let q=b.depthTexture,Q=q&&q.isDepthTexture?q.type:null,K=_(b.stencilBuffer,Q),Ut=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=Rt(b);ft(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,gt,K,b.width,b.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,gt,K,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,K,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ut,s.RENDERBUFFER,R)}else{let q=b.textures;for(let Q=0;Q<q.length;Q++){let K=q[Q],Ut=r.convert(K.format,K.colorSpace),gt=r.convert(K.type),Et=M(K.internalFormat,Ut,gt,K.colorSpace),oe=Rt(b);F&&ft(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,oe,Et,b.width,b.height):ft(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,oe,Et,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Et,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ft(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=n.get(b.depthTexture);q.__renderTarget=b,(!q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),tt(b.depthTexture,0);let Q=q.__webglTexture,K=Rt(b);if(b.depthTexture.format===rs)ft(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(b.depthTexture.format===ds)ft(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ht(R){let b=n.get(R),F=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){let q=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),q){let Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=q}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ft(b.__webglFramebuffer,R)}else if(F){b.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[q]),b.__webglDepthbuffer[q]===void 0)b.__webglDepthbuffer[q]=s.createRenderbuffer(),pt(b.__webglDepthbuffer[q],R,!1);else{let Q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,K)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),pt(b.__webglDepthbuffer,R,!1);else{let q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,Q)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function ee(R,b,F){let q=n.get(R);b!==void 0&&Ct(q.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Ht(R)}function S(R){let b=R.texture,F=n.get(R),q=n.get(b);R.addEventListener("dispose",C);let Q=R.textures,K=R.isWebGLCubeRenderTarget===!0,Ut=Q.length>1;if(Ut||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=b.version,o.memory.textures++),K){F.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[gt]=[];for(let Et=0;Et<b.mipmaps.length;Et++)F.__webglFramebuffer[gt][Et]=s.createFramebuffer()}else F.__webglFramebuffer[gt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let gt=0;gt<b.mipmaps.length;gt++)F.__webglFramebuffer[gt]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Ut)for(let gt=0,Et=Q.length;gt<Et;gt++){let oe=n.get(Q[gt]);oe.__webglTexture===void 0&&(oe.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&ft(R)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let gt=0;gt<Q.length;gt++){let Et=Q[gt];F.__webglColorRenderbuffer[gt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[gt]);let oe=r.convert(Et.format,Et.colorSpace),it=r.convert(Et.type),Tt=M(Et.internalFormat,oe,it,Et.colorSpace,R.isXRRenderTarget===!0),Bt=Rt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,Bt,Tt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,F.__webglColorRenderbuffer[gt])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),pt(F.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Jt(s.TEXTURE_CUBE_MAP,b);for(let gt=0;gt<6;gt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Et=0;Et<b.mipmaps.length;Et++)Ct(F.__webglFramebuffer[gt][Et],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,Et);else Ct(F.__webglFramebuffer[gt],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);x(b)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let gt=0,Et=Q.length;gt<Et;gt++){let oe=Q[gt],it=n.get(oe);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),Jt(s.TEXTURE_2D,oe),Ct(F.__webglFramebuffer,R,oe,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,0),x(oe)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let gt=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(gt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(gt,q.__webglTexture),Jt(gt,b),b.mipmaps&&b.mipmaps.length>0)for(let Et=0;Et<b.mipmaps.length;Et++)Ct(F.__webglFramebuffer[Et],R,b,s.COLOR_ATTACHMENT0,gt,Et);else Ct(F.__webglFramebuffer,R,b,s.COLOR_ATTACHMENT0,gt,0);x(b)&&m(gt),e.unbindTexture()}R.depthBuffer&&Ht(R)}function Z(R){let b=R.textures;for(let F=0,q=b.length;F<q;F++){let Q=b[F];if(x(Q)){let K=v(R),Ut=n.get(Q).__webglTexture;e.bindTexture(K,Ut),m(K),e.unbindTexture()}}}let at=[],L=[];function kt(R){if(R.samples>0){if(ft(R)===!1){let b=R.textures,F=R.width,q=R.height,Q=s.COLOR_BUFFER_BIT,K=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ut=n.get(R),gt=b.length>1;if(gt)for(let Et=0;Et<b.length;Et++)e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Et,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Et,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Et=0;Et<b.length;Et++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),gt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ut.__webglColorRenderbuffer[Et]);let oe=n.get(b[Et]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,oe,0)}s.blitFramebuffer(0,0,F,q,0,0,F,q,Q,s.NEAREST),c===!0&&(at.length=0,L.length=0,at.push(s.COLOR_ATTACHMENT0+Et),R.depthBuffer&&R.resolveDepthBuffer===!1&&(at.push(K),L.push(K),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,L)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,at))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),gt)for(let Et=0;Et<b.length;Et++){e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Et,s.RENDERBUFFER,Ut.__webglColorRenderbuffer[Et]);let oe=n.get(b[Et]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Et,s.TEXTURE_2D,oe,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){let b=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function Rt(R){return Math.min(i.maxSamples,R.samples)}function ft(R){let b=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function _t(R){let b=o.render.frame;u.get(R)!==b&&(u.set(R,b),R.update())}function Vt(R,b){let F=R.colorSpace,q=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||F!==ys&&F!==si&&(ae.getTransfer(F)===fe?(q!==un||Q!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function wt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.setTexture2D=tt,this.setTexture2DArray=Y,this.setTexture3D=nt,this.setTextureCube=W,this.rebindTextures=ee,this.setupRenderTarget=S,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=ft}function sy(s,t){function e(n,i=si){let r,o=ae.getTransfer(i);if(n===Hn)return s.UNSIGNED_BYTE;if(n===Al)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Rl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Hu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Fu)return s.BYTE;if(n===Bu)return s.SHORT;if(n===Ys)return s.UNSIGNED_SHORT;if(n===Tl)return s.INT;if(n===Ci)return s.UNSIGNED_INT;if(n===yn)return s.FLOAT;if(n===ir)return s.HALF_FLOAT;if(n===Vu)return s.ALPHA;if(n===Gu)return s.RGB;if(n===un)return s.RGBA;if(n===Wu)return s.LUMINANCE;if(n===$u)return s.LUMINANCE_ALPHA;if(n===rs)return s.DEPTH_COMPONENT;if(n===ds)return s.DEPTH_STENCIL;if(n===Cl)return s.RED;if(n===Il)return s.RED_INTEGER;if(n===Xu)return s.RG;if(n===Pl)return s.RG_INTEGER;if(n===Ll)return s.RGBA_INTEGER;if(n===Wr||n===$r||n===Xr||n===Yr)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hc||n===uc||n===dc||n===fc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===hc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===uc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pc||n===mc||n===gc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===pc||n===mc)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===gc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===xc||n===yc||n===vc||n===_c||n===bc||n===Mc||n===wc||n===Sc||n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Ic)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_c)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ec)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ac)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Rc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Cc)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ic)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qr||n===Pc||n===Lc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===qr)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Pc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Lc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Yu||n===Dc||n===kc||n===Uc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===qr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var jc=class extends Se{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Gt=class extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}},ry={type:"move"},Ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let y of t.hand.values()){let x=e.getJointPose(y,n),m=this._getHandJoint(l,y);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ry)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Gt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},oy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ay=`
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

}`,Qc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new Xe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new _n({vertexShader:oy,fragmentShader:ay,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ot(new ke(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},tl=class extends ci{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null,y=new Qc,x=e.getContextAttributes(),m=null,v=null,M=[],_=[],k=new ht,A=null,C=new Se;C.viewport=new me;let I=new Se;I.viewport=new me;let E=[C,I],w=new jc,D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let st=M[J];return st===void 0&&(st=new Ws,M[J]=st),st.getTargetRaySpace()},this.getControllerGrip=function(J){let st=M[J];return st===void 0&&(st=new Ws,M[J]=st),st.getGripSpace()},this.getHand=function(J){let st=M[J];return st===void 0&&(st=new Ws,M[J]=st),st.getHandSpace()};function B(J){let st=_.indexOf(J.inputSource);if(st===-1)return;let Ct=M[st];Ct!==void 0&&(Ct.update(J.inputSource,J.frame,l||o),Ct.dispatchEvent({type:J.type,data:J.inputSource}))}function X(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",tt);for(let J=0;J<M.length;J++){let st=_[J];st!==null&&(_[J]=null,M[J].disconnect(st))}D=null,H=null,y.reset(),t.setRenderTarget(m),f=null,d=null,h=null,i=null,v=null,ce.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",X),i.addEventListener("inputsourceschange",tt),x.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(k),i.renderState.layers===void 0){let st={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,st),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Vn(f.framebufferWidth,f.framebufferHeight,{format:un,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let st=null,Ct=null,pt=null;x.depth&&(pt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=x.stencil?ds:rs,Ct=x.stencil?us:Ci);let Ft={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};h=new XRWebGLBinding(i,e),d=h.createProjectionLayer(Ft),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new Vn(d.textureWidth,d.textureHeight,{format:un,type:Hn,depthTexture:new ao(d.textureWidth,d.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ce.setContext(i),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function tt(J){for(let st=0;st<J.removed.length;st++){let Ct=J.removed[st],pt=_.indexOf(Ct);pt>=0&&(_[pt]=null,M[pt].disconnect(Ct))}for(let st=0;st<J.added.length;st++){let Ct=J.added[st],pt=_.indexOf(Ct);if(pt===-1){for(let Ht=0;Ht<M.length;Ht++)if(Ht>=_.length){_.push(Ct),pt=Ht;break}else if(_[Ht]===null){_[Ht]=Ct,pt=Ht;break}if(pt===-1)break}let Ft=M[pt];Ft&&Ft.connect(Ct)}}let Y=new P,nt=new P;function W(J,st,Ct){Y.setFromMatrixPosition(st.matrixWorld),nt.setFromMatrixPosition(Ct.matrixWorld);let pt=Y.distanceTo(nt),Ft=st.projectionMatrix.elements,Ht=Ct.projectionMatrix.elements,ee=Ft[14]/(Ft[10]-1),S=Ft[14]/(Ft[10]+1),Z=(Ft[9]+1)/Ft[5],at=(Ft[9]-1)/Ft[5],L=(Ft[8]-1)/Ft[0],kt=(Ht[8]+1)/Ht[0],Rt=ee*L,ft=ee*kt,_t=pt/(-L+kt),Vt=_t*-L;if(st.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Vt),J.translateZ(_t),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ft[10]===-1)J.projectionMatrix.copy(st.projectionMatrix),J.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{let wt=ee+_t,R=S+_t,b=Rt-Vt,F=ft+(pt-Vt),q=Z*S/R*wt,Q=at*S/R*wt;J.projectionMatrix.makePerspective(b,F,q,Q,wt,R),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ut(J,st){st===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(st.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let st=J.near,Ct=J.far;y.texture!==null&&(y.depthNear>0&&(st=y.depthNear),y.depthFar>0&&(Ct=y.depthFar)),w.near=I.near=C.near=st,w.far=I.far=C.far=Ct,(D!==w.near||H!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),D=w.near,H=w.far),C.layers.mask=J.layers.mask|2,I.layers.mask=J.layers.mask|4,w.layers.mask=C.layers.mask|I.layers.mask;let pt=J.parent,Ft=w.cameras;ut(w,pt);for(let Ht=0;Ht<Ft.length;Ht++)ut(Ft[Ht],pt);Ft.length===2?W(w,C,I):w.projectionMatrix.copy(C.projectionMatrix),Mt(J,w,pt)};function Mt(J,st,Ct){Ct===null?J.matrix.copy(st.matrixWorld):(J.matrix.copy(Ct.matrixWorld),J.matrix.invert(),J.matrix.multiply(st.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(st.projectionMatrix),J.projectionMatrixInverse.copy(st.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=zc*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(J){c=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(w)};let It=null;function Jt(J,st){if(u=st.getViewerPose(l||o),g=st,u!==null){let Ct=u.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let pt=!1;Ct.length!==w.cameras.length&&(w.cameras.length=0,pt=!0);for(let Ht=0;Ht<Ct.length;Ht++){let ee=Ct[Ht],S=null;if(f!==null)S=f.getViewport(ee);else{let at=h.getViewSubImage(d,ee);S=at.viewport,Ht===0&&(t.setRenderTargetTextures(v,at.colorTexture,d.ignoreDepthValues?void 0:at.depthStencilTexture),t.setRenderTarget(v))}let Z=E[Ht];Z===void 0&&(Z=new Se,Z.layers.enable(Ht),Z.viewport=new me,E[Ht]=Z),Z.matrix.fromArray(ee.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(ee.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(S.x,S.y,S.width,S.height),Ht===0&&(w.matrix.copy(Z.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),pt===!0&&w.cameras.push(Z)}let Ft=i.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){let Ht=h.getDepthInformation(Ct[0]);Ht&&Ht.isValid&&Ht.texture&&y.init(t,Ht,i.renderState)}}for(let Ct=0;Ct<M.length;Ct++){let pt=_[Ct],Ft=M[Ct];pt!==null&&Ft!==void 0&&Ft.update(pt,st,l||o)}It&&It(J,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}let ce=new td;ce.setAnimationLoop(Jt),this.setAnimationLoop=function(J){It=J},this.dispose=function(){}}},wi=new en,cy=new ie;function ly(s,t){function e(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function n(x,m){m.color.getRGB(x.fogColor.value,Qu(s)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function i(x,m,v,M,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(x,m):m.isMeshToonMaterial?(r(x,m),h(x,m)):m.isMeshPhongMaterial?(r(x,m),u(x,m)):m.isMeshStandardMaterial?(r(x,m),d(x,m),m.isMeshPhysicalMaterial&&f(x,m,_)):m.isMeshMatcapMaterial?(r(x,m),g(x,m)):m.isMeshDepthMaterial?r(x,m):m.isMeshDistanceMaterial?(r(x,m),y(x,m)):m.isMeshNormalMaterial?r(x,m):m.isLineBasicMaterial?(o(x,m),m.isLineDashedMaterial&&a(x,m)):m.isPointsMaterial?c(x,m,v,M):m.isSpriteMaterial?l(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,e(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,e(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,e(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===$e&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,e(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===$e&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,e(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,e(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);let v=t.get(m),M=v.envMap,_=v.envMapRotation;M&&(x.envMap.value=M,wi.copy(_),wi.x*=-1,wi.y*=-1,wi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),x.envMapRotation.value.setFromMatrix4(cy.makeRotationFromEuler(wi)),x.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,x.aoMapTransform))}function o(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,e(m.map,x.mapTransform))}function a(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function c(x,m,v,M){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*v,x.scale.value=M*.5,m.map&&(x.map.value=m.map,e(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,e(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function l(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,e(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,e(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function u(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function h(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function d(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function f(x,m,v){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$e&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,m){m.matcap&&(x.matcap.value=m.matcap)}function y(x,m){let v=t.get(m).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hy(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){let _=M.program;n.uniformBlockBinding(v,_)}function l(v,M){let _=i[v.id];_===void 0&&(g(v),_=u(v),i[v.id]=_,v.addEventListener("dispose",x));let k=M.program;n.updateUBOMapping(v,k);let A=t.render.frame;r[v.id]!==A&&(d(v),r[v.id]=A)}function u(v){let M=h();v.__bindingPointIndex=M;let _=s.createBuffer(),k=v.__size,A=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,k,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,_),_}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let M=i[v.id],_=v.uniforms,k=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,C=_.length;A<C;A++){let I=Array.isArray(_[A])?_[A]:[_[A]];for(let E=0,w=I.length;E<w;E++){let D=I[E];if(f(D,A,E,k)===!0){let H=D.__offset,B=Array.isArray(D.value)?D.value:[D.value],X=0;for(let tt=0;tt<B.length;tt++){let Y=B[tt],nt=y(Y);typeof Y=="number"||typeof Y=="boolean"?(D.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,H+X,D.__data)):Y.isMatrix3?(D.__data[0]=Y.elements[0],D.__data[1]=Y.elements[1],D.__data[2]=Y.elements[2],D.__data[3]=0,D.__data[4]=Y.elements[3],D.__data[5]=Y.elements[4],D.__data[6]=Y.elements[5],D.__data[7]=0,D.__data[8]=Y.elements[6],D.__data[9]=Y.elements[7],D.__data[10]=Y.elements[8],D.__data[11]=0):(Y.toArray(D.__data,X),X+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,M,_,k){let A=v.value,C=M+"_"+_;if(k[C]===void 0)return typeof A=="number"||typeof A=="boolean"?k[C]=A:k[C]=A.clone(),!0;{let I=k[C];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return k[C]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(v){let M=v.uniforms,_=0,k=16;for(let C=0,I=M.length;C<I;C++){let E=Array.isArray(M[C])?M[C]:[M[C]];for(let w=0,D=E.length;w<D;w++){let H=E[w],B=Array.isArray(H.value)?H.value:[H.value];for(let X=0,tt=B.length;X<tt;X++){let Y=B[X],nt=y(Y),W=_%k,ut=W%nt.boundary,Mt=W+ut;_+=ut,Mt!==0&&k-Mt<nt.storage&&(_+=k-Mt),H.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=nt.storage}}}let A=_%k;return A>0&&(_+=k-A),v.__size=_,v.__cache={},this}function y(v){let M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function x(v){let M=v.target;M.removeEventListener("dispose",x);let _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function m(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:m}}var bn=class{constructor(t={}){let{canvas:e=pp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),y=new Int32Array(4),x=null,m=null,v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ie,this.toneMapping=oi,this.toneMappingExposure=1;let _=this,k=!1,A=0,C=0,I=null,E=-1,w=null,D=new me,H=new me,B=null,X=new St(0),tt=0,Y=e.width,nt=e.height,W=1,ut=null,Mt=null,It=new me(0,0,Y,nt),Jt=new me(0,0,Y,nt),ce=!1,J=new Js,st=!1,Ct=!1,pt=new ie,Ft=new ie,Ht=new P,ee=new me,S={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Z=!1;function at(){return I===null?W:1}let L=n;function kt(T,O){return e.getContext(T,O)}try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",bt,!1),e.addEventListener("webglcontextcreationerror",yt,!1),L===null){let O="webgl2";if(L=kt(O,T),L===null)throw kt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Rt,ft,_t,Vt,wt,R,b,F,q,Q,K,Ut,gt,Et,oe,it,Tt,Bt,Wt,At,se,Kt,ge,U;function mt(){Rt=new Tg(L),Rt.init(),Kt=new sy(L,Rt),ft=new _g(L,Rt,t,Kt),_t=new ey(L,Rt),ft.reverseDepthBuffer&&d&&_t.buffers.depth.setReversed(!0),Vt=new Cg(L),wt=new Vx,R=new iy(L,Rt,_t,wt,ft,Kt,Vt),b=new Mg(_),F=new Eg(_),q=new Op(L),ge=new yg(L,q),Q=new Ag(L,q,Vt,ge),K=new Pg(L,Q,q,Vt),Wt=new Ig(L,ft,R),it=new bg(wt),Ut=new Hx(_,b,F,Rt,ft,ge,it),gt=new ly(_,wt),Et=new Wx,oe=new Jx(Rt),Bt=new xg(_,b,F,_t,K,f,c),Tt=new Qx(_,K,ft),U=new hy(L,Vt,ft,_t),At=new vg(L,Rt,Vt),se=new Rg(L,Rt,Vt),Vt.programs=Ut.programs,_.capabilities=ft,_.extensions=Rt,_.properties=wt,_.renderLists=Et,_.shadowMap=Tt,_.state=_t,_.info=Vt}mt();let $=new tl(_,L);this.xr=$,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let T=Rt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Rt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(T){T!==void 0&&(W=T,this.setSize(Y,nt,!1))},this.getSize=function(T){return T.set(Y,nt)},this.setSize=function(T,O,V=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,nt=O,e.width=Math.floor(T*W),e.height=Math.floor(O*W),V===!0&&(e.style.width=T+"px",e.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(Y*W,nt*W).floor()},this.setDrawingBufferSize=function(T,O,V){Y=T,nt=O,W=V,e.width=Math.floor(T*V),e.height=Math.floor(O*V),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(It)},this.setViewport=function(T,O,V,G){T.isVector4?It.set(T.x,T.y,T.z,T.w):It.set(T,O,V,G),_t.viewport(D.copy(It).multiplyScalar(W).round())},this.getScissor=function(T){return T.copy(Jt)},this.setScissor=function(T,O,V,G){T.isVector4?Jt.set(T.x,T.y,T.z,T.w):Jt.set(T,O,V,G),_t.scissor(H.copy(Jt).multiplyScalar(W).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(T){_t.setScissorTest(ce=T)},this.setOpaqueSort=function(T){ut=T},this.setTransparentSort=function(T){Mt=T},this.getClearColor=function(T){return T.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(T=!0,O=!0,V=!0){let G=0;if(T){let N=!1;if(I!==null){let rt=I.texture.format;N=rt===Ll||rt===Pl||rt===Il}if(N){let rt=I.texture.type,vt=rt===Hn||rt===Ci||rt===Ys||rt===us||rt===Al||rt===Rl,Pt=Bt.getClearColor(),Lt=Bt.getClearAlpha(),$t=Pt.r,qt=Pt.g,Dt=Pt.b;vt?(g[0]=$t,g[1]=qt,g[2]=Dt,g[3]=Lt,L.clearBufferuiv(L.COLOR,0,g)):(y[0]=$t,y[1]=qt,y[2]=Dt,y[3]=Lt,L.clearBufferiv(L.COLOR,0,y))}else G|=L.COLOR_BUFFER_BIT}O&&(G|=L.DEPTH_BUFFER_BIT),V&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",bt,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),Et.dispose(),oe.dispose(),wt.dispose(),b.dispose(),F.dispose(),K.dispose(),ge.dispose(),U.dispose(),Ut.dispose(),$.dispose(),$.removeEventListener("sessionstart",mh),$.removeEventListener("sessionend",gh),xi.stop()};function j(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function bt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;let T=Vt.autoReset,O=Tt.enabled,V=Tt.autoUpdate,G=Tt.needsUpdate,N=Tt.type;mt(),Vt.autoReset=T,Tt.enabled=O,Tt.autoUpdate=V,Tt.needsUpdate=G,Tt.type=N}function yt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Yt(T){let O=T.target;O.removeEventListener("dispose",Yt),we(O)}function we(T){Oe(T),wt.remove(T)}function Oe(T){let O=wt.get(T).programs;O!==void 0&&(O.forEach(function(V){Ut.releaseProgram(V)}),T.isShaderMaterial&&Ut.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,V,G,N,rt){O===null&&(O=S);let vt=N.isMesh&&N.matrixWorld.determinant()<0,Pt=wf(T,O,V,G,N);_t.setMaterial(G,vt);let Lt=V.index,$t=1;if(G.wireframe===!0){if(Lt=Q.getWireframeAttribute(V),Lt===void 0)return;$t=2}let qt=V.drawRange,Dt=V.attributes.position,le=qt.start*$t,xe=(qt.start+qt.count)*$t;rt!==null&&(le=Math.max(le,rt.start*$t),xe=Math.min(xe,(rt.start+rt.count)*$t)),Lt!==null?(le=Math.max(le,0),xe=Math.min(xe,Lt.count)):Dt!=null&&(le=Math.max(le,0),xe=Math.min(xe,Dt.count));let ye=xe-le;if(ye<0||ye===1/0)return;ge.setup(N,G,Pt,V,Lt);let We,he=At;if(Lt!==null&&(We=q.get(Lt),he=se,he.setIndex(We)),N.isMesh)G.wireframe===!0?(_t.setLineWidth(G.wireframeLinewidth*at()),he.setMode(L.LINES)):he.setMode(L.TRIANGLES);else if(N.isLine){let Ot=G.linewidth;Ot===void 0&&(Ot=1),_t.setLineWidth(Ot*at()),N.isLineSegments?he.setMode(L.LINES):N.isLineLoop?he.setMode(L.LINE_LOOP):he.setMode(L.LINE_STRIP)}else N.isPoints?he.setMode(L.POINTS):N.isSprite&&he.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)he.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Rt.get("WEBGL_multi_draw"))he.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let Ot=N._multiDrawStarts,Cn=N._multiDrawCounts,ue=N._multiDrawCount,an=Lt?q.get(Lt).bytesPerElement:1,Ni=wt.get(G).currentProgram.getUniforms();for(let qe=0;qe<ue;qe++)Ni.setValue(L,"_gl_DrawID",qe),he.render(Ot[qe]/an,Cn[qe])}else if(N.isInstancedMesh)he.renderInstances(le,ye,N.count);else if(V.isInstancedBufferGeometry){let Ot=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Cn=Math.min(V.instanceCount,Ot);he.renderInstances(le,ye,Cn)}else he.render(le,ye)};function de(T,O,V){T.transparent===!0&&T.side===Me&&T.forceSinglePass===!1?(T.side=$e,T.needsUpdate=!0,ur(T,O,V),T.side=vn,T.needsUpdate=!0,ur(T,O,V),T.side=Me):ur(T,O,V)}this.compile=function(T,O,V=null){V===null&&(V=T),m=oe.get(V),m.init(O),M.push(m),V.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),T!==V&&T.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights();let G=new Set;return T.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let rt=N.material;if(rt)if(Array.isArray(rt))for(let vt=0;vt<rt.length;vt++){let Pt=rt[vt];de(Pt,V,N),G.add(Pt)}else de(rt,V,N),G.add(rt)}),M.pop(),m=null,G},this.compileAsync=function(T,O,V=null){let G=this.compile(T,O,V);return new Promise(N=>{function rt(){if(G.forEach(function(vt){wt.get(vt).currentProgram.isReady()&&G.delete(vt)}),G.size===0){N(T);return}setTimeout(rt,10)}Rt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let on=null;function Rn(T){on&&on(T)}function mh(){xi.stop()}function gh(){xi.start()}let xi=new td;xi.setAnimationLoop(Rn),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(T){on=T,$.setAnimationLoop(T),T===null?xi.stop():xi.start()},$.addEventListener("sessionstart",mh),$.addEventListener("sessionend",gh),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(O),O=$.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,O,I),m=oe.get(T,M.length),m.init(O),M.push(m),Ft.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),J.setFromProjectionMatrix(Ft),Ct=this.localClippingEnabled,st=it.init(this.clippingPlanes,Ct),x=Et.get(T,v.length),x.init(),v.push(x),$.enabled===!0&&$.isPresenting===!0){let rt=_.xr.getDepthSensingMesh();rt!==null&&pa(rt,O,-1/0,_.sortObjects)}pa(T,O,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(ut,Mt),Z=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Z&&Bt.addToRenderList(x,T),this.info.render.frame++,st===!0&&it.beginShadows();let V=m.state.shadowsArray;Tt.render(V,T,O),st===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let G=x.opaque,N=x.transmissive;if(m.setupLights(),O.isArrayCamera){let rt=O.cameras;if(N.length>0)for(let vt=0,Pt=rt.length;vt<Pt;vt++){let Lt=rt[vt];yh(G,N,T,Lt)}Z&&Bt.render(T);for(let vt=0,Pt=rt.length;vt<Pt;vt++){let Lt=rt[vt];xh(x,T,Lt,Lt.viewport)}}else N.length>0&&yh(G,N,T,O),Z&&Bt.render(T),xh(x,T,O);I!==null&&(R.updateMultisampleRenderTarget(I),R.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(_,T,O),ge.resetDefaultState(),E=-1,w=null,M.pop(),M.length>0?(m=M[M.length-1],st===!0&&it.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?x=v[v.length-1]:x=null};function pa(T,O,V,G){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)V=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||J.intersectsSprite(T)){G&&ee.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ft);let vt=K.update(T),Pt=T.material;Pt.visible&&x.push(T,vt,Pt,V,ee.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||J.intersectsObject(T))){let vt=K.update(T),Pt=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ee.copy(T.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),ee.copy(vt.boundingSphere.center)),ee.applyMatrix4(T.matrixWorld).applyMatrix4(Ft)),Array.isArray(Pt)){let Lt=vt.groups;for(let $t=0,qt=Lt.length;$t<qt;$t++){let Dt=Lt[$t],le=Pt[Dt.materialIndex];le&&le.visible&&x.push(T,vt,le,V,ee.z,Dt)}}else Pt.visible&&x.push(T,vt,Pt,V,ee.z,null)}}let rt=T.children;for(let vt=0,Pt=rt.length;vt<Pt;vt++)pa(rt[vt],O,V,G)}function xh(T,O,V,G){let N=T.opaque,rt=T.transmissive,vt=T.transparent;m.setupLightsView(V),st===!0&&it.setGlobalState(_.clippingPlanes,V),G&&_t.viewport(D.copy(G)),N.length>0&&hr(N,O,V),rt.length>0&&hr(rt,O,V),vt.length>0&&hr(vt,O,V),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function yh(T,O,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[G.id]===void 0&&(m.state.transmissionRenderTarget[G.id]=new Vn(1,1,{generateMipmaps:!0,type:Rt.has("EXT_color_buffer_half_float")||Rt.has("EXT_color_buffer_float")?ir:Hn,minFilter:Ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));let rt=m.state.transmissionRenderTarget[G.id],vt=G.viewport||D;rt.setSize(vt.z,vt.w);let Pt=_.getRenderTarget();_.setRenderTarget(rt),_.getClearColor(X),tt=_.getClearAlpha(),tt<1&&_.setClearColor(16777215,.5),_.clear(),Z&&Bt.render(V);let Lt=_.toneMapping;_.toneMapping=oi;let $t=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),m.setupLightsView(G),st===!0&&it.setGlobalState(_.clippingPlanes,G),hr(T,V,G),R.updateMultisampleRenderTarget(rt),R.updateRenderTargetMipmap(rt),Rt.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Dt=0,le=O.length;Dt<le;Dt++){let xe=O[Dt],ye=xe.object,We=xe.geometry,he=xe.material,Ot=xe.group;if(he.side===Me&&ye.layers.test(G.layers)){let Cn=he.side;he.side=$e,he.needsUpdate=!0,vh(ye,V,G,We,he,Ot),he.side=Cn,he.needsUpdate=!0,qt=!0}}qt===!0&&(R.updateMultisampleRenderTarget(rt),R.updateRenderTargetMipmap(rt))}_.setRenderTarget(Pt),_.setClearColor(X,tt),$t!==void 0&&(G.viewport=$t),_.toneMapping=Lt}function hr(T,O,V){let G=O.isScene===!0?O.overrideMaterial:null;for(let N=0,rt=T.length;N<rt;N++){let vt=T[N],Pt=vt.object,Lt=vt.geometry,$t=G===null?vt.material:G,qt=vt.group;Pt.layers.test(V.layers)&&vh(Pt,O,V,Lt,$t,qt)}}function vh(T,O,V,G,N,rt){T.onBeforeRender(_,O,V,G,N,rt),T.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),N.onBeforeRender(_,O,V,G,T,rt),N.transparent===!0&&N.side===Me&&N.forceSinglePass===!1?(N.side=$e,N.needsUpdate=!0,_.renderBufferDirect(V,O,G,N,T,rt),N.side=vn,N.needsUpdate=!0,_.renderBufferDirect(V,O,G,N,T,rt),N.side=Me):_.renderBufferDirect(V,O,G,N,T,rt),T.onAfterRender(_,O,V,G,N,rt)}function ur(T,O,V){O.isScene!==!0&&(O=S);let G=wt.get(T),N=m.state.lights,rt=m.state.shadowsArray,vt=N.state.version,Pt=Ut.getParameters(T,N.state,rt,O,V),Lt=Ut.getProgramCacheKey(Pt),$t=G.programs;G.environment=T.isMeshStandardMaterial?O.environment:null,G.fog=O.fog,G.envMap=(T.isMeshStandardMaterial?F:b).get(T.envMap||G.environment),G.envMapRotation=G.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,$t===void 0&&(T.addEventListener("dispose",Yt),$t=new Map,G.programs=$t);let qt=$t.get(Lt);if(qt!==void 0){if(G.currentProgram===qt&&G.lightsStateVersion===vt)return bh(T,Pt),qt}else Pt.uniforms=Ut.getUniforms(T),T.onBeforeCompile(Pt,_),qt=Ut.acquireProgram(Pt,Lt),$t.set(Lt,qt),G.uniforms=Pt.uniforms;let Dt=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Dt.clippingPlanes=it.uniform),bh(T,Pt),G.needsLights=Ef(T),G.lightsStateVersion=vt,G.needsLights&&(Dt.ambientLightColor.value=N.state.ambient,Dt.lightProbe.value=N.state.probe,Dt.directionalLights.value=N.state.directional,Dt.directionalLightShadows.value=N.state.directionalShadow,Dt.spotLights.value=N.state.spot,Dt.spotLightShadows.value=N.state.spotShadow,Dt.rectAreaLights.value=N.state.rectArea,Dt.ltc_1.value=N.state.rectAreaLTC1,Dt.ltc_2.value=N.state.rectAreaLTC2,Dt.pointLights.value=N.state.point,Dt.pointLightShadows.value=N.state.pointShadow,Dt.hemisphereLights.value=N.state.hemi,Dt.directionalShadowMap.value=N.state.directionalShadowMap,Dt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Dt.spotShadowMap.value=N.state.spotShadowMap,Dt.spotLightMatrix.value=N.state.spotLightMatrix,Dt.spotLightMap.value=N.state.spotLightMap,Dt.pointShadowMap.value=N.state.pointShadowMap,Dt.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=qt,G.uniformsList=null,qt}function _h(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=as.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function bh(T,O){let V=wt.get(T);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.batchingColor=O.batchingColor,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.instancingMorph=O.instancingMorph,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function wf(T,O,V,G,N){O.isScene!==!0&&(O=S),R.resetTextureUnits();let rt=O.fog,vt=G.isMeshStandardMaterial?O.environment:null,Pt=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ys,Lt=(G.isMeshStandardMaterial?F:b).get(G.envMap||vt),$t=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,qt=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Dt=!!V.morphAttributes.position,le=!!V.morphAttributes.normal,xe=!!V.morphAttributes.color,ye=oi;G.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ye=_.toneMapping);let We=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,he=We!==void 0?We.length:0,Ot=wt.get(G),Cn=m.state.lights;if(st===!0&&(Ct===!0||T!==w)){let je=T===w&&G.id===E;it.setState(G,T,je)}let ue=!1;G.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==Cn.state.version||Ot.outputColorSpace!==Pt||N.isBatchedMesh&&Ot.batching===!1||!N.isBatchedMesh&&Ot.batching===!0||N.isBatchedMesh&&Ot.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ot.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ot.instancing===!1||!N.isInstancedMesh&&Ot.instancing===!0||N.isSkinnedMesh&&Ot.skinning===!1||!N.isSkinnedMesh&&Ot.skinning===!0||N.isInstancedMesh&&Ot.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ot.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ot.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ot.instancingMorph===!1&&N.morphTexture!==null||Ot.envMap!==Lt||G.fog===!0&&Ot.fog!==rt||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==it.numPlanes||Ot.numIntersection!==it.numIntersection)||Ot.vertexAlphas!==$t||Ot.vertexTangents!==qt||Ot.morphTargets!==Dt||Ot.morphNormals!==le||Ot.morphColors!==xe||Ot.toneMapping!==ye||Ot.morphTargetsCount!==he)&&(ue=!0):(ue=!0,Ot.__version=G.version);let an=Ot.currentProgram;ue===!0&&(an=ur(G,O,N));let Ni=!1,qe=!1,Cs=!1,ve=an.getUniforms(),pn=Ot.uniforms;if(_t.useProgram(an.program)&&(Ni=!0,qe=!0,Cs=!0),G.id!==E&&(E=G.id,qe=!0),Ni||w!==T){_t.buffers.depth.getReversed()?(pt.copy(T.projectionMatrix),gp(pt),xp(pt),ve.setValue(L,"projectionMatrix",pt)):ve.setValue(L,"projectionMatrix",T.projectionMatrix),ve.setValue(L,"viewMatrix",T.matrixWorldInverse);let Jn=ve.map.cameraPosition;Jn!==void 0&&Jn.setValue(L,Ht.setFromMatrixPosition(T.matrixWorld)),ft.logarithmicDepthBuffer&&ve.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ve.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),w!==T&&(w=T,qe=!0,Cs=!0)}if(N.isSkinnedMesh){ve.setOptional(L,N,"bindMatrix"),ve.setOptional(L,N,"bindMatrixInverse");let je=N.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),ve.setValue(L,"boneTexture",je.boneTexture,R))}N.isBatchedMesh&&(ve.setOptional(L,N,"batchingTexture"),ve.setValue(L,"batchingTexture",N._matricesTexture,R),ve.setOptional(L,N,"batchingIdTexture"),ve.setValue(L,"batchingIdTexture",N._indirectTexture,R),ve.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&ve.setValue(L,"batchingColorTexture",N._colorsTexture,R));let Is=V.morphAttributes;if((Is.position!==void 0||Is.normal!==void 0||Is.color!==void 0)&&Wt.update(N,V,an),(qe||Ot.receiveShadow!==N.receiveShadow)&&(Ot.receiveShadow=N.receiveShadow,ve.setValue(L,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(pn.envMap.value=Lt,pn.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&O.environment!==null&&(pn.envMapIntensity.value=O.environmentIntensity),qe&&(ve.setValue(L,"toneMappingExposure",_.toneMappingExposure),Ot.needsLights&&Sf(pn,Cs),rt&&G.fog===!0&&gt.refreshFogUniforms(pn,rt),gt.refreshMaterialUniforms(pn,G,W,nt,m.state.transmissionRenderTarget[T.id]),as.upload(L,_h(Ot),pn,R)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(as.upload(L,_h(Ot),pn,R),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ve.setValue(L,"center",N.center),ve.setValue(L,"modelViewMatrix",N.modelViewMatrix),ve.setValue(L,"normalMatrix",N.normalMatrix),ve.setValue(L,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){let je=G.uniformsGroups;for(let Jn=0,Kn=je.length;Jn<Kn;Jn++){let Mh=je[Jn];U.update(Mh,an),U.bind(Mh,an)}}return an}function Sf(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Ef(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,O,V){wt.get(T.texture).__webglTexture=O,wt.get(T.depthTexture).__webglTexture=V;let G=wt.get(T);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=V===void 0,G.__autoAllocateDepthBuffer||Rt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){let V=wt.get(T);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,V=0){I=T,A=O,C=V;let G=!0,N=null,rt=!1,vt=!1;if(T){let Lt=wt.get(T);if(Lt.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(L.FRAMEBUFFER,null),G=!1;else if(Lt.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(Lt.__hasExternalTextures)R.rebindTextures(T,wt.get(T.texture).__webglTexture,wt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Dt=T.depthTexture;if(Lt.__boundDepthTexture!==Dt){if(Dt!==null&&wt.has(Dt)&&(T.width!==Dt.image.width||T.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}let $t=T.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(vt=!0);let qt=wt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(qt[O])?N=qt[O][V]:N=qt[O],rt=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?N=wt.get(T).__webglMultisampledFramebuffer:Array.isArray(qt)?N=qt[V]:N=qt,D.copy(T.viewport),H.copy(T.scissor),B=T.scissorTest}else D.copy(It).multiplyScalar(W).floor(),H.copy(Jt).multiplyScalar(W).floor(),B=ce;if(_t.bindFramebuffer(L.FRAMEBUFFER,N)&&G&&_t.drawBuffers(T,N),_t.viewport(D),_t.scissor(H),_t.setScissorTest(B),rt){let Lt=wt.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Lt.__webglTexture,V)}else if(vt){let Lt=wt.get(T.texture),$t=O||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Lt.__webglTexture,V||0,$t)}E=-1},this.readRenderTargetPixels=function(T,O,V,G,N,rt,vt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=wt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(Pt=Pt[vt]),Pt){_t.bindFramebuffer(L.FRAMEBUFFER,Pt);try{let Lt=T.texture,$t=Lt.format,qt=Lt.type;if(!ft.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-G&&V>=0&&V<=T.height-N&&L.readPixels(O,V,G,N,Kt.convert($t),Kt.convert(qt),rt)}finally{let Lt=I!==null?wt.get(I).__webglFramebuffer:null;_t.bindFramebuffer(L.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(T,O,V,G,N,rt,vt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=wt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&vt!==void 0&&(Pt=Pt[vt]),Pt){let Lt=T.texture,$t=Lt.format,qt=Lt.type;if(!ft.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-G&&V>=0&&V<=T.height-N){_t.bindFramebuffer(L.FRAMEBUFFER,Pt);let Dt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Dt),L.bufferData(L.PIXEL_PACK_BUFFER,rt.byteLength,L.STREAM_READ),L.readPixels(O,V,G,N,Kt.convert($t),Kt.convert(qt),0);let le=I!==null?wt.get(I).__webglFramebuffer:null;_t.bindFramebuffer(L.FRAMEBUFFER,le);let xe=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await mp(L,xe,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Dt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,rt),L.deleteBuffer(Dt),L.deleteSync(xe),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,V=0){T.isTexture!==!0&&(Vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);let G=Math.pow(2,-V),N=Math.floor(T.image.width*G),rt=Math.floor(T.image.height*G),vt=O!==null?O.x:0,Pt=O!==null?O.y:0;R.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,vt,Pt,N,rt),_t.unbindTexture()},this.copyTextureToTexture=function(T,O,V=null,G=null,N=0){T.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1],O=arguments[2],N=arguments[3]||0,V=null);let rt,vt,Pt,Lt,$t,qt,Dt,le,xe,ye=T.isCompressedTexture?T.mipmaps[N]:T.image;V!==null?(rt=V.max.x-V.min.x,vt=V.max.y-V.min.y,Pt=V.isBox3?V.max.z-V.min.z:1,Lt=V.min.x,$t=V.min.y,qt=V.isBox3?V.min.z:0):(rt=ye.width,vt=ye.height,Pt=ye.depth||1,Lt=0,$t=0,qt=0),G!==null?(Dt=G.x,le=G.y,xe=G.z):(Dt=0,le=0,xe=0);let We=Kt.convert(O.format),he=Kt.convert(O.type),Ot;O.isData3DTexture?(R.setTexture3D(O,0),Ot=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),Ot=L.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),Ot=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);let Cn=L.getParameter(L.UNPACK_ROW_LENGTH),ue=L.getParameter(L.UNPACK_IMAGE_HEIGHT),an=L.getParameter(L.UNPACK_SKIP_PIXELS),Ni=L.getParameter(L.UNPACK_SKIP_ROWS),qe=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ye.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ye.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Lt),L.pixelStorei(L.UNPACK_SKIP_ROWS,$t),L.pixelStorei(L.UNPACK_SKIP_IMAGES,qt);let Cs=T.isDataArrayTexture||T.isData3DTexture,ve=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let pn=wt.get(T),Is=wt.get(O),je=wt.get(pn.__renderTarget),Jn=wt.get(Is.__renderTarget);_t.bindFramebuffer(L.READ_FRAMEBUFFER,je.__webglFramebuffer),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,Jn.__webglFramebuffer);for(let Kn=0;Kn<Pt;Kn++)Cs&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,wt.get(T).__webglTexture,N,qt+Kn),T.isDepthTexture?(ve&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,wt.get(O).__webglTexture,N,xe+Kn),L.blitFramebuffer(Lt,$t,rt,vt,Dt,le,rt,vt,L.DEPTH_BUFFER_BIT,L.NEAREST)):ve?L.copyTexSubImage3D(Ot,N,Dt,le,xe+Kn,Lt,$t,rt,vt):L.copyTexSubImage2D(Ot,N,Dt,le,xe+Kn,Lt,$t,rt,vt);_t.bindFramebuffer(L.READ_FRAMEBUFFER,null),_t.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ve?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(Ot,N,Dt,le,xe,rt,vt,Pt,We,he,ye.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(Ot,N,Dt,le,xe,rt,vt,Pt,We,ye.data):L.texSubImage3D(Ot,N,Dt,le,xe,rt,vt,Pt,We,he,ye):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,N,Dt,le,rt,vt,We,he,ye.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,N,Dt,le,ye.width,ye.height,We,ye.data):L.texSubImage2D(L.TEXTURE_2D,N,Dt,le,rt,vt,We,he,ye);L.pixelStorei(L.UNPACK_ROW_LENGTH,Cn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ue),L.pixelStorei(L.UNPACK_SKIP_PIXELS,an),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ni),L.pixelStorei(L.UNPACK_SKIP_IMAGES,qe),N===0&&O.generateMipmaps&&L.generateMipmap(Ot),_t.unbindTexture()},this.copyTextureToTexture3D=function(T,O,V=null,G=null,N=0){return T.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,G=arguments[1]||null,T=arguments[2],O=arguments[3],N=arguments[4]||0),Vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,V,G,N)},this.initRenderTarget=function(T){wt.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),_t.unbindTexture()},this.resetState=function(){A=0,C=0,I=null,_t.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}};var co=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new St(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Mn=class extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},lo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Nc,this.updateRanges=[],this.version=0,this.uuid=ai()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ai()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},He=new P,Ks=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),i=pe(i,this.array),r=pe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Te(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},js=class extends Wn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ji,Us=new P,Qi=new P,ts=new P,es=new ht,Os=new ht,rd=new ie,Dr=new P,Ns=new P,kr=new P,Mu=new ht,Wa=new ht,wu=new ht,ho=class extends De{constructor(t=new js){if(super(),this.isSprite=!0,this.type="Sprite",ji===void 0){ji=new _e;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new lo(e,5);ji.setIndex([0,1,2,0,2,3]),ji.setAttribute("position",new Ks(n,3,0,!1)),ji.setAttribute("uv",new Ks(n,2,3,!1))}this.geometry=ji,this.material=t,this.center=new ht(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qi.setFromMatrixScale(this.matrixWorld),rd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ts.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qi.multiplyScalar(-ts.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;Ur(Dr.set(-.5,-.5,0),ts,o,Qi,i,r),Ur(Ns.set(.5,-.5,0),ts,o,Qi,i,r),Ur(kr.set(.5,.5,0),ts,o,Qi,i,r),Mu.set(0,0),Wa.set(1,0),wu.set(1,1);let a=t.ray.intersectTriangle(Dr,Ns,kr,!1,Us);if(a===null&&(Ur(Ns.set(-.5,.5,0),ts,o,Qi,i,r),Wa.set(0,1),a=t.ray.intersectTriangle(Dr,kr,Ns,!1,Us),a===null))return;let c=t.ray.origin.distanceTo(Us);c<t.near||c>t.far||e.push({distance:c,point:Us.clone(),uv:Nn.getInterpolation(Us,Dr,Ns,kr,Mu,Wa,wu,new ht),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Ur(s,t,e,n,i,r){es.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Os.x=r*es.x-i*es.y,Os.y=i*es.x+r*es.y):Os.copy(es),s.copy(t),s.x+=Os.x,s.y+=Os.y,s.applyMatrix4(rd)}var el=class extends Xe{constructor(t=null,e=1,n=1,i,r,o,a,c,l=Le,u=Le,h,d){super(null,o,a,c,l,u,i,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qs=class extends Te{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ns=new ie,Su=new ie,Or=[],Eu=new Gn,uy=new ie,zs=new ot,Fs=new li,uo=class extends ot{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Qs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,uy)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Gn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),Eu.copy(t.boundingBox).applyMatrix4(ns),this.boundingBox.union(Eu)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),Fs.copy(t.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Fs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(zs.geometry=this.geometry,zs.material=this.material,zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fs.copy(this.boundingSphere),Fs.applyMatrix4(n),t.ray.intersectsSphere(Fs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ns),Su.multiplyMatrices(n,ns),zs.matrixWorld=Su,zs.raycast(t,Or);for(let o=0,a=Or.length;o<a;o++){let c=Or[o];c.instanceId=r,c.object=this,e.push(c)}Or.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Qs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new el(new Float32Array(i*this.count),i,this.count,Cl,yn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var ps=class extends Wn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},fo=new P,po=new P,Tu=new ie,Bs=new qs,Nr=new li,$a=new P,Au=new P,nl=class extends De{constructor(t=new _e,e=new ps){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)fo.fromBufferAttribute(e,i-1),po.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=fo.distanceTo(po);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(i),Nr.radius+=r,t.ray.intersectsSphere(Nr)===!1)return;Tu.copy(i).invert(),Bs.copy(t.ray).applyMatrix4(Tu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let y=f,x=g-1;y<x;y+=l){let m=u.getX(y),v=u.getX(y+1),M=zr(this,t,Bs,c,m,v);M&&e.push(M)}if(this.isLineLoop){let y=u.getX(g-1),x=u.getX(f),m=zr(this,t,Bs,c,y,x);m&&e.push(m)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let y=f,x=g-1;y<x;y+=l){let m=zr(this,t,Bs,c,y,y+1);m&&e.push(m)}if(this.isLineLoop){let y=zr(this,t,Bs,c,g-1,f);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zr(s,t,e,n,i,r){let o=s.geometry.attributes.position;if(fo.fromBufferAttribute(o,i),po.fromBufferAttribute(o,r),e.distanceSqToSegment(fo,po,$a,Au)>n)return;$a.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo($a);if(!(c<t.near||c>t.far))return{distance:c,point:Au.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}var Ru=new P,Cu=new P,tr=class extends nl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Ru.fromBufferAttribute(e,i),Cu.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ru.distanceTo(Cu);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var $n=class extends Xe{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let u=n[i],d=n[i+1]-u,f=(o-u)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new ht:new P);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,i=[],r=[],o=[],a=new P,c=new ie;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let l=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Pe(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Pe(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},er=class extends nn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ht){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},il=class extends er{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function kl(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let d=(o-r)/l-(a-r)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+h)+(c-a)/h;d*=u,f*=u,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var Fr=new P,Xa=new kl,Ya=new kl,qa=new kl,sl=class extends nn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(Fr.subVectors(i[0],i[1]).add(i[0]),l=Fr);let h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(Fr.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Fr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),f),y=Math.pow(h.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f);y<1e-4&&(y=1),g<1e-4&&(g=y),x<1e-4&&(x=y),Xa.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,y,x),Ya.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,y,x),qa.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,y,x)}else this.curveType==="catmullrom"&&(Xa.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Ya.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),qa.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(Xa.calc(c),Ya.calc(c),qa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Iu(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function dy(s,t){let e=1-s;return e*e*t}function fy(s,t){return 2*(1-s)*s*t}function py(s,t){return s*s*t}function $s(s,t,e,n){return dy(s,t)+fy(s,e)+py(s,n)}function my(s,t){let e=1-s;return e*e*e*t}function gy(s,t){let e=1-s;return 3*e*e*s*t}function xy(s,t){return 3*(1-s)*s*s*t}function yy(s,t){return s*s*s*t}function Xs(s,t,e,n,i){return my(s,t)+gy(s,e)+xy(s,n)+yy(s,i)}var mo=class extends nn{constructor(t=new ht,e=new ht,n=new ht,i=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ht){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xs(t,i.x,r.x,o.x,a.x),Xs(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},rl=class extends nn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xs(t,i.x,r.x,o.x,a.x),Xs(t,i.y,r.y,o.y,a.y),Xs(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},go=class extends nn{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ol=class extends nn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xo=class extends nn{constructor(t=new ht,e=new ht,n=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ht){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set($s(t,i.x,r.x,o.x),$s(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},al=class extends nn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set($s(t,i.x,r.x,o.x),$s(t,i.y,r.y,o.y),$s(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},yo=class extends nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Iu(a,c.x,l.x,u.x,h.x),Iu(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ht().fromArray(i))}return this}},Pu=Object.freeze({__proto__:null,ArcCurve:il,CatmullRomCurve3:sl,CubicBezierCurve:mo,CubicBezierCurve3:rl,EllipseCurve:er,LineCurve:go,LineCurve3:ol,QuadraticBezierCurve:xo,QuadraticBezierCurve3:al,SplineCurve:yo}),cl=class extends nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Pu[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Pu[i.type]().fromJSON(i))}return this}},ll=class extends cl{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new go(this.currentPoint.clone(),new ht(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new xo(this.currentPoint.clone(),new ht(t,e),new ht(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new mo(this.currentPoint.clone(),new ht(t,e),new ht(n,i),new ht(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new yo(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){let l=new er(t,e,n,i,r,o,a,c);if(this.curves.length>0){let h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},hl=class s extends _e{constructor(t=[new ht(0,-.5),new ht(.5,0),new ht(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Pe(i,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],u=1/e,h=new P,d=new ht,f=new P,g=new P,y=new P,x=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:x=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-x,f.z=m*0,y.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(y.x,y.y,y.z);break;default:x=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-x,f.z=m*0,g.copy(f),f.x+=y.x,f.y+=y.y,f.z+=y.z,f.normalize(),c.push(f.x,f.y,f.z),y.copy(g)}for(let v=0;v<=e;v++){let M=n+v*u*i,_=Math.sin(M),k=Math.cos(M);for(let A=0;A<=t.length-1;A++){h.x=t[A].x*_,h.y=t[A].y,h.z=t[A].x*k,o.push(h.x,h.y,h.z),d.x=v/e,d.y=A/(t.length-1),a.push(d.x,d.y);let C=c[3*A+0]*_,I=c[3*A+1],E=c[3*A+0]*k;l.push(C,I,E)}}for(let v=0;v<e;v++)for(let M=0;M<t.length-1;M++){let _=M+v*t.length,k=_,A=_+t.length,C=_+t.length+1,I=_+1;r.push(k,A,I),r.push(C,I,A)}this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("uv",new ne(a,2)),this.setAttribute("normal",new ne(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},vo=class s extends hl{constructor(t=1,e=1,n=4,i=8){let r=new ll;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new s(t.radius,t.length,t.capSegments,t.radialSegments)}};var Fe=class s extends _e{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let u=[],h=[],d=[],f=[],g=0,y=[],x=n/2,m=0;v(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new ne(h,3)),this.setAttribute("normal",new ne(d,3)),this.setAttribute("uv",new ne(f,2));function v(){let _=new P,k=new P,A=0,C=(e-t)/n;for(let I=0;I<=r;I++){let E=[],w=I/r,D=w*(e-t)+t;for(let H=0;H<=i;H++){let B=H/i,X=B*c+a,tt=Math.sin(X),Y=Math.cos(X);k.x=D*tt,k.y=-w*n+x,k.z=D*Y,h.push(k.x,k.y,k.z),_.set(tt,C,Y).normalize(),d.push(_.x,_.y,_.z),f.push(B,1-w),E.push(g++)}y.push(E)}for(let I=0;I<i;I++)for(let E=0;E<r;E++){let w=y[E][I],D=y[E+1][I],H=y[E+1][I+1],B=y[E][I+1];(t>0||E!==0)&&(u.push(w,D,B),A+=3),(e>0||E!==r-1)&&(u.push(D,H,B),A+=3)}l.addGroup(m,A,0),m+=A}function M(_){let k=g,A=new ht,C=new P,I=0,E=_===!0?t:e,w=_===!0?1:-1;for(let H=1;H<=i;H++)h.push(0,x*w,0),d.push(0,w,0),f.push(.5,.5),g++;let D=g;for(let H=0;H<=i;H++){let X=H/i*c+a,tt=Math.cos(X),Y=Math.sin(X);C.x=E*Y,C.y=x*w,C.z=E*tt,h.push(C.x,C.y,C.z),d.push(0,w,0),A.x=tt*.5+.5,A.y=Y*.5*w+.5,f.push(A.x,A.y),g++}for(let H=0;H<i;H++){let B=k+H,X=D+H;_===!0?u.push(X,X+1,B):u.push(X+1,X,B),I+=3}l.addGroup(m,I,_===!0?1:2),m+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wn=class s extends Fe{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ul=class s extends _e{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),l(n),u(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let M=new P,_=new P,k=new P;for(let A=0;A<e.length;A+=3)f(e[A+0],M),f(e[A+1],_),f(e[A+2],k),c(M,_,k,v)}function c(v,M,_,k){let A=k+1,C=[];for(let I=0;I<=A;I++){C[I]=[];let E=v.clone().lerp(_,I/A),w=M.clone().lerp(_,I/A),D=A-I;for(let H=0;H<=D;H++)H===0&&I===A?C[I][H]=E:C[I][H]=E.clone().lerp(w,H/D)}for(let I=0;I<A;I++)for(let E=0;E<2*(A-I)-1;E++){let w=Math.floor(E/2);E%2===0?(d(C[I][w+1]),d(C[I+1][w]),d(C[I][w])):(d(C[I][w+1]),d(C[I+1][w+1]),d(C[I+1][w]))}}function l(v){let M=new P;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(v),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function u(){let v=new P;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];let _=x(v)/2/Math.PI+.5,k=m(v)/Math.PI+.5;o.push(_,1-k)}g(),h()}function h(){for(let v=0;v<o.length;v+=6){let M=o[v+0],_=o[v+2],k=o[v+4],A=Math.max(M,_,k),C=Math.min(M,_,k);A>.9&&C<.1&&(M<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),k<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,M){let _=v*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function g(){let v=new P,M=new P,_=new P,k=new P,A=new ht,C=new ht,I=new ht;for(let E=0,w=0;E<r.length;E+=9,w+=6){v.set(r[E+0],r[E+1],r[E+2]),M.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),A.set(o[w+0],o[w+1]),C.set(o[w+2],o[w+3]),I.set(o[w+4],o[w+5]),k.copy(v).add(M).add(_).divideScalar(3);let D=x(k);y(A,w+0,v,D),y(C,w+2,M,D),y(I,w+4,_,D)}}function y(v,M,_,k){k<0&&v.x===1&&(o[M]=v.x-1),_.x===0&&_.z===0&&(o[M]=k/2/Math.PI+.5)}function x(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}};var Br=new P,Hr=new P,Za=new P,Vr=new Nn,_o=class extends _e{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(Zr*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:y,b:x,c:m}=Vr;if(y.fromBufferAttribute(a,l[0]),x.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),Vr.getNormal(Za),h[0]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,h[1]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){let M=(v+1)%3,_=h[v],k=h[M],A=Vr[u[v]],C=Vr[u[M]],I=`${_}_${k}`,E=`${k}_${_}`;E in d&&d[E]?(Za.dot(d[E].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(C.x,C.y,C.z)),d[E]=null):I in d||(d[I]={index0:l[v],index1:l[M],normal:Za.clone()})}}for(let g in d)if(d[g]){let{index0:y,index1:x}=d[g];Br.fromBufferAttribute(a,y),Hr.fromBufferAttribute(a,x),f.push(Br.x,Br.y,Br.z),f.push(Hr.x,Hr.y,Hr.z)}this.setAttribute("position",new ne(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var ms=class s extends ul{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var dn=class s extends _e{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],c=[],l=[],u=[],h=t,d=(e-t)/i,f=new P,g=new ht;for(let y=0;y<=i;y++){for(let x=0;x<=n;x++){let m=r+x/n*o;f.x=h*Math.cos(m),f.y=h*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}h+=d}for(let y=0;y<i;y++){let x=y*(n+1);for(let m=0;m<n;m++){let v=m+x,M=v,_=v+n+1,k=v+n+2,A=v+1;a.push(M,_,A),a.push(_,k,A)}}this.setIndex(a),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var hi=class s extends _e{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,u=[],h=new P,d=new P,f=[],g=[],y=[],x=[];for(let m=0;m<=n;m++){let v=[],M=m/n,_=0;m===0&&o===0?_=.5/e:m===n&&c===Math.PI&&(_=-.5/e);for(let k=0;k<=e;k++){let A=k/e;h.x=-t*Math.cos(i+A*r)*Math.sin(o+M*a),h.y=t*Math.cos(o+M*a),h.z=t*Math.sin(i+A*r)*Math.sin(o+M*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),y.push(d.x,d.y,d.z),x.push(A+_,1-M),v.push(l++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){let M=u[m][v+1],_=u[m][v],k=u[m+1][v],A=u[m+1][v+1];(m!==0||o>0)&&f.push(M,_,A),(m!==n-1||c<Math.PI)&&f.push(_,k,A)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(y,3)),this.setAttribute("uv",new ne(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var te=class extends Wn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qu,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=El,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Gr(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function vy(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var gs=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},dl=class extends gs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ah,endingEnd:Ah}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Rh:r=t,a=2*e-n;break;case Ch:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Rh:o=t,c=2*n-e;break;case Ch:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),y=g*g,x=y*g,m=-d*x+2*d*y-d*g,v=(1+d)*x+(-1.5-2*d)*y+(-.5+d)*g+1,M=(-1-f)*x+(1.5+f)*y+.5*g,_=f*x-f*y;for(let k=0;k!==a;++k)r[k]=m*o[u+k]+v*o[l+k]+M*o[c+k]+_*o[h+k];return r}},fl=class extends gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,u=(n-e)/(i-e),h=1-u;for(let d=0;d!==a;++d)r[d]=o[l+d]*h+o[c+d]*u;return r}},pl=class extends gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},fn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Gr(e,this.TimeBufferType),this.values=Gr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Gr(t.times,Array),values:Gr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new pl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new dl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Jr:e=this.InterpolantFactoryMethodDiscrete;break;case Oc:e=this.InterpolantFactoryMethodLinear;break;case ga:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return Oc;case this.InterpolantFactoryMethodSmooth:return ga}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&vy(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ga,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],u=t[a+1];if(l!==u&&(a!==1||l!==t[0]))if(i)c=!0;else{let h=a*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let y=e[h+g];if(y!==e[d+g]||y!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};fn.prototype.TimeBufferType=Float32Array;fn.prototype.ValueBufferType=Float32Array;fn.prototype.DefaultInterpolation=Oc;var Ii=class extends fn{constructor(t,e,n){super(t,e,n)}};Ii.prototype.ValueTypeName="bool";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=Jr;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var ml=class extends fn{};ml.prototype.ValueTypeName="color";var gl=class extends fn{};gl.prototype.ValueTypeName="number";var xl=class extends gs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e),l=t*a;for(let u=l+a;l!==u;l+=4)tn.slerpFlat(r,0,o,l-a,o,l,c);return r}},bo=class extends fn{InterpolantFactoryMethodLinear(t){return new xl(this.times,this.values,this.getValueSize(),t)}};bo.prototype.ValueTypeName="quaternion";bo.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends fn{constructor(t,e,n){super(t,e,n)}};Pi.prototype.ValueTypeName="string";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=Jr;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var yl=class extends fn{};yl.prototype.ValueTypeName="vector";var vl=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){let f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},_y=new vl,_l=class{constructor(t){this.manager=t!==void 0?t:_y,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};_l.DEFAULT_MATERIAL_NAME="__DEFAULT";var nr=class extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new St(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Sn=class extends nr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Ja=new ie,Lu=new P,Du=new P,Mo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Js,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Lu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lu),Du.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Du),e.updateMatrixWorld(),Ja.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ja)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var ku=new ie,Hs=new P,Ka=new P,bl=class extends Mo{constructor(){super(new Se(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ht(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Hs),Ka.copy(n.position),Ka.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ka),n.updateMatrixWorld(),i.makeTranslation(-Hs.x,-Hs.y,-Hs.z),ku.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ku)}},xs=class extends nr{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new bl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ml=class extends Mo{constructor(){super(new ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},En=class extends nr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Ml}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Ul="\\[\\]\\.:\\/",by=new RegExp("["+Ul+"]","g"),Ol="[^"+Ul+"]",My="[^"+Ul.replace("\\.","")+"]",wy=/((?:WC+[\/:])*)/.source.replace("WC",Ol),Sy=/(WCOD+)?/.source.replace("WCOD",My),Ey=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ol),Ty=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ol),Ay=new RegExp("^"+wy+Sy+Ey+Ty+"$"),Ry=["material","materials","bones","map"],wl=class{constructor(t,e,n){let i=n||be.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},be=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(by,"")}static parseTrackName(t){let e=Ay.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Ry.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[i];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};be.Composite=wl;be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};be.prototype.GetterByBindingType=[be.prototype._getValue_direct,be.prototype._getValue_array,be.prototype._getValue_arrayElement,be.prototype._getValue_toArray];be.prototype.SetterByBindingTypeAndVersioning=[[be.prototype._setValue_direct,be.prototype._setValue_direct_setNeedsUpdate,be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[be.prototype._setValue_array,be.prototype._setValue_array_setNeedsUpdate,be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[be.prototype._setValue_arrayElement,be.prototype._setValue_arrayElement_setNeedsUpdate,be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[be.prototype._setValue_fromArray,be.prototype._setValue_fromArray_setNeedsUpdate,be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var gv=new Float32Array(1);var Uu=new ie,ui=class{constructor(t,e,n=0,i=1/0){this.ray=new qs(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Zs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Uu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uu),this}intersectObject(t,e=!0,n=[]){return Sl(t,this,n,e),n.sort(Ou),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Sl(t[i],this,n,e);return n.sort(Ou),n}};function Ou(s,t){return s.distance-t.distance}function Sl(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Sl(r[o],t,e,!0)}}var wo=class extends tr{constructor(t=10,e=10,n=4473924,i=8947848){n=new St(n),i=new St(i);let r=e/2,o=t/e,a=t/2,c=[],l=[];for(let d=0,f=0,g=-a;d<=e;d++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);let y=d===r?n:i;y.toArray(l,f),f+=3,y.toArray(l,f),f+=3,y.toArray(l,f),f+=3,y.toArray(l,f),f+=3}let u=new _e;u.setAttribute("position",new ne(c,3)),u.setAttribute("color",new ne(l,3));let h=new ps({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var Tn=class extends Error{constructor(t,e){super(e?.message||"Request failed"),this.status=t,this.code=e?.error||"ERROR",this.data=e||{}}};async function od(s,t,e,n={}){let i;try{i=await fetch(t,{method:s,credentials:"same-origin",headers:e!==void 0&&!n.raw?{"content-type":"application/json",...n.headers||{}}:n.headers||{},body:n.raw?e:e!==void 0?JSON.stringify(e):void 0})}catch{throw new Tn(0,{error:"NETWORK",message:"Cannot reach the server. Check your connection."})}let r=null;try{r=await i.json()}catch{}if(!i.ok)throw new Tn(i.status,r||{message:`Server error (${i.status})`});return r}var zt=s=>od("GET",s),ct=(s,t={})=>od("POST",s,t),xt=s=>"\u20A6"+Math.round(s).toLocaleString("en-NG"),et=(s,t=document)=>t.querySelector(s),Nl=(s,t=document)=>[...t.querySelectorAll(s)];function p(s,t={},...e){let n=document.createElement(s);for(let[i,r]of Object.entries(t||{}))i==="class"?n.className=r:i.startsWith("on")?n.addEventListener(i.slice(2),r):r!==!1&&r!=null&&n.setAttribute(i,r===!0?"":r);for(let i of e.flat())i!=null&&i!==!1&&n.append(i.nodeType?i:document.createTextNode(String(i)));return n}function cd(s,t=!1){let e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,c=new _e,l=0;for(let u=0;u<s.length;++u){let h=s[u],d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(e){let u=0,h=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=s[d].attributes.position.count}c.setIndex(h)}for(let u in r){let h=ad(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(let u in o){let h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){let f=[];for(let y=0;y<o[u].length;++y)f.push(o[u][y][d]);let g=ad(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function ad(s){let t,e,n,i=-1,r=0;for(let l=0;l<s.length;++l){let u=s[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new Te(o,e,n),c=0;for(let l=0;l<s.length;++l){let u=s[l];if(u.isInterleavedBufferAttribute){let h=c/e;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<e;g++){let y=u.getComponent(d,g);a.setComponent(d+h,g,y)}}else o.set(u.array,c);c+=u.count*e}return i!==void 0&&(a.gpuType=i),a}function _s(s){return function(){s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Ao=new St,zl=new ie,Ro=new tn,Co=new en,Io=new P,Po=new P,Ue=class{constructor(t=1,e=.035){this.parts=[],this.rnd=_s(t),this.jit=e,this.uvScale=.14}_col(t,e){Ao.set(t);let n=1+(this.rnd()*2-1)*(e??this.jit);return[Ao.r*n,Ao.g*n,Ao.b*n]}_push(t,e,n,i,r,o={}){t.index&&(t=t.toNonIndexed()),Co.set(o.rx||0,o.ry||0,o.rz||0,"YXZ"),Ro.setFromEuler(Co),Io.set(e,n,i),Po.set(o.sx??1,o.sy??1,o.sz??1),zl.compose(Io,Ro,Po),t.applyMatrix4(zl);let a=t.attributes.position,c=t.attributes.normal,l=a.count,u=new Float32Array(l*3),h=t.attributes.uv&&o.keepUV?null:new Float32Array(l*2),[d,f,g]=this._col(r,o.jit);for(let y=0;y<l;y++){let x=1;if(!o.noAO&&Math.abs(c.getY(y))<.5&&(x=.8+.2*Math.min(1,Math.max(0,a.getY(y)/2.4))),o.shade&&(x*=o.shade),u[y*3]=d*x,u[y*3+1]=f*x,u[y*3+2]=g*x,h){let m=Math.abs(c.getX(y)),v=Math.abs(c.getY(y)),M=Math.abs(c.getZ(y)),_=a.getX(y),k=a.getY(y),A=a.getZ(y),C,I;v>=m&&v>=M?(C=_,I=A):m>=M?(C=A,I=k):(C=_,I=k),h[y*2]=C*this.uvScale,h[y*2+1]=I*this.uvScale}}t.setAttribute("color",new Te(u,3)),h&&t.setAttribute("uv",new Te(h,2));for(let y of Object.keys(t.attributes))["position","normal","color","uv"].includes(y)||t.deleteAttribute(y);return this.parts.push(t),this}box(t,e,n,i,r,o,a,c){return this._push(new Xt(t,e,n),i,r+e/2,o,a,c)}cyl(t,e,n,i,r,o,a,c,l){return this._push(new Fe(t,e,n,i),r,o+n/2,a,c,l)}wheel(t,e,n,i,r,o,a={}){return this._push(new Fe(t,t,e,10),n,i,r,o,{...a,rx:Math.PI/2,noAO:!0})}sphere(t,e,n,i,r,o={}){return this._push(new hi(t,o.ws||8,o.hs||6),e,n,i,r,o)}ico(t,e,n,i,r,o={}){return this._push(new ms(t,o.detail||0),e,n,i,r,o)}capsule(t,e,n,i,r,o,a={}){return this._push(new vo(t,e,3,8),n,i+t+e/2,r,o,a)}cone(t,e,n,i,r,o,a,c){return this.cyl(.001,t,e,n,i,r,o,a,c)}plane(t,e,n,i,r,o,a){return this._push(new ke(t,e),n,i,r,o,a)}gable(t,e,n,i,r,o,a,c={}){let l=t/2,u=e/2,h=[[-l,0,-u],[l,0,-u],[l,0,u],[-l,0,u],[0,n,-u],[0,n,u]],d=[[0,3,5,0,5,4],[1,4,5,1,5,2],[0,4,1],[3,2,5],[0,1,2,0,2,3]],f=[];for(let y of d)for(let x of y)f.push(...h[x]);let g=new _e;return g.setAttribute("position",new ne(f,3)),g.computeVertexNormals(),this._push(g,i,r,o,a,c)}quad(t,e,n,i,r,o={}){let a=new _e;return a.setAttribute("position",new ne([...t,...e,...n,...t,...n,...i],3)),a.computeVertexNormals(),this._push(a,0,0,0,r,o)}uvQuad(t,e,n,i,r,o=16777215,a={}){let c=new _e;c.setAttribute("position",new ne([...t,...e,...n,...t,...n,...i],3));let[l,u,h,d,f,g,y,x]=r;return c.setAttribute("uv",new ne([l,u,h,d,f,g,l,u,f,g,y,x],2)),c.computeVertexNormals(),this._push(c,0,0,0,o,{...a,keepUV:!0,noAO:!0})}addGeo(t,e,n,i,r=0){let o=t.clone();return Co.set(0,r,0),Ro.setFromEuler(Co),Io.set(e,n,i),Po.set(1,1,1),o.applyMatrix4(zl.compose(Io,Ro,Po)),this.parts.push(o),this}build(){if(!this.parts.length)return new _e;let t=cd(this.parts,!1);return this.parts.forEach(e=>e.dispose()),this.parts=[],t.computeBoundingSphere(),t.computeBoundingBox(),t}};var Xn=(s,t)=>{let e=document.createElement("canvas");return e.width=s,e.height=t,e};function Fl(s){let t=s;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Yn=(s,t=!1)=>{let e=new $n(s);return e.colorSpace=Ie,e.anisotropy=4,t&&(e.wrapS=e.wrapT=Bn),e};function ld(){let t=Xn(128,128),e=Xn(128,128),n=t.getContext("2d"),i=e.getContext("2d");n.fillStyle="#ffffff",n.fillRect(0,0,128,128),i.fillStyle="#000",i.fillRect(0,0,128,128);let r=(o,a)=>{o.fillStyle=a,o.fillRect(34,30,60,56)};return r(n,"#6f8796"),n.fillStyle="rgba(0,0,0,.18)",n.fillRect(34,30,60,3),n.fillRect(34,83,60,3),n.fillRect(62,30,4,56),n.fillStyle="rgba(0,0,0,.08)",n.fillRect(0,118,128,10),r(i,"#ffd27a"),{map:Yn(t,!0),emissiveMap:Yn(e,!0)}}function hd(){let s=Xn(64,256),t=s.getContext("2d"),e=Fl(3);t.fillStyle="#34373c",t.fillRect(0,0,64,256);for(let i=0;i<500;i++){let r=40+e()*30;t.fillStyle=`rgb(${r},${r+2},${r+5})`,t.fillRect(e()*64,e()*256,1+e()*2,1+e()*2)}t.fillStyle="#e8e6df",t.fillRect(2,0,2,256),t.fillRect(60,0,2,256),t.fillStyle="#f2c744";for(let i=0;i<256;i+=64)t.fillRect(30,i+8,4,36);return Yn(s,!0)}function ud(){let s=Xn(128,128),t=s.getContext("2d"),e=Fl(8);t.fillStyle="#b9b5a6",t.fillRect(0,0,128,128);for(let n=0;n<700;n++){let i=150+e()*60;t.fillStyle=`rgba(${i},${i-4},${i-14},.5)`,t.fillRect(e()*128,e()*128,1+e()*3,1+e()*3)}t.strokeStyle="rgba(80,76,66,.35)",t.lineWidth=1;for(let n=0;n<=128;n+=32)t.beginPath(),t.moveTo(n,0),t.lineTo(n,128),t.moveTo(0,n),t.lineTo(128,n),t.stroke();return Yn(s,!0)}function dd(){let s=Xn(256,256),t=s.getContext("2d"),e=Fl(12);t.fillStyle="#2b6f8a",t.fillRect(0,0,256,256);for(let n=0;n<160;n++){t.strokeStyle=`rgba(255,255,255,${.05+e()*.12})`,t.lineWidth=1+e()*2;let i=e()*256,r=e()*256;t.beginPath(),t.moveTo(i,r),t.quadraticCurveTo(i+14,r-5,i+30,r),t.stroke()}return Yn(s,!0)}function Lo(){let s=Xn(64,64),t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,.55)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Yn(s)}function fd(s,t="#ffffff"){let e=Xn(256,64),n=e.getContext("2d");n.font="700 30px Nunito, system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle";let i=Math.min(244,n.measureText(s).width+24);n.fillStyle="rgba(0,0,0,.55)",n.beginPath(),n.roundRect(128-i/2,10,i,44,14),n.fill(),n.fillStyle=t,n.fillText(s,128,33);let r=new $n(e);return r.colorSpace=Ie,r}function pd(s,t,e,n="Advertise here: /advertise",i=0){let r=Xn(s,t),o=r.getContext("2d"),a=[["#0b6b3a","#f6c744"],["#1e3a8a","#fb923c"],["#7c2d12","#fde68a"],["#14532d","#ffffff"]],[c,l]=a[i%a.length],u=o.createLinearGradient(0,0,s,t);u.addColorStop(0,c),u.addColorStop(1,"#0a0a0a"),o.fillStyle=u,o.fillRect(0,0,s,t),o.fillStyle=l,o.globalAlpha=.12;for(let h=0;h<8;h++)o.beginPath(),o.arc(s*(h/7),t*.9,t*.35,0,7),o.fill();return o.globalAlpha=1,o.fillStyle=l,o.textAlign="center",o.font=`800 ${Math.round(t*.2)}px "Lilita One", Nunito, sans-serif`,o.fillText("YOUR AD HERE",s/2,t*.42),o.fillStyle="#fff",o.font=`700 ${Math.round(t*.085)}px Nunito, sans-serif`,o.fillText(n,s/2,t*.58),o.font=`600 ${Math.round(t*.06)}px Nunito, sans-serif`,o.globalAlpha=.75,o.fillText(e,s/2,t*.72),o.globalAlpha=1,o.fillStyle="rgba(255,255,255,.85)",o.font=`700 ${Math.round(t*.05)}px Nunito, sans-serif`,o.textAlign="right",o.fillText("House ad",s-14,t-12),Yn(r)}function md(s,t,e,n){let i=Xn(t,e),r=i.getContext("2d");return r.fillStyle="#111",r.fillRect(0,0,t,e),r.drawImage(s,0,0,t,e),r.fillStyle="rgba(0,0,0,.6)",r.fillRect(t-190,e-36,190,36),r.fillStyle="#fff",r.font="700 20px Nunito, sans-serif",r.textAlign="right",r.fillText("Sponsored \xB7 "+String(n||"").slice(0,14),t-10,e-11),Yn(i)}function gd(s,t){return Yn(s,t)}var qn=s=>s.pts?s.pts:[[s.x1,s.z1],[s.x2,s.z2]],An=s=>!!s.pts,Bl=s=>{let t=0;for(let e=1;e<s.length;e++)t+=Math.hypot(s[e][0]-s[e-1][0],s[e][1]-s[e-1][1]);return t},xd=s=>{let t=qn(s),e=Bl(t);return Hl(t,e/2)};function Hl(s,t){let e=0;for(let n=1;n<s.length;n++){let i=Math.hypot(s[n][0]-s[n-1][0],s[n][1]-s[n-1][1]);if(e+i>=t||n===s.length-1){let r=i?Math.min(1,(t-e)/i):0;return[s[n-1][0]+(s[n][0]-s[n-1][0])*r,s[n-1][1]+(s[n][1]-s[n-1][1])*r,Math.atan2(s[n][1]-s[n-1][1],s[n][0]-s[n-1][0])]}e+=i}return[s[0][0],s[0][1],0]}function Cy(s,t,e,n){let i=n[0]-e[0],r=n[1]-e[1],o=i*i+r*r,a=o?Math.max(0,Math.min(1,((s-e[0])*i+(t-e[1])*r)/o)):0,c=e[0]+i*a,l=e[1]+r*a;return{d:Math.hypot(s-c,t-l),t:a,x:c,z:l}}function Vl(s,t,e){let n={d:1/0,s:0,x:0,z:0},i=0;for(let r=1;r<s.length;r++){let o=Cy(t,e,s[r-1],s[r]),a=Math.hypot(s[r][0]-s[r-1][0],s[r][1]-s[r-1][1]);o.d<n.d&&(n={d:o.d,s:i+o.t*a,x:o.x,z:o.z}),i+=a}return n}function Gl(s,t,e,n=0){for(let i of s.roundabouts||[]){let r=Math.hypot(t-i.x,e-i.z);if(r<=i.outerR+n&&r>=(i.islandR||0)-n)return{kind:"roundabout",id:i.id,name:i.name,ra:i}}for(let i of s.roads){let r=Vl(qn(i),t,e);if(r.d<=i.width/2+n)return{kind:An(i)?"curve":"road",id:i.id,name:i.name,road:i,s:r.s}}return null}function sr(s,t,e=!1){let n=s.length,i=[];for(let r=0;r<n;r++){let o=s[r],a=e?s[(r+n-1)%n]:s[Math.max(0,r-1)],c=e?s[(r+1)%n]:s[Math.min(n-1,r+1)],l=c[0]-a[0],u=c[1]-a[1],h=Math.hypot(l,u)||1;l/=h,u/=h,i.push([o[0]-u*t,o[1]+l*t])}return i}function yd(s,t,e=!0){let n=s.length,i=s[e?(t+n-1)%n:Math.max(0,t-1)],r=s[t],o=s[e?(t+1)%n:Math.min(n-1,t+1)],a=Math.hypot(r[0]-i[0],r[1]-i[1]),c=Math.hypot(o[0]-r[0],o[1]-r[1]),l=Math.hypot(i[0]-o[0],i[1]-o[1]),u=Math.abs((r[0]-i[0])*(o[1]-i[1])-(r[1]-i[1])*(o[0]-i[0]));return u<1e-9?1/0:a*c*l/(2*u)}var di={rTight:7,rFree:40,slowMin:.55},vd=s=>s>=di.rFree?1:s<=di.rTight?di.slowMin:di.slowMin+(1-di.slowMin)*(s-di.rTight)/(di.rFree-di.rTight);var Do=(s,t,e)=>new St(s).lerp(new St(t),e);function Iy(s,t,e="#fff",n=512,i=128){let r=document.createElement("canvas");r.width=n,r.height=i;let o=r.getContext("2d");o.fillStyle=t,o.fillRect(0,0,n,i),o.strokeStyle="rgba(255,255,255,.7)",o.lineWidth=6,o.strokeRect(6,6,n-12,i-12),o.fillStyle=e,o.textAlign="center",o.textBaseline="middle";let a=62;for(o.font=`${a}px "Lilita One", Nunito, sans-serif`;o.measureText(s).width>n-40&&a>18;)a-=4,o.font=`${a}px "Lilita One", Nunito, sans-serif`;return o.fillText(s,n/2,i/2+3),gd(r)}function _d(s){let t=new Mn,e=new Gt;t.add(e);let n=[],i={},r={},o=[],a=new Sn(14675967,7036746,.9);t.add(a);let c=new En(16773590,1.4);c.position.set(120,200,80),t.add(c);let l=new te({vertexColors:!0}),u=ld(),h=new te({vertexColors:!0,map:u.map,emissive:16777215,emissiveMap:u.emissiveMap,emissiveIntensity:0}),d=S=>{let Z=new Ue(S,.04);return Z.uvScale=1/3.4,Z},f=new Ue(7,.03),g=d(11),y=new Ue(5,0),x=_s(99),m=s.bounds,v=ud();v.repeat.set(60,60);let M=new ot(new ke(900,900).rotateX(-Math.PI/2),new te({map:v,color:13617590}));M.position.set(0,-.02,-60),e.add(M);for(let S of s.zones)f.box(S.x1-S.x0+6,.2,S.z1-S.z0+6,(S.x0+S.x1)/2,-.02,(S.z0+S.z1)/2,12433318,{noAO:!0,jit:.02});let _=hd(),k=[];for(let S of s.roads){if(An(S))continue;let Z=Math.hypot(S.x2-S.x1,S.z2-S.z1),at=Math.abs(S.x2-S.x1)>Math.abs(S.z2-S.z1),L=_.clone();L.needsUpdate=!0,L.repeat.set(1,Z/56);let kt=new ot(new ke(S.width,Z).rotateX(-Math.PI/2),new te({map:L}));kt.position.set((S.x1+S.x2)/2,.02+(at?0:.005),(S.z1+S.z2)/2),at&&(kt.rotation.y=Math.PI/2),e.add(kt)}let A=(S,Z,at,L,kt)=>{let Rt=sr(S,-Z/2,!1),ft=sr(S,Z/2,!1),_t=[],Vt=[],wt=[],R=0;for(let q=0;q<S.length;q++)if(q&&(R+=Math.hypot(S[q][0]-S[q-1][0],S[q][1]-S[q-1][1])),_t.push(Rt[q][0],at,Rt[q][1],ft[q][0],at,ft[q][1]),Vt.push(0,R/kt,1,R/kt),q){let Q=q*2;wt.push(Q-2,Q,Q-1,Q-1,Q,Q+1)}let b=new _e;b.setAttribute("position",new ne(_t,3)),b.setAttribute("uv",new ne(Vt,2)),b.setIndex(wt),b.computeVertexNormals();let F=new ot(b,L);return e.add(F),F},C=new te({color:12170138}),I=[];for(let S of s.roads){if(!An(S))continue;let Z=_.clone();Z.needsUpdate=!0,Z.repeat.set(1,1);let at=new te({map:Z,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});I.push(at),A(qn(S),S.width+1.6,.085,C,56),A(qn(S),S.width,.09,at,56)}let E=s.roundabouts||[],w=new te({color:3422012,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});for(let S of E){let Z=new dn(S.islandR,S.outerR,48,1).rotateX(-Math.PI/2),at=new ot(Z,w);at.position.set(S.x,.09,S.z),e.add(at),f.cyl(S.islandR+.6,S.islandR+.6,.35,20,S.x,.08,S.z,12170138,{noAO:!0}),f.cyl(S.islandR-.2,S.islandR-.2,.42,20,S.x,.08,S.z,5212741,{noAO:!0});let L=(S.outerR+S.islandR)/2;for(let Rt=0;Rt<18;Rt++){let ft=Rt/18*Math.PI*2;f.box(.25,.04,2.2,S.x+Math.cos(ft)*L,.1,S.z+Math.sin(ft)*L,15913532,{noAO:!0,jit:0,ry:-ft})}for(let Rt=0;Rt<4;Rt++){let ft=Rt/4*Math.PI*2+Math.PI/4;f.box(1.3,.5,.5,S.x+Math.cos(ft)*(S.islandR+.6),.2,S.z+Math.sin(ft)*(S.islandR+.6),16777215,{noAO:!0,jit:0,ry:-ft})}tt(f,S.x,S.z,.8);let kt=S.islandR*.62;n.push({id:S.id,h:1.2,x0:S.x-kt,x1:S.x+kt,z0:S.z-kt,z1:S.z+kt})}let D=(S,Z)=>E.some(at=>Math.hypot(S-at.x,Z-at.z)<1),H=s.roads.filter(S=>!An(S)&&S.x1===S.x2).map(S=>S.x1),B=s.roads.filter(S=>!An(S)&&S.z1===S.z2).map(S=>S.z1);for(let S of H)for(let Z of B)if(!D(S,Z)){f.box(14,.05,14,S,0,Z,3422012,{noAO:!0,jit:0});for(let at=-3;at<=3;at++)for(let[L,kt,Rt,ft]of[[0,-8.5,1,3],[0,8.5,1,3],[-8.5,0,3,1],[8.5,0,3,1]])f.box(Rt,.06,ft,S+L+(L===0?at*1.8:0),0,Z+kt+(kt===0?at*1.8:0),15658730,{noAO:!0,jit:0})}for(let S of s.zones)for(let Z=S.x0+12;Z<S.x1-6;Z+=38)for(let at of[S.z0+2,S.z1-2])X(f,Z,at);function X(S,Z,at){S.cyl(.12,.16,6.5,6,Z,0,at,3882821,{noAO:!0}),S.box(1.4,.18,.3,Z,6.4,at,3882821,{noAO:!0}),S.box(.6,.16,.4,Z+.55,6.22,at,16773296,{noAO:!0,jit:0})}function tt(S,Z,at,L=1){let kt=7*L;S.cyl(.22*L,.35*L,kt,6,Z,0,at,9071173,{noAO:!0});for(let Rt=0;Rt<7;Rt++){let ft=Rt/7*Math.PI*2;S.box(.5*L,.1,3.4*L,Z+Math.cos(ft)*1.6*L,kt+.1,at+Math.sin(ft)*1.6*L,3116858,{ry:-ft+Math.PI/2,rx:.5,noAO:!0})}}for(let S=-230;S<240;S+=24)tt(f,S,148+(x()*6-3),.9+x()*.5);for(let S=0;S<40;S++){let Z=s.zones[x()*12|0];if(!Z)continue;let at=Z.x0+3+x()*(Z.x1-Z.x0-6),L=Z.z0+(x()<.5?3:Z.z1-Z.z0-3);L<140&&tt(f,at,L,.7+x()*.4)}let Y=[],nt=(S,Z,at,L,kt,Rt,ft,_t)=>{let Vt=new ot(new ke(Rt,ft),new re({map:Iy(S,Z),side:vn}));return Vt.position.set(at,L,kt),Vt.rotation.y=Math.atan2(_t[0],_t[1]),e.add(Vt),Y.push(Vt),Vt},W=(S,Z=.08)=>[S.x+S.face[0]*(S.w/2+Z),S.z+S.face[1]*(S.d/2+Z)];for(let S of s.buildings){let Z=S.w/2,at=S.d/2;n.push({id:S.id,h:S.h,x0:S.x-Z-.6,x1:S.x+Z+.6,z0:S.z-at-.6,z1:S.z+at+.6});let[L,kt]=S.face,Rt=Math.atan2(L,kt);if(S.kind==="house"){if(g.box(S.w,S.h,S.d,S.x,0,S.z,S.color),S.tier===1){f.box(S.w+.6,.5,S.d+.6,S.x,S.h,S.z,7040368);for(let R=0;R<3;R++)f.box(1.2,1.4,1.2,S.x-S.w/3+R*(S.w/3),S.h+.5,S.z-S.d/4,3100527)}else f.gable(S.w+1.2,S.d+1.2,S.tier===3?3.4:2.6,S.x,S.h,S.z,S.roof);let[ft,_t]=W(S,.04),Vt=1.9;f.box(Math.abs(kt)>0?Vt:.3,2.8,Math.abs(kt)>0?.3:Vt,ft,0,_t,4861724,{noAO:!0}),f.box(Math.abs(kt)>0?3.4:1.6,.3,Math.abs(kt)>0?1.6:3.4,ft+L*.8,0,_t+kt*.8,11117462,{noAO:!0}),S.tier===3&&f.box(Math.abs(kt)>0?S.w*.5:2,.25,Math.abs(kt)>0?2:S.d*.5,S.x+L*(Z+.8),S.h*.62,S.z+kt*(at+.8),12038821,{noAO:!0})}else if(S.kind==="tower")g.box(S.w,S.h,S.d,S.x,0,S.z,S.color),f.box(S.w*.7,3,S.d*.7,S.x,S.h,S.z,5990256),f.cyl(.2,.3,14,5,S.x,S.h+3,S.z,11580858,{noAO:!0}),f.box(.8,.8,.8,S.x,S.h+17,S.z,16726832,{noAO:!0,jit:0}),f.box(S.w+.4,1.4,S.d+.4,S.x,0,S.z,4936538,{noAO:!0});else if(S.kind==="shop"){g.box(S.w,S.h,S.d,S.x,0,S.z,S.color),f.box(S.w+.8,.4,S.d+.8,S.x,S.h,S.z,9080724);let[ft,_t]=W(S,.6);f.box(Math.abs(kt)?S.w-2:2.6,.3,Math.abs(kt)?2.6:S.d-2,ft,3.9,_t,13646123,{noAO:!0});let[Vt,wt]=W(S,.12);nt(S.label,S.sign||"#2c6fbb",Vt,5.4,wt,Math.min(S.w-3,16),2.6,S.face);let[R,b]=W(S,.05);y.box(Math.abs(kt)?4:.2,2.6,Math.abs(kt)?.2:4,R,.2,b,10274777,{noAO:!0,jit:0})}else if(S.kind==="market"){for(let wt of[-1,1])for(let R of[-1,1])f.cyl(.25,.25,4.4,6,S.x+wt*(Z-1),0,S.z+R*(at-1),7162945,{noAO:!0});f.box(S.w+1,.4,S.d+1,S.x,4.4,S.z,12554031,{noAO:!0});let ft=[14172949,2001125,4431943,16635957,9315498,16011550];for(let wt=0;wt<12;wt++){let R=S.x-Z+3+wt%4*((S.w-6)/3),b=S.z-at+5+Math.floor(wt/4)*((S.d-10)/2);f.box(3.4,1,1.8,R,0,b,ft[wt%ft.length]),f.box(3.8,.12,2.2,R,2.6,b,ft[(wt+2)%ft.length],{noAO:!0})}let[_t,Vt]=W(S,.5);nt("BALOGUN-STYLE MARKET","#8d3b13",_t,5.9,Vt,22,2.4,S.face)}else if(S.kind==="office"||S.kind==="kiosk"){if(g.box(S.w,S.h,S.d,S.x,0,S.z,S.color),f.box(S.w+.6,.3,S.d+.6,S.x,S.h,S.z,7040368),S.label){let[ft,_t]=W(S,.12);nt(S.label,"#0b6b3a",ft,S.h-1.3,_t,Math.min(S.w-1,14),2.2,S.face)}}else if(S.kind==="airport"){g.box(S.w,S.h,S.d,S.x,0,S.z,S.color),f.box(S.w+6,.8,S.d+6,S.x,S.h,S.z,8951203),f.box(S.w*.9,2.2,3,S.x,3,S.z+S.d/2+.3,4877190,{noAO:!0}),f.box(8,26,8,S.x+S.w/2+12,0,S.z-6,13620957),f.box(12,6,12,S.x+S.w/2+12,26,S.z-6,7311272);let[ft,_t]=W(S,.12);nt("AIRPORT (placeholder)","#124d8a",ft,S.h+4,_t,40,4,S.face)}}let ut=s.landmarks.find(S=>S.id==="plaza");if(ut){let S=ut.x-52,Z=ut.z-52;f.box(30,.3,30,S,0,Z,14143421,{noAO:!0}),f.cyl(5,5.5,.9,16,S,.3,Z,9411235),f.cyl(.5,.7,3.5,8,S,.3,Z,9411235),f.cyl(2.2,.6,.5,12,S,3.7,Z,8376808,{noAO:!0});for(let at of[0,1,2,3])f.box(3,.6,1,S+Math.cos(at*1.57)*9,.3,Z+Math.sin(at*1.57)*9,7162945,{ry:-at*1.57});f.cyl(.12,.12,14,6,S+12,.3,Z-12,14540253,{noAO:!0});for(let[at,L]of[[0,34641],[1,16777215],[2,34641]])f.box(.15,1.5,1.1,S+12+.1,11,Z-12-.55+at*1.1,L,{noAO:!0,jit:0});o.push({text:ut.name,x:S,z:Z})}let Mt=new te({color:2106154});for(let S of s.billboards){let Z=new Gt;Z.position.set(S.x,0,S.z),Z.rotation.y=Math.atan2(S.nx,S.nz),e.add(Z);let at=S.y,L=Vt=>{let wt=new ot(new Fe(.3,.38,at+S.h/2,8),Mt);wt.position.set(Vt,(at+S.h/2)/2,-.4),Z.add(wt)};L(-S.w*.3),L(S.w*.3);let kt=new ot(new Xt(S.w+.9,S.h+.9,.5),Mt);kt.position.set(0,at,0),Z.add(kt);let Rt=new re({color:16777215}),ft=new ot(new ke(S.w,S.h),Rt);ft.position.set(0,at,.27),Z.add(ft);let _t=new ot(new Xt(S.w+1.2,.25,.9),Mt);if(_t.position.set(0,at+S.h/2+.55,.05),Z.add(_t),S.surface==="lagoon_plot"){let Vt=new ot(new Xt(S.w+4,1.4,5),new te({color:9141602}));Vt.position.set(0,-.2,-.4),Z.add(Vt)}i[S.id]={def:S,group:Z,panel:ft,mat:Rt,current:null}}let It=dd();It.repeat.set(20,8);let Jt=new ot(new ke(s.water.maxX-s.water.minX,s.water.maxZ-s.water.minZ).rotateX(-Math.PI/2),new te({map:It,transparent:!0,opacity:.92}));Jt.position.set(0,-.5,(s.water.minZ+s.water.maxZ)/2),e.add(Jt),f.box(s.bounds.maxX-s.bounds.minX+40,1.2,4,0,-.9,m.maxZ-1,10130047,{noAO:!0});let ce=new Ue(31,.05);for(let S=0;S<26;S++){let Z=-420+S*34+x()*10;ce.box(14+x()*14,30+x()*70,14,Z,-2,-340-x()*40,8031651,{noAO:!0})}for(let S=0;S<20;S++){let Z=-330+S*34;ce.box(26,1.6,6,Z,12,310,9080210,{noAO:!0}),S%4===0&&ce.box(2,26,2,Z,-2,310,9080210,{noAO:!0})}let J=new ot(ce.build(),new te({vertexColors:!0,fog:!0}));e.add(J);for(let[S,Z]of[[f,l],[g,h],[y,l]]){let at=S.build();at.attributes.position&&e.add(new ot(at,Z))}let st=new wn(.8,1.6,4).rotateX(Math.PI);for(let S of s.properties){let Z=new ot(st,new re({color:3523691}));Z.position.set(S.door.x,5.2,S.door.z),e.add(Z),r[S.id]=Z}let Ct={available:3523691,taken:9080728,yours:16761358},pt={x:.004},Ft=new St("#9fd3ee");t.fog=new co(Ft,140,520);let Ht=0;return{scene:t,colliders:n,boards:i,doorMarkers:r,labels:o,root:e,setMarkers(S){for(let Z of S){let at=r[Z.id];at&&at.material.color.setHex(Ct[Z.status]||3523691)}},setTime(S){let at=(S/1440-.25)*Math.PI*2,L=Math.sin(at),kt=Math.max(0,Math.min(1,L*1.8+.25));Ht=1-kt;let Rt=Math.max(0,1-Math.abs(L)*3.2),ft=Do(Do("#0a1230","#8fd0f5",kt),"#f08a4b",Rt*.7);return t.background=ft,t.fog.color.copy(ft),c.intensity=.15+kt*1.4,c.color.set(Do("#fff1d6","#ff9a55",Rt)),c.position.set(Math.cos(at)*200,Math.max(30,Math.sin(at)*220),80),a.intensity=.35+kt*.65,a.color.set(Do("#2b3a6b","#dfefff",kt)),h.emissiveIntensity=Ht*.95,{day:kt,night:Ht}},animate(S){It.offset.x+=S*.004,It.offset.y+=S*.002},get night(){return Ht}}}function Wl(s,t=7,e={}){let n=s.length,i=[];if(e.dense)i=s.map(l=>[l[0],l[1]]);else for(let l=0;l<n;l++){let u=s[(l+n-1)%n],h=s[l],d=s[(l+1)%n],f=bd([u[0]-h[0],u[1]-h[1]]),g=bd([d[0]-h[0],d[1]-h[1]]),y=[h[0]+f[0]*t,h[1]+f[1]*t],x=[h[0]+g[0]*t,h[1]+g[1]*t];for(let m=0;m<=8;m++){let v=m/8;i.push([(1-v)*(1-v)*y[0]+2*(1-v)*v*h[0]+v*v*x[0],(1-v)*(1-v)*y[1]+2*(1-v)*v*h[1]+v*v*x[1]])}}let r=i.length,o=i.map((l,u)=>e.slow?vd(yd(i,u,!0)):1),a=[0],c=[0];for(let l=1;l<=r;l++){let u=i[l-1],h=i[l%r],d=Math.hypot(h[0]-u[0],h[1]-u[1]);c.push(c[l-1]+d),a.push(a[l-1]+d/((o[l-1]+o[l%r])/2))}return{pts:i,cum:a,length:a[a.length-1],realLength:c[c.length-1],f:o}}var bd=s=>{let t=Math.hypot(s[0],s[1])||1;return[s[0]/t,s[1]/t]};function rr(s,t,e){t=(t%s.length+s.length)%s.length;let n=0,i=s.cum.length-1;for(;i-n>1;){let c=n+i>>1;s.cum[c]<=t?n=c:i=c}let r=s.pts[n],o=s.pts[(n+1)%s.pts.length],a=(t-s.cum[n])/Math.max(1e-6,s.cum[n+1]-s.cum[n]);return e.x=r[0]+(o[0]-r[0])*a,e.z=r[1]+(o[1]-r[1])*a,e.yaw=Math.atan2(-(o[1]-r[1]),o[0]-r[0]),e}var sn={shirts:[34641,16761358,16777215,14172949,2001125,11342935,6953882,3622735,16361509,3046706,14737632],trousers:[2899558,2040616,4864810,5990256,3820079,7031354,2239044],skins:[9262372,13010498,7029286,4860951,10512698,8014378],hair:[1118481,1708552,2759184,3811864,1118481,12623968],caps:[14172949,2001125,3046706,16761358,16777215],legLen:.82,swing:.55,armSwing:.5},bs=(s,t,e,n,i,r)=>new Xt(s,t,e).translate(n,i,r),Ms=class{constructor(t,e,n=5){this.count=e,this.scene=t;let i={legL:bs(.2,sn.legLen,.2,0,-sn.legLen/2,0),legR:bs(.2,sn.legLen,.2,0,-sn.legLen/2,0),torso:bs(.3,.62,.56,0,.31,0),armL:bs(.15,.6,.15,0,-.3,0),armR:bs(.15,.6,.15,0,-.3,0),head:new hi(.2,7,5).translate(0,.2,0),hair:bs(.4,.14,.4,0,0,0)};this.parts={};for(let c of Object.keys(i)){let l=new uo(i[c],new te,e);l.frustumCulled=!1,l.instanceMatrix.setUsage(Ju),t.add(l),this.parts[c]=l}let r=(()=>{let c=n>>>0;return()=>{c=c+1831565813>>>0;let l=c;return l=Math.imul(l^l>>>15,l|1),l^=l+Math.imul(l^l>>>7,l|61),((l^l>>>14)>>>0)/4294967296}})(),o=c=>c[r()*c.length|0],a=new St;this.look=[];for(let c=0;c<e;c++){let l=o(sn.shirts),u=o(sn.trousers),h=o(sn.skins),d=r()<.22,f=o(d?sn.caps:sn.hair);this.look.push({scale:.9+r()*.22,wide:.92+r()*.2,capOn:d}),this.parts.legL.setColorAt(c,a.setHex(u)),this.parts.legR.setColorAt(c,a.setHex(u)),this.parts.torso.setColorAt(c,a.setHex(l)),this.parts.armL.setColorAt(c,a.setHex(r()<.5?l:h)),this.parts.armR.setColorAt(c,a.setHex(r()<.5?l:h)),this.parts.head.setColorAt(c,a.setHex(h)),this.parts.hair.setColorAt(c,a.setHex(f))}for(let c in this.parts)this.parts[c].instanceColor&&(this.parts[c].instanceColor.needsUpdate=!0);this._base=new ie,this._m=new ie,this._r=new ie,this._q=new tn,this._p=new P,this._s=new P,this._up=new P(0,1,0)}pose(t,e,n,i,r,o=0,a=1,c=!1){let l=this.look[t],u=this.parts,h=this._base,d=this._m,f=this._r,g=l.scale;this._q.setFromAxisAngle(this._up,r),this._p.set(e,n,i),this._s.set(g,g,g*l.wide),h.compose(this._p,this._q,this._s);let y=c?0:Math.sin(o)*sn.swing*a,x=c?0:Math.sin(o)*sn.armSwing*a,m=sn.legLen,v=c?0:Math.abs(Math.sin(o))*.04*a,M=(_,k,A,C,I)=>{d.makeTranslation(k,A+v,C),I&&(f.makeRotationZ(I),d.multiply(f)),d.premultiply(h),_.setMatrixAt(t,d)};M(u.legL,0,m,-.11,y),M(u.legR,0,m,.11,-y),M(u.torso,0,m,0,0),M(u.armL,0,m+.58,-.36,-x),M(u.armR,0,m+.58,.36,x),M(u.head,.01,m+.62,0,0),M(u.hair,l.capOn?.06:-.01,m+.62+.27,0,0)}commit(){for(let t in this.parts)this.parts[t].instanceMatrix.needsUpdate=!0}};var Li={lookAhead:14,halfWidth:2.2,stopGap:3.2,minGap:1.8,maxDecel:14,maxAccel:6,waitMin:2,waitMax:4,creepSpeed:1.2,ignoreCarsFor:3,catchUp:1.25,hornGapSpeed:5};function Md(s,t,e=Li){let n=Math.cos(s.yaw),i=-Math.sin(s.yaw),r=null;for(let o of t){if(o===s||o.self&&o.self===s)continue;let a=o.x-s.x,c=o.z-s.z,l=a*n+c*i;if(l<.2||l>e.lookAhead||Math.abs(-a*i+c*n)>e.halfWidth+(o.r||0))continue;let h=l-(o.r||0);(r==null||h<r.gap)&&(r={gap:h,person:!!o.person})}return r}function wd(s,t,e,n,i=Li){let r={v:s.v,wait:s.wait||0,ignoreT:Math.max(0,(s.ignoreT||0)-n),honk:!1,limit:s.limit??i.waitMin+(i.waitMax-i.waitMin)*.5};e&&!e.person&&r.ignoreT>0&&(e=null);let o=t;if(e){let c=e.gap-i.stopGap;o=c<=0?0:Math.min(t,Math.sqrt(2*i.maxDecel*.6*c)),r.v<.3&&(r.wait+=n,r.wait>=r.limit&&(e.person?(e.gap>i.minGap+.6&&(o=Math.min(t,i.creepSpeed)),r.honk=!s.honked):(r.ignoreT=i.ignoreCarsFor,r.wait=0)))}else r.wait=0;let a=o-r.v;return r.v+=Math.max(-i.maxDecel*n,Math.min(i.maxAccel*n,a)),r.v<0&&(r.v=0),e&&e.person&&(r.v=Math.min(r.v,Math.max(0,(e.gap-i.minGap)/Math.max(n,.001)))),r.honked=e?s.honked||r.honk:!1,r.braking=!!e&&o<t,r}function Sd(s,t={}){return s?{action:"yield",hit:s}:{action:"clear",hit:null}}var Py=1513499,fi=2634815,Ed=16761358;function Td(s,t,e,n=.4,i=.3){for(let r of t)for(let o of e)s.wheel(n,i,r,n,o,1710620),s.wheel(n*.5,i+.04,r,n,o,10133670)}function Ad(s){let t=new Ue(11+(s?s()*99|0:0),.02),e=4.9;Td(t,[1.55,-1.55],[.98,-.98],.42,.32),t.box(e,.85,2,0,.32,0,15313152),t.box(e,1.2,1.96,0,1.15,0,Ed),t.box(e+.02,.26,2.04,0,.98,0,Py),t.box(e-.4,.1,1.94,0,2.35,0,14260736);for(let n of[1,-1]){for(let i=0;i<4;i++)t.plane(1,.62,-1.7+i*1.15,1.72,n*1,fi,{ry:n>0?0:Math.PI,noAO:!0});t.box(.08,.5,.03,.2,1.45,n*.99,2236962)}t.quad([2.46,1.35,.9],[2.46,1.35,-.9],[2.46,2.25,-.8],[2.46,2.25,.8],fi,{noAO:!0}),t.quad([-2.46,1.35,-.9],[-2.46,1.35,.9],[-2.46,2.25,.8],[-2.46,2.25,-.8],fi,{noAO:!0}),t.box(.18,.28,2.1,2.45,.28,0,2237480),t.box(.18,.28,2.1,-2.45,.28,0,2237480);for(let n of[.7,-.7])t.box(.06,.2,.32,2.46,.78,n,16774348,{noAO:!0}),t.box(.06,.2,.3,-2.46,.78,n*1.1,15022389,{noAO:!0});return t.box(3.4,.05,1.7,-.2,2.46,0,3355443),t.box(1.1,.5,.8,-.9,2.5,.2,9268835),t.box(.9,.4,.7,.5,2.5,-.3,4157365),t.box(.5,.35,.5,1.2,2.5,.35,12986408),t.box(.1,.12,.9,2.2,2.36,0,1118481),t.build()}function Rd(s=Ed,t=1513499){let e=new Ue(21,.02);e.wheel(.3,.2,1.2,.3,0,1710620);for(let n of[.68,-.68])e.wheel(.3,.22,-.65,.3,n,1710620);e.box(2.1,.7,1.2,-.3,.3,0,s),e.box(.9,.8,.62,1.05,.3,0,s),e.quad([1.52,1.1,.3],[1.52,1.1,-.3],[1,1.75,-.3],[1,1.75,.3],fi,{noAO:!0});for(let n of[.58,-.58])e.box(.08,.95,.08,-.3+.5,1,n,t);for(let n of[.58,-.58])e.box(.08,.95,.08,-1.2,1,n,t);return e.box(2.3,.1,1.45,-.25,1.95,0,t),e.box(.7,.35,1,-.8,.9,0,5125166),e.box(.06,.16,.2,1.52,.7,0,16774348,{noAO:!0}),e.build()}function Cd(s){let t=new Ue(31+(s()*99|0),.03);t.wheel(.34,.12,.7,.34,0,1710620),t.wheel(.34,.14,-.7,.34,0,1710620),t.box(1.5,.12,.14,0,.45,0,2829099),t.box(.45,.28,.3,.22,.6,0,[12986408,1402304,16761358][s()*3|0]),t.box(.8,.1,.3,-.3,.68,0,2236962),t.box(.08,.5,.08,.6,.5,0,8947848),t.box(.1,.07,.7,.62,1,0,2236962);let e=[34641,16761358,15094016,1402304,16777215,6953882][s()*6|0];return t.capsule(.17,.35,-.2,.78,0,e,{rz:-.25}),t.sphere(.15,-.07,1.62,0,13010498,{noAO:!0}),t.sphere(.17,-.07,1.68,0,[1118481,16761358,12986408][s()*3|0],{sy:.85,noAO:!0}),t.box(.45,.14,.24,.08,.8,0,3622735),s()>.45&&(t.capsule(.17,.32,-.65,.75,0,[15277667,4149685,38536][s()*3|0],{rz:.1}),t.sphere(.14,-.62,1.55,0,9262372,{noAO:!0})),t.build()}function $l(s,t){let e=new Ue(41+(t&255),.02),n=s==="suv",i=s==="hatch",r=n?4.6:i?3.8:4.5,o=n?.95:.7;Td(e,[r*.32,-r*.32],[.82,-.82],n?.45:.37,.26),e.box(r,o,1.84,0,.3,0,t);let a=n?r*.68:i?r*.62:r*.5,c=n?-.2:i?-.25:-.3,l=n?.8:.62;e.box(a,l,1.66,c,.3+o,0,t);for(let u of[.84,-.84])e.plane(a*.46,l*.7,c+a*.22,.3+o+l*.5,u,fi,{ry:u>0?0:Math.PI,noAO:!0}),e.plane(a*.4,l*.7,c-a*.24,.3+o+l*.5,u,fi,{ry:u>0?0:Math.PI,noAO:!0});e.quad([c+a/2+.01,.3+o+.05,.75],[c+a/2+.01,.3+o+.05,-.75],[c+a/2-.35,.3+o+l-.05,-.72],[c+a/2-.35,.3+o+l-.05,.72],fi,{noAO:!0}),e.quad([c-a/2-.01,.3+o+.05,-.75],[c-a/2-.01,.3+o+.05,.75],[c-a/2+.3,.3+o+l-.05,.72],[c-a/2+.3,.3+o+l-.05,-.72],fi,{noAO:!0}),e.box(.15,.25,1.86,r/2,.22,0,2829099),e.box(.15,.25,1.86,-r/2,.22,0,2829099);for(let u of[.65,-.65])e.box(.05,.16,.36,r/2+.02,.7,u,16774348,{noAO:!0}),e.box(.05,.16,.34,-r/2-.02,.7,u,15022389,{noAO:!0});return e.build()}var ql=new te({vertexColors:!0}),Ly=Lo(),Dy=new ke(1,1).rotateX(-Math.PI/2),ky=new re({map:Ly,transparent:!0,depthWrite:!1}),Zl=(s,t)=>{let e=new ot(Dy,ky);return e.scale.set(s,1,t),e.position.y=.08,e.renderOrder=1,e},No=s=>[Math.cos(s),-Math.sin(s)],Xl=new Map;function Uy(s){if(Xl.has(s))return Xl.get(s);let t=new Ue(3,.02);t.box(.42,.9,.36,0,0,.17,2899558,{noAO:!0}),t.box(.42,.9,.36,0,0,-.17,2899558,{noAO:!0}),t.box(.5,.85,.82,0,.85,0,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,.5,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,-.5,s,{noAO:!0}),t.sphere(.27,0,2,0,9262372,{noAO:!0}),t.box(.48,.14,.52,-.02,2.14,0,1710618,{noAO:!0}),t.box(.16,.14,.2,0,1.76,0,8014378,{noAO:!0}),t.box(.5,.1,.86,0,.82,0,2759698,{noAO:!0}),t.box(.5,.12,.2,.06,-.02,.17,1710618,{noAO:!0}),t.box(.5,.12,.2,.06,-.02,-.17,1710618,{noAO:!0}),t.box(.2,.16,.2,0,.78,.5,9262372,{noAO:!0}),t.box(.2,.16,.2,0,.78,-.5,9262372,{noAO:!0}),t.box(.05,.07,.07,.26,2.04,.1,1118481,{noAO:!0,jit:0}),t.box(.05,.07,.07,.26,2.04,-.1,1118481,{noAO:!0,jit:0});let e=t.build();return Xl.set(s,e),e}function or(s){let t=new Gt,e=new ot(Uy(new St(s).getHex()),ql);return e.scale.setScalar(.92),t.add(e),t.userData.body=e,t.add(Zl(1.6,1.6)),t}var Yl=new Map;function pi(s){let t=new St(s).getHex();Yl.has(t)||Yl.set(t,$l("hatch",t));let e=new Gt,n=new ot(Yl.get(t),ql);return n.position.y=.12,e.add(n),e.add(Zl(5.2,2.8)),e}function Be(s,t){let e=new ho(new js({map:fd(s,t),depthTest:!1,transparent:!0}));return e.scale.set(5.5,1.38,1),e.renderOrder=10,e}var ko=class{constructor(t,e){this.cars=[];let n=_s(2026),i={},r=[16119285,11580858,2040616,12000284,1986444,3042106,14076328,8019006];for(let o of e){let a=Wl(o.pts,7,{dense:!!o.dense,slow:!0}),c=6.5+n()*3,l=Math.max(3,Math.round(a.realLength/85));for(let u=0;u<l;u++){let h=o.npcs[n()*o.npcs.length|0],d;h==="danfo"?d=Ad(n):h==="keke"?d=Rd(n()>.2?16761358:3046706,1513499):h==="okada"?d=Cd(n):d=$l(["sedan","suv","hatch"][n()*3|0],r[n()*r.length|0]);let f=new Gt,g=new ot(d,ql);g.position.y=.12,f.add(g),f.add(Zl(h==="okada"?3:5.5,h==="okada"?1.4:2.8)),t.add(f),this.cars.push({g:f,P:a,speed:c*(h==="okada"?1.25:h==="danfo"?.9:1),off:a.length*u/l+n()*6,type:h})}}this.tmp={}}update(t,e=null,n=.016){this.last||(this.last=t);let i=Math.min(.1,Math.max(0,t-this.last))||n;if(this.last=t,!e){for(let a of this.cars)rr(a.P,a.speed*t+a.off,this.tmp),a.g.position.set(this.tmp.x,.02,this.tmp.z),a.g.rotation.y=this.tmp.yaw;return}let r=this.blockers||(this.blockers=[]);r.length=0;for(let a of e)r.push({x:a.x,z:a.z,r:a.r??.5,person:!0});let o=this.carB||(this.carB=this.cars.map(a=>({x:0,z:0,r:1.8,self:a,person:!1})));this.cars.forEach((a,c)=>{o[c].x=a.g.position.x,o[c].z=a.g.position.z}),this.stopped=0;for(let[a,c]of this.cars.entries()){c.s==null&&(c.s=c.speed*t+c.off,c.st={v:c.speed,wait:0,limit:Li.waitMin+Math.random()*(Li.waitMax-Li.waitMin)}),rr(c.P,c.s,this.tmp);let l={x:this.tmp.x,z:this.tmp.z,yaw:this.tmp.yaw,self:c},u=[];for(let y of r)Math.abs(y.x-l.x)<18&&Math.abs(y.z-l.z)<18&&u.push(y);for(let y=0;y<o.length;y++)y!==a&&Math.abs(o[y].x-l.x)<18&&Math.abs(o[y].z-l.z)<18&&u.push(o[y]);let h=Sd(Md(l,u),{speed:c.st.v,type:c.type}).hit,d=c.speed*t+c.off,f=d-c.s,g=c.speed*(f>.5&&!h?Li.catchUp:1);c.st=wd(c.st,g,h,i),c.s+=c.st.v*i,f<-2&&(c.s=d),c.st.v<.2&&h&&this.stopped++,c.st.honk&&this.onHorn&&this.onHorn(c,l),rr(c.P,c.s,this.tmp),c.g.position.set(this.tmp.x,.02,this.tmp.z),c.g.rotation.y=this.tmp.yaw}}},Uo=class{constructor(t,e,n=36){let i=_s(5);this.crowd=new Ms(t,n,5),this.items=[];let r=e.filter(o=>o.z0<150);for(let o=0;o<n;o++){let a=r[i()*r.length|0],c=1.5,l=Wl([[a.x0+c,a.z0+c],[a.x1-c,a.z0+c],[a.x1-c,a.z1-c],[a.x0+c,a.z1-c]],4);this.items.push({P:l,off:i()*l.length,v:1.1+i()*.7,dir:i()>.5?1:-1,ph:i()*6})}this.tmp={},this.body=this.crowd.parts.torso,this.legL=this.crowd.parts.legL,this.m=new ie}update(t,e=null){this.items.forEach((n,i)=>{rr(n.P,n.dir*n.v*t+n.off,this.tmp);let r=e?Math.hypot(this.tmp.x-e.x,this.tmp.z-e.z)>60:!1;this.crowd.pose(i,this.tmp.x,.2,this.tmp.z,this.tmp.yaw+(n.dir<0?Math.PI:0),t*n.v*3.4+n.ph,1,r)}),this.crowd.commit()}},Oo=class{constructor(t){this.scene=t,this.map=new Map}ingest(t,e){let n=new Set;for(let i of t){n.add(i.id);let r=this.map.get(i.id);r||(r={id:i.id,name:i.n,color:i.c,mode:-1,samples:[],obj:null,tag:null,act:""},this.map.set(i.id,r)),r.mode=i.m,r.act=i.act||"";for(let[o,a,c,l]of i.s){let u=e+o;(!r.samples.length||u>r.samples[r.samples.length-1].t+50)&&r.samples.push({t:u,x:a,z:c,ry:l})}r.samples.length>60&&r.samples.splice(0,r.samples.length-60),this.build(r)}for(let[i,r]of this.map)n.has(i)||(this.scene.remove(r.root),this.map.delete(i))}build(t){let e=t.mode===1?"car":"walk";t.kind===e&&t.root||(t.root&&this.scene.remove(t.root),t.root=new Gt,t.obj=e==="car"?pi(t.color):or(t.color),t.root.add(t.obj),t.tag=Be(t.name,"#ffffff"),t.tag.position.set(0,e==="car"?4.2:3.6,0),t.root.add(t.tag),t.kind=e,this.scene.add(t.root),t.first=!0)}update(t){for(let e of this.map.values()){let n=e.samples;if(!n.length||!e.root)continue;let i=n[0],r=n[n.length-1];if(t<=n[0].t)i=r=n[0];else if(t>=n[n.length-1].t)i=r=n[n.length-1];else for(let d=0;d<n.length-1;d++)if(n[d].t<=t&&n[d+1].t>=t){i=n[d],r=n[d+1];break}let o=i===r?0:(t-i.t)/(r.t-i.t||1),a=i.x+(r.x-i.x)*o,c=i.z+(r.z-i.z)*o,l=r.ry-i.ry;l=Math.atan2(Math.sin(l),Math.cos(l));let u=i.ry+l*o;e.root.position.set(a,0,c),e.root.rotation.y=u;let h=Math.hypot(r.x-i.x,r.z-i.z)>.05&&i!==r;e.kind==="walk"&&(e.obj.userData.body.position.y=h?Math.abs(Math.sin(t/140))*.08:0)}}dispose(){for(let t of this.map.values())this.scene.remove(t.root);this.map.clear()}};var Di=(s,t,e)=>Math.max(t,Math.min(e,s)),Id=(s,t)=>Math.atan2(Math.sin(t-s),Math.cos(t-s)),zo=class{constructor(t,e,n,i,r){this.city=e,this.colliders=n,this.canvas=t,this.x=0,this.z=0,this.ry=0,this.mode="walk",this.v=0,this.cam=12,this.camYaw=0,this.camPitch=.62,this.dragT=0,this.frozen=!1,this.keys=new Set,this.joy={x:0,y:0,active:!1},this.run=!1,this.moving=!1,this.blocked=!1,this.root=new Gt,this.setLook(i,r),this.bind()}setLook(t,e){this.color=t,this.name=e,this.avatar&&(this.root.remove(this.avatar),this.root.remove(this.carObj)),this.avatar=or(t),this.carObj=pi(t),this.root.add(this.avatar,this.carObj),this.carObj.visible=!1,this.tag||(this.tag=Be(e||"You","#ffe27a"),this.root.add(this.tag)),this.applyMode()}applyMode(){this.avatar.visible=this.mode==="walk",this.carObj.visible=this.mode==="drive",this.tag.position.set(0,this.mode==="drive"?4.2:3.6,0)}toggleCar(){return this.mode=this.mode==="walk"?"drive":"walk",this.v=0,this.applyMode(),this.mode==="drive"&&(this.camYaw=this.ry),this.mode}teleport(t,e){this.x=t,this.z=e,this.v=0}bind(){let t=h=>{if(h.target.closest("input,textarea,select"))return;let d=h.key.toLowerCase();["arrowup","arrowdown","arrowleft","arrowright"," "].includes(d)&&h.preventDefault(),this.keys.add(d),d==="shift"&&(this.run=!0)},e=h=>{let d=h.key.toLowerCase();this.keys.delete(d),d==="shift"&&(this.run=!1)};addEventListener("keydown",t),addEventListener("keyup",e),addEventListener("blur",()=>{this.keys.clear(),this.run=!1});let n=null;this.canvas.addEventListener("pointerdown",h=>{h.target===this.canvas&&(n={id:h.pointerId,x:h.clientX,y:h.clientY,moved:0},this.canvas.setPointerCapture?.(h.pointerId))}),this.canvas.addEventListener("pointermove",h=>{if(!n||n.id!==h.pointerId)return;let d=h.clientX-n.x,f=h.clientY-n.y;n.x=h.clientX,n.y=h.clientY,n.moved+=Math.abs(d)+Math.abs(f),this.camYaw-=d*.006,this.camPitch=Di(this.camPitch+f*.004,.25,1.15),this.dragT=performance.now()});let i=h=>{n&&n.id===h.pointerId&&(this.lastTap=n.moved<6?{x:h.clientX,y:h.clientY,t:performance.now()}:null,n=null)};this.canvas.addEventListener("pointerup",i),this.canvas.addEventListener("pointercancel",i),this.canvas.addEventListener("wheel",h=>{this.cam=Di(this.cam+h.deltaY*.01,7,26),h.preventDefault()},{passive:!1});let r=document.getElementById("joy"),o=document.getElementById("joyKnob");if(!r)return;let a=null,c=52,l=h=>{let d=r.getBoundingClientRect(),f=h.clientX-(d.left+d.width/2),g=h.clientY-(d.top+d.height/2),y=Math.hypot(f,g);y>c&&(f=f/y*c,g=g/y*c),this.joy.x=f/c,this.joy.y=-g/c,o.style.transform=`translate(${f}px,${g}px)`};r.addEventListener("pointerdown",h=>{a=h.pointerId,r.setPointerCapture(h.pointerId),this.joy.active=!0,l(h),h.preventDefault()}),r.addEventListener("pointermove",h=>{h.pointerId===a&&l(h)});let u=h=>{h.pointerId===a&&(a=null,this.joy.x=this.joy.y=0,this.joy.active=!1,o.style.transform="")};r.addEventListener("pointerup",u),r.addEventListener("pointercancel",u)}input(){let t=this.keys,e=(t.has("d")||t.has("arrowright")?1:0)-(t.has("a")||t.has("arrowleft")?1:0),n=(t.has("w")||t.has("arrowup")?1:0)-(t.has("s")||t.has("arrowdown")?1:0);this.joy.active&&(e=this.joy.x,n=this.joy.y);let i=Math.hypot(e,n);return i>1&&(e/=i,n/=i),{ix:e,iy:n}}update(t){let{ix:e,iy:n}=this.frozen?{ix:0,iy:0}:this.input(),i=this.x,r=this.z;if(this.keys.has("q")&&(this.camYaw+=t*1.8),this.keys.has("e"),this.mode==="walk"){let l=Math.hypot(e,n);if(l>.08){let u=No(this.camYaw),h=[Math.sin(this.camYaw),Math.cos(this.camYaw)],d=u[0]*n+h[0]*e,f=u[1]*n+h[1]*e,g=Math.hypot(d,f);d/=g,f/=g;let y=(this.run?7:5.2)*Math.min(1,l);this.x+=d*y*t,this.z+=f*y*t,this.v=y;let x=Math.atan2(-f,d);this.ry+=Id(this.ry,x)*Math.min(1,t*12)}else this.v=0}else{let c=n>.15?n:n<-.15?n*.6:0,l=Math.abs(e)>.1?e:0,u=20;c>0?this.v+=15*c*t:c<0?this.v+=(this.v>0?24:8)*c*t:this.v-=Math.sign(this.v)*Math.min(Math.abs(this.v),6*t),this.v=Di(this.v,-6,u),this.ry-=l*Math.min(1,Math.abs(this.v)/5)*1.9*t*(this.v>=0?1:-1);let h=No(this.ry);this.x+=h[0]*this.v*t,this.z+=h[1]*this.v*t,performance.now()-this.dragT>1500&&(this.camYaw+=Id(this.camYaw,this.ry)*Math.min(1,t*3))}let o=this.mode==="drive"?2:.7;this.blocked=!1;for(let c=0;c<2;c++)for(let l of this.colliders){if(this.x<l.x0-o||this.x>l.x1+o||this.z<l.z0-o||this.z>l.z1+o)continue;let u=Di(this.x,l.x0,l.x1),h=Di(this.z,l.z0,l.z1),d=this.x-u,f=this.z-h,g=Math.hypot(d,f);if(g<o){if(g<1e-4){let y=[[l.x0-o-this.x,0],[l.x1+o-this.x,0],[0,l.z0-o-this.z],[0,l.z1+o-this.z]].sort((x,m)=>Math.hypot(...x)-Math.hypot(...m))[0];this.x+=y[0],this.z+=y[1]}else this.x=u+d/g*o,this.z=h+f/g*o;this.blocked=!0,this.mode==="drive"&&(this.v*=.5)}}let a=this.city.bounds;this.x=Di(this.x,a.minX+1,a.maxX-1),this.z=Di(this.z,a.minZ+1,a.maxZ-3),this.moving=Math.hypot(this.x-i,this.z-r)>.002,this.root.position.set(this.x,0,this.z),this.root.rotation.y=this.ry,this.mode==="walk"&&(this.avatar.userData.body.position.y=this.moving?Math.abs(Math.sin(performance.now()/120))*.09:0)}placeCamera(t,e){let n=this.cam*(this.mode==="drive"?1.4:1),i=No(this.camYaw),r=Math.sin(this.camPitch)*n,o=Math.cos(this.camPitch)*n,a=this.x-i[0]*o,c=this.z-i[1]*o,l=r+1.2,u=1-Math.pow(6e-4,e);t.position.x+=(a-t.position.x)*u,t.position.y+=(l-t.position.y)*u,t.position.z+=(c-t.position.z)*u,t.lookAt(this.x,1.6,this.z),t.updateMatrixWorld(),t.matrixWorldInverse.copy(t.matrixWorld).invert()}};var ki=new P,Fo=class{constructor(t,e,n){this.world=t,this.city=e,this.now=n,this.rot=1e4,this.slots={},this.imgs=new Map,this.evidence=[],this.houseTex=new Map,this.state={},this.lastKey={},this.maxDist=90}setSnapshot(t){if(t){this.slots=t.slots||{},this.rot=t.rotationMs||1e4;for(let e of Object.values(this.slots))for(let n of e)this.loadImg(n.i)}}loadImg(t){if(this.imgs.has(t))return;let e={img:new Image,ok:!1,tex:{}};this.imgs.set(t,e),e.img.onload=()=>{e.ok=!0,this.lastKey={}},e.img.onerror=()=>{e.failed=!0},e.img.src=window.__naMedia?window.__naMedia(t):`/media/creative/${t}`}house(t,e,n){let i=this.houseTex.get(t);if(!i){let r=this.world.boards[t].def;i=pd(e>=n*1.5?1024:768,e>=n*1.5?512:768,r.surface==="lagoon_plot"?"Lagoon plot":r.surface==="airport_board"?"Airport board":"Road billboard","Rent this board at /advertise",t.charCodeAt(t.length-1)),this.houseTex.set(t,i)}return i}currentFor(t,e){let n=this.slots[t];return!n||!n.length?null:n[e%n.length]}update(t,e,n,i){var a;let r=this.now(),o=Math.floor(r/this.rot);for(let[c,l]of Object.entries(this.world.boards)){let u=l.def,h=u.x-n.x,d=u.z-n.z,f=Math.hypot(h,d),g=this.currentFor(c,o),y=g?`c${g.c}`:"house";if(l.shownKey!==y||this.lastKey[c]!==y){let v=g&&this.imgs.get(g.i);if(g&&v&&v.ok){let M=v.tex[o%1]||(v.tex.t=v.tex.t||md(v.img,u.surface==="lagoon_plot"?768:1024,u.surface==="lagoon_plot"?768:512,g.b));l.mat.map=M,l.mat.color.set(16777215),l.mat.needsUpdate=!0,l.shownKey=y,this.lastKey[c]=y}else g?l.mat.map||(l.mat.map=this.house(c,u.w,u.h),l.mat.needsUpdate=!0):(l.mat.map=this.house(c,u.w,u.h),l.mat.needsUpdate=!0,l.shownKey=y,this.lastKey[c]=y)}let x=(a=this.state)[c]||(a[c]={win:o,camp:null,cont:0,best:0,pctSum:0,pctN:0});if(x.win!==o&&(this.flush(c,x),x.win=o,x.camp=g?g.c:null,x.cont=0,x.best=0,x.pctSum=0,x.pctN=0),x.camp=g?g.c:null,!g||f>this.maxDist+30||document.hidden){x.cont=0;continue}let m=this.visiblePct(t,e,l);m>=50?(x.cont+=i,x.best=Math.max(x.best,x.cont),x.pctSum+=m,x.pctN++):x.cont=0}}flush(t,e){!e.camp||e.best<300||this.evidence.length<120&&this.evidence.push({slot:t,win:e.win,c:e.camp,pct:Math.round(e.pctSum/Math.max(1,e.pctN)),ms:Math.round(Math.min(e.best,this.rot)),vis:!0})}take(){let t=this.evidence;return this.evidence=[],t}visiblePct(t,e,n){let i=n.def,r=i.x,o=i.y,a=i.z,c=t.position;if((c.x-r)*i.nx+(c.z-a)*i.nz<=0)return 0;for(let M of this.world.colliders){if(M.h<2)continue;let _=Oy(c.x,c.z,r,a,M);if(_===null)continue;if(c.y+(o-c.y)*_<M.h)return 0}let l=i.nz,u=-i.nx,h=9,d=-9,f=9,g=-9;for(let[M,_]of[[-1,-1],[1,-1],[1,1],[-1,1]]){if(ki.set(r+l*M*i.w/2,o+_*i.h/2,a+u*M*i.w/2),ki.clone().applyMatrix4(t.matrixWorldInverse).z>-.1)return 0;ki.project(t),h=Math.min(h,ki.x),d=Math.max(d,ki.x),f=Math.min(f,ki.y),g=Math.max(g,ki.y)}if((g-f)/2*e.h<22)return 0;let x=(d-h)*(g-f),m=Math.max(0,Math.min(1,d)-Math.max(-1,h)),v=Math.max(0,Math.min(1,g)-Math.max(-1,f));return x>0?100*m*v/x:0}nearest(t,e,n=40){let i=null,r=n;for(let[o,a]of Object.entries(this.world.boards)){let c=Math.hypot(a.def.x-t,a.def.z-e);c<r&&(r=c,i=o)}return i}};function Oy(s,t,e,n,i){let r=0,o=1,a=e-s,c=n-t;for(let[l,u]of[[-a,s-i.x0],[a,i.x1-s],[-c,t-i.z0],[c,i.z1-t]])if(l===0){if(u<0)return null}else{let h=u/l;if(l<0){if(h>o)return null;h>r&&(r=h)}else{if(h<r)return null;h<o&&(o=h)}}return r>.02&&r<.98?r:null}var Ny=["audio/webm;codecs=opus","audio/ogg;codecs=opus","audio/mp4"],Pd=()=>typeof MediaRecorder>"u"?null:Ny.find(s=>MediaRecorder.isTypeSupported?.(s))||null,Bo=class{constructor(t){this.g=t,this.call=null,this.pc=null,this.stream=null,this.muted=!1,this.pendingIce=[],this.offer=null,this.badges={msgs:0,reqs:0,missed:0},this.listeners=new Set,this.enabled=!!t.cfg.phone}get usable(){return this.enabled&&!this.g.user?.guest}on(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(t){for(let e of this.listeners)try{e(t)}catch{}}start(){this.usable&&(this.refresh(),this.timer=setInterval(()=>this.poll(),5e3))}stop(){clearInterval(this.timer),this.endLocal()}async refresh(){if(this.usable)try{let t=await zt("/api/phone/friends"),e=await zt("/api/phone/threads");this.badges.reqs=t.incoming.length,this.badges.msgs=e.threads.reduce((n,i)=>n+i.unread,0),this.drawBadge()}catch{}}drawBadge(){let t=this.badges.msgs+this.badges.reqs+this.badges.missed,e=et("#phoneBadge");e&&t&&(e.textContent=String(t+(this.g.unread||0)),e.classList.remove("hidden"))}async poll(){if(this.usable){try{let t=await zt("/api/phone/call");t.call&&(!this.call||this.call.callId!==t.call.callId)?this.adopt(t.call):!t.call&&this.call&&this.call.state!=="ended"&&Date.now()-(this.call.startedAt||0)>4e3&&this.finish("ended")}catch{}this.refresh()}}adopt(t){this.call&&this.call.callId===t.callId||(this.call={...t,startedAt:Date.now()},this.iceServers=t.iceServers||this.iceServers,t.incoming&&t.state==="ringing"&&this.ringIn(),this.render())}onPush(t){let e=t.type;e==="phone.message"?(this.badges.msgs++,this.drawBadge(),this.emit({kind:"message",m:t}),document.querySelector('[data-chat-open="'+t.from+'"]')||this.g.ui.toast(`\u{1F4AC} @${t.from}: ${t.kind==="voice"?"\u{1F3A4} voice note":(t.text||"").slice(0,60)}`)):e==="phone.message.read"?this.emit({kind:"read",m:t}):e==="phone.friend.request"?(this.badges.reqs++,this.drawBadge(),this.g.ui.toast(`\u{1F91D} @${t.from} sent a friend request`),this.emit({kind:"friends"})):e==="phone.friend.update"?this.emit({kind:"friends"}):e==="phone.call.incoming"?(this.iceServers=t.iceServers,this.call={callId:t.callId,state:"ringing",with:t.from,incoming:!0,ringUntil:t.ringUntil,startedAt:Date.now()},this.offer=null,this.pendingIce=[],this.ringIn(),this.render()):e==="phone.call.state"&&this.call?.callId===t.callId?(this.call.state=t.state,t.iceServers&&(this.iceServers=t.iceServers),this.render()):e==="phone.call.signal"&&this.call?.callId===t.callId?this.onSignal(t):e==="phone.call.ended"&&this.call?.callId===t.callId&&((t.reason==="missed"||t.reason==="cancelled"||t.reason==="dnd"||t.reason==="busy")&&this.call.incoming&&(this.badges.missed++,this.drawBadge(),this.g.ui.toast(`\u{1F4DE} Missed call from @${this.call.with}`)),this.finish(t.reason))}ringIn(){this.stopRing(),this.ringBeep(),this.ringTimer=setInterval(()=>this.ringBeep(),2200);try{navigator.vibrate?.([300,150,300])}catch{}}ringBeep(){try{let t=this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext));t.state==="suspended"&&t.resume();let e=t.currentTime;[0,.35].forEach((n,i)=>{let r=t.createOscillator(),o=t.createGain();r.type="sine",r.frequency.value=i?523:659,o.gain.setValueAtTime(1e-4,e+n),o.gain.exponentialRampToValueAtTime(.08,e+n+.03),o.gain.exponentialRampToValueAtTime(1e-4,e+n+.3),r.connect(o).connect(t.destination),r.start(e+n),r.stop(e+n+.32)})}catch{}}stopRing(){clearInterval(this.ringTimer),this.ringTimer=null}async consentOk(){return(await zt("/api/phone/settings")).voiceConsent?!0:new Promise(e=>{let n=r=>{i.remove(),e(r)},i=p("div",{id:"consentUi"},p("div",{class:"cinner card"},p("b",{},"Voice notice"),p("p",{},"Calls and voice notes use your microphone. Calls are peer to peer and are never recorded by the game. Voice notes are deleted 24 hours after sending. You can mute, block or report anyone. 18+ only."),p("div",{class:"crow"},p("button",{class:"cbtn green",id:"voiceConsent",onclick:async()=>{await ct("/api/phone/settings",{voiceConsent:!0}),n(!0)}},"I agree"),p("button",{class:"cbtn",onclick:()=>n(!1)},"Not now"))));document.body.append(i)})}async dial(t){if(this.call&&this.call.state!=="ended")return this.g.ui.toast("You are already in a call.");if(!await this.consentOk())return;let e=await this.g.ui.guard(()=>ct("/api/phone/call/start",{to:t}));if(e){if(e.ok===!1){this.g.ui.toast(e.text||"They cannot take the call right now.");return}this.iceServers=e.iceServers,this.call={callId:e.callId,state:"ringing",with:t,incoming:!1,ringUntil:e.ringUntil,startedAt:Date.now()},this.render();try{await this.openMic(),await this.makePc();let n=await this.pc.createOffer();await this.pc.setLocalDescription(n),await ct("/api/phone/call/signal",{callId:e.callId,kind:"offer",sdp:n.sdp})}catch(n){this.g.ui.toast(this.micMsg(n)),this.hangup()}}}micMsg(t){return t?.name==="NotAllowedError"?"Microphone is blocked. Allow it in your browser settings to call.":t?.name==="NotFoundError"?"No microphone found.":"Could not start the call audio."}async openMic(){this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:1},video:!1})}async makePc(){let t=this.pc=new RTCPeerConnection({iceServers:this.iceServers||[{urls:["stun:stun.l.google.com:19302"]}]}),e=this.call.callId;for(let n of this.stream.getTracks())t.addTrack(n,this.stream);t.onicecandidate=n=>{n.candidate&&ct("/api/phone/call/signal",{callId:e,kind:"ice",candidate:n.candidate.toJSON()}).catch(()=>{})},t.ontrack=n=>{let i=et("#callAudio");i||(i=p("audio",{id:"callAudio",autoplay:!0,playsinline:!0}),document.body.append(i)),i.srcObject=n.streams[0],i.play?.().catch(()=>{})},t.onconnectionstatechange=()=>{var n;this.call&&(this.call.rtc=t.connectionState,t.connectionState==="connected"&&((n=this.call).connectedAt||(n.connectedAt=Date.now()),this.sendStats()),t.connectionState==="failed"&&(this.g.ui.toast("The call could not connect (network)."),this.hangup()),this.render())}}async onSignal(t){try{t.kind==="offer"?(this.offer=t,this.pc&&await this.takeOffer()):t.kind==="answer"?(await this.pc?.setRemoteDescription({type:"answer",sdp:t.sdp}),await this.flushIce()):t.kind==="ice"&&(this.pc?.remoteDescription?await this.pc.addIceCandidate(t.candidate).catch(()=>{}):this.pendingIce.push(t.candidate))}catch(e){console.warn("signal",e)}}async flushIce(){for(let t of this.pendingIce.splice(0))await this.pc.addIceCandidate(t).catch(()=>{})}async takeOffer(){await this.pc.setRemoteDescription({type:"offer",sdp:this.offer.sdp}),await this.flushIce();let t=await this.pc.createAnswer();await this.pc.setLocalDescription(t),await ct("/api/phone/call/signal",{callId:this.call.callId,kind:"answer",sdp:t.sdp})}async answer(){if(!this.call?.incoming)return;if(this.stopRing(),!await this.consentOk())return this.decline();let t=await this.g.ui.guard(()=>ct("/api/phone/call/act",{callId:this.call.callId,action:"answer"}));if(!t||t.state!=="active")return this.finish(t?.reason||"missed");this.call.state="active",this.render();try{await this.openMic(),await this.makePc(),this.offer&&await this.takeOffer()}catch(e){this.g.ui.toast(this.micMsg(e)),this.hangup()}}async decline(){this.stopRing(),this.call&&(await ct("/api/phone/call/act",{callId:this.call.callId,action:"decline"}).catch(()=>{}),this.finish("declined"))}async hangup(){let t=this.call;t&&(this.stopRing(),await ct("/api/phone/call/act",{callId:t.callId,action:t.state==="ringing"&&!t.incoming?"cancel":"hangup"}).catch(()=>{}),this.finish("completed"))}toggleMute(){this.muted=!this.muted,this.stream?.getAudioTracks().forEach(t=>{t.enabled=!this.muted}),this.render()}async sendStats(){try{let t=await this.pc.getStats(),e=null;t.forEach(n=>{if(n.type==="candidate-pair"&&n.state==="succeeded"&&n.nominated){let i=t.get(n.localCandidateId);e=i?.candidateType==="relay"?"relay":i?.candidateType==="srflx"?"srflx":"host"}}),e&&(this.call.icePath=e,ct("/api/phone/call/stats",{callId:this.call.callId,icePath:e}).catch(()=>{}))}catch{}}endLocal(){this.stopRing();try{this.pc?.close()}catch{}this.pc=null,this.stream?.getTracks().forEach(t=>t.stop()),this.stream=null,this.offer=null,this.pendingIce=[],this.muted=!1,et("#callAudio")?.remove()}finish(t){let e=this.call;this.endLocal(),e&&(e.state="ended",e.reason=t,this.render(),this.emit({kind:"call-ended",c:e}),this.lastEnded=e,setTimeout(()=>{this.call===e&&(this.call=null,this.render())},2200))}render(){let t=et("#callUi"),e=this.call;if(!e){t?.remove();return}t||(t=p("div",{id:"callUi"}),document.body.append(t));let n=!!(this.g.venue?.open&&this.g.venue.match&&this.g.venue.match.status==="playing"),i=e.connectedAt?Math.floor((Date.now()-e.connectedAt)/1e3):0,r=`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`,o=e.state==="ended"?{completed:"Call ended",declined:"Call declined",missed:"Missed call",cancelled:"Missed call",busy:"They are busy",dnd:"Not available",failed:"Call failed"}[e.reason]||"Call ended":e.incoming&&e.state==="ringing"?"Incoming call":e.state==="ringing"?"Calling\u2026":e.rtc==="connected"?`In call \xB7 ${r}`:"Connecting\u2026",a=(l,u,h,d)=>p("button",{id:l,class:`cbtn ${u}`,onclick:d},h),c=e.state==="ended"?[]:e.incoming&&e.state==="ringing"?[a("callDecline","red","\u2716 Decline",()=>this.decline()),a("callAnswer","green","\u{1F4DE} Answer",()=>this.answer())]:[a("callMute",this.muted?"on":"",this.muted?"\u{1F507} Muted":"\u{1F399} Mute",()=>this.toggleMute()),a("callHang","red",e.state==="ringing"?"\u2716 Cancel":"\u{1F4F5} Hang up",()=>this.hangup())];t.className=n?"banner":"",t.replaceChildren(p("div",{class:"cinner"},p("div",{class:"cavatar"},"\u{1F4DE}"),p("div",{class:"cname"},`@${e.with}`),p("div",{class:"cstate",id:"callState"},o),p("div",{class:"crow"},c))),clearInterval(this.uiTick),e.state==="active"&&(this.uiTick=setInterval(()=>{this.call?this.render():clearInterval(this.uiTick)},1e3))}};var zy={online:"#2e9b5e",home:"#2a7de1",in_call:"#e0a020",dnd:"#d6402f",offline:"#aaa"},Ld=[["calls","\u{1F4DE}","Phone"],["messages","\u{1F4AC}","Messages"],["contacts","\u{1F465}","Contacts"],["wallet","\u{1F4B0}","Wallet"],["jobs","\u{1F4BC}","Jobs"],["home","\u{1F3E0}","Home"],["land","\u{1F30D}","Land"],["garage","\u{1F697}","Garage"],["games","\u{1F3AE}","Games"],["map","\u{1F5FA}","Map"],["ranks","\u{1F3C6}","Ranks"],["alerts","\u{1F514}","Alerts"],["more","\u2699\uFE0F","Settings"]],Ho=s=>p("i",{class:"pdot",title:s,style:`background:${zy[s]||"#aaa"}`}),Jl=s=>new Date(s).toLocaleTimeString("en-NG",{hour:"numeric",minute:"2-digit"}),Fy=s=>`${Math.floor(s/6e4)}:${String(Math.round(s/1e3)%60).padStart(2,"0")}`,Vo=class{constructor(t){this.ui=t,this.g=t.g,this.p=t.g.phone2,this.stack=[],this.cur="home",this.off=null}open(t="home"){this.ui.openSheet("Phone",[],()=>{this.off?.(),this.off=null,clearInterval(this.chatTimer)}),this.frame=p("div",{class:"phoneframe"}),this.status=p("div",{class:"pstatus"}),this.screen=p("div",{class:"pscreen"}),this.nav=p("div",{class:"pnav"},p("button",{id:"phBack",onclick:()=>this.back(),"aria-label":"Back"},"\u25C0"),p("button",{id:"phHome",onclick:()=>this.go("home",!0),"aria-label":"Home"},"\u25CF"),p("button",{id:"phMenu",onclick:()=>this.ui.closeSheet(),"aria-label":"Close phone"},"\u2715")),this.frame.append(this.status,this.screen,this.nav),this.ui.setSheetBody([this.frame]),this.stack=[],this.cur=null,this.off=this.p?.on?.(e=>this.onEvent(e)),this.go(t,!0),this.statusTick=setInterval(()=>this.drawStatus(),15e3)}drawStatus(){if(!this.status.isConnected)return clearInterval(this.statusTick);let t=this.g.user?.gameTime||{},e=this.p?.badges||{};this.status.replaceChildren(p("span",{},Jl(Date.now())),p("span",{class:"mut"},this.p?.call?"\u{1F4DE} in call":""),p("span",{},`${e.missed?"\u{1F4F5}"+e.missed+" ":""}\u{1F4F6} \u{1F50B}`))}go(t,e=!1){e?this.stack=[]:this.cur&&this.stack.push(this.cur),this.cur=t,this.draw()}back(){if(!this.stack.length)return this.cur!=="home"?this.go("home",!0):this.ui.closeSheet();this.cur=this.stack.pop(),this.draw()}async draw(){this.drawStatus(),clearInterval(this.chatTimer);let t=this.cur;this.screen.replaceChildren(p("p",{class:"mut"},"Loading\u2026"));let e;if(t==="home")e=this.homeScreen();else if(t==="contacts")e=await this.contacts();else if(t==="messages")e=await this.messages();else if(t==="calls")e=await this.calls();else if(t==="settings")e=await this.settings();else if(t.startsWith("chat:"))e=await this.chat(t.slice(5));else{if(t==="map")return this.ui.closeSheet(),this.ui.openMap();t==="more"?e=[...await this.settings(),...[].concat(await this.ui.tab_more())]:this.ui["tab_"+t]?e=await this.ui["tab_"+t]():e=[p("p",{},"Nothing here yet.")]}if(this.cur===t){let n=(Ld.find(i=>i[0]===t)||[])[2]||(t.startsWith("chat:")?"@"+t.slice(5):"");this.screen.replaceChildren(...t==="home"?[]:[p("div",{class:"ptitle"},n)],...[].concat(e)),this.nav.querySelector("#phBack").disabled=t==="home"&&!this.stack.length&&!1}}onEvent(t){this.screen?.isConnected&&(t.kind==="message"&&this.cur==="messages"?this.draw():t.kind==="message"&&this.cur===`chat:${t.m.from}`?this.chatPoll?.():t.kind==="friends"&&(this.cur==="contacts"||this.cur==="home")?this.draw():t.kind==="read"&&this.cur?.startsWith("chat:")?this.chatPoll?.():t.kind==="call-ended"&&this.cur==="calls"&&this.draw())}homeScreen(){let t=this.p?.badges||{},e={messages:t.msgs,contacts:t.reqs,calls:t.missed,alerts:this.g.unread};return[p("div",{class:"pgrid"},Ld.map(([n,i,r])=>p("button",{class:"papp","data-app":n,onclick:()=>{n==="calls"&&(this.p.badges.missed=0),this.go(n)}},p("span",{class:"pico"},i,e[n]?p("b",{class:"pbadge"},String(e[n])):""),p("span",{class:"plab"},r))),...this.sponsored?[]:[]),p("p",{class:"mut",style:"text-align:center;margin:8px 0 0"},"Calls and chats are friends only. 18+.")]}async contacts(){if(this.g.user?.guest)return[p("p",{},"Create a free account to add friends, chat and call.")];let t=await this.ui.guard(()=>zt("/api/phone/friends"));if(!t)return[];this.p.badges.reqs=t.incoming.length,this.p.drawBadge();let e=p("input",{class:"sheet-input",id:"friendName",placeholder:"Add a friend: @username",maxlength:20}),n=i=>p("div",{class:"prow","data-friend":i.username},p("span",{},Ho(i.state),p("b",{},` @${i.username}`),p("small",{class:"mut"},` \xB7 ${i.state.replace("_"," ")}`),i.unread?p("b",{class:"pbadge inl"},String(i.unread)):""),p("span",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>this.go("chat:"+i.username)},"\u{1F4AC}"),p("button",{class:"btn small",disabled:this.p.usable?null:"disabled",onclick:()=>this.p.dial(i.username)},"\u{1F4DE}"),p("button",{class:"btn small ghost",onclick:()=>this.more(i.username)},"\u22EF")));return[p("div",{class:"row"},e,p("button",{class:"btn small",id:"friendAdd",onclick:async()=>{let i=await this.ui.guard(()=>ct("/api/phone/friends/request",{username:e.value.replace("@","")}));i&&(this.ui.toast(i.status==="accepted"?"You are now friends!":"Friend request sent."),this.draw())}},"Add")),t.incoming.length?p("div",{},p("b",{},"Requests"),p("div",{class:"list"},t.incoming.map(i=>p("div",{"data-req":i.id},p("span",{},`@${i.from}`),p("span",{class:"row"},p("button",{class:"btn small",onclick:async()=>{await this.ui.guard(()=>ct("/api/phone/friends/respond",{id:i.id,accept:!0})),this.draw()}},"Accept"),p("button",{class:"btn small ghost",onclick:async()=>{await this.ui.guard(()=>ct("/api/phone/friends/respond",{id:i.id,accept:!1})),this.draw()}},"Decline")))))):"",p("b",{},`Friends (${t.friends.length})`),t.friends.length?p("div",{class:"list"},t.friends.map(n)):p("p",{class:"mut"},"No friends yet. Type a username above, or tap a player name in the chat."),t.outgoing.length?p("p",{class:"mut"},`Waiting for: ${t.outgoing.map(i=>"@"+i.to).join(", ")}`):""]}more(t){this.ui.openSheet(`@${t}`,[p("div",{class:"col"},p("button",{class:"btn ghost",onclick:async()=>{await this.ui.guard(()=>ct("/api/phone/friends/remove",{username:t})),this.ui.closeSheet(),this.ui.phone("contacts")}},"Remove friend"),p("button",{class:"btn ghost",onclick:()=>this.ui.setBlock(t,"mute")},"Mute (hide their chats, calls and voice notes)"),p("button",{class:"btn red",onclick:()=>this.ui.setBlock(t,"block")},"Block")),p("p",{class:"mut"},"Mute and block apply to chats, calls and voice notes.")])}async messages(){let t=await this.ui.guard(()=>zt("/api/phone/threads"));return t?(this.p.badges.msgs=t.threads.reduce((e,n)=>e+n.unread,0),this.p.drawBadge(),[p("button",{class:"btn small",id:"newChat",onclick:()=>this.go("contacts")},"\uFF0B New chat from Contacts"),t.threads.length?p("div",{class:"list"},t.threads.map(e=>p("div",{class:"prow tap","data-thread":e.with,onclick:()=>this.go("chat:"+e.with)},p("span",{},Ho(e.state),p("b",{},` @${e.with}`),p("div",{class:"mut small"},e.last?e.last.kind==="voice"?"\u{1F3A4} Voice note":e.last.text:"")),e.unread?p("b",{class:"pbadge inl"},String(e.unread)):""))):p("p",{class:"mut"},"No chats yet. Open Contacts and tap \u{1F4AC} on a friend.")]):[]}async chat(t){let e=p("div",{class:"chatlog","data-chat-open":t}),n=0,i=new Set,r="offline",o=f=>{if(f.kind==="system")return p("div",{class:"sysmsg"},f.text);let g=f.mine,y=f.kind==="voice"?this.voiceBubble(f):p("span",{},f.text);return p("div",{class:`bub ${g?"me":"them"}`,"data-msg":f.id},y,p("small",{class:"mut"},Jl(f.at)))},a=async(f=!0)=>{let g=await zt(`/api/phone/thread?with=${encodeURIComponent(t)}&after=${n}${f?"":"&read=0"}`).catch(()=>null);if(g){r=g.state,c.replaceChildren(Ho(g.state),p("b",{},` @${t}`),p("small",{class:"mut"},` ${g.state.replace("_"," ")}`)),g.friends||d.replaceChildren(p("p",{class:"mut"},"You can only chat with friends."),p("button",{class:"btn small",onclick:async()=>{await this.ui.guard(()=>ct("/api/phone/friends/request",{username:t})),this.ui.toast("Friend request sent.")}},"Send friend request"));for(let y of g.messages)i.has(y.id)||(i.add(y.id),n=Math.max(n,y.id),e.append(o(y)),e.scrollTop=e.scrollHeight);e.querySelectorAll(".bub.me").forEach(y=>{y.classList.toggle("read",Number(y.dataset.msg)<=g.readByThem)})}};this.chatPoll=()=>a();let c=p("div",{class:"chead"}),l=p("input",{class:"sheet-input",id:"phChatInput",placeholder:"Message\u2026",maxlength:500,onkeydown:f=>{f.stopPropagation(),f.key==="Enter"&&u()}}),u=async()=>{let f=l.value.trim();if(!f)return;l.value="",await this.ui.guard(()=>ct("/api/phone/messages",{to:t,text:f}))&&await a()},h=this.recorder(t,()=>a()),d=p("div",{class:"row chcomp"},l,p("button",{class:"btn small",id:"phChatSend",onclick:u},"Send"),h.btn);return await a(),this.chatTimer=setInterval(()=>{if(!e.isConnected)return clearInterval(this.chatTimer);a()},4e3),[p("div",{class:"row sp"},c,p("button",{class:"btn small",id:"phChatCall",onclick:()=>this.p.dial(t)},"\u{1F4DE} Call")),e,d,p("p",{class:"mut small"},"Report a message or voice note: press and hold it. Mute and block are under Contacts \u22EF.")]}voiceBubble(t){let e=t.voice;if(e.gone)return p("span",{class:"mut"},"\u{1F3A4} Voice note expired or removed");let n=(e.waveform?.length?e.waveform:Array.from({length:28},(o,a)=>30+a*37%60)).map(o=>p("i",{style:`height:${Math.max(12,o*.3)}px`})),i=p("button",{class:"vplay","data-voice":e.id,onclick:()=>this.play(e.id,i)},"\u25B6");return p("span",{class:"vnote"},i,p("span",{class:"vwave"},n),p("small",{},Fy(e.durationMs)),p("button",{class:"vrep",title:"Report",onclick:()=>this.ui.reportSheet("voice_note",String(e.id),"a voice note")},"\u{1F6A9}"))}play(t,e){let n=this.audio;if(n&&(n.pause(),this.audioBtn&&(this.audioBtn.textContent="\u25B6"),this.audioId===t)){this.audio=null;return}let i=this.audio=new Audio(`/api/phone/voice/${t}`);this.audioId=t,this.audioBtn=e,e.textContent="\u23F8",i.onended=()=>{e.textContent="\u25B6"},i.onerror=()=>{e.textContent="\u25B6",this.ui.toast("Could not play that voice note.")},i.play().catch(()=>{e.textContent="\u25B6"})}recorder(t,e){let n=Pd(),i=p("button",{class:"btn small alt",id:"recBtn",title:"Voice note"},"\u{1F3A4}"),r=null,o=[],a=0,c=null,l=null,u=[],h=null,d=null;if(!n||!navigator.mediaDevices?.getUserMedia||window.__naDemo)return i.disabled=!0,i.title=window.__naDemo?"Voice notes need the live server":"Your browser cannot record voice notes",{btn:i};let f=g=>{if(clearInterval(l),!r)return;let y=r;r=null,y.onstop=async()=>{c?.getTracks().forEach(k=>k.stop());try{d?.close()}catch{}if(i.textContent="\u{1F3A4}",i.classList.remove("rec"),!g)return;let x=new Blob(o,{type:y.mimeType||n}),m=Date.now()-a,v=u.length?u.join(","):"",M=await fetch(`/api/phone/voice?to=${encodeURIComponent(t)}`,{method:"POST",headers:{"content-type":(x.type||n).split(";")[0],"x-duration-ms":String(m),"x-waveform":v},body:x}),_=await M.json().catch(()=>({}));M.ok?e():this.ui.toast(_.message||"Could not send the voice note.")},y.stop()};return i.onclick=async()=>{if(r)return f(!0);if(await this.p.consentOk()){try{c=await navigator.mediaDevices.getUserMedia({audio:!0})}catch(g){return this.ui.toast(this.p.micMsg(g))}o=[],u=[],r=new MediaRecorder(c,{mimeType:n,audioBitsPerSecond:24e3}),r.ondataavailable=g=>{g.data.size&&o.push(g.data)};try{d=new(window.AudioContext||window.webkitAudioContext),h=d.createAnalyser(),d.createMediaStreamSource(c).connect(h)}catch{h=null}r.start(250),a=Date.now(),i.textContent="\u23F9 0s",i.classList.add("rec"),l=setInterval(()=>{let g=Math.round((Date.now()-a)/1e3);if(i.textContent=`\u23F9 ${g}s`,h){let y=new Uint8Array(h.fftSize);h.getByteTimeDomainData(y);let x=0;for(let m of y)x=Math.max(x,Math.abs(m-128));u.length<48&&g*1e3%1250<1e3&&u.push(Math.min(100,Math.round(x*1.6)))}g>=60&&f(!0)},500)}},i.oncontextmenu=g=>{g.preventDefault(),f(!1)},{btn:i}}async calls(){let t=await this.ui.guard(()=>zt("/api/phone/friends"));if(!t)return[];let e=await this.ui.guard(()=>zt("/api/phone/threads")),n=[];for(let i of e?.threads||[])i.last?.kind==="system"&&n.push({who:i.with,text:i.last.text,at:i.last.at});return n.sort((i,r)=>r.at-i.at),[p("p",{class:"mut"},"Call a friend. Calls are voice only, peer to peer, never recorded."),p("div",{class:"list"},t.friends.map(i=>p("div",{"data-call-friend":i.username},p("span",{},Ho(i.state),` @${i.username}`),p("button",{class:"btn small",disabled:i.state==="offline"||i.state==="dnd"?"disabled":null,onclick:()=>this.p.dial(i.username)},"\u{1F4DE} Call")))),t.friends.length?"":p("p",{class:"mut"},"No friends yet. Add some in Contacts."),n.length?p("div",{},p("b",{},"Recent"),p("div",{class:"list"},n.slice(0,8).map(i=>p("div",{},p("span",{},`${i.text}`),p("span",{class:"mut"},`@${i.who} \xB7 ${Jl(i.at)}`))))):""]}async settings(){if(this.g.user?.guest)return[];let t=await this.ui.guard(()=>zt("/api/phone/settings"));if(!t)return[];let e=(i,r)=>async()=>{await this.ui.guard(()=>ct("/api/phone/settings",{[i]:r})),this.draw()},n=(i,r,o)=>p("div",{class:"prow"},p("span",{},i),p("button",{class:`btn small ${r?"":"ghost"}`,"data-setting":o,onclick:e(o,!r)},r?"On":"Off"));return[n("Do not disturb (calls go to missed)",t.dnd,"dnd"),n("Show my online dot to friends",t.showPresence,"showPresence"),p("div",{class:"prow"},p("span",{},"Calls from"),p("button",{class:"btn small ghost","data-setting":"callsFrom",onclick:e("callsFrom",t.callsFrom==="friends"?"nobody":"friends")},t.callsFrom)),p("div",{class:"prow"},p("span",{},"Voice notes from"),p("button",{class:"btn small ghost","data-setting":"voiceNotesFrom",onclick:e("voiceNotesFrom",t.voiceNotesFrom==="friends"?"nobody":"friends")},t.voiceNotesFrom)),p("p",{class:"mut small"},t.voiceConsent?"Voice notice accepted.":"You will be asked to accept the voice notice the first time you record or call.")]}};var By=s=>{let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}};function Kl(s,t){let e=[];if(s.forEach((i,r)=>{i||e.push(r)}),!e.length)return s;let n=e[Math.floor(t()*e.length)];return s[n]=t()<.1?4:2,s}function Dd(s){let t=By(s),e=Array(16).fill(0);return Kl(e,t),Kl(e,t),{grid:e,score:0,rng:t,moves:0,over:!1}}function Hy(s){let t=s.filter(Boolean),e=[],n=0;for(let i=0;i<t.length;i++)t[i]===t[i+1]?(e.push(t[i]*2),n+=t[i]*2,i++):e.push(t[i]);for(;e.length<4;)e.push(0);return{out:e,gained:n}}function kd(s,t){let e=s.slice(),n=0,i=(r,o)=>r*4+o;for(let r=0;r<4;r++){let o=[];for(let l=0;l<4;l++)o.push(t==="L"?i(r,l):t==="R"?i(r,3-l):i(t==="U"?l:3-l,r));let{out:a,gained:c}=Hy(o.map(l=>s[l]));n+=c,o.forEach((l,u)=>{e[l]=a[u]})}return{grid:e,gained:n,moved:e.some((r,o)=>r!==s[o])}}var Vy=s=>["L","R","U","D"].some(t=>kd(s,t).moved);function Ud(s,t){if(s.over||!"LRUD".includes(t)||t.length!==1)return!1;let e=kd(s.grid,t);return e.moved?(s.grid=e.grid,s.score+=e.gained,s.moves++,Kl(s.grid,s.rng),Vy(s.grid)||(s.over=!0),!0):!1}var Wy={merge:"Merge Am",memory:"Pair Am",word:"Word of the Day"},$y={danfo:"\u{1F68C}",keke:"\u{1F6FA}",suya:"\u{1F362}",akara:"\u{1F96F}",ankara:"\u{1F9F5}",naira:"\u20A6",agbada:"\u{1F458}",gele:"\u{1F451}"},Xy=s=>new Promise(t=>setTimeout(t,s));async function Od(s){let t=await s.guard(()=>zt("/api/casual"));return t?[p("div",{class:"row sp"},p("b",{},"\u{1F3AE} Break games"),p("span",{class:"tag amber"},`Today ${xt(t.earnedToday)} / ${xt(t.dailyCap)}`)),p("p",{class:"mut"},"Quick games for a breather. Game money only: small rewards, capped every day (ESTIMATE numbers). No cash-out."),t.rewardsOn?"":p("p",{class:"mut"},"Your account is brand new: you can play now and rewards start in a few minutes."),p("div",{class:"list"},t.games.map(e=>p("div",{},p("span",{},p("b",{},e.name),p("small",{class:"mut"},` \xB7 ${e.blurb} (also at ${e.where})${e.best?` \xB7 best ${e.best}`:""}${e.doneToday?" \xB7 done today \u2713":""}`)),p("button",{class:"btn small alt","data-casual":e.id,onclick:()=>jl(s,e.id)},"Play"))))]:[]}function jl(s,t){let e=p("div",{class:"casual"}),n=null;s.openSheet(Wy[t],e,()=>n?.()),t==="merge"?n=Yy(s,e):t==="memory"?n=qy(s,e):Zy(s,e)}function Ql(s,t,e){let n=[p("b",{},e),t.reward?p("span",{class:"tag green"},`+${xt(t.reward)} game money`):p("span",{class:"tag"},"No reward this time"),t.note?p("small",{class:"mut"},t.note):""];return t.reward&&s.toast(`+${xt(t.reward)} game money. Nice one!`,"money"),s.g.refreshMe?.(),p("div",{class:"banner win casualres"},...n)}function Yy(s,t){let e=null,n=null,i="",r=!1,o=p("div",{class:"mgrid"}),a=p("b",{id:"mScore"},"0"),c=p("div",{}),l=()=>{o.replaceChildren(...n.grid.map(m=>p("div",{class:`mt mt${Math.min(m,2048)}`,"data-v":m},m?String(m):""))),a.textContent=String(n.score)},u=m=>{r||!n||Ud(n,m)&&(i+=m,l(),n.over&&h())},h=async()=>{if(r)return;r=!0;let m=await s.guard(()=>ct("/api/casual/merge/submit",{runId:e.runId,moves:i}));c.replaceChildren(m?Ql(s,m,`Score ${m.score} \xB7 biggest tile ${m.best}`):p("p",{class:"mut"},"Could not count that game (too short or too fast). Try again."),p("button",{class:"btn alt",onclick:d},"Play again"))},d=async()=>{let m=await s.guard(()=>ct("/api/casual/merge/start"));m&&(e=m,n=Dd(m.seed),i="",r=!1,c.replaceChildren(),l())},f=m=>{let v={ArrowLeft:"L",ArrowRight:"R",ArrowUp:"U",ArrowDown:"D"}[m.key];v&&(m.preventDefault(),m.stopPropagation(),u(v))};document.addEventListener("keydown",f,!0);let g=0,y=0;o.addEventListener("pointerdown",m=>{g=m.clientX,y=m.clientY}),o.addEventListener("pointerup",m=>{let v=m.clientX-g,M=m.clientY-y;Math.max(Math.abs(v),Math.abs(M))<24||u(Math.abs(v)>Math.abs(M)?v>0?"R":"L":M>0?"D":"U")});let x=p("div",{class:"mpad"},["L","U","D","R"].map(m=>p("button",{class:"btn small","data-dir":m,onclick:()=>u(m)},{L:"\u2B05",U:"\u2B06",D:"\u2B07",R:"\u27A1"}[m])));return t.replaceChildren(p("div",{class:"row sp"},p("span",{},"Score ",a),p("button",{class:"btn small ghost",id:"mFinish",onclick:()=>i.length>=20?h():s.toast("Play at least 20 moves first.")},"Finish and claim")),p("p",{class:"mut"},"Slide with arrows or swipe. Equal tiles join. The server replays your moves to check the score."),o,x,c),d(),window.__merge={move:u,get log(){return i},get game(){return n}},()=>document.removeEventListener("keydown",f,!0)}function qy(s,t){let e=null,n=!1,i=[],r=!1,o=p("div",{}),a=p("b",{id:"pMoves"},"Tries 0"),c=g=>p("button",{class:"mc","data-i":g,onclick:()=>d(g)},"\u2753"),l=p("div",{class:"mgrid mem"}),u=(g,y,x)=>{let m=l.children[g];m.textContent=$y[y]||"?",m.classList.add("up"),x&&m.classList.add("ok")},h=g=>{let y=l.children[g];y.textContent="\u2753",y.classList.remove("up")},d=async g=>{if(n||r||l.children[g].classList.contains("up"))return;n=!0;let y=await s.guard(()=>ct("/api/casual/memory/flip",{runId:e.runId,i:g}));if(!y){n=!1;return}u(g,y.symbolName,y.result==="match"),a.textContent=`Tries ${y.moves}`,y.result==="match"?(u(y.other,y.symbolName,!0),i.push(g,y.other)):y.result==="miss"&&(await Xy(800),h(g),h(y.other)),y.done&&(r=!0,o.replaceChildren(Ql(s,y,`Done in ${y.moves} tries`),p("button",{class:"btn alt",onclick:f},"Play again"))),n=!1},f=async()=>{let g=await s.guard(()=>ct("/api/casual/memory/start"));g&&(e=g,r=!1,n=!1,i=[],a.textContent="Tries 0",l.replaceChildren(...Array.from({length:g.cards},(y,x)=>c(x))),o.replaceChildren())};return t.replaceChildren(p("div",{class:"row sp"},a,p("span",{class:"mut"},"Fewer tries = more game money")),l,o),f(),null}function Zy(s,t){let e=null,n="",i=p("div",{class:"wgrid"}),r=p("div",{}),o=p("div",{class:"wkeys"}),a=()=>{let d={};for(let f of e.guesses)[...f.word].forEach((g,y)=>{d[g]=Math.max(d[g]??-1,f.marks[y])});return d},c=()=>{let d=[];for(let g=0;g<e.maxGuesses;g++){let y=e.guesses[g],x=y?y.word:g===e.guesses.length?n.padEnd(5):"     ";d.push(p("div",{class:"wrow"},[...x].map((m,v)=>p("span",{class:`wl ${y?"m"+y.marks[v]:""}`},m.trim().toUpperCase()))))}i.replaceChildren(...d);let f=a();o.replaceChildren(...["qwertyuiop","asdfghjkl","zxcvbnm"].map(g=>p("div",{class:"wkr"},[...g].map(y=>p("button",{class:`wk ${f[y]!=null?"m"+f[y]:""}`,"data-k":y,onclick:()=>l(y)},y.toUpperCase())))),p("div",{class:"wkr"},p("button",{class:"btn small",onclick:()=>l("<")},"\u232B"),p("button",{class:"btn small alt",id:"wEnter",onclick:()=>l(">")},"Enter")))},l=async d=>{if(!(!e||e.status!=="playing")){if(d==="<")n=n.slice(0,-1);else if(d===">"){if(n.length!==5)return s.toast("Type 5 letters.");let f=await s.guard(()=>ct("/api/casual/word/guess",{word:n}));if(!f)return;e.guesses=f.guesses,e.status=f.status,n="",f.status!=="playing"&&(e.answer=f.answer,u(f))}else n.length<5&&(n+=d);c()}},u=d=>r.replaceChildren(Ql(s,d||{reward:e.reward},e.status==="won"?`Correct! The word was ${e.answer.toUpperCase()}`:`Not today. The word was ${e.answer.toUpperCase()}`),p("p",{class:"mut"},"A new word comes tomorrow.")),h=d=>{s.sheetOpen&&(/^[a-z]$/i.test(d.key)&&!d.ctrlKey&&!d.metaKey?(d.stopPropagation(),d.preventDefault(),l(d.key.toLowerCase())):d.key==="Backspace"?(d.preventDefault(),d.stopPropagation(),l("<")):d.key==="Enter"&&(d.preventDefault(),d.stopPropagation(),l(">")))};document.addEventListener("keydown",h,!0),s.onClose=()=>document.removeEventListener("keydown",h,!0),t.replaceChildren(p("p",{class:"mut"},"Guess the 5-letter word in six tries. Green = right place, amber = in the word, grey = not there. Nigerian and everyday words."),i,r,o),zt("/api/casual/word").then(d=>{e=d,c(),d.status!=="playing"&&u()}).catch(()=>s.toast("Could not load today's word."))}var Wo={house:"#8fb0c9",kiosk:"#9bc59d",market:"#e0a85c",office:"#9aa3b8",tower:"#6c7aa6",shop:"#f0c04a",airport:"#cfd8e3"},Ky={house:"House",kiosk:"Kiosk",market:"Market",office:"Office block",tower:"Tower block",shop:"Shop",airport:"Airport terminal"},jy={venue_mamaput:"\u{1F372}",venue_viewing:"\u{1F4FA}",venue_joint:"\u{1F3B2}",venue_meco:"\u{1F527}",venue_motors:"\u{1F697}"},Nd=[["districts","Districts","#d9c7a3"],["roads","Roads and names","#3d4046"],["buildings","Buildings","#8fb0c9"],["venues","Venues and shops","#ffc20e"],["jobs","Jobs","#4aa3ff"],["homes","Homes for rent","#e56b6f"],["plots","Land plots","#7fb069"],["landmarks","Landmarks","#b44cff"],["billboards","Billboard spots","#35c46b"],["players","Players nearby","#ffffff"]],th={districts:!0,roads:!0,buildings:!0,venues:!0,jobs:!0,homes:!0,plots:!0,landmarks:!0,billboards:!1,players:!0},Qy=s=>{if(An(s)){let e=s.width/2,n=s.pts.map(r=>r[0]),i=s.pts.map(r=>r[1]);return{x0:Math.min(...n)-e,x1:Math.max(...n)+e,z0:Math.min(...i)-e,z1:Math.max(...i)+e}}let t=s.width/2;return{x0:Math.min(s.x1,s.x2)-(s.x1===s.x2?t:0),x1:Math.max(s.x1,s.x2)+(s.x1===s.x2?t:0),z0:Math.min(s.z1,s.z2)-(s.z1===s.z2?t:0),z1:Math.max(s.z1,s.z2)+(s.z1===s.z2?t:0)}},Go=s=>`\u20A6${Math.round(s).toLocaleString("en-NG")}`;function zd(s){let t=c=>s.placeById?.[c]||(s.places||[]).find(l=>l.id===c),e=[];for(let c of s.venues||[])e.push({type:"venue",id:c.id,name:c.name,x:c.x,z:c.z,icon:jy[c.id]||"\u{1F3B2}",lines:[c.blurb||"A place to hang out.",c.hours?`Open ${c.hours[0]}:00 to ${c.hours[1]}:00`:""],placeId:c.id,group:"Venues"});for(let c of s.shops||[])(s.venues||[]).some(l=>l.shopId===c.id)||e.push({type:"shop",id:c.id,name:c.name,x:c.x,z:c.z,icon:"\u{1F6D2}",lines:[c.desc||"Shop"],placeId:c.id,group:"Shops"});for(let c of s.jobs||[])e.push({type:"job",id:c.id,name:c.label,x:c.x,z:c.z,icon:"\u{1F4BC}",lines:["Job: start a shift here"],placeId:c.id,group:"Jobs"});for(let c of s.landmarks||[])e.push({type:"landmark",id:c.id,name:c.name,x:c.x,z:c.z,icon:"\u26F2",lines:["Landmark"],placeId:t(c.id)?c.id:null,group:"Landmarks"});for(let c of s.buildings)c.kind==="airport"&&e.push({type:"landmark",id:c.id,name:c.label||"Airport",x:c.x,z:c.z,icon:"\u2708\uFE0F",lines:["Landmark"],placeId:t("airport")?"airport":null,group:"Landmarks"});for(let c of s.plots||[])e.push({type:"plot",id:c.id,name:c.name,x:c.x,z:c.z,size:c.size,icon:"\u{1F30D}",lines:[`${c.area} \xB7 ${c.sqm} sqm`,`Price ${Go(c.price)} \xB7 growth ${(c.growthPerWeek*100).toFixed(0)}%/week (ESTIMATE)`,`Omo-onile risk: ${c.risk}`],placeId:c.id,group:"Land plots"});for(let c of s.properties||[])e.push({type:"house",id:c.id,name:c.name,x:c.door.x,z:c.door.z,icon:"\u{1F3E0}",lines:[`${c.tierLabel}`,c.price?`Price ${Go(c.price)}`:`Rent ${Go(c.rent)}/week`,c.area||""],placeId:c.id,buildingId:c.buildingId,group:"Homes"});for(let c of s.billboards||[])c.surface!=="lagoon_plot"&&e.push({type:"billboard",id:c.id,name:`Billboard spot ${c.id}`,x:c.x,z:c.z,icon:"\u{1FAA7}",lines:[`${c.tier} tier ad space (${c.w}x${c.h} m)`,"Advertise from the ads page"],placeId:null,group:"Billboard spots"});let n=(s.roads||[]).map(c=>({...c,pts:qn(c),curved:An(c),rect:Qy(c),vertical:!An(c)&&c.x1===c.x2})),i=(s.roundabouts||[]).map(c=>({...c})),r=(s.districts||[]).map(c=>({...c})),o=s.buildings.map(c=>{let l=(s.properties||[]).find(h=>h.id===c.propertyId),u=Ky[c.kind]||c.kind;return{...c,name:c.label||l?.name||u,kindName:u,rect:{x0:c.x-c.w/2,x1:c.x+c.w/2,z0:c.z-c.d/2,z1:c.z+c.d/2},property:l||null}}),a=[...e.filter(c=>c.type!=="billboard"),...n.map(c=>{let l=xd(c);return{type:"road",id:c.id,name:c.name,x:l[0],z:l[1],group:"Roads",lines:[c.curved?"Curved road":`${c.vertical?"North-south":"East-west"} road`]}}),...i.map(c=>({type:"roundabout",id:c.id,name:c.name,x:c.x,z:c.z,group:"Roads",lines:["Roundabout (traffic circulates counter-clockwise on the map)"]})),...r.map(c=>({type:"district",id:c.id,name:c.name,x:(c.x0+c.x1)/2,z:(c.z0+c.z1)/2,group:"Districts",lines:["District"]}))];return{city:s,items:e,roads:n,roundabouts:i,districts:r,buildings:o,catalogue:a,bounds:s.bounds,water:s.water||null,zones:s.zones||[]}}function Fd(s,t,e=12){let n=String(t||"").trim().toLowerCase();if(!n)return s.catalogue.filter(r=>["venue","shop","landmark","district"].includes(r.type)).slice(0,e);let i=[];for(let r of s.catalogue){let o=r.name.toLowerCase(),a=-1;o.startsWith(n)?a=3:o.split(/[\s(]+/).some(c=>c.startsWith(n))?a=2:(o.includes(n)||(r.group||"").toLowerCase().startsWith(n))&&(a=1),a>0&&i.push([a,r])}return i.sort((r,o)=>o[0]-r[0]||r[1].name.localeCompare(o[1].name)).slice(0,e).map(r=>r[1])}function Bd(s,t,e,n,i=th,r=[]){let o=16/n,a=h=>Math.hypot(h.x-t,h.z-e)<=o;for(let h of r)if(i.players&&a(h))return{type:"player",id:h.id,name:`@${h.name}`,x:h.x,z:h.z,lines:["Another player nearby"]};let c={venue:"venues",shop:"venues",job:"jobs",landmark:"landmarks",house:"homes",billboard:"billboards",plot:"plots"},l=null,u=1/0;for(let h of s.items){if(!i[c[h.type]]||h.type==="house"&&n<1.5||h.type==="plot")continue;let d=Math.hypot(h.x-t,h.z-e);d<=o&&d<u&&(l=h,u=d)}if(l)return l;if(i.buildings){for(let h of s.buildings)if(t>=h.rect.x0&&t<=h.rect.x1&&e>=h.rect.z0&&e<=h.rect.z1){let d=h.property;return{type:"building",id:h.id,name:h.name,x:h.x,z:h.z,rect:h.rect,icon:d?"\u{1F3E0}":"\u{1F3E2}",placeId:d?.id||null,lines:[h.kindName+(h.floors>1?` \xB7 ${h.floors} floors`:""),d?`${d.tierLabel} \xB7 rent ${Go(d.rent)}/week`:""].filter(Boolean),group:"Buildings"}}}if(i.plots){for(let h of s.items)if(h.type==="plot"&&Math.abs(h.x-t)<=h.size/2&&Math.abs(h.z-e)<=h.size/2)return{...h,rect:{x0:h.x-h.size/2,x1:h.x+h.size/2,z0:h.z-h.size/2,z1:h.z+h.size/2}}}if(i.roads){for(let h of s.roundabouts)if(Math.hypot(t-h.x,e-h.z)<=h.outerR)return{type:"roundabout",id:h.id,name:h.name,x:h.x,z:h.z,rect:{x0:h.x-h.outerR,x1:h.x+h.outerR,z0:h.z-h.outerR,z1:h.z+h.outerR},lines:["Roundabout"],group:"Roads"}}if(i.roads){for(let h of s.roads)if(h.curved&&Vl(h.pts,t,e).d<=h.width/2)return{type:"road",id:h.id,name:h.name,x:t,z:e,rect:h.rect,lines:[`Curved road \xB7 ${h.width} m wide`],group:"Roads"}}if(i.roads){for(let h of s.roads)if(!h.curved&&t>=h.rect.x0&&t<=h.rect.x1&&e>=h.rect.z0&&e<=h.rect.z1)return{type:"road",id:h.id,name:h.name,x:t,z:e,rect:h.rect,lines:[`${h.vertical?"North-south":"East-west"} road \xB7 ${h.width} m wide`],group:"Roads"}}if(i.districts){for(let h of s.districts)if(t>=h.x0&&t<h.x1&&e>=h.z0&&e<h.z1)return{type:"district",id:h.id,name:h.name,x:t,z:e,lines:["District"],group:"Districts"}}return s.water&&e>=s.water.minZ&&e<=s.water.maxZ&&t>=s.water.minX&&t<=s.water.maxX?{type:"water",id:"water",name:"Lagoon",x:t,z:e,lines:["Water. No swimming!"]}:null}var Ui={district:s=>s<2.2,road:s=>s>=.9,venue:s=>s>=1.2,shop:s=>s>=1.8,job:s=>s>=2.6,landmark:s=>s>=.9,plot:s=>s>=1.4,house:s=>s>=3,building:s=>s>=3.6,billboard:s=>s>=3,player:s=>s>=1.5};var $o=class{constructor(t){this.g=t,this.model=null,this.layers={...th},this.open_=!1,this.cache=null,this.sel=null,this.hover=null,this.pins=new Map}get isOpen(){return this.open_}open(t){if(this.open_)return;let e=this.g;this.model=this.model||zd(e.city),this.open_=!0,this.dpr=Math.min(2,window.devicePixelRatio||1),this.canvas=p("canvas",{class:"bm-canvas"}),this.ctx=this.canvas.getContext("2d"),this.card=p("div",{class:"bm-card hidden"}),this.list=p("div",{class:"bm-list hidden"}),this.legend=p("div",{class:"bm-legend hidden"}),this.input=p("input",{class:"bm-search",placeholder:"Search places, roads, districts\u2026",type:"search",autocomplete:"off"}),this.input.addEventListener("input",()=>this.showList()),this.input.addEventListener("focus",()=>this.showList());let n=p("div",{class:"bm-top"},p("b",{class:"bm-title"},`\u{1F5FA} ${e.city.name||"Map"}`),this.input,p("button",{class:"bm-btn",id:"bmMe",title:"Centre on me",onclick:()=>this.centreMe()},"\u25CE"),p("button",{class:"bm-btn",id:"bmLegend",title:"Layers",onclick:()=>this.legend.classList.toggle("hidden")},"\u2630"),p("button",{class:"bm-btn",id:"bmClose",onclick:()=>this.close()},"\u2715")),i=p("div",{class:"bm-zoom"},p("button",{class:"bm-btn",id:"bmIn",onclick:()=>this.zoomBy(1.5)},"+"),p("button",{class:"bm-btn",id:"bmOut",onclick:()=>this.zoomBy(1/1.5)},"\u2212"));this.root=p("div",{id:"bigmap"},this.canvas,n,this.list,this.legend,i,this.card),document.body.appendChild(this.root),this.drawLegend(),this.resize(),this.fit();let r=e.ctrl;r&&(this.v.cx=r.x,this.v.cz=r.z,this.v.k=Math.max(this.v.k,1.6)),this.bind(),this.onKey=a=>{a.key==="Escape"&&(a.target===this.input?(this.input.blur(),this.list.classList.add("hidden")):this.close(),a.stopPropagation())},document.addEventListener("keydown",this.onKey,!0),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize);let o=()=>{this.open_&&(this.draw(),this.raf=requestAnimationFrame(o))};this.raf=requestAnimationFrame(o),t&&this.focusOn(this.model.catalogue.find(a=>a.id===t)),window.__bigmap=this}close(){this.open_&&(this.open_=!1,cancelAnimationFrame(this.raf),document.removeEventListener("keydown",this.onKey,!0),removeEventListener("resize",this.onResize),this.root.remove(),this.cache=null)}toggle(){this.open_?this.close():this.open()}resize(){let t=this.root.getBoundingClientRect();this.W=Math.max(200,Math.round(t.width)),this.H=Math.max(200,Math.round(t.height)),this.canvas.width=this.W*this.dpr,this.canvas.height=this.H*this.dpr,this.canvas.style.width=this.W+"px",this.canvas.style.height=this.H+"px"}extent(){let t=this.model.bounds,e=this.model.water;return{x0:Math.min(t.minX,e?.minX??t.minX),x1:Math.max(t.maxX,e?.maxX??t.maxX),z0:t.minZ,z1:Math.max(t.maxZ,e?.maxZ??t.maxZ)}}fit(){let t=this.model.bounds;this.kMin=Math.min(this.W/(t.maxX-t.minX+40),this.H/(t.maxZ-t.minZ+40))*.9,this.kMax=14,this.v={cx:(t.minX+t.maxX)/2,cz:(t.minZ+t.maxZ)/2,k:this.kMin*1.05}}sx(t){return(t-this.v.cx)*this.v.k+this.W/2}sz(t){return(t-this.v.cz)*this.v.k+this.H/2}wx(t){return(t-this.W/2)/this.v.k+this.v.cx}wz(t){return(t-this.H/2)/this.v.k+this.v.cz}zoomAt(t,e,n){let i=this.wx(t),r=this.wz(e);this.v.k=Math.min(this.kMax,Math.max(this.kMin,this.v.k*n)),this.v.cx=i-(t-this.W/2)/this.v.k,this.v.cz=r-(e-this.H/2)/this.v.k}zoomBy(t){this.zoomAt(this.W/2,this.H/2,t)}centreMe(){let t=this.g.ctrl;this.v.cx=t.x,this.v.cz=t.z,this.v.k=Math.max(this.v.k,2.5)}focusOn(t){t&&(this.v.cx=t.x,this.v.cz=t.z,this.v.k=Math.max(this.v.k,t.type==="district"?this.kMin*1.8:t.type==="road"?2:4.5))}drawStatic(t,e,n,i,r){let o=this.model,a=this.extent(),c=this.layers;t.fillStyle="#2b6f8a",t.fillRect(e(a.x0-100),n(a.z0-100),(a.x1-a.x0+200)*i,(a.z1-a.z0+200)*i);let l=o.bounds;if(t.fillStyle="#d3cdb4",t.fillRect(e(l.minX),n(l.minZ),(l.maxX-l.minX)*i,(l.maxZ-l.minZ)*i),o.water){t.fillStyle="#3d86a6",t.fillRect(e(o.water.minX),n(o.water.minZ),(o.water.maxX-o.water.minX)*i,(o.water.maxZ-o.water.minZ)*i),t.strokeStyle="#ffffff40",t.lineWidth=Math.max(1,i*.4);for(let h=o.water.minZ+14;h<o.water.maxZ;h+=22){t.beginPath();for(let d=o.water.minX;d<o.water.maxX;d+=30)t.moveTo(e(d),n(h)),t.quadraticCurveTo(e(d+7),n(h-3),e(d+15),n(h));t.stroke()}}if(c.districts)for(let h of o.districts)t.fillStyle=h.color+"88",t.fillRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);t.fillStyle="#c3c8a6";for(let h of o.zones)t.fillRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);if(c.districts){t.setLineDash([6,5]),t.strokeStyle="#6b5b3e99",t.lineWidth=1.2;for(let h of o.districts)t.strokeRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);t.setLineDash([])}if(c.plots){for(let h of o.items)if(h.type==="plot"){let d=e(h.x-h.size/2),f=n(h.z-h.size/2),g=h.size*i;t.fillStyle="#9bc47a",t.fillRect(d,f,g,g),t.strokeStyle="#4f7a3a",t.lineWidth=1.5,t.setLineDash([5,3]),t.strokeRect(d,f,g,g),t.setLineDash([]),t.beginPath();for(let y=0;y<=g;y+=Math.max(6,g/6))t.moveTo(d+y,f),t.lineTo(d,f+y);t.strokeStyle="#4f7a3a55",t.stroke()}}if(c.roads){let h=d=>{t.beginPath(),d.forEach((f,g)=>g?t.lineTo(e(f[0]),n(f[1])):t.moveTo(e(f[0]),n(f[1])))};t.lineJoin="round";for(let d of o.roads){let f=d.width*i;t.lineCap="butt",t.strokeStyle="#b9b39a",t.lineWidth=f+6*Math.min(1.5,i/2),h(d.pts),t.stroke()}for(let d of o.roundabouts)t.fillStyle="#b9b39a",t.beginPath(),t.arc(e(d.x),n(d.z),d.outerR*i+3*Math.min(1.5,i/2),0,7),t.fill();for(let d of o.roads){let f=d.width*i;t.strokeStyle="#3d4046",t.lineWidth=f,h(d.pts),t.stroke()}for(let d of o.roundabouts)t.fillStyle="#3d4046",t.beginPath(),t.arc(e(d.x),n(d.z),d.outerR*i,0,7),t.fill(),t.fillStyle="#b9b39a",t.beginPath(),t.arc(e(d.x),n(d.z),(d.islandR+.6)*i,0,7),t.fill(),t.fillStyle="#5a9a4e",t.beginPath(),t.arc(e(d.x),n(d.z),d.islandR*i,0,7),t.fill(),t.strokeStyle="#f2d23c",t.lineWidth=Math.max(1,i*.35),t.setLineDash([i*2,i*2]),t.beginPath(),t.arc(e(d.x),n(d.z),(d.outerR+d.islandR)/2*i,0,7),t.stroke(),t.setLineDash([]);for(let d of o.roads)if(t.strokeStyle="#f2d23c",t.lineWidth=Math.max(1,i*.35),t.setLineDash([i*4,i*3]),h(d.pts),t.stroke(),t.setLineDash([]),i>=2.5){t.strokeStyle="#ffffffaa",t.lineWidth=Math.max(1,i*.2);for(let f of[-d.width/2+.8,d.width/2-.8])h(sr(d.pts,f,!1)),t.stroke()}}if(c.buildings)for(let h of o.buildings){let d=e(h.rect.x0),f=n(h.rect.z0),g=h.w*i,y=h.d*i;t.fillStyle=Wo[h.kind]||"#999",t.fillRect(d,f,g,y),t.fillStyle="#00000022",t.fillRect(d+g*.08,f+y*.08,g*.84,y*.84),t.fillStyle=Wo[h.kind]||"#999",t.fillRect(d+g*.12,f+y*.12,g*.76,y*.76),t.strokeStyle="#33333388",t.lineWidth=1,t.strokeRect(d,f,g,y)}let u=(o.city.landmarks||[]).find(h=>h.kind==="plaza");u&&c.landmarks&&(t.fillStyle="#e8dfc2",t.beginPath(),t.arc(e(u.x),n(u.z),11*i,0,7),t.fill(),t.fillStyle="#6fb7d6",t.beginPath(),t.arc(e(u.x),n(u.z),4*i,0,7),t.fill())}staticLayer(){let t=JSON.stringify([this.layers.districts,this.layers.roads,this.layers.buildings,this.layers.plots,this.layers.landmarks]),e=this.extent(),n=e.x1-e.x0+200,i=e.z1-e.z0+100,r=Math.min(3,3e3/Math.max(n,i));if(this.cache&&this.cache.key===t)return this.cache;let o=document.createElement("canvas");o.width=Math.ceil(n*r),o.height=Math.ceil(i*r);let a=o.getContext("2d"),c=e.x0-100,l=e.z0-50;return this.drawStatic(a,u=>(u-c)*r,u=>(u-l)*r,r),this.cache={key:t,cv:o,ppu:r,ox:c,oz:l},this.cache}draw(){let t=this.ctx,e=this.v.k,n=this.dpr;t.setTransform(n,0,0,n,0,0),t.clearRect(0,0,this.W,this.H);let i=this.staticLayer();e<=i.ppu*1.2?(t.imageSmoothingEnabled=!0,t.drawImage(i.cv,this.sx(i.ox),this.sz(i.oz),i.cv.width*e/i.ppu,i.cv.height*e/i.ppu)):this.drawStatic(t,r=>this.sx(r),r=>this.sz(r),e,!0),this.drawLabels(t,e),this.drawDynamic(t,e)}text(t,e,n,i,r={}){t.font=`${r.w||700} ${r.s||12}px Nunito, system-ui, sans-serif`,t.textAlign=r.a||"center",t.textBaseline="middle",t.lineWidth=3.5,t.strokeStyle=r.stroke||"#fffdf3e6",t.lineJoin="round",t.strokeText(e,n,i),t.fillStyle=r.fill||"#2a2a2a",t.fillText(e,n,i)}onScreen(t,e,n=40){return t>-n&&e>-n&&t<this.W+n&&e<this.H+n}drawLabels(t,e){let n=this.model,i=this.layers;if(i.districts&&Ui.district(e)){let o=Math.min(1,(2.2-e)/.8);t.globalAlpha=Math.max(.35,o);for(let a of n.districts)this.text(t,a.name.toUpperCase(),this.sx((a.x0+a.x1)/2),this.sz((a.z0+a.z1)/2),{s:Math.max(13,Math.min(30,e*12)),w:800,fill:"#5b4a2a",stroke:"#ffffff99"});t.globalAlpha=1}if(i.roads&&Ui.road(e)){for(let o of n.roads){let a=Bl(o.pts),c=Math.max(1,Math.floor(a/170));for(let l=0;l<c;l++){let u=Hl(o.pts,a*(l+.5)/c),h=this.sx(u[0]),d=this.sz(u[1]);if(!this.onScreen(h,d))continue;t.save(),t.translate(h,d);let f=u[2];f>=Math.PI/2-1e-6&&(f-=Math.PI),f<-Math.PI/2&&(f+=Math.PI),t.rotate(f),this.text(t,o.name,0,0,{s:Math.max(10,Math.min(15,e*4.2)),fill:"#fff",stroke:"#3d4046"}),t.restore()}}for(let o of n.roundabouts){let a=this.sx(o.x),c=this.sz(o.z+o.outerR+4);this.onScreen(a,c)&&this.text(t,o.name,a,c,{s:Math.max(10,Math.min(14,e*3.6)),fill:"#2a2a2a"})}}let r={venue:"venues",shop:"venues",job:"jobs",landmark:"landmarks",house:"homes",billboard:"billboards"};for(let o of n.items){if(o.type==="plot"){i.plots&&Ui.plot(e)&&this.text(t,o.name,this.sx(o.x),this.sz(o.z),{s:11,fill:"#2f5a1f"});continue}if(!i[r[o.type]]||o.type==="house"&&e<1.5)continue;let a=this.sx(o.x),c=this.sz(o.z);if(!this.onScreen(a,c))continue;let u=o.type==="venue"||o.type==="landmark"?Math.max(18,Math.min(30,e*9)):o.type==="billboard"?14:Math.max(14,Math.min(22,e*6));t.fillStyle=o.type==="billboard"?"#35c46b":o.type==="job"?"#4aa3ff":o.type==="house"?"#e56b6f":"#ffc20e",t.beginPath(),t.arc(a,c,u*.62,0,7),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke(),t.font=`${u*.78}px system-ui`,t.textAlign="center",t.textBaseline="middle",t.fillStyle="#000",t.fillText(o.icon,a,c+1),Ui[o.type]?.(e)&&o.type!=="billboard"&&this.text(t,o.name,a,c+u*.62+9,{s:o.type==="venue"?12:11})}if(i.buildings&&Ui.building(e))for(let o of n.buildings){let a=this.sx(o.x),c=this.sz(o.z);this.onScreen(a,c)&&this.text(t,o.name,a,c,{s:10,w:600})}}playersNow(){let t=[];for(let e of this.g.ghosts?.map?.values?.()||[])e.root&&t.push({id:e.id,name:e.name,x:e.root.position.x,z:e.root.position.z,color:e.color});return t}drawDynamic(t,e){let n=this.layers;this.others=this.playersNow();let i=performance.now(),r=this.sel||this.hover;r?.rect?(t.strokeStyle="#ff3b30",t.lineWidth=3,t.setLineDash([]),t.strokeRect(this.sx(r.rect.x0),this.sz(r.rect.z0),(r.rect.x1-r.rect.x0)*e,(r.rect.z1-r.rect.z0)*e)):r&&r.x!=null&&(t.strokeStyle="#ff3b30",t.lineWidth=3,t.beginPath(),t.arc(this.sx(r.x),this.sz(r.z),20,0,7),t.stroke());let o=this.g.waypoint;if(o&&(t.fillStyle="#b44cff",t.beginPath(),t.arc(this.sx(o.x),this.sz(o.z),7,0,7),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke()),n.players)for(let f of this.others){let g=this.sx(f.x),y=this.sz(f.z);this.onScreen(g,y)&&(t.fillStyle="#fff",t.beginPath(),t.arc(g,y,5,0,7),t.fill(),t.fillStyle=f.color||"#2a9d8f",t.beginPath(),t.arc(g,y,3.4,0,7),t.fill(),Ui.player(e)&&this.text(t,f.name,g,y-12,{s:10}))}let a=this.g.ctrl,c=this.sx(a.x),l=this.sz(a.z);t.strokeStyle=`rgba(255,59,48,${.5-.4*Math.abs(Math.sin(i/500))})`,t.lineWidth=3,t.beginPath(),t.arc(c,l,14+4*Math.abs(Math.sin(i/500)),0,7),t.stroke(),t.save(),t.translate(c,l),t.rotate(-a.ry+Math.PI/2),t.fillStyle="#ff3b30",t.beginPath(),t.moveTo(0,-11),t.lineTo(8,9),t.lineTo(0,5),t.lineTo(-8,9),t.closePath(),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke(),t.restore(),this.text(t,"You",c,l+22,{s:11,fill:"#b3261e"});let u=[10,20,50,100,200].find(f=>f*e>=60)||200,h=14,d=this.H-18;t.fillStyle="#fffdf3cc",t.fillRect(h-6,d-14,u*e+12,26),t.strokeStyle="#333",t.lineWidth=2,t.beginPath(),t.moveTo(h,d+4),t.lineTo(h,d+8),t.lineTo(h+u*e,d+8),t.lineTo(h+u*e,d+4),t.stroke(),this.text(t,`${u} m`,h+u*e/2,d-4,{s:11,stroke:"transparent"}),this.text(t,"N \u25B2",this.W-34,this.H-20,{s:12,w:800})}hitAt(t,e){return Bd(this.model,this.wx(t),this.wz(e),this.v.k,this.layers,this.others||this.playersNow())}select(t){this.sel=t,this.showCard(t,!0)}showCard(t,e){if(!t){this.card.classList.add("hidden");return}let n=this.g;this.card.classList.remove("hidden"),this.card.classList.toggle("pinned",!!e);let i=[p("div",{class:"row sp"},p("b",{},`${t.icon?t.icon+" ":""}${t.name}`),e?p("button",{class:"bm-x",onclick:()=>{this.sel=null,this.card.classList.add("hidden")}},"\u2715"):""),...(t.lines||[]).filter(Boolean).map(r=>p("div",{class:"mut"},r))];e&&t.placeId?i.push(p("div",{class:"row"},p("button",{class:"btn small alt",id:"bmOpen",onclick:()=>{this.close(),n.ui.place(t.placeId)}},"Open and travel"),p("button",{class:"btn small ghost",onclick:()=>{n.setWaypoint(t.x,t.z,t.name),n.ui.toast(`Waypoint set: ${t.name}.`),this.close()}},"\u{1F4CD} Waypoint"))):e&&t.x!=null&&i.push(p("div",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>{n.setWaypoint(t.x,t.z,t.name),n.ui.toast(`Waypoint set: ${t.name}.`),this.close()}},"\u{1F4CD} Set waypoint here"))),this.card.replaceChildren(...i)}showList(){let t=Fd(this.model,this.input.value);this.list.classList.remove("hidden"),this.list.replaceChildren(...t.length?t.map(e=>p("button",{class:"bm-item","data-id":e.id,onclick:()=>{this.list.classList.add("hidden"),this.input.blur(),this.focusOn(e),this.select({...e,rect:e.type==="plot"?{x0:e.x-e.size/2,x1:e.x+e.size/2,z0:e.z-e.size/2,z1:e.z+e.size/2}:void 0})}},p("span",{},`${e.icon||(e.type==="road"?"\u{1F6E3}":"\u{1F4CD}")} ${e.name}`),p("small",{class:"mut"},e.group))):[p("div",{class:"mut",style:"padding:10px"},"Nothing found.")])}drawLegend(){let t=e=>p("label",{class:"bm-lg"},p("input",{type:"checkbox","data-layer":e[0],checked:this.layers[e[0]],onchange:n=>{this.layers[e[0]]=n.target.checked,this.cache=null}}),p("i",{style:`background:${e[2]}`}),e[1]);this.legend.replaceChildren(p("b",{},"Layers"),...Nd.map(t),p("b",{style:"margin-top:6px"},"Buildings"),p("div",{class:"bm-kinds"},Object.entries(Wo).map(([e,n])=>p("span",{},p("i",{style:`background:${n}`}),e))))}bind(){let t=this.canvas,e=new Map,n=null,i=null,r=0;t.addEventListener("wheel",a=>{a.preventDefault();let c=t.getBoundingClientRect();this.zoomAt(a.clientX-c.left,a.clientY-c.top,Math.exp(-a.deltaY*.0015))},{passive:!1}),t.addEventListener("pointerdown",a=>{if(t.setPointerCapture(a.pointerId),e.set(a.pointerId,{x:a.clientX,y:a.clientY}),r=0,this.list.classList.add("hidden"),e.size===1)n={x:a.clientX,y:a.clientY};else if(e.size===2){let[c,l]=[...e.values()];i={d:Math.hypot(c.x-l.x,c.y-l.y)},n=null}}),t.addEventListener("pointermove",a=>{let c=t.getBoundingClientRect();if(!e.has(a.pointerId)){if(a.pointerType==="mouse"&&!this.sel){let l=this.hitAt(a.clientX-c.left,a.clientY-c.top);this.hover=l,this.showCard(l,!1),t.style.cursor=l&&l.type!=="water"?"pointer":"grab"}return}if(e.set(a.pointerId,{x:a.clientX,y:a.clientY}),e.size===2&&i){let[l,u]=[...e.values()],h=Math.hypot(l.x-u.x,l.y-u.y);this.zoomAt((l.x+u.x)/2-c.left,(l.y+u.y)/2-c.top,h/i.d),i.d=h,r=99}else if(n){let l=a.clientX-n.x,u=a.clientY-n.y;r+=Math.abs(l)+Math.abs(u),n.x=a.clientX,n.y=a.clientY,this.v.cx-=l/this.v.k,this.v.cz-=u/this.v.k}});let o=a=>{let c=t.getBoundingClientRect(),l=e.has(a.pointerId);if(e.delete(a.pointerId),e.size<2&&(i=null),e.size){if(e.size===1){let[u]=[...e.values()];n={x:u.x,y:u.y}}}else{if(l&&r<8&&a.type==="pointerup"){let u=this.hitAt(a.clientX-c.left,a.clientY-c.top);this.select(u)}n=null}};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}};var ws=s=>s[Math.floor(Math.random()*s.length)],tv={wage:s=>ws([`Nailed it! ${xt(s)} don enter your pocket.`,`Oya collect your ${xt(s)}. Hustle pays!`,`Correct hustle! +${xt(s)}`]),shiftStart:()=>ws(["Oya, na work time! Shift don start.","Shift don start. No dull!"]),bought:s=>ws([`Correct! You pay ${xt(s)}.`,`Paid ${xt(s)}. Enjoy am!`]),home:()=>ws(["Congrats, na your house be this!","New keys, new vibes. Welcome home!"]),plot:()=>"Congrats, the land is yours! Watch out for omo-onile.",travel:s=>s?`Safe journey! ${xt(s)} gone for transport.`:"Enjoy the ride, free of charge.",hit:s=>`Nailed it! +${s}% bonus on this shift.`,miss:()=>"Ah ah, you miss am! No bonus this time.",sold:s=>`Sold. ${xt(s)} back in your pocket.`,blocked:()=>"Something is in the way."},ev={INSUFFICIENT_FUNDS:()=>ws(["Your pocket dry o. Money no reach.","No cash for that one. Go hustle first!"]),TOO_FAR:()=>ws(["You dey far o. Move closer.","Walk go there first, oga."]),TOO_TIRED:()=>"You don tire. Eat or rest first!",TOO_HUNGRY:()=>"Hunger dey vex you. Buy food first.",BLOCKED:()=>"Something is in the way.",COOLDOWN:null,LOGIN_REQUIRED:()=>"Session don end. Please log in again."},Ge=(s,...t)=>tv[s](...t),Xo=class{constructor(t){this.g=t,this.sheetOpen=!1,this.onClose=null,this.mm=et("#minimap").getContext("2d"),et("#minimap").style.cursor="pointer",et("#minimap").title="Open the full map (M)",et("#minimap").addEventListener("click",()=>this.openMap()),this.chatOn=!1,this.sfxOn=!0,this.actx=null,et("#sheetX").onclick=()=>this.closeSheet(),et("#sheetWrap").addEventListener("pointerdown",e=>{e.target.id==="sheetWrap"&&this.closeSheet()}),et("#phoneBtn").onclick=()=>this.phone(),et("#muteBtn").onclick=()=>{this.sfxOn=!this.sfxOn,et("#muteBtn").textContent=this.sfxOn?"\u{1F50A}":"\u{1F507}"},et("#carBtn").onclick=()=>t.toggleCar(),et("#chatForm").addEventListener("submit",async e=>{e.preventDefault();let n=et("#chatInput"),i=n.value.trim();if(!i)return this.hideChat();n.value="",this.hideChat();try{await ct("/api/chat",{text:i})}catch(r){this.error(r)}}),addEventListener("keydown",e=>{if(e.target.closest("input,textarea")){e.key==="Escape"&&(this.hideChat(),e.target.blur());return}if(e.key==="Escape"&&this.sheetOpen&&this.closeSheet(),!t.playing)return;let n=e.key.toLowerCase();n==="t"||n==="enter"?(e.preventDefault(),this.showChat()):n==="p"?this.phone():n==="m"?this.openMap():n==="c"?t.toggleCar():(n==="f"||n===" ")&&(this.sheetOpen||t.doAction())}),et("#actionBtn").onclick=()=>t.doAction()}sfx(t){if(this.sfxOn)try{this.actx||(this.actx=new(window.AudioContext||window.webkitAudioContext));let e=this.actx,n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination);let r={coin:[[880,.07],[1320,.12]],ok:[[520,.08],[780,.1]],bad:[[180,.18]],horn:[[330,.22],[330,.22]],thunk:[[110,.09]],knock:[[140,.06],[140,.06],[140,.06]]}[t]||[[600,.08]],o=e.currentTime;n.type=t==="horn"?"sawtooth":"triangle",i.gain.setValueAtTime(.08,o);for(let[a,c]of r)n.frequency.setValueAtTime(a,o),o+=c;i.gain.exponentialRampToValueAtTime(1e-4,o+.05),n.start(),n.stop(o+.08)}catch{}}haptic(t=15){try{navigator.vibrate?.(t)}catch{}}toast(t,e=""){let n=p("div",{class:`toast ${e}`},t),i=et("#toasts");for(i.append(n);i.children.length>3;)i.firstChild.remove();setTimeout(()=>n.remove(),4300),e==="bad"?this.sfx("bad"):e==="money"&&(this.sfx("coin"),this.haptic())}error(t){if(t instanceof Tn){if(t.status===401&&t.code==="LOGIN_REQUIRED"){this.g.sessionLost();return}let e=ev[t.code];this.toast(e?e():t.message,"bad")}else console.error(t),this.toast("Something went wrong. Try again.","bad")}showChat(){et("#chatForm").classList.add("on"),et("#chatInput").focus()}hideChat(){et("#chatForm").classList.remove("on"),et("#game").focus()}addChat(t,e,n){let i=p("div",{style:"pointer-events:auto;cursor:pointer",title:"Tap to report, mute or block",onclick:()=>this.playerMenu(t,n&&{kind:"chat",target:n,text:`${t}: ${e}`})},`${t}: ${e}`);for(et("#chatlog").append(i);et("#chatlog").children.length>5;)et("#chatlog").firstChild.remove();setTimeout(()=>i.remove(),14e3)}playerMenu(t,e){if(t===this.g.user?.username)return;this.openSheet(`@${t}`,[e?p("p",{class:"mut"},`"${e.text}"`):"",p("div",{class:"row"},e?p("button",{class:"btn red",onclick:()=>this.reportSheet(e.kind,e.target,e.text)},"\u{1F6A9} Report"):"",p("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"mute")},"\u{1F507} Mute"),p("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"block")},"\u26D4 Block")),p("p",{class:"mut"},"Mute: you stop seeing their chat and messages. Block: they cannot message you, knock on your door or sit at your tables, and you will not see each other.")])}async setBlock(t,e){await this.guard(()=>ct("/api/social/mute",{username:t,kind:e}))&&(this.toast(e==="block"?`@${t} blocked.`:e==="mute"?`@${t} muted.`:`@${t} unblocked.`),this.closeSheet())}reportSheet(t,e,n=""){let i={abusive:"Abusive or insulting",sexual:"Sexual content",hate:"Hate or discrimination",scam_spam:"Scam or spam",personal_info:"Shares personal info",misleading:"Misleading",other:"Something else"},r="abusive",o=p("input",{class:"sheet-input",maxlength:200,placeholder:"Anything we should know? (optional)"}),a=p("div",{class:"chips"}),c=()=>a.replaceChildren(...Object.entries(i).map(([l,u])=>p("button",{class:`chip ${l===r?"on":""}`,onclick:()=>{r=l,c()}},u)));c(),this.openSheet("Report",[p("p",{class:"mut"},n?`Reporting: ${n}`:"Tell us what is wrong."),a,o,p("div",{class:"row"},p("button",{class:"btn red",onclick:async()=>{let l=await this.guard(()=>ct("/api/report",{kind:t,target:String(e),reason:r,detail:o.value}));l&&(this.toast(l.message),this.closeSheet())}},"Send report"),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")),p("p",{class:"mut"},"Reports go to a human reviewer. False reports can limit your own account.")])}hud(t){et("#cash").textContent=xt(t.cash),et("#sav").textContent="\u{1F3E6} "+xt(t.savings),et("#energyBar").style.width=t.energy+"%",et("#hungerBar").style.width=t.hunger+"%",et("#moodBar").style.width=(t.mood??60)+"%",et("#moodBar").style.background=(t.mood??60)>=this.g.cfg.moodHappyAt?"#f7c948":"#e58fb3",et("#energyBar").style.background=t.energy<20?"#d6402f":"#35c46b",et("#hungerBar").style.background=t.hunger<20?"#d6402f":"#f29a2e";let e=et("#shiftbar");if(t.shift){let n=this.g.cfg.jobs?.find(r=>r.id===t.shift.jobId),i=Math.max(0,t.shift.endsAt-this.g.serverNow());e.classList.remove("hidden"),e.textContent=i>0?`\u{1F4BC} ${n?.name||"Shift"} \xB7 ${Math.ceil(i/1e3)}s left`:`\u{1F4BC} ${n?.name||"Shift"} done: collect your pay!`}else e.classList.add("hidden")}clock(t){let e=(t.hour+11)%12+1,n=t.hour<6||t.hour>=19;et("#clock").textContent=`${n?"\u{1F319}":"\u{1F31E}"} ${e}:${String(t.minute).padStart(2,"0")} ${t.hour>=12?"PM":"AM"} \xB7 Day ${t.day}`}badge(t){let e=et("#phoneBadge");e.textContent=t,e.classList.toggle("hidden",!t)}loc(t){et("#loc").textContent=t}waypoint(t,e){let n=et("#waypoint");if(!t)return n.classList.add("hidden");n.classList.remove("hidden"),n.textContent=`\u{1F4CD} ${t.label} \xB7 ${Math.round(e)} m`}action(t){let e=et("#actionBtn");if(!t)return e.classList.add("hidden");e.classList.remove("hidden"),e.textContent=t}minimap(t,e,n,i,r){let o=this.mm,a=300,c=a/520,l=e.bounds,u=d=>(d-l.minX)*c+8,h=d=>(d-l.minZ)*c+8;o.clearRect(0,0,a,a),o.fillStyle="#c9c3ad",o.fillRect(0,0,a,a),o.fillStyle="#2b6f8a",o.fillRect(0,h(l.maxZ),a,a),o.strokeStyle="#3d4046",o.lineJoin="round";for(let d of e.roads)o.lineWidth=d.width*c,o.beginPath(),qn(d).forEach((f,g)=>g?o.lineTo(u(f[0]),h(f[1])):o.moveTo(u(f[0]),h(f[1]))),o.stroke();o.fillStyle="#3d4046";for(let d of e.roundabouts||[])o.beginPath(),o.arc(u(d.x),h(d.z),d.outerR*c,0,7),o.fill(),o.fillStyle="#6a9a55",o.beginPath(),o.arc(u(d.x),h(d.z),d.islandR*c,0,7),o.fill(),o.fillStyle="#3d4046";o.fillStyle="#8f8a79";for(let d of e.buildings)o.fillRect(u(d.x-d.w/2),h(d.z-d.d/2),d.w*c,d.d*c);o.fillStyle="#ffc20e";for(let d of e.shops)o.fillRect(u(d.x)-3,h(d.z)-3,6,6);o.fillStyle="#4aa3ff";for(let d of e.jobs)o.fillRect(u(d.x)-3,h(d.z)-3,6,6);o.fillStyle="#35c46b";for(let d of e.billboards)d.surface!=="lagoon_plot"&&o.fillRect(u(d.x)-2,h(d.z)-2,4,4);i&&(o.fillStyle="#b44cff",o.beginPath(),o.arc(u(i.x),h(i.z),7,0,7),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke()),o.fillStyle="#fff";for(let d of n.map.values())d.root&&(o.beginPath(),o.arc(u(d.root.position.x),h(d.root.position.z),3.5,0,7),o.fill());o.save(),o.translate(u(t.x),h(t.z)),o.rotate(-t.ry+Math.PI/2),o.fillStyle="#ff3b30",o.beginPath(),o.moveTo(0,-8),o.lineTo(6,7),o.lineTo(-6,7),o.closePath(),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke(),o.restore()}openSheet(t,e,n){this.onClose=n||null,et("#sheetTitle").textContent=t,et("#sheetBody").replaceChildren(...[].concat(e)),et("#sheetWrap").classList.remove("hidden"),this.sheetOpen=!0,this.g.ctrl.frozen=!0}setSheetBody(t){et("#sheetBody").replaceChildren(...[].concat(t))}closeSheet(){if(!this.sheetOpen)return;et("#sheetWrap").classList.add("hidden"),this.sheetOpen=!1,this.g.ctrl.frozen=this.g.busy,clearInterval(this.tick);let t=this.onClose;this.onClose=null,t?.(),et("#game").focus()}async guard(t){try{return await t()}catch(e){return this.error(e),null}}async place(t){let n=this.g.city.places.find(o=>o.id===t);if(!n)return;let i=p("div",{});this.openSheet(n.name,i),clearInterval(this.tick),(async()=>{let o=await zt(`/api/travel/quote?place=${encodeURIComponent(t)}`).catch(d=>(this.error(d),null));if(!o||!this.sheetOpen)return;let a=o.distance<22,c=a?null:this.lastMode&&o.modes.find(d=>d.id===this.lastMode)?this.lastMode:"keke",l=p("div",{}),u=p("div",{}),h=()=>{let d=p("div",{class:"chips"},o.modes.map(y=>p("button",{class:`chip ${y.id===c?"on":""}`,onclick:()=>{c=y.id,this.lastMode=y.id,h()}},{walk:"\u{1F6B6}",keke:"\u{1F6FA}",danfo:"\u{1F68C}",car:"\u{1F697}"}[y.id]||""," ",y.label,p("small",{},y.fare?`${xt(y.fare)} \xB7 ${y.seconds}s`:`free \xB7 ~${y.seconds}s`)))),f=o.modes.find(y=>y.id===c),g=p("button",{class:"btn big alt",disabled:a||!f,onclick:()=>this.go(n,f,o)},a?"You're here":c==="walk"?"Set waypoint & walk":`Go \xB7 ${xt(f.fare)}`);u.replaceChildren(p("div",{class:"row sp"},p("span",{class:"mut"},`${Math.round(o.distance)} m away`),p("span",{class:`tag ${o.rush?"amber":"green"}`},(o.rush?"\u23F0 ":"")+o.traffic)),a?"":d,g)};h(),i.replaceChildren(p("div",{class:"mut"},`${n.area} \xB7 ${iv(n.type)}`),l,u),this.fillPlaceInfo(l,n,o)})()}async go(t,e,n){let i=this.g;if(e.id==="walk"){i.setWaypoint(t.x,t.z,t.name),this.closeSheet(),this.toast(`Waypoint set: ${t.name}. Follow the purple pin.`);return}let r=await this.guard(()=>ct("/api/travel",{placeId:t.id,mode:e.id,pos:i.pos()}));r&&(this.closeSheet(),i.update(r.user),i.runCommute(r,t,n))}fillPlaceInfo(t,e,n){e.type==="shop"?this.shopBlock(t,e.id):e.type==="job"?this.jobBlock(t,e.id):e.type==="house"?this.houseBlock(t,e.id):e.type==="plot"?this.plotBlock(t,e.id):e.type==="venue"?this.venueBlock(t,e):t.replaceChildren(p("p",{class:"mut"},e.id==="airport"?"Fast travel to other cities (Abuja, Port Harcourt) comes later. The airport also hosts premium ad boards.":"A public landmark. Wave to the neighbours."))}venueBlock(t,e){let n=nv(this.g.pos(),e)<20,i=e.hours?`Open ${e.hours[0]}:00 to ${e.hours[1]}:00`:"";t.replaceChildren(p("p",{class:"mut"},i),p("p",{},e.id==="venue_motors"?"Look at the cars, compare running costs and buy one. Placeholder prices are ESTIMATES.":e.id==="venue_meco"?"Meco fixes cars. Check your car, or pay a placeholder (ESTIMATE) fee for a quick service.":"Step inside to eat, chat, and play Whot or Ayo against other players. \u{1F3B2} Game money only."),p("button",{class:"btn big alt",disabled:!n,id:"venueEnter",onclick:()=>{this.closeSheet(),this.g.venue.show(e.id)}},n?"Go inside":"Walk to the door first"))}async shopBlock(t,e){let n=await this.guard(()=>zt("/api/shops"));if(!n)return;let i=n.shops.find(a=>a.id===e);if(!i)return;this.g.shops=n.shops;let r="local",o=()=>{let a=Math.hypot(this.g.ctrl.x-i.x,this.g.ctrl.z-i.z)<24,c=n.channels.delivery;t.replaceChildren(p("p",{class:"mut"},i.desc),p("div",{class:"row"},p("span",{class:`tag ${i.status.open?"green":"red"}`},i.status.text),p("span",{class:"tag"},i.channel==="market"?`Market \xD7${n.channels.market.mult}`:`Supermarket \xD7${n.channels.supermarket.mult}`)),p("div",{class:"chips"},p("button",{class:`chip ${r==="local"?"on":""}`,onclick:()=>{r="local",o()}},i.channel==="market"?"Market stall":"In store",p("small",{},a?"you are here":"walk there")),p("button",{class:`chip ${r==="delivery"?"on":""}`,onclick:()=>{r="delivery",o()}},"\u{1F6F5} Delivery",p("small",{},`\xD7${c.mult} + ${xt(c.fee)} fee`))),p("div",{class:"list"},i.items.map(l=>{let u=r==="delivery"?l.deliveryPrice:l.price,h=r==="local"&&(!i.status.open||!a);return p("div",{},p("div",{},p("b",{},l.name),p("div",{class:"mut"},[l.hunger?`\u{1F372} +${l.hunger}`:"",l.energy?`\u26A1 +${l.energy}`:""].filter(Boolean).join("  "))),p("button",{class:"btn small",disabled:h,onclick:()=>this.buy(i,l,r,u,c.fee)},`${xt(u)}${r==="delivery"?"+"+c.fee:""}`))})),r==="local"&&!a?p("p",{class:"mut"},"Walk or ride to the shop to buy here, or switch to delivery."):"")};o()}async buy(t,e,n,i,r){let o=await this.guard(()=>ct("/api/shop/buy",{shopId:t.id,itemId:e.id,channel:n,qty:1,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Ge("bought",o.spent),"money"))}jobBlock(t,e){let n=this.g,i=(n.cfg.jobs||[]).filter(o=>o.location===e),r=async()=>{let o=await this.guard(()=>zt("/api/jobs"));if(!o)return;let a=n.user,c=o.jobs.filter(h=>h.location===e),l=a.shift,u=c.map(h=>{let d=l&&l.jobId===h.id,f=d?Math.max(0,l.endsAt-n.serverNow()):0;return p("div",{class:"card",style:"margin:8px 0;padding:12px;box-shadow:none;border:2px solid #e3dcc2"},p("div",{class:"row sp"},p("b",{},h.name),p("span",{class:"tag amber"},`${xt(h.wage)} / ${h.durationSec}s`)),p("div",{class:"mut"},h.desc),p("div",{class:"mut"},`\u26A1 -${h.energyCost}  \u{1F372} -${h.hungerCost}  \xB7 cooldown ${h.cooldownSec}s${h.locked?` \xB7 \u{1F512} ${h.shiftsNeeded} more shift(s) to unlock`:""}`),d?p("div",{},p("div",{class:"progress"},p("i",{style:`width:${Math.min(100,100-f/(h.durationSec*10))}%`})),f>0?p("div",{class:"mut"},`${Math.ceil(f/1e3)}s left`):"",p("div",{class:"row"},p("button",{class:"btn alt",onclick:()=>this.miniGame(r)},"\u{1F3AF} Quick task (+25%)"),p("button",{class:"btn",disabled:f>0,onclick:async()=>{let g=await this.guard(()=>ct("/api/jobs/claim"));g&&(n.update(g.user),this.toast(Ge("wage",g.wage),"money"),r())}},f>0?"Working\u2026":"Collect pay"))):p("button",{class:"btn",style:"margin-top:6px",disabled:h.locked||!!l||h.cooldownLeftMs>0,onclick:async()=>{let g=await this.guard(()=>ct("/api/jobs/start",{jobId:h.id,pos:n.pos()}));g&&(n.update(g.user),this.toast(Ge("shiftStart")),r())}},h.cooldownLeftMs>0?`Break (${Math.ceil(h.cooldownLeftMs/1e3)}s)`:l?"Finish your shift first":"Start shift"))});t.replaceChildren(...u)};r(),clearInterval(this.tick),this.tick=setInterval(()=>{this.sheetOpen&&!this.mgOpen&&r()},2500)}async miniGame(t){let e=await this.guard(()=>ct("/api/jobs/task/start"));if(!e)return;this.mgOpen=!0;let n,i=p("div",{class:"cur"}),r=p("div",{class:"zone",style:`left:${(e.target-e.width/2)*100}%;width:${e.width*100}%`}),o=p("div",{class:"mgbar"},r,i),a=p("div",{class:"big",style:'font:400 22px "Lilita One";min-height:30px'}),c=!1,l=d=>{let f=d-Math.floor(d);return f<.5?f*2:2-f*2},u=()=>{i.style.left=`calc(${l((this.g.serverNow()-e.startedAt)/e.periodMs)*100}% - 4px)`,c||(n=requestAnimationFrame(u))};u();let h=p("button",{class:"btn big alt",onclick:async()=>{if(c){this.mgOpen=!1,t();return}c=!0;let d=await this.guard(()=>ct("/api/jobs/task/stop"));cancelAnimationFrame(n),d?(i.style.left=`calc(${d.pos*100}% - 4px)`,a.textContent=d.hit?Ge("hit",d.bonusPct):Ge("miss"),this.sfx(d.hit?"coin":"bad"),h.textContent="Back to work"):(this.mgOpen=!1,t())}},"STOP!");this.setSheetBody(p("div",{class:"minigame"},p("p",{class:"mut"},"Stop the gold bar inside the green zone. One try per shift."),o,a,h))}async houseBlock(t,e){let n=this.g,i=await this.guard(()=>zt("/api/properties"));if(!i)return;n.props=i.properties,n.world.setMarkers(i.properties);let r=i.properties.find(f=>f.id===e);if(!r)return;let o=n.cfg.maxNameLen,a=r.status==="yours",c={home:"They're home right now",online:"Online, but out and about",away:"Not around right now"}[r.presence],l=r.owner?`@${r.owner}'s ${r.name}`:`${r.baseName}`,u=a?p("div",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>this.rename(r,()=>this.houseBlock(t,e))},"\u270F\uFE0F Rename"),p("span",{class:"mut"},`max ${o} characters`)):"",h=Math.hypot(n.ctrl.x-r.door.x,n.ctrl.z-r.door.z)<30,d=[];d.push(p("div",{class:"row"},r.owner?p("div",{class:"avatar",style:`background:${r.ownerColor||"#2e9b5e"}`},r.owner[0].toUpperCase()):p("div",{class:"avatar",style:"background:#8a8f98"},"\u{1F3E0}"),p("div",{},p("b",{style:"font-size:18px"},l),p("div",{class:"mut"},`${r.tierLabel} \xB7 ${r.area}`)))),r.owner&&d.push(p("div",{class:"row sp"},p("span",{},p("span",{class:`dot ${r.presence}`}),c),p("span",{class:"tag"},`${r.items} items`))),d.push(u),a?(d.push(p("div",{class:"row"},p("span",{class:"tag green"},r.mode==="own"?"You own this":`Rent ${xt(r.rent)}/day`),r.nextRentDue?p("span",{class:"mut"},`next rent ${new Date(r.nextRentDue).toLocaleString("en-NG",{weekday:"short",hour:"numeric",minute:"2-digit"})}`):"")),d.push(p("div",{class:"row"},p("button",{class:"btn",onclick:()=>{this.closeSheet(),n.enterHome()}},"\u{1F6AA} Go inside"),p("button",{class:"btn ghost",onclick:()=>this.confirm(r.mode==="own"?"Sell for about 70% of what you paid?":"Move out? (no refund)",async()=>{let f=await this.guard(()=>ct("/api/property/release"));f&&(n.update(f.user),this.toast(f.refund?Ge("sold",f.refund):"You moved out."),this.houseBlock(t,e))})},r.mode==="own"?"Sell house":"Move out")))):r.owner?(d.push(p("div",{class:"row"},p("button",{class:"btn",disabled:r.presence!=="home"||!h,onclick:()=>this.knock(r)},"\u{1F3E0} Visit"),p("button",{class:"btn ghost",onclick:()=>this.message(r.owner)},"\u{1F4AC} Message"),p("button",{class:"btn ghost small",title:"Mute, block or report",onclick:()=>this.playerMenu(r.owner,r.hasCustomName&&!r.nameHidden?{kind:"house_name",target:r.id,text:`${r.owner}'s "${r.name}"`}:null)},"\u22EF"))),d.push(p("div",{class:"mut"},"You can only drop by when they're home"+(h?".":" and you are at the door.")))):(d.push(p("p",{class:"mut"},`${r.rooms} room(s). Rent ${xt(r.rent)} per day (first day paid up front)${r.price?` \xB7 or buy for ${xt(r.price)}`:" \xB7 rent only"}.`)),d.push(p("div",{class:"row"},p("button",{class:"btn",disabled:!h,onclick:()=>this.review(r,"rent",()=>this.houseBlock(t,e))},`Rent \xB7 ${xt(r.rent)}`),r.price?p("button",{class:"btn alt",disabled:!h,onclick:()=>this.review(r,"own",()=>this.houseBlock(t,e))},`Buy \xB7 ${xt(r.price)}`):"")),h||d.push(p("div",{class:"mut"},"Get to the door first (use the travel chips below)."))),t.replaceChildren(...d)}review(t,e,n){let i=e==="own"?t.price:t.rent,r=p("div",{},p("h3",{},"Review"),p("p",{},`${t.baseName} \xB7 ${t.tierLabel} \xB7 ${t.area}`),p("p",{},e==="own"?`Price ${xt(i)} (one-off). You can sell back later for about 70%.`:`Rent ${xt(i)} per day. Day 1 is paid now. Miss ${this.g.cfg.evictAfter||2} rent days and you are evicted.`),p("div",{class:"row"},p("button",{class:"btn alt",onclick:async()=>{let o=await this.guard(()=>ct("/api/property/acquire",{propertyId:t.id,mode:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Ge("home"),"money"),this.sfx("ok"),n(),this.g.refreshProps())}},`Pay ${xt(i)}`),p("button",{class:"btn ghost",onclick:n},"Back")));this.setSheetBody(r)}confirm(t,e){this.setSheetBody(p("div",{},p("p",{},t),p("div",{class:"row"},p("button",{class:"btn red",onclick:e},"Yes"),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel"))))}rename(t,e){let n=this.g.cfg.maxNameLen,i=p("input",{class:"sheet-input",maxlength:n,value:t.name});this.setSheetBody(p("div",{},p("h3",{},"Name your house"),i,p("p",{class:"mut"},`3-${n} characters. Rude names get refused.`),p("div",{class:"row"},p("button",{class:"btn",onclick:async()=>{let r=await this.guard(()=>ct("/api/property/name",{name:i.value}));r&&(this.g.update(r.user),this.toast(`Your house is now "${r.name}"`,"money"),this.g.refreshProps(),e())}},"Save"),p("button",{class:"btn ghost",onclick:e},"Cancel")))),i.focus(),i.select()}message(t){let e=p("input",{class:"sheet-input",maxlength:140,placeholder:`Message @${t}\u2026`});this.setSheetBody(p("div",{},p("h3",{},`Message @${t}`),e,p("div",{class:"row"},p("button",{class:"btn",onclick:async()=>{await this.guard(()=>ct("/api/dm",{to:t,text:e.value}))&&(this.toast("Message sent."),this.closeSheet())}},"Send"),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")))),e.focus()}async knock(t){let e=await this.guard(()=>ct("/api/visit/knock",{propertyId:t.id,pos:this.g.pos()}));if(!e)return;this.sfx("knock");let n=this.g,i=!0,r=p("b",{}),o=p("div",{style:"text-align:center"},p("h3",{},"Knock knock\u2026"),p("p",{},`Waiting for @${e.owner} to open the door of ${e.name}`),p("p",{},r),p("button",{class:"btn ghost",onclick:async()=>{i=!1,await ct("/api/visit/cancel").catch(()=>{}),this.closeSheet()}},"Walk away"));this.setSheetBody(o),this.onClose=()=>{i=!1};let a=Date.now(),c=async()=>{if(!i||!this.sheetOpen)return;r.textContent=`${Math.max(0,Math.ceil((e.expiresAt-n.serverNow())/1e3))}s`;let l=n.lastKnocks?.mine;if(l&&l.id===e.knockId){if(l.status==="accepted"){i=!1,this.closeSheet(),this.toast("Come in!","money"),n.enterAsVisitor(t.id);return}if(l.status==="declined"){i=!1,o.replaceChildren(p("p",{},`@${e.owner} isn't receiving visitors right now. \u{1F6AA}`),p("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}if(l.status==="expired"){i=!1,o.replaceChildren(p("p",{},`No answer at @${e.owner}'s door.`),p("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}}setTimeout(c,800)};n.net.nudge(),c()}hostKnock(t){if(this.knockShown===t.id)return;this.knockShown=t.id,this.sfx("knock");let e=p("div",{class:"toast money",style:"pointer-events:auto"},p("div",{},`\u{1F6AA} @${t.from} is at your door!`),p("div",{class:"row"},p("button",{class:"btn small",onclick:async()=>{e.remove(),await this.guard(()=>ct("/api/visit/respond",{knockId:t.id,accept:!0}))&&this.toast(`@${t.from} is coming in.`)}},"Let in"),p("button",{class:"btn small red",onclick:async()=>{e.remove(),await this.guard(()=>ct("/api/visit/respond",{knockId:t.id,accept:!1}))}},"Not now")));et("#toasts").append(e),setTimeout(()=>e.remove(),Math.max(1e3,t.expiresAt-this.g.serverNow()))}async plotBlock(t,e){let n=this.g,i=await this.guard(()=>zt("/api/plots"));if(!i)return;let r=i.plots.find(l=>l.id===e);if(!r)return;n.plots=i.plots;let o=Math.hypot(n.ctrl.x-r.x,n.ctrl.z-r.z)<r.size/2+25,a=p("span",{class:`tag ${r.risk==="high"?"red":r.risk==="medium"?"amber":"green"}`},`Omo-onile risk: ${r.risk}`),c=[p("div",{class:"row"},p("b",{},r.name),a),p("div",{class:"row"},p("span",{class:"tag"},`${r.sqm} sqm`),p("span",{class:"tag green"},`\u{1F4C8} ~${r.growthPerWeekPct}%/week (ESTIMATE)`)),p("div",{class:"mut"},"Prices, growth and risk are placeholders for testing. Land value compounds over real days; omo-onile may demand a levy.")];r.status==="yours"?c.push(p("p",{},`Your plot. Value now ${xt(r.value)} \xB7 sell for ${xt(r.sellValue)}`),p("button",{class:"btn red",onclick:()=>this.confirm(`Sell for ${xt(r.sellValue)}?`,async()=>{let l=await this.guard(()=>ct("/api/plot/sell",{plotId:e}));l&&(n.update(l.user),this.toast(Ge("sold",l.value),"money"),this.plotBlock(t,e),this.closeSheet())})},"Sell plot")):r.status==="taken"?c.push(p("p",{class:"mut"},`Owned by @${r.owner}.`)):c.push(p("p",{},`Price ${xt(r.price)}`),p("button",{class:"btn alt",disabled:!o,onclick:()=>this.setSheetBody(p("div",{},p("h3",{},"Review"),p("p",{},`${r.name} \xB7 ${r.area} \xB7 ${r.sqm} sqm`),p("p",{},`Price ${xt(r.price)}. ${r.risk==="high"?"Omo-onile risk is HIGH: expect levy demands.":r.risk==="medium"?"Some omo-onile risk.":"Documents are clean (low risk)."}`),p("div",{class:"row"},p("button",{class:"btn alt",onclick:async()=>{let l=await this.guard(()=>ct("/api/plot/buy",{plotId:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:n.pos()}));l&&(n.update(l.user),this.toast(Ge("plot"),"money"),this.closeSheet())}},`Pay ${xt(r.price)}`),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Back"))))},"Buy plot"),o?"":p("div",{class:"mut"},"Walk up to the plot first.")),t.replaceChildren(...c)}async board(t){let e=this.g,n=Math.floor(e.serverNow()/e.ads.rot),i=e.ads.currentFor(t,n),r=e.world.boards[t].def,o=[p("div",{class:"mut"},`${{road_billboard:"Road billboard",airport_board:"Airport board",lagoon_plot:"Lagoon plot"}[r.surface]} \xB7 ${t}`)];i?o.push(p("h3",{},i.b),i.h?p("p",{},i.h):"",p("span",{class:"tag amber"},"Sponsored"),p("div",{class:"row"},p("button",{class:"btn ghost small",onclick:()=>this.reportSheet("ad_creative",i.c,`${i.b}${i.h?": "+i.h:""}`)},"\u{1F6A9} Report this ad"),p("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>ct("/api/ads/tap",{campaign:i.c,slot:t,pos:e.pos()}));a&&(window.open(a.path,"_blank","noopener"),this.toast(`Opening ${a.brand}'s page in a new tab.`))}},"Visit advertiser"))):o.push(p("h3",{},"Your ad here"),p("p",{},"This board is free. Brands rent boards at /advertise (test mode)."),p("a",{href:"/advertise",target:"_blank",rel:"noopener",class:"btn"},"Advertise on this board")),this.openSheet("Billboard",o)}phone(t){return this.g.cfg.phone&&this.g.phone2?(this.shell||(this.shell=new Vo(this)),this.shell.open(t||"home")):this.phoneLegacy(t||"wallet")}phoneLegacy(t="wallet"){let e=this.g,n=[["wallet","\u{1F4B0} Wallet"],["jobs","\u{1F4BC} Jobs"],["home","\u{1F3E0} Home"],["land","\u{1F30D} Land"],["ranks","\u{1F3C6} Ranks"],["garage","\u{1F697} Garage"],["games","\u{1F3AE} Games"],["map","\u{1F5FA} Map"],["alerts","\u{1F514} Alerts"],["more","\u2699\uFE0F More"]],i=p("div",{}),r=t,o=p("div",{class:"tabrow"}),a=()=>o.replaceChildren(...n.map(([l,u])=>p("button",{class:l===r?"on":"",onclick:()=>{r=l,a(),c()}},u))),c=async()=>{i.replaceChildren(p("p",{class:"mut"},"Loading\u2026"));let u=await this["tab_"+r].call(this);i.replaceChildren(...[].concat(u))};a(),this.openSheet("Phone",[o,i]),c()}async tab_wallet(){let t=this.g,e=t.user,n=await this.guard(()=>zt("/api/ledger")),i=p("input",{class:"sheet-input",type:"number",min:100,placeholder:"Amount \u20A6"}),r=p("input",{class:"sheet-input",placeholder:"Send to @username"}),o=a=>async()=>{let c=await this.guard(()=>ct("/api/bank",{dir:a,amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));c&&(t.update(c.user),this.toast(a==="deposit"?"Saved in the bank.":"Withdrawn.","money"),this.setSheetBody([]),this.phone("wallet"))};return[p("div",{class:"row sp"},p("div",{},p("div",{class:"mut"},"Cash"),p("b",{style:"font-size:26px"},xt(e.cash))),p("div",{},p("div",{class:"mut"},"Savings (\u22480.5%/day, ESTIMATE)"),p("b",{style:"font-size:22px"},xt(e.savings))),p("div",{},p("div",{class:"mut"},"Net worth"),p("b",{},xt(e.netWorth)))),i,p("div",{class:"row"},p("button",{class:"btn",onclick:o("deposit")},"Save"),p("button",{class:"btn ghost",onclick:o("withdraw")},"Withdraw"),p("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>ct("/api/transfer",{to:r.value.replace("@",""),amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));a&&(t.update(a.user),this.toast("Sent!","money"))}},"Send money")),r,p("p",{class:"mut"},"Transfers are capped and rate-limited. New accounts wait a few minutes. Guests cannot send money."),p("div",{class:"card",style:"box-shadow:none;border:2px dashed #cfc8ac;padding:12px;margin:10px 0"},p("b",{},"Test top-up"),p("div",{class:"mut"},"TEST MODE: adds pretend \u20A6, no payment is taken. Real payments (Monipay) come later."),p("div",{class:"chips"},(t.cfg.topupOptions||[]).map(a=>p("button",{class:"chip",onclick:async()=>{let c=await this.guard(()=>ct("/api/topup/test",{amount:a,idem:crypto.randomUUID?.()||String(Math.random())}));c&&(t.update(c.user),this.toast(`+${xt(a)} (test)`,"money"))}},`+${xt(a)}`)))),p("b",{},"Recent activity"),p("div",{class:"list"},(n?.rows||[]).slice(0,12).map(a=>p("div",{},p("span",{},a.reason.replaceAll("_"," ")),p("b",{style:`color:${a.amount<0?"#d6402f":"#0b7a49"}`},(a.amount>0?"+":"")+xt(a.amount)))))]}async tab_jobs(){let t=await this.guard(()=>zt("/api/jobs"));return t?[p("p",{class:"mut"},"Tap a job to set a waypoint. Start shifts at the job location."),p("div",{class:"list"},t.jobs.map(e=>p("div",{},p("div",{},p("b",{},e.name),p("div",{class:"mut"},`${xt(e.wage)} \xB7 ${e.durationSec}s \xB7 ${e.place}${e.locked?" \xB7 \u{1F512}":""}`)),p("button",{class:"btn small ghost",onclick:()=>{this.g.setWaypoint(e.x,e.z,e.name),this.closeSheet()}},"\u{1F4CD}"))))]:[]}async tab_home(){let t=this.g,e=t.user,n=await this.guard(()=>zt("/api/properties"));return n?(t.props=n.properties,t.world.setMarkers(n.properties),e.home?[p("h3",{},e.home.name),p("div",{class:"mut"},`${e.home.tierLabel} \xB7 ${e.home.area}`),p("div",{class:"row"},p("button",{class:"btn",onclick:()=>{this.closeSheet(),t.setWaypoint(e.home.door.x,e.home.door.z,e.home.name)}},"\u{1F4CD} Waypoint"),p("button",{class:"btn alt",onclick:()=>this.place(e.home.id)},"Open house card"))]:[p("p",{class:"mut"},"Find a place: green arrows over doors mean available. Tap a house to rent or buy."),p("div",{class:"list"},n.properties.filter(i=>i.status==="available").slice(0,12).map(i=>p("div",{},p("div",{},p("b",{},i.baseName),p("div",{class:"mut"},`${i.tierLabel} \xB7 ${i.area} \xB7 ${xt(i.rent)}/day${i.price?` \xB7 buy ${xt(i.price)}`:""}`)),p("button",{class:"btn small ghost",onclick:()=>this.place(i.id)},"View"))))]):[]}async tab_land(){let t=await this.guard(()=>zt("/api/plots"));return t?[p("div",{class:"list"},t.plots.map(e=>p("div",{},p("div",{},p("b",{},e.name),p("div",{class:"mut"},`${e.area} \xB7 ${xt(e.price)} \xB7 risk ${e.risk} \xB7 ${e.status}`)),p("button",{class:"btn small ghost",onclick:()=>this.place(e.id)},"View"))))]:[]}async tab_ranks(){let t=await this.guard(()=>zt("/api/leaderboard"));return t?[p("p",{class:"mut"},"Net worth = cash + savings + property (70%) + land (95%). Bots are hidden."),p("div",{class:"list"},t.rows.map(e=>p("div",{},p("span",{},`#${e.rank} ${e.name}${e.guest?" (guest)":""}`),p("b",{},xt(e.netWorth)))))]:[]}openMap(t){this.bigmap=this.bigmap||new $o(this.g),this.sheetOpen&&this.closeSheet(),this.bigmap.isOpen?this.bigmap.close():this.bigmap.open(t)}async tab_map(){return this.openMap(),[]}async tab_games(){return Od(this)}playCasual(t){jl(this,t)}async tab_garage(){let t=await this.guard(()=>zt("/api/garage"));if(!t)return[];let e=this.g,n=e.city.places.find(r=>r.id==="venue_motors"),i=t.cars.length?p("div",{class:"list"},t.cars.map(r=>p("div",{},p("span",{},`${r.active?"\u2705 ":""}${r.name}`,p("small",{class:"mut"},` \xB7 worth ${xt(r.value)} (paid ${xt(r.paid)}) \xB7 ${r.ageDays}d old \xB7 ${r.conditionLabel} ${r.condition}%`)),p("span",{class:"row"},r.active?"":p("button",{class:"btn small",onclick:async()=>{await this.guard(()=>ct("/api/garage/use",{carId:r.id})),this.phone("garage")}},"Use"),p("button",{class:"btn small ghost",onclick:()=>this.confirm(`Sell ${r.name} for about ${xt(r.value)}?`,async()=>{let o=await this.guard(()=>ct("/api/garage/sell",{carId:r.id,idemKey:crypto.randomUUID?.()}));o&&(this.toast(`Sold for ${xt(o.value)}.`,"money"),e.refreshMe()),this.phone("garage")})},"Sell"))))):p("p",{class:"mut"},"No car of your own yet. You are using a borrowed car: higher cost per trip, slower, no mood perk.");return[p("div",{class:"row sp"},p("b",{},`Garage (${t.cars.length}/${t.slots})`),p("span",{class:"mut"},`Driving: ${t.active.label}`)),i,p("p",{class:"mut"},`Resale: about ${Math.round((1-t.resale.firstDriveOffFraction)*100)}% on day one, then about ${Math.round(t.resale.perDayDepreciation*100)}% less per day, never below ${Math.round(t.resale.floorFraction*100)}%. All figures are ESTIMATES.`),p("button",{class:"btn",id:"openGarage",onclick:()=>e.garage.show()},"\u{1F6AA} Open my garage"),n?p("button",{class:"btn alt",onclick:()=>{this.closeSheet(),this.place(n.id)}},"\u{1F3EA} Visit Naija Auto Mart"):""]}async tab_alerts(){let t=await this.guard(()=>zt("/api/notifications"));return this.g.markRead(),t?[p("div",{class:"list"},t.rows.map(e=>p("div",{},p("span",{},e.text),p("span",{class:"mut"},new Date(e.created_at).toLocaleTimeString("en-NG",{hour:"numeric",minute:"2-digit"})))))]:[]}async tab_more(){let t=this.g,e=await this.guard(()=>zt("/api/social/blocks")),n=p("div",{class:"list"},(e?.rows||[]).map(i=>p("div",{},p("span",{},`@${i.username} \xB7 ${i.kind}`),p("button",{class:"btn small ghost",onclick:async()=>{await this.setBlock(i.username,null),this.phone("more")}},"Undo"))));return[p("b",{},"Muted and blocked"),(e?.rows||[]).length?n:p("p",{class:"mut"},"Nobody. Tap a chat line or the \u22EF on a house card to mute, block or report."),p("div",{class:"row"},p("a",{class:"btn ghost",href:"/advertise",target:"_blank",rel:"noopener"},"Advertise"),p("a",{class:"btn ghost",href:"/methodology",target:"_blank",rel:"noopener"},"How ads are counted"),p("a",{class:"btn ghost",href:"/stats.html",target:"_blank",rel:"noopener"},"Stats")),p("p",{class:"mut"},`${t.cfg.name} v0 \xB7 test build. In-game \u20A6 is fictional with no cash-out. 18+.`),p("div",{class:"row"},p("button",{class:"btn red",onclick:()=>t.logout()},"Log out"))]}},nv=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z),iv=s=>({venue:"Place to hang out",shop:"Shop",job:"Work",house:"House",plot:"Land plot",landmark:"Landmark"})[s]||s;var Yo=class{constructor(t){this.g=t,this.interval=3e3,this.fails=0,this.timer=null,this.running=!1,this.trail=[],this.notifSince=0,this.chatSince=void 0,this.adsVersion=0,this.since=0,this.ws=null,this.inflight=!1}start(){this.running||(this.running=!0,this.tick(),this.openWs())}stop(){this.running=!1,clearTimeout(this.timer);try{this.ws?.close()}catch{}this.ws=null}nudge(){this.running&&(clearTimeout(this.timer),this.timer=setTimeout(()=>this.tick(),50))}sample(t){this.trail.push(t),this.trail.length>60&&this.trail.shift()}async tick(){if(!this.running||this.inflight)return;this.inflight=!0;let t=this.g,e=t.serverNow(),n=!1,i=this.trail.splice(0).map(r=>({a:Math.max(0,Math.round(e-r.t)),x:+r.x.toFixed(2),z:+r.z.toFixed(2),ry:+r.ry.toFixed(3)}));try{let r={trail:i,mode:t.ctrl.mode,since:this.since,notifSince:this.notifSince,adsVersion:this.adsVersion,evidence:t.ads.take(),activity:t.activity||""};this.chatSince!==void 0&&(r.chatSince=this.chatSince);let o=performance.now(),a=await ct("/api/heartbeat",r),c=performance.now()-o;t.clockSync(a.now,c),this.since=a.now,this.fails=0,n=!0,t.setConn(!0),this.interval=a.interval||3e3,this.adsVersion=a.adsVersion,this.chatSince=a.chatCursor,a.notifs?.length&&(this.notifSince=a.notifs[a.notifs.length-1].id),t.onHeartbeat(a)}catch(r){if(this.fails++,r instanceof Tn&&r.status===401){this.stop(),t.sessionLost();return}this.fails>=3&&t.setConn(!1)}finally{this.inflight=!1}this.running&&(this.timer=setTimeout(()=>this.tick(),n?this.interval:Math.min(15e3,1500*2**Math.min(this.fails,3))))}openWs(){if(!window.__naDemo)try{let t=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`);this.ws=t,t.onmessage=e=>{try{let n=JSON.parse(e.data);n.type==="notification"?(this.g.onPush(n),this.nudge()):typeof n.type=="string"&&n.type.startsWith("phone.")&&this.g.phone2?.onPush(n)}catch{}},t.onclose=()=>{this.running&&setTimeout(()=>this.running&&this.openWs(),5e3)},t.onerror=()=>{}}catch{}}};var sv=new te({vertexColors:!0}),rv=new re({vertexColors:!0}),Hd=new Map,z={wood:9067051,dark:4861724,mid:7029286,light:13081186,cream:15985362,red:12597547,green:34641,teal:2060154,yellow:15906565,white:16053488,steel:12106946,black:1710622,rubber:2236966,brass:13938487,glass:10475775,pink:15046811},rn=(s,t,e,n,i,r,o,a,c={})=>s.sphere(.5,i,r+e/2,o,a,{sx:t,sy:e,sz:n,ws:8,hs:5,noAO:!0,...c}),Jo=(s,t,e,n,i,r,o,a,c={})=>s.cyl(t,t,e,10,n,i-e/2,r,a,{noAO:!0,...o==="z"?{rx:Math.PI/2}:{rz:Math.PI/2},...c}),Zo=(s,t,e,n,i,r,o=.035)=>s.cyl(o*.8,o,i,6,t,e,n,r,{noAO:!0});function Nt(s,t,e,n,i){let r=`${s}|${t.toFixed(2)}|${e.toFixed(2)}|${JSON.stringify(n||{})}`,o=Hd.get(r);if(!o){let c=new Ue(s.length*7+3,.025),l=new Ue(5,0);i(c,l,t,e,n||{}),o={lit:c.build(),glow:l.parts.length?l.build():null},Hd.set(r,o)}let a=new Gt;return a.add(new ot(o.lit,sv)),o.glow&&a.add(new ot(o.glow,rv)),a}var ov=(s,t,e,n,i)=>{let r=i.c??z.red,o=Math.min(e,n),a=.46;s.box(o*.92,.06,o*.92,0,a,0,r),rn(s,o*.8,.07,o*.8,0,a+.06,0,i.cushion??r);for(let[c,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])Zo(s,c*o*.4,0,l*o*.4,a,i.leg??z.dark,.03);s.box(o*.92,.5,.05,0,a+.06,-o*.44,r);for(let c=-1;c<=1;c++)s.box(.05,.4,.03,c*o*.28,a+.1,-o*.4,i.leg??z.dark)},Ko=(s={})=>Nt("chair",.5,.5,s,ov),jo=(s={})=>Nt("stool",.4,.4,s,(t,e,n,i,r)=>{t.cyl(.19,.19,.07,12,0,.5,0,r.c??z.red,{noAO:!0});for(let o of[0,1,2,3]){let a=Math.cos(o*Math.PI/2+.78)*.15,c=Math.sin(o*Math.PI/2+.78)*.15;Zo(t,a,0,c,.5,z.steel,.022)}t.cyl(.14,.14,.02,10,0,.2,0,z.steel,{noAO:!0})}),Ss=(s=2.2,t=.95,e={})=>Nt("sofa",s,t,e,(n,i,r,o,a)=>{let c=a.c??z.teal,l=a.cushion??z.yellow,u=.24,h=Math.max(2,Math.round((r-2*u)/.75)),d=(r-2*u)/h;for(let f of[-1,1])Zo(n,f*(r/2-.1),0,o/2-.1,.1,z.dark),Zo(n,f*(r/2-.1),0,-o/2+.1,.1,z.dark);n.box(r,.28,o,0,.1,0,z.dark,{noAO:!0}),n.box(r-.04,.22,o-.04,0,.2,0,c);for(let f=0;f<h;f++){let g=-r/2+u+d*(f+.5);rn(n,d-.03,.2,o-.3,g,.42,.1,c),rn(n,d-.03,.55,.22,g,.52,-o/2+.2,c,{rx:-.22})}for(let f of[-1,1])n.box(u,.36,o,f*(r/2-u/2),.2,0,c),Jo(n,u/2,o-.04,f*(r/2-u/2),.4,0,"z",c,{noAO:!1});rn(n,.38,.38,.12,-r/2+u+.28,.52,.05,l,{rz:.3,rx:-.25}),rn(n,.36,.36,.12,r/2-u-.28,.52,.05,a.cushion2??l,{rz:-.25,rx:-.25})});var Vd=(s=2.4,t={})=>Nt("bench",s,.55,t,(e,n,i,r,o)=>{e.box(i,.08,r,0,.44,0,o.c??z.wood);for(let a=0;a<4;a++)e.box(i,.012,.01,0,.5,-r/2+(a+.5)*r/4,z.dark,{noAO:!0});e.box(i,.5,.07,0,.5,-r/2+.04,o.c??z.wood);for(let a of[-1,1])e.box(.08,.44,r-.06,a*(i/2-.12),0,0,z.dark),e.box(.06,.28,.06,a*(i/2-.12),.5,r/2-.1,z.dark)});var eh=(s=.7,t={})=>Nt("rtable",s*2,s*2,t,(e,n,i,r,o)=>{e.cyl(s,s,.05,20,0,.72,0,o.c??z.light,{noAO:!0}),e.cyl(s-.04,s-.08,.06,20,0,.66,0,z.dark,{noAO:!0}),e.cyl(.07,.09,.66,8,0,0,0,z.dark,{noAO:!0}),e.cyl(.32,.36,.05,12,0,0,0,z.dark,{noAO:!0}),o.cloth&&e.cyl(s+.02,s+.04,.02,20,0,.745,0,o.cloth,{noAO:!0}),o.vase&&(e.cyl(.05,.07,.2,8,0,.77,0,z.glass,{noAO:!0}),e.sphere(.09,0,1.05,0,z.pink,{noAO:!0}),e.sphere(.07,.07,1,.03,z.yellow,{noAO:!0}))}),Gd=(s=2.6,t=2.6,e={})=>{let n=new Gt,i=Math.min(s,t)*.28;n.add(eh(i,{cloth:e.cloth??15787720,vase:!0,c:z.light}));let r=i+.38;for(let o=0;o<4;o++){let a=o*Math.PI/2+Math.PI/4,c=Ko({c:e.chair??z.red});c.position.set(Math.cos(a)*r,0,Math.sin(a)*r),c.rotation.y=-a-Math.PI/2+Math.PI,n.add(c)}return n},nh=(s=1.1,t=.6,e={})=>Nt("ctable",s,t,e,(n,i,r,o,a)=>{n.box(r,.06,o,0,.36,0,a.c??z.light),n.box(r-.08,.06,o-.08,0,.3,0,z.dark,{noAO:!0});for(let[c,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.box(.06,.3,.06,c*(r/2-.07),0,l*(o/2-.07),z.dark,{noAO:!0});n.box(r-.1,.03,o-.1,0,.12,0,z.dark,{noAO:!0}),n.cyl(.07,.05,.1,8,.2,.42,.02,z.glass,{noAO:!0}),n.box(.22,.02,.16,-.25,.42,.05,z.green,{noAO:!0})}),Wd=(s=1.6,t=.7,e={})=>Nt("desk",s,t,e,(n,i,r,o,a)=>{n.box(r,.05,o,0,.72,0,a.c??z.light),n.box(.5,.68,o-.06,r/2-.27,.02,0,z.wood);for(let c=0;c<3;c++)n.box(.44,.17,.02,r/2-.27,.06+c*.22,o/2-.02,z.mid),n.box(.12,.02,.03,r/2-.27,.14+c*.22,o/2,z.brass,{noAO:!0});n.box(.05,.7,o-.06,-r/2+.05,0,0,z.wood),i.box(.5,.32,.03,-.3,.8,-.1,2241348,{jit:0}),n.box(.12,.08,.1,-.3,.77,-.1,z.black),n.box(.4,.02,.14,-.3,.77,.15,z.steel,{noAO:!0})}),$d=(s=2,t=2,e={})=>Nt("bed",s,t,e,(n,i,r,o,a)=>{let c=a.frame??z.dark,l=a.blanket??z.green,u=a.sheet??15854296,h=a.pillow??16184298;n.box(r,.28,o,0,.08,0,c),n.box(r-.06,.2,o-.1,0,.36,.03,u),n.box(r+.06,.9,.1,0,0,-o/2+.05,c),n.box(r-.12,.56,.04,0,.18,-o/2+.12,z.mid,{noAO:!0});for(let g of[-1,1])n.box(.12,1.05,.12,g*(r/2),0,-o/2+.06,c);n.box(r+.06,.22,.08,0,.2,o/2-.04,c);let d=o*.6;n.box(r-.04,.09,d,0,.55,o/2-d/2-.04,l),n.box(r+.02,.28,.08,0,.3,o/2-.1,l),n.box(r-.04,.05,.16,0,.62,o/2-d-.02,u,{noAO:!0});for(let g=0;g<4;g++)n.box(.02,.095,d-.1,-r/2+.2+g*(r-.4)/3,.55,o/2-d/2-.04,41052,{noAO:!0,jit:.1});let f=r>1.5?2:1;for(let g=0;g<f;g++)rn(n,Math.min(.78,(r-.2)/f-.06),.16,.42,(g-(f-1)/2)*(r/2-.05),.56,-o/2+.38,h,{noAO:!1});a.king&&rn(n,.4,.3,.14,0,.62,-o/2+.22,a.cushion??8072383,{rx:-.5})}),Xd=(s=1.6,t=.65,e=2.2,n={})=>Nt("ward",s,t,{h:e,...n},(i,r,o,a,c)=>{let l=c.c??8014372,u=4860434;i.box(o,.08,a,0,0,0,u),i.box(o,c.h-.16,a,0,.08,0,l),i.box(o+.06,.1,a+.04,0,c.h-.08,0,u);let h=o>1.2?3:2,d=(o-.1)/h;for(let f=0;f<h;f++){let g=-o/2+.05+d*(f+.5);i.box(d-.03,c.h-.34,.03,g,.16,a/2,9067054,{noAO:!0}),i.box(d-.2,c.h-.6,.02,g,.3,a/2+.012,7225632,{noAO:!0}),i.box(.03,.2,.04,g+(f%2?-1:1)*(d/2-.1),c.h/2-.05,a/2+.03,z.brass,{noAO:!0})}}),ih=(s=1,t=.32,e=1.8,n={})=>Nt("shelf",s,t,{h:e,...n},(i,r,o,a,c)=>{let l=c.c??z.wood,u=Math.max(3,Math.round(c.h/.38));i.box(.04,c.h,a,-o/2+.02,0,0,l),i.box(.04,c.h,a,o/2-.02,0,0,l),i.box(o,c.h,.02,0,0,-a/2+.01,z.mid,{noAO:!0});let h=[z.red,z.green,z.yellow,3046865,z.teal,z.cream,9323693];for(let d=0;d<=u;d++)i.box(o-.06,.03,a,0,d*(c.h-.03)/u,0,l);for(let d=0;d<u;d++){let f=d*(c.h-.03)/u+.03,g=-o/2+.07,y=(d*5+2)%4;for(y===0&&(i.cyl(.07,.09,.14,8,g+.1,f,0,11883578,{noAO:!0}),i.sphere(.13,g+.1,f+.26,0,3120730,{noAO:!0}),g+=.34);g<o/2-.1;){if(c.stuff==="pots"){i.cyl(.085,.1,.17+g*50%3*.02,8,g+.1,f,0,[11883578,15320170,2792847,14041135][Math.floor(Math.abs(g*31+d))%4],{noAO:!0}),i.cyl(.09,.09,.025,8,g+.1,f+.17,0,z.steel,{noAO:!0}),g+=.26;continue}if(c.stuff==="bottles"){let v=[15087942,2792847,16032353,9358054,15320170,6986062][Math.floor(Math.abs(g*31+d))%6];i.cyl(.035,.045,.24,7,g+.05,f,0,v,{noAO:!0}),i.cyl(.015,.025,.08,6,g+.05,f+.24,0,v,{noAO:!0}),g+=.12;continue}let x=.03+Math.abs(Math.floor(g*100)+d*7)%4*.01,m=.2+Math.abs(Math.floor(g*91)+d*3)%5*.025;i.box(x,m,a-.08,g+x/2,f,0,h[Math.floor(Math.abs(g*37+d*11))%h.length],{noAO:!0}),g+=x+.005,y===1&&g>.3*o&&(i.box(.16,.2,.02,g+.1,f,0,z.brass,{noAO:!0}),g+=.24)}}}),sh=(s=1.2,t={})=>Nt("tv",s,.4,t,(e,n,i,r,o)=>{let a=i*.56;o.wall||(e.box(i*.9,.04,.3,0,0,0,z.black),e.box(.06,.1,.06,0,.04,0,z.black));let c=o.wall?0:.14;e.box(i,a,.06,0,c,0,z.black),n.box(i-.08,a-.08,.02,0,c+.04,.035,3108816,{jit:0}),n.box((i-.08)*.5,a*.4,.02,i*.12,c+a*.35,.04,5810431,{jit:0}),n.box(.08,.02,.02,i*.3,c+.02,.04,16724016,{jit:0})}),Es=(s=1.8,t={})=>{let e=new Gt;e.add(Nt("tvunit",s,.45,t,(i,r,o,a,c)=>{let l=c.c??4861724;i.box(o,.45,a,0,.06,0,l),i.box(o,.04,a+.02,0,.51,0,3810322,{noAO:!0});for(let u=0;u<3;u++)i.box(o/3-.05,.3,.02,-o/3+u*o/3,.12,a/2,7029286,{noAO:!0}),i.box(.1,.02,.02,-o/3+u*o/3,.3,a/2+.02,z.brass,{noAO:!0});for(let u of[-1,1])i.box(.05,.06,.05,u*(o/2-.08),0,0,z.black)}));let n=sh(Math.min(1.3,s*.7));return n.position.y=.53,e.add(n),e},ar=(s=.75,t=.7,e=1.85,n={})=>Nt("fridge",s,t,{h:e,...n},(i,r,o,a,c)=>{let l=c.c??15265522;i.box(o,c.h,a,0,.04,0,l),i.box(o-.04,.02,a-.04,0,c.h*.64,.01,9213339,{noAO:!0}),i.box(.04,.5,.05,o/2-.1,c.h*.68,a/2+.02,z.steel,{noAO:!0}),i.box(.04,.8,.05,o/2-.1,c.h*.2,a/2+.02,z.steel,{noAO:!0}),i.box(o,.04,a,0,0,0,z.rubber,{noAO:!0}),i.box(.16,.12,.01,-.12,c.h*.78,a/2+.005,z.red,{noAO:!0})}),Yd=(s=.75,t=.65,e={})=>Nt("cooker",s,t,e,(n,i,r,o,a)=>{n.box(r,.88,o,0,0,0,z.white),n.box(r,.03,o,0,.88,0,z.black);for(let[c,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.cyl(.09,.09,.02,12,c*r*.22,.91,l*o*.2,3355448,{noAO:!0}),n.cyl(.04,.04,.025,8,c*r*.22,.91,l*o*.2,z.steel,{noAO:!0});n.box(r-.12,.45,.02,0,.18,o/2,z.black,{noAO:!0}),i.box(r-.2,.3,.01,0,.26,o/2+.012,4474703,{jit:0}),n.box(r-.2,.03,.04,0,.66,o/2+.03,z.steel,{noAO:!0});for(let c=0;c<4;c++)n.cyl(.025,.025,.03,8,-r*.3+c*r*.2,.8,o/2+.01,z.steel,{rx:Math.PI/2,noAO:!0});a.gas!==!1&&n.cyl(.14,.14,.5,10,r/2+.2,0,0,3054430)}),rh=(s=1.8,t=.6,e={})=>Nt("counter",s,t,e,(n,i,r,o,a)=>{n.box(r,.1,o-.04,0,0,0,z.dark,{noAO:!0}),n.box(r,.78,o-.06,0,.1,0,a.c??14209732);let c=Math.max(2,Math.round(r/.5));for(let l=0;l<c;l++)n.box(r/c-.04,.6,.02,-r/2+(l+.5)*r/c,.18,o/2-.02,12169372,{noAO:!0}),n.box(.1,.02,.025,-r/2+(l+.5)*r/c,.62,o/2,z.steel,{noAO:!0});n.box(r+.04,.05,o,0,.88,0,a.top??4868686),n.box(.5,.02,.35,-r*.2,.93,0,z.steel,{noAO:!0}),n.cyl(.02,.02,.28,6,-r*.2,.93,-o*.3,z.steel,{noAO:!0}),n.box(.02,.02,.14,-r*.2,1.17,-o*.24,z.steel,{noAO:!0})}),qd=(s={})=>Nt("water",.34,.34,s,(t,e,n,i,r)=>{t.box(.32,.9,.32,0,0,0,14673642),t.box(.2,.06,.02,0,.55,.17,z.steel,{noAO:!0}),t.box(.04,.05,.04,-.05,.6,.17,2784737,{noAO:!0}),t.box(.04,.05,.04,.05,.6,.17,z.red,{noAO:!0}),t.cyl(.14,.14,.38,12,0,.9,0,6993919,{noAO:!0,jit:0}),t.cyl(.05,.12,.08,10,0,1.28,0,6993919,{noAO:!0,jit:0})}),Qo=(s=1,t=.8,e={})=>Nt("gen",s,t,e,(n,i,r,o,a)=>{for(let[c,l]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.box(.05,.4,.05,c*(r/2-.05),0,l*(o/2-.05),z.steel);n.box(r,.06,o,0,.4,0,z.steel),n.box(r-.1,.4,o-.15,0,.46,0,z.red),n.box(r*.45,.2,o-.2,-r*.2,.86,0,15253552),n.cyl(.07,.07,.3,8,r*.25,.86,0,z.black,{noAO:!0}),n.box(.34,.14,.04,0,.62,o/2-.06,z.black,{noAO:!0}),i.box(.05,.05,.02,-.08,.66,o/2-.035,3211104,{jit:0}),n.cyl(.02,.02,.4,6,r/2-.1,.86,.12,z.steel,{noAO:!0})}),oh=()=>Nt("ac",1,.25,{},(s,t,e,n)=>{s.box(.95,.3,.2,0,0,0,z.white);for(let i=0;i<4;i++)s.box(.8,.012,.01,0,.05+i*.045,.101,13094096,{noAO:!0});t.box(.03,.03,.01,.38,.22,.101,3211104,{jit:0})});var Ts=(s={})=>Nt("plant",.6,.6,s,(t,e,n,i,r)=>{let o=r.h??1;if(t.cyl(.22,.16,.34,10,0,0,0,r.pot??11883578),t.cyl(.24,.24,.05,10,0,.32,0,r.pot??11883578,{noAO:!0}),t.cyl(.2,.2,.02,10,0,.36,0,3811868,{noAO:!0}),r.kind==="snake"){for(let c=0;c<7;c++){let l=c*.9;t.box(.07,o*(.6+c%3*.14),.03,Math.cos(l)*.08,.36,Math.sin(l)*.08,c%2?3111482:4168266,{ry:l,rz:Math.cos(l)*.08,noAO:!0})}return}t.cyl(.03,.04,o*.5,5,0,.36,0,7031339,{noAO:!0});let a=[3120730,4174699,2591306,5031034];for(let c=0;c<7;c++){let l=c*2.4;t.ico(.19+c%3*.04,Math.cos(l)*.17*(c>0),.36+o*.45+c%4*.14,Math.sin(l)*.17*(c>0),a[c%4],{detail:0,noAO:!0})}}),Zd=(s={})=>Nt("flamp",.4,.4,s,(t,e,n,i,r)=>{t.cyl(.14,.16,.04,10,0,0,0,z.black,{noAO:!0}),t.cyl(.015,.015,1.45,6,0,.04,0,z.brass,{noAO:!0}),e.cyl(.1,.2,.3,12,0,1.45,0,r.shade??16769952,{jit:0}),t.cyl(.11,.11,.02,12,0,1.46,0,z.black,{noAO:!0})}),ta=(s={})=>Nt("tlamp",.3,.3,s,(t,e,n,i,r)=>{t.cyl(.07,.09,.22,8,0,0,0,r.c??z.teal,{noAO:!0}),e.cyl(.07,.13,.17,10,0,.22,0,16769952,{jit:0})}),As=(s=2.6,t=2.6,e={})=>Nt("rug",s,t,e,(n,i,r,o,a)=>{let c=[a.a??z.red,a.b??z.green,a.c??z.yellow,a.a??z.red],l=c.length;n.box(r,.02,o,0,0,0,a.a??z.red,{noAO:!0});for(let u=0;u<l;u++)n.box(r-.1,.012,o/(l*2.2),0,.02,-o/2+.15+u*(o-.3)/(l-1),c[(u+1)%l],{noAO:!0});n.box(r-.3,.014,o-.3,0,.022,0,a.a??z.red,{noAO:!0,shade:1.05});for(let u=0;u<3;u++)n.box(r-.5,.016,.1,0,.026,-o*.25+u*o*.25,[a.c??z.yellow,a.b??z.green,a.c??z.yellow][u],{noAO:!0});for(let u=0;u<Math.floor(r/.12);u++)for(let h of[-1,1])n.box(.03,.012,.12,-r/2+.06+u*.12,0,h*(o/2+.05),z.cream,{noAO:!0})}),ah=(s=1.4,t=2.2,e={})=>Nt("curtain",s,.2,{h:t,...e},(n,i,r,o,a)=>{Jo(n,.015,r+.2,0,a.h,0,"x",z.brass),n.box(r+.1,.12,.1,0,a.h-.15,0,a.pelmet??10502192,{noAO:!0});let c=Math.round(r/.14);for(let l=0;l<c;l++)(!a.open||Math.abs(l+.5-c/2)>c*.22)&&n.box(r/c,a.h-.4,.05+l%2*.05,-r/2+(l+.5)*r/c,.3,l%2*.02,l%2?a.c??15167313:a.c2??13916987,{noAO:!0});for(let l of[-1,1])n.cyl(.04,.04,.04,8,l*(r/2-.04),1,.05,z.brass,{noAO:!0})}),av=s=>(t,e,n,i,r)=>{t.box(n,i,.04,0,0,0,z.dark),e.box(n-.08,i-.08,.01,0,.04,.025,16183260,{jit:0});let o=[z.red,z.green,z.yellow,3046865,z.teal];if(s==="sun")e.box(n-.08,(i-.08)*.45,.012,0,.04,.03,5219271,{jit:0}),e.box(n-.08,(i-.08)*.3,.014,0,.04,.034,14721104,{jit:0}),e.cyl(.1,.1,.012,12,0,i*.5,.036,16765503,{rx:Math.PI/2,jit:0});else for(let a=0;a<5;a++)e.box((n-.2)/6,(i-.2)*(.3+a%3*.2),.012,-n*.35+a*n*.17,.1,.03,o[a],{jit:0})},ea=(s=.8,t=.6,e="bars")=>Nt("art",s,t,{kind:e},(n,i,r,o,a)=>av(a.kind)(n,i,r,o,a)),na=(s=1,t=.6)=>Nt("flag",s,t,{},(e,n,i,r)=>{e.box(i+.08,r+.08,.05,0,-.04,0,z.dark),n.box(i/3,r,.02,-i/3,0,.03,34641,{jit:0}),n.box(i/3,r,.02,0,0,.03,16777215,{jit:0}),n.box(i/3,r,.02,i/3,0,.03,34641,{jit:0})}),ia=(s=.22)=>Nt("clock",s*2,s*2,{},(t,e)=>{t.cyl(s,s,.05,20,0,0,0,z.dark,{rx:Math.PI/2,noAO:!0}),e.cyl(s*.88,s*.88,.01,20,0,0,.03,16447210,{rx:Math.PI/2,jit:0}),e.box(.012,s*.55,.01,0,0,.04,2236962,{jit:0}),e.box(s*.45,.012,.01,s*.2,0,.042,2236962,{jit:0});for(let n=0;n<12;n++){let i=n*Math.PI/6;e.box(.012,.03,.01,Math.sin(i)*s*.75,Math.cos(i)*s*.75,.04,3355443,{jit:0,rz:-i})}}),Jd=(s=.8,t=1.2,e={})=>Nt("mirror",s,t,e,(n,i,r,o,a)=>{if(n.box(r+.1,o+.1,.05,0,-.05,0,a.frame??z.brass),i.box(r,o,.02,0,0,.03,13625847,{jit:0}),i.box(r*.18,o*.9,.01,-r*.25,o*.05,.04,16777215,{jit:0,rz:.25}),a.bulbs)for(let c=0;c<=5;c++)for(let l of[-1,1])i.sphere(.035,l*(r/2+.1),-.05+c*(o+.1)/5,.05,16773296,{jit:0})}),ch=()=>{let s=new Gt;s.add(Nt("fanbase",.4,.4,{},e=>{e.cyl(.02,.02,.5,6,0,0,0,z.steel,{noAO:!0}),e.cyl(.12,.14,.12,10,0,-.1,0,14537397,{noAO:!0})}));let t=Nt("fanblades",1.4,1.4,{},e=>{for(let n=0;n<4;n++){let i=n*Math.PI/2;e.box(.62,.015,.14,Math.cos(i)*.5,-.12,-Math.sin(i)*.5,14273968,{ry:i,noAO:!0})}e.cyl(.07,.07,.05,8,0,-.17,0,14537397,{noAO:!0})});return s.add(t),s.userData.spin=t,s},sa=(s=1.2,t=1.3,e={})=>Nt("louvre",s,.16,{h:t,...e},(n,i,r,o,a)=>{let c=a.trim??16777215;n.box(r+.2,.1,.16,0,-.1,0,c,{noAO:!0}),n.box(r+.2,.1,.12,0,a.h,0,c,{noAO:!0});for(let u of[-1,1])n.box(.1,a.h+.1,.12,u*(r/2+.05),-.05,0,c,{noAO:!0});i.box(r,a.h,.02,0,0,-.02,a.day??12576511,{jit:0});let l=Math.round(a.h/.1);for(let u=0;u<l;u++)n.box(r,.06,.05,0,.04+u*(a.h-.1)/(l-1),.02,11064558,{rx:-.6,noAO:!0,jit:.04});n.box(r+.3,.05,.28,0,-.14,.1,c,{noAO:!0})}),Kd=(s=1.5,t={})=>Nt("speaker",.8,.65,{h:s,...t},(e,n,i,r,o)=>{e.box(i,o.h,r,0,0,0,1447450),e.box(i-.06,.04,r-.06,0,o.h-.02,0,2829106,{noAO:!0});let a=(c,l)=>{e.cyl(l,l,.05,18,0,c,r/2,855312,{rx:Math.PI/2,noAO:!0}),e.cyl(l*.65,l*.65,.06,14,0,c,r/2,2763312,{rx:Math.PI/2,noAO:!0}),e.cyl(l*.2,l*.2,.07,8,0,c,r/2,7830402,{rx:Math.PI/2,noAO:!0})};a(o.h*.3,.26),a(o.h*.74,.16),e.cyl(.05,.05,.03,8,0,o.h*.9,r/2,z.steel,{rx:Math.PI/2,noAO:!0});for(let c of[-1,1])e.box(.05,.06,.05,c*(i/2-.06),0,r/2-.06,3355448,{noAO:!0})}),jd=(s=3.2,t={})=>Nt("dj",s,1,t,(e,n,i,r,o)=>{e.box(i,1,r,0,0,0,1381658),e.box(i+.1,.06,r+.1,0,1,0,2894900),e.box(i-.1,.04,.03,0,.6,r/2,12029183,{noAO:!0}),n.box(i-.1,.03,.02,0,.5,r/2+.005,12029183,{jit:0});for(let a of[-.9,.9])e.cyl(.4,.4,.03,22,a,1.06,.05,2368556,{noAO:!0}),e.box(.05,.03,.34,a+.34,1.1,.15,z.steel,{ry:.5,noAO:!0});e.box(.7,.07,.55,0,1.06,.05,2368556);for(let a=0;a<6;a++)e.cyl(.02,.02,.04,6,-.26+a%3*.26,1.13,-.07+Math.floor(a/3)*.18,[z.red,z.yellow,z.teal][a%3],{noAO:!0});for(let a=0;a<4;a++)e.box(.04,.03,.14,-.2+a*.13,1.13,.2,z.steel,{noAO:!0});e.box(.5,.02,.34,1.35,1.06,-.15,z.steel,{noAO:!0}),e.box(.5,.3,.02,1.35,1.08,-.3,2239027,{rx:-.3,noAO:!0}),n.box(.44,.24,.01,1.35,1.1,-.285,4892927,{jit:0,rx:-.3}),e.box(.34,.02,.04,-1.3,1.1,-.1,z.black,{noAO:!0}),e.cyl(.07,.07,.04,10,-1.3,1.07,.1,546,{noAO:!0}),e.sphere(.04,-1.35,1.14,-.1,16777215,{noAO:!0})}),ra=(s=4,t={})=>Nt("bar",1,s,t,(e,n,i,r,o)=>{let a=o.c??2825492;e.box(i,1.05,r,0,0,0,a);for(let c=0;c<Math.round(r/.7);c++)e.box(.03,.8,.5,i/2+.005,.12,-r/2+.4+c*.7,4008477,{noAO:!0});e.box(i+.18,.07,r+.1,.05,1.05,0,o.top??13938487),Jo(e,.04,r,i/2+.12,.22,0,"z",z.steel),n.box(.03,.04,r-.1,i/2+.012,.98,0,o.glow??16732120,{jit:0});for(let c=0;c<Math.floor(r/.6);c++)e.cyl(.03,.03,.12,6,-.1,1.12,-r/2+.3+c*.6,[z.glass,16032353,15087942][c%3],{noAO:!0})}),lh=(s=4,t={})=>Nt("backbar",.5,s,t,(e,n,i,r,o)=>{e.box(i,.9,r,0,0,0,2825492);for(let a=0;a<3;a++){e.box(.36,.04,r-.1,.06,1.2+a*.45,0,5978650);let c=Math.round(r/.28);for(let l=0;l<c;l++){let u=[15087942,2792847,16032353,9358054,15320170,6986062][(l+a*2)%6];e.cyl(.045,.05,.28,7,.06,1.24+a*.45,-r/2+.2+l*(r-.4)/c,u,{noAO:!0,jit:.05}),e.cyl(.015,.02,.1,5,.06,1.52+a*.45,-r/2+.2+l*(r-.4)/c,u,{noAO:!0})}}e.box(.04,1.8,r,-.2,.9,0,4008477,{noAO:!0}),n.box(.02,.03,r-.1,0,2.7,0,16765562,{jit:0})}),hh=(s={})=>Nt("barstool",.5,.5,s,(t,e,n,i,r)=>{t.cyl(.23,.23,.04,14,0,.78,0,r.c??12653087,{noAO:!0}),rn(t,.4,.1,.4,0,.8,0,r.c??12653087),t.cyl(.035,.035,.72,8,0,.05,0,z.steel,{noAO:!0}),t.cyl(.24,.26,.04,14,0,0,0,1092,{noAO:!0}),t.cyl(.14,.14,.015,12,0,.3,0,z.steel,{noAO:!0})}),uh=(s={})=>Nt("schair",.8,.9,s,(t,e,n,i,r)=>{let o=r.c??2236966;t.cyl(.3,.34,.06,16,0,0,0,z.steel,{noAO:!0}),t.cyl(.07,.1,.35,10,0,.06,0,8949140,{noAO:!0}),t.cyl(.1,.1,.1,10,0,.4,0,z.black,{noAO:!0}),rn(t,.62,.14,.58,0,.5,.02,o),t.box(.6,.05,.5,0,.46,.02,z.steel,{noAO:!0}),rn(t,.6,.78,.16,0,.64,-.3,o,{rx:-.12}),rn(t,.3,.2,.12,0,1.38,-.34,o,{rx:-.12});for(let a of[-1,1])t.box(.07,.04,.46,a*.34,.74,0,z.steel,{noAO:!0}),t.box(.05,.3,.05,a*.34,.5,.2,z.steel,{noAO:!0});t.box(.5,.03,.2,0,.18,.44,z.steel,{noAO:!0}),t.box(.45,.2,.03,0,.1,.34,z.steel,{rx:.5,noAO:!0})}),Qd=(s={})=>Nt("basin",1.2,.9,s,(t,e,n,i,r)=>{t.box(n,.86,i,0,0,0,14607078),t.box(n+.04,.05,i+.04,0,.86,0,16054008),t.cyl(.4,.3,.14,16,0,.9,0,16777215,{noAO:!0}),t.cyl(.32,.26,.02,14,0,1.03,0,10470876,{noAO:!0}),t.cyl(.025,.025,.4,6,0,.9,-.38,z.steel,{noAO:!0}),t.box(.025,.025,.28,0,1.28,-.26,z.steel,{noAO:!0}),t.cyl(.04,.04,.04,8,.12,.96,-.36,z.red,{noAO:!0}),t.cyl(.04,.04,.04,8,-.12,.96,-.36,2784737,{noAO:!0});for(let o=0;o<3;o++)t.cyl(.05,.05,.2,8,-.4+o*.12,.91,.28,[z.pink,z.teal,z.yellow][o],{noAO:!0})}),tf=(s={})=>Nt("dryer",.7,.7,s,(t,e,n,i,r)=>{t.cyl(.24,.28,.05,12,0,0,0,1365,{noAO:!0}),t.cyl(.035,.035,1.1,8,0,.05,0,z.steel,{noAO:!0}),rn(t,.62,.52,.6,0,1.15,0,15046811),t.box(.22,.08,.1,0,1.1,.3,819,{noAO:!0}),t.cyl(.04,.04,.1,8,0,1.5,-.1,819,{noAO:!0})}),oa=(s=2.4,t=1.6)=>Nt("toolwall",s,.12,{h:t},(e,n,i,r,o)=>{e.box(i,o.h,.05,0,0,0,9211795);for(let c=0;c<12;c++)for(let l=0;l<8;l++)n.box(.02,.02,.005,-i/2+.12+c*(i-.24)/11,.12+l*(o.h-.24)/7,.026,5593180,{jit:0});let a=[z.red,2792847,16032353,4553629,15320170];for(let c=0;c<9;c++){let l=-i/2+.2+c*(i-.4)/8,u=a[c%5];c%3===0?(e.box(.04,.4,.04,l,o.h*.5,.06,10119738,{noAO:!0}),e.box(.18,.08,.05,l+.05,o.h*.5+.38,.06,z.steel,{noAO:!0})):c%3===1?(e.box(.05,.5,.03,l,o.h*.45,.06,u,{noAO:!0}),e.cyl(.07,.07,.03,6,l,o.h*.45+.5,.06,z.steel,{rx:Math.PI/2,noAO:!0})):(e.box(.05,.4,.03,l,o.h*.5,.06,z.steel,{noAO:!0}),e.box(.14,.04,.04,l,o.h*.5+.4,.06,u,{noAO:!0}))}e.box(i,.04,.2,0,o.h*.22,.1,5978650);for(let c=0;c<5;c++)e.cyl(.05,.05,.14,8,-i/2+.3+c*.4,o.h*.22+.04,.1,a[c],{noAO:!0});e.box(i,.04,.2,0,o.h*.08,.1,5978650)}),Rs=(s=2.8,t={})=>Nt("wbench",s,.75,t,(e,n,i,r,o)=>{e.box(i,.9,r,0,0,0,7040885),e.box(i+.1,.07,r+.1,0,.9,0,14711552);for(let a=0;a<3;a++)e.box(.72,.22,.02,-i/2+.5+a*.8,.16+a%2*.3,r/2,5725025,{noAO:!0}),e.box(.2,.025,.03,-i/2+.5+a*.8,.25+a%2*.3,r/2+.02,z.steel,{noAO:!0});e.box(.28,.14,.2,i/2-.4,.97,-.1,z.black),e.box(.12,.18,.08,i/2-.4,1,-.1,z.steel),e.box(.45,.2,.2,-i*.2,.97,.05,z.red),e.box(.45,.03,.08,-i*.2,1.17,.05,z.steel,{noAO:!0}),e.cyl(.06,.06,.18,8,.2,.97,.1,3038890,{noAO:!0})}),aa=(s=3)=>Nt("tyres",.8,.8,{n:s},(t,e,n,i,r)=>{for(let o=0;o<r.n;o++)t.cyl(.36,.36,.2,16,0,o*.2,0,1710620,{noAO:!0}),t.cyl(.2,.2,.202,12,0,o*.2,0,2763310,{noAO:!0}),t.cyl(.1,.1,.21,8,0,o*.2,0,12106946,{noAO:!0})}),ca=(s=3038890)=>Nt("drum",.7,.7,{c:s},(t,e,n,i,r)=>{t.cyl(.35,.35,.9,14,0,0,0,r.c);for(let o of[.2,.45,.7])t.cyl(.365,.365,.04,14,0,o,0,1850994,{noAO:!0});t.cyl(.36,.36,.03,14,0,.9,0,1710618,{noAO:!0}),t.cyl(.05,.05,.04,8,.15,.92,.1,z.steel,{noAO:!0})}),Oi=()=>Nt("cart",.7,.5,{},(s,t,e,n)=>{s.box(.7,.8,.46,0,.1,0,z.red);for(let i=0;i<4;i++)s.box(.62,.15,.02,0,.16+i*.18,.235,10955295,{noAO:!0}),s.box(.2,.02,.03,0,.25+i*.18,.25,z.steel,{noAO:!0});s.box(.74,.04,.5,0,.9,0,z.steel);for(let[i,r]of[[-1,-1],[1,-1],[-1,1],[1,1]])s.cyl(.05,.05,.06,8,i*.3,0,r*.18,z.black,{noAO:!0})});var ef=(s=3)=>Nt("pillar",.8,.8,{h:s},(t,e,n,i,r)=>{t.cyl(.46,.5,.2,16,0,0,0,14209214,{noAO:!0}),t.cyl(.34,.38,r.h-.4,16,0,.2,0,16117990);for(let o=0;o<8;o++){let a=o*Math.PI/4;t.box(.04,r.h-.5,.04,Math.cos(a)*.36,.25,Math.sin(a)*.36,15130572,{noAO:!0})}t.cyl(.5,.36,.2,16,0,r.h-.2,0,14209214,{noAO:!0})}),nf=(s=2.4,t=3.6,e=2.8,n={})=>Nt("stairs",s,t,{h:e,...n},(i,r,o,a,c)=>{let l=Math.max(6,Math.round(a/.3));for(let u=0;u<l;u++){let h=c.h*(u+1)/l;i.box(o-.1,h,a/l,0,0,-a/2+(u+.5)*a/l,u%2?15327951:14472383),i.box(o-.1,.03,a/l+.04,0,h,-a/2+(u+.5)*a/l,5978650,{noAO:!0})}for(let u of[-1,1]){for(let h=0;h<l;h+=2)i.box(.03,.8,.03,u*(o/2-.08),c.h*(h+1)/l,-a/2+(h+.5)*a/l,c.brass??z.brass,{noAO:!0});i.box(.06,.05,Math.hypot(a,c.h),u*(o/2-.08),c.h/2+.78,0,5978650,{rx:-Math.atan2(c.h,a),noAO:!0})}}),sf=(s={})=>Nt("wlight",.3,.2,s,(t,e)=>{t.box(.08,.2,.06,0,0,0,z.brass,{noAO:!0}),e.cyl(.06,.09,.14,8,0,.12,.08,16769952,{jit:0})}),rf=()=>Nt("chand",1.2,1.2,{},(s,t)=>{s.cyl(.015,.015,.5,6,0,.55,0,z.brass,{noAO:!0}),s.cyl(.2,.05,.2,10,0,.35,0,z.brass,{noAO:!0});for(let e=0;e<6;e++){let n=e*Math.PI/3;s.box(.4,.03,.03,Math.cos(n)*.2+0,.35,Math.sin(n)*.2,z.brass,{ry:-n,noAO:!0}),t.cyl(.04,.06,.12,6,Math.cos(n)*.42,.38,Math.sin(n)*.42,16773296,{jit:0}),s.cyl(.015,.015,.16,5,Math.cos(n)*.42,.22,Math.sin(n)*.42,z.brass,{noAO:!0})}}),qo;function Zn(){if(qo)return qo;let s=(o,a,c)=>{let l=document.createElement("canvas");l.width=l.height=128,o(l.getContext("2d"));let u=new $n(l);return u.wrapS=u.wrapT=Bn,u.repeat.set(a,c),u.magFilter=Le,u.colorSpace=Ie,u},t=7,e=()=>(t=t*16807%2147483647)/2147483647;return qo={stucco:(o,a)=>s(c=>{c.fillStyle="#f7f7f7",c.fillRect(0,0,128,128);for(let l=0;l<500;l++){let u=228+e()*27;c.fillStyle=`rgb(${u},${u},${u})`,c.fillRect(e()*128,e()*128,1+e()*2,1+e()*2)}for(let l=0;l<40;l++)c.fillStyle="rgba(120,100,70,.14)",c.fillRect(e()*128,e()*128,2,2)},o,a),tile:(o,a)=>s(c=>{c.fillStyle="#e9e9e9",c.fillRect(0,0,128,128);for(let[l,u,h]of[[0,0,0],[64,0,1],[0,64,1],[64,64,0]])c.fillStyle=h?"#e2e2e2":"#f6f6f6",c.fillRect(l,u,64,64);c.fillStyle="rgba(0,0,0,.2)",c.fillRect(0,0,128,2),c.fillRect(0,62,128,2),c.fillRect(0,0,2,128),c.fillRect(62,0,2,128);for(let l=0;l<160;l++)c.fillStyle="rgba(0,0,0,.05)",c.fillRect(e()*128,e()*128,2,2)},o,a),planks:(o,a)=>s(c=>{for(let l=0;l<4;l++){let u=205+e()*40;c.fillStyle=`rgb(${u},${u},${u})`,c.fillRect(0,l*32,128,32),c.fillStyle="rgba(0,0,0,.3)",c.fillRect(0,l*32,128,2),c.fillRect(l*47%100+10,l*32,2,32);for(let h=0;h<6;h++)c.fillStyle="rgba(0,0,0,.06)",c.fillRect(e()*128,l*32+e()*30,14+e()*30,1)}},o,a)},qo}var of=(s=2.4,t=2.4,e={})=>Nt("partition",s,.2,{h:t,...e},(n,i,r,o,a)=>{let c=a.c??z.wood;n.box(r,.1,.18,0,0,0,z.dark),n.box(r,.12,.18,0,a.h-.12,0,z.dark);for(let u of[-1,1])n.box(.1,a.h,.14,u*(r/2-.05),0,0,c);let l=Math.round(r/.12);for(let u=0;u<l;u++)n.box(.06,a.h-.25,.04,-r/2+.15+u*(r-.3)/(l-1),.1,0,u%2?c:10119738,{noAO:!0});n.box(r-.2,.5,.05,0,a.h*.45,.02,a.cloth??15167313,{noAO:!0});for(let u=0;u<6;u++)n.box(.03,.5,.06,-r/2+.3+u*(r-.6)/5,a.h*.45,.03,12603439,{noAO:!0})}),af=(s=2.8,t=2.8,e={})=>Nt("bath",s,t,e,(n,i,r,o,a)=>{n.box(r-.1,.05,o-.1,0,0,0,12113116,{noAO:!0});for(let u=1;u<4;u++)n.box(r-.1,.006,.02,0,.052,-o/2+u*o/4,10468549,{noAO:!0}),n.box(.02,.006,o-.1,-r/2+u*r/4,.052,0,10468549,{noAO:!0});n.box(.1,2.3,o-.1,-r/2+.05,.05,0,14673898),n.box(.12,.9,.12,-r/2+.05,2.35,0,7031339,{noAO:!0}),n.box(.1,.2,o-.1,-r/2+.05,.05,0,9418948,{noAO:!0}),n.box(r*.55,1,.1,-r/2+r*.275,.05,o/2-.05,14673898),n.box(r*.55,.06,.12,-r/2+r*.275,1.05,o/2-.05,9418948,{noAO:!0}),n.box(.5,.28,.16,r/2-.45,.65,-o/2+.2,16777215),n.box(.12,.05,.05,r/2-.45,.93,-o/2+.1,z.steel,{noAO:!0}),n.cyl(.2,.15,.4,12,r/2-.45,.05,-o/2+.55,16777215,{sz:1.3,noAO:!0}),n.cyl(.21,.21,.05,12,r/2-.45,.43,-o/2+.55,15790320,{sz:1.3,noAO:!0}),n.cyl(.07,.1,.62,8,0,.05,-o/2+.3,16777215,{noAO:!0}),n.box(.55,.12,.42,0,.67,-o/2+.3,16777215),n.cyl(.02,.02,.16,6,0,.79,-o/2+.14,z.steel,{noAO:!0}),i.box(.5,.7,.02,0,1.15,-o/2+.08,13625847,{jit:0}),n.box(.56,.76,.04,0,1.12,-o/2+.06,z.brass,{noAO:!0}),n.box(.9,.1,.9,-r/2+.7,.05,-o/2+.6,16777215),n.cyl(.015,.015,2,6,-r/2+.25,.05,-o/2+.2,z.steel,{noAO:!0}),Jo(n,.012,.5,-r/2+.45,2,-o/2+.2,"x",z.steel),n.cyl(.07,.07,.03,8,-r/2+.5,1.96,-o/2+.2,z.steel,{noAO:!0});for(let u=0;u<7;u++)n.box(.13,1.7,.03,-r/2+.35+u*.13,.25,-o/2+1.1,u%2?9358054:11590896,{noAO:!0});n.cyl(.14,.14,.3,10,r/2-.25,.05,o/2-.5,z.red,{noAO:!0}),n.cyl(.12,.12,.02,10,r/2-.25,.35,o/2-.5,4892927,{noAO:!0})}),la=(s=3.4,t={})=>Nt("food",s,1,t,(e,n,i,r,o)=>{e.box(i,.95,r-.1,0,0,-.05,o.c??11883578);for(let a=0;a<4;a++)e.box(i/4-.1,.55,.02,-i*.375+a*i/4,.18,r/2-.06,9060136,{noAO:!0});e.box(i+.1,.07,r,0,.95,0,15909198);for(let a=0;a<4;a++){let c=-i*.36+a*i*.24;e.cyl(.22,.2,.2,12,c,1.02,-.15,z.steel),e.cyl(.23,.23,.04,12,c,1.22,-.15,14343650,{noAO:!0}),e.cyl(.03,.03,.05,6,c,1.26,-.15,z.black,{noAO:!0}),e.cyl(.015,.015,.3,5,c+.16,1.1,-.1,z.steel,{rz:.4,noAO:!0}),n.cyl(.06,.11,.1,8,c,1.28,-.15,16777215,{jit:0,ws:6})}for(let a=0;a<6;a++)e.cyl(.14,.12,.02,10,i*.28+a%2*.04,1.02+a*.025,.25,a%2?16777215:14739696,{noAO:!0});e.box(.5,.35,.04,-i/2+.4,1.62,-.35,1911589),n.box(.42,.28,.01,-i/2+.4,1.655,-.325,16774084,{jit:0}),e.cyl(.015,.015,.6,5,-i/2+.4,1.02,-.35,z.steel,{noAO:!0})}),ha=(s=.95,t={})=>{let e=new Gt;return e.add(Nt("gtable",s*2,s*2,t,(n,i,r,o,a)=>{n.cyl(s,s,.08,22,0,.78,0,a.c??3046730,{noAO:!0}),n.cyl(s+.05,s+.05,.06,22,0,.72,0,z.dark,{noAO:!0}),n.cyl(.1,.15,.7,8,0,.02,0,z.dark,{noAO:!0}),n.cyl(.4,.45,.04,12,0,0,0,z.dark,{noAO:!0})})),e};var Ye=(s,t={})=>new te({color:s,...t}),mi=s=>new re({color:s});function gi(s){return{box:(i,r,o,a,c=0,l=r/2,u=0,h)=>{let d=new ot(new Xt(i,r,o),h||Ye(a));return d.position.set(c,l,u),s.add(d),d},cyl:(i,r,o,a=0,c=r/2,l=0,u=14,h,d)=>{let f=new ot(new Fe(d??i,i,r,u),h||Ye(o));return f.position.set(a,c,l),s.add(f),f},sph:(i,r,o,a,c,l)=>{let u=new ot(new hi(i,12,9),l||Ye(r));return u.position.set(o,a,c),s.add(u),u}}}var cf=(s,t=1,e=1)=>{let n=document.createElement("canvas");n.width=n.height=128,s(n.getContext("2d"));let i=new $n(n);return i.wrapS=i.wrapT=Bn,i.repeat.set(t,e),i.magFilter=Le,i};function cv(s,t,e){let n=s?.a||"#cdbb98",i=s?.b||n,r=s?.style||"plain";return r==="checker"||r==="dance"?Ye(16777215,{map:cf(o=>{o.fillStyle=n,o.fillRect(0,0,128,128),o.fillStyle=i,o.fillRect(0,0,64,64),o.fillRect(64,64,64,64)},t/1.6,e/1.6)}):r==="planks"?Ye(16777215,{map:cf(o=>{for(let a=0;a<4;a++)o.fillStyle=a%2?n:i,o.fillRect(0,a*32,128,32),o.fillStyle="rgba(0,0,0,.28)",o.fillRect(0,a*32,128,2),o.fillRect(a*53%100+10,a*32,2,32)},t/2.4,e/1.2)}):Ye(16777215,{color:n,map:Zn().tile(t/1.6,e/1.6)})}var lv=(s,t,e)=>{let n={warm:[2760984,1,16773328],dim:[1053983,.55,11189230],neon:[1313314,.55,16761087],work:[2106666,.95,16774880],bright:[2306106,1.15,16777215],club:[460045,.32,12029183],sunset:[1970696,.6,16757611]}[t]||[1911589,1,16777215];s.background=new St(n[0]),e.hemi.intensity=n[1],e.sun.color.set(n[2]),e.sun.intensity=t==="club"?.15:t==="neon"?.4:t==="dim"?.35:t==="sunset"?.5:1};function hv(s,t,e,n,i,r,o){let a=i.big?2:1.3,c=i.big?.45:1.15,l=new Gt,u=sa(n,a,{trim:o.getHex(),day:i.blind?1713203:12576511});u.position.y=c,l.add(u),t==="back"?l.position.set(e,0,-r.d/2+.12):(l.rotation.y=Math.PI/2,l.position.set(-r.w/2+.12,0,e)),s.add(l)}function df(s,t,e,n,i,r){let o=e||{},a=new St(o.trim||n||"#555"),c=new ot(new Xt(t.w,.2,t.d),cv(o.floor,t.w,t.d));c.position.y=-.1,s.add(c);let l=Ye(o.wall||"#f1e7cf",{map:Zn().stucco(t.w/2.4,1.4)}),u=3.4,h=new ot(new Xt(t.w,u,.2),l);h.position.set(0,u/2,-t.d/2);let d=new ot(new Xt(.2,u,t.d),l);d.position.set(-t.w/2,u/2,0),s.add(h,d);let f=gi(s);f.box(t.w,.5,.24,a,0,3.1,-t.d/2+.02),f.box(.24,.5,t.d,a,-t.w/2+.02,3.1,0),f.box(t.w,.35,.22,a,0,.17,-t.d/2+.02),f.box(.22,.35,t.d,a,-t.w/2+.02,.17,0),f.box(t.w+.2,.3,.2,5592405,0,.15,t.d/2+.1);for(let y of o.windows||[])hv(s,y.wall,y.at,y.w,y,t,a);let g=new ot(new Xt(2.2,.04,.4),new re({color:16761358}));if(g.position.set(0,.06,t.d/2+.1),s.add(g),o.floor?.style==="dance"){let y=[],x=[8072383,3835647,16711790,448160,16760331];for(let m=0;m<5;m++)for(let v=0;v<4;v++){let M=new ot(new Xt(.96,.05,.96),new re({color:x[(m+v)%5]}));M.position.set(-2+m,.03,-.7+v),s.add(M),y.push(M)}i.push(m=>y.forEach((v,M)=>v.material.color.setHex(x[(Math.floor(m*2)+M+Math.floor(M/5))%5])))}if(o.mood&&lv(s,o.mood,r),o.mood!=="club"){let y=new xs(16769712,.55,22);y.position.set(0,3,0),s.add(y)}}var ff={lanterns(s,t,e,n,i){for(let o=0;o<7;o++){let a=-n.w/2+.6+o*(n.w-1.2)/6,c=t.sph(.16,0,a,2.75+Math.sin(o*1.3)*.08,0,mi(e.c[o%e.c.length]))}t.box(n.w-.6,.02,.02,3355443,0,2.95,0)},menu(s,t,e){let n=Be(e.text,"#fff3c4");n.scale.set(3.4,.85,1),n.position.set(0,2.2,.05),s.add(n)},pennants(s,t,e,n){for(let r=0;r<9;r++){let o=-n.w/2+.7+r*(n.w-1.4)/8,a=new ot(new wn(.17,.4,3),mi(e.c[r%e.c.length]));a.position.set(o,2.65,0),a.rotation.z=Math.PI,s.add(a)}t.box(n.w-1,.02,.02,3355443,0,2.86,0)},neon(s,t,e,n,i){t.box(4.2,.9,.08,1118481,0,2.2,0);let r=Be(e.text,e.c||"#ff4fd8");r.scale.set(4.2,1,1),r.position.set(0,2.2,.1),s.add(r);let o=t.box(4.4,.06,.06,0,0,1.7,.05,mi(e.c||"#ff4fd8"));i.push(a=>{o.material.color.set(e.c||"#ff4fd8").multiplyScalar(.6+.4*Math.sin(a*5))})},lamp(s,t,e){t.cyl(.02,1.2,819,0,3);let n=new ot(new wn(.55,.4,14,1,!0),new re({color:e.c,side:Me}));n.position.y=2.25,s.add(n);let i=new ot(new Fe(.5,.9,1.4,14,1,!0),new re({color:e.c,transparent:!0,opacity:.1,side:Me}));i.position.y=1.4,s.add(i)},lift(s,t){for(let e of[-1.5,1.5])t.box(.22,2.6,.3,14711552,e,1.3,0);t.box(3.4,.2,.35,14711552,0,2.55),t.box(2.6,.12,1.6,4475472,0,.65,.7),t.box(.2,.6,.2,9080725,0,.3,.7)},hazard(s,t,e){let n=Math.round((e.w||6)/.6);for(let i=0;i<n;i++)t.box(.3,.025,e.d||.8,i%2?16766474:2236962,-(e.w||6)/2+.3+i*.6,.015,0)},turntable(s,t,e,n,i){let r=t.cyl(1.55,.14,14540253,0,.07,0,28);t.cyl(1.6,.04,12071466,0,.16,0,28,null,1.6).scale.set(1,1,1),i.push(o=>{r.rotation.y=o*.15})},spot(s,t,e){let n=new ot(new wn(1,2.6,16,1,!0),new re({color:e.c,transparent:!0,opacity:.1,side:Me}));n.position.y=1.6,n.rotation.x=Math.PI,s.add(n)},stage(s,t,e){t.box(e.w,.35,e.d,2827584,0,.175),t.box(e.w,.04,.06,16732120,0,.37,e.d/2)},rig(s,t,e,n,i){t.box(n.w-1.5,.08,.08,819,0,3.15,-n.d/2+2);let r=e.warm?[16758531,16483584,16765286,15167313]:[16711790,3835647,448160,16760331,8599788,16471559],o=r.map((a,c)=>{let l=new ot(new wn(.5,3,12,1,!0),new re({color:a,transparent:!0,opacity:.16,side:Me})),u=new Gt;return u.position.set(-(n.w-2.5)/2+c*(n.w-2.5)/(r.length-1),3.1,-n.d/2+2),l.position.y=-1.5,l.rotation.x=Math.PI,u.add(l),s.add(u),u});i.push(a=>o.forEach((c,l)=>{c.rotation.z=Math.sin(a*1.3+l)*.5,c.rotation.x=Math.cos(a*.9+l*1.7)*.45}))},discoball(s,t,e,n,i){let r=new ot(new ms(.5,1),new te({color:14540253,flatShading:!0,emissive:4473958}));r.position.y=2.6,s.add(r),t.cyl(.015,.6,2184,0,3.2),i.push(o=>{r.rotation.y=o*1.2})},rope(s,t,e){let n=e.w||2.4;for(let i of[-1,1])t.cyl(.05,1,13938487,i*n/2,.5,0,8),t.sph(.09,13938487,i*n/2,1.02,0);t.box(n,.07,.07,10289672,0,.85,0)},ledstrip(s,t,e,n,i){let r=t.box(n.w,.06,.06,0,0,.8,-n.d/2+.16,mi(e.c)),o=t.box(.06,.06,n.d,0,-n.w/2+.16,.8,0,mi(e.c));i.push(a=>{let c=new St(e.c).offsetHSL(Math.sin(a*.4)*.12,0,0);r.material.color.copy(c),o.material.color.copy(c)}),s.position.set(0,0,0)},poleSign(s,t,e,n,i){let r=t.cyl(.18,1.7,16777215,0,1.2,0,14),o=new Gt;o.position.y=1.2;for(let a=0;a<6;a++){let c=new ot(new Fe(.19,.19,.16,14),Ye(a%2?14034984:1920728));c.position.y=-.8+a*.28,o.add(c)}s.add(o),t.cyl(.24,.12,2184,0,2.1),i.push(a=>{o.rotation.y=a*2})}},fh=(s,t)=>s??t,lt=(s,t,e=0,n=0,i=0,r=0)=>(t.position.set(e,n,i),t.rotation.y=r,s.add(t),t);Object.assign(ff,{shelf(s,t,e){lt(s,ih(2.2,.42,1.9,{c:fh(e.c,9067051),stuff:e.bottles?"bottles":e.pots?"pots":void 0}))},fridge(s){lt(s,ar(.9,.8,2))},stool(s,t,e){lt(s,jo({c:fh(e.c,15087942)}))},table(s,t,e){lt(s,eh(.62,{cloth:fh(e.c,16777215),vase:!0}))},fan(s,t,e,n,i){let r=ch();lt(s,r,0,3,0),i.push(o=>{r.userData.spin.rotation.y=o*5})},plant(s,t,e){lt(s,Ts({h:e.h||1.1,kind:e.kind}))},bench(s,t,e){lt(s,Vd(e.w||2.4))},speaker(s,t,e){lt(s,Kd(e.tall?2.3:1.3))},rug(s,t,e){lt(s,As(e.w||3,e.d||2,e.c?{a:new St(e.c).getHex()}:{}))},toolwall(s){lt(s,oa(2.4,1.6),0,.8,0)},tyres(s){lt(s,aa(3))},drum(s,t,e){lt(s,ca(e.c?new St(e.c).getHex():3038890))},bench2(s){lt(s,Rs(2.4),0,0,0,Math.PI/2),lt(s,Oi(),0,0,1.6,Math.PI/2)},desk(s,t,e){lt(s,Wd(1.8,.75,{})),lt(s,Ko({c:2792847}),0,0,-.8,Math.PI)},bar(s,t,e){let n=e.len||4;lt(s,ra(n),0,0,0),lt(s,lh(n),-.7,0,0)},barstool(s){lt(s,hh())},sofa(s,t,e){s.rotation.y=(e.rot||0)*-Math.PI/2,lt(s,Ss(2.2,.95,{c:e.c?new St(e.c).getHex():10289672,cushion:16765286}))},mirror(s,t,e){lt(s,Jd(1.6,1.4,{bulbs:!0,frame:3815999}),0,.8,0),lt(s,rh(1.9,.5,{c:15328992,top:16053492}),0,0,.45);for(let n=0;n<3;n++)lt(s,ta({c:[15046811,2792847,15906565][n]}),-.6+n*.6,.93,.4)},dryer(s){lt(s,tf())},flag(s,t,e){lt(s,na(e.w||1,.6),0,e.y??1.9,0)},clock(s,t,e){lt(s,ia(.22),0,e.y??2.3,0)},art(s,t,e){lt(s,ea(e.w||.9,e.h||.65,e.kind||"bars"),0,e.y??1.6,0)},ac(s,t,e){lt(s,oh(),0,e.y??2.55,0)},window(s,t,e){lt(s,sa(e.w||1.2,1.3,{trim:16777215}),0,1.1,0)},curtain(s,t,e){lt(s,ah(e.w||1.4,2.2,{c:e.c?new St(e.c).getHex():15167313}),0,.6,0)},foodCounter(s,t,e){lt(s,la(e.w||3.4))},gameTable(s,t,e){lt(s,ha(.95,{c:e.c?new St(e.c).getHex():3046730}))},chair(s,t,e){lt(s,Ko({c:e.c?new St(e.c).getHex():12597547}),0,0,0,e.ry||0)},coffeeTable(s){lt(s,nh())},floorLamp(s){lt(s,Zd())},tv(s,t,e){lt(s,Es(e.w||1.8))},waterDispenser(s){lt(s,qd())},toolCart(s){lt(s,Oi())},workbench(s){lt(s,Rs(2.4))},generator(s){lt(s,Qo())},crowd(s,t,e,n,i){let r=e.n||4,o=.64,a=new Gt;a.scale.setScalar(o),s.add(a);let c=new Ms(a,r,e.seed||3);c.parts&&Object.values(c.parts).forEach(u=>{u.frustumCulled=!1});let l=u=>{let h=u/r*Math.PI*2+(e.seed||0),d=(e.r||1)*(.55+.45*(u*37%10)/10);return[Math.cos(h)*d/o,Math.sin(h)*d/o,h]};i.push(u=>{for(let h=0;h<r;h++){let[d,f,g]=l(h);e.dance?c.pose(h,d,.04+Math.abs(Math.sin(u*5+h))*.07,f,g+Math.PI+Math.sin(u*1.3+h)*.6,u*5.5+h*1.7,.45):c.pose(h,d,0,f,(e.yaw??0)+Math.sin(u*.4+h)*.3+(h%2?.6:-.6),0,0)}c.commit()})}});function pf(s,t,e,n){for(let i of t||[]){let r=ff[i.k];if(!r)continue;let o=new Gt,a=gi(o);o.position.set(i.x||0,0,i.z||0),o.rotation.y=i.ry||0,(i.k==="lanterns"||i.k==="pennants")&&(o.position.x=0),r(o,a,i,e,n),s.add(o)}}function mf(s,t,e){let n=gi(t),i=new St(s.color||"#888");if(s.type==="dance"){let r=new ot(new dn(.4,.55,28),new re({color:16777215,side:Me,transparent:!0,opacity:.7}));return r.rotation.x=-Math.PI/2,r.position.y=.07,t.add(r),e.push(o=>{r.scale.setScalar(1+.25*Math.sin(o*4))}),!0}if(s.type==="dj"){lt(t,jd(3.2));let r=[-.9,.9].map(a=>{let c=n.cyl(.34,.04,273,a,1.12,.05,20);return n.cyl(.1,.05,16732120,a,1.15,.05,10),n.box(.05,.03,.25,16777215,a+.14,1.16,.05),c}),o=n.box(3,.1,.03,0,0,.55,.52,mi(16711790));return e.push(a=>{r.forEach(c=>{c.rotation.y=a*3}),o.material.color.setHSL(a*.2%1,1,.55)}),!0}if(s.type==="bar"){lt(t,ra(3.8,{top:i.getHex(),glow:16732120}));for(let r=0;r<4;r++)n.cyl(.07,.2,13625847,.1,1.13,-1.3+r*.85,8);return!0}if(s.type==="songs"){t.rotation.y=-Math.PI/2,n.box(2.6,2,.12,1053466,0,1.7),n.box(2.8,.1,.16,3355456,0,2.72),n.box(2.4,.3,.14,8072383,0,2.5,.02),n.box(2.4,.04,.18,13938487,0,.72);let o=[16711790,3835647,448160,16760331,8599788].map((a,c)=>n.box(2,.12,.15,a,0,2.05-c*.28,.02,mi(a)));for(let a of[-1.2,1.2])n.cyl(.04,.7,3355443,a,.35,0,8);return e.push(a=>o.forEach((c,l)=>{c.scale.x=.55+.45*Math.abs(Math.sin(a*1.5+l))})),!0}return s.type==="vip"?(lt(t,nh(1.3,.7,{c:1710618}),0,0,0),lt(t,Ss(2,.9,{c:6947855,cushion:13938487}),0,0,-.95),lt(t,Ss(1.4,.8,{c:6947855,cushion:13938487}),1.35,0,.1,-Math.PI/2),n.cyl(.05,.28,13625847,.1,.57,.1,8),n.sph(.12,16765286,-.3,.55,0,mi(16765286)),n.cyl(.1,.02,13938487,.3,.44,-.1,12),!0):s.type==="style"?(lt(t,uh({c:i.getHex()}),0,0,0,Math.PI),lt(t,Oi(),.9,0,-.5,Math.PI/2),!0):s.type==="basin"?(lt(t,Qd()),lt(t,uh({c:3355448}),0,0,.95),!0):!1}var b_=new re({color:10475775,transparent:!0,opacity:.8});function gf(s,t,e,n){let i=t.w*e,r=t.d*e,o=gi(s),a=7031339;for(let d of t.windows||[]){if(d.wall==="right")continue;let f=d.w*e,g=new Gt,y=sa(f,1.3,{trim:16777215});y.position.y=1.25,g.add(y),d.wall==="back"?g.position.set(d.at*e,0,.05):d.wall==="left"?(g.rotation.y=Math.PI/2,g.position.set(.05,0,d.at*e)):(g.rotation.y=-Math.PI/2,g.position.set(i,0,d.at*e));let x=ah(f+.7,2.3,{open:!0,c:[15167313,2792847,15320170,8072383][Math.abs(Math.round(d.at*7))%4],c2:[12603439,2062958,13214778,5971855][Math.abs(Math.round(d.at*7))%4]});x.position.set(0,.05,.1),g.add(x),s.add(g)}o.box(.14,.45,r,12432546,i,.22,r/2,Ye(12432546,{transparent:!0,opacity:.55}));let c=t.door.x*e,l=t.door.w*e;o.box(c,.45,.14,12432546,c/2,.22,r,Ye(12432546,{transparent:!0,opacity:.55})),o.box(i-c-l,.45,.14,12432546,c+l+(i-c-l)/2,.22,r,Ye(12432546,{transparent:!0,opacity:.55})),o.box(.14,2.4,.14,a,c,1.2,r),o.box(.14,2.4,.14,a,c+l,1.2,r),o.box(l+.14,.14,.16,a,c+l/2,2.4,r);let u=new Gt;u.position.set(c,0,r);let h=new ot(new Xt(l*.92,2.3,.07),Ye(9067051));if(h.position.set(l*.46,1.15,0),u.add(h),u.rotation.y=1,s.add(u),t.corridor){let d=t.corridor.depth*e;o.box(i+.6,.12,d,9276810,i/2,-.06,r+d/2),o.box(i+.6,.5,.14,1911,i/2,.25,r+d);for(let g=0;g<t.corridor.doors;g++){let y=(g+.5)*i/t.corridor.doors;o.box(.9,.04,.6,[12653087,2792847,15320170,4553629][g%4],y,.02,r+d-.5)}let f=Be("Shared corridor","#d9d9d9");f.scale.set(3.6,.9,1),f.position.set(i/2,1.2,r+d*.55),s.add(f)}if(t.veranda){let d=1.6*e/1.4;o.box(l+2.6,.14,d,13219740,c+l/2,-.05,r+d/2);for(let f of[-1,1])o.cyl(.1,2.5,16117990,c+l/2+f*(l/2+1.1),1.25,r+d-.2,8);o.box(l+2.8,.1,.2,9268815,c+l/2,2.55,r+d-.2)}for(let d of t.fixtures||[]){let f=new Gt,g=gi(f),y=d.w*e,x=d.d*e;(uv[d.kind]||(()=>{}))(f,g,y,x,d,n,{W:i,Dm:r,CELL:e}),f.position.set(d.x*e,0,d.z*e),s.add(f)}fv(s,t,e,n)}var lf=(s,t,e,n)=>{let i=s.x*n.CELL+t/2,r=s.z*n.CELL+e/2;return t>=e?r>n.Dm/2+.01?Math.PI:0:Math.PI/2},hf=(s,t,e)=>s.x*e.CELL+t/2<e.W/2?.4:t-.4,uv={bed(s,t,e,n,i){lt(s,$d(e-.1,n-.1,{king:!!i.king,blanket:i.king?8072383:34641,cushion:13938487}),e/2,0,n/2),i.king?(lt(s,ta({c:13938487}),.1,.5,.3),t.box(.45,.5,.4,4861724,-.1,0,.35)):(t.box(.45,.5,.4,4861724,e+.15,0,.3),lt(s,ta({c:15906565}),e+.15,.5,.3))},wardrobe(s,t,e,n,i,r,o){let a=Math.max(e,n)-.1,c=lf(i,e,n,o),l=e>=n;lt(s,Xd(a,.65,2.3),l?e/2:hf(i,e,o),0,l?c?n-.4:.4:n/2,c)},curtain(){},bucket(s,t,e,n){t.cyl(.3,.45,2792847,e/2,.22,n/2,12,null,.24),t.cyl(.26,.02,9358054,e/2,.44,n/2,12),t.cyl(.3,.45,15167313,e/2+.5,.22,n/2-.3,12,null,.24),t.cyl(.02,.3,14540253,e/2+.5,.6,n/2-.3,6)},ensuite(s,t,e,n){lt(s,af(e,n),e/2,0,n/2)},kitchenette(s,t,e,n,i,r,o){let a=Math.max(e,n)-.1,c=lf(i,e,n,o),l=new Gt,u=Math.min(1.6,a-1.5);lt(l,rh(Math.max(.9,u),.62,{c:14209732}),-a/2+Math.max(.9,u)/2,0,0),lt(l,Yd(.7,.62),-a/2+Math.max(.9,u)+.4,0,0),lt(l,ar(.75,.7,1.85),a/2-.4,0,.02);let h=Math.abs(Math.sin(c))<.5,d=h?e/2:hf(i,e,o),f=h?c?n-.4:.4:n/2;lt(s,l,d,0,f,c)},partition(s,t,e,n){lt(s,of(e-.1,2.4),e/2,0,n/2)},stairs(s,t,e,n,i){lt(s,nf(e-.1,n-.1,i.grand?3:2.8,{brass:i.grand?13938487:7031339}),e/2,0,n/2,Math.PI)},landing(s,t,e,n){t.box(e-.1,.1,n-.1,13482904,e/2,.05,n/2),t.box(e-.1,.04,.1,5978650,e/2,.12,n-.1);for(let i=0;i<8;i++)t.cyl(.025,.9,13938487,.1+i*(e-.3)/7,.55,n-.1,6);t.box(e-.1,.06,.08,5978650,e/2,1,n-.1),lt(s,Ts({h:1,kind:"snake"}),e-.4,.1,.4)},pillar(s,t,e,n){lt(s,ef(3),e/2,0,n/2)},bar(s,t,e,n,i){lt(s,lh(n-.2),.3,0,n/2),lt(s,ra(n-.2,{top:13938487}),e-.5,0,n/2);for(let r=0;r<3;r++)lt(s,hh(),e+.2,0,n*.2+r*n*.3)},chandelier(s,t,e,n){lt(s,rf(),e/2,2.35,n/2)}},uf={faceyou:["flag","clock","art"],selfcon:["art","clock","ac"],flat2:["art","flag","ac","art","clock"],bungalow:["art","flag","clock","art","ac","art"],duplex:["art","flag","clock","art","ac","art"],mansion:["art","flag","clock","art","art","clock"]},dv={flag:1.1,clock:.5,art:1,ac:1.1};function fv(s,t,e,n){let i=t.w*e,r=t.d*e,o=gi(s),a=ch();a.position.set(i/2,3.1,r/2),s.add(a),n.push(d=>{a.userData.spin.rotation.y=d*5});{let d=(t.reserved||[]).length,f=As(Math.min(3.2,i*.4),Math.min(2.4,r*.3),{a:[12597547,2060154,8072383][i%3]});f.position.set(i*.5,-.012,r*.52),s.add(f);let g=As(1.3,.7,{a:7031339,b:9067051,c:14263361});g.position.set((t.door.x+t.door.w/2)*e,-.008,r-.5),s.add(g)}let c=new xs(16769712,.5,i*2.2);c.position.set(i/2,2.7,r/2),s.add(c);let l={back:[],left:[]};for(let d of t.windows||[])l[d.wall]&&l[d.wall].push([d.at*e-d.w*e/2-.45,d.at*e+d.w*e/2+.45]);for(let d of t.fixtures||[])if(!(["bed","bucket","landing","chandelier","curtain"].includes(d.kind)&&d.kind!=="curtain")){if(d.kind==="curtain"){l.back.push([d.x*e,(d.x+d.w)*e]);continue}d.z===0&&l.back.push([d.x*e-.1,(d.x+d.w)*e+.1]),d.x===0&&l.left.push([d.z*e-.1,(d.z+d.d)*e+.1])}let u=uf[t.type]||uf.faceyou,h=0;if(u.forEach((d,f)=>{let g=f%2?"left":"back",y=g==="back"?i:r,x=dv[d],m=l[g];for(let v=.7+x/2;v<y-x/2-.3;v+=.12){let M=v-x/2-.1,_=v+x/2+.1;if(m.some(([I,E])=>M<E&&_>I))continue;m.push([M,_]);let k=d==="flag"?na(1,.6):d==="clock"?ia(.22):d==="ac"?oh():ea(.9,.62,["bars","sun"][h++%2]),A=d==="flag"?1.95:d==="clock"?2.55:d==="ac"?2.45:1.75,C=new Gt;k.position.y=A,C.add(k),g==="back"?C.position.set(v,0,.06):(C.rotation.y=Math.PI/2,C.position.set(.06,0,v)),s.add(C);break}}),t.type==="mansion"||t.type==="duplex")for(let d of[i*.22,i*.78]){let f=sf();f.position.set(d,1.9,.06),s.add(f)}}function xf(s,t){let e={w:11.4,d:7.2},n=gi(s),i=new ot(new Xt(e.w,.2,e.d),Ye(9277331,{map:Zn().tile(e.w/2.2,e.d/2.2)}));i.position.y=-.1,s.add(i);let r=Ye(14472904,{map:Zn().stucco(4,1.4)}),o=new ot(new Xt(e.w,3.6,.2),r);o.position.set(0,1.8,-e.d/2);let a=new ot(new Xt(.2,3.6,e.d),r);a.position.set(-e.w/2,1.8,0),s.add(o,a),n.box(e.w,.4,.22,14711552,0,3.4,-e.d/2+.02),n.box(.22,.4,e.d,14711552,-e.w/2+.02,3.4,0);let c=gi(s);for(let h=0;h<9;h++)c.box(4.2,.2,.08,h%2?12172482:11185845,-2.4,.15+h*.26,-e.d/2+.14);let l=-e.d/2;lt(s,Rs(2.8),3.4,0,l+.55),lt(s,oa(2.6,1.5),3.4,1.15,l+.1),lt(s,Oi(),5,0,l+.6),lt(s,ih(1.5,.45,2,{c:7040885,stuff:"pots"}),.9,0,l+.35),lt(s,oa(1.8,1.4),-5.55,1.2,-.6,Math.PI/2),lt(s,aa(4),-5.1,0,2.2),lt(s,ca(14034984),-5.15,0,-2.2),lt(s,ca(3038890),-5.15,0,-1.4),n.cyl(.28,.9,2792847,-5.1,.45,.8,14),n.cyl(.04,.3,2236962,-5.1,1.05,.8,6),lt(s,ea(1.1,.7,"sun"),-2,1.9,l+.12),lt(s,na(1,.6),1.5,2.2,l+.12),lt(s,ia(.24),0,2.9,l+.12);for(let h=0;h<3;h++){let d=new ot(new Xt(2,.06,.12),new re({color:16775126}));d.position.set(-3.5+h*3.5,3.3,-.6),s.add(d)}for(let h=0;h<3;h++){let d=-3.5+h*3.5;for(let g of[-1.55,1.55])n.box(.08,.02,4.8,16777215,d+g,.015,.6);n.box(3.1,.02,.08,16777215,d,.015,3);let f=Be(`SLOT ${h+1}`,"#ffe08a");f.scale.set(2.6,.65,1),f.position.set(d,.1,3),f.material.depthTest=!0,s.add(f)}for(let h=0;h<3;h++){let d=new ot(new wn(.3,.35,12,1,!0),new re({color:16773560,side:Me}));d.position.set(-3.5+h*3.5,3.2,.5),s.add(d);let f=new ot(new Fe(.2,1.5,3,14,1,!0),new re({color:16773560,transparent:!0,opacity:.06,side:Me}));f.position.set(-3.5+h*3.5,1.7,.5),s.add(f)}lt(s,aa(3),5,0,2.6),lt(s,Ts({h:1.1}),5.2,0,1.3);let u=new xs(16773328,.5,20);return u.position.set(0,3,0),s.add(u),e}var Qt=1.4,yf={tv:2238513,sofa:11883578,fridge:15265522,rug:14263361,plant:3120730,table:10251068,gen:12597547,bed:4878245},cr=(s,t)=>t%2?{w:s.d,d:s.w}:{w:s.w,d:s.d},vf=(s,t)=>s.x<t.x+t.w&&t.x<s.x+s.w&&s.z<t.z+t.d&&t.z<s.z+s.d,ua=class{constructor(t){this.g=t,this.el=et("#interior"),this.open=!1}async show(t,e){let n=this.g,i=await zt(`/api/property/${t}/interior`).catch(r=>(n.ui.error(r),null));return i?(this.data=i,this.propertyId=t,this.visitor=!!i.visitor,this.catalog=Object.fromEntries((i.catalog||n.cfg.furniture||[]).map(r=>[r.id,r])),this.placed=i.placed.map(r=>({...r})),this.buy=!1,this.sel=null,this.rot=0,this.open=!0,n.busy=!0,n.ctrl.frozen=!0,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),!0):!1}build(){let t=this.data,e=t.room.w,n=t.room.d;this.canvas=p("canvas"),this.el.append(this.canvas),this.r=new bn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new Mn,this.scene.background=new St(1911589),this.cam=new Se(42,1,.1,200),this.yaw=Math.PI/4,this.pitch=.78,this.dist=Math.max(e,n)*Qt*1.7,this.center=new P(e*Qt/2,0,n*Qt/2),this.scene.add(new Sn(16777215,8943462,1));let i=new En(16773328,1.1);i.position.set(6,12,4),this.scene.add(i);let r=new ot(new Xt(e*Qt,.2,n*Qt),this.floorMat=new te({color:t.floor?.hex||"#b98a56",map:(/wood|plank|parquet/i.test(t.floor?.id||"")?Zn().planks:Zn().tile)(e*Qt/1.6,n*Qt/1.6)}));r.position.set(e*Qt/2,-.1,n*Qt/2),this.scene.add(r);let o=new wo(Math.max(e,n)*Qt,Math.max(e,n),9206357,11049072);o.scale.set(e/Math.max(e,n),1,n/Math.max(e,n)),o.position.set(e*Qt/2,.01,n*Qt/2),this.grid=o,o.visible=!1,this.scene.add(o);let a=this.wallMat=new te({color:t.wall?.hex||"#f1e7cf",map:Zn().stucco(e*Qt/2.4,1.4)}),c=new ot(new Xt(e*Qt,3.4,.2),a);c.position.set(e*Qt/2,1.7,-.1);let l=new ot(new Xt(.2,3.4,n*Qt),a);l.position.set(-.1,1.7,n*Qt/2),this.scene.add(c,l);let u=new ot(new Xt(e*Qt,.5,.22),new te({color:34641}));u.position.set(e*Qt/2,.25,-.1),this.scene.add(u),this.anim=[],this.t0=performance.now(),gf(this.scene,t.room,Qt,this.anim);for(let f of t.room.reserved.filter(g=>g.what==="doorway")){let g=new ot(new Xt(f.w*Qt-.1,f.what==="bed"?.7:.02,f.d*Qt-.1),new te({color:f.what==="bed"?yf.bed:14866879,transparent:f.what!=="bed",opacity:f.what==="bed"?1:.6}));if(g.position.set((f.x+f.w/2)*Qt,f.what==="bed"?.35:.02,(f.z+f.d/2)*Qt),this.scene.add(g),f.what==="bed"){let y=new ot(new Xt(f.w*Qt-.4,.2,.5),new te({color:16777215}));y.position.set((f.x+f.w/2)*Qt,.8,(f.z+.4)*Qt),this.scene.add(y)}}let h=t.room.reserved.find(f=>f.what==="doorway"),d=new ot(new Xt(h.w*Qt,.04,.12),new re({color:16761358}));d.position.set((h.x+h.w/2)*Qt,.05,n*Qt),this.scene.add(d),this.items=new Gt,this.scene.add(this.items),this.ghost=new ot(new Xt(1,1,1),new re({color:3523691,transparent:!0,opacity:.55})),this.ghost.visible=!1,this.scene.add(this.ghost),this.rebuildItems(),this.bindInput(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}meshFor(t,e){let n=this.catalog[t],i=n.w*Qt-.15,r=n.d*Qt-.15,o=new Gt,a;t==="tv"?a=Es(Math.min(i,1.9)):t==="sofa"?a=Ss(i,Math.min(r,1),{c:2060154,cushion:15906565}):t==="fridge"?a=ar(Math.min(i,.85),Math.min(r,.8),1.95):t==="rug"?a=As(i,r):t==="plant"?a=Ts({h:1.15}):t==="table"?a=Gd(i,r):t==="gen"?a=Qo(Math.min(i,1),Math.min(r,.85)):(a=new ot(new Xt(i,1,r),new te({color:yf[t]||10066329})),a.position.y=1/2);let c=new Gt;return c.add(a),c.rotation.y=e*Math.PI/2,o.add(c),o}rebuildItems(){this.items.clear(),this.meshes={};for(let t of this.placed)this.sel&&this.sel.id===t.id&&this.sel.fromPlaced||this.addItem(t)}addItem(t){let e=cr(this.catalog[t.id],t.rot),n=this.meshFor(t.id,t.rot);n.position.set((t.x+e.w/2)*Qt,0,(t.z+e.d/2)*Qt),n.userData={id:t.id},this.items.add(n),this.meshes[t.id]=n}canPlace(t,e,n,i){let r=this.data,o=this.catalog[t],a=cr(o,i),c={x:e,z:n,w:a.w,d:a.d};if(e<0||n<0||e+a.w>r.room.w||n+a.d>r.room.d)return!1;for(let l of r.room.reserved)if(vf(c,l))return!1;for(let l of this.placed){if(l.id===t)continue;let u=this.catalog[l.id];if(u.layer==="floor"==(o.layer==="floor")){let h=cr(u,l.rot);if(vf(c,{x:l.x,z:l.z,w:h.w,d:h.d}))return!1}}return!0}chrome(){let t=this.data,e=this.g.ui;this.guestsEl=p("div",{class:"iguests"}),this.feed=p("div",{class:"ifeed"}),this.lastEvent=0;let n=p("div",{class:"ihead"},p("div",{},p("h3",{},this.visitor?`@${t.owner}'s ${t.name}`:t.name),p("div",{style:"font-size:13px"},`${t.tierLabel} \xB7 ${t.area} \xB7 \u2764\uFE0F `,p("span",{id:"loveCount"},t.loves||0)),this.guestsEl),p("div",{class:"row"},this.visitor?"":p("button",{class:"btn small",id:"paintBtn",onclick:()=>this.paintPanel()},"\u{1F3A8} Paint"),this.visitor?"":p("button",{class:"btn small alt",id:"buyToggle",onclick:()=>this.toggleBuy()},"\u{1F6CB} Buy mode"),p("button",{class:"btn small red",id:"interiorLeave",onclick:()=>this.leave()},"Leave")));this.tool=p("div",{class:"itool hidden"});let i=p("div",{class:"iacts"},...(this.visitor?[["love","\u{1F60D} Love your house"],["greet","\u{1F44B} Greet"],["hype","\u{1F525} Hype"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]:[["greet","\u{1F44B} Greet"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]).map(([a,c])=>p("button",{class:"btn small ghost","data-act":a,onclick:()=>this.act(a)},c))),r=p("input",{class:"sheet-input",id:"roomSay",maxlength:120,placeholder:"Say something nice\u2026",onkeydown:a=>{a.key==="Enter"&&this.say(r),a.stopPropagation()}}),o=p("div",{class:"ibar"},this.feed,i,p("div",{class:"row"},r,p("button",{class:"btn small",onclick:()=>this.say(r)},"Send")));this.paint=p("div",{class:"ipaint hidden"}),this.el.append(n,this.tool,this.paint,o),this.startPoll()}startPoll(){clearInterval(this.pt);let t=async()=>{if(!this.open)return;let e=await zt(`/api/room?propertyId=${this.propertyId}&since=${this.lastEvent}`).catch(n=>n);if(e instanceof Error){e.status===403&&this.visitor&&(this.g.ui.toast("The host asked you to step out. No wahala."),this.leave());return}this.room=e,this.drawRoom(e)};t(),this.pt=setInterval(t,2500)}drawRoom(t){if(et("#loveCount")&&(et("#loveCount").textContent=t.loves),this.guestsEl.replaceChildren(p("small",{},t.isOwner?t.guests.length?"Guests: ":"No guests right now":`Host ${t.ownerHome?"\u{1F7E2} home":"\u26AA out"} \xB7 guests: `),...t.guests.map(i=>p("span",{class:"gchip"},"@"+i,t.isOwner?p("button",{title:"Ask to leave",onclick:()=>this.kick(i)},"\u2715"):p("button",{title:"Mute or report",onclick:()=>this.g.ui.playerMenu(i)},"\u22EF")))),!t.isOwner){let i=this.el.querySelector("[data-act=love]");i&&(i.disabled=t.lovedToday)}let e=this.el.querySelector("[data-act=sofa]"),n=this.el.querySelector("[data-act=tv]");e&&(e.disabled=!t.can.sofa),n&&(n.disabled=!t.can.tv),(t.wall.hex!==this.data.wall?.hex||t.floor.hex!==this.data.floor?.hex)&&(this.data.wall=t.wall,this.data.floor=t.floor,this.wallMat.color.set(t.wall.hex),this.floorMat.color.set(t.floor.hex));for(let i of t.events){if(i.id<=this.lastEvent)continue;this.lastEvent=i.id;let r=p("div",{class:`ev ${i.kind}`,onclick:()=>i.kind==="say"&&i.u!==this.g.user.username&&this.g.ui.playerMenu(i.u)},i.kind==="say"?`${i.u}: ${i.t}`:i.t);for(this.feed.append(r);this.feed.children.length>6;)this.feed.firstChild.remove()}}async act(t){let e=this.g.ui;t==="love"?await e.guard(()=>ct("/api/visit/love",{propertyId:this.propertyId}))&&(e.toast("You showed some love \u{1F60D}"),this.g.refreshMe()):await e.guard(()=>ct("/api/visit/act",{propertyId:this.propertyId,action:t}))&&this.g.refreshMe(),this.startPoll()}async say(t){let e=t.value.trim();if(!e)return;await this.g.ui.guard(()=>ct("/api/room/say",{propertyId:this.propertyId,text:e}))&&(t.value="",this.startPoll())}async kick(t){await this.g.ui.guard(()=>ct("/api/visit/kick",{propertyId:this.propertyId,username:t}))&&(this.g.ui.toast(`@${t} was asked to leave.`),this.startPoll())}paintPanel(){let t=this.data.palette;if(!t)return;let e=this.paint;if(!e.classList.contains("hidden"))return e.classList.add("hidden");let n=this.data.wall?.id,i=this.data.floor?.id,r=()=>{let o=(a,c,l)=>p("div",{class:"swatches"},a.map(u=>p("button",{class:`sw ${u.id===c?"on":""}`,title:u.name,"data-colour":u.id,style:`background:${u.hex}`,onclick:()=>{l(u.id),r()}})));e.replaceChildren(p("div",{class:"row sp"},p("b",{},"\u{1F3A8} Paint and floor"),p("button",{class:"btn small ghost",onclick:()=>e.classList.add("hidden")},"\u2715")),p("small",{},"Walls"),o(t.walls,n,a=>{n=a,this.preview(n,i)}),p("small",{},"Floor"),o(t.floors,i,a=>{i=a,this.preview(n,i)}),p("button",{class:"btn alt",id:"paintApply",onclick:async()=>{let a=await this.g.ui.guard(()=>ct("/api/property/decor",{propertyId:this.propertyId,wall:n,floor:i,idemKey:crypto.randomUUID?.()}));a&&(this.data.wall=a.wall,this.data.floor=a.floor,this.preview(a.wall.id,a.floor.id),this.g.ui.toast(a.charged?`Fresh look! \u2212${xt(a.charged)}`:"Already looks like that.","money"),this.g.refreshMe(),e.classList.add("hidden"))}},`Apply \xB7 ${xt(t.price)}`))};r(),e.classList.remove("hidden")}preview(t,e){let n=this.data.palette,i=n.walls.find(o=>o.id===t),r=n.floors.find(o=>o.id===e);i&&this.wallMat.color.set(i.hex),r&&this.floorMat.color.set(r.hex)}toggleBuy(t=!this.buy){this.buy=t,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),et("#buyToggle").textContent=t?"\u2705 Done":"\u{1F6CB} Buy mode",this.tool.classList.toggle("hidden",!t),this.grid&&(this.grid.visible=t),t&&this.drawTool()}drawTool(){let t=this.sel,e=Object.values(this.catalog),n=new Set(this.placed.map(r=>r.id)),i=[];if(t){let r=this.catalog[t.id];i.push(p("div",{class:"row sp"},p("b",{},`${r.name} (${r.w}\xD7${r.d})`),p("span",{class:"mut"},"Tap the floor to place \xB7 R to rotate")),p("div",{class:"row"},p("button",{class:"btn small",onclick:()=>{this.rot=(this.rot+1)%4,this.drawTool()}},"\u27F3 Rotate"),t.fromPlaced?p("button",{class:"btn small red",onclick:()=>this.sell(t.id)},`Sell +${xt(Math.floor(r.price*(this.data.sellFraction||.5)))}`):p("span",{class:"tag amber"},`Costs ${xt(r.price)}`),p("button",{class:"btn small ghost",onclick:()=>{this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool()}},"Cancel")))}i.push(p("div",{class:"cat"},e.map(r=>p("button",{class:`${t?.id===r.id?"on":""} ${n.has(r.id)?"own":""}`,onclick:()=>{let o=this.placed.find(a=>a.id===r.id);this.sel={id:r.id,fromPlaced:!!o},this.rot=o?o.rot:0,this.rebuildItems(),this.drawTool()}},`${r.name}`,p("div",{class:"mut"},n.has(r.id)?"placed \xB7 tap to move":`${xt(r.price)} \xB7 ${r.w}\xD7${r.d}`))))),this.tool.replaceChildren(...i)}async place(t,e){let n=this.sel;if(!n)return;if(!this.canPlace(n.id,t,e,this.rot)){this.g.ui.toast(Ge("blocked"),"bad");return}let i=await this.g.ui.guard(()=>ct("/api/property/furniture",{itemId:n.id,x:t,z:e,rot:this.rot,idem:crypto.randomUUID?.()||String(Math.random())}));i&&(this.g.update(i.user),this.placed=i.interior.placed,this.data={...this.data,...i.interior,visitor:!1},this.g.ui.sfx("thunk"),this.g.ui.haptic(20),i.charged&&this.g.ui.toast(Ge("bought",i.charged),"money"),this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool())}async sell(t){let e=await this.g.ui.guard(()=>ct("/api/property/furniture/sell",{itemId:t}));e&&(this.g.update(e.user),this.placed=e.interior.placed,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.g.ui.toast(Ge("sold",e.refund),"money"),this.drawTool())}cellAt(t){let e=this.canvas.getBoundingClientRect(),n=new ht((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new ui;i.setFromCamera(n,this.cam);let r=-i.ray.origin.y/i.ray.direction.y;if(!(r>0))return null;let o=i.ray.origin.clone().addScaledVector(i.ray.direction,r);return{x:o.x/Qt,z:o.z/Qt}}updateGhost(t){if(!this.sel)return;let e=this.cellAt(t);if(!e)return;let n=cr(this.catalog[this.sel.id],this.rot),i=Math.round(e.x-n.w/2),r=Math.round(e.z-n.d/2);this.hover={x:i,z:r};let o=this.canPlace(this.sel.id,i,r,this.rot);this.ghost.visible=!0,this.ghost.scale.set(n.w*Qt-.1,.9,n.d*Qt-.1),this.ghost.position.set((i+n.w/2)*Qt,.45,(r+n.d/2)*Qt),this.ghost.material.color.setHex(o?3523691:14696751)}bindInput(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,y:n.clientY,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x,r=n.clientY-t.y;t.x=n.clientX,t.y=n.clientY,t.moved+=Math.abs(i)+Math.abs(r),(!this.sel||t.moved>14)&&(this.yaw=Math.max(Math.PI/4-.8,Math.min(Math.PI/4+.8,this.yaw-i*.006)),this.pitch=Math.max(.5,Math.min(1.2,this.pitch+r*.004)))}this.buy&&this.updateGhost(n)}),e.addEventListener("pointerup",n=>{if(t&&t.moved<8&&this.buy)if(this.sel)this.updateGhost(n),this.hover&&this.place(this.hover.x,this.hover.z);else{let i=this.cellAt(n);if(i){let r=this.placed.find(o=>{let a=cr(this.catalog[o.id],o.rot);return i.x>=o.x&&i.x<o.x+a.w&&i.z>=o.z&&i.z<o.z+a.d});r&&(this.sel={id:r.id,fromPlaced:!0},this.rot=r.rot,this.rebuildItems(),this.drawTool())}}t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(6,Math.min(40,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{if(!this.open)return;let i=n.key.toLowerCase();i==="r"&&this.sel?(this.rot=(this.rot+1)%4,this.drawTool()):(i==="delete"||i==="backspace")&&this.sel?.fromPlaced?this.sell(this.sel.id):i==="escape"?this.leave():i==="b"&&!this.visitor&&this.toggleBuy()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){if(!this.open)return;let t=this.center;this.cam.position.set(t.x+Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,t.z+Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(t.x,.4,t.z);{let e=(performance.now()-this.t0)/1e3;for(let n of this.anim||[])n(e)}this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}async leave(){this.open&&(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,await ct("/api/property/leave").catch(()=>{}),this.g.net.nudge(),et("#game").focus())}};var lr={circle:["\u25CF","#d6402f"],triangle:["\u25B2","#2e7dd1"],cross:["\u271A","#2e9b5e"],square:["\u25A0","#8a5ad1"],star:["\u2605","#e0a020"],whot:["W","#222"]},pv=s=>{let t=7;for(let e of String(s))t=t*31+e.charCodeAt(0)>>>0;return t},_f={dance:"\u{1F483}",dj:"\u{1F3A7}",bar:"\u{1F964}",songs:"\u{1F3B5}",vip:"\u{1F451}",style:"\u2702\uFE0F",basin:"\u{1F6BF}",eat:"\u{1F372}",game:"\u{1F3B2}",board:"\u{1F3C6}",poster:"\u{1F4DC}",tv:"\u{1F4FA}",car:"\u{1F697}",check:"\u{1F50D}",service:"\u{1F527}"},mv={whot:"Whot",ludo:"Ludo",dominoes:"Dominoes",draughts:"Draughts",ayo:"Ayo"},da=class{constructor(t){this.g=t,this.el=et("#venue"),this.open=!1,this.shotId=null}async show(t){let e=this.g,n=await e.ui.guard(()=>ct("/api/venue/enter",{venueId:t,pos:e.pos()}));return n?(this.data=n,this.id=t,this.open=!0,e.busy=!0,e.ctrl.frozen=!0,this.matchId=null,this.match=null,this.dismissed=this.dismissed||new Set,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),this.poll(),!0):!1}build(){let t=this.data,e=t.room;this.canvas=p("canvas"),this.el.append(this.canvas),this.r=new bn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new Mn,this.scene.background=new St(1911589),this.cam=new Se(42,1,.1,100),this.yaw=Math.PI/5,this.pitch=.82,this.dist=15,this.hemi=new Sn(16777215,8943462,1);let n=this.sun=new En(16773328,1);n.position.set(5,10,6),this.scene.add(this.hemi,n),this.anim=[],this.t0=performance.now(),this.lights={hemi:this.hemi,sun:this.sun},df(this.scene,e,t.room,t.sign,this.anim,this.lights);let i=new Gt;this.scene.add(i),pf(i,t.room?.decor,e,this.anim),this.stations=new Gt,this.scene.add(this.stations),this.people=new Gt,this.scene.add(this.people),this.meshes={};for(let r of t.stations)this.addStation(r);this.bind(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}addStation(t){let e=new Gt,n=new St(t.color||"#888"),i=a=>new te({color:a}),r=(a,c,l,u,h)=>{let d=new ot(new Xt(a,c,l),i(u));return d.position.y=h??c/2,e.add(d),d};if(!mf(t,e,this.anim)){if(t.type==="eat")e.add(la(3.4,{c:n.getHex()}));else if(t.type==="game"){if(e.add(ha(.95,{c:n.getHex()})),t.game==="ludo")r(1.5,.1,1.5,16446950,.91),[14041135,3054430,14721056,3046865].forEach((a,c)=>{let l=r(.6,.05,.6,a,.97);l.position.x=(c%2?1:-1)*.45,l.position.z=(c<2?-1:1)*.45});else for(let a=0;a<4;a++){let c=r(.34,.03,.5,[14041135,3046865,14721056,3054430][a],.88);c.position.x=-.5+a*.33,c.rotation.y=.2*a-.3}for(let a of[-1.25,1.25]){let c=jo({c:9060136});c.position.set(a,0,0),e.add(c)}}else if(t.type==="board")r(2.4,1.5,.12,n,1.6).position.z=-.1,r(2.2,1.3,.14,998183,1.6).position.z=-.08;else if(t.type==="poster")r(.1,1.4,1.2,n,1.6);else if(t.type==="tv"){let a=Es(3);e.add(a);let c=sh(2.7,{wall:!0});c.position.set(0,1,-.3),e.add(c)}else if(t.type==="check"){let a=pi(t.color||"#3a7ca5");a.scale.setScalar(.34),a.position.y=.55,e.add(a),r(2,.5,1.1,5593696,.25),r(.2,.4,.2,14721056,.7).position.x=1.15}else if(t.type==="service"){e.add(Rs(2));let a=Oi();a.position.set(1.4,0,.1),e.add(a);for(let c=0;c<3;c++)r(.25,.25,.25,[14041135,3046865,14721056][c],1.1).position.x=-.6+c*.6}else if(t.type==="car"){let a=pi(t.color||"#888");a.scale.setScalar(.38),a.rotation.y=Math.PI/6,e.add(a),r(1.8,.06,1,14540253,.03)}}let o=Be(`${_f[t.type]||""} ${t.label}`.slice(0,26),"#fff3c4");o.scale.set(2.8,.7,1),o.position.y=t.type==="dj"?2.3:t.type==="songs"?3.3:t.type==="dance"?1.2:t.type==="style"?2.5:t.type==="car"?1.8:t.type==="tv"?3:t.type==="board"?2.8:2.1,e.add(o),e.position.set(t.x,0,t.z),t.type==="poster"&&(e.rotation.y=0),e.traverse(a=>{a.userData.stationId=t.id}),this.stations.add(e),this.meshes[t.id]=e}people_refresh(){this.people.clear();let t=this.data,e=new Set,n=(i,r,o,a)=>{if(e.has(i))return;e.add(i);let c=or(r||"#2e9b5e");c.scale.setScalar(.55),c.position.set(o,0,a);let l=Be("@"+i,"#ffffff");l.scale.set(1.6,.4,1),l.position.y=2.2,c.add(l),this.people.add(c)};for(let i of t.stations)i.type==="game"&&i.match&&i.match.players.forEach((o,a)=>n(o,null,i.x+[-1.25,1.25,-.5,.5][a],i.z+(a<2?.5:1.5)));for(let i of t.occupants){let r=pv(i.username);n(i.username,i.color,-3+r%7*1,t.room.d/2-1.1-(r>>4)%2*.8)}}chrome(){let t=this.data;this.strip=p("div",{class:"vstrip"}),this.panel=p("div",{class:"vpanel hidden"});let e=p("div",{class:"ihead"},p("div",{},p("h3",{},t.name),p("div",{style:"font-size:13px"},`${t.blurb} \xB7 open ${t.hours[0]}:00 to ${t.hours[1]}:00`),p("div",{class:"tag amber",style:"display:inline-block;margin-top:4px"},"\u{1F3B2} Game money only \xB7 18+")),p("div",{class:"row"},p("button",{class:"btn small red",id:"venueLeave",onclick:()=>this.leave()},"Leave")));this.el.append(e,this.strip,this.panel),this.drawStrip(),this.people_refresh()}drawStrip(){let t=this.data;this.strip.replaceChildren(...t.stations.map(e=>{let n=e.match,i=e.type==="game"?n?n.status==="waiting"?`waiting ${n.players.length}/${n.max}: @${n.host}${n.stake?" \xB7 \u20A6"+n.stake:""}`:n.players.join(" v "):"free table":e.type==="car"?xt(e.price||0)+" (est.)":"";return p("button",{class:`vst ${n?.you?"mine":""}`,"data-station":e.id,onclick:()=>this.pick(e.id)},`${_f[e.type]||"\u2022"} ${e.label}`,i?p("small",{},i):"")}))}price(t){return this.g.cfg.cars?.[t]?.price??this.catalog?.find(e=>e.id===t)?.price??0}async pick(t){await this.refreshVenue();let e=this.data.stations.find(n=>n.id===t);e&&this.station(e)}async station(t){let e=this.g.ui;if(t.type==="eat"){let n=p("div");e.openSheet(t.label,n),e.shopBlock(n,t.shopId)}else if(t.type==="poster")e.openSheet(t.label,[p("p",{},t.text),p("p",{class:"mut"},"Reports, mutes and blocks work here too: tap a name in the chat.")]);else if(t.type==="tv"){let n=await e.guard(()=>ct("/api/venue/act",{venueId:this.id,stationId:t.id}));n&&(e.toast(n.text),this.g.net.nudge())}else t.type==="board"?this.board():t.type==="car"?this.carSheet(t):t.type==="check"||t.type==="service"?this.mechanicSheet(t):t.type==="casual"?e.playCasual(t.game):["dance","dj","bar","songs","vip","basin"].includes(t.type)?this.leisureAct(t):t.type==="style"?this.salonSheet(t):t.type==="game"&&this.sitPanel(t)}async board(t="all"){let e=this.g.ui,n=await e.guard(()=>zt("/api/scoreboard"+(t==="all"?"":`?kind=${t}`)));if(!n)return;let i=Math.max(0,n.endsAt-this.g.serverNow()),r=p("div",{class:"chips"},["all","whot","ludo","dominoes","draughts","ayo"].map(o=>p("button",{class:`chip ${o===t?"on":""}`,onclick:()=>this.board(o)},o==="all"?"All games":mv[o])));e.openSheet("Weekly scoreboard",[r,n.rows.length?p("div",{class:"list"},n.rows.map(o=>p("div",{},p("span",{},`${o.rank}. @${o.username}`),p("span",{class:"mut"},`${o.wins}W ${o.draws}D ${o.losses}L \xB7 `),p("b",{},`${o.points} pts`)))):p("p",{class:"mut"},"Nobody has played this week yet. Be the first!"),p("p",{class:"mut"},`${n.scoring} Resets in ${Math.floor(i/864e5)}d ${Math.floor(i%864e5/36e5)}h.`)])}async leisureAct(t){let e=this.g.ui,n=await e.guard(()=>ct("/api/venue/act",{venueId:this.id,stationId:t.id,idem:`${t.id}${Date.now()}`}));if(n){if(t.type==="songs"){e.openSheet("Song slot board",[p("p",{},"\u{1F3B5} Tonight\u2019s lineup"),p("div",{class:"list",id:"songSlots"},n.slots.map(i=>p("div",{},p("span",{},`Slot ${i.slot}`),p("span",{class:"mut"},i.title)))),p("p",{class:"mut"},n.note)]);return}e.toast(n.text),n.mood!=null&&this.g.refreshMe?.(),this.g.net.nudge()}}async salonSheet(t){let e=this.g.ui,n=await e.guard(()=>zt(`/api/salon?venueId=${this.id}`));if(!n)return;let i=n.styles.map(r=>p("button",{class:"btn alt","data-style":r.id,onclick:async()=>{let o=await e.guard(()=>ct("/api/salon/style",{venueId:this.id,stationId:t.id,styleId:r.id,idem:`${r.id}${Date.now()}`}));o&&(e.toast(o.text),e.closeSheet(),this.g.net.nudge())}},`${r.name} \xB7 ${xt(r.fee)} \xB7 +${r.mood} mood`));e.openSheet(t.label,[p("p",{},n.current?`Your look: ${n.current.name}${n.current.fresh?" \u2728 fresh":""}`:"Pick a style. A fresh look gives a small mood boost."),p("div",{class:"col"},i),p("p",{class:"mut"},n.note)])}async mechanicSheet(t){let e=this.g.ui,n=await e.guard(()=>zt("/api/mechanic"));if(!n)return;let i=c=>p("div",{class:"cbar"},p("i",{style:`width:${c}%`})),r=n.cars.length?p("div",{class:"list"},n.cars.map(c=>p("div",{"data-car":c.id},p("span",{},`${c.active?"\u2705 ":""}${c.name}`,p("small",{class:"mut"},` \xB7 ${c.label}${c.perkUntil?" \xB7 perk on":""}`)),p("span",{style:"min-width:90px"},i(c.condition),p("small",{class:"mut"},` ${c.condition}%`))))):p("p",{class:"mut"},"Your garage is empty. Meco only works on cars you own.");if(t.type==="check"){e.openSheet("Check my car",[p("p",{},n.text),r,p("p",{class:"mut"},`Condition drops a little each day. Below ${n.roughBelow}% a car is rough and rides give less mood. Service fee: ${xt(n.fee)} (ESTIMATE).`)]);return}let o=n.active,a=!!o?.perkUntil;e.openSheet("Service",[p("div",{class:"tag amber"},"Placeholder fee \xB7 ESTIMATE"),o?p("p",{},`${o.name}: ${o.label} (${o.condition}%)`):p("p",{class:"mut"},"You need your own active car. Borrowed cars are not serviced here."),p("p",{class:"mut"},`Service resets condition and gives about ${n.perk.minutes} minutes of cheaper fuel (${n.perk.farePctOff}% off) and +${n.perk.extraMood} mood on rides.`),p("button",{class:"btn big alt",id:"mecoService",disabled:!o||a,onclick:async()=>{let c=await e.guard(()=>ct("/api/mechanic/service",{idemKey:crypto.randomUUID?.()}));c&&(e.closeSheet(),e.toast(c.text,"money"),this.g.refreshMe?.())}},a?"Already serviced":`Service \xB7 ${xt(n.fee)}`)])}async carSheet(t){let e=this.g.ui,n=await e.guard(()=>zt("/api/garage"));if(!n)return;this.catalog=n.catalogue;let i=n.catalogue.find(c=>c.id===t.model),r=n.active,o=n.cars.some(c=>c.model===t.model),a=(c,l)=>p("div",{class:"row sp"},p("span",{class:"mut"},c),p("b",{},l));e.openSheet(i.name,[p("div",{class:"tag amber"},"Placeholder model \xB7 price is an ESTIMATE"),a("Price",xt(i.price)),a("Fuel per 100 m","\u20A6"+(i.perM*100).toFixed(0)+` (borrowed: \u20A6${(n.borrowed.perM*100).toFixed(0)} + \u20A6${n.borrowed.base} tip)`),a("Speed",`${i.speed} (borrowed ${n.borrowed.speed})`),a("Mood on a nice ride",`+${i.mood}`),a("Resale",`about ${Math.round((1-n.resale.firstDriveOffFraction)*100)}% right after purchase, then about ${Math.round(n.resale.perDayDepreciation*100)}% less per day (never below ${Math.round(n.resale.floorFraction*100)}%)`),a("Your car now",r.label),p("button",{class:"btn big alt",disabled:n.cars.length>=n.slots,onclick:async()=>{await e.guard(()=>ct("/api/garage/buy",{model:i.id,idemKey:crypto.randomUUID?.()}))&&(e.closeSheet(),e.toast(`Congrats! ${i.name} is in your garage \u{1F697}`,"money"),this.g.refreshMe?.())}},o?"Buy another":`Buy \xB7 ${xt(i.price)}`),n.cars.length>=n.slots?p("p",{class:"mut"},"Garage full: sell a car in Phone \u2192 Garage."):""])}sitPanel(t){let e=this.data.stakes,n=0,i=t.match,r=this.g.cfg,o={ludo:"Ludo table (2 to 4 players)",dominoes:"Dominoes table (2 to 4 players)",draughts:"Draughts board (2 players)",ayo:"Ayo board (2 players)",whot:"Whot bench"}[t.game]||"Table",a=[p("div",{class:"row sp"},p("b",{},`${t.label}`),p("button",{class:"btn small ghost",onclick:()=>this.panel.classList.add("hidden")},"\u2715"))];if(i&&i.you){this.focusMatch(i.id);return}if(i&&i.status==="active")a.push(p("p",{class:"mut"},`Game in progress: ${i.players.map(c=>"@"+c).join(", ")}. Try another table.`));else if(i)a.push(p("p",{},`${i.players.map(c=>"@"+c).join(", ")} ${i.players.length>1?"are":"is"} waiting (${i.players.length}/${i.max}).`),p("p",{class:"mut"},i.stake?`Stake \u20A6${i.stake} each (game money). Winner takes the whole pot.`:"Friendly game: no stake."),p("button",{class:"btn big alt",onclick:()=>this.sit(t,0)},i.stake?`Join \xB7 stake ${xt(i.stake)}`:"Join the game"));else{let c=()=>l.replaceChildren(...e.map(h=>p("button",{class:`chip ${h===n?"on":""}`,onclick:()=>{n=h,c(),u.textContent=h?`Sit and wait \xB7 stake ${xt(h)}`:"Sit and wait \xB7 friendly"}},h?xt(h):"Friendly"))),l=p("div",{class:"chips"}),u=p("button",{class:"btn big alt",onclick:()=>this.sit(t,n)},"Sit and wait \xB7 friendly");c(),a.push(p("p",{class:"mut"},`${o}: sit down and wait for others to join (Ludo and Dominoes: host starts when 2 to 4 are seated). Pick a stake (game money, held safely until the game ends).`),l,u)}a.push(p("p",{class:"mut"},"\u{1F3B2} Game money only. No cash value, no cash-out.")),this.showPanel(a)}showPanel(t){this.panel.replaceChildren(...[].concat(t)),this.panel.classList.remove("hidden")}async sit(t,e){let n=await this.g.ui.guard(()=>ct("/api/game/sit",{venueId:this.id,stationId:t.id,stake:e}));n&&(this.focusMatch(n.id,n),this.g.net.nudge())}focusMatch(t,e){this.matchId=t,e?this.renderMatch(e):this.pollGame()}async pollGame(){if(!this.matchId)return;let t=await zt(`/api/game?id=${this.matchId}`).catch(()=>null);t&&this.renderMatch(t)}renderMatch(t){if(this.match=t,this.dismissed.has(t.id))return;this.matchId=t.id;let e=this.g.user?.username,n=[],i=p("div",{class:"row sp"},p("b",{},`${t.label} \xB7 ${t.players.map(r=>r.name).join(", ")}`),p("span",{class:"tag amber"},t.stake?`Stake ${xt(t.stake)} \xB7 pot ${xt(t.pot)}`:"Friendly"));if(n.push(i),t.status==="waiting")n.push(p("p",{},`Seated ${t.players.length}/${t.max} \xB7 waiting for players\u2026 \u23F3`),p("div",{class:"row"},t.players.map(r=>p("span",{class:"tag"},"@"+r.name))),p("p",{class:"mut"},"Your stake is held safely and comes back if nobody joins."),t.canStart?p("button",{class:"btn big alt",id:"ludoStart",onclick:()=>this.startMatch(t)},`\u25B6 Start now with ${t.players.length} players`):t.max>2&&t.isHost?p("p",{class:"mut"},"Need at least 2 players to start."):"",p("button",{class:"btn ghost",onclick:()=>this.leaveMatch(t)},"Leave the table"));else if(t.status==="active"){let r=t.board?.mine,o=Math.max(0,Math.ceil((t.deadlineAt-this.g.serverNow())/1e3));n.push(p("div",{class:"row sp"},p("span",{class:r?"tag green":"tag"},r?"\u{1F7E2} Your turn":`\u23F3 @${t.turn}'s turn`),p("span",{class:"mut",id:"gtimer"},`${o}s`))),n.push(({ludo:()=>this.ludoBoard(t),dominoes:()=>this.dominoBoard(t),draughts:()=>this.draughtsBoard(t),ayo:()=>this.ayoBoard(t)}[t.kind]||(()=>this.whotBoard(t)))()),n.push(p("div",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>this.g.ui.confirm?.call(this.g.ui,t.kind==="ludo"||t.kind==="dominoes"?"Leave this game? You are out and your stake stays in the pot.":"Resign this game? Your opponent wins the pot.",()=>this.leaveMatch(t))},"\u{1F3F3} Resign")))}else{let r=t.result||{};n.push(p("div",{class:`banner ${r.youWon?"win":r.draw?"draw":"lose"}`},r.cancelled?`Table closed. ${r.why||""}`:r.draw?"\u{1F91D} Draw":r.youWon?`\u{1F3C6} You won! ${t.stake?"+"+xt(t.pot):""}`:`You lost. ${r.why||""}`),p("button",{class:"btn alt",onclick:()=>{this.dismissed.add(t.id),this.matchId=null,this.panel.classList.add("hidden"),this.g.net.nudge(),this.refreshVenue()}},"Back to the room")),this.g.refreshMe?.()}n.push(p("p",{class:"mut"},"\u{1F3B2} Game money only.")),this.showPanel(n)}card(t,{onclick:e,disabled:n,mini:i}={}){let[r,o]=lr[t.s];return p("button",{class:`wcard ${i?"mini":""}`,"data-card":t.id,disabled:!!n,style:`--c:${o}`,onclick:e},p("span",{class:"n"},t.s==="whot"?"20":t.n),p("span",{class:"g"},r))}whotBoard(t){let e=t.board,n=p("div",{class:"whot"}),i=p("div",{class:"row"},p("div",{},p("small",{class:"mut"},"Top card"),this.card(e.top,{disabled:!0})),p("div",{},p("small",{class:"mut"},"Shape to match"),p("div",{class:"shape",style:`color:${lr[e.shape][1]}`},lr[e.shape][0])),p("div",{class:"mut"},`Opponent: ${e.oppCount} cards`,p("br"),`Market: ${e.market}`),e.last?p("div",{class:"mut"},this.lastText(t)):""),r=p("div",{class:"hand"},e.hand.map(a=>this.card(a,{disabled:!e.mine||!e.playable.includes(a.id),onclick:()=>a.s==="whot"?this.pickShape(t,a):this.move(t,{card:a.id})}))),o=p("button",{class:"btn small",id:"whotDraw",disabled:!e.mine,onclick:()=>this.move(t,{action:"draw"})},"\u{1F0CF} Draw one card");return n.append(i,r,o),this.shapeBox=p("div",{class:"chips"}),n.append(this.shapeBox),n}lastText(t){let e=t.board.last;if(!e)return"";let n=e.who===t.you?"You":"They";if(e.effect==="draw")return`${n} drew a card.`;let i={hold:"Hold on!",suspend:"Suspension!",pick2:"Pick two!",pick3:"Pick three!",market:"General market!",whot:"Whot!"}[e.effect];return`${n} played ${e.card.replace(/[a-z]+/,"")}${i?" \xB7 "+i:""}`}pickShape(t,e){this.shapeBox.replaceChildren(p("b",{},"Call a shape: "),...["circle","triangle","cross","square","star"].map(n=>p("button",{class:"chip",style:`color:${lr[n][1]}`,"data-shape":n,onclick:()=>this.move(t,{card:e.id,shape:n})},lr[n][0]+" "+n)))}ayoBoard(t){let e=t.board,n=t.youSeat,i=n===0?0:6,r=n===0?6:0,o=[0,1,2,3,4,5].map(h=>i+h),a=[5,4,3,2,1,0].map(h=>r+h),c=(h,d)=>{let f=h-i,g=d&&e.legal.includes(f);return p("button",{class:`pit ${d?"mine":""} ${g?"legal":""}`,"data-pit":h,disabled:!g,onclick:()=>this.move(t,{house:f})},p("b",{},e.pits[h]))},l=1-n,u=t.players.find(h=>h.seat===l)?.name;return p("div",{class:"ayo"},p("div",{class:"row sp"},p("span",{class:"mut"},`@${u} captured: ${e.store[l]}`),p("span",{class:"mut"},e.last?`Last: house ${e.last.house+1}${e.last.captured?` \xB7 captured ${e.last.captured}`:""}`:"")),p("div",{class:"pits"},a.map(h=>c(h,!1))),p("div",{class:"pits"},o.map(h=>c(h,!0))),p("div",{class:"row sp"},p("b",{},`You captured: ${e.store[n]} (first to 25 wins)`)))}dominoBoard(t){let e=t.board,n=["\xB7","\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"],i=m=>p("span",{class:"dh"},n[m]),r=(m,v,M={})=>p("button",{class:`dtile ${M.mini?"mini":""}`,"data-tile":M.id||"",disabled:!!M.disabled,onclick:M.onclick},i(m),p("i",{}),i(v)),o=p("div",{class:"row"},t.players.map(m=>p("span",{class:`tag ${m.seat===e.turn?"green":""}`},`${m.you?"You":"@"+m.name}: ${e.counts[m.seat]}${e.out[m.seat]?" (out)":""}`)),p("span",{class:"tag amber"},`Boneyard ${e.yard}`)),a=p("div",{class:"dchain"},e.chain.length?e.chain.map(m=>r(m[0],m[1],{mini:!0,disabled:!0})):p("span",{class:"mut"},"No tiles down yet. Play any tile to start.")),c=p("div",{class:"row"}),l=this.dpick&&e.playable.includes(this.dpick)?this.dpick:null;l||(this.dpick=null);let u=m=>{this.dpick=null,this.move(t,m)};if(l){let m=e.ends;c.replaceChildren(p("span",{class:"mut"},`Tile ${l}: which end?`),p("button",{class:"btn small alt",id:"domLeft",onclick:()=>u({tile:l,end:"left"})},`\u25C0 Left (${m[0]})`),p("button",{class:"btn small alt",id:"domRight",onclick:()=>u({tile:l,end:"right"})},`Right (${m[1]}) \u25B6`))}let h=m=>{let[v,M]=m.split("-").map(Number),_=e.ends;if(!_||_[0]===_[1]||!((v===_[0]||M===_[0])&&(v===_[1]||M===_[1])))return u({tile:m});this.dpick=m,this.renderMatch(t)},d=p("div",{class:"hand"},e.hand.map(m=>{let[v,M]=m.split("-").map(Number);return r(v,M,{id:m,disabled:!e.mine||!e.playable.includes(m),onclick:()=>h(m)})})),f=e.canDraw?p("button",{class:"btn alt",id:"domDraw",onclick:()=>this.move(t,{action:"draw"})},`Draw from the boneyard (${e.yard})`):"",g=e.last,y=g?t.players.find(m=>m.seat===g.who)?.name:null,x=g?g.pass?`@${y} had no play and passed.`:g.draw?`@${y} drew a tile.`:`@${y} played ${g.tile}.`:"";return p("div",{class:"domino"},o,a,p("p",{class:"mut"},x),c,d,f,e.mine&&!e.playable.length&&!e.canDraw?p("p",{class:"mut"},"No play: you pass."):"",e.tiles?p("p",{class:"mut"},"Final hands: "+t.players.map(m=>`@${m.name} ${e.tiles[m.seat].join(" ")||"(empty)"}`).join(" \xB7 ")):"")}draughtsBoard(t){let e=t.board,n=t.youSeat,i=n===1,r=this.dsel,o=e.legal||[],a=new Set(o.map(y=>y.from)),c=r?o.filter(y=>y.from===r).map(y=>y.to):[],l=[...Array(8).keys()];i&&l.reverse();let u=[...Array(8).keys()];i&&u.reverse();let h=p("div",{class:"dgrid"},l.flatMap(y=>u.map(x=>{let m=e.board[y*8+x],v=`${y},${x}`,M=(y+x)%2===1,_=m&&m<=2==(n===0),k=`dcell ${M?"dk":"lt"} ${r===v?"sel":""} ${c.includes(v)?"dest":""} ${e.mine&&a.has(v)?"can":""}`,A=m?p("span",{class:`dp ${m<=2?"p0":"p1"} ${_?"mine":""}`},m===2||m===4?"\u265B":""):"";return p("button",{class:k,"data-cell":v,disabled:!M||!e.mine,onclick:()=>{if(c.includes(v)){let C=o.filter(I=>I.from===r&&I.to===v);this.dsel=null,this.move(t,{from:r,to:v,path:C[0].path})}else a.has(v)?(this.dsel=v,this.renderMatch(t)):(this.dsel=null,this.renderMatch(t))}},A)}))),d=t.players.find(y=>y.seat===1-n)?.name,f=e.last,g=f?`${f.who===n?"You":"@"+d} moved ${f.captured?`and captured ${f.captured}`:""}${f.crowned?" \xB7 crowned \u{1F451}":""}`:"";return p("div",{class:"draughts"},p("div",{class:"row sp"},p("span",{class:"mut"},`You ${e.count[n]} \xB7 @${d} ${e.count[1-n]}`),e.mine&&e.mustJump?p("span",{class:"tag amber"},"You must capture!"):""),h,p("p",{class:"mut"},g))}ludoBoard(t){let e=t.board,n=["#d6402f","#2e9b5e","#e0a020","#2e7dd1"],i=["Red","Green","Yellow","Blue"],r=A=>e.corners[A],o=250,a=o/2,c=104,l=13,u=(A,C=c)=>{let I=A/52*2*Math.PI-Math.PI/2;return[a+C*Math.cos(I),a+C*Math.sin(I)]},h=p("div",{class:"ludo",style:`width:${o}px;height:${o}px`});for(let A=0;A<52;A++){let[C,I]=u(A),E=[0,13,26,39].indexOf(A);h.append(p("i",{class:`lc ${e.safe.includes(A)?"safe":""}`,style:`left:${C-6}px;top:${I-6}px;${E>=0?`background:${n[E]}`:""}`}))}for(let A=0;A<4;A++)for(let C=1;C<=5;C++){let[I,E]=u(A*13,c-C*15);h.append(p("i",{class:"lc hc",style:`left:${I-5}px;top:${E-5}px;background:${n[A]}55`}))}let d={},f=(A,C,I)=>{let E,w;if(I===-1){let B=u(r(A)*13,c+22);[E,w]=[B[0]+C%2*10-5,B[1]+Math.floor(C/2)*10-5]}else I<=50?[E,w]=u(e.cells[A][C]):I<56?[E,w]=u(r(A)*13,c-(I-50)*15):[E,w]=[a-12+r(A)*8,a-4];let D=`${Math.round(E)},${Math.round(w)}`,H=d[D]=(d[D]||0)+1;return[E+(H-1)*4-7,w-(H-1)*3-7]};e.tokens.forEach((A,C)=>A.forEach((I,E)=>{let[w,D]=f(C,E,I),H=C===t.youSeat;h.append(p("b",{class:`ltok ${H&&e.legal.includes(E)?"legal":""}`,"data-seat":C,"data-tok":E,style:`left:${w}px;top:${D}px;background:${n[r(C)]}`},H?String(E+1):""))}));let g=p("div",{class:"row",style:"flex-wrap:wrap"},t.players.map(A=>p("span",{class:"tag",style:`border-left:6px solid ${n[r(A.seat)]}`},`${i[r(A.seat)]} @${A.name}${A.out?" (left)":""}${A.you?" (you)":""}`))),y=p("div",{class:"die",id:"ludoDie"},e.die?["","\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"][e.die]:"\u{1F3B2}"),x=e.last,m=x?`${x.who===t.youSeat?"You":"@"+t.players.find(A=>A.seat===x.who)?.name} rolled ${x.die}${x.note?" \xB7 "+x.note:""}${x.captured?` \xB7 sent ${x.captured} token(s) home!`:""}${x.home?" \xB7 token home! \u{1F3E0}":""}`:"",v=p("button",{class:"btn big alt",id:"ludoRoll",disabled:!e.canRoll,onclick:()=>this.move(t,{action:"roll"})},"\u{1F3B2} Roll the die"),M=e.tokens[t.youSeat]||[],_=A=>A===-1?"in base":A===56?"HOME \u2714":A>50?`home column ${A-50}/5`:`step ${A}`,k=p("div",{class:"chips"},M.map((A,C)=>p("button",{class:`chip ${e.legal.includes(C)?"on":""}`,"data-token":C,disabled:!e.legal.includes(C),onclick:()=>this.move(t,{token:C})},`Token ${C+1}: ${_(A)}`)));return p("div",{class:"ludowrap"},g,p("div",{class:"row"},h,p("div",{},y,v)),p("p",{class:"mut"},m),e.mine&&e.die?p("p",{},`You rolled ${e.die}. Pick a token to move:`):"",k,p("p",{class:"mut"},"Roll a 6 to leave base. A 6 gives another roll. Land on a rival (off the safe \u2B50 cells) to send them home."))}async startMatch(t){let e=await this.g.ui.guard(()=>ct("/api/game/start",{matchId:t.id}));e?this.renderMatch(e):this.pollGame()}async move(t,e){let n=await this.g.ui.guard(()=>ct("/api/game/move",{matchId:t.id,...e}));n?(this.renderMatch(n),this.g.ui.sfx("ok")):this.pollGame()}async leaveMatch(t){let e=await this.g.ui.guard(()=>ct("/api/game/leave",{matchId:t.id}));this.g.ui.closeSheet(),e?this.renderMatch(e):this.pollGame(),this.refreshVenue()}async refreshVenue(){let t=await zt(`/api/venue?id=${this.id}`).catch(()=>null);t&&this.open&&(this.data=t,this.drawStrip(),this.people_refresh())}poll(){clearInterval(this.pt),this.pt=setInterval(async()=>{if(!this.open)return;if(await this.refreshVenue(),this.matchId)await this.pollGame();else{let e=this.data.stations.find(n=>n.match?.you);e&&!this.dismissed.has(e.match.id)&&this.focusMatch(e.match.id)}let t=et("#gtimer");t&&this.match?.status==="active"&&(t.textContent=`${Math.max(0,Math.ceil((this.match.deadlineAt-this.g.serverNow())/1e3))}s`)},1500)}tap(t){let e=this.canvas.getBoundingClientRect(),n=new ht((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new ui;i.setFromCamera(n,this.cam);let r=i.intersectObjects(this.stations.children,!0)[0];if(r){let o=r.object.userData.stationId;this.pick(o)}}bind(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x;t.x=n.clientX,t.moved+=Math.abs(i),this.yaw=Math.max(Math.PI/5-.7,Math.min(Math.PI/5+.7,this.yaw-i*.006))}}),e.addEventListener("pointerup",n=>{t&&t.moved<8&&this.tap(n),t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(9,Math.min(24,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{this.open&&n.key==="Escape"&&!this.g.ui.sheetOpen&&this.leave()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){if(!this.open)return;this.cam.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(0,.6,.3);let t=(performance.now()-this.t0)/1e3;for(let e of this.anim)e(t);this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}async leave(){!this.open||!await this.g.ui.guard(()=>ct("/api/venue/leave"))||(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,this.g.net.nudge(),et("#game").focus())}};var fa=class{constructor(t){this.g=t,this.open=!1}async show(){let t=this.g,e=await t.ui.guard(()=>zt("/api/garage"));if(!e)return!1;this.d=e,this.open=!0,t.ui.closeSheet?.(),this.el=p("div",{id:"garageView"}),document.body.append(this.el),this.canvas=p("canvas"),this.el.append(this.canvas),this.r=new bn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new Mn,this.scene.background=new St(2306106),this.cam=new Se(42,1,.1,100),this.yaw=Math.PI/6,this.pitch=.78,this.dist=15.5,this.anim=[],this.t0=performance.now(),this.scene.add(new Sn(16777215,8943462,1.05));let n=new En(16773328,.9);return n.position.set(4,10,6),this.scene.add(n),xf(this.scene,this.anim),this.cars=new Gt,this.scene.add(this.cars),this.fill(),this.chrome(),this.bind(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize),this.loop(),!0}fill(){this.cars.clear();let t=this.d;this.slotCars=[];for(let e=0;e<t.slots;e++){let n=t.cars[e],i=-3.5+e*3.5;if(!n){let a=Be("Empty slot","#9aa5b1");a.scale.set(2.6,.65,1),a.position.set(i,1,.4),this.cars.add(a);continue}let r=pi(n.color);r.scale.setScalar(.62),r.position.set(i,.05,.5),r.rotation.y=Math.PI/2+0,r.userData.carId=n.id,this.cars.add(r),this.slotCars.push(r);let o=Be(`${n.active?"\u2705 ":""}${n.name}`,n.active?"#b9f6ca":"#fff3c4");if(o.scale.set(3,.75,1),o.position.set(i,2,.5),this.cars.add(o),n.active){let a=new ot(new dn(1.6,1.85,40),new re({color:3523691,side:Me,transparent:!0,opacity:.85}));a.rotation.x=-Math.PI/2,a.position.set(i,.04,.5),this.cars.add(a),this.anim.push(c=>{a.material.opacity=.55+.3*Math.sin(c*3)})}}}chrome(){let t=this.d,e=this.info=p("div",{class:"gv-info"}),n=p("div",{class:"ihead"},p("div",{},p("h3",{},"My garage"),p("div",{style:"font-size:13px"},`${t.cars.length}/${t.slots} slots used \xB7 driving ${t.active.label}`)),p("button",{class:"btn small red",id:"garageClose",onclick:()=>this.close()},"Close")),i=p("div",{class:"gv-list"},t.cars.map(r=>p("button",{class:"btn small alt","data-car":r.id,onclick:()=>this.pick(r)},`${r.active?"\u2705 ":""}${r.name}`)),t.cars.length?"":p("span",{class:"mut"},"No cars yet. Visit the Naija Auto Mart."));this.el.append(n,i,e),t.cars[0]&&this.pick(t.cars.find(r=>r.active)||t.cars[0])}pick(t){let e=n=>p("div",{class:"cbar"},p("i",{style:`width:${n}%`}));this.info.replaceChildren(p("b",{},t.name),p("div",{class:"mut"},`Worth ${xt(t.value)} (paid ${xt(t.paid)}) \xB7 ${t.ageDays}d old \xB7 ${t.conditionLabel} ${t.condition}%`),e(t.condition),p("div",{class:"row"},t.active?p("span",{class:"tag"},"Driving this one"):p("button",{class:"btn small",id:"garageUse",onclick:async()=>{await this.g.ui.guard(()=>ct("/api/garage/use",{carId:t.id}))&&(this.d=await zt("/api/garage"),this.fill(),this.el.querySelectorAll(".ihead,.gv-list,.gv-info").forEach(i=>i.remove()),this.chrome())}},"Use this car"),p("span",{class:"mut"},"Prices and values are ESTIMATES.")))}bind(){let t=null,e=this.canvas;e.onpointerdown=n=>{t={x:n.clientX,y:n.clientY,yaw:this.yaw,pitch:this.pitch},e.setPointerCapture(n.pointerId)},e.onpointermove=n=>{t&&(this.yaw=t.yaw-(n.clientX-t.x)*.006,this.pitch=Math.min(1.2,Math.max(.35,t.pitch+(n.clientY-t.y)*.004)))},e.onpointerup=()=>{t=null},e.onwheel=n=>{n.preventDefault(),this.dist=Math.min(24,Math.max(8,this.dist+n.deltaY*.01))}}resize(){let t=innerWidth,e=innerHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix(),this.dist=Math.max(this.dist,t/e<.8?21:15.5)}loop(){if(!this.open)return;this.cam.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(0,.6,.2);let t=(performance.now()-this.t0)/1e3;for(let e of this.anim)e(t);this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}close(){this.open&&(this.open=!1,cancelAnimationFrame(this.raf),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.remove())}};var bf=["Tap any building or sign to see it on the map and travel there.","Take a shift at the Corner Mart: the quick task gives +25% if you stop the bar in the green.","Knock at a house when its owner is home. They can let you in.","Land plots grow in value, but omo-onile may come for a levy.","Delivery costs more but works from anywhere.","Press C to hop in your car. Press T to chat."],ph=class{constructor(){this.playing=!1,this.busy=!1,this.user=null,this.clockOffset=0,this.cfg={},this.lastKnocks=null,this.waypoint=null,this.commute=null,this.worldTime=null,this.plots=[],this.props=[],this.shops=[],this.fpsAcc=0,this.activity=""}yieldTargets(){let t=[];if(this.ctrl&&!this.busy&&t.push({x:this.ctrl.x,z:this.ctrl.z,r:.6}),this.ghosts)for(let e of this.ghosts.map.values())e.root&&t.push({x:e.root.position.x,z:e.root.position.z,r:.6});return t}horn(t,e){let n=performance.now();if(!(n-(this.lastHorn||0)<3e3||!this.ctrl||Math.hypot(e.x-this.ctrl.x,e.z-this.ctrl.z)>30)){this.lastHorn=n;try{let i=this.hornCtx||(this.hornCtx=new(window.AudioContext||window.webkitAudioContext)),r=i.createOscillator(),o=i.createGain();r.type="square",r.frequency.value=t.type==="danfo"?330:440,o.gain.value=.015,r.connect(o).connect(i.destination),r.start(),r.stop(i.currentTime+.18)}catch{}}}serverNow(){return Date.now()+this.clockOffset}clockSync(t,e){let n=t+e/2-Date.now();this.clockOffset=this.clockOffset?this.clockOffset*.7+n*.3:n}pos(){return{x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}}progress(t,e){et("#loadBar").style.width=t+"%",e&&(et("#loadTip").textContent=e)}async boot(){try{this.progress(8,"Reaching the server\u2026");let[t,e]=await Promise.all([zt("/api/config"),zt("/api/city")]);this.cfg=t,this.city=e,e.area=(i,r)=>r>125?"Lagoon Front":i<0&&r<0?"Yaba":i>=0&&r<0?"Ikeja":i<0?"Surulere":"Lekki Phase 1",et("#tagline").textContent=t.tagline||"",document.title=t.name,this.progress(30,"Building the district\u2026"),await new Promise(i=>setTimeout(i,30)),this.renderer=new bn({canvas:et("#game"),antialias:devicePixelRatio<2,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.camera=new Se(58,1,.5,900),this.camera.position.set(0,14,20),this.world=_d(e),this.scene=this.world.scene,this.decorate(),this.progress(60,"Putting traffic on the road\u2026"),await new Promise(i=>setTimeout(i,30)),this.traffic=new ko(this.scene,e.trafficLoops),this.traffic.onHorn=(i,r)=>this.horn(i,r),this.walkers=new Uo(this.scene,e.zones),this.ghosts=new Oo(this.scene),this.ads=new Fo(this.world,e,()=>this.serverNow()),this.ui=new Xo(this),this.net=new Yo(this),this.interior=new ua(this),this.venue=new da(this),this.garage=new fa(this),this.ctrl=new zo(et("#game"),e,this.world.colliders,"#00a859","You"),this.scene.add(this.ctrl.root),addEventListener("resize",()=>this.resize()),this.resize(),this.bindAuth(),this.progress(85,bf[Math.floor(Math.random()*bf.length)]);let n=await zt("/api/me").catch(()=>null);this.progress(100,"Ready!"),await new Promise(i=>setTimeout(i,250)),this.loop(performance.now()),et("#loading").classList.add("hidden"),n?await this.enter(n.user):et("#auth").classList.remove("hidden")}catch(t){console.error(t),et("#loadTip").textContent=t instanceof Tn?t.message:"Could not start the game. Is WebGL enabled? Refresh to retry.",et("#loadBar").style.background="#d6402f"}}decorate(){let t=this.scene;this.plotMeshes={};let e=Lo();for(let i of this.city.plots||[]){let r=new Gt,o=new ot(new ke(i.size,i.size).rotateX(-Math.PI/2),new te({color:15327944,transparent:!0,opacity:.9}));o.position.set(i.x,.12,i.z),r.add(o);let a=new tr(new _o(new Xt(i.size,.2,i.size)),new ps({color:16761358}));a.position.set(i.x,.2,i.z),r.add(a);let c=new ot(new Fe(.12,.12,4),new te({color:7036746}));c.position.set(i.x,2,i.z+i.size/2-1),r.add(c);let l=new ot(new ke(2.6,1.6),new re({color:3523691,side:Me}));l.position.set(i.x+1.3,3.2,i.z+i.size/2-1),r.add(l),this.plotMeshes[i.id]={sq:o,flag:l},t.add(r)}let n=this.city.shops.find(i=>i.id==="shop_market");if(n){let i=new ot(new Xt(7,.25,4),new te({color:14043695}));i.position.set(n.x,3,n.z);let r=new ot(new Xt(6,1.1,2),new te({color:9136957}));r.position.set(n.x,.55,n.z+.5);let o=new ot(new Xt(5.2,.3,1.2),new te({color:15185994}));o.position.set(n.x,1.25,n.z+.5),t.add(i,r,o);for(let a of[-3.2,3.2]){let c=new ot(new Fe(.1,.1,3),new te({color:5592405}));c.position.set(n.x+a,1.5,n.z-1.5),t.add(c)}}for(let i of this.city.venues||[]){let r=Be(i.name,i.sign||"#333");r.scale.set(8,2,1),r.position.set(i.x,8.5,i.z),t.add(r);let o=new ot(new dn(1.4,1.9,24).rotateX(-Math.PI/2),new re({color:16761358,side:Me}));o.position.set(i.x,.15,i.z),t.add(o)}this.dest=new ot(new dn(1.2,1.7,28).rotateX(-Math.PI/2),new re({color:11816191,side:Me})),this.dest.visible=!1,t.add(this.dest)}resize(){let t=innerWidth,e=innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.size={w:t,h:e}}bindAuth(){let t="guest",e=et("#authForm"),n=i=>{t=i,Nl("#authTabs button").forEach(r=>r.classList.toggle("on",r.dataset.t===i)),et("#fUser").classList.toggle("hidden",i==="guest"),et("#fPass").classList.toggle("hidden",i==="guest"),et("#authGo").textContent={guest:"Play as guest",signup:"Create account",login:"Log in"}[i],et("#authErr").textContent=""};n("guest"),Nl("#authTabs button").forEach(i=>i.onclick=()=>n(i.dataset.t)),e.onsubmit=async i=>{i.preventDefault();let r=new FormData(e),o=et("#age18").checked;if(et("#authErr").textContent="",t!=="login"&&!o){et("#authErr").textContent="You must confirm you are 18 or older to play.";return}let a=et("#authGo");a.disabled=!0;try{let c=await ct(`/api/auth/${t}`,{username:r.get("username"),password:r.get("password"),age18:o});et("#auth").classList.add("hidden"),await this.enter(c.user)}catch(c){et("#authErr").textContent=c.message}finally{a.disabled=!1}}}async enter(t){this.playing=!0,this.user=t,et("#hud").classList.remove("hidden"),this.cfg.jobs=(await zt("/api/jobs").catch(()=>({jobs:[]}))).jobs,this.ctrl.setLook(t.color,t.username);let e=this.city.spawns,n=e[t.id%e.length],i=t.pos&&(t.pos.x||t.pos.z)?t.pos:null;this.ctrl.teleport(i?.x??n.x,i?.z??n.z),this.ctrl.ry=n.ry||0,this.ctrl.camYaw=this.ctrl.ry,this.camera.position.set(this.ctrl.x-10,12,this.ctrl.z+12),this.update(t),this.net.start(),this.phone2=new Bo(this),this.phone2.start(),this.refreshProps(),zt("/api/plots").then(r=>{this.plots=r.plots,this.refreshPlots()}).catch(()=>{}),this.ui.toast(t.guest?`Welcome, ${t.username}! You are playing as a guest.`:`Welcome back, ${t.username}!`),!localStorage.getItem("na_tip")&&!matchMedia("(pointer: coarse)").matches&&(localStorage.setItem("na_tip","1"),setTimeout(()=>{this.ui.sheetOpen||this.ui.toast("Tip: tap a building or the ground near a sign to open its sheet.")},1800))}async refreshProps(){let t=await zt("/api/properties").catch(()=>null);t&&(this.props=t.properties,this.world.setMarkers(t.properties))}refreshPlots(){for(let t of this.plots){let e=this.plotMeshes[t.id];e&&e.flag.material.color.setHex(t.status==="available"?3523691:t.status==="yours"?16761358:9080728)}}async refreshMe(){let t=await zt("/api/me").catch(()=>null);t?.user&&this.update(t.user)}update(t){t&&(this.user=t,this.ui.hud(t))}sessionLost(){this.playing&&(this.playing=!1,this.net.stop(),et("#hud").classList.add("hidden"),this.ui.closeSheet(),et("#auth").classList.remove("hidden"),et("#authErr").textContent="Your session ended. Please sign in again.")}async logout(){await ct("/api/auth/logout").catch(()=>{}),this.playing=!1,this.net.stop(),location.reload()}setConn(t){et("#conn").classList.toggle("hidden",t)}markRead(){this.ui.badge(0),this.unread=0}toggleCar(){if(!this.playing||this.busy)return;let t=this.ctrl.toggleCar();this.ui.sfx(t==="drive"?"horn":"ok"),this.net.nudge()}onHeartbeat(t){this.update(t.me),this.worldTime=t.world,this.ui.clock(t.world),this.world.setTime(t.world.minutesOfDay),this.ghosts.ingest(t.players,this.serverNow()),this.ads.setSnapshot(t.ads);for(let e of t.chat||[])this.ui.addChat(e.u,e.t,e.id);for(let e of t.notifs||[])["knock","dm","knock_in","knock_no"].includes(e.kind),this.unread=(this.unread||0)+1,this.ui.toast(e.text,["omo_onile"].includes(e.kind)?"bad":e.kind==="dm"?"":"money");this.ui.badge(this.unread||0),this.lastKnocks=t.knocks;for(let e of t.knocks?.incoming||[])this.ui.hostKnock(e);t.teleport&&!t.teleport.travelMs&&!this.commute&&this.ctrl.teleport(t.teleport.x,t.teleport.z),t.me.shift&&t.me.shift.endsAt<=this.serverNow()&&this.lastShiftDone!==t.me.shift.id&&(this.lastShiftDone=t.me.shift.id,this.ui.toast("Shift done! Open the job sheet to collect your pay.","money"))}onPush(t){t.kind==="knock"&&this.ui.sfx("knock")}nearest(t=18){let e=null,n=t,i=this.ctrl.x,r=this.ctrl.z;for(let o of this.city.places){let a=Math.hypot(o.x-i,o.z-r);a<n&&(n=a,e=o)}return e?{place:e,d:n}:null}tapPlace(t,e){let n=new ht(t/this.size.w*2-1,-(e/this.size.h)*2+1),i=new ui;i.setFromCamera(n,this.camera);let r=Object.values(this.world.boards).map(h=>h.panel),o=i.intersectObjects(r,!1)[0];if(o){let h=Object.keys(this.world.boards).find(d=>this.world.boards[d].panel===o.object);if(h)return this.ui.board(h)}let a=-i.ray.origin.y/i.ray.direction.y;if(!(a>0))return;let c=i.ray.origin.clone().addScaledVector(i.ray.direction,a),l=null,u=20;for(let h of this.city.places){let d=Math.hypot(h.x-c.x,h.z-c.z);d<u&&(u=d,l=h)}for(let h of this.city.properties){let d=this.city.buildings.find(f=>f.id===h.buildingId);if(d&&Math.abs(c.x-d.x)<d.w/2+2&&Math.abs(c.z-d.z)<d.d/2+2){l=this.city.places.find(f=>f.id===h.id);break}}l?(this.ui.sfx("ok"),this.ui.place(l.id)):this.setWaypoint(c.x,c.z,"Tapped spot")}doAction(){if(!this.playing||this.busy||this.ui.sheetOpen)return;let t=this.nearBoard||null,e=this.nearest(this.actionRange||18);e?this.ui.place(e.place.id):t&&this.ui.board(t)}setWaypoint(t,e,n){this.waypoint={x:t,z:e,label:n},this.dest.visible=!0,this.dest.position.set(t,.3,e)}enterHome(){ct("/api/property/enter").then(()=>this.interior.show(this.user.home.id)).catch(t=>this.ui.error(t))}async enterAsVisitor(t){this.ui.sfx("ok"),await this.interior.show(t,!0)}runCommute(t,e,n){this.busy=!0,this.ctrl.frozen=!0,this.commute={t0:performance.now(),dur:t.seconds*1e3,from:t.from,to:t.to,mode:t.mode},et("#commute").classList.remove("hidden"),et("#commuteTitle").textContent=`${{keke:"\u{1F6FA} Keke",danfo:"\u{1F68C} Danfo",car:"\u{1F697} Your car"}[t.mode]} to ${e.name}`,et("#commuteSub").textContent=`${n.traffic}${t.fare?" \xB7 "+this.fmt(t.fare):""}`,this.ui.sfx("horn"),this.ui.toast(Ge("travel",t.fare)),this.ctrl.mode=t.mode==="car"?"drive":"walk",this.ctrl.applyMode();let i=t.to.x-t.from.x,r=t.to.z-t.from.z;this.ctrl.ry=Math.atan2(-r,i),this.ctrl.camYaw=this.ctrl.ry,this.net.trail.length=0}fmt(t){return"\u20A6"+Math.round(t).toLocaleString("en-NG")}stepCommute(t){let e=this.commute;if(!e)return!1;let n=Math.min(1,(t-e.t0)/e.dur),i=n<.5?2*n*n:1-Math.pow(-2*n+2,2)/2;return this.ctrl.x=e.from.x+(e.to.x-e.from.x)*i,this.ctrl.z=e.from.z+(e.to.z-e.from.z)*i,this.ctrl.v=0,this.ctrl.root.position.set(this.ctrl.x,0,this.ctrl.z),this.ctrl.root.rotation.y=this.ctrl.ry,et("#commuteBar").style.width=n*100+"%",n>=1&&(this.commute=null,this.busy=!1,this.ctrl.frozen=!1,this.ctrl.mode="walk",this.ctrl.applyMode(),et("#commute").classList.add("hidden"),this.ctrl.teleport(e.to.x,e.to.z),this.ui.sfx("ok"),this.ui.toast("You have arrived."),this.net.nudge(),this.waypoint=null,this.dest.visible=!1),!0}loop(t){let e=t;this.lastSample=0;let n=i=>{requestAnimationFrame(n);let r=Math.min(.1,(i-e)/1e3);if(e=i,!this.playing){this.idleCam(i),this.renderer.render(this.scene,this.camera);return}if(this.interior.open||this.venue.open||this.garage.open)return;let o=this.serverNow()/1e3;if(this.traffic.update(o,this.yieldTargets(),r),this.walkers.update(o,this.ctrl),this.ghosts.update(this.serverNow()-1100),this.world.animate(r*1e3),this.stepCommute(i)?this.ctrl.placeCamera(this.camera,r):this.ctrl.update(r),this.commute||(this.ctrl.placeCamera(this.camera,r),i-this.lastSample>250&&(this.lastSample=i,this.net.sample({t:this.serverNow(),x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}))),this.ctrl.lastTap&&!this.ui.sheetOpen&&!this.busy){let a=this.ctrl.lastTap;this.ctrl.lastTap=null,i-a.t<400&&this.tapPlace(a.x,a.y)}this.ads.update(this.camera,this.size,this.ctrl,r*1e3),this.hudStep(i),this.renderer.render(this.scene,this.camera)};requestAnimationFrame(n)}idleCam(t){let e=t/9e3;this.camera.position.set(Math.cos(e)*70,38,Math.sin(e)*70-20),this.camera.lookAt(0,4,-20),this.camera.updateMatrixWorld()}hudStep(t){if(t-(this.hudT||0)<200)return;this.hudT=t;let e=this.ctrl,n=this.nearest(this.actionRange||18),i=this.ads.nearest(e.x,e.z,30);this.nearBoard=i;let r=this.city.area(e.x,e.z),o=this.roadName(e.x,e.z);this.ui.loc(`\u{1F4CD} ${n?n.place.name:o||r}${n||o?" \xB7 "+r:""}`);let a=null;if(n&&!this.ui.sheetOpen){let c=n.place;if(a={shop:`\u{1F6D2} ${c.name}`,job:"\u{1F4BC} Work here",house:`\u{1F3E0} ${c.name}`,plot:`\u{1F30D} ${c.name}`,landmark:`\u{1F4CD} ${c.name}`}[c.type],c.type==="shop"){let l=this.shops.find(u=>u.id===c.id);l&&!l.status.open&&(a=`\u{1F512} ${c.name}: ${l.status.text}`)}}else i&&!this.ui.sheetOpen&&(a="\u{1F4E2} Billboard");if(this.ui.action(this.busy?null:a),this.waypoint){let c=Math.hypot(this.waypoint.x-e.x,this.waypoint.z-e.z);c<5&&(this.waypoint=null,this.dest.visible=!1,this.ui.toast("You have arrived.")),this.ui.waypoint(this.waypoint,c)}else this.ui.waypoint(null);this.dest.visible&&this.dest.scale.setScalar(1+Math.sin(t/200)*.15),this.ui.minimap(e,this.city,this.ghosts,this.waypoint),this.user?.shift&&this.ui.hud(this.user),this.activity=e.mode}onRoad(t,e,n=0){return Gl(this.city,t,e,n)}roadName(t,e){let n=Gl(this.city,t,e);return n?n.name||"On the road":null}},Mf=new ph;window.__game=Mf;Mf.boot();})();
//# sourceMappingURL=game.js.map
