(()=>{var Ju=0,Mc=1,Ku=2;var Nh=1,ju=2,Pn=3,mn=0,Ve=1,ye=2,jn=0,qi=1,wc=2,Sc=3,Ec=4,Qu=5,pi=100,td=101,ed=102,nd=103,id=104,sd=200,rd=201,od=202,ad=203,pa=204,ma=205,ld=206,cd=207,hd=208,ud=209,dd=210,fd=211,pd=212,md=213,gd=214,ga=0,xa=1,ya=2,ji=3,va=4,_a=5,ba=6,Ma=7,Hl=0,xd=1,yd=2,Qn=0,vd=1,_d=2,bd=3,Md=4,wd=5,Sd=6,Ed=7;var kh=300,Qi=301,ts=302,wa=303,Sa=304,no=306,yi=1e3,gi=1001,Ea=1002,Be=1003,Td=1004;var Xs=1005;var fn=1006,Lo=1007;var xi=1008;var kn=1009,Oh=1010,zh=1011,Is=1012,Vl=1013,vi=1014,pn=1015,Hs=1016,Gl=1017,Wl=1018,es=1020,Bh=35902,Fh=1021,Hh=1022,on=1023,Vh=1024,Gh=1025,Zi=1026,ns=1027,$l=1028,Xl=1029,Wh=1030,Yl=1031;var ql=1033,Sr=33776,Er=33777,Tr=33778,Ar=33779,Ta=35840,Aa=35841,Ra=35842,Ca=35843,Ia=36196,Pa=37492,La=37496,Da=37808,Ua=37809,Na=37810,ka=37811,Oa=37812,za=37813,Ba=37814,Fa=37815,Ha=37816,Va=37817,Ga=37818,Wa=37819,$a=37820,Xa=37821,Rr=36492,Ya=36494,qa=36495,$h=36283,Za=36284,Ja=36285,Ka=36286;var Ir=2300,ja=2301,Do=2302,Tc=2400,Ac=2401,Rc=2402;var Ad=3200,Rd=3201;var Xh=0,Cd=1,Kn="",ze="srgb",ls="srgb-linear",io="linear",le="srgb";var Ri=7680;var Cc=519,Id=512,Pd=513,Ld=514,Yh=515,Dd=516,Ud=517,Nd=518,kd=519,Qa=35044;var Ic="300 es",Un=2e3,Pr=2001,ei=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Cr=Math.PI/180,tl=180/Math.PI;function ti(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[s&255]+De[s>>8&255]+De[s>>16&255]+De[s>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Ce(s,t,e){return Math.max(t,Math.min(e,s))}function Od(s,t){return(s%t+t)%t}function Uo(s,t,e){return(1-e)*s+e*t}function dn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ce(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var ct=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Vt=class s{constructor(t,e,n,i,r,o,a,l,c){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],x=i[0],y=i[3],m=i[6],v=i[1],S=i[4],_=i[7],D=i[2],A=i[5],C=i[8];return r[0]=o*x+a*v+l*D,r[3]=o*y+a*S+l*A,r[6]=o*m+a*_+l*C,r[1]=c*x+u*v+h*D,r[4]=c*y+u*S+h*A,r[7]=c*m+u*_+h*C,r[2]=d*x+f*v+g*D,r[5]=d*y+f*S+g*A,r[8]=d*m+f*_+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,g=e*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=h*x,t[1]=(i*c-u*n)*x,t[2]=(a*n-i*o)*x,t[3]=d*x,t[4]=(u*e-i*l)*x,t[5]=(i*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(No.makeScale(t,e)),this}rotate(t){return this.premultiply(No.makeRotation(-t)),this}translate(t,e){return this.premultiply(No.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},No=new Vt;function qh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Lr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zd(){let s=Lr("canvas");return s.style.display="block",s}var Pc={};function Es(s){s in Pc||(Pc[s]=!0,console.warn(s))}function Bd(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Fd(s){let t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Hd(s){let t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var ee={enabled:!0,workingColorSpace:ls,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===le&&(s.r=Nn(s.r),s.g=Nn(s.g),s.b=Nn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===le&&(s.r=Ji(s.r),s.g=Ji(s.g),s.b=Ji(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Kn?io:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Nn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ji(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Lc=[.64,.33,.3,.6,.15,.06],Dc=[.2126,.7152,.0722],Uc=[.3127,.329],Nc=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kc=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[ls]:{primaries:Lc,whitePoint:Uc,transfer:io,toXYZ:Nc,fromXYZ:kc,luminanceCoefficients:Dc,workingColorSpaceConfig:{unpackColorSpace:ze},outputColorSpaceConfig:{drawingBufferColorSpace:ze}},[ze]:{primaries:Lc,whitePoint:Uc,transfer:le,toXYZ:Nc,fromXYZ:kc,luminanceCoefficients:Dc,outputColorSpaceConfig:{drawingBufferColorSpace:ze}}});var Ci,el=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ci===void 0&&(Ci=Lr("canvas")),Ci.width=t.width,Ci.height=t.height;let n=Ci.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ci}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Lr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Nn(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Nn(e[n]/255)*255):e[n]=Nn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Vd=0,Dr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=ti(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(ko(i[o].image)):r.push(ko(i[o]))}else r=ko(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function ko(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?el.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Gd=0,Ge=class s extends ei{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=gi,i=gi,r=fn,o=xi,a=on,l=kn,c=s.DEFAULT_ANISOTROPY,u=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=ti(),this.name="",this.source=new Dr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==kh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case yi:t.x=t.x-Math.floor(t.x);break;case gi:t.x=t.x<0?0:1;break;case Ea:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case yi:t.y=t.y-Math.floor(t.y);break;case gi:t.y=t.y<0?0:1;break;case Ea:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=kh;Ge.DEFAULT_ANISOTROPY=1;var _e=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],x=l[2],y=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(g-y)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(g+y)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(c+1)/2,_=(f+1)/2,D=(m+1)/2,A=(u+d)/4,C=(h+x)/4,I=(g+y)/4;return S>_&&S>D?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=A/n,r=C/n):_>D?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=A/i,r=I/i):D<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(D),n=C/r,i=I/r),this.set(n,i,r,e),this}let v=Math.sqrt((y-g)*(y-g)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(y-g)/v,this.y=(h-x)/v,this.z=(d-u)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},nl=class extends ei{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Ge(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Dr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},On=class extends nl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ur=class extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Be,this.minFilter=Be,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var il=class extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Be,this.minFilter=Be,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Je=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(h!==x||l!==d||c!==f||u!==g){let y=1-a,m=l*d+c*f+u*g+h*x,v=m>=0?1:-1,S=1-m*m;if(S>Number.EPSILON){let D=Math.sqrt(S),A=Math.atan2(D,m*v);y=Math.sin(y*A)/D,a=Math.sin(a*A)/D}let _=a*v;if(l=l*y+d*_,c=c*y+f*_,u=u*y+g*_,h=h*y+x*_,y===1-a){let D=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=D,c*=D,u*=D,h*=D}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*f-c*d,t[e+1]=l*g+u*d+c*h-a*f,t[e+2]=c*g+u*f+a*d-l*h,t[e+3]=u*g-a*h-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],d=n+a+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>h){let f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>h){let f=2*Math.sqrt(1+a-n-h);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ce(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Oc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Oc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),u=2*(a*e-r*i),h=2*(r*n-o*e);return this.x=e+l*c+o*h-a*u,this.y=n+l*u+a*c-r*h,this.z=i+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Oo.copy(this).projectOnVector(t),this.sub(Oo)}reflect(t){return this.sub(Oo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Oo=new P,Oc=new Je,zn=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ys.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ys.copy(n.boundingBox)),Ys.applyMatrix4(t.matrixWorld),this.union(Ys)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),qs.subVectors(this.max,ms),Ii.subVectors(t.a,ms),Pi.subVectors(t.b,ms),Li.subVectors(t.c,ms),$n.subVectors(Pi,Ii),Xn.subVectors(Li,Pi),ai.subVectors(Ii,Li);let e=[0,-$n.z,$n.y,0,-Xn.z,Xn.y,0,-ai.z,ai.y,$n.z,0,-$n.x,Xn.z,0,-Xn.x,ai.z,0,-ai.x,-$n.y,$n.x,0,-Xn.y,Xn.x,0,-ai.y,ai.x,0];return!zo(e,Ii,Pi,Li,qs)||(e=[1,0,0,0,1,0,0,0,1],!zo(e,Ii,Pi,Li,qs))?!1:(Zs.crossVectors($n,Xn),e=[Zs.x,Zs.y,Zs.z],zo(e,Ii,Pi,Li,qs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Tn=[new P,new P,new P,new P,new P,new P,new P,new P],nn=new P,Ys=new zn,Ii=new P,Pi=new P,Li=new P,$n=new P,Xn=new P,ai=new P,ms=new P,qs=new P,Zs=new P,li=new P;function zo(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){li.fromArray(s,r);let a=i.x*Math.abs(li.x)+i.y*Math.abs(li.y)+i.z*Math.abs(li.z),l=t.dot(li),c=e.dot(li),u=n.dot(li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var Wd=new zn,gs=new P,Bo=new P,ni=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Wd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);let e=gs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(gs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(Bo)),this.expandByPoint(gs.copy(t.center).sub(Bo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},An=new P,Fo=new P,Js=new P,Yn=new P,Ho=new P,Ks=new P,Vo=new P,Ps=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Fo.copy(t).add(e).multiplyScalar(.5),Js.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub(Fo);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Js),a=Yn.dot(this.direction),l=-Yn.dot(Js),c=Yn.lengthSq(),u=Math.abs(1-o*o),h,d,f,g;if(u>0)if(h=o*l-a,d=o*a-l,g=r*u,h>=0)if(d>=-g)if(d<=g){let x=1/u;h*=x,d*=x,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Fo).addScaledVector(Js,d),f}intersectSphere(t,e){An.subVectors(t.center,this.origin);let n=An.dot(this.direction),i=An.dot(An)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-d.z)*h,l=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,l=(t.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,i,r){Ho.subVectors(e,t),Ks.subVectors(n,t),Vo.crossVectors(Ho,Ks);let o=this.direction.dot(Vo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yn.subVectors(this.origin,t);let l=a*this.direction.dot(Ks.crossVectors(Yn,Ks));if(l<0)return null;let c=a*this.direction.dot(Ho.cross(Yn));if(c<0||l+c>o)return null;let u=-a*Yn.dot(Vo);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},se=class s{constructor(t,e,n,i,r,o,a,l,c,u,h,d,f,g,x,y){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,u,h,d,f,g,x,y)}set(t,e,n,i,r,o,a,l,c,u,h,d,f,g,x,y){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=x,m[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/Di.setFromMatrixColumn(t,0).length(),r=1/Di.setFromMatrixColumn(t,1).length(),o=1/Di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){let d=o*u,f=o*h,g=a*u,x=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=f+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*u,f=l*h,g=c*u,x=c*h;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*u,f=l*h,g=c*u,x=c*h;e[0]=d-x*a,e[4]=-o*h,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*u,f=o*h,g=a*u,x=a*h;e[0]=l*u,e[4]=g*c-f,e[8]=d*c+x,e[1]=l*h,e[5]=x*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=x-d*h,e[8]=g*h+f,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*h+g,e[10]=d-x*h}else if(t.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=d*h+x,e[5]=o*u,e[9]=f*h-g,e[2]=g*h-f,e[6]=a*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose($d,t,Xd)}lookAt(t,e,n){let i=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),qn.crossVectors(n,Xe),qn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),qn.crossVectors(n,Xe)),qn.normalize(),js.crossVectors(Xe,qn),i[0]=qn.x,i[4]=js.x,i[8]=Xe.x,i[1]=qn.y,i[5]=js.y,i[9]=Xe.y,i[2]=qn.z,i[6]=js.z,i[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],x=n[6],y=n[10],m=n[14],v=n[3],S=n[7],_=n[11],D=n[15],A=i[0],C=i[4],I=i[8],E=i[12],w=i[1],L=i[5],z=i[9],F=i[13],W=i[2],Q=i[6],Y=i[10],it=i[14],$=i[3],ut=i[7],yt=i[11],Rt=i[15];return r[0]=o*A+a*w+l*W+c*$,r[4]=o*C+a*L+l*Q+c*ut,r[8]=o*I+a*z+l*Y+c*yt,r[12]=o*E+a*F+l*it+c*Rt,r[1]=u*A+h*w+d*W+f*$,r[5]=u*C+h*L+d*Q+f*ut,r[9]=u*I+h*z+d*Y+f*yt,r[13]=u*E+h*F+d*it+f*Rt,r[2]=g*A+x*w+y*W+m*$,r[6]=g*C+x*L+y*Q+m*ut,r[10]=g*I+x*z+y*Y+m*yt,r[14]=g*E+x*F+y*it+m*Rt,r[3]=v*A+S*w+_*W+D*$,r[7]=v*C+S*L+_*Q+D*ut,r[11]=v*I+S*z+_*Y+D*yt,r[15]=v*E+S*F+_*it+D*Rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],x=t[7],y=t[11],m=t[15];return g*(+r*l*h-i*c*h-r*a*d+n*c*d+i*a*f-n*l*f)+x*(+e*l*f-e*c*d+r*o*d-i*o*f+i*c*u-r*l*u)+y*(+e*c*h-e*a*f-r*o*h+n*o*f+r*a*u-n*c*u)+m*(-i*a*u-e*l*h+e*a*d+i*o*h-n*o*d+n*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],x=t[13],y=t[14],m=t[15],v=h*y*c-x*d*c+x*l*f-a*y*f-h*l*m+a*d*m,S=g*d*c-u*y*c-g*l*f+o*y*f+u*l*m-o*d*m,_=u*x*c-g*h*c+g*a*f-o*x*f-u*a*m+o*h*m,D=g*h*l-u*x*l-g*a*d+o*x*d+u*a*y-o*h*y,A=e*v+n*S+i*_+r*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/A;return t[0]=v*C,t[1]=(x*d*r-h*y*r-x*i*f+n*y*f+h*i*m-n*d*m)*C,t[2]=(a*y*r-x*l*r+x*i*c-n*y*c-a*i*m+n*l*m)*C,t[3]=(h*l*r-a*d*r-h*i*c+n*d*c+a*i*f-n*l*f)*C,t[4]=S*C,t[5]=(u*y*r-g*d*r+g*i*f-e*y*f-u*i*m+e*d*m)*C,t[6]=(g*l*r-o*y*r-g*i*c+e*y*c+o*i*m-e*l*m)*C,t[7]=(o*d*r-u*l*r+u*i*c-e*d*c-o*i*f+e*l*f)*C,t[8]=_*C,t[9]=(g*h*r-u*x*r-g*n*f+e*x*f+u*n*m-e*h*m)*C,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*m+e*a*m)*C,t[11]=(u*a*r-o*h*r-u*n*c+e*h*c+o*n*f-e*a*f)*C,t[12]=D*C,t[13]=(u*x*i-g*h*i+g*n*d-e*x*d-u*n*y+e*h*y)*C,t[14]=(g*a*i-o*x*i-g*n*l+e*x*l+o*n*y-e*a*y)*C,t[15]=(o*h*i-u*a*i+u*n*l-e*h*l-o*n*d+e*a*d)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,g=r*h,x=o*u,y=o*h,m=a*h,v=l*c,S=l*u,_=l*h,D=n.x,A=n.y,C=n.z;return i[0]=(1-(x+m))*D,i[1]=(f+_)*D,i[2]=(g-S)*D,i[3]=0,i[4]=(f-_)*A,i[5]=(1-(d+m))*A,i[6]=(y+v)*A,i[7]=0,i[8]=(g+S)*C,i[9]=(y-v)*C,i[10]=(1-(d+x))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=Di.set(i[0],i[1],i[2]).length(),o=Di.set(i[4],i[5],i[6]).length(),a=Di.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],sn.copy(this);let c=1/r,u=1/o,h=1/a;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=h,sn.elements[9]*=h,sn.elements[10]*=h,e.setFromRotationMatrix(sn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Un){let l=this.elements,c=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),d=(n+i)/(n-i),f,g;if(a===Un)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Pr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Un){let l=this.elements,c=1/(e-t),u=1/(n-i),h=1/(o-r),d=(e+t)*c,f=(n+i)*u,g,x;if(a===Un)g=(o+r)*h,x=-2*h;else if(a===Pr)g=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Di=new P,sn=new se,$d=new P(0,0,0),Xd=new P(1,1,1),qn=new P,js=new P,Xe=new P,zc=new se,Bc=new Je,Ke=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ce(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ce(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return zc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bc.setFromEuler(this),this.setFromQuaternion(Bc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ke.DEFAULT_ORDER="XYZ";var Ls=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Yd=0,Fc=new P,Ui=new Je,Rn=new se,Qs=new P,xs=new P,qd=new P,Zd=new Je,Hc=new P(1,0,0),Vc=new P(0,1,0),Gc=new P(0,0,1),Wc={type:"added"},Jd={type:"removed"},Ni={type:"childadded",child:null},Go={type:"childremoved",child:null},Ie=class s extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new P,e=new Ke,n=new Je,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new se},normalMatrix:{value:new Vt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(t,e){return Ui.setFromAxisAngle(t,e),this.quaternion.premultiply(Ui),this}rotateX(t){return this.rotateOnAxis(Hc,t)}rotateY(t){return this.rotateOnAxis(Vc,t)}rotateZ(t){return this.rotateOnAxis(Gc,t)}translateOnAxis(t,e){return Fc.copy(t).applyQuaternion(this.quaternion),this.position.add(Fc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Hc,t)}translateY(t){return this.translateOnAxis(Vc,t)}translateZ(t){return this.translateOnAxis(Gc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Qs.copy(t):Qs.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(xs,Qs,this.up):Rn.lookAt(Qs,xs,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Ui.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ui.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wc),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Jd),Go.child=t,this.dispatchEvent(Go),Go.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wc),Ni.child=t,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,t,qd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Zd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Ie.DEFAULT_UP=new P(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rn=new P,Cn=new P,Wo=new P,In=new P,ki=new P,Oi=new P,$c=new P,$o=new P,Xo=new P,Yo=new P,qo=new _e,Zo=new _e,Jo=new _e,Dn=class s{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),rn.subVectors(t,e),i.cross(rn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){rn.subVectors(i,e),Cn.subVectors(n,e),Wo.subVectors(t,e);let o=rn.dot(rn),a=rn.dot(Cn),l=rn.dot(Wo),c=Cn.dot(Cn),u=Cn.dot(Wo),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(c*l-a*u)*d,g=(o*u-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,In.x),l.addScaledVector(o,In.y),l.addScaledVector(a,In.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return qo.setScalar(0),Zo.setScalar(0),Jo.setScalar(0),qo.fromBufferAttribute(t,e),Zo.fromBufferAttribute(t,n),Jo.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(qo,r.x),o.addScaledVector(Zo,r.y),o.addScaledVector(Jo,r.z),o}static isFrontFacing(t,e,n,i){return rn.subVectors(n,e),Cn.subVectors(t,e),rn.cross(Cn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return rn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),rn.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;ki.subVectors(i,n),Oi.subVectors(r,n),$o.subVectors(t,n);let l=ki.dot($o),c=Oi.dot($o);if(l<=0&&c<=0)return e.copy(n);Xo.subVectors(t,i);let u=ki.dot(Xo),h=Oi.dot(Xo);if(u>=0&&h<=u)return e.copy(i);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(ki,o);Yo.subVectors(t,r);let f=ki.dot(Yo),g=Oi.dot(Yo);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Oi,a);let y=u*g-f*h;if(y<=0&&h-u>=0&&f-g>=0)return $c.subVectors(r,i),a=(h-u)/(h-u+(f-g)),e.copy(i).addScaledVector($c,a);let m=1/(y+x+d);return o=x*m,a=d*m,e.copy(n).addScaledVector(ki,o).addScaledVector(Oi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},tr={h:0,s:0,l:0};function Ko(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Mt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ee.workingColorSpace){if(t=Od(t,1),e=Ce(e,0,1),n=Ce(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ko(o,r,t+1/3),this.g=Ko(o,r,t),this.b=Ko(o,r,t-1/3)}return ee.toWorkingColorSpace(this,i),this}setStyle(t,e=ze){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ze){let n=Zh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}copyLinearToSRGB(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ze){return ee.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Ce(Ue.r*255,0,255))*65536+Math.round(Ce(Ue.g*255,0,255))*256+Math.round(Ce(Ue.b*255,0,255))}getHexString(t=ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Ue.copy(this),e);let n=Ue.r,i=Ue.g,r=Ue.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-n)/h+2;break;case r:l=(n-i)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=ze){ee.fromWorkingColorSpace(Ue.copy(this),t);let e=Ue.r,n=Ue.g,i=Ue.b;return t!==ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(tr);let n=Uo(Zn.h,tr.h,e),i=Uo(Zn.s,tr.s,e),r=Uo(Zn.l,tr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ue=new Mt;Mt.NAMES=Zh;var Kd=0,Bn=class extends ei{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=ti(),this.name="",this.blending=qi,this.side=mn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pa,this.blendDst=ma,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qi&&(n.blending=this.blending),this.side!==mn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pa&&(n.blendSrc=this.blendSrc),this.blendDst!==ma&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Jt=class extends Bn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ke,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var we=new P,er=new ct,Se=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Qa,this.updateRanges=[],this.gpuType=pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)er.fromBufferAttribute(this,e),er.applyMatrix3(t),this.setXY(e,er.x,er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=dn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=dn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=dn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=dn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Qa&&(t.usage=this.usage),t}};var Nr=class extends Se{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var kr=class extends Se{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Gt=class extends Se{constructor(t,e,n){super(new Float32Array(t),e,n)}},jd=0,Ze=new se,jo=new Ie,zi=new P,Ye=new zn,ys=new zn,Re=new P,me=class s extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qh(t)?kr:Nr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return jo.lookAt(t),jo.updateMatrix(),this.applyMatrix4(jo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Gt(n,3))}else{for(let n=0,i=e.count;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ni);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ys.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(Ye.min,ys.min),Ye.expandByPoint(Re),Re.addVectors(Ye.max,ys.max),Ye.expandByPoint(Re)):(Ye.expandByPoint(ys.min),Ye.expandByPoint(ys.max))}Ye.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Re.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Re));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Re.fromBufferAttribute(a,c),l&&(zi.fromBufferAttribute(t,c),Re.add(zi)),i=Math.max(i,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Se(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new P,l[I]=new P;let c=new P,u=new P,h=new P,d=new ct,f=new ct,g=new ct,x=new P,y=new P;function m(I,E,w){c.fromBufferAttribute(n,I),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,w),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,w),u.sub(c),h.sub(c),f.sub(d),g.sub(d);let L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(L),y.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(L),a[I].add(x),a[E].add(x),a[w].add(x),l[I].add(y),l[E].add(y),l[w].add(y))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let I=0,E=v.length;I<E;++I){let w=v[I],L=w.start,z=w.count;for(let F=L,W=L+z;F<W;F+=3)m(t.getX(F+0),t.getX(F+1),t.getX(F+2))}let S=new P,_=new P,D=new P,A=new P;function C(I){D.fromBufferAttribute(i,I),A.copy(D);let E=a[I];S.copy(E),S.sub(D.multiplyScalar(D.dot(E))).normalize(),_.crossVectors(A,E);let L=_.dot(l[I])<0?-1:1;o.setXYZW(I,S.x,S.y,S.z,L)}for(let I=0,E=v.length;I<E;++I){let w=v[I],L=w.start,z=w.count;for(let F=L,W=L+z;F<W;F+=3)C(t.getX(F+0)),C(t.getX(F+1)),C(t.getX(F+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Se(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new P,r=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),x=t.getX(d+1),y=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,y),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,y),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(y,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){let c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u),f=0,g=0;for(let x=0,y=l.length;x<y;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let m=0;m<u;m++)d[g++]=c[f++]}return new Se(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(t.data))}u.length>0&&(i[l]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let u=i[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,u=o.length;c<u;c++){let h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xc=new se,ci=new Ps,nr=new ni,Yc=new P,ir=new P,sr=new P,rr=new P,Qo=new P,or=new P,qc=new P,ar=new P,et=class extends Ie{constructor(t=new me,e=new Jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){or.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],h=r[l];u!==0&&(Qo.fromBufferAttribute(h,t),o?or.addScaledVector(Qo,u):or.addScaledVector(Qo.sub(e),u))}e.add(or)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(r),ci.copy(t.ray).recast(t.near),!(nr.containsPoint(ci.origin)===!1&&(ci.intersectSphere(nr,Yc)===null||ci.origin.distanceToSquared(Yc)>(t.far-t.near)**2))&&(Xc.copy(r).invert(),ci.copy(t.ray).applyMatrix4(Xc),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ci)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let y=d[g],m=o[y.materialIndex],v=Math.max(y.start,f.start),S=Math.min(a.count,Math.min(y.start+y.count,f.start+f.count));for(let _=v,D=S;_<D;_+=3){let A=a.getX(_),C=a.getX(_+1),I=a.getX(_+2);i=lr(this,m,t,n,c,u,h,A,C,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=y.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let y=g,m=x;y<m;y+=3){let v=a.getX(y),S=a.getX(y+1),_=a.getX(y+2);i=lr(this,o,t,n,c,u,h,v,S,_),i&&(i.faceIndex=Math.floor(y/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let y=d[g],m=o[y.materialIndex],v=Math.max(y.start,f.start),S=Math.min(l.count,Math.min(y.start+y.count,f.start+f.count));for(let _=v,D=S;_<D;_+=3){let A=_,C=_+1,I=_+2;i=lr(this,m,t,n,c,u,h,A,C,I),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=y.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let y=g,m=x;y<m;y+=3){let v=y,S=y+1,_=y+2;i=lr(this,o,t,n,c,u,h,v,S,_),i&&(i.faceIndex=Math.floor(y/3),e.push(i))}}}};function Qd(s,t,e,n,i,r,o,a){let l;if(t.side===Ve?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===mn,a),l===null)return null;ar.copy(a),ar.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(ar);return c<e.near||c>e.far?null:{distance:c,point:ar.clone(),object:s}}function lr(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,ir),s.getVertexPosition(l,sr),s.getVertexPosition(c,rr);let u=Qd(s,t,e,n,ir,sr,rr,qc);if(u){let h=new P;Dn.getBarycoord(qc,ir,sr,rr,h),i&&(u.uv=Dn.getInterpolatedAttribute(i,a,l,c,h,new ct)),r&&(u.uv1=Dn.getInterpolatedAttribute(r,a,l,c,h,new ct)),o&&(u.normal=Dn.getInterpolatedAttribute(o,a,l,c,h,new P),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new P,materialIndex:0};Dn.getNormal(ir,sr,rr,d.normal),u.face=d,u.barycoord=h}return u}var Bt=class s extends me{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(u,3)),this.setAttribute("uv",new Gt(h,2));function g(x,y,m,v,S,_,D,A,C,I,E){let w=_/C,L=D/I,z=_/2,F=D/2,W=A/2,Q=C+1,Y=I+1,it=0,$=0,ut=new P;for(let yt=0;yt<Y;yt++){let Rt=yt*L-F;for(let Yt=0;Yt<Q;Yt++){let ne=Yt*w-z;ut[x]=ne*v,ut[y]=Rt*S,ut[m]=W,c.push(ut.x,ut.y,ut.z),ut[x]=0,ut[y]=0,ut[m]=A>0?1:-1,u.push(ut.x,ut.y,ut.z),h.push(Yt/C),h.push(1-yt/I),it+=1}}for(let yt=0;yt<I;yt++)for(let Rt=0;Rt<C;Rt++){let Yt=d+Rt+Q*yt,ne=d+Rt+Q*(yt+1),Z=d+(Rt+1)+Q*(yt+1),b=d+(Rt+1)+Q*yt;l.push(Yt,ne,b),l.push(ne,Z,b),$+=6}a.addGroup(f,$,E),f+=$,d+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function is(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Oe(s){let t={};for(let e=0;e<s.length;e++){let n=is(s[e]);for(let i in n)t[i]=n[i]}return t}function tf(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Jh(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var ef={clone:is,merge:Oe},nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,gn=class extends Bn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nf,this.fragmentShader=sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=tf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Or=class extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=Un}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Jn=new P,Zc=new ct,Jc=new ct,be=class extends Or{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=tl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Cr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return tl*2*Math.atan(Math.tan(Cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z)}getViewSize(t,e){return this.getViewBounds(t,Zc,Jc),e.subVectors(Jc,Zc)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Cr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Bi=-90,Fi=1,sl=class extends Ie{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new be(Bi,Fi,t,e);i.layers=this.layers,this.add(i);let r=new be(Bi,Fi,t,e);r.layers=this.layers,this.add(r);let o=new be(Bi,Fi,t,e);o.layers=this.layers,this.add(o);let a=new be(Bi,Fi,t,e);a.layers=this.layers,this.add(a);let l=new be(Bi,Fi,t,e);l.layers=this.layers,this.add(l);let c=new be(Bi,Fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},zr=class extends Ge{constructor(t,e,n,i,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Qi,super(t,e,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},rl=class extends On{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new zr(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Bt(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:jn});r.uniforms.tEquirect.value=e;let o=new et(i,r),a=e.minFilter;return e.minFilter===xi&&(e.minFilter=fn),new sl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},ta=new P,rf=new P,of=new Vt,Ln=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=ta.subVectors(n,e).cross(rf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ta),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||of.getNormalMatrix(t),i=this.coplanarPoint(ta).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},hi=new ni,cr=new P,Ds=class{constructor(t=new Ln,e=new Ln,n=new Ln,i=new Ln,r=new Ln,o=new Ln){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un){let n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],g=i[9],x=i[10],y=i[11],m=i[12],v=i[13],S=i[14],_=i[15];if(n[0].setComponents(l-r,d-c,y-f,_-m).normalize(),n[1].setComponents(l+r,d+c,y+f,_+m).normalize(),n[2].setComponents(l+o,d+u,y+g,_+v).normalize(),n[3].setComponents(l-o,d-u,y-g,_-v).normalize(),n[4].setComponents(l-a,d-h,y-x,_-S).normalize(),e===Un)n[5].setComponents(l+a,d+h,y+x,_+S).normalize();else if(e===Pr)n[5].setComponents(a,h,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(t){return hi.center.set(0,0,0),hi.radius=.7071067811865476,hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(cr.x=i.normal.x>0?t.max.x:t.min.x,cr.y=i.normal.y>0?t.max.y:t.min.y,cr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Kh(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function af(s){let t=new WeakMap;function e(a,l){let c=a.array,u=a.usage,h=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){let u=l.array,h=l.updateRanges;if(s.bindBuffer(c,a),h.length===0)s.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){let g=h[d],x=h[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){let x=h[f];s.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Ee=class s extends me{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=t/a,d=e/l,f=[],g=[],x=[],y=[];for(let m=0;m<u;m++){let v=m*d-o;for(let S=0;S<c;S++){let _=S*h-r;g.push(_,-v,0),x.push(0,0,1),y.push(S/a),y.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){let S=v+c*m,_=v+c*(m+1),D=v+1+c*(m+1),A=v+1+c*m;f.push(S,_,A),f.push(_,D,A)}this.setIndex(f),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(x,3)),this.setAttribute("uv",new Gt(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cf=`#ifdef USE_ALPHAHASH
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
#endif`,hf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,df=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ff=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pf=`#ifdef USE_AOMAP
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
#endif`,mf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gf=`#ifdef USE_BATCHING
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
#endif`,xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_f=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bf=`#ifdef USE_IRIDESCENCE
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
#endif`,Mf=`#ifdef USE_BUMPMAP
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
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Af=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Pf=`#define PI 3.141592653589793
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
} // validated`,Lf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Df=`vec3 transformedNormal = objectNormal;
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
#endif`,Uf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ff=`#ifdef USE_ENVMAP
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
#endif`,Hf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vf=`#ifdef USE_ENVMAP
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
#endif`,Gf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,$f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zf=`#ifdef USE_GRADIENTMAP
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
}`,Jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qf=`uniform bool receiveShadow;
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
#endif`,tp=`#ifdef USE_ENVMAP
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
#endif`,ep=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,np=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rp=`PhysicalMaterial material;
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
#endif`,op=`struct PhysicalMaterial {
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
}`,ap=`
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
#endif`,lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,cp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,up=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xp=`#if defined( USE_POINTS_UV )
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
#endif`,yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_p=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wp=`#ifdef USE_MORPHTARGETS
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
#endif`,Sp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ep=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ap=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ip=`#ifdef USE_NORMALMAP
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
#endif`,Pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Op=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$p=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Xp=`float getShadowMask() {
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
}`,Yp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qp=`#ifdef USE_SKINNING
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
#endif`,Zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jp=`#ifdef USE_SKINNING
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
#endif`,Kp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,em=`#ifdef USE_TRANSMISSION
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
#endif`,nm=`#ifdef USE_TRANSMISSION
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
#endif`,im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,am=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lm=`uniform sampler2D t2D;
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
}`,cm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`#include <common>
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
}`,pm=`#if DEPTH_PACKING == 3200
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
}`,mm=`#define DISTANCE
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
}`,gm=`#define DISTANCE
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
}`,xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vm=`uniform float scale;
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
}`,_m=`uniform vec3 diffuse;
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
}`,bm=`#include <common>
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
}`,Mm=`uniform vec3 diffuse;
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
}`,wm=`#define LAMBERT
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
}`,Sm=`#define LAMBERT
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
}`,Em=`#define MATCAP
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
}`,Tm=`#define MATCAP
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
}`,Am=`#define NORMAL
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
}`,Rm=`#define NORMAL
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
}`,Cm=`#define PHONG
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
}`,Im=`#define PHONG
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
}`,Pm=`#define STANDARD
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
}`,Lm=`#define STANDARD
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
}`,Dm=`#define TOON
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
}`,Um=`#define TOON
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
}`,Nm=`uniform float size;
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
}`,km=`uniform vec3 diffuse;
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
}`,Om=`#include <common>
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
}`,zm=`uniform vec3 color;
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
}`,Bm=`uniform float rotation;
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
}`,Fm=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:lf,alphahash_pars_fragment:cf,alphamap_fragment:hf,alphamap_pars_fragment:uf,alphatest_fragment:df,alphatest_pars_fragment:ff,aomap_fragment:pf,aomap_pars_fragment:mf,batching_pars_vertex:gf,batching_vertex:xf,begin_vertex:yf,beginnormal_vertex:vf,bsdfs:_f,iridescence_fragment:bf,bumpmap_pars_fragment:Mf,clipping_planes_fragment:wf,clipping_planes_pars_fragment:Sf,clipping_planes_pars_vertex:Ef,clipping_planes_vertex:Tf,color_fragment:Af,color_pars_fragment:Rf,color_pars_vertex:Cf,color_vertex:If,common:Pf,cube_uv_reflection_fragment:Lf,defaultnormal_vertex:Df,displacementmap_pars_vertex:Uf,displacementmap_vertex:Nf,emissivemap_fragment:kf,emissivemap_pars_fragment:Of,colorspace_fragment:zf,colorspace_pars_fragment:Bf,envmap_fragment:Ff,envmap_common_pars_fragment:Hf,envmap_pars_fragment:Vf,envmap_pars_vertex:Gf,envmap_physical_pars_fragment:tp,envmap_vertex:Wf,fog_vertex:$f,fog_pars_vertex:Xf,fog_fragment:Yf,fog_pars_fragment:qf,gradientmap_pars_fragment:Zf,lightmap_pars_fragment:Jf,lights_lambert_fragment:Kf,lights_lambert_pars_fragment:jf,lights_pars_begin:Qf,lights_toon_fragment:ep,lights_toon_pars_fragment:np,lights_phong_fragment:ip,lights_phong_pars_fragment:sp,lights_physical_fragment:rp,lights_physical_pars_fragment:op,lights_fragment_begin:ap,lights_fragment_maps:lp,lights_fragment_end:cp,logdepthbuf_fragment:hp,logdepthbuf_pars_fragment:up,logdepthbuf_pars_vertex:dp,logdepthbuf_vertex:fp,map_fragment:pp,map_pars_fragment:mp,map_particle_fragment:gp,map_particle_pars_fragment:xp,metalnessmap_fragment:yp,metalnessmap_pars_fragment:vp,morphinstance_vertex:_p,morphcolor_vertex:bp,morphnormal_vertex:Mp,morphtarget_pars_vertex:wp,morphtarget_vertex:Sp,normal_fragment_begin:Ep,normal_fragment_maps:Tp,normal_pars_fragment:Ap,normal_pars_vertex:Rp,normal_vertex:Cp,normalmap_pars_fragment:Ip,clearcoat_normal_fragment_begin:Pp,clearcoat_normal_fragment_maps:Lp,clearcoat_pars_fragment:Dp,iridescence_pars_fragment:Up,opaque_fragment:Np,packing:kp,premultiplied_alpha_fragment:Op,project_vertex:zp,dithering_fragment:Bp,dithering_pars_fragment:Fp,roughnessmap_fragment:Hp,roughnessmap_pars_fragment:Vp,shadowmap_pars_fragment:Gp,shadowmap_pars_vertex:Wp,shadowmap_vertex:$p,shadowmask_pars_fragment:Xp,skinbase_vertex:Yp,skinning_pars_vertex:qp,skinning_vertex:Zp,skinnormal_vertex:Jp,specularmap_fragment:Kp,specularmap_pars_fragment:jp,tonemapping_fragment:Qp,tonemapping_pars_fragment:tm,transmission_fragment:em,transmission_pars_fragment:nm,uv_pars_fragment:im,uv_pars_vertex:sm,uv_vertex:rm,worldpos_vertex:om,background_vert:am,background_frag:lm,backgroundCube_vert:cm,backgroundCube_frag:hm,cube_vert:um,cube_frag:dm,depth_vert:fm,depth_frag:pm,distanceRGBA_vert:mm,distanceRGBA_frag:gm,equirect_vert:xm,equirect_frag:ym,linedashed_vert:vm,linedashed_frag:_m,meshbasic_vert:bm,meshbasic_frag:Mm,meshlambert_vert:wm,meshlambert_frag:Sm,meshmatcap_vert:Em,meshmatcap_frag:Tm,meshnormal_vert:Am,meshnormal_frag:Rm,meshphong_vert:Cm,meshphong_frag:Im,meshphysical_vert:Pm,meshphysical_frag:Lm,meshtoon_vert:Dm,meshtoon_frag:Um,points_vert:Nm,points_frag:km,shadow_vert:Om,shadow_frag:zm,sprite_vert:Bm,sprite_frag:Fm},ht={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},un={basic:{uniforms:Oe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Oe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Oe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Oe([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Oe([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Mt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Oe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Oe([ht.points,ht.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Oe([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Oe([ht.common,ht.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Oe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Oe([ht.sprite,ht.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Oe([ht.common,ht.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Oe([ht.lights,ht.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};un.physical={uniforms:Oe([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var hr={r:0,b:0,g:0},ui=new Ke,Hm=new se;function Vm(s,t,e,n,i,r,o){let a=new Mt(0),l=r===!0?0:1,c,u,h=null,d=0,f=null;function g(v){let S=v.isScene===!0?v.background:null;return S&&S.isTexture&&(S=(v.backgroundBlurriness>0?e:t).get(S)),S}function x(v){let S=!1,_=g(v);_===null?m(a,l):_&&_.isColor&&(m(_,1),S=!0);let D=s.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(v,S){let _=g(S);_&&(_.isCubeTexture||_.mapping===no)?(u===void 0&&(u=new et(new Bt(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:is(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ui.copy(S.backgroundRotation),ui.x*=-1,ui.y*=-1,ui.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ui.y*=-1,ui.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Hm.makeRotationFromEuler(ui)),u.material.toneMapped=ee.getTransfer(_.colorSpace)!==le,(h!==_||d!==_.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new et(new Ee(2,2),new gn({name:"BackgroundMaterial",uniforms:is(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ee.getTransfer(_.colorSpace)!==le,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,f=s.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function m(v,S){v.getRGB(hr,Jh(s)),n.buffers.color.setClear(hr.r,hr.g,hr.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(v,S=1){a.set(v),l=S,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,m(a,l)},render:x,addToRenderList:y}}function Gm(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(w,L,z,F,W){let Q=!1,Y=h(F,z,L);r!==Y&&(r=Y,c(r.object)),Q=f(w,F,z,W),Q&&g(w,F,z,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,_(w,L,z,F),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return s.createVertexArray()}function c(w){return s.bindVertexArray(w)}function u(w){return s.deleteVertexArray(w)}function h(w,L,z){let F=z.wireframe===!0,W=n[w.id];W===void 0&&(W={},n[w.id]=W);let Q=W[L.id];Q===void 0&&(Q={},W[L.id]=Q);let Y=Q[F];return Y===void 0&&(Y=d(l()),Q[F]=Y),Y}function d(w){let L=[],z=[],F=[];for(let W=0;W<e;W++)L[W]=0,z[W]=0,F[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:F,object:w,attributes:{},index:null}}function f(w,L,z,F){let W=r.attributes,Q=L.attributes,Y=0,it=z.getAttributes();for(let $ in it)if(it[$].location>=0){let yt=W[$],Rt=Q[$];if(Rt===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(Rt=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(Rt=w.instanceColor)),yt===void 0||yt.attribute!==Rt||Rt&&yt.data!==Rt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==F}function g(w,L,z,F){let W={},Q=L.attributes,Y=0,it=z.getAttributes();for(let $ in it)if(it[$].location>=0){let yt=Q[$];yt===void 0&&($==="instanceMatrix"&&w.instanceMatrix&&(yt=w.instanceMatrix),$==="instanceColor"&&w.instanceColor&&(yt=w.instanceColor));let Rt={};Rt.attribute=yt,yt&&yt.data&&(Rt.data=yt.data),W[$]=Rt,Y++}r.attributes=W,r.attributesNum=Y,r.index=F}function x(){let w=r.newAttributes;for(let L=0,z=w.length;L<z;L++)w[L]=0}function y(w){m(w,0)}function m(w,L){let z=r.newAttributes,F=r.enabledAttributes,W=r.attributeDivisors;z[w]=1,F[w]===0&&(s.enableVertexAttribArray(w),F[w]=1),W[w]!==L&&(s.vertexAttribDivisor(w,L),W[w]=L)}function v(){let w=r.newAttributes,L=r.enabledAttributes;for(let z=0,F=L.length;z<F;z++)L[z]!==w[z]&&(s.disableVertexAttribArray(z),L[z]=0)}function S(w,L,z,F,W,Q,Y){Y===!0?s.vertexAttribIPointer(w,L,z,W,Q):s.vertexAttribPointer(w,L,z,F,W,Q)}function _(w,L,z,F){x();let W=F.attributes,Q=z.getAttributes(),Y=L.defaultAttributeValues;for(let it in Q){let $=Q[it];if($.location>=0){let ut=W[it];if(ut===void 0&&(it==="instanceMatrix"&&w.instanceMatrix&&(ut=w.instanceMatrix),it==="instanceColor"&&w.instanceColor&&(ut=w.instanceColor)),ut!==void 0){let yt=ut.normalized,Rt=ut.itemSize,Yt=t.get(ut);if(Yt===void 0)continue;let ne=Yt.buffer,Z=Yt.type,b=Yt.bytesPerElement,G=Z===s.INT||Z===s.UNSIGNED_INT||ut.gpuType===Vl;if(ut.isInterleavedBufferAttribute){let q=ut.data,ot=q.stride,lt=ut.offset;if(q.isInstancedInterleavedBuffer){for(let Ct=0;Ct<$.locationSize;Ct++)m($.location+Ct,q.meshPerAttribute);w.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Ct=0;Ct<$.locationSize;Ct++)y($.location+Ct);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let Ct=0;Ct<$.locationSize;Ct++)S($.location+Ct,Rt/$.locationSize,Z,yt,ot*b,(lt+Rt/$.locationSize*Ct)*b,G)}else{if(ut.isInstancedBufferAttribute){for(let q=0;q<$.locationSize;q++)m($.location+q,ut.meshPerAttribute);w.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let q=0;q<$.locationSize;q++)y($.location+q);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let q=0;q<$.locationSize;q++)S($.location+q,Rt/$.locationSize,Z,yt,Rt*b,Rt/$.locationSize*q*b,G)}}else if(Y!==void 0){let yt=Y[it];if(yt!==void 0)switch(yt.length){case 2:s.vertexAttrib2fv($.location,yt);break;case 3:s.vertexAttrib3fv($.location,yt);break;case 4:s.vertexAttrib4fv($.location,yt);break;default:s.vertexAttrib1fv($.location,yt)}}}}v()}function D(){I();for(let w in n){let L=n[w];for(let z in L){let F=L[z];for(let W in F)u(F[W].object),delete F[W];delete L[z]}delete n[w]}}function A(w){if(n[w.id]===void 0)return;let L=n[w.id];for(let z in L){let F=L[z];for(let W in F)u(F[W].object),delete F[W];delete L[z]}delete n[w.id]}function C(w){for(let L in n){let z=n[L];if(z[w.id]===void 0)continue;let F=z[w.id];for(let W in F)u(F[W].object),delete F[W];delete z[w.id]}}function I(){E(),o=!0,r!==i&&(r=i,c(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:y,disableUnusedAttributes:v}}function Wm(s,t,e){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,h){h!==0&&(s.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];e.update(f,n,1)}function l(c,u,h,d){if(h===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*d[x];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function $m(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==on&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let I=C===Hs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==kn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==pn&&!I)}function l(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),v=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:y,maxAttributes:m,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:D,maxSamples:A}}function Xm(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Ln,a=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,x=h.clipIntersection,y=h.clipShadows,m=s.get(h);if(!i||g===null||g.length===0||r&&!y)r?u(null):c();else{let v=r?0:n,S=v*4,_=m.clippingState||null;l.value=_,_=u(g,d,S,f);for(let D=0;D!==S;++D)_[D]=e[D];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,g){let x=h!==null?h.length:0,y=null;if(x!==0){if(y=l.value,g!==!0||y===null){let m=f+x*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(y===null||y.length<m)&&(y=new Float32Array(m));for(let S=0,_=f;S!==x;++S,_+=4)o.copy(h[S]).applyMatrix4(v,a),o.normal.toArray(y,_),y[_+3]=o.constant}l.value=y,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,y}}function Ym(s){let t=new WeakMap;function e(o,a){return a===wa?o.mapping=Qi:a===Sa&&(o.mapping=ts),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===wa||a===Sa)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new rl(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Br=class extends Or{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Yi=4,Kc=[.125,.215,.35,.446,.526,.582],mi=20,ea=new Br,jc=new Mt,na=null,ia=0,sa=0,ra=!1,fi=(1+Math.sqrt(5))/2,Hi=1/fi,Qc=[new P(-fi,Hi,0),new P(fi,Hi,0),new P(-Hi,0,fi),new P(Hi,0,fi),new P(0,fi,-Hi),new P(0,fi,Hi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],Fr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(na,ia,sa),this._renderer.xr.enabled=ra,t.scissorTest=!1,ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qi||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Hs,format:on,colorSpace:ls,depthBuffer:!1},i=th(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=th(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qm(r)),this._blurMaterial=Zm(r,t,e)}return i}_compileMaterial(t){let e=new et(this._lodPlanes[0],t);this._renderer.compile(e,ea)}_sceneToCubeUV(t,e,n,i){let a=new be(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(jc),u.toneMapping=Qn,u.autoClear=!1;let f=new Jt({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new et(new Bt,f),x=!1,y=t.background;y?y.isColor&&(f.color.copy(y),t.background=null,x=!0):(f.color.copy(jc),x=!0);for(let m=0;m<6;m++){let v=m%3;v===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):v===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));let S=this._cubeSize;ur(i,v*S,m>2?S:0,S,S),u.setRenderTarget(i),x&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=y}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Qi||t.mapping===ts;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=nh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=eh());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new et(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;ur(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ea)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Qc[(i-r-1)%Qc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new et(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*mi-1),x=r/g,y=isFinite(r)?1+Math.floor(u*x):mi;y>mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${mi}`);let m=[],v=0;for(let C=0;C<mi;++C){let I=C/x,E=Math.exp(-I*I/2);m.push(E),C===0?v+=E:C<y&&(v+=2*E)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;d.envMap.value=t.texture,d.samples.value=y,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;let _=this._sizeLods[i],D=3*_*(i>S-Yi?i-S+Yi:0),A=4*(this._cubeSize-_);ur(e,D,A,3*_,2*_),l.setRenderTarget(e),l.render(h,ea)}};function qm(s){let t=[],e=[],n=[],i=s,r=s-Yi+1+Kc.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Yi?l=Kc[o-s+Yi-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,x=3,y=2,m=1,v=new Float32Array(x*g*f),S=new Float32Array(y*g*f),_=new Float32Array(m*g*f);for(let A=0;A<f;A++){let C=A%3*2/3-1,I=A>2?0:-1,E=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];v.set(E,x*g*A),S.set(d,y*g*A);let w=[A,A,A,A,A,A];_.set(w,m*g*A)}let D=new me;D.setAttribute("position",new Se(v,x)),D.setAttribute("uv",new Se(S,y)),D.setAttribute("faceIndex",new Se(_,m)),t.push(D),i>Yi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function th(s,t,e){let n=new On(s,t,e);return n.texture.mapping=no,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Zm(s,t,e){let n=new Float32Array(mi),i=new P(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function eh(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function nh(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Zl(){return`

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
	`}function Jm(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===wa||l===Sa,u=l===Qi||l===ts;if(c||u){let h=t.get(a),d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Fr(s)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{let f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(e===null&&(e=new Fr(s)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function i(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Km(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Es("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function jm(s,t,e,n){let i={},r=new WeakMap;function o(h){let d=h.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let y=0,m=x.length;y<m;y++)t.remove(x[y])}d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(h){let d=h.attributes;for(let g in d)t.update(d[g],s.ARRAY_BUFFER);let f=h.morphAttributes;for(let g in f){let x=f[g];for(let y=0,m=x.length;y<m;y++)t.update(x[y],s.ARRAY_BUFFER)}}function c(h){let d=[],f=h.index,g=h.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let S=0,_=v.length;S<_;S+=3){let D=v[S+0],A=v[S+1],C=v[S+2];d.push(D,A,A,C,C,D)}}else if(g!==void 0){let v=g.array;x=g.version;for(let S=0,_=v.length/3-1;S<_;S+=3){let D=S+0,A=S+1,C=S+2;d.push(D,A,A,C,C,D)}}else return;let y=new(qh(d)?kr:Nr)(d,1);y.version=x;let m=r.get(h);m&&t.remove(m),r.set(h,y)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Qm(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let y=0;for(let m=0;m<g;m++)y+=f[m];e.update(y,n,1)}function h(d,f,g,x){if(g===0)return;let y=t.get("WEBGL_multi_draw");if(y===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],x[m]);else{y.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let m=0;for(let v=0;v<g;v++)m+=f[v]*x[v];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function t0(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function e0(s,t,e){let n=new WeakMap,i=new _e;function r(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(a);if(d===void 0||d.count!==h){let E=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,y=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],S=0;f===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let _=a.attributes.position.count*S,D=1;_>t.maxTextureSize&&(D=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let A=new Float32Array(_*D*4*h),C=new Ur(A,_,D,h);C.type=pn,C.needsUpdate=!0;let I=S*4;for(let w=0;w<h;w++){let L=y[w],z=m[w],F=v[w],W=_*D*4*w;for(let Q=0;Q<L.count;Q++){let Y=Q*I;f===!0&&(i.fromBufferAttribute(L,Q),A[W+Y+0]=i.x,A[W+Y+1]=i.y,A[W+Y+2]=i.z,A[W+Y+3]=0),g===!0&&(i.fromBufferAttribute(z,Q),A[W+Y+4]=i.x,A[W+Y+5]=i.y,A[W+Y+6]=i.z,A[W+Y+7]=0),x===!0&&(i.fromBufferAttribute(F,Q),A[W+Y+8]=i.x,A[W+Y+9]=i.y,A[W+Y+10]=i.z,A[W+Y+11]=F.itemSize===4?i.w:1)}}d={count:h,texture:C,size:new ct(_,D)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function n0(s,t,e,n){let i=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=t.get(l,u);if(i.get(h)!==c&&(t.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function o(){i=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Hr=class extends Ge{constructor(t,e,n,i,r,o,a,l,c,u=Zi){if(u!==Zi&&u!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Zi&&(n=vi),n===void 0&&u===ns&&(n=es),super(null,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Be,this.minFilter=l!==void 0?l:Be,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},jh=new Ge,ih=new Hr(1,1),Qh=new Ur,tu=new il,eu=new zr,sh=[],rh=[],oh=new Float32Array(16),ah=new Float32Array(9),lh=new Float32Array(4);function cs(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=sh[i];if(r===void 0&&(r=new Float32Array(i),sh[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Te(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ae(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function so(s,t){let e=rh[t];e===void 0&&(e=new Int32Array(t),rh[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function i0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function s0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2fv(this.addr,t),Ae(e,t)}}function r0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;s.uniform3fv(this.addr,t),Ae(e,t)}}function o0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4fv(this.addr,t),Ae(e,t)}}function a0(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;lh.set(n),s.uniformMatrix2fv(this.addr,!1,lh),Ae(e,n)}}function l0(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;ah.set(n),s.uniformMatrix3fv(this.addr,!1,ah),Ae(e,n)}}function c0(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;oh.set(n),s.uniformMatrix4fv(this.addr,!1,oh),Ae(e,n)}}function h0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function u0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2iv(this.addr,t),Ae(e,t)}}function d0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3iv(this.addr,t),Ae(e,t)}}function f0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4iv(this.addr,t),Ae(e,t)}}function p0(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function m0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2uiv(this.addr,t),Ae(e,t)}}function g0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3uiv(this.addr,t),Ae(e,t)}}function x0(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4uiv(this.addr,t),Ae(e,t)}}function y0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(ih.compareFunction=Yh,r=ih):r=jh,e.setTexture2D(t||r,i)}function v0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||tu,i)}function _0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||eu,i)}function b0(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Qh,i)}function M0(s){switch(s){case 5126:return i0;case 35664:return s0;case 35665:return r0;case 35666:return o0;case 35674:return a0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return u0;case 35668:case 35672:return d0;case 35669:case 35673:return f0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return x0;case 35678:case 36198:case 36298:case 36306:case 35682:return y0;case 35679:case 36299:case 36307:return v0;case 35680:case 36300:case 36308:case 36293:return _0;case 36289:case 36303:case 36311:case 36292:return b0}}function w0(s,t){s.uniform1fv(this.addr,t)}function S0(s,t){let e=cs(t,this.size,2);s.uniform2fv(this.addr,e)}function E0(s,t){let e=cs(t,this.size,3);s.uniform3fv(this.addr,e)}function T0(s,t){let e=cs(t,this.size,4);s.uniform4fv(this.addr,e)}function A0(s,t){let e=cs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function R0(s,t){let e=cs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function C0(s,t){let e=cs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function I0(s,t){s.uniform1iv(this.addr,t)}function P0(s,t){s.uniform2iv(this.addr,t)}function L0(s,t){s.uniform3iv(this.addr,t)}function D0(s,t){s.uniform4iv(this.addr,t)}function U0(s,t){s.uniform1uiv(this.addr,t)}function N0(s,t){s.uniform2uiv(this.addr,t)}function k0(s,t){s.uniform3uiv(this.addr,t)}function O0(s,t){s.uniform4uiv(this.addr,t)}function z0(s,t,e){let n=this.cache,i=t.length,r=so(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||jh,r[o])}function B0(s,t,e){let n=this.cache,i=t.length,r=so(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||tu,r[o])}function F0(s,t,e){let n=this.cache,i=t.length,r=so(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||eu,r[o])}function H0(s,t,e){let n=this.cache,i=t.length,r=so(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Qh,r[o])}function V0(s){switch(s){case 5126:return w0;case 35664:return S0;case 35665:return E0;case 35666:return T0;case 35674:return A0;case 35675:return R0;case 35676:return C0;case 5124:case 35670:return I0;case 35667:case 35671:return P0;case 35668:case 35672:return L0;case 35669:case 35673:return D0;case 5125:return U0;case 36294:return N0;case 36295:return k0;case 36296:return O0;case 35678:case 36198:case 36298:case 36306:case 35682:return z0;case 35679:case 36299:case 36307:return B0;case 35680:case 36300:case 36308:case 36293:return F0;case 36289:case 36303:case 36311:case 36292:return H0}}var ol=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=M0(e.type)}},al=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=V0(e.type)}},ll=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},oa=/(\w+)(\])?(\[|\.)?/g;function ch(s,t){s.seq.push(t),s.map[t.id]=t}function G0(s,t,e){let n=s.name,i=n.length;for(oa.lastIndex=0;;){let r=oa.exec(n),o=oa.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ch(e,c===void 0?new ol(a,s,t):new al(a,s,t));break}else{let h=e.map[a];h===void 0&&(h=new ll(a),ch(e,h)),e=h}}}var Ki=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);G0(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function hh(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var W0=37297,$0=0;function X0(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var uh=new Vt;function Y0(s){ee._getMatrix(uh,ee.workingColorSpace,s);let t=`mat3( ${uh.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(s)){case io:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function dh(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+X0(s.getShaderSource(t),o)}else return i}function q0(s,t){let e=Y0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Z0(s,t){let e;switch(t){case vd:e="Linear";break;case _d:e="Reinhard";break;case bd:e="Cineon";break;case Md:e="ACESFilmic";break;case Sd:e="AgX";break;case Ed:e="Neutral";break;case wd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var dr=new P;function J0(){ee.getLuminanceCoefficients(dr);let s=dr.x.toFixed(4),t=dr.y.toFixed(4),e=dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function K0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ts).join(`
`)}function j0(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Q0(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Ts(s){return s!==""}function fh(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ph(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var tg=/^[ \t]*#include +<([\w\d./]+)>/gm;function cl(s){return s.replace(tg,ng)}var eg=new Map;function ng(s,t){let e=$t[t];if(e===void 0){let n=eg.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return cl(e)}var ig=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mh(s){return s.replace(ig,sg)}function sg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function gh(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function rg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Nh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ju?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function og(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Qi:case ts:t="ENVMAP_TYPE_CUBE";break;case no:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ag(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ts:t="ENVMAP_MODE_REFRACTION";break}return t}function lg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Hl:t="ENVMAP_BLENDING_MULTIPLY";break;case xd:t="ENVMAP_BLENDING_MIX";break;case yd:t="ENVMAP_BLENDING_ADD";break}return t}function cg(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function hg(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=rg(e),c=og(e),u=ag(e),h=lg(e),d=cg(e),f=K0(e),g=j0(r),x=i.createProgram(),y,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ts).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ts).join(`
`),m.length>0&&(m+=`
`)):(y=[gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ts).join(`
`),m=[gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Qn?"#define TONE_MAPPING":"",e.toneMapping!==Qn?$t.tonemapping_pars_fragment:"",e.toneMapping!==Qn?Z0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,q0("linearToOutputTexel",e.outputColorSpace),J0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ts).join(`
`)),o=cl(o),o=fh(o,e),o=ph(o,e),a=cl(a),a=fh(a,e),a=ph(a,e),o=mh(o),a=mh(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",e.glslVersion===Ic?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ic?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let S=v+y+o,_=v+m+a,D=hh(i,i.VERTEX_SHADER,S),A=hh(i,i.FRAGMENT_SHADER,_);i.attachShader(x,D),i.attachShader(x,A),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(L){if(s.debug.checkShaderErrors){let z=i.getProgramInfoLog(x).trim(),F=i.getShaderInfoLog(D).trim(),W=i.getShaderInfoLog(A).trim(),Q=!0,Y=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,D,A);else{let it=dh(i,D,"vertex"),$=dh(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+z+`
`+it+`
`+$)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(F===""||W==="")&&(Y=!1);Y&&(L.diagnostics={runnable:Q,programLog:z,vertexShader:{log:F,prefix:y},fragmentShader:{log:W,prefix:m}})}i.deleteShader(D),i.deleteShader(A),I=new Ki(i,x),E=Q0(i,x)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=i.getProgramParameter(x,W0)),w},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=D,this.fragmentShader=A,this}var ug=0,hl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new ul(t),e.set(t,n)),n}},ul=class{constructor(t){this.id=ug++,this.code=t,this.usedTimes=0}};function dg(s,t,e,n,i,r,o){let a=new Ls,l=new hl,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return c.add(E),E===0?"uv":`uv${E}`}function y(E,w,L,z,F){let W=z.fog,Q=F.geometry,Y=E.isMeshStandardMaterial?z.environment:null,it=(E.isMeshStandardMaterial?e:t).get(E.envMap||Y),$=it&&it.mapping===no?it.image.height:null,ut=g[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let yt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Rt=yt!==void 0?yt.length:0,Yt=0;Q.morphAttributes.position!==void 0&&(Yt=1),Q.morphAttributes.normal!==void 0&&(Yt=2),Q.morphAttributes.color!==void 0&&(Yt=3);let ne,Z,b,G;if(ut){let ae=un[ut];ne=ae.vertexShader,Z=ae.fragmentShader}else ne=E.vertexShader,Z=E.fragmentShader,l.update(E),b=l.getVertexShaderID(E),G=l.getFragmentShaderID(E);let q=s.getRenderTarget(),ot=s.state.buffers.depth.getReversed(),lt=F.isInstancedMesh===!0,Ct=F.isBatchedMesh===!0,It=!!E.map,Pt=!!E.matcap,qt=!!it,U=!!E.aoMap,xe=!!E.lightMap,Zt=!!E.bumpMap,jt=!!E.normalMap,Ut=!!E.displacementMap,de=!!E.emissiveMap,Lt=!!E.metalnessMap,R=!!E.roughnessMap,M=E.anisotropy>0,B=E.clearcoat>0,K=E.dispersion>0,tt=E.iridescence>0,J=E.sheen>0,Tt=E.transmission>0,ft=M&&!!E.anisotropyMap,vt=B&&!!E.clearcoatMap,te=B&&!!E.clearcoatNormalMap,st=B&&!!E.clearcoatRoughnessMap,_t=tt&&!!E.iridescenceMap,Nt=tt&&!!E.iridescenceThicknessMap,kt=J&&!!E.sheenColorMap,bt=J&&!!E.sheenRoughnessMap,Qt=!!E.specularMap,Wt=!!E.specularColorMap,he=!!E.specularIntensityMap,N=Tt&&!!E.transmissionMap,dt=Tt&&!!E.thicknessMap,X=!!E.gradientMap,j=!!E.alphaMap,xt=E.alphaTest>0,mt=!!E.alphaHash,Ft=!!E.extensions,ve=Qn;E.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(ve=s.toneMapping);let Le={shaderID:ut,shaderType:E.type,shaderName:E.name,vertexShader:ne,fragmentShader:Z,defines:E.defines,customVertexShaderID:b,customFragmentShaderID:G,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Ct,batchingColor:Ct&&F._colorsTexture!==null,instancing:lt,instancingColor:lt&&F.instanceColor!==null,instancingMorph:lt&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:q===null?s.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:ls,alphaToCoverage:!!E.alphaToCoverage,map:It,matcap:Pt,envMap:qt,envMapMode:qt&&it.mapping,envMapCubeUVHeight:$,aoMap:U,lightMap:xe,bumpMap:Zt,normalMap:jt,displacementMap:d&&Ut,emissiveMap:de,normalMapObjectSpace:jt&&E.normalMapType===Cd,normalMapTangentSpace:jt&&E.normalMapType===Xh,metalnessMap:Lt,roughnessMap:R,anisotropy:M,anisotropyMap:ft,clearcoat:B,clearcoatMap:vt,clearcoatNormalMap:te,clearcoatRoughnessMap:st,dispersion:K,iridescence:tt,iridescenceMap:_t,iridescenceThicknessMap:Nt,sheen:J,sheenColorMap:kt,sheenRoughnessMap:bt,specularMap:Qt,specularColorMap:Wt,specularIntensityMap:he,transmission:Tt,transmissionMap:N,thicknessMap:dt,gradientMap:X,opaque:E.transparent===!1&&E.blending===qi&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:xt,alphaHash:mt,combine:E.combine,mapUv:It&&x(E.map.channel),aoMapUv:U&&x(E.aoMap.channel),lightMapUv:xe&&x(E.lightMap.channel),bumpMapUv:Zt&&x(E.bumpMap.channel),normalMapUv:jt&&x(E.normalMap.channel),displacementMapUv:Ut&&x(E.displacementMap.channel),emissiveMapUv:de&&x(E.emissiveMap.channel),metalnessMapUv:Lt&&x(E.metalnessMap.channel),roughnessMapUv:R&&x(E.roughnessMap.channel),anisotropyMapUv:ft&&x(E.anisotropyMap.channel),clearcoatMapUv:vt&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:te&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:bt&&x(E.sheenRoughnessMap.channel),specularMapUv:Qt&&x(E.specularMap.channel),specularColorMapUv:Wt&&x(E.specularColorMap.channel),specularIntensityMapUv:he&&x(E.specularIntensityMap.channel),transmissionMapUv:N&&x(E.transmissionMap.channel),thicknessMapUv:dt&&x(E.thicknessMap.channel),alphaMapUv:j&&x(E.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(jt||M),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Q.attributes.uv&&(It||j),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:ot,skinning:F.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Yt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:ve,decodeVideoTexture:It&&E.map.isVideoTexture===!0&&ee.getTransfer(E.map.colorSpace)===le,decodeVideoTextureEmissive:de&&E.emissiveMap.isVideoTexture===!0&&ee.getTransfer(E.emissiveMap.colorSpace)===le,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ye,flipSided:E.side===Ve,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ft&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&E.extensions.multiDraw===!0||Ct)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function m(E){let w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(let L in E.defines)w.push(L),w.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(v(w,E),S(w,E),w.push(s.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function v(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function S(E,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){let w=g[E.type],L;if(w){let z=un[w];L=ef.clone(z.uniforms)}else L=E.uniforms;return L}function D(E,w){let L;for(let z=0,F=u.length;z<F;z++){let W=u[z];if(W.cacheKey===w){L=W,++L.usedTimes;break}}return L===void 0&&(L=new hg(s,w,E,r),u.push(L)),L}function A(E){if(--E.usedTimes===0){let w=u.indexOf(E);u[w]=u[u.length-1],u.pop(),E.destroy()}}function C(E){l.remove(E)}function I(){l.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:_,acquireProgram:D,releaseProgram:A,releaseShaderCache:C,programs:u,dispose:I}}function fg(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function pg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function xh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function yh(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(h,d,f,g,x,y){let m=s[t];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:x,group:y},s[t]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=x,m.group=y),t++,m}function a(h,d,f,g,x,y){let m=o(h,d,f,g,x,y);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(h,d,f,g,x,y){let m=o(h,d,f,g,x,y);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(h,d){e.length>1&&e.sort(h||pg),n.length>1&&n.sort(d||xh),i.length>1&&i.sort(d||xh)}function u(){for(let h=t,d=s.length;h<d;h++){let f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function mg(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new yh,s.set(n,[o])):i>=r.length?(o=new yh,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function gg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Mt};break;case"SpotLight":e={position:new P,direction:new P,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":e={color:new Mt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function xg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var yg=0;function vg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function _g(s){let t=new gg,e=xg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let i=new P,r=new se,o=new se;function a(c){let u=0,h=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,x=0,y=0,m=0,v=0,S=0,_=0,D=0,A=0,C=0;c.sort(vg);for(let E=0,w=c.length;E<w;E++){let L=c[E],z=L.color,F=L.intensity,W=L.distance,Q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=z.r*F,h+=z.g*F,d+=z.b*F;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],F);C++}else if(L.isDirectionalLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let it=L.shadow,$=e.get(L);$.shadowIntensity=it.intensity,$.shadowBias=it.bias,$.shadowNormalBias=it.normalBias,$.shadowRadius=it.radius,$.shadowMapSize=it.mapSize,n.directionalShadow[f]=$,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=L.shadow.matrix,v++}n.directional[f]=Y,f++}else if(L.isSpotLight){let Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(z).multiplyScalar(F),Y.distance=W,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[x]=Y;let it=L.shadow;if(L.map&&(n.spotLightMap[D]=L.map,D++,it.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[x]=it.matrix,L.castShadow){let $=e.get(L);$.shadowIntensity=it.intensity,$.shadowBias=it.bias,$.shadowNormalBias=it.normalBias,$.shadowRadius=it.radius,$.shadowMapSize=it.mapSize,n.spotShadow[x]=$,n.spotShadowMap[x]=Q,_++}x++}else if(L.isRectAreaLight){let Y=t.get(L);Y.color.copy(z).multiplyScalar(F),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[y]=Y,y++}else if(L.isPointLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){let it=L.shadow,$=e.get(L);$.shadowIntensity=it.intensity,$.shadowBias=it.bias,$.shadowNormalBias=it.normalBias,$.shadowRadius=it.radius,$.shadowMapSize=it.mapSize,$.shadowCameraNear=it.camera.near,$.shadowCameraFar=it.camera.far,n.pointShadow[g]=$,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=L.shadow.matrix,S++}n.point[g]=Y,g++}else if(L.isHemisphereLight){let Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(F),Y.groundColor.copy(L.groundColor).multiplyScalar(F),n.hemi[m]=Y,m++}}y>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==y||I.hemiLength!==m||I.numDirectionalShadows!==v||I.numPointShadows!==S||I.numSpotShadows!==_||I.numSpotMaps!==D||I.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=y,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=_+D-A,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,I.directionalLength=f,I.pointLength=g,I.spotLength=x,I.rectAreaLength=y,I.hemiLength=m,I.numDirectionalShadows=v,I.numPointShadows=S,I.numSpotShadows=_,I.numSpotMaps=D,I.numLightProbes=C,n.version=yg++)}function l(c,u){let h=0,d=0,f=0,g=0,x=0,y=u.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){let S=c[m];if(S.isDirectionalLight){let _=n.directional[h];_.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(y),h++}else if(S.isSpotLight){let _=n.spot[f];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(y),_.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(y),f++}else if(S.isRectAreaLight){let _=n.rectArea[g];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(y),o.identity(),r.copy(S.matrixWorld),r.premultiply(y),o.extractRotation(r),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let _=n.point[d];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(y),d++}else if(S.isHemisphereLight){let _=n.hemi[x];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(y),x++}}}return{setup:a,setupView:l,state:n}}function vh(s){let t=new _g(s),e=[],n=[];function i(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function bg(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new vh(s),t.set(i,[a])):r>=o.length?(a=new vh(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var dl=class extends Bn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},fl=class extends Bn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wg=`uniform sampler2D shadow_pass;
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
}`;function Sg(s,t,e){let n=new Ds,i=new ct,r=new ct,o=new _e,a=new dl({depthPacking:Rd}),l=new fl,c={},u=e.maxTextureSize,h={[mn]:Ve,[Ve]:mn,[ye]:ye},d=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:Mg,fragmentShader:wg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new me;g.setAttribute("position",new Se(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new et(g,d),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nh;let m=this.type;this.render=function(A,C,I){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||A.length===0)return;let E=s.getRenderTarget(),w=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),z=s.state;z.setBlending(jn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let F=m!==Pn&&this.type===Pn,W=m===Pn&&this.type!==Pn;for(let Q=0,Y=A.length;Q<Y;Q++){let it=A[Q],$=it.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;i.copy($.mapSize);let ut=$.getFrameExtents();if(i.multiply(ut),r.copy($.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ut.x),i.x=r.x*ut.x,$.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ut.y),i.y=r.y*ut.y,$.mapSize.y=r.y)),$.map===null||F===!0||W===!0){let Rt=this.type!==Pn?{minFilter:Be,magFilter:Be}:{};$.map!==null&&$.map.dispose(),$.map=new On(i.x,i.y,Rt),$.map.texture.name=it.name+".shadowMap",$.camera.updateProjectionMatrix()}s.setRenderTarget($.map),s.clear();let yt=$.getViewportCount();for(let Rt=0;Rt<yt;Rt++){let Yt=$.getViewport(Rt);o.set(r.x*Yt.x,r.y*Yt.y,r.x*Yt.z,r.y*Yt.w),z.viewport(o),$.updateMatrices(it,Rt),n=$.getFrustum(),_(C,I,$.camera,it,this.type)}$.isPointLightShadow!==!0&&this.type===Pn&&v($,I),$.needsUpdate=!1}m=this.type,y.needsUpdate=!1,s.setRenderTarget(E,w,L)};function v(A,C){let I=t.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new On(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,I,d,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,I,f,x,null)}function S(A,C,I,E){let w=null,L=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)w=L;else if(w=I.isPointLight===!0?l:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let z=w.uuid,F=C.uuid,W=c[z];W===void 0&&(W={},c[z]=W);let Q=W[F];Q===void 0&&(Q=w.clone(),W[F]=Q,C.addEventListener("dispose",D)),w=Q}if(w.visible=C.visible,w.wireframe=C.wireframe,E===Pn?w.side=C.shadowSide!==null?C.shadowSide:C.side:w.side=C.shadowSide!==null?C.shadowSide:h[C.side],w.alphaMap=C.alphaMap,w.alphaTest=C.alphaTest,w.map=C.map,w.clipShadows=C.clipShadows,w.clippingPlanes=C.clippingPlanes,w.clipIntersection=C.clipIntersection,w.displacementMap=C.displacementMap,w.displacementScale=C.displacementScale,w.displacementBias=C.displacementBias,w.wireframeLinewidth=C.wireframeLinewidth,w.linewidth=C.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let z=s.properties.get(w);z.light=I}return w}function _(A,C,I,E,w){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===Pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);let F=t.update(A),W=A.material;if(Array.isArray(W)){let Q=F.groups;for(let Y=0,it=Q.length;Y<it;Y++){let $=Q[Y],ut=W[$.materialIndex];if(ut&&ut.visible){let yt=S(A,ut,E,w);A.onBeforeShadow(s,A,C,I,F,yt,$),s.renderBufferDirect(I,null,F,yt,A,$),A.onAfterShadow(s,A,C,I,F,yt,$)}}}else if(W.visible){let Q=S(A,W,E,w);A.onBeforeShadow(s,A,C,I,F,Q,null),s.renderBufferDirect(I,null,F,Q,A,null),A.onAfterShadow(s,A,C,I,F,Q,null)}}let z=A.children;for(let F=0,W=z.length;F<W;F++)_(z[F],C,I,E,w)}function D(A){A.target.removeEventListener("dispose",D);for(let I in c){let E=c[I],w=A.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}var Eg={[ga]:xa,[ya]:ba,[va]:Ma,[ji]:_a,[xa]:ga,[ba]:ya,[Ma]:va,[_a]:ji};function Tg(s,t){function e(){let N=!1,dt=new _e,X=null,j=new _e(0,0,0,0);return{setMask:function(xt){X!==xt&&!N&&(s.colorMask(xt,xt,xt,xt),X=xt)},setLocked:function(xt){N=xt},setClear:function(xt,mt,Ft,ve,Le){Le===!0&&(xt*=ve,mt*=ve,Ft*=ve),dt.set(xt,mt,Ft,ve),j.equals(dt)===!1&&(s.clearColor(xt,mt,Ft,ve),j.copy(dt))},reset:function(){N=!1,X=null,j.set(-1,0,0,0)}}}function n(){let N=!1,dt=!1,X=null,j=null,xt=null;return{setReversed:function(mt){if(dt!==mt){let Ft=t.get("EXT_clip_control");dt?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);let ve=xt;xt=null,this.setClear(ve)}dt=mt},getReversed:function(){return dt},setTest:function(mt){mt?q(s.DEPTH_TEST):ot(s.DEPTH_TEST)},setMask:function(mt){X!==mt&&!N&&(s.depthMask(mt),X=mt)},setFunc:function(mt){if(dt&&(mt=Eg[mt]),j!==mt){switch(mt){case ga:s.depthFunc(s.NEVER);break;case xa:s.depthFunc(s.ALWAYS);break;case ya:s.depthFunc(s.LESS);break;case ji:s.depthFunc(s.LEQUAL);break;case va:s.depthFunc(s.EQUAL);break;case _a:s.depthFunc(s.GEQUAL);break;case ba:s.depthFunc(s.GREATER);break;case Ma:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=mt}},setLocked:function(mt){N=mt},setClear:function(mt){xt!==mt&&(dt&&(mt=1-mt),s.clearDepth(mt),xt=mt)},reset:function(){N=!1,X=null,j=null,xt=null,dt=!1}}}function i(){let N=!1,dt=null,X=null,j=null,xt=null,mt=null,Ft=null,ve=null,Le=null;return{setTest:function(ae){N||(ae?q(s.STENCIL_TEST):ot(s.STENCIL_TEST))},setMask:function(ae){dt!==ae&&!N&&(s.stencilMask(ae),dt=ae)},setFunc:function(ae,tn,Sn){(X!==ae||j!==tn||xt!==Sn)&&(s.stencilFunc(ae,tn,Sn),X=ae,j=tn,xt=Sn)},setOp:function(ae,tn,Sn){(mt!==ae||Ft!==tn||ve!==Sn)&&(s.stencilOp(ae,tn,Sn),mt=ae,Ft=tn,ve=Sn)},setLocked:function(ae){N=ae},setClear:function(ae){Le!==ae&&(s.clearStencil(ae),Le=ae)},reset:function(){N=!1,dt=null,X=null,j=null,xt=null,mt=null,Ft=null,ve=null,Le=null}}}let r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,f=[],g=null,x=!1,y=null,m=null,v=null,S=null,_=null,D=null,A=null,C=new Mt(0,0,0),I=0,E=!1,w=null,L=null,z=null,F=null,W=null,Q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,it=0,$=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec($)[1]),Y=it>=1):$.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Y=it>=2);let ut=null,yt={},Rt=s.getParameter(s.SCISSOR_BOX),Yt=s.getParameter(s.VIEWPORT),ne=new _e().fromArray(Rt),Z=new _e().fromArray(Yt);function b(N,dt,X,j){let xt=new Uint8Array(4),mt=s.createTexture();s.bindTexture(N,mt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ft=0;Ft<X;Ft++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(dt,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,xt):s.texImage2D(dt+Ft,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,xt);return mt}let G={};G[s.TEXTURE_2D]=b(s.TEXTURE_2D,s.TEXTURE_2D,1),G[s.TEXTURE_CUBE_MAP]=b(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[s.TEXTURE_2D_ARRAY]=b(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),G[s.TEXTURE_3D]=b(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),q(s.DEPTH_TEST),o.setFunc(ji),Zt(!1),jt(Mc),q(s.CULL_FACE),U(jn);function q(N){u[N]!==!0&&(s.enable(N),u[N]=!0)}function ot(N){u[N]!==!1&&(s.disable(N),u[N]=!1)}function lt(N,dt){return h[N]!==dt?(s.bindFramebuffer(N,dt),h[N]=dt,N===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=dt),N===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=dt),!0):!1}function Ct(N,dt){let X=f,j=!1;if(N){X=d.get(dt),X===void 0&&(X=[],d.set(dt,X));let xt=N.textures;if(X.length!==xt.length||X[0]!==s.COLOR_ATTACHMENT0){for(let mt=0,Ft=xt.length;mt<Ft;mt++)X[mt]=s.COLOR_ATTACHMENT0+mt;X.length=xt.length,j=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,j=!0);j&&s.drawBuffers(X)}function It(N){return g!==N?(s.useProgram(N),g=N,!0):!1}let Pt={[pi]:s.FUNC_ADD,[td]:s.FUNC_SUBTRACT,[ed]:s.FUNC_REVERSE_SUBTRACT};Pt[nd]=s.MIN,Pt[id]=s.MAX;let qt={[sd]:s.ZERO,[rd]:s.ONE,[od]:s.SRC_COLOR,[pa]:s.SRC_ALPHA,[dd]:s.SRC_ALPHA_SATURATE,[hd]:s.DST_COLOR,[ld]:s.DST_ALPHA,[ad]:s.ONE_MINUS_SRC_COLOR,[ma]:s.ONE_MINUS_SRC_ALPHA,[ud]:s.ONE_MINUS_DST_COLOR,[cd]:s.ONE_MINUS_DST_ALPHA,[fd]:s.CONSTANT_COLOR,[pd]:s.ONE_MINUS_CONSTANT_COLOR,[md]:s.CONSTANT_ALPHA,[gd]:s.ONE_MINUS_CONSTANT_ALPHA};function U(N,dt,X,j,xt,mt,Ft,ve,Le,ae){if(N===jn){x===!0&&(ot(s.BLEND),x=!1);return}if(x===!1&&(q(s.BLEND),x=!0),N!==Qu){if(N!==y||ae!==E){if((m!==pi||_!==pi)&&(s.blendEquation(s.FUNC_ADD),m=pi,_=pi),ae)switch(N){case qi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wc:s.blendFunc(s.ONE,s.ONE);break;case Sc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ec:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case qi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wc:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Sc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ec:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,S=null,D=null,A=null,C.set(0,0,0),I=0,y=N,E=ae}return}xt=xt||dt,mt=mt||X,Ft=Ft||j,(dt!==m||xt!==_)&&(s.blendEquationSeparate(Pt[dt],Pt[xt]),m=dt,_=xt),(X!==v||j!==S||mt!==D||Ft!==A)&&(s.blendFuncSeparate(qt[X],qt[j],qt[mt],qt[Ft]),v=X,S=j,D=mt,A=Ft),(ve.equals(C)===!1||Le!==I)&&(s.blendColor(ve.r,ve.g,ve.b,Le),C.copy(ve),I=Le),y=N,E=!1}function xe(N,dt){N.side===ye?ot(s.CULL_FACE):q(s.CULL_FACE);let X=N.side===Ve;dt&&(X=!X),Zt(X),N.blending===qi&&N.transparent===!1?U(jn):U(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let j=N.stencilWrite;a.setTest(j),j&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),de(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?q(s.SAMPLE_ALPHA_TO_COVERAGE):ot(s.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(N){w!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),w=N)}function jt(N){N!==Ju?(q(s.CULL_FACE),N!==L&&(N===Mc?s.cullFace(s.BACK):N===Ku?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ot(s.CULL_FACE),L=N}function Ut(N){N!==z&&(Y&&s.lineWidth(N),z=N)}function de(N,dt,X){N?(q(s.POLYGON_OFFSET_FILL),(F!==dt||W!==X)&&(s.polygonOffset(dt,X),F=dt,W=X)):ot(s.POLYGON_OFFSET_FILL)}function Lt(N){N?q(s.SCISSOR_TEST):ot(s.SCISSOR_TEST)}function R(N){N===void 0&&(N=s.TEXTURE0+Q-1),ut!==N&&(s.activeTexture(N),ut=N)}function M(N,dt,X){X===void 0&&(ut===null?X=s.TEXTURE0+Q-1:X=ut);let j=yt[X];j===void 0&&(j={type:void 0,texture:void 0},yt[X]=j),(j.type!==N||j.texture!==dt)&&(ut!==X&&(s.activeTexture(X),ut=X),s.bindTexture(N,dt||G[N]),j.type=N,j.texture=dt)}function B(){let N=yt[ut];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{s.texSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{s.texSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ft(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function vt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{s.texStorage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{s.texStorage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{s.texImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(){try{s.texImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function kt(N){ne.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),ne.copy(N))}function bt(N){Z.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function Qt(N,dt){let X=c.get(dt);X===void 0&&(X=new WeakMap,c.set(dt,X));let j=X.get(N);j===void 0&&(j=s.getUniformBlockIndex(dt,N.name),X.set(N,j))}function Wt(N,dt){let j=c.get(dt).get(N);l.get(dt)!==j&&(s.uniformBlockBinding(dt,j,N.__bindingPointIndex),l.set(dt,j))}function he(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ut=null,yt={},h={},d=new WeakMap,f=[],g=null,x=!1,y=null,m=null,v=null,S=null,_=null,D=null,A=null,C=new Mt(0,0,0),I=0,E=!1,w=null,L=null,z=null,F=null,W=null,ne.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:q,disable:ot,bindFramebuffer:lt,drawBuffers:Ct,useProgram:It,setBlending:U,setMaterial:xe,setFlipSided:Zt,setCullFace:jt,setLineWidth:Ut,setPolygonOffset:de,setScissorTest:Lt,activeTexture:R,bindTexture:M,unbindTexture:B,compressedTexImage2D:K,compressedTexImage3D:tt,texImage2D:_t,texImage3D:Nt,updateUBOMapping:Qt,uniformBlockBinding:Wt,texStorage2D:te,texStorage3D:st,texSubImage2D:J,texSubImage3D:Tt,compressedTexSubImage2D:ft,compressedTexSubImage3D:vt,scissor:kt,viewport:bt,reset:he}}function _h(s,t,e,n){let i=Ag(n);switch(e){case Fh:return s*t;case Vh:return s*t;case Gh:return s*t*2;case $l:return s*t/i.components*i.byteLength;case Xl:return s*t/i.components*i.byteLength;case Wh:return s*t*2/i.components*i.byteLength;case Yl:return s*t*2/i.components*i.byteLength;case Hh:return s*t*3/i.components*i.byteLength;case on:return s*t*4/i.components*i.byteLength;case ql:return s*t*4/i.components*i.byteLength;case Sr:case Er:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Tr:case Ar:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Aa:case Ca:return Math.max(s,16)*Math.max(t,8)/4;case Ta:case Ra:return Math.max(s,8)*Math.max(t,8)/2;case Ia:case Pa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case La:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Da:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ua:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Na:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ka:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Oa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case za:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Va:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ga:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case $a:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Xa:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Rr:case Ya:case qa:return Math.ceil(s/4)*Math.ceil(t/4)*16;case $h:case Za:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Ja:case Ka:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ag(s){switch(s){case kn:case Oh:return{byteLength:1,components:1};case Is:case zh:case Hs:return{byteLength:2,components:1};case Gl:case Wl:return{byteLength:2,components:4};case vi:case Vl:case pn:return{byteLength:4,components:1};case Bh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Rg(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return f?new OffscreenCanvas(R,M):Lr("canvas")}function x(R,M,B){let K=1,tt=Lt(R);if((tt.width>B||tt.height>B)&&(K=B/Math.max(tt.width,tt.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let J=Math.floor(K*tt.width),Tt=Math.floor(K*tt.height);h===void 0&&(h=g(J,Tt));let ft=M?g(J,Tt):h;return ft.width=J,ft.height=Tt,ft.getContext("2d").drawImage(R,0,0,J,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+J+"x"+Tt+")."),ft}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),R;return R}function y(R){return R.generateMipmaps}function m(R){s.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function S(R,M,B,K,tt=!1){if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let J=M;if(M===s.RED&&(B===s.FLOAT&&(J=s.R32F),B===s.HALF_FLOAT&&(J=s.R16F),B===s.UNSIGNED_BYTE&&(J=s.R8)),M===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.R8UI),B===s.UNSIGNED_SHORT&&(J=s.R16UI),B===s.UNSIGNED_INT&&(J=s.R32UI),B===s.BYTE&&(J=s.R8I),B===s.SHORT&&(J=s.R16I),B===s.INT&&(J=s.R32I)),M===s.RG&&(B===s.FLOAT&&(J=s.RG32F),B===s.HALF_FLOAT&&(J=s.RG16F),B===s.UNSIGNED_BYTE&&(J=s.RG8)),M===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.RG8UI),B===s.UNSIGNED_SHORT&&(J=s.RG16UI),B===s.UNSIGNED_INT&&(J=s.RG32UI),B===s.BYTE&&(J=s.RG8I),B===s.SHORT&&(J=s.RG16I),B===s.INT&&(J=s.RG32I)),M===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.RGB8UI),B===s.UNSIGNED_SHORT&&(J=s.RGB16UI),B===s.UNSIGNED_INT&&(J=s.RGB32UI),B===s.BYTE&&(J=s.RGB8I),B===s.SHORT&&(J=s.RGB16I),B===s.INT&&(J=s.RGB32I)),M===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),B===s.UNSIGNED_INT&&(J=s.RGBA32UI),B===s.BYTE&&(J=s.RGBA8I),B===s.SHORT&&(J=s.RGBA16I),B===s.INT&&(J=s.RGBA32I)),M===s.RGB&&B===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),M===s.RGBA){let Tt=tt?io:ee.getTransfer(K);B===s.FLOAT&&(J=s.RGBA32F),B===s.HALF_FLOAT&&(J=s.RGBA16F),B===s.UNSIGNED_BYTE&&(J=Tt===le?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(R,M){let B;return R?M===null||M===vi||M===es?B=s.DEPTH24_STENCIL8:M===pn?B=s.DEPTH32F_STENCIL8:M===Is&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===vi||M===es?B=s.DEPTH_COMPONENT24:M===pn?B=s.DEPTH_COMPONENT32F:M===Is&&(B=s.DEPTH_COMPONENT16),B}function D(R,M){return y(R)===!0||R.isFramebufferTexture&&R.minFilter!==Be&&R.minFilter!==fn?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function A(R){let M=R.target;M.removeEventListener("dispose",A),I(M),M.isVideoTexture&&u.delete(M)}function C(R){let M=R.target;M.removeEventListener("dispose",C),w(M)}function I(R){let M=n.get(R);if(M.__webglInit===void 0)return;let B=R.source,K=d.get(B);if(K){let tt=K[M.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&E(R),Object.keys(K).length===0&&d.delete(B)}n.remove(R)}function E(R){let M=n.get(R);s.deleteTexture(M.__webglTexture);let B=R.source,K=d.get(B);delete K[M.__cacheKey],o.memory.textures--}function w(R){let M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(M.__webglFramebuffer[K]))for(let tt=0;tt<M.__webglFramebuffer[K].length;tt++)s.deleteFramebuffer(M.__webglFramebuffer[K][tt]);else s.deleteFramebuffer(M.__webglFramebuffer[K]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[K])}else{if(Array.isArray(M.__webglFramebuffer))for(let K=0;K<M.__webglFramebuffer.length;K++)s.deleteFramebuffer(M.__webglFramebuffer[K]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let K=0;K<M.__webglColorRenderbuffer.length;K++)M.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[K]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let B=R.textures;for(let K=0,tt=B.length;K<tt;K++){let J=n.get(B[K]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(B[K])}n.remove(R)}let L=0;function z(){L=0}function F(){let R=L;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),L+=1,R}function W(R){let M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function Q(R,M){let B=n.get(R);if(R.isVideoTexture&&Ut(R),R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){let K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(B,R,M);return}}e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+M)}function Y(R,M){let B=n.get(R);if(R.version>0&&B.__version!==R.version){Z(B,R,M);return}e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+M)}function it(R,M){let B=n.get(R);if(R.version>0&&B.__version!==R.version){Z(B,R,M);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+M)}function $(R,M){let B=n.get(R);if(R.version>0&&B.__version!==R.version){b(B,R,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+M)}let ut={[yi]:s.REPEAT,[gi]:s.CLAMP_TO_EDGE,[Ea]:s.MIRRORED_REPEAT},yt={[Be]:s.NEAREST,[Td]:s.NEAREST_MIPMAP_NEAREST,[Xs]:s.NEAREST_MIPMAP_LINEAR,[fn]:s.LINEAR,[Lo]:s.LINEAR_MIPMAP_NEAREST,[xi]:s.LINEAR_MIPMAP_LINEAR},Rt={[Id]:s.NEVER,[kd]:s.ALWAYS,[Pd]:s.LESS,[Yh]:s.LEQUAL,[Ld]:s.EQUAL,[Nd]:s.GEQUAL,[Dd]:s.GREATER,[Ud]:s.NOTEQUAL};function Yt(R,M){if(M.type===pn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===fn||M.magFilter===Lo||M.magFilter===Xs||M.magFilter===xi||M.minFilter===fn||M.minFilter===Lo||M.minFilter===Xs||M.minFilter===xi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,ut[M.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,ut[M.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,ut[M.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,yt[M.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,yt[M.minFilter]),M.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Rt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Be||M.minFilter!==Xs&&M.minFilter!==xi||M.type===pn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ne(R,M){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",A));let K=M.source,tt=d.get(K);tt===void 0&&(tt={},d.set(K,tt));let J=W(M);if(J!==R.__cacheKey){tt[J]===void 0&&(tt[J]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),tt[J].usedTimes++;let Tt=tt[R.__cacheKey];Tt!==void 0&&(tt[R.__cacheKey].usedTimes--,Tt.usedTimes===0&&E(M)),R.__cacheKey=J,R.__webglTexture=tt[J].texture}return B}function Z(R,M,B){let K=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=s.TEXTURE_3D);let tt=ne(R,M),J=M.source;e.bindTexture(K,R.__webglTexture,s.TEXTURE0+B);let Tt=n.get(J);if(J.version!==Tt.__version||tt===!0){e.activeTexture(s.TEXTURE0+B);let ft=ee.getPrimaries(ee.workingColorSpace),vt=M.colorSpace===Kn?null:ee.getPrimaries(M.colorSpace),te=M.colorSpace===Kn||ft===vt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let st=x(M.image,!1,i.maxTextureSize);st=de(M,st);let _t=r.convert(M.format,M.colorSpace),Nt=r.convert(M.type),kt=S(M.internalFormat,_t,Nt,M.colorSpace,M.isVideoTexture);Yt(K,M);let bt,Qt=M.mipmaps,Wt=M.isVideoTexture!==!0,he=Tt.__version===void 0||tt===!0,N=J.dataReady,dt=D(M,st);if(M.isDepthTexture)kt=_(M.format===ns,M.type),he&&(Wt?e.texStorage2D(s.TEXTURE_2D,1,kt,st.width,st.height):e.texImage2D(s.TEXTURE_2D,0,kt,st.width,st.height,0,_t,Nt,null));else if(M.isDataTexture)if(Qt.length>0){Wt&&he&&e.texStorage2D(s.TEXTURE_2D,dt,kt,Qt[0].width,Qt[0].height);for(let X=0,j=Qt.length;X<j;X++)bt=Qt[X],Wt?N&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,bt.width,bt.height,_t,Nt,bt.data):e.texImage2D(s.TEXTURE_2D,X,kt,bt.width,bt.height,0,_t,Nt,bt.data);M.generateMipmaps=!1}else Wt?(he&&e.texStorage2D(s.TEXTURE_2D,dt,kt,st.width,st.height),N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,st.width,st.height,_t,Nt,st.data)):e.texImage2D(s.TEXTURE_2D,0,kt,st.width,st.height,0,_t,Nt,st.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Wt&&he&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,kt,Qt[0].width,Qt[0].height,st.depth);for(let X=0,j=Qt.length;X<j;X++)if(bt=Qt[X],M.format!==on)if(_t!==null)if(Wt){if(N)if(M.layerUpdates.size>0){let xt=_h(bt.width,bt.height,M.format,M.type);for(let mt of M.layerUpdates){let Ft=bt.data.subarray(mt*xt/bt.data.BYTES_PER_ELEMENT,(mt+1)*xt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,mt,bt.width,bt.height,1,_t,Ft)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,bt.width,bt.height,st.depth,_t,bt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,kt,bt.width,bt.height,st.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,bt.width,bt.height,st.depth,_t,Nt,bt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,kt,bt.width,bt.height,st.depth,0,_t,Nt,bt.data)}else{Wt&&he&&e.texStorage2D(s.TEXTURE_2D,dt,kt,Qt[0].width,Qt[0].height);for(let X=0,j=Qt.length;X<j;X++)bt=Qt[X],M.format!==on?_t!==null?Wt?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,bt.width,bt.height,_t,bt.data):e.compressedTexImage2D(s.TEXTURE_2D,X,kt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?N&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,bt.width,bt.height,_t,Nt,bt.data):e.texImage2D(s.TEXTURE_2D,X,kt,bt.width,bt.height,0,_t,Nt,bt.data)}else if(M.isDataArrayTexture)if(Wt){if(he&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,kt,st.width,st.height,st.depth),N)if(M.layerUpdates.size>0){let X=_h(st.width,st.height,M.format,M.type);for(let j of M.layerUpdates){let xt=st.data.subarray(j*X/st.data.BYTES_PER_ELEMENT,(j+1)*X/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,st.width,st.height,1,_t,Nt,xt)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,_t,Nt,st.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,kt,st.width,st.height,st.depth,0,_t,Nt,st.data);else if(M.isData3DTexture)Wt?(he&&e.texStorage3D(s.TEXTURE_3D,dt,kt,st.width,st.height,st.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,_t,Nt,st.data)):e.texImage3D(s.TEXTURE_3D,0,kt,st.width,st.height,st.depth,0,_t,Nt,st.data);else if(M.isFramebufferTexture){if(he)if(Wt)e.texStorage2D(s.TEXTURE_2D,dt,kt,st.width,st.height);else{let X=st.width,j=st.height;for(let xt=0;xt<dt;xt++)e.texImage2D(s.TEXTURE_2D,xt,kt,X,j,0,_t,Nt,null),X>>=1,j>>=1}}else if(Qt.length>0){if(Wt&&he){let X=Lt(Qt[0]);e.texStorage2D(s.TEXTURE_2D,dt,kt,X.width,X.height)}for(let X=0,j=Qt.length;X<j;X++)bt=Qt[X],Wt?N&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,_t,Nt,bt):e.texImage2D(s.TEXTURE_2D,X,kt,_t,Nt,bt);M.generateMipmaps=!1}else if(Wt){if(he){let X=Lt(st);e.texStorage2D(s.TEXTURE_2D,dt,kt,X.width,X.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t,Nt,st)}else e.texImage2D(s.TEXTURE_2D,0,kt,_t,Nt,st);y(M)&&m(K),Tt.__version=J.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function b(R,M,B){if(M.image.length!==6)return;let K=ne(R,M),tt=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+B);let J=n.get(tt);if(tt.version!==J.__version||K===!0){e.activeTexture(s.TEXTURE0+B);let Tt=ee.getPrimaries(ee.workingColorSpace),ft=M.colorSpace===Kn?null:ee.getPrimaries(M.colorSpace),vt=M.colorSpace===Kn||Tt===ft?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let te=M.isCompressedTexture||M.image[0].isCompressedTexture,st=M.image[0]&&M.image[0].isDataTexture,_t=[];for(let j=0;j<6;j++)!te&&!st?_t[j]=x(M.image[j],!0,i.maxCubemapSize):_t[j]=st?M.image[j].image:M.image[j],_t[j]=de(M,_t[j]);let Nt=_t[0],kt=r.convert(M.format,M.colorSpace),bt=r.convert(M.type),Qt=S(M.internalFormat,kt,bt,M.colorSpace),Wt=M.isVideoTexture!==!0,he=J.__version===void 0||K===!0,N=tt.dataReady,dt=D(M,Nt);Yt(s.TEXTURE_CUBE_MAP,M);let X;if(te){Wt&&he&&e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,Qt,Nt.width,Nt.height);for(let j=0;j<6;j++){X=_t[j].mipmaps;for(let xt=0;xt<X.length;xt++){let mt=X[xt];M.format!==on?kt!==null?Wt?N&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,0,0,mt.width,mt.height,kt,mt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,Qt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,0,0,mt.width,mt.height,kt,bt,mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,Qt,mt.width,mt.height,0,kt,bt,mt.data)}}}else{if(X=M.mipmaps,Wt&&he){X.length>0&&dt++;let j=Lt(_t[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,Qt,j.width,j.height)}for(let j=0;j<6;j++)if(st){Wt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,_t[j].width,_t[j].height,kt,bt,_t[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Qt,_t[j].width,_t[j].height,0,kt,bt,_t[j].data);for(let xt=0;xt<X.length;xt++){let Ft=X[xt].image[j].image;Wt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,0,0,Ft.width,Ft.height,kt,bt,Ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,Qt,Ft.width,Ft.height,0,kt,bt,Ft.data)}}else{Wt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,kt,bt,_t[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Qt,kt,bt,_t[j]);for(let xt=0;xt<X.length;xt++){let mt=X[xt];Wt?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,0,0,kt,bt,mt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,Qt,kt,bt,mt.image[j])}}}y(M)&&m(s.TEXTURE_CUBE_MAP),J.__version=tt.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function G(R,M,B,K,tt,J){let Tt=r.convert(B.format,B.colorSpace),ft=r.convert(B.type),vt=S(B.internalFormat,Tt,ft,B.colorSpace),te=n.get(M),st=n.get(B);if(st.__renderTarget=M,!te.__hasExternalTextures){let _t=Math.max(1,M.width>>J),Nt=Math.max(1,M.height>>J);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,J,vt,_t,Nt,M.depth,0,Tt,ft,null):e.texImage2D(tt,J,vt,_t,Nt,0,Tt,ft,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),jt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,tt,st.__webglTexture,0,Zt(M)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,tt,st.__webglTexture,J),e.bindFramebuffer(s.FRAMEBUFFER,null)}function q(R,M,B){if(s.bindRenderbuffer(s.RENDERBUFFER,R),M.depthBuffer){let K=M.depthTexture,tt=K&&K.isDepthTexture?K.type:null,J=_(M.stencilBuffer,tt),Tt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ft=Zt(M);jt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ft,J,M.width,M.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,ft,J,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,J,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Tt,s.RENDERBUFFER,R)}else{let K=M.textures;for(let tt=0;tt<K.length;tt++){let J=K[tt],Tt=r.convert(J.format,J.colorSpace),ft=r.convert(J.type),vt=S(J.internalFormat,Tt,ft,J.colorSpace),te=Zt(M);B&&jt(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,te,vt,M.width,M.height):jt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,vt,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,vt,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ot(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let K=n.get(M.depthTexture);K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Q(M.depthTexture,0);let tt=K.__webglTexture,J=Zt(M);if(M.depthTexture.format===Zi)jt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(M.depthTexture.format===ns)jt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function lt(R){let M=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){let K=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),K){let tt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,K.removeEventListener("dispose",tt)};K.addEventListener("dispose",tt),M.__depthDisposeCallback=tt}M.__boundDepthTexture=K}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ot(M.__webglFramebuffer,R)}else if(B){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]===void 0)M.__webglDepthbuffer[K]=s.createRenderbuffer(),q(M.__webglDepthbuffer[K],R,!1);else{let tt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,J)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),q(M.__webglDepthbuffer,R,!1);else{let K=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ct(R,M,B){let K=n.get(R);M!==void 0&&G(K.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&lt(R)}function It(R){let M=R.texture,B=n.get(R),K=n.get(M);R.addEventListener("dispose",C);let tt=R.textures,J=R.isWebGLCubeRenderTarget===!0,Tt=tt.length>1;if(Tt||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=M.version,o.memory.textures++),J){B.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[ft]=[];for(let vt=0;vt<M.mipmaps.length;vt++)B.__webglFramebuffer[ft][vt]=s.createFramebuffer()}else B.__webglFramebuffer[ft]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let ft=0;ft<M.mipmaps.length;ft++)B.__webglFramebuffer[ft]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(Tt)for(let ft=0,vt=tt.length;ft<vt;ft++){let te=n.get(tt[ft]);te.__webglTexture===void 0&&(te.__webglTexture=s.createTexture(),o.memory.textures++)}if(R.samples>0&&jt(R)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ft=0;ft<tt.length;ft++){let vt=tt[ft];B.__webglColorRenderbuffer[ft]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[ft]);let te=r.convert(vt.format,vt.colorSpace),st=r.convert(vt.type),_t=S(vt.internalFormat,te,st,vt.colorSpace,R.isXRRenderTarget===!0),Nt=Zt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,_t,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,B.__webglColorRenderbuffer[ft])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),q(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Yt(s.TEXTURE_CUBE_MAP,M);for(let ft=0;ft<6;ft++)if(M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)G(B.__webglFramebuffer[ft][vt],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,vt);else G(B.__webglFramebuffer[ft],R,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);y(M)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ft=0,vt=tt.length;ft<vt;ft++){let te=tt[ft],st=n.get(te);e.bindTexture(s.TEXTURE_2D,st.__webglTexture),Yt(s.TEXTURE_2D,te),G(B.__webglFramebuffer,R,te,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,0),y(te)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let ft=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ft=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ft,K.__webglTexture),Yt(ft,M),M.mipmaps&&M.mipmaps.length>0)for(let vt=0;vt<M.mipmaps.length;vt++)G(B.__webglFramebuffer[vt],R,M,s.COLOR_ATTACHMENT0,ft,vt);else G(B.__webglFramebuffer,R,M,s.COLOR_ATTACHMENT0,ft,0);y(M)&&m(ft),e.unbindTexture()}R.depthBuffer&&lt(R)}function Pt(R){let M=R.textures;for(let B=0,K=M.length;B<K;B++){let tt=M[B];if(y(tt)){let J=v(R),Tt=n.get(tt).__webglTexture;e.bindTexture(J,Tt),m(J),e.unbindTexture()}}}let qt=[],U=[];function xe(R){if(R.samples>0){if(jt(R)===!1){let M=R.textures,B=R.width,K=R.height,tt=s.COLOR_BUFFER_BIT,J=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Tt=n.get(R),ft=M.length>1;if(ft)for(let vt=0;vt<M.length;vt++)e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let vt=0;vt<M.length;vt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),ft){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);let te=n.get(M[vt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,te,0)}s.blitFramebuffer(0,0,B,K,0,0,B,K,tt,s.NEAREST),l===!0&&(qt.length=0,U.length=0,qt.push(s.COLOR_ATTACHMENT0+vt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(qt.push(J),U.push(J),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,U)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,qt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ft)for(let vt=0;vt<M.length;vt++){e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);let te=n.get(M[vt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,te,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let M=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Zt(R){return Math.min(i.maxSamples,R.samples)}function jt(R){let M=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ut(R){let M=o.render.frame;u.get(R)!==M&&(u.set(R,M),R.update())}function de(R,M){let B=R.colorSpace,K=R.format,tt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==ls&&B!==Kn&&(ee.getTransfer(B)===le?(K!==on||tt!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function Lt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=it,this.setTextureCube=$,this.rebindTextures=Ct,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Pt,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=G,this.useMultisampledRTT=jt}function Cg(s,t){function e(n,i=Kn){let r,o=ee.getTransfer(i);if(n===kn)return s.UNSIGNED_BYTE;if(n===Gl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Wl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Bh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Oh)return s.BYTE;if(n===zh)return s.SHORT;if(n===Is)return s.UNSIGNED_SHORT;if(n===Vl)return s.INT;if(n===vi)return s.UNSIGNED_INT;if(n===pn)return s.FLOAT;if(n===Hs)return s.HALF_FLOAT;if(n===Fh)return s.ALPHA;if(n===Hh)return s.RGB;if(n===on)return s.RGBA;if(n===Vh)return s.LUMINANCE;if(n===Gh)return s.LUMINANCE_ALPHA;if(n===Zi)return s.DEPTH_COMPONENT;if(n===ns)return s.DEPTH_STENCIL;if(n===$l)return s.RED;if(n===Xl)return s.RED_INTEGER;if(n===Wh)return s.RG;if(n===Yl)return s.RG_INTEGER;if(n===ql)return s.RGBA_INTEGER;if(n===Sr||n===Er||n===Tr||n===Ar)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ta||n===Aa||n===Ra||n===Ca)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ta)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Aa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ca)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ia||n===Pa||n===La)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ia||n===Pa)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===La)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Da||n===Ua||n===Na||n===ka||n===Oa||n===za||n===Ba||n===Fa||n===Ha||n===Va||n===Ga||n===Wa||n===$a||n===Xa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Da)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ua)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Na)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ka)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===za)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ha)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Va)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ga)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$a)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xa)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rr||n===Ya||n===qa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Rr)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ya)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$h||n===Za||n===Ja||n===Ka)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Rr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Za)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ja)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ka)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var pl=class extends be{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Xt=class extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ig={type:"move"},As=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let y=e.getJointPose(x,n),m=this._getHandJoint(c,x);y!==null&&(m.matrix.fromArray(y.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=y.radius),m.visible=y!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ig)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Xt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Pg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lg=`
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

}`,ml=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new Ge,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new gn({vertexShader:Pg,fragmentShader:Lg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new et(new Ee(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},gl=class extends ei{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null,x=new ml,y=e.getContextAttributes(),m=null,v=null,S=[],_=[],D=new ct,A=null,C=new be;C.viewport=new _e;let I=new be;I.viewport=new _e;let E=[C,I],w=new pl,L=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let b=S[Z];return b===void 0&&(b=new As,S[Z]=b),b.getTargetRaySpace()},this.getControllerGrip=function(Z){let b=S[Z];return b===void 0&&(b=new As,S[Z]=b),b.getGripSpace()},this.getHand=function(Z){let b=S[Z];return b===void 0&&(b=new As,S[Z]=b),b.getHandSpace()};function F(Z){let b=_.indexOf(Z.inputSource);if(b===-1)return;let G=S[b];G!==void 0&&(G.update(Z.inputSource,Z.frame,c||o),G.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Q);for(let Z=0;Z<S.length;Z++){let b=_[Z];b!==null&&(_[Z]=null,S[Z].disconnect(b))}L=null,z=null,x.reset(),t.setRenderTarget(m),f=null,d=null,h=null,i=null,v=null,ne.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Q),y.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(D),i.renderState.layers===void 0){let b={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,b),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new On(f.framebufferWidth,f.framebufferHeight,{format:on,type:kn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil})}else{let b=null,G=null,q=null;y.depth&&(q=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,b=y.stencil?ns:Zi,G=y.stencil?es:vi);let ot={colorFormat:e.RGBA8,depthFormat:q,scaleFactor:r};h=new XRWebGLBinding(i,e),d=h.createProjectionLayer(ot),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new On(d.textureWidth,d.textureHeight,{format:on,type:kn,depthTexture:new Hr(d.textureWidth,d.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,b),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q(Z){for(let b=0;b<Z.removed.length;b++){let G=Z.removed[b],q=_.indexOf(G);q>=0&&(_[q]=null,S[q].disconnect(G))}for(let b=0;b<Z.added.length;b++){let G=Z.added[b],q=_.indexOf(G);if(q===-1){for(let lt=0;lt<S.length;lt++)if(lt>=_.length){_.push(G),q=lt;break}else if(_[lt]===null){_[lt]=G,q=lt;break}if(q===-1)break}let ot=S[q];ot&&ot.connect(G)}}let Y=new P,it=new P;function $(Z,b,G){Y.setFromMatrixPosition(b.matrixWorld),it.setFromMatrixPosition(G.matrixWorld);let q=Y.distanceTo(it),ot=b.projectionMatrix.elements,lt=G.projectionMatrix.elements,Ct=ot[14]/(ot[10]-1),It=ot[14]/(ot[10]+1),Pt=(ot[9]+1)/ot[5],qt=(ot[9]-1)/ot[5],U=(ot[8]-1)/ot[0],xe=(lt[8]+1)/lt[0],Zt=Ct*U,jt=Ct*xe,Ut=q/(-U+xe),de=Ut*-U;if(b.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(de),Z.translateZ(Ut),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),ot[10]===-1)Z.projectionMatrix.copy(b.projectionMatrix),Z.projectionMatrixInverse.copy(b.projectionMatrixInverse);else{let Lt=Ct+Ut,R=It+Ut,M=Zt-de,B=jt+(q-de),K=Pt*It/R*Lt,tt=qt*It/R*Lt;Z.projectionMatrix.makePerspective(M,B,K,tt,Lt,R),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ut(Z,b){b===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(b.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let b=Z.near,G=Z.far;x.texture!==null&&(x.depthNear>0&&(b=x.depthNear),x.depthFar>0&&(G=x.depthFar)),w.near=I.near=C.near=b,w.far=I.far=C.far=G,(L!==w.near||z!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),L=w.near,z=w.far),C.layers.mask=Z.layers.mask|2,I.layers.mask=Z.layers.mask|4,w.layers.mask=C.layers.mask|I.layers.mask;let q=Z.parent,ot=w.cameras;ut(w,q);for(let lt=0;lt<ot.length;lt++)ut(ot[lt],q);ot.length===2?$(w,C,I):w.projectionMatrix.copy(C.projectionMatrix),yt(Z,w,q)};function yt(Z,b,G){G===null?Z.matrix.copy(b.matrixWorld):(Z.matrix.copy(G.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(b.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(b.projectionMatrix),Z.projectionMatrixInverse.copy(b.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=tl*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(w)};let Rt=null;function Yt(Z,b){if(u=b.getViewerPose(c||o),g=b,u!==null){let G=u.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let q=!1;G.length!==w.cameras.length&&(w.cameras.length=0,q=!0);for(let lt=0;lt<G.length;lt++){let Ct=G[lt],It=null;if(f!==null)It=f.getViewport(Ct);else{let qt=h.getViewSubImage(d,Ct);It=qt.viewport,lt===0&&(t.setRenderTargetTextures(v,qt.colorTexture,d.ignoreDepthValues?void 0:qt.depthStencilTexture),t.setRenderTarget(v))}let Pt=E[lt];Pt===void 0&&(Pt=new be,Pt.layers.enable(lt),Pt.viewport=new _e,E[lt]=Pt),Pt.matrix.fromArray(Ct.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray(Ct.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(It.x,It.y,It.width,It.height),lt===0&&(w.matrix.copy(Pt.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),q===!0&&w.cameras.push(Pt)}let ot=i.enabledFeatures;if(ot&&ot.includes("depth-sensing")){let lt=h.getDepthInformation(G[0]);lt&&lt.isValid&&lt.texture&&x.init(t,lt,i.renderState)}}for(let G=0;G<S.length;G++){let q=_[G],ot=S[G];q!==null&&ot!==void 0&&ot.update(q,b,c||o)}Rt&&Rt(Z,b),b.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:b}),g=null}let ne=new Kh;ne.setAnimationLoop(Yt),this.setAnimationLoop=function(Z){Rt=Z},this.dispose=function(){}}},di=new Ke,Dg=new se;function Ug(s,t){function e(y,m){y.matrixAutoUpdate===!0&&y.updateMatrix(),m.value.copy(y.matrix)}function n(y,m){m.color.getRGB(y.fogColor.value,Jh(s)),m.isFog?(y.fogNear.value=m.near,y.fogFar.value=m.far):m.isFogExp2&&(y.fogDensity.value=m.density)}function i(y,m,v,S,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(y,m):m.isMeshToonMaterial?(r(y,m),h(y,m)):m.isMeshPhongMaterial?(r(y,m),u(y,m)):m.isMeshStandardMaterial?(r(y,m),d(y,m),m.isMeshPhysicalMaterial&&f(y,m,_)):m.isMeshMatcapMaterial?(r(y,m),g(y,m)):m.isMeshDepthMaterial?r(y,m):m.isMeshDistanceMaterial?(r(y,m),x(y,m)):m.isMeshNormalMaterial?r(y,m):m.isLineBasicMaterial?(o(y,m),m.isLineDashedMaterial&&a(y,m)):m.isPointsMaterial?l(y,m,v,S):m.isSpriteMaterial?c(y,m):m.isShadowMaterial?(y.color.value.copy(m.color),y.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(y,m){y.opacity.value=m.opacity,m.color&&y.diffuse.value.copy(m.color),m.emissive&&y.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(y.map.value=m.map,e(m.map,y.mapTransform)),m.alphaMap&&(y.alphaMap.value=m.alphaMap,e(m.alphaMap,y.alphaMapTransform)),m.bumpMap&&(y.bumpMap.value=m.bumpMap,e(m.bumpMap,y.bumpMapTransform),y.bumpScale.value=m.bumpScale,m.side===Ve&&(y.bumpScale.value*=-1)),m.normalMap&&(y.normalMap.value=m.normalMap,e(m.normalMap,y.normalMapTransform),y.normalScale.value.copy(m.normalScale),m.side===Ve&&y.normalScale.value.negate()),m.displacementMap&&(y.displacementMap.value=m.displacementMap,e(m.displacementMap,y.displacementMapTransform),y.displacementScale.value=m.displacementScale,y.displacementBias.value=m.displacementBias),m.emissiveMap&&(y.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,y.emissiveMapTransform)),m.specularMap&&(y.specularMap.value=m.specularMap,e(m.specularMap,y.specularMapTransform)),m.alphaTest>0&&(y.alphaTest.value=m.alphaTest);let v=t.get(m),S=v.envMap,_=v.envMapRotation;S&&(y.envMap.value=S,di.copy(_),di.x*=-1,di.y*=-1,di.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),y.envMapRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(di)),y.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=m.reflectivity,y.ior.value=m.ior,y.refractionRatio.value=m.refractionRatio),m.lightMap&&(y.lightMap.value=m.lightMap,y.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,y.lightMapTransform)),m.aoMap&&(y.aoMap.value=m.aoMap,y.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,y.aoMapTransform))}function o(y,m){y.diffuse.value.copy(m.color),y.opacity.value=m.opacity,m.map&&(y.map.value=m.map,e(m.map,y.mapTransform))}function a(y,m){y.dashSize.value=m.dashSize,y.totalSize.value=m.dashSize+m.gapSize,y.scale.value=m.scale}function l(y,m,v,S){y.diffuse.value.copy(m.color),y.opacity.value=m.opacity,y.size.value=m.size*v,y.scale.value=S*.5,m.map&&(y.map.value=m.map,e(m.map,y.uvTransform)),m.alphaMap&&(y.alphaMap.value=m.alphaMap,e(m.alphaMap,y.alphaMapTransform)),m.alphaTest>0&&(y.alphaTest.value=m.alphaTest)}function c(y,m){y.diffuse.value.copy(m.color),y.opacity.value=m.opacity,y.rotation.value=m.rotation,m.map&&(y.map.value=m.map,e(m.map,y.mapTransform)),m.alphaMap&&(y.alphaMap.value=m.alphaMap,e(m.alphaMap,y.alphaMapTransform)),m.alphaTest>0&&(y.alphaTest.value=m.alphaTest)}function u(y,m){y.specular.value.copy(m.specular),y.shininess.value=Math.max(m.shininess,1e-4)}function h(y,m){m.gradientMap&&(y.gradientMap.value=m.gradientMap)}function d(y,m){y.metalness.value=m.metalness,m.metalnessMap&&(y.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,y.metalnessMapTransform)),y.roughness.value=m.roughness,m.roughnessMap&&(y.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,y.roughnessMapTransform)),m.envMap&&(y.envMapIntensity.value=m.envMapIntensity)}function f(y,m,v){y.ior.value=m.ior,m.sheen>0&&(y.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),y.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(y.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,y.sheenColorMapTransform)),m.sheenRoughnessMap&&(y.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,y.sheenRoughnessMapTransform))),m.clearcoat>0&&(y.clearcoat.value=m.clearcoat,y.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(y.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,y.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(y.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ve&&y.clearcoatNormalScale.value.negate())),m.dispersion>0&&(y.dispersion.value=m.dispersion),m.iridescence>0&&(y.iridescence.value=m.iridescence,y.iridescenceIOR.value=m.iridescenceIOR,y.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(y.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,y.iridescenceMapTransform)),m.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),m.transmission>0&&(y.transmission.value=m.transmission,y.transmissionSamplerMap.value=v.texture,y.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(y.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,y.transmissionMapTransform)),y.thickness.value=m.thickness,m.thicknessMap&&(y.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=m.attenuationDistance,y.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(y.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(y.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=m.specularIntensity,y.specularColor.value.copy(m.specularColor),m.specularColorMap&&(y.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,y.specularColorMapTransform)),m.specularIntensityMap&&(y.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,y.specularIntensityMapTransform))}function g(y,m){m.matcap&&(y.matcap.value=m.matcap)}function x(y,m){let v=t.get(m).light;y.referencePosition.value.setFromMatrixPosition(v.matrixWorld),y.nearDistance.value=v.shadow.camera.near,y.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ng(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){let _=S.program;n.uniformBlockBinding(v,_)}function c(v,S){let _=i[v.id];_===void 0&&(g(v),_=u(v),i[v.id]=_,v.addEventListener("dispose",y));let D=S.program;n.updateUBOMapping(v,D);let A=t.render.frame;r[v.id]!==A&&(d(v),r[v.id]=A)}function u(v){let S=h();v.__bindingPointIndex=S;let _=s.createBuffer(),D=v.__size,A=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,D,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,_),_}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let S=i[v.id],_=v.uniforms,D=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let A=0,C=_.length;A<C;A++){let I=Array.isArray(_[A])?_[A]:[_[A]];for(let E=0,w=I.length;E<w;E++){let L=I[E];if(f(L,A,E,D)===!0){let z=L.__offset,F=Array.isArray(L.value)?L.value:[L.value],W=0;for(let Q=0;Q<F.length;Q++){let Y=F[Q],it=x(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,z+W,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,W),W+=it.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,S,_,D){let A=v.value,C=S+"_"+_;if(D[C]===void 0)return typeof A=="number"||typeof A=="boolean"?D[C]=A:D[C]=A.clone(),!0;{let I=D[C];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return D[C]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(v){let S=v.uniforms,_=0,D=16;for(let C=0,I=S.length;C<I;C++){let E=Array.isArray(S[C])?S[C]:[S[C]];for(let w=0,L=E.length;w<L;w++){let z=E[w],F=Array.isArray(z.value)?z.value:[z.value];for(let W=0,Q=F.length;W<Q;W++){let Y=F[W],it=x(Y),$=_%D,ut=$%it.boundary,yt=$+ut;_+=ut,yt!==0&&D-yt<it.storage&&(_+=D-yt),z.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=it.storage}}}let A=_%D;return A>0&&(_+=D-A),v.__size=_,v.__cache={},this}function x(v){let S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),S}function y(v){let S=v.target;S.removeEventListener("dispose",y);let _=o.indexOf(S.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function m(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}var xn=class{constructor(t={}){let{canvas:e=zd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),y=null,m=null,v=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ze,this.toneMapping=Qn,this.toneMappingExposure=1;let _=this,D=!1,A=0,C=0,I=null,E=-1,w=null,L=new _e,z=new _e,F=null,W=new Mt(0),Q=0,Y=e.width,it=e.height,$=1,ut=null,yt=null,Rt=new _e(0,0,Y,it),Yt=new _e(0,0,Y,it),ne=!1,Z=new Ds,b=!1,G=!1,q=new se,ot=new se,lt=new P,Ct=new _e,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pt=!1;function qt(){return I===null?$:1}let U=n;function xe(T,k){return e.getContext(T,k)}try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),U===null){let k="webgl2";if(U=xe(k,T),U===null)throw xe(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Zt,jt,Ut,de,Lt,R,M,B,K,tt,J,Tt,ft,vt,te,st,_t,Nt,kt,bt,Qt,Wt,he,N;function dt(){Zt=new Km(U),Zt.init(),Wt=new Cg(U,Zt),jt=new $m(U,Zt,t,Wt),Ut=new Tg(U,Zt),jt.reverseDepthBuffer&&d&&Ut.buffers.depth.setReversed(!0),de=new t0(U),Lt=new fg,R=new Rg(U,Zt,Ut,Lt,jt,Wt,de),M=new Ym(_),B=new Jm(_),K=new af(U),he=new Gm(U,K),tt=new jm(U,K,de,he),J=new n0(U,tt,K,de),kt=new e0(U,jt,R),st=new Xm(Lt),Tt=new dg(_,M,B,Zt,jt,he,st),ft=new Ug(_,Lt),vt=new mg,te=new bg(Zt),Nt=new Vm(_,M,B,Ut,J,f,l),_t=new Sg(_,J,jt),N=new Ng(U,de,jt,Ut),bt=new Wm(U,Zt,de),Qt=new Qm(U,Zt,de),de.programs=Tt.programs,_.capabilities=jt,_.extensions=Zt,_.properties=Lt,_.renderLists=vt,_.shadowMap=_t,_.state=Ut,_.info=de}dt();let X=new gl(_,U);this.xr=X,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let T=Zt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Zt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(T){T!==void 0&&($=T,this.setSize(Y,it,!1))},this.getSize=function(T){return T.set(Y,it)},this.setSize=function(T,k,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,it=k,e.width=Math.floor(T*$),e.height=Math.floor(k*$),H===!0&&(e.style.width=T+"px",e.style.height=k+"px"),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(Y*$,it*$).floor()},this.setDrawingBufferSize=function(T,k,H){Y=T,it=k,$=H,e.width=Math.floor(T*H),e.height=Math.floor(k*H),this.setViewport(0,0,T,k)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(Rt)},this.setViewport=function(T,k,H,V){T.isVector4?Rt.set(T.x,T.y,T.z,T.w):Rt.set(T,k,H,V),Ut.viewport(L.copy(Rt).multiplyScalar($).round())},this.getScissor=function(T){return T.copy(Yt)},this.setScissor=function(T,k,H,V){T.isVector4?Yt.set(T.x,T.y,T.z,T.w):Yt.set(T,k,H,V),Ut.scissor(z.copy(Yt).multiplyScalar($).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(T){Ut.setScissorTest(ne=T)},this.setOpaqueSort=function(T){ut=T},this.setTransparentSort=function(T){yt=T},this.getClearColor=function(T){return T.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(T=!0,k=!0,H=!0){let V=0;if(T){let O=!1;if(I!==null){let rt=I.texture.format;O=rt===ql||rt===Yl||rt===Xl}if(O){let rt=I.texture.type,gt=rt===kn||rt===vi||rt===Is||rt===es||rt===Gl||rt===Wl,wt=Nt.getClearColor(),St=Nt.getClearAlpha(),zt=wt.r,Ht=wt.g,Et=wt.b;gt?(g[0]=zt,g[1]=Ht,g[2]=Et,g[3]=St,U.clearBufferuiv(U.COLOR,0,g)):(x[0]=zt,x[1]=Ht,x[2]=Et,x[3]=St,U.clearBufferiv(U.COLOR,0,x))}else V|=U.COLOR_BUFFER_BIT}k&&(V|=U.DEPTH_BUFFER_BIT),H&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),vt.dispose(),te.dispose(),Lt.dispose(),M.dispose(),B.dispose(),J.dispose(),he.dispose(),N.dispose(),Tt.dispose(),X.dispose(),X.removeEventListener("sessionstart",pc),X.removeEventListener("sessionend",mc),oi.stop()};function j(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;let T=de.autoReset,k=_t.enabled,H=_t.autoUpdate,V=_t.needsUpdate,O=_t.type;dt(),de.autoReset=T,_t.enabled=k,_t.autoUpdate=H,_t.needsUpdate=V,_t.type=O}function mt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ft(T){let k=T.target;k.removeEventListener("dispose",Ft),ve(k)}function ve(T){Le(T),Lt.remove(T)}function Le(T){let k=Lt.get(T).programs;k!==void 0&&(k.forEach(function(H){Tt.releaseProgram(H)}),T.isShaderMaterial&&Tt.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,H,V,O,rt){k===null&&(k=It);let gt=O.isMesh&&O.matrixWorld.determinant()<0,wt=Yu(T,k,H,V,O);Ut.setMaterial(V,gt);let St=H.index,zt=1;if(V.wireframe===!0){if(St=tt.getWireframeAttribute(H),St===void 0)return;zt=2}let Ht=H.drawRange,Et=H.attributes.position,ie=Ht.start*zt,ue=(Ht.start+Ht.count)*zt;rt!==null&&(ie=Math.max(ie,rt.start*zt),ue=Math.min(ue,(rt.start+rt.count)*zt)),St!==null?(ie=Math.max(ie,0),ue=Math.min(ue,St.count)):Et!=null&&(ie=Math.max(ie,0),ue=Math.min(ue,Et.count));let fe=ue-ie;if(fe<0||fe===1/0)return;he.setup(O,V,wt,H,St);let He,re=bt;if(St!==null&&(He=K.get(St),re=Qt,re.setIndex(He)),O.isMesh)V.wireframe===!0?(Ut.setLineWidth(V.wireframeLinewidth*qt()),re.setMode(U.LINES)):re.setMode(U.TRIANGLES);else if(O.isLine){let At=V.linewidth;At===void 0&&(At=1),Ut.setLineWidth(At*qt()),O.isLineSegments?re.setMode(U.LINES):O.isLineLoop?re.setMode(U.LINE_LOOP):re.setMode(U.LINE_STRIP)}else O.isPoints?re.setMode(U.POINTS):O.isSprite&&re.setMode(U.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)re.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Zt.get("WEBGL_multi_draw"))re.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let At=O._multiDrawStarts,En=O._multiDrawCounts,oe=O._multiDrawCount,en=St?K.get(St).bytesPerElement:1,Ai=Lt.get(V).currentProgram.getUniforms();for(let $e=0;$e<oe;$e++)Ai.setValue(U,"_gl_DrawID",$e),re.render(At[$e]/en,En[$e])}else if(O.isInstancedMesh)re.renderInstances(ie,fe,O.count);else if(H.isInstancedBufferGeometry){let At=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,En=Math.min(H.instanceCount,At);re.renderInstances(ie,fe,En)}else re.render(ie,fe)};function ae(T,k,H){T.transparent===!0&&T.side===ye&&T.forceSinglePass===!1?(T.side=Ve,T.needsUpdate=!0,$s(T,k,H),T.side=mn,T.needsUpdate=!0,$s(T,k,H),T.side=ye):$s(T,k,H)}this.compile=function(T,k,H=null){H===null&&(H=T),m=te.get(H),m.init(k),S.push(m),H.traverseVisible(function(O){O.isLight&&O.layers.test(k.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),T!==H&&T.traverseVisible(function(O){O.isLight&&O.layers.test(k.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights();let V=new Set;return T.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let rt=O.material;if(rt)if(Array.isArray(rt))for(let gt=0;gt<rt.length;gt++){let wt=rt[gt];ae(wt,H,O),V.add(wt)}else ae(rt,H,O),V.add(rt)}),S.pop(),m=null,V},this.compileAsync=function(T,k,H=null){let V=this.compile(T,k,H);return new Promise(O=>{function rt(){if(V.forEach(function(gt){Lt.get(gt).currentProgram.isReady()&&V.delete(gt)}),V.size===0){O(T);return}setTimeout(rt,10)}Zt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let tn=null;function Sn(T){tn&&tn(T)}function pc(){oi.stop()}function mc(){oi.start()}let oi=new Kh;oi.setAnimationLoop(Sn),typeof self<"u"&&oi.setContext(self),this.setAnimationLoop=function(T){tn=T,X.setAnimationLoop(T),T===null?oi.stop():oi.start()},X.addEventListener("sessionstart",pc),X.addEventListener("sessionend",mc),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(k),k=X.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,k,I),m=te.get(T,S.length),m.init(k),S.push(m),ot.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Z.setFromProjectionMatrix(ot),G=this.localClippingEnabled,b=st.init(this.clippingPlanes,G),y=vt.get(T,v.length),y.init(),v.push(y),X.enabled===!0&&X.isPresenting===!0){let rt=_.xr.getDepthSensingMesh();rt!==null&&Po(rt,k,-1/0,_.sortObjects)}Po(T,k,0,_.sortObjects),y.finish(),_.sortObjects===!0&&y.sort(ut,yt),Pt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Pt&&Nt.addToRenderList(y,T),this.info.render.frame++,b===!0&&st.beginShadows();let H=m.state.shadowsArray;_t.render(H,T,k),b===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=y.opaque,O=y.transmissive;if(m.setupLights(),k.isArrayCamera){let rt=k.cameras;if(O.length>0)for(let gt=0,wt=rt.length;gt<wt;gt++){let St=rt[gt];xc(V,O,T,St)}Pt&&Nt.render(T);for(let gt=0,wt=rt.length;gt<wt;gt++){let St=rt[gt];gc(y,T,St,St.viewport)}}else O.length>0&&xc(V,O,T,k),Pt&&Nt.render(T),gc(y,T,k);I!==null&&(R.updateMultisampleRenderTarget(I),R.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(_,T,k),he.resetDefaultState(),E=-1,w=null,S.pop(),S.length>0?(m=S[S.length-1],b===!0&&st.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,v.pop(),v.length>0?y=v[v.length-1]:y=null};function Po(T,k,H,V){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){V&&Ct.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ot);let gt=J.update(T),wt=T.material;wt.visible&&y.push(T,gt,wt,H,Ct.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){let gt=J.update(T),wt=T.material;if(V&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ct.copy(T.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Ct.copy(gt.boundingSphere.center)),Ct.applyMatrix4(T.matrixWorld).applyMatrix4(ot)),Array.isArray(wt)){let St=gt.groups;for(let zt=0,Ht=St.length;zt<Ht;zt++){let Et=St[zt],ie=wt[Et.materialIndex];ie&&ie.visible&&y.push(T,gt,ie,H,Ct.z,Et)}}else wt.visible&&y.push(T,gt,wt,H,Ct.z,null)}}let rt=T.children;for(let gt=0,wt=rt.length;gt<wt;gt++)Po(rt[gt],k,H,V)}function gc(T,k,H,V){let O=T.opaque,rt=T.transmissive,gt=T.transparent;m.setupLightsView(H),b===!0&&st.setGlobalState(_.clippingPlanes,H),V&&Ut.viewport(L.copy(V)),O.length>0&&Ws(O,k,H),rt.length>0&&Ws(rt,k,H),gt.length>0&&Ws(gt,k,H),Ut.buffers.depth.setTest(!0),Ut.buffers.depth.setMask(!0),Ut.buffers.color.setMask(!0),Ut.setPolygonOffset(!1)}function xc(T,k,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new On(1,1,{generateMipmaps:!0,type:Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float")?Hs:kn,minFilter:xi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));let rt=m.state.transmissionRenderTarget[V.id],gt=V.viewport||L;rt.setSize(gt.z,gt.w);let wt=_.getRenderTarget();_.setRenderTarget(rt),_.getClearColor(W),Q=_.getClearAlpha(),Q<1&&_.setClearColor(16777215,.5),_.clear(),Pt&&Nt.render(H);let St=_.toneMapping;_.toneMapping=Qn;let zt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),b===!0&&st.setGlobalState(_.clippingPlanes,V),Ws(T,H,V),R.updateMultisampleRenderTarget(rt),R.updateRenderTargetMipmap(rt),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Et=0,ie=k.length;Et<ie;Et++){let ue=k[Et],fe=ue.object,He=ue.geometry,re=ue.material,At=ue.group;if(re.side===ye&&fe.layers.test(V.layers)){let En=re.side;re.side=Ve,re.needsUpdate=!0,yc(fe,H,V,He,re,At),re.side=En,re.needsUpdate=!0,Ht=!0}}Ht===!0&&(R.updateMultisampleRenderTarget(rt),R.updateRenderTargetMipmap(rt))}_.setRenderTarget(wt),_.setClearColor(W,Q),zt!==void 0&&(V.viewport=zt),_.toneMapping=St}function Ws(T,k,H){let V=k.isScene===!0?k.overrideMaterial:null;for(let O=0,rt=T.length;O<rt;O++){let gt=T[O],wt=gt.object,St=gt.geometry,zt=V===null?gt.material:V,Ht=gt.group;wt.layers.test(H.layers)&&yc(wt,k,H,St,zt,Ht)}}function yc(T,k,H,V,O,rt){T.onBeforeRender(_,k,H,V,O,rt),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),O.onBeforeRender(_,k,H,V,T,rt),O.transparent===!0&&O.side===ye&&O.forceSinglePass===!1?(O.side=Ve,O.needsUpdate=!0,_.renderBufferDirect(H,k,V,O,T,rt),O.side=mn,O.needsUpdate=!0,_.renderBufferDirect(H,k,V,O,T,rt),O.side=ye):_.renderBufferDirect(H,k,V,O,T,rt),T.onAfterRender(_,k,H,V,O,rt)}function $s(T,k,H){k.isScene!==!0&&(k=It);let V=Lt.get(T),O=m.state.lights,rt=m.state.shadowsArray,gt=O.state.version,wt=Tt.getParameters(T,O.state,rt,k,H),St=Tt.getProgramCacheKey(wt),zt=V.programs;V.environment=T.isMeshStandardMaterial?k.environment:null,V.fog=k.fog,V.envMap=(T.isMeshStandardMaterial?B:M).get(T.envMap||V.environment),V.envMapRotation=V.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,zt===void 0&&(T.addEventListener("dispose",Ft),zt=new Map,V.programs=zt);let Ht=zt.get(St);if(Ht!==void 0){if(V.currentProgram===Ht&&V.lightsStateVersion===gt)return _c(T,wt),Ht}else wt.uniforms=Tt.getUniforms(T),T.onBeforeCompile(wt,_),Ht=Tt.acquireProgram(wt,St),zt.set(St,Ht),V.uniforms=wt.uniforms;let Et=V.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Et.clippingPlanes=st.uniform),_c(T,wt),V.needsLights=Zu(T),V.lightsStateVersion=gt,V.needsLights&&(Et.ambientLightColor.value=O.state.ambient,Et.lightProbe.value=O.state.probe,Et.directionalLights.value=O.state.directional,Et.directionalLightShadows.value=O.state.directionalShadow,Et.spotLights.value=O.state.spot,Et.spotLightShadows.value=O.state.spotShadow,Et.rectAreaLights.value=O.state.rectArea,Et.ltc_1.value=O.state.rectAreaLTC1,Et.ltc_2.value=O.state.rectAreaLTC2,Et.pointLights.value=O.state.point,Et.pointLightShadows.value=O.state.pointShadow,Et.hemisphereLights.value=O.state.hemi,Et.directionalShadowMap.value=O.state.directionalShadowMap,Et.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Et.spotShadowMap.value=O.state.spotShadowMap,Et.spotLightMatrix.value=O.state.spotLightMatrix,Et.spotLightMap.value=O.state.spotLightMap,Et.pointShadowMap.value=O.state.pointShadowMap,Et.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=Ht,V.uniformsList=null,Ht}function vc(T){if(T.uniformsList===null){let k=T.currentProgram.getUniforms();T.uniformsList=Ki.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function _c(T,k){let H=Lt.get(T);H.outputColorSpace=k.outputColorSpace,H.batching=k.batching,H.batchingColor=k.batchingColor,H.instancing=k.instancing,H.instancingColor=k.instancingColor,H.instancingMorph=k.instancingMorph,H.skinning=k.skinning,H.morphTargets=k.morphTargets,H.morphNormals=k.morphNormals,H.morphColors=k.morphColors,H.morphTargetsCount=k.morphTargetsCount,H.numClippingPlanes=k.numClippingPlanes,H.numIntersection=k.numClipIntersection,H.vertexAlphas=k.vertexAlphas,H.vertexTangents=k.vertexTangents,H.toneMapping=k.toneMapping}function Yu(T,k,H,V,O){k.isScene!==!0&&(k=It),R.resetTextureUnits();let rt=k.fog,gt=V.isMeshStandardMaterial?k.environment:null,wt=I===null?_.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ls,St=(V.isMeshStandardMaterial?B:M).get(V.envMap||gt),zt=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ht=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Et=!!H.morphAttributes.position,ie=!!H.morphAttributes.normal,ue=!!H.morphAttributes.color,fe=Qn;V.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(fe=_.toneMapping);let He=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,re=He!==void 0?He.length:0,At=Lt.get(V),En=m.state.lights;if(b===!0&&(G===!0||T!==w)){let qe=T===w&&V.id===E;st.setState(V,T,qe)}let oe=!1;V.version===At.__version?(At.needsLights&&At.lightsStateVersion!==En.state.version||At.outputColorSpace!==wt||O.isBatchedMesh&&At.batching===!1||!O.isBatchedMesh&&At.batching===!0||O.isBatchedMesh&&At.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&At.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&At.instancing===!1||!O.isInstancedMesh&&At.instancing===!0||O.isSkinnedMesh&&At.skinning===!1||!O.isSkinnedMesh&&At.skinning===!0||O.isInstancedMesh&&At.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&At.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&At.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&At.instancingMorph===!1&&O.morphTexture!==null||At.envMap!==St||V.fog===!0&&At.fog!==rt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==st.numPlanes||At.numIntersection!==st.numIntersection)||At.vertexAlphas!==zt||At.vertexTangents!==Ht||At.morphTargets!==Et||At.morphNormals!==ie||At.morphColors!==ue||At.toneMapping!==fe||At.morphTargetsCount!==re)&&(oe=!0):(oe=!0,At.__version=V.version);let en=At.currentProgram;oe===!0&&(en=$s(V,k,O));let Ai=!1,$e=!1,fs=!1,pe=en.getUniforms(),hn=At.uniforms;if(Ut.useProgram(en.program)&&(Ai=!0,$e=!0,fs=!0),V.id!==E&&(E=V.id,$e=!0),Ai||w!==T){Ut.buffers.depth.getReversed()?(q.copy(T.projectionMatrix),Fd(q),Hd(q),pe.setValue(U,"projectionMatrix",q)):pe.setValue(U,"projectionMatrix",T.projectionMatrix),pe.setValue(U,"viewMatrix",T.matrixWorldInverse);let Gn=pe.map.cameraPosition;Gn!==void 0&&Gn.setValue(U,lt.setFromMatrixPosition(T.matrixWorld)),jt.logarithmicDepthBuffer&&pe.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&pe.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),w!==T&&(w=T,$e=!0,fs=!0)}if(O.isSkinnedMesh){pe.setOptional(U,O,"bindMatrix"),pe.setOptional(U,O,"bindMatrixInverse");let qe=O.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),pe.setValue(U,"boneTexture",qe.boneTexture,R))}O.isBatchedMesh&&(pe.setOptional(U,O,"batchingTexture"),pe.setValue(U,"batchingTexture",O._matricesTexture,R),pe.setOptional(U,O,"batchingIdTexture"),pe.setValue(U,"batchingIdTexture",O._indirectTexture,R),pe.setOptional(U,O,"batchingColorTexture"),O._colorsTexture!==null&&pe.setValue(U,"batchingColorTexture",O._colorsTexture,R));let ps=H.morphAttributes;if((ps.position!==void 0||ps.normal!==void 0||ps.color!==void 0)&&kt.update(O,H,en),($e||At.receiveShadow!==O.receiveShadow)&&(At.receiveShadow=O.receiveShadow,pe.setValue(U,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(hn.envMap.value=St,hn.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&k.environment!==null&&(hn.envMapIntensity.value=k.environmentIntensity),$e&&(pe.setValue(U,"toneMappingExposure",_.toneMappingExposure),At.needsLights&&qu(hn,fs),rt&&V.fog===!0&&ft.refreshFogUniforms(hn,rt),ft.refreshMaterialUniforms(hn,V,$,it,m.state.transmissionRenderTarget[T.id]),Ki.upload(U,vc(At),hn,R)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ki.upload(U,vc(At),hn,R),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&pe.setValue(U,"center",O.center),pe.setValue(U,"modelViewMatrix",O.modelViewMatrix),pe.setValue(U,"normalMatrix",O.normalMatrix),pe.setValue(U,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let qe=V.uniformsGroups;for(let Gn=0,Wn=qe.length;Gn<Wn;Gn++){let bc=qe[Gn];N.update(bc,en),N.bind(bc,en)}}return en}function qu(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Zu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,k,H){Lt.get(T.texture).__webglTexture=k,Lt.get(T.depthTexture).__webglTexture=H;let V=Lt.get(T);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,k){let H=Lt.get(T);H.__webglFramebuffer=k,H.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,H=0){I=T,A=k,C=H;let V=!0,O=null,rt=!1,gt=!1;if(T){let St=Lt.get(T);if(St.__useDefaultFramebuffer!==void 0)Ut.bindFramebuffer(U.FRAMEBUFFER,null),V=!1;else if(St.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(St.__hasExternalTextures)R.rebindTextures(T,Lt.get(T.texture).__webglTexture,Lt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Et=T.depthTexture;if(St.__boundDepthTexture!==Et){if(Et!==null&&Lt.has(Et)&&(T.width!==Et.image.width||T.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}let zt=T.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(gt=!0);let Ht=Lt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ht[k])?O=Ht[k][H]:O=Ht[k],rt=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?O=Lt.get(T).__webglMultisampledFramebuffer:Array.isArray(Ht)?O=Ht[H]:O=Ht,L.copy(T.viewport),z.copy(T.scissor),F=T.scissorTest}else L.copy(Rt).multiplyScalar($).floor(),z.copy(Yt).multiplyScalar($).floor(),F=ne;if(Ut.bindFramebuffer(U.FRAMEBUFFER,O)&&V&&Ut.drawBuffers(T,O),Ut.viewport(L),Ut.scissor(z),Ut.setScissorTest(F),rt){let St=Lt.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,St.__webglTexture,H)}else if(gt){let St=Lt.get(T.texture),zt=k||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,St.__webglTexture,H||0,zt)}E=-1},this.readRenderTargetPixels=function(T,k,H,V,O,rt,gt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&gt!==void 0&&(wt=wt[gt]),wt){Ut.bindFramebuffer(U.FRAMEBUFFER,wt);try{let St=T.texture,zt=St.format,Ht=St.type;if(!jt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!jt.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-V&&H>=0&&H<=T.height-O&&U.readPixels(k,H,V,O,Wt.convert(zt),Wt.convert(Ht),rt)}finally{let St=I!==null?Lt.get(I).__webglFramebuffer:null;Ut.bindFramebuffer(U.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(T,k,H,V,O,rt,gt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=Lt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&gt!==void 0&&(wt=wt[gt]),wt){let St=T.texture,zt=St.format,Ht=St.type;if(!jt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!jt.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=T.width-V&&H>=0&&H<=T.height-O){Ut.bindFramebuffer(U.FRAMEBUFFER,wt);let Et=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Et),U.bufferData(U.PIXEL_PACK_BUFFER,rt.byteLength,U.STREAM_READ),U.readPixels(k,H,V,O,Wt.convert(zt),Wt.convert(Ht),0);let ie=I!==null?Lt.get(I).__webglFramebuffer:null;Ut.bindFramebuffer(U.FRAMEBUFFER,ie);let ue=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Bd(U,ue,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Et),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,rt),U.deleteBuffer(Et),U.deleteSync(ue),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,k=null,H=0){T.isTexture!==!0&&(Es("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,T=arguments[1]);let V=Math.pow(2,-H),O=Math.floor(T.image.width*V),rt=Math.floor(T.image.height*V),gt=k!==null?k.x:0,wt=k!==null?k.y:0;R.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,gt,wt,O,rt),Ut.unbindTexture()},this.copyTextureToTexture=function(T,k,H=null,V=null,O=0){T.isTexture!==!0&&(Es("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1],k=arguments[2],O=arguments[3]||0,H=null);let rt,gt,wt,St,zt,Ht,Et,ie,ue,fe=T.isCompressedTexture?T.mipmaps[O]:T.image;H!==null?(rt=H.max.x-H.min.x,gt=H.max.y-H.min.y,wt=H.isBox3?H.max.z-H.min.z:1,St=H.min.x,zt=H.min.y,Ht=H.isBox3?H.min.z:0):(rt=fe.width,gt=fe.height,wt=fe.depth||1,St=0,zt=0,Ht=0),V!==null?(Et=V.x,ie=V.y,ue=V.z):(Et=0,ie=0,ue=0);let He=Wt.convert(k.format),re=Wt.convert(k.type),At;k.isData3DTexture?(R.setTexture3D(k,0),At=U.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(R.setTexture2DArray(k,0),At=U.TEXTURE_2D_ARRAY):(R.setTexture2D(k,0),At=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);let En=U.getParameter(U.UNPACK_ROW_LENGTH),oe=U.getParameter(U.UNPACK_IMAGE_HEIGHT),en=U.getParameter(U.UNPACK_SKIP_PIXELS),Ai=U.getParameter(U.UNPACK_SKIP_ROWS),$e=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,fe.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,fe.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,St),U.pixelStorei(U.UNPACK_SKIP_ROWS,zt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ht);let fs=T.isDataArrayTexture||T.isData3DTexture,pe=k.isDataArrayTexture||k.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){let hn=Lt.get(T),ps=Lt.get(k),qe=Lt.get(hn.__renderTarget),Gn=Lt.get(ps.__renderTarget);Ut.bindFramebuffer(U.READ_FRAMEBUFFER,qe.__webglFramebuffer),Ut.bindFramebuffer(U.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Wn=0;Wn<wt;Wn++)fs&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Lt.get(T).__webglTexture,O,Ht+Wn),T.isDepthTexture?(pe&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Lt.get(k).__webglTexture,O,ue+Wn),U.blitFramebuffer(St,zt,rt,gt,Et,ie,rt,gt,U.DEPTH_BUFFER_BIT,U.NEAREST)):pe?U.copyTexSubImage3D(At,O,Et,ie,ue+Wn,St,zt,rt,gt):U.copyTexSubImage2D(At,O,Et,ie,ue+Wn,St,zt,rt,gt);Ut.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ut.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else pe?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(At,O,Et,ie,ue,rt,gt,wt,He,re,fe.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(At,O,Et,ie,ue,rt,gt,wt,He,fe.data):U.texSubImage3D(At,O,Et,ie,ue,rt,gt,wt,He,re,fe):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,O,Et,ie,rt,gt,He,re,fe.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,O,Et,ie,fe.width,fe.height,He,fe.data):U.texSubImage2D(U.TEXTURE_2D,O,Et,ie,rt,gt,He,re,fe);U.pixelStorei(U.UNPACK_ROW_LENGTH,En),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,oe),U.pixelStorei(U.UNPACK_SKIP_PIXELS,en),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ai),U.pixelStorei(U.UNPACK_SKIP_IMAGES,$e),O===0&&k.generateMipmaps&&U.generateMipmap(At),Ut.unbindTexture()},this.copyTextureToTexture3D=function(T,k,H=null,V=null,O=0){return T.isTexture!==!0&&(Es("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,T=arguments[2],k=arguments[3],O=arguments[4]||0),Es('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,k,H,V,O)},this.initRenderTarget=function(T){Lt.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),Ut.unbindTexture()},this.resetState=function(){A=0,C=0,I=null,Ut.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};var Vr=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Mt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},yn=class extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ke,this.environmentIntensity=1,this.environmentRotation=new Ke,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Gr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Qa,this.updateRanges=[],this.version=0,this.uuid=ti()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ti()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ti()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ke=new P,Us=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=dn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=dn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=dn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=dn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Se(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ns=class extends Bn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Vi,vs=new P,Gi=new P,Wi=new P,$i=new ct,_s=new ct,nu=new se,fr=new P,bs=new P,pr=new P,bh=new ct,aa=new ct,Mh=new ct,Wr=class extends Ie{constructor(t=new Ns){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new me;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Gr(e,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new Us(n,3,0,!1)),Vi.setAttribute("uv",new Us(n,2,3,!1))}this.geometry=Vi,this.material=t,this.center=new ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),nu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Wi.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;mr(fr.set(-.5,-.5,0),Wi,o,Gi,i,r),mr(bs.set(.5,-.5,0),Wi,o,Gi,i,r),mr(pr.set(.5,.5,0),Wi,o,Gi,i,r),bh.set(0,0),aa.set(1,0),Mh.set(1,1);let a=t.ray.intersectTriangle(fr,bs,pr,!1,vs);if(a===null&&(mr(bs.set(-.5,.5,0),Wi,o,Gi,i,r),aa.set(0,1),a=t.ray.intersectTriangle(fr,pr,bs,!1,vs),a===null))return;let l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:Dn.getInterpolation(vs,fr,bs,pr,bh,aa,Mh,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function mr(s,t,e,n,i,r){$i.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(_s.x=r*$i.x-i*$i.y,_s.y=i*$i.x+r*$i.y):_s.copy($i),s.copy(t),s.x+=_s.x,s.y+=_s.y,s.applyMatrix4(nu)}var xl=class extends Ge{constructor(t=null,e=1,n=1,i,r,o,a,l,c=Be,u=Be,h,d){super(null,o,a,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ks=class extends Se{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Xi=new se,wh=new se,gr=[],Sh=new zn,kg=new se,Ms=new et,ws=new ni,Os=class extends et{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ks(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,kg)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xi),Sh.copy(t.boundingBox).applyMatrix4(Xi),this.boundingBox.union(Sh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ni),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xi),ws.copy(t.boundingSphere).applyMatrix4(Xi),this.boundingSphere.union(ws)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(Ms.geometry=this.geometry,Ms.material=this.material,Ms.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ws.copy(this.boundingSphere),ws.applyMatrix4(n),t.ray.intersectsSphere(ws)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Xi),wh.multiplyMatrices(n,Xi),Ms.matrixWorld=wh,Ms.raycast(t,gr);for(let o=0,a=gr.length;o<a;o++){let l=gr[o];l.instanceId=r,l.object=this,e.push(l)}gr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ks(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new xl(new Float32Array(i*this.count),i,this.count,$l,pn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var ss=class extends Bn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},$r=new P,Xr=new P,Eh=new se,Ss=new Ps,xr=new ni,la=new P,Th=new P,yl=class extends Ie{constructor(t=new me,e=new ss){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)$r.fromBufferAttribute(e,i-1),Xr.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=$r.distanceTo(Xr);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=r,t.ray.intersectsSphere(xr)===!1)return;Eh.copy(i).invert(),Ss.copy(t.ray).applyMatrix4(Eh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,y=g-1;x<y;x+=c){let m=u.getX(x),v=u.getX(x+1),S=yr(this,t,Ss,l,m,v);S&&e.push(S)}if(this.isLineLoop){let x=u.getX(g-1),y=u.getX(f),m=yr(this,t,Ss,l,x,y);m&&e.push(m)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,y=g-1;x<y;x+=c){let m=yr(this,t,Ss,l,x,x+1);m&&e.push(m)}if(this.isLineLoop){let x=yr(this,t,Ss,l,g-1,f);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function yr(s,t,e,n,i,r){let o=s.geometry.attributes.position;if($r.fromBufferAttribute(o,i),Xr.fromBufferAttribute(o,r),e.distanceSqToSegment($r,Xr,la,Th)>n)return;la.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(la);if(!(l<t.near||l>t.far))return{distance:l,point:Th.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}var Ah=new P,Rh=new P,zs=class extends yl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Ah.fromBufferAttribute(e,i),Rh.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ah.distanceTo(Rh);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var _i=class extends Ge{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},je=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let u=n[i],d=n[i+1]-u,f=(o-u)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new ct:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,i=[],r=[],o=[],a=new P,l=new se;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new P)}r[0]=new P,o[0]=new P;let c=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Ce(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ce(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Bs=class extends je{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ct){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},vl=class extends Bs{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Jl(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,f*=u,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var vr=new P,ca=new Jl,ha=new Jl,ua=new Jl,_l=class extends je{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=i[(a-1)%r]:(vr.subVectors(i[0],i[1]).add(i[0]),c=vr);let h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(vr.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=vr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(h),f),x=Math.pow(h.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),y<1e-4&&(y=x),ca.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,x,y),ha.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,x,y),ua.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,x,y)}else this.curveType==="catmullrom"&&(ca.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),ha.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),ua.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(ca.calc(l),ha.calc(l),ua.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Ch(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function Og(s,t){let e=1-s;return e*e*t}function zg(s,t){return 2*(1-s)*s*t}function Bg(s,t){return s*s*t}function Rs(s,t,e,n){return Og(s,t)+zg(s,e)+Bg(s,n)}function Fg(s,t){let e=1-s;return e*e*e*t}function Hg(s,t){let e=1-s;return 3*e*e*s*t}function Vg(s,t){return 3*(1-s)*s*s*t}function Gg(s,t){return s*s*s*t}function Cs(s,t,e,n,i){return Fg(s,t)+Hg(s,e)+Vg(s,n)+Gg(s,i)}var Yr=class extends je{constructor(t=new ct,e=new ct,n=new ct,i=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ct){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cs(t,i.x,r.x,o.x,a.x),Cs(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},bl=class extends je{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Cs(t,i.x,r.x,o.x,a.x),Cs(t,i.y,r.y,o.y,a.y),Cs(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},qr=class extends je{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ml=class extends je{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Zr=class extends je{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Rs(t,i.x,r.x,o.x),Rs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},wl=class extends je{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Rs(t,i.x,r.x,o.x),Rs(t,i.y,r.y,o.y),Rs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Jr=class extends je{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Ch(a,l.x,c.x,u.x,h.x),Ch(a,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new ct().fromArray(i))}return this}},Ih=Object.freeze({__proto__:null,ArcCurve:vl,CatmullRomCurve3:_l,CubicBezierCurve:Yr,CubicBezierCurve3:bl,EllipseCurve:Bs,LineCurve:qr,LineCurve3:Ml,QuadraticBezierCurve:Zr,QuadraticBezierCurve3:wl,SplineCurve:Jr}),Sl=class extends je{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ih[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Ih[i.type]().fromJSON(i))}return this}},El=class extends Sl{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new qr(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Zr(this.currentPoint.clone(),new ct(t,e),new ct(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new Yr(this.currentPoint.clone(),new ct(t,e),new ct(n,i),new ct(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Jr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){let c=new Bs(t,e,n,i,r,o,a,l);if(this.curves.length>0){let h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Tl=class s extends me{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ce(i,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],u=1/e,h=new P,d=new ct,f=new P,g=new P,x=new P,y=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:y=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-y,f.z=m*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(x.x,x.y,x.z);break;default:y=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-y,f.z=m*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(g)}for(let v=0;v<=e;v++){let S=n+v*u*i,_=Math.sin(S),D=Math.cos(S);for(let A=0;A<=t.length-1;A++){h.x=t[A].x*_,h.y=t[A].y,h.z=t[A].x*D,o.push(h.x,h.y,h.z),d.x=v/e,d.y=A/(t.length-1),a.push(d.x,d.y);let C=l[3*A+0]*_,I=l[3*A+1],E=l[3*A+0]*D;c.push(C,I,E)}}for(let v=0;v<e;v++)for(let S=0;S<t.length-1;S++){let _=S+v*t.length,D=_,A=_+t.length,C=_+t.length+1,I=_+1;r.push(D,A,I),r.push(C,I,A)}this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("uv",new Gt(a,2)),this.setAttribute("normal",new Gt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},rs=class s extends Tl{constructor(t=1,e=1,n=4,i=8){let r=new El;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new s(t.radius,t.length,t.capSegments,t.radialSegments)}},Kr=class s extends me{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new P,u=new ct;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){let f=n+h/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("normal",new Gt(a,3)),this.setAttribute("uv",new Gt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Me=class s extends me{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let u=[],h=[],d=[],f=[],g=0,x=[],y=n/2,m=0;v(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Gt(h,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function v(){let _=new P,D=new P,A=0,C=(e-t)/n;for(let I=0;I<=r;I++){let E=[],w=I/r,L=w*(e-t)+t;for(let z=0;z<=i;z++){let F=z/i,W=F*l+a,Q=Math.sin(W),Y=Math.cos(W);D.x=L*Q,D.y=-w*n+y,D.z=L*Y,h.push(D.x,D.y,D.z),_.set(Q,C,Y).normalize(),d.push(_.x,_.y,_.z),f.push(F,1-w),E.push(g++)}x.push(E)}for(let I=0;I<i;I++)for(let E=0;E<r;E++){let w=x[E][I],L=x[E+1][I],z=x[E+1][I+1],F=x[E][I+1];(t>0||E!==0)&&(u.push(w,L,F),A+=3),(e>0||E!==r-1)&&(u.push(L,z,F),A+=3)}c.addGroup(m,A,0),m+=A}function S(_){let D=g,A=new ct,C=new P,I=0,E=_===!0?t:e,w=_===!0?1:-1;for(let z=1;z<=i;z++)h.push(0,y*w,0),d.push(0,w,0),f.push(.5,.5),g++;let L=g;for(let z=0;z<=i;z++){let W=z/i*l+a,Q=Math.cos(W),Y=Math.sin(W);C.x=E*Y,C.y=y*w,C.z=E*Q,h.push(C.x,C.y,C.z),d.push(0,w,0),A.x=Q*.5+.5,A.y=Y*.5*w+.5,f.push(A.x,A.y),g++}for(let z=0;z<i;z++){let F=D+z,W=L+z;_===!0?u.push(W,W+1,F):u.push(W+1,W,F),I+=3}c.addGroup(m,I,_===!0?1:2),m+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},vn=class s extends Me{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Al=class s extends me{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),c(n),u(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let S=new P,_=new P,D=new P;for(let A=0;A<e.length;A+=3)f(e[A+0],S),f(e[A+1],_),f(e[A+2],D),l(S,_,D,v)}function l(v,S,_,D){let A=D+1,C=[];for(let I=0;I<=A;I++){C[I]=[];let E=v.clone().lerp(_,I/A),w=S.clone().lerp(_,I/A),L=A-I;for(let z=0;z<=L;z++)z===0&&I===A?C[I][z]=E:C[I][z]=E.clone().lerp(w,z/L)}for(let I=0;I<A;I++)for(let E=0;E<2*(A-I)-1;E++){let w=Math.floor(E/2);E%2===0?(d(C[I][w+1]),d(C[I+1][w]),d(C[I][w])):(d(C[I][w+1]),d(C[I+1][w+1]),d(C[I+1][w]))}}function c(v){let S=new P;for(let _=0;_<r.length;_+=3)S.x=r[_+0],S.y=r[_+1],S.z=r[_+2],S.normalize().multiplyScalar(v),r[_+0]=S.x,r[_+1]=S.y,r[_+2]=S.z}function u(){let v=new P;for(let S=0;S<r.length;S+=3){v.x=r[S+0],v.y=r[S+1],v.z=r[S+2];let _=y(v)/2/Math.PI+.5,D=m(v)/Math.PI+.5;o.push(_,1-D)}g(),h()}function h(){for(let v=0;v<o.length;v+=6){let S=o[v+0],_=o[v+2],D=o[v+4],A=Math.max(S,_,D),C=Math.min(S,_,D);A>.9&&C<.1&&(S<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),D<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,S){let _=v*3;S.x=t[_+0],S.y=t[_+1],S.z=t[_+2]}function g(){let v=new P,S=new P,_=new P,D=new P,A=new ct,C=new ct,I=new ct;for(let E=0,w=0;E<r.length;E+=9,w+=6){v.set(r[E+0],r[E+1],r[E+2]),S.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),A.set(o[w+0],o[w+1]),C.set(o[w+2],o[w+3]),I.set(o[w+4],o[w+5]),D.copy(v).add(S).add(_).divideScalar(3);let L=y(D);x(A,w+0,v,L),x(C,w+2,S,L),x(I,w+4,_,L)}}function x(v,S,_,D){D<0&&v.x===1&&(o[S]=v.x-1),_.x===0&&_.z===0&&(o[S]=D/2/Math.PI+.5)}function y(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}};var _r=new P,br=new P,da=new P,Mr=new Dn,jr=class extends me{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(Cr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:y,c:m}=Mr;if(x.fromBufferAttribute(a,c[0]),y.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Mr.getNormal(da),h[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,h[1]=`${Math.round(y.x*i)},${Math.round(y.y*i)},${Math.round(y.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){let S=(v+1)%3,_=h[v],D=h[S],A=Mr[u[v]],C=Mr[u[S]],I=`${_}_${D}`,E=`${D}_${_}`;E in d&&d[E]?(da.dot(d[E].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(C.x,C.y,C.z)),d[E]=null):I in d||(d[I]={index0:c[v],index1:c[S],normal:da.clone()})}}for(let g in d)if(d[g]){let{index0:x,index1:y}=d[g];_r.fromBufferAttribute(a,x),br.fromBufferAttribute(a,y),f.push(_r.x,_r.y,_r.z),f.push(br.x,br.y,br.z)}this.setAttribute("position",new Gt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var os=class s extends Al{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Fn=class s extends me{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],u=[],h=t,d=(e-t)/i,f=new P,g=new ct;for(let x=0;x<=i;x++){for(let y=0;y<=n;y++){let m=r+y/n*o;f.x=h*Math.cos(m),f.y=h*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}h+=d}for(let x=0;x<i;x++){let y=x*(n+1);for(let m=0;m<n;m++){let v=m+y,S=v,_=v+n+1,D=v+n+2,A=v+1;a.push(S,_,A),a.push(_,D,A)}}this.setIndex(a),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(c,3)),this.setAttribute("uv",new Gt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var an=class s extends me{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,u=[],h=new P,d=new P,f=[],g=[],x=[],y=[];for(let m=0;m<=n;m++){let v=[],S=m/n,_=0;m===0&&o===0?_=.5/e:m===n&&l===Math.PI&&(_=-.5/e);for(let D=0;D<=e;D++){let A=D/e;h.x=-t*Math.cos(i+A*r)*Math.sin(o+S*a),h.y=t*Math.cos(o+S*a),h.z=t*Math.sin(i+A*r)*Math.sin(o+S*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),y.push(A+_,1-S),v.push(c++)}u.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){let S=u[m][v+1],_=u[m][v],D=u[m+1][v],A=u[m+1][v+1];(m!==0||o>0)&&f.push(S,_,A),(m!==n-1||l<Math.PI)&&f.push(_,D,A)}this.setIndex(f),this.setAttribute("position",new Gt(g,3)),this.setAttribute("normal",new Gt(x,3)),this.setAttribute("uv",new Gt(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Fs=class s extends me{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],l=[],c=[],u=new P,h=new P,d=new P;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){let x=g/i*r,y=f/n*Math.PI*2;h.x=(t+e*Math.cos(y))*Math.cos(x),h.y=(t+e*Math.cos(y))*Math.sin(x),h.z=e*Math.sin(y),a.push(h.x,h.y,h.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){let x=(i+1)*f+g-1,y=(i+1)*(f-1)+g-1,m=(i+1)*(f-1)+g,v=(i+1)*f+g;o.push(x,y,v),o.push(y,m,v)}this.setIndex(o),this.setAttribute("position",new Gt(a,3)),this.setAttribute("normal",new Gt(l,3)),this.setAttribute("uv",new Gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Kt=class extends Bn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xh,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ke,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function wr(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Wg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var as=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Rl=class extends as{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tc,endingEnd:Tc}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ac:r=t,a=2*e-n;break;case Rc:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ac:o=t,l=2*n-e;break;case Rc:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),x=g*g,y=x*g,m=-d*y+2*d*x-d*g,v=(1+d)*y+(-1.5-2*d)*x+(-.5+d)*g+1,S=(-1-f)*y+(1.5+f)*x+.5*g,_=f*y-f*x;for(let D=0;D!==a;++D)r[D]=m*o[u+D]+v*o[c+D]+S*o[l+D]+_*o[h+D];return r}},Cl=class extends as{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=(n-e)/(i-e),h=1-u;for(let d=0;d!==a;++d)r[d]=o[c+d]*h+o[l+d]*u;return r}},Il=class extends as{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},ln=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wr(e,this.TimeBufferType),this.values=wr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:wr(t.times,Array),values:wr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Il(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Cl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Rl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ir:e=this.InterpolantFactoryMethodDiscrete;break;case ja:e=this.InterpolantFactoryMethodLinear;break;case Do:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ir;case this.InterpolantFactoryMethodLinear:return ja;case this.InterpolantFactoryMethodSmooth:return Do}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Wg(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Do,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],u=t[a+1];if(c!==u&&(a!==1||c!==t[0]))if(i)l=!0;else{let h=a*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let x=e[h+g];if(x!==e[d+g]||x!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let h=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[h+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};ln.prototype.TimeBufferType=Float32Array;ln.prototype.ValueBufferType=Float32Array;ln.prototype.DefaultInterpolation=ja;var bi=class extends ln{constructor(t,e,n){super(t,e,n)}};bi.prototype.ValueTypeName="bool";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=Ir;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var Pl=class extends ln{};Pl.prototype.ValueTypeName="color";var Ll=class extends ln{};Ll.prototype.ValueTypeName="number";var Dl=class extends as{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let u=c+a;c!==u;c+=4)Je.slerpFlat(r,0,o,c-a,o,c,l);return r}},Qr=class extends ln{InterpolantFactoryMethodLinear(t){return new Dl(this.times,this.values,this.getValueSize(),t)}};Qr.prototype.ValueTypeName="quaternion";Qr.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends ln{constructor(t,e,n){super(t,e,n)}};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=Ir;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ul=class extends ln{};Ul.prototype.ValueTypeName="vector";var Nl=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},$g=new Nl,kl=class{constructor(t){this.manager=t!==void 0?t:$g,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};kl.DEFAULT_MATERIAL_NAME="__DEFAULT";var to=class extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},_n=class extends to{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},fa=new se,Ph=new P,Lh=new P,Ol=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ds,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Ph.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ph),Lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lh),e.updateMatrixWorld(),fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var zl=class extends Ol{constructor(){super(new Br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},bn=class extends to{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new zl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Kl="\\[\\]\\.:\\/",Xg=new RegExp("["+Kl+"]","g"),jl="[^"+Kl+"]",Yg="[^"+Kl.replace("\\.","")+"]",qg=/((?:WC+[\/:])*)/.source.replace("WC",jl),Zg=/(WCOD+)?/.source.replace("WCOD",Yg),Jg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jl),Kg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jl),jg=new RegExp("^"+qg+Zg+Jg+Kg+"$"),Qg=["material","materials","bones","map"],Bl=class{constructor(t,e,n){let i=n||ge.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ge=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Xg,"")}static parseTrackName(t){let e=jg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);Qg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ge.Composite=Bl;ge.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ge.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ge.prototype.GetterByBindingType=[ge.prototype._getValue_direct,ge.prototype._getValue_array,ge.prototype._getValue_arrayElement,ge.prototype._getValue_toArray];ge.prototype.SetterByBindingTypeAndVersioning=[[ge.prototype._setValue_direct,ge.prototype._setValue_direct_setNeedsUpdate,ge.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_array,ge.prototype._setValue_array_setNeedsUpdate,ge.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_arrayElement,ge.prototype._setValue_arrayElement_setNeedsUpdate,ge.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_fromArray,ge.prototype._setValue_fromArray_setNeedsUpdate,ge.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Nx=new Float32Array(1);var Dh=new se,ii=class{constructor(t,e,n=0,i=1/0){this.ray=new Ps(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Ls,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Dh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Dh),this}intersectObject(t,e=!0,n=[]){return Fl(t,this,n,e),n.sort(Uh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Fl(t[i],this,n,e);return n.sort(Uh),n}};function Uh(s,t){return s.distance-t.distance}function Fl(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Fl(r[o],t,e,!0)}}var eo=class extends zs{constructor(t=10,e=10,n=4473924,i=8947848){n=new Mt(n),i=new Mt(i);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,f=0,g=-a;d<=e;d++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let x=d===r?n:i;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}let u=new me;u.setAttribute("position",new Gt(l,3)),u.setAttribute("color",new Gt(c,3));let h=new ss({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var Mn=class extends Error{constructor(t,e){super(e?.message||"Request failed"),this.status=t,this.code=e?.error||"ERROR",this.data=e||{}}};async function iu(s,t,e,n={}){let i;try{i=await fetch(t,{method:s,credentials:"same-origin",headers:e!==void 0&&!n.raw?{"content-type":"application/json",...n.headers||{}}:n.headers||{},body:n.raw?e:e!==void 0?JSON.stringify(e):void 0})}catch{throw new Mn(0,{error:"NETWORK",message:"Cannot reach the server. Check your connection."})}let r=null;try{r=await i.json()}catch{}if(!i.ok)throw new Mn(i.status,r||{message:`Server error (${i.status})`});return r}var Dt=s=>iu("GET",s),at=(s,t={})=>iu("POST",s,t),pt=s=>"\u20A6"+Math.round(s).toLocaleString("en-NG"),nt=(s,t=document)=>t.querySelector(s),Ql=(s,t=document)=>[...t.querySelectorAll(s)];function p(s,t={},...e){let n=document.createElement(s);for(let[i,r]of Object.entries(t||{}))i==="class"?n.className=r:i.startsWith("on")?n.addEventListener(i.slice(2),r):r!==!1&&r!=null&&n.setAttribute(i,r===!0?"":r);for(let i of e.flat())i!=null&&i!==!1&&n.append(i.nodeType?i:document.createTextNode(String(i)));return n}function ru(s,t=!1){let e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,l=new me,c=0;for(let u=0;u<s.length;++u){let h=s[u],d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in h.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(h.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in h.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(h.morphAttributes[f])}if(t){let f;if(e)f=h.index.count;else if(h.attributes.position!==void 0)f=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(e){let u=0,h=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let g=0;g<f.count;++g)h.push(f.getX(g)+u);u+=s[d].attributes.position.count}l.setIndex(h)}for(let u in r){let h=su(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(let u in o){let h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){let f=[];for(let x=0;x<o[u].length;++x)f.push(o[u][x][d]);let g=su(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function su(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){let u=s[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=u.gpuType),i!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new Se(o,e,n),l=0;for(let c=0;c<s.length;++c){let u=s[c];if(u.isInterleavedBufferAttribute){let h=l/e;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<e;g++){let x=u.getComponent(d,g);a.setComponent(d+h,g,x)}}else o.set(u.array,l);l+=u.count*e}return i!==void 0&&(a.gpuType=i),a}function hs(s){return function(){s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var ro=new Mt,tc=new se,oo=new Je,ao=new Ke,lo=new P,co=new P,We=class{constructor(t=1,e=.035){this.parts=[],this.rnd=hs(t),this.jit=e,this.uvScale=.14}_col(t,e){ro.set(t);let n=1+(this.rnd()*2-1)*(e??this.jit);return[ro.r*n,ro.g*n,ro.b*n]}_push(t,e,n,i,r,o={}){t.index&&(t=t.toNonIndexed()),ao.set(o.rx||0,o.ry||0,o.rz||0,"YXZ"),oo.setFromEuler(ao),lo.set(e,n,i),co.set(o.sx??1,o.sy??1,o.sz??1),tc.compose(lo,oo,co),t.applyMatrix4(tc);let a=t.attributes.position,l=t.attributes.normal,c=a.count,u=new Float32Array(c*3),h=t.attributes.uv&&o.keepUV?null:new Float32Array(c*2),[d,f,g]=this._col(r,o.jit);for(let x=0;x<c;x++){let y=1;if(!o.noAO&&Math.abs(l.getY(x))<.5&&(y=.8+.2*Math.min(1,Math.max(0,a.getY(x)/2.4))),o.shade&&(y*=o.shade),u[x*3]=d*y,u[x*3+1]=f*y,u[x*3+2]=g*y,h){let m=Math.abs(l.getX(x)),v=Math.abs(l.getY(x)),S=Math.abs(l.getZ(x)),_=a.getX(x),D=a.getY(x),A=a.getZ(x),C,I;v>=m&&v>=S?(C=_,I=A):m>=S?(C=A,I=D):(C=_,I=D),h[x*2]=C*this.uvScale,h[x*2+1]=I*this.uvScale}}t.setAttribute("color",new Se(u,3)),h&&t.setAttribute("uv",new Se(h,2));for(let x of Object.keys(t.attributes))["position","normal","color","uv"].includes(x)||t.deleteAttribute(x);return this.parts.push(t),this}box(t,e,n,i,r,o,a,l){return this._push(new Bt(t,e,n),i,r+e/2,o,a,l)}cyl(t,e,n,i,r,o,a,l,c){return this._push(new Me(t,e,n,i),r,o+n/2,a,l,c)}wheel(t,e,n,i,r,o,a={}){return this._push(new Me(t,t,e,10),n,i,r,o,{...a,rx:Math.PI/2,noAO:!0})}sphere(t,e,n,i,r,o={}){return this._push(new an(t,o.ws||8,o.hs||6),e,n,i,r,o)}ico(t,e,n,i,r,o={}){return this._push(new os(t,o.detail||0),e,n,i,r,o)}capsule(t,e,n,i,r,o,a={}){return this._push(new rs(t,e,3,8),n,i+t+e/2,r,o,a)}cone(t,e,n,i,r,o,a,l){return this.cyl(.001,t,e,n,i,r,o,a,l)}plane(t,e,n,i,r,o,a){return this._push(new Ee(t,e),n,i,r,o,a)}gable(t,e,n,i,r,o,a,l={}){let c=t/2,u=e/2,h=[[-c,0,-u],[c,0,-u],[c,0,u],[-c,0,u],[0,n,-u],[0,n,u]],d=[[0,3,5,0,5,4],[1,4,5,1,5,2],[0,4,1],[3,2,5],[0,1,2,0,2,3]],f=[];for(let x of d)for(let y of x)f.push(...h[y]);let g=new me;return g.setAttribute("position",new Gt(f,3)),g.computeVertexNormals(),this._push(g,i,r,o,a,l)}quad(t,e,n,i,r,o={}){let a=new me;return a.setAttribute("position",new Gt([...t,...e,...n,...t,...n,...i],3)),a.computeVertexNormals(),this._push(a,0,0,0,r,o)}uvQuad(t,e,n,i,r,o=16777215,a={}){let l=new me;l.setAttribute("position",new Gt([...t,...e,...n,...t,...n,...i],3));let[c,u,h,d,f,g,x,y]=r;return l.setAttribute("uv",new Gt([c,u,h,d,f,g,c,u,f,g,x,y],2)),l.computeVertexNormals(),this._push(l,0,0,0,o,{...a,keepUV:!0,noAO:!0})}addGeo(t,e,n,i,r=0){let o=t.clone();return ao.set(0,r,0),oo.setFromEuler(ao),lo.set(e,n,i),co.set(1,1,1),o.applyMatrix4(tc.compose(lo,oo,co)),this.parts.push(o),this}build(){if(!this.parts.length)return new me;let t=ru(this.parts,!1);return this.parts.forEach(e=>e.dispose()),this.parts=[],t.computeBoundingSphere(),t.computeBoundingBox(),t}};var Hn=(s,t)=>{let e=document.createElement("canvas");return e.width=s,e.height=t,e};function ec(s){let t=s;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Vn=(s,t=!1)=>{let e=new _i(s);return e.colorSpace=ze,e.anisotropy=4,t&&(e.wrapS=e.wrapT=yi),e};function ou(){let t=Hn(128,128),e=Hn(128,128),n=t.getContext("2d"),i=e.getContext("2d");n.fillStyle="#ffffff",n.fillRect(0,0,128,128),i.fillStyle="#000",i.fillRect(0,0,128,128);let r=(o,a)=>{o.fillStyle=a,o.fillRect(34,30,60,56)};return r(n,"#6f8796"),n.fillStyle="rgba(0,0,0,.18)",n.fillRect(34,30,60,3),n.fillRect(34,83,60,3),n.fillRect(62,30,4,56),n.fillStyle="rgba(0,0,0,.08)",n.fillRect(0,118,128,10),r(i,"#ffd27a"),{map:Vn(t,!0),emissiveMap:Vn(e,!0)}}function au(){let s=Hn(64,256),t=s.getContext("2d"),e=ec(3);t.fillStyle="#34373c",t.fillRect(0,0,64,256);for(let i=0;i<500;i++){let r=40+e()*30;t.fillStyle=`rgb(${r},${r+2},${r+5})`,t.fillRect(e()*64,e()*256,1+e()*2,1+e()*2)}t.fillStyle="#e8e6df",t.fillRect(2,0,2,256),t.fillRect(60,0,2,256),t.fillStyle="#f2c744";for(let i=0;i<256;i+=64)t.fillRect(30,i+8,4,36);return Vn(s,!0)}function lu(){let s=Hn(128,128),t=s.getContext("2d"),e=ec(8);t.fillStyle="#b9b5a6",t.fillRect(0,0,128,128);for(let n=0;n<700;n++){let i=150+e()*60;t.fillStyle=`rgba(${i},${i-4},${i-14},.5)`,t.fillRect(e()*128,e()*128,1+e()*3,1+e()*3)}t.strokeStyle="rgba(80,76,66,.35)",t.lineWidth=1;for(let n=0;n<=128;n+=32)t.beginPath(),t.moveTo(n,0),t.lineTo(n,128),t.moveTo(0,n),t.lineTo(128,n),t.stroke();return Vn(s,!0)}function cu(){let s=Hn(256,256),t=s.getContext("2d"),e=ec(12);t.fillStyle="#2b6f8a",t.fillRect(0,0,256,256);for(let n=0;n<160;n++){t.strokeStyle=`rgba(255,255,255,${.05+e()*.12})`,t.lineWidth=1+e()*2;let i=e()*256,r=e()*256;t.beginPath(),t.moveTo(i,r),t.quadraticCurveTo(i+14,r-5,i+30,r),t.stroke()}return Vn(s,!0)}function ho(){let s=Hn(64,64),t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,.55)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Vn(s)}function hu(s,t="#ffffff"){let e=Hn(256,64),n=e.getContext("2d");n.font="700 30px Nunito, system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle";let i=Math.min(244,n.measureText(s).width+24);n.fillStyle="rgba(0,0,0,.55)",n.beginPath(),n.roundRect(128-i/2,10,i,44,14),n.fill(),n.fillStyle=t,n.fillText(s,128,33);let r=new _i(e);return r.colorSpace=ze,r}function uu(s,t,e,n="Advertise here: /advertise",i=0){let r=Hn(s,t),o=r.getContext("2d"),a=[["#0b6b3a","#f6c744"],["#1e3a8a","#fb923c"],["#7c2d12","#fde68a"],["#14532d","#ffffff"]],[l,c]=a[i%a.length],u=o.createLinearGradient(0,0,s,t);u.addColorStop(0,l),u.addColorStop(1,"#0a0a0a"),o.fillStyle=u,o.fillRect(0,0,s,t),o.fillStyle=c,o.globalAlpha=.12;for(let h=0;h<8;h++)o.beginPath(),o.arc(s*(h/7),t*.9,t*.35,0,7),o.fill();return o.globalAlpha=1,o.fillStyle=c,o.textAlign="center",o.font=`800 ${Math.round(t*.2)}px "Lilita One", Nunito, sans-serif`,o.fillText("YOUR AD HERE",s/2,t*.42),o.fillStyle="#fff",o.font=`700 ${Math.round(t*.085)}px Nunito, sans-serif`,o.fillText(n,s/2,t*.58),o.font=`600 ${Math.round(t*.06)}px Nunito, sans-serif`,o.globalAlpha=.75,o.fillText(e,s/2,t*.72),o.globalAlpha=1,o.fillStyle="rgba(255,255,255,.85)",o.font=`700 ${Math.round(t*.05)}px Nunito, sans-serif`,o.textAlign="right",o.fillText("House ad",s-14,t-12),Vn(r)}function du(s,t,e,n){let i=Hn(t,e),r=i.getContext("2d");return r.fillStyle="#111",r.fillRect(0,0,t,e),r.drawImage(s,0,0,t,e),r.fillStyle="rgba(0,0,0,.6)",r.fillRect(t-190,e-36,190,36),r.fillStyle="#fff",r.font="700 20px Nunito, sans-serif",r.textAlign="right",r.fillText("Sponsored \xB7 "+String(n||"").slice(0,14),t-10,e-11),Vn(i)}function fu(s,t){return Vn(s,t)}var uo=(s,t,e)=>new Mt(s).lerp(new Mt(t),e);function tx(s,t,e="#fff",n=512,i=128){let r=document.createElement("canvas");r.width=n,r.height=i;let o=r.getContext("2d");o.fillStyle=t,o.fillRect(0,0,n,i),o.strokeStyle="rgba(255,255,255,.7)",o.lineWidth=6,o.strokeRect(6,6,n-12,i-12),o.fillStyle=e,o.textAlign="center",o.textBaseline="middle";let a=62;for(o.font=`${a}px "Lilita One", Nunito, sans-serif`;o.measureText(s).width>n-40&&a>18;)a-=4,o.font=`${a}px "Lilita One", Nunito, sans-serif`;return o.fillText(s,n/2,i/2+3),fu(r)}function pu(s){let t=new yn,e=new Xt;t.add(e);let n=[],i={},r={},o=[],a=new _n(14675967,7036746,.9);t.add(a);let l=new bn(16773590,1.4);l.position.set(120,200,80),t.add(l);let c=new Kt({vertexColors:!0}),u=ou(),h=new Kt({vertexColors:!0,map:u.map,emissive:16777215,emissiveMap:u.emissiveMap,emissiveIntensity:0}),d=b=>{let G=new We(b,.04);return G.uvScale=1/3.4,G},f=new We(7,.03),g=d(11),x=new We(5,0),y=hs(99),m=s.bounds,v=lu();v.repeat.set(60,60);let S=new et(new Ee(900,900).rotateX(-Math.PI/2),new Kt({map:v,color:13617590}));S.position.set(0,-.02,-60),e.add(S);for(let b of s.zones)f.box(b.x1-b.x0+6,.2,b.z1-b.z0+6,(b.x0+b.x1)/2,-.02,(b.z0+b.z1)/2,12433318,{noAO:!0,jit:.02});let _=au(),D=[];for(let b of s.roads){let G=Math.hypot(b.x2-b.x1,b.z2-b.z1),q=Math.abs(b.x2-b.x1)>Math.abs(b.z2-b.z1),ot=_.clone();ot.needsUpdate=!0,ot.repeat.set(1,G/56);let lt=new et(new Ee(b.width,G).rotateX(-Math.PI/2),new Kt({map:ot}));lt.position.set((b.x1+b.x2)/2,.02+(q?0:.005),(b.z1+b.z2)/2),q&&(lt.rotation.y=Math.PI/2),e.add(lt)}let A=s.roads.filter(b=>b.x1===b.x2).map(b=>b.x1),C=s.roads.filter(b=>b.z1===b.z2).map(b=>b.z1);for(let b of A)for(let G of C){f.box(14,.05,14,b,0,G,3422012,{noAO:!0,jit:0});for(let q=-3;q<=3;q++)for(let[ot,lt,Ct,It]of[[0,-8.5,1,3],[0,8.5,1,3],[-8.5,0,3,1],[8.5,0,3,1]])f.box(Ct,.06,It,b+ot+(ot===0?q*1.8:0),0,G+lt+(lt===0?q*1.8:0),15658730,{noAO:!0,jit:0})}for(let b of s.zones)for(let G=b.x0+12;G<b.x1-6;G+=38)for(let q of[b.z0+2,b.z1-2])I(f,G,q);function I(b,G,q){b.cyl(.12,.16,6.5,6,G,0,q,3882821,{noAO:!0}),b.box(1.4,.18,.3,G,6.4,q,3882821,{noAO:!0}),b.box(.6,.16,.4,G+.55,6.22,q,16773296,{noAO:!0,jit:0})}function E(b,G,q,ot=1){let lt=7*ot;b.cyl(.22*ot,.35*ot,lt,6,G,0,q,9071173,{noAO:!0});for(let Ct=0;Ct<7;Ct++){let It=Ct/7*Math.PI*2;b.box(.5*ot,.1,3.4*ot,G+Math.cos(It)*1.6*ot,lt+.1,q+Math.sin(It)*1.6*ot,3116858,{ry:-It+Math.PI/2,rx:.5,noAO:!0})}}for(let b=-230;b<240;b+=24)E(f,b,148+(y()*6-3),.9+y()*.5);for(let b=0;b<40;b++){let G=s.zones[y()*12|0];if(!G)continue;let q=G.x0+3+y()*(G.x1-G.x0-6),ot=G.z0+(y()<.5?3:G.z1-G.z0-3);ot<140&&E(f,q,ot,.7+y()*.4)}let w=[],L=(b,G,q,ot,lt,Ct,It,Pt)=>{let qt=new et(new Ee(Ct,It),new Jt({map:tx(b,G),side:mn}));return qt.position.set(q,ot,lt),qt.rotation.y=Math.atan2(Pt[0],Pt[1]),e.add(qt),w.push(qt),qt},z=(b,G=.08)=>[b.x+b.face[0]*(b.w/2+G),b.z+b.face[1]*(b.d/2+G)];for(let b of s.buildings){let G=b.w/2,q=b.d/2;n.push({id:b.id,h:b.h,x0:b.x-G-.6,x1:b.x+G+.6,z0:b.z-q-.6,z1:b.z+q+.6});let[ot,lt]=b.face,Ct=Math.atan2(ot,lt);if(b.kind==="house"){if(g.box(b.w,b.h,b.d,b.x,0,b.z,b.color),b.tier===1){f.box(b.w+.6,.5,b.d+.6,b.x,b.h,b.z,7040368);for(let xe=0;xe<3;xe++)f.box(1.2,1.4,1.2,b.x-b.w/3+xe*(b.w/3),b.h+.5,b.z-b.d/4,3100527)}else f.gable(b.w+1.2,b.d+1.2,b.tier===3?3.4:2.6,b.x,b.h,b.z,b.roof);let[It,Pt]=z(b,.04),qt=1.9;f.box(Math.abs(lt)>0?qt:.3,2.8,Math.abs(lt)>0?.3:qt,It,0,Pt,4861724,{noAO:!0}),f.box(Math.abs(lt)>0?3.4:1.6,.3,Math.abs(lt)>0?1.6:3.4,It+ot*.8,0,Pt+lt*.8,11117462,{noAO:!0}),b.tier===3&&f.box(Math.abs(lt)>0?b.w*.5:2,.25,Math.abs(lt)>0?2:b.d*.5,b.x+ot*(G+.8),b.h*.62,b.z+lt*(q+.8),12038821,{noAO:!0})}else if(b.kind==="tower")g.box(b.w,b.h,b.d,b.x,0,b.z,b.color),f.box(b.w*.7,3,b.d*.7,b.x,b.h,b.z,5990256),f.cyl(.2,.3,14,5,b.x,b.h+3,b.z,11580858,{noAO:!0}),f.box(.8,.8,.8,b.x,b.h+17,b.z,16726832,{noAO:!0,jit:0}),f.box(b.w+.4,1.4,b.d+.4,b.x,0,b.z,4936538,{noAO:!0});else if(b.kind==="shop"){g.box(b.w,b.h,b.d,b.x,0,b.z,b.color),f.box(b.w+.8,.4,b.d+.8,b.x,b.h,b.z,9080724);let[It,Pt]=z(b,.6);f.box(Math.abs(lt)?b.w-2:2.6,.3,Math.abs(lt)?2.6:b.d-2,It,3.9,Pt,13646123,{noAO:!0});let[qt,U]=z(b,.12);L(b.label,b.sign||"#2c6fbb",qt,5.4,U,Math.min(b.w-3,16),2.6,b.face);let[xe,Zt]=z(b,.05);x.box(Math.abs(lt)?4:.2,2.6,Math.abs(lt)?.2:4,xe,.2,Zt,10274777,{noAO:!0,jit:0})}else if(b.kind==="market"){for(let U of[-1,1])for(let xe of[-1,1])f.cyl(.25,.25,4.4,6,b.x+U*(G-1),0,b.z+xe*(q-1),7162945,{noAO:!0});f.box(b.w+1,.4,b.d+1,b.x,4.4,b.z,12554031,{noAO:!0});let It=[14172949,2001125,4431943,16635957,9315498,16011550];for(let U=0;U<12;U++){let xe=b.x-G+3+U%4*((b.w-6)/3),Zt=b.z-q+5+Math.floor(U/4)*((b.d-10)/2);f.box(3.4,1,1.8,xe,0,Zt,It[U%It.length]),f.box(3.8,.12,2.2,xe,2.6,Zt,It[(U+2)%It.length],{noAO:!0})}let[Pt,qt]=z(b,.5);L("BALOGUN-STYLE MARKET","#8d3b13",Pt,5.9,qt,22,2.4,b.face)}else if(b.kind==="office"||b.kind==="kiosk"){if(g.box(b.w,b.h,b.d,b.x,0,b.z,b.color),f.box(b.w+.6,.3,b.d+.6,b.x,b.h,b.z,7040368),b.label){let[It,Pt]=z(b,.12);L(b.label,"#0b6b3a",It,b.h-1.3,Pt,Math.min(b.w-1,14),2.2,b.face)}}else if(b.kind==="airport"){g.box(b.w,b.h,b.d,b.x,0,b.z,b.color),f.box(b.w+6,.8,b.d+6,b.x,b.h,b.z,8951203),f.box(b.w*.9,2.2,3,b.x,3,b.z+b.d/2+.3,4877190,{noAO:!0}),f.box(8,26,8,b.x+b.w/2+12,0,b.z-6,13620957),f.box(12,6,12,b.x+b.w/2+12,26,b.z-6,7311272);let[It,Pt]=z(b,.12);L("AIRPORT (placeholder)","#124d8a",It,b.h+4,Pt,40,4,b.face)}}let F=s.landmarks.find(b=>b.id==="plaza");if(F){let b=F.x-52,G=F.z-52;f.box(30,.3,30,b,0,G,14143421,{noAO:!0}),f.cyl(5,5.5,.9,16,b,.3,G,9411235),f.cyl(.5,.7,3.5,8,b,.3,G,9411235),f.cyl(2.2,.6,.5,12,b,3.7,G,8376808,{noAO:!0});for(let q of[0,1,2,3])f.box(3,.6,1,b+Math.cos(q*1.57)*9,.3,G+Math.sin(q*1.57)*9,7162945,{ry:-q*1.57});f.cyl(.12,.12,14,6,b+12,.3,G-12,14540253,{noAO:!0});for(let[q,ot]of[[0,34641],[1,16777215],[2,34641]])f.box(.15,1.5,1.1,b+12+.1,11,G-12-.55+q*1.1,ot,{noAO:!0,jit:0});o.push({text:F.name,x:b,z:G})}let W=new Kt({color:2106154});for(let b of s.billboards){let G=new Xt;G.position.set(b.x,0,b.z),G.rotation.y=Math.atan2(b.nx,b.nz),e.add(G);let q=b.y,ot=qt=>{let U=new et(new Me(.3,.38,q+b.h/2,8),W);U.position.set(qt,(q+b.h/2)/2,-.4),G.add(U)};ot(-b.w*.3),ot(b.w*.3);let lt=new et(new Bt(b.w+.9,b.h+.9,.5),W);lt.position.set(0,q,0),G.add(lt);let Ct=new Jt({color:16777215}),It=new et(new Ee(b.w,b.h),Ct);It.position.set(0,q,.27),G.add(It);let Pt=new et(new Bt(b.w+1.2,.25,.9),W);if(Pt.position.set(0,q+b.h/2+.55,.05),G.add(Pt),b.surface==="lagoon_plot"){let qt=new et(new Bt(b.w+4,1.4,5),new Kt({color:9141602}));qt.position.set(0,-.2,-.4),G.add(qt)}i[b.id]={def:b,group:G,panel:It,mat:Ct,current:null}}let Q=cu();Q.repeat.set(20,8);let Y=new et(new Ee(s.water.maxX-s.water.minX,s.water.maxZ-s.water.minZ).rotateX(-Math.PI/2),new Kt({map:Q,transparent:!0,opacity:.92}));Y.position.set(0,-.5,(s.water.minZ+s.water.maxZ)/2),e.add(Y),f.box(s.bounds.maxX-s.bounds.minX+40,1.2,4,0,-.9,m.maxZ-1,10130047,{noAO:!0});let it=new We(31,.05);for(let b=0;b<26;b++){let G=-420+b*34+y()*10;it.box(14+y()*14,30+y()*70,14,G,-2,-340-y()*40,8031651,{noAO:!0})}for(let b=0;b<20;b++){let G=-330+b*34;it.box(26,1.6,6,G,12,310,9080210,{noAO:!0}),b%4===0&&it.box(2,26,2,G,-2,310,9080210,{noAO:!0})}let $=new et(it.build(),new Kt({vertexColors:!0,fog:!0}));e.add($);for(let[b,G]of[[f,c],[g,h],[x,c]]){let q=b.build();q.attributes.position&&e.add(new et(q,G))}let ut=new vn(.8,1.6,4).rotateX(Math.PI);for(let b of s.properties){let G=new et(ut,new Jt({color:3523691}));G.position.set(b.door.x,5.2,b.door.z),e.add(G),r[b.id]=G}let yt={available:3523691,taken:9080728,yours:16761358},Rt={x:.004},Yt=new Mt("#9fd3ee");t.fog=new Vr(Yt,140,520);let ne=0;return{scene:t,colliders:n,boards:i,doorMarkers:r,labels:o,root:e,setMarkers(b){for(let G of b){let q=r[G.id];q&&q.material.color.setHex(yt[G.status]||3523691)}},setTime(b){let q=(b/1440-.25)*Math.PI*2,ot=Math.sin(q),lt=Math.max(0,Math.min(1,ot*1.8+.25));ne=1-lt;let Ct=Math.max(0,1-Math.abs(ot)*3.2),It=uo(uo("#0a1230","#8fd0f5",lt),"#f08a4b",Ct*.7);return t.background=It,t.fog.color.copy(It),l.intensity=.15+lt*1.4,l.color.set(uo("#fff1d6","#ff9a55",Ct)),l.position.set(Math.cos(q)*200,Math.max(30,Math.sin(q)*220),80),a.intensity=.35+lt*.65,a.color.set(uo("#2b3a6b","#dfefff",lt)),h.emissiveIntensity=ne*.95,{day:lt,night:ne}},animate(b){Q.offset.x+=b*.004,Q.offset.y+=b*.002},get night(){return ne}}}var wi={lookAhead:14,halfWidth:2.2,stopGap:3.2,minGap:1.8,maxDecel:14,maxAccel:6,waitMin:2,waitMax:4,creepSpeed:1.2,ignoreCarsFor:3,catchUp:1.25,hornGapSpeed:5};function mu(s,t,e=wi){let n=Math.cos(s.yaw),i=-Math.sin(s.yaw),r=null;for(let o of t){if(o===s||o.self&&o.self===s)continue;let a=o.x-s.x,l=o.z-s.z,c=a*n+l*i;if(c<.2||c>e.lookAhead||Math.abs(-a*i+l*n)>e.halfWidth+(o.r||0))continue;let h=c-(o.r||0);(r==null||h<r.gap)&&(r={gap:h,person:!!o.person})}return r}function gu(s,t,e,n,i=wi){let r={v:s.v,wait:s.wait||0,ignoreT:Math.max(0,(s.ignoreT||0)-n),honk:!1,limit:s.limit??i.waitMin+(i.waitMax-i.waitMin)*.5};e&&!e.person&&r.ignoreT>0&&(e=null);let o=t;if(e){let l=e.gap-i.stopGap;o=l<=0?0:Math.min(t,Math.sqrt(2*i.maxDecel*.6*l)),r.v<.3&&(r.wait+=n,r.wait>=r.limit&&(e.person?(e.gap>i.minGap+.6&&(o=Math.min(t,i.creepSpeed)),r.honk=!s.honked):(r.ignoreT=i.ignoreCarsFor,r.wait=0)))}else r.wait=0;let a=o-r.v;return r.v+=Math.max(-i.maxDecel*n,Math.min(i.maxAccel*n,a)),r.v<0&&(r.v=0),e&&e.person&&(r.v=Math.min(r.v,Math.max(0,(e.gap-i.minGap)/Math.max(n,.001)))),r.honked=e?s.honked||r.honk:!1,r.braking=!!e&&o<t,r}function xu(s,t={}){return s?{action:"yield",hit:s}:{action:"clear",hit:null}}var ex=1513499,si=2634815,yu=16761358;function vu(s,t,e,n=.4,i=.3){for(let r of t)for(let o of e)s.wheel(n,i,r,n,o,1710620),s.wheel(n*.5,i+.04,r,n,o,10133670)}function _u(s){let t=new We(11+(s?s()*99|0:0),.02),e=4.9;vu(t,[1.55,-1.55],[.98,-.98],.42,.32),t.box(e,.85,2,0,.32,0,15313152),t.box(e,1.2,1.96,0,1.15,0,yu),t.box(e+.02,.26,2.04,0,.98,0,ex),t.box(e-.4,.1,1.94,0,2.35,0,14260736);for(let n of[1,-1]){for(let i=0;i<4;i++)t.plane(1,.62,-1.7+i*1.15,1.72,n*1,si,{ry:n>0?0:Math.PI,noAO:!0});t.box(.08,.5,.03,.2,1.45,n*.99,2236962)}t.quad([2.46,1.35,.9],[2.46,1.35,-.9],[2.46,2.25,-.8],[2.46,2.25,.8],si,{noAO:!0}),t.quad([-2.46,1.35,-.9],[-2.46,1.35,.9],[-2.46,2.25,.8],[-2.46,2.25,-.8],si,{noAO:!0}),t.box(.18,.28,2.1,2.45,.28,0,2237480),t.box(.18,.28,2.1,-2.45,.28,0,2237480);for(let n of[.7,-.7])t.box(.06,.2,.32,2.46,.78,n,16774348,{noAO:!0}),t.box(.06,.2,.3,-2.46,.78,n*1.1,15022389,{noAO:!0});return t.box(3.4,.05,1.7,-.2,2.46,0,3355443),t.box(1.1,.5,.8,-.9,2.5,.2,9268835),t.box(.9,.4,.7,.5,2.5,-.3,4157365),t.box(.5,.35,.5,1.2,2.5,.35,12986408),t.box(.1,.12,.9,2.2,2.36,0,1118481),t.build()}function bu(s=yu,t=1513499){let e=new We(21,.02);e.wheel(.3,.2,1.2,.3,0,1710620);for(let n of[.68,-.68])e.wheel(.3,.22,-.65,.3,n,1710620);e.box(2.1,.7,1.2,-.3,.3,0,s),e.box(.9,.8,.62,1.05,.3,0,s),e.quad([1.52,1.1,.3],[1.52,1.1,-.3],[1,1.75,-.3],[1,1.75,.3],si,{noAO:!0});for(let n of[.58,-.58])e.box(.08,.95,.08,-.3+.5,1,n,t);for(let n of[.58,-.58])e.box(.08,.95,.08,-1.2,1,n,t);return e.box(2.3,.1,1.45,-.25,1.95,0,t),e.box(.7,.35,1,-.8,.9,0,5125166),e.box(.06,.16,.2,1.52,.7,0,16774348,{noAO:!0}),e.build()}function Mu(s){let t=new We(31+(s()*99|0),.03);t.wheel(.34,.12,.7,.34,0,1710620),t.wheel(.34,.14,-.7,.34,0,1710620),t.box(1.5,.12,.14,0,.45,0,2829099),t.box(.45,.28,.3,.22,.6,0,[12986408,1402304,16761358][s()*3|0]),t.box(.8,.1,.3,-.3,.68,0,2236962),t.box(.08,.5,.08,.6,.5,0,8947848),t.box(.1,.07,.7,.62,1,0,2236962);let e=[34641,16761358,15094016,1402304,16777215,6953882][s()*6|0];return t.capsule(.17,.35,-.2,.78,0,e,{rz:-.25}),t.sphere(.15,-.07,1.62,0,13010498,{noAO:!0}),t.sphere(.17,-.07,1.68,0,[1118481,16761358,12986408][s()*3|0],{sy:.85,noAO:!0}),t.box(.45,.14,.24,.08,.8,0,3622735),s()>.45&&(t.capsule(.17,.32,-.65,.75,0,[15277667,4149685,38536][s()*3|0],{rz:.1}),t.sphere(.14,-.62,1.55,0,9262372,{noAO:!0})),t.build()}function nc(s,t){let e=new We(41+(t&255),.02),n=s==="suv",i=s==="hatch",r=n?4.6:i?3.8:4.5,o=n?.95:.7;vu(e,[r*.32,-r*.32],[.82,-.82],n?.45:.37,.26),e.box(r,o,1.84,0,.3,0,t);let a=n?r*.68:i?r*.62:r*.5,l=n?-.2:i?-.25:-.3,c=n?.8:.62;e.box(a,c,1.66,l,.3+o,0,t);for(let u of[.84,-.84])e.plane(a*.46,c*.7,l+a*.22,.3+o+c*.5,u,si,{ry:u>0?0:Math.PI,noAO:!0}),e.plane(a*.4,c*.7,l-a*.24,.3+o+c*.5,u,si,{ry:u>0?0:Math.PI,noAO:!0});e.quad([l+a/2+.01,.3+o+.05,.75],[l+a/2+.01,.3+o+.05,-.75],[l+a/2-.35,.3+o+c-.05,-.72],[l+a/2-.35,.3+o+c-.05,.72],si,{noAO:!0}),e.quad([l-a/2-.01,.3+o+.05,-.75],[l-a/2-.01,.3+o+.05,.75],[l-a/2+.3,.3+o+c-.05,.72],[l-a/2+.3,.3+o+c-.05,-.72],si,{noAO:!0}),e.box(.15,.25,1.86,r/2,.22,0,2829099),e.box(.15,.25,1.86,-r/2,.22,0,2829099);for(let u of[.65,-.65])e.box(.05,.16,.36,r/2+.02,.7,u,16774348,{noAO:!0}),e.box(.05,.16,.34,-r/2-.02,.7,u,15022389,{noAO:!0});return e.build()}var rc=new Kt({vertexColors:!0}),nx=ho(),ix=new Ee(1,1).rotateX(-Math.PI/2),sx=new Jt({map:nx,transparent:!0,depthWrite:!1}),oc=(s,t)=>{let e=new et(ix,sx);return e.scale.set(s,1,t),e.position.y=.08,e.renderOrder=1,e},xo=s=>[Math.cos(s),-Math.sin(s)],ic=new Map;function rx(s){if(ic.has(s))return ic.get(s);let t=new We(3,.02);t.box(.42,.9,.36,0,0,.17,2899558,{noAO:!0}),t.box(.42,.9,.36,0,0,-.17,2899558,{noAO:!0}),t.box(.5,.85,.82,0,.85,0,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,.5,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,-.5,s,{noAO:!0}),t.sphere(.27,0,2,0,9262372,{noAO:!0}),t.box(.48,.14,.52,-.02,2.14,0,1710618,{noAO:!0});let e=t.build();return ic.set(s,e),e}function Vs(s){let t=new Xt,e=new et(rx(new Mt(s).getHex()),rc);return e.scale.setScalar(.92),t.add(e),t.userData.body=e,t.add(oc(1.6,1.6)),t}var sc=new Map;function ri(s){let t=new Mt(s).getHex();sc.has(t)||sc.set(t,nc("hatch",t));let e=new Xt,n=new et(sc.get(t),rc);return n.position.y=.12,e.add(n),e.add(oc(5.2,2.8)),e}function Ne(s,t){let e=new Wr(new Ns({map:hu(s,t),depthTest:!1,transparent:!0}));return e.scale.set(5.5,1.38,1),e.renderOrder=10,e}function Su(s,t=7){let e=s.length,n=[];for(let r=0;r<e;r++){let o=s[(r+e-1)%e],a=s[r],l=s[(r+1)%e],c=wu([o[0]-a[0],o[1]-a[1]]),u=wu([l[0]-a[0],l[1]-a[1]]),h=[a[0]+c[0]*t,a[1]+c[1]*t],d=[a[0]+u[0]*t,a[1]+u[1]*t];for(let f=0;f<=8;f++){let g=f/8;n.push([(1-g)*(1-g)*h[0]+2*(1-g)*g*a[0]+g*g*d[0],(1-g)*(1-g)*h[1]+2*(1-g)*g*a[1]+g*g*d[1]])}}let i=[0];for(let r=1;r<=n.length;r++){let o=n[r-1],a=n[r%n.length];i.push(i[r-1]+Math.hypot(a[0]-o[0],a[1]-o[1]))}return{pts:n,cum:i,length:i[i.length-1]}}var wu=s=>{let t=Math.hypot(s[0],s[1])||1;return[s[0]/t,s[1]/t]};function fo(s,t,e){t=(t%s.length+s.length)%s.length;let n=0,i=s.cum.length-1;for(;i-n>1;){let l=n+i>>1;s.cum[l]<=t?n=l:i=l}let r=s.pts[n],o=s.pts[(n+1)%s.pts.length],a=(t-s.cum[n])/Math.max(1e-6,s.cum[n+1]-s.cum[n]);return e.x=r[0]+(o[0]-r[0])*a,e.z=r[1]+(o[1]-r[1])*a,e.yaw=Math.atan2(-(o[1]-r[1]),o[0]-r[0]),e}var po=class{constructor(t,e){this.cars=[];let n=hs(2026),i={},r=[16119285,11580858,2040616,12000284,1986444,3042106,14076328,8019006];for(let o of e){let a=Su(o.pts),l=6.5+n()*3,c=Math.max(3,Math.round(a.length/85));for(let u=0;u<c;u++){let h=o.npcs[n()*o.npcs.length|0],d;h==="danfo"?d=_u(n):h==="keke"?d=bu(n()>.2?16761358:3046706,1513499):h==="okada"?d=Mu(n):d=nc(["sedan","suv","hatch"][n()*3|0],r[n()*r.length|0]);let f=new Xt,g=new et(d,rc);g.position.y=.12,f.add(g),f.add(oc(h==="okada"?3:5.5,h==="okada"?1.4:2.8)),t.add(f),this.cars.push({g:f,P:a,speed:l*(h==="okada"?1.25:h==="danfo"?.9:1),off:a.length*u/c+n()*6,type:h})}}this.tmp={}}update(t,e=null,n=.016){this.last||(this.last=t);let i=Math.min(.1,Math.max(0,t-this.last))||n;if(this.last=t,!e){for(let a of this.cars)fo(a.P,a.speed*t+a.off,this.tmp),a.g.position.set(this.tmp.x,.02,this.tmp.z),a.g.rotation.y=this.tmp.yaw;return}let r=this.blockers||(this.blockers=[]);r.length=0;for(let a of e)r.push({x:a.x,z:a.z,r:a.r??.5,person:!0});let o=this.carB||(this.carB=this.cars.map(a=>({x:0,z:0,r:1.8,self:a,person:!1})));this.cars.forEach((a,l)=>{o[l].x=a.g.position.x,o[l].z=a.g.position.z}),this.stopped=0;for(let[a,l]of this.cars.entries()){l.s==null&&(l.s=l.speed*t+l.off,l.st={v:l.speed,wait:0,limit:wi.waitMin+Math.random()*(wi.waitMax-wi.waitMin)}),fo(l.P,l.s,this.tmp);let c={x:this.tmp.x,z:this.tmp.z,yaw:this.tmp.yaw,self:l},u=[];for(let x of r)Math.abs(x.x-c.x)<18&&Math.abs(x.z-c.z)<18&&u.push(x);for(let x=0;x<o.length;x++)x!==a&&Math.abs(o[x].x-c.x)<18&&Math.abs(o[x].z-c.z)<18&&u.push(o[x]);let h=xu(mu(c,u),{speed:l.st.v,type:l.type}).hit,d=l.speed*t+l.off,f=d-l.s,g=l.speed*(f>.5&&!h?wi.catchUp:1);l.st=gu(l.st,g,h,i),l.s+=l.st.v*i,f<-2&&(l.s=d),l.st.v<.2&&h&&this.stopped++,l.st.honk&&this.onHorn&&this.onHorn(l,c),fo(l.P,l.s,this.tmp),l.g.position.set(this.tmp.x,.02,this.tmp.z),l.g.rotation.y=this.tmp.yaw}}},mo=class{constructor(t,e,n=36){let i=hs(5),r=new rs(.26,.8,2,6).translate(0,.65,0),o=new an(.22,8,6).translate(0,1.65,0);this.body=new Os(r,new Kt,n),this.head=new Os(o,new Kt,n),this.body.frustumCulled=this.head.frustumCulled=!1,t.add(this.body,this.head),this.items=[];let a=new Mt,l=[34641,16761358,16777215,14172949,2001125,11342935,6953882,3622735,16361509],c=[9262372,13010498,7029286,4860951,10512698],u=e.filter(h=>h.z0<150);for(let h=0;h<n;h++){let d=u[i()*u.length|0],f=1.5,g=Su([[d.x0+f,d.z0+f],[d.x1-f,d.z0+f],[d.x1-f,d.z1-f],[d.x0+f,d.z1-f]],4);this.items.push({P:g,off:i()*g.length,v:1.1+i()*.7,dir:i()>.5?1:-1,ph:i()*6}),this.body.setColorAt(h,a.setHex(l[i()*l.length|0])),this.head.setColorAt(h,a.setHex(c[i()*c.length|0]))}this.m=new se,this.q=new Je,this.p=new P,this.s=new P(1,1,1),this.tmp={},this.up=new P(0,1,0)}update(t){this.items.forEach((e,n)=>{fo(e.P,e.dir*e.v*t+e.off,this.tmp),this.q.setFromAxisAngle(this.up,this.tmp.yaw+(e.dir<0?Math.PI:0)),this.p.set(this.tmp.x,.2+Math.abs(Math.sin(t*6+e.ph))*.07,this.tmp.z),this.m.compose(this.p,this.q,this.s),this.body.setMatrixAt(n,this.m),this.head.setMatrixAt(n,this.m)}),this.body.instanceMatrix.needsUpdate=this.head.instanceMatrix.needsUpdate=!0}},go=class{constructor(t){this.scene=t,this.map=new Map}ingest(t,e){let n=new Set;for(let i of t){n.add(i.id);let r=this.map.get(i.id);r||(r={id:i.id,name:i.n,color:i.c,mode:-1,samples:[],obj:null,tag:null,act:""},this.map.set(i.id,r)),r.mode=i.m,r.act=i.act||"";for(let[o,a,l,c]of i.s){let u=e+o;(!r.samples.length||u>r.samples[r.samples.length-1].t+50)&&r.samples.push({t:u,x:a,z:l,ry:c})}r.samples.length>60&&r.samples.splice(0,r.samples.length-60),this.build(r)}for(let[i,r]of this.map)n.has(i)||(this.scene.remove(r.root),this.map.delete(i))}build(t){let e=t.mode===1?"car":"walk";t.kind===e&&t.root||(t.root&&this.scene.remove(t.root),t.root=new Xt,t.obj=e==="car"?ri(t.color):Vs(t.color),t.root.add(t.obj),t.tag=Ne(t.name,"#ffffff"),t.tag.position.set(0,e==="car"?4.2:3.6,0),t.root.add(t.tag),t.kind=e,this.scene.add(t.root),t.first=!0)}update(t){for(let e of this.map.values()){let n=e.samples;if(!n.length||!e.root)continue;let i=n[0],r=n[n.length-1];if(t<=n[0].t)i=r=n[0];else if(t>=n[n.length-1].t)i=r=n[n.length-1];else for(let d=0;d<n.length-1;d++)if(n[d].t<=t&&n[d+1].t>=t){i=n[d],r=n[d+1];break}let o=i===r?0:(t-i.t)/(r.t-i.t||1),a=i.x+(r.x-i.x)*o,l=i.z+(r.z-i.z)*o,c=r.ry-i.ry;c=Math.atan2(Math.sin(c),Math.cos(c));let u=i.ry+c*o;e.root.position.set(a,0,l),e.root.rotation.y=u;let h=Math.hypot(r.x-i.x,r.z-i.z)>.05&&i!==r;e.kind==="walk"&&(e.obj.userData.body.position.y=h?Math.abs(Math.sin(t/140))*.08:0)}}dispose(){for(let t of this.map.values())this.scene.remove(t.root);this.map.clear()}};var Si=(s,t,e)=>Math.max(t,Math.min(e,s)),Eu=(s,t)=>Math.atan2(Math.sin(t-s),Math.cos(t-s)),yo=class{constructor(t,e,n,i,r){this.city=e,this.colliders=n,this.canvas=t,this.x=0,this.z=0,this.ry=0,this.mode="walk",this.v=0,this.cam=12,this.camYaw=0,this.camPitch=.62,this.dragT=0,this.frozen=!1,this.keys=new Set,this.joy={x:0,y:0,active:!1},this.run=!1,this.moving=!1,this.blocked=!1,this.root=new Xt,this.setLook(i,r),this.bind()}setLook(t,e){this.color=t,this.name=e,this.avatar&&(this.root.remove(this.avatar),this.root.remove(this.carObj)),this.avatar=Vs(t),this.carObj=ri(t),this.root.add(this.avatar,this.carObj),this.carObj.visible=!1,this.tag||(this.tag=Ne(e||"You","#ffe27a"),this.root.add(this.tag)),this.applyMode()}applyMode(){this.avatar.visible=this.mode==="walk",this.carObj.visible=this.mode==="drive",this.tag.position.set(0,this.mode==="drive"?4.2:3.6,0)}toggleCar(){return this.mode=this.mode==="walk"?"drive":"walk",this.v=0,this.applyMode(),this.mode==="drive"&&(this.camYaw=this.ry),this.mode}teleport(t,e){this.x=t,this.z=e,this.v=0}bind(){let t=h=>{if(h.target.closest("input,textarea,select"))return;let d=h.key.toLowerCase();["arrowup","arrowdown","arrowleft","arrowright"," "].includes(d)&&h.preventDefault(),this.keys.add(d),d==="shift"&&(this.run=!0)},e=h=>{let d=h.key.toLowerCase();this.keys.delete(d),d==="shift"&&(this.run=!1)};addEventListener("keydown",t),addEventListener("keyup",e),addEventListener("blur",()=>{this.keys.clear(),this.run=!1});let n=null;this.canvas.addEventListener("pointerdown",h=>{h.target===this.canvas&&(n={id:h.pointerId,x:h.clientX,y:h.clientY,moved:0},this.canvas.setPointerCapture?.(h.pointerId))}),this.canvas.addEventListener("pointermove",h=>{if(!n||n.id!==h.pointerId)return;let d=h.clientX-n.x,f=h.clientY-n.y;n.x=h.clientX,n.y=h.clientY,n.moved+=Math.abs(d)+Math.abs(f),this.camYaw-=d*.006,this.camPitch=Si(this.camPitch+f*.004,.25,1.15),this.dragT=performance.now()});let i=h=>{n&&n.id===h.pointerId&&(this.lastTap=n.moved<6?{x:h.clientX,y:h.clientY,t:performance.now()}:null,n=null)};this.canvas.addEventListener("pointerup",i),this.canvas.addEventListener("pointercancel",i),this.canvas.addEventListener("wheel",h=>{this.cam=Si(this.cam+h.deltaY*.01,7,26),h.preventDefault()},{passive:!1});let r=document.getElementById("joy"),o=document.getElementById("joyKnob");if(!r)return;let a=null,l=52,c=h=>{let d=r.getBoundingClientRect(),f=h.clientX-(d.left+d.width/2),g=h.clientY-(d.top+d.height/2),x=Math.hypot(f,g);x>l&&(f=f/x*l,g=g/x*l),this.joy.x=f/l,this.joy.y=-g/l,o.style.transform=`translate(${f}px,${g}px)`};r.addEventListener("pointerdown",h=>{a=h.pointerId,r.setPointerCapture(h.pointerId),this.joy.active=!0,c(h),h.preventDefault()}),r.addEventListener("pointermove",h=>{h.pointerId===a&&c(h)});let u=h=>{h.pointerId===a&&(a=null,this.joy.x=this.joy.y=0,this.joy.active=!1,o.style.transform="")};r.addEventListener("pointerup",u),r.addEventListener("pointercancel",u)}input(){let t=this.keys,e=(t.has("d")||t.has("arrowright")?1:0)-(t.has("a")||t.has("arrowleft")?1:0),n=(t.has("w")||t.has("arrowup")?1:0)-(t.has("s")||t.has("arrowdown")?1:0);this.joy.active&&(e=this.joy.x,n=this.joy.y);let i=Math.hypot(e,n);return i>1&&(e/=i,n/=i),{ix:e,iy:n}}update(t){let{ix:e,iy:n}=this.frozen?{ix:0,iy:0}:this.input(),i=this.x,r=this.z;if(this.keys.has("q")&&(this.camYaw+=t*1.8),this.keys.has("e"),this.mode==="walk"){let c=Math.hypot(e,n);if(c>.08){let u=xo(this.camYaw),h=[Math.sin(this.camYaw),Math.cos(this.camYaw)],d=u[0]*n+h[0]*e,f=u[1]*n+h[1]*e,g=Math.hypot(d,f);d/=g,f/=g;let x=(this.run?7:5.2)*Math.min(1,c);this.x+=d*x*t,this.z+=f*x*t,this.v=x;let y=Math.atan2(-f,d);this.ry+=Eu(this.ry,y)*Math.min(1,t*12)}else this.v=0}else{let l=n>.15?n:n<-.15?n*.6:0,c=Math.abs(e)>.1?e:0,u=20;l>0?this.v+=15*l*t:l<0?this.v+=(this.v>0?24:8)*l*t:this.v-=Math.sign(this.v)*Math.min(Math.abs(this.v),6*t),this.v=Si(this.v,-6,u),this.ry-=c*Math.min(1,Math.abs(this.v)/5)*1.9*t*(this.v>=0?1:-1);let h=xo(this.ry);this.x+=h[0]*this.v*t,this.z+=h[1]*this.v*t,performance.now()-this.dragT>1500&&(this.camYaw+=Eu(this.camYaw,this.ry)*Math.min(1,t*3))}let o=this.mode==="drive"?2:.7;this.blocked=!1;for(let l=0;l<2;l++)for(let c of this.colliders){if(this.x<c.x0-o||this.x>c.x1+o||this.z<c.z0-o||this.z>c.z1+o)continue;let u=Si(this.x,c.x0,c.x1),h=Si(this.z,c.z0,c.z1),d=this.x-u,f=this.z-h,g=Math.hypot(d,f);if(g<o){if(g<1e-4){let x=[[c.x0-o-this.x,0],[c.x1+o-this.x,0],[0,c.z0-o-this.z],[0,c.z1+o-this.z]].sort((y,m)=>Math.hypot(...y)-Math.hypot(...m))[0];this.x+=x[0],this.z+=x[1]}else this.x=u+d/g*o,this.z=h+f/g*o;this.blocked=!0,this.mode==="drive"&&(this.v*=.5)}}let a=this.city.bounds;this.x=Si(this.x,a.minX+1,a.maxX-1),this.z=Si(this.z,a.minZ+1,a.maxZ-3),this.moving=Math.hypot(this.x-i,this.z-r)>.002,this.root.position.set(this.x,0,this.z),this.root.rotation.y=this.ry,this.mode==="walk"&&(this.avatar.userData.body.position.y=this.moving?Math.abs(Math.sin(performance.now()/120))*.09:0)}placeCamera(t,e){let n=this.cam*(this.mode==="drive"?1.4:1),i=xo(this.camYaw),r=Math.sin(this.camPitch)*n,o=Math.cos(this.camPitch)*n,a=this.x-i[0]*o,l=this.z-i[1]*o,c=r+1.2,u=1-Math.pow(6e-4,e);t.position.x+=(a-t.position.x)*u,t.position.y+=(c-t.position.y)*u,t.position.z+=(l-t.position.z)*u,t.lookAt(this.x,1.6,this.z),t.updateMatrixWorld(),t.matrixWorldInverse.copy(t.matrixWorld).invert()}};var Ei=new P,vo=class{constructor(t,e,n){this.world=t,this.city=e,this.now=n,this.rot=1e4,this.slots={},this.imgs=new Map,this.evidence=[],this.houseTex=new Map,this.state={},this.lastKey={},this.maxDist=90}setSnapshot(t){if(t){this.slots=t.slots||{},this.rot=t.rotationMs||1e4;for(let e of Object.values(this.slots))for(let n of e)this.loadImg(n.i)}}loadImg(t){if(this.imgs.has(t))return;let e={img:new Image,ok:!1,tex:{}};this.imgs.set(t,e),e.img.onload=()=>{e.ok=!0,this.lastKey={}},e.img.onerror=()=>{e.failed=!0},e.img.src=window.__naMedia?window.__naMedia(t):`/media/creative/${t}`}house(t,e,n){let i=this.houseTex.get(t);if(!i){let r=this.world.boards[t].def;i=uu(e>=n*1.5?1024:768,e>=n*1.5?512:768,r.surface==="lagoon_plot"?"Lagoon plot":r.surface==="airport_board"?"Airport board":"Road billboard","Rent this board at /advertise",t.charCodeAt(t.length-1)),this.houseTex.set(t,i)}return i}currentFor(t,e){let n=this.slots[t];return!n||!n.length?null:n[e%n.length]}update(t,e,n,i){var a;let r=this.now(),o=Math.floor(r/this.rot);for(let[l,c]of Object.entries(this.world.boards)){let u=c.def,h=u.x-n.x,d=u.z-n.z,f=Math.hypot(h,d),g=this.currentFor(l,o),x=g?`c${g.c}`:"house";if(c.shownKey!==x||this.lastKey[l]!==x){let v=g&&this.imgs.get(g.i);if(g&&v&&v.ok){let S=v.tex[o%1]||(v.tex.t=v.tex.t||du(v.img,u.surface==="lagoon_plot"?768:1024,u.surface==="lagoon_plot"?768:512,g.b));c.mat.map=S,c.mat.color.set(16777215),c.mat.needsUpdate=!0,c.shownKey=x,this.lastKey[l]=x}else g?c.mat.map||(c.mat.map=this.house(l,u.w,u.h),c.mat.needsUpdate=!0):(c.mat.map=this.house(l,u.w,u.h),c.mat.needsUpdate=!0,c.shownKey=x,this.lastKey[l]=x)}let y=(a=this.state)[l]||(a[l]={win:o,camp:null,cont:0,best:0,pctSum:0,pctN:0});if(y.win!==o&&(this.flush(l,y),y.win=o,y.camp=g?g.c:null,y.cont=0,y.best=0,y.pctSum=0,y.pctN=0),y.camp=g?g.c:null,!g||f>this.maxDist+30||document.hidden){y.cont=0;continue}let m=this.visiblePct(t,e,c);m>=50?(y.cont+=i,y.best=Math.max(y.best,y.cont),y.pctSum+=m,y.pctN++):y.cont=0}}flush(t,e){!e.camp||e.best<300||this.evidence.length<120&&this.evidence.push({slot:t,win:e.win,c:e.camp,pct:Math.round(e.pctSum/Math.max(1,e.pctN)),ms:Math.round(Math.min(e.best,this.rot)),vis:!0})}take(){let t=this.evidence;return this.evidence=[],t}visiblePct(t,e,n){let i=n.def,r=i.x,o=i.y,a=i.z,l=t.position;if((l.x-r)*i.nx+(l.z-a)*i.nz<=0)return 0;for(let S of this.world.colliders){if(S.h<2)continue;let _=ox(l.x,l.z,r,a,S);if(_===null)continue;if(l.y+(o-l.y)*_<S.h)return 0}let c=i.nz,u=-i.nx,h=9,d=-9,f=9,g=-9;for(let[S,_]of[[-1,-1],[1,-1],[1,1],[-1,1]]){if(Ei.set(r+c*S*i.w/2,o+_*i.h/2,a+u*S*i.w/2),Ei.clone().applyMatrix4(t.matrixWorldInverse).z>-.1)return 0;Ei.project(t),h=Math.min(h,Ei.x),d=Math.max(d,Ei.x),f=Math.min(f,Ei.y),g=Math.max(g,Ei.y)}if((g-f)/2*e.h<22)return 0;let y=(d-h)*(g-f),m=Math.max(0,Math.min(1,d)-Math.max(-1,h)),v=Math.max(0,Math.min(1,g)-Math.max(-1,f));return y>0?100*m*v/y:0}nearest(t,e,n=40){let i=null,r=n;for(let[o,a]of Object.entries(this.world.boards)){let l=Math.hypot(a.def.x-t,a.def.z-e);l<r&&(r=l,i=o)}return i}};function ox(s,t,e,n,i){let r=0,o=1,a=e-s,l=n-t;for(let[c,u]of[[-a,s-i.x0],[a,i.x1-s],[-l,t-i.z0],[l,i.z1-t]])if(c===0){if(u<0)return null}else{let h=u/c;if(c<0){if(h>o)return null;h>r&&(r=h)}else{if(h<r)return null;h<o&&(o=h)}}return r>.02&&r<.98?r:null}var ax=["audio/webm;codecs=opus","audio/ogg;codecs=opus","audio/mp4"],Tu=()=>typeof MediaRecorder>"u"?null:ax.find(s=>MediaRecorder.isTypeSupported?.(s))||null,_o=class{constructor(t){this.g=t,this.call=null,this.pc=null,this.stream=null,this.muted=!1,this.pendingIce=[],this.offer=null,this.badges={msgs:0,reqs:0,missed:0},this.listeners=new Set,this.enabled=!!t.cfg.phone}get usable(){return this.enabled&&!this.g.user?.guest}on(t){return this.listeners.add(t),()=>this.listeners.delete(t)}emit(t){for(let e of this.listeners)try{e(t)}catch{}}start(){this.usable&&(this.refresh(),this.timer=setInterval(()=>this.poll(),5e3))}stop(){clearInterval(this.timer),this.endLocal()}async refresh(){if(this.usable)try{let t=await Dt("/api/phone/friends"),e=await Dt("/api/phone/threads");this.badges.reqs=t.incoming.length,this.badges.msgs=e.threads.reduce((n,i)=>n+i.unread,0),this.drawBadge()}catch{}}drawBadge(){let t=this.badges.msgs+this.badges.reqs+this.badges.missed,e=nt("#phoneBadge");e&&t&&(e.textContent=String(t+(this.g.unread||0)),e.classList.remove("hidden"))}async poll(){if(this.usable){try{let t=await Dt("/api/phone/call");t.call&&(!this.call||this.call.callId!==t.call.callId)?this.adopt(t.call):!t.call&&this.call&&this.call.state!=="ended"&&Date.now()-(this.call.startedAt||0)>4e3&&this.finish("ended")}catch{}this.refresh()}}adopt(t){this.call&&this.call.callId===t.callId||(this.call={...t,startedAt:Date.now()},this.iceServers=t.iceServers||this.iceServers,t.incoming&&t.state==="ringing"&&this.ringIn(),this.render())}onPush(t){let e=t.type;e==="phone.message"?(this.badges.msgs++,this.drawBadge(),this.emit({kind:"message",m:t}),document.querySelector('[data-chat-open="'+t.from+'"]')||this.g.ui.toast(`\u{1F4AC} @${t.from}: ${t.kind==="voice"?"\u{1F3A4} voice note":(t.text||"").slice(0,60)}`)):e==="phone.message.read"?this.emit({kind:"read",m:t}):e==="phone.friend.request"?(this.badges.reqs++,this.drawBadge(),this.g.ui.toast(`\u{1F91D} @${t.from} sent a friend request`),this.emit({kind:"friends"})):e==="phone.friend.update"?this.emit({kind:"friends"}):e==="phone.call.incoming"?(this.iceServers=t.iceServers,this.call={callId:t.callId,state:"ringing",with:t.from,incoming:!0,ringUntil:t.ringUntil,startedAt:Date.now()},this.offer=null,this.pendingIce=[],this.ringIn(),this.render()):e==="phone.call.state"&&this.call?.callId===t.callId?(this.call.state=t.state,t.iceServers&&(this.iceServers=t.iceServers),this.render()):e==="phone.call.signal"&&this.call?.callId===t.callId?this.onSignal(t):e==="phone.call.ended"&&this.call?.callId===t.callId&&((t.reason==="missed"||t.reason==="cancelled"||t.reason==="dnd"||t.reason==="busy")&&this.call.incoming&&(this.badges.missed++,this.drawBadge(),this.g.ui.toast(`\u{1F4DE} Missed call from @${this.call.with}`)),this.finish(t.reason))}ringIn(){this.stopRing(),this.ringBeep(),this.ringTimer=setInterval(()=>this.ringBeep(),2200);try{navigator.vibrate?.([300,150,300])}catch{}}ringBeep(){try{let t=this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext));t.state==="suspended"&&t.resume();let e=t.currentTime;[0,.35].forEach((n,i)=>{let r=t.createOscillator(),o=t.createGain();r.type="sine",r.frequency.value=i?523:659,o.gain.setValueAtTime(1e-4,e+n),o.gain.exponentialRampToValueAtTime(.08,e+n+.03),o.gain.exponentialRampToValueAtTime(1e-4,e+n+.3),r.connect(o).connect(t.destination),r.start(e+n),r.stop(e+n+.32)})}catch{}}stopRing(){clearInterval(this.ringTimer),this.ringTimer=null}async consentOk(){return(await Dt("/api/phone/settings")).voiceConsent?!0:new Promise(e=>{let n=r=>{i.remove(),e(r)},i=p("div",{id:"consentUi"},p("div",{class:"cinner card"},p("b",{},"Voice notice"),p("p",{},"Calls and voice notes use your microphone. Calls are peer to peer and are never recorded by the game. Voice notes are deleted 24 hours after sending. You can mute, block or report anyone. 18+ only."),p("div",{class:"crow"},p("button",{class:"cbtn green",id:"voiceConsent",onclick:async()=>{await at("/api/phone/settings",{voiceConsent:!0}),n(!0)}},"I agree"),p("button",{class:"cbtn",onclick:()=>n(!1)},"Not now"))));document.body.append(i)})}async dial(t){if(this.call&&this.call.state!=="ended")return this.g.ui.toast("You are already in a call.");if(!await this.consentOk())return;let e=await this.g.ui.guard(()=>at("/api/phone/call/start",{to:t}));if(e){if(e.ok===!1){this.g.ui.toast(e.text||"They cannot take the call right now.");return}this.iceServers=e.iceServers,this.call={callId:e.callId,state:"ringing",with:t,incoming:!1,ringUntil:e.ringUntil,startedAt:Date.now()},this.render();try{await this.openMic(),await this.makePc();let n=await this.pc.createOffer();await this.pc.setLocalDescription(n),await at("/api/phone/call/signal",{callId:e.callId,kind:"offer",sdp:n.sdp})}catch(n){this.g.ui.toast(this.micMsg(n)),this.hangup()}}}micMsg(t){return t?.name==="NotAllowedError"?"Microphone is blocked. Allow it in your browser settings to call.":t?.name==="NotFoundError"?"No microphone found.":"Could not start the call audio."}async openMic(){this.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,channelCount:1},video:!1})}async makePc(){let t=this.pc=new RTCPeerConnection({iceServers:this.iceServers||[{urls:["stun:stun.l.google.com:19302"]}]}),e=this.call.callId;for(let n of this.stream.getTracks())t.addTrack(n,this.stream);t.onicecandidate=n=>{n.candidate&&at("/api/phone/call/signal",{callId:e,kind:"ice",candidate:n.candidate.toJSON()}).catch(()=>{})},t.ontrack=n=>{let i=nt("#callAudio");i||(i=p("audio",{id:"callAudio",autoplay:!0,playsinline:!0}),document.body.append(i)),i.srcObject=n.streams[0],i.play?.().catch(()=>{})},t.onconnectionstatechange=()=>{var n;this.call&&(this.call.rtc=t.connectionState,t.connectionState==="connected"&&((n=this.call).connectedAt||(n.connectedAt=Date.now()),this.sendStats()),t.connectionState==="failed"&&(this.g.ui.toast("The call could not connect (network)."),this.hangup()),this.render())}}async onSignal(t){try{t.kind==="offer"?(this.offer=t,this.pc&&await this.takeOffer()):t.kind==="answer"?(await this.pc?.setRemoteDescription({type:"answer",sdp:t.sdp}),await this.flushIce()):t.kind==="ice"&&(this.pc?.remoteDescription?await this.pc.addIceCandidate(t.candidate).catch(()=>{}):this.pendingIce.push(t.candidate))}catch(e){console.warn("signal",e)}}async flushIce(){for(let t of this.pendingIce.splice(0))await this.pc.addIceCandidate(t).catch(()=>{})}async takeOffer(){await this.pc.setRemoteDescription({type:"offer",sdp:this.offer.sdp}),await this.flushIce();let t=await this.pc.createAnswer();await this.pc.setLocalDescription(t),await at("/api/phone/call/signal",{callId:this.call.callId,kind:"answer",sdp:t.sdp})}async answer(){if(!this.call?.incoming)return;if(this.stopRing(),!await this.consentOk())return this.decline();let t=await this.g.ui.guard(()=>at("/api/phone/call/act",{callId:this.call.callId,action:"answer"}));if(!t||t.state!=="active")return this.finish(t?.reason||"missed");this.call.state="active",this.render();try{await this.openMic(),await this.makePc(),this.offer&&await this.takeOffer()}catch(e){this.g.ui.toast(this.micMsg(e)),this.hangup()}}async decline(){this.stopRing(),this.call&&(await at("/api/phone/call/act",{callId:this.call.callId,action:"decline"}).catch(()=>{}),this.finish("declined"))}async hangup(){let t=this.call;t&&(this.stopRing(),await at("/api/phone/call/act",{callId:t.callId,action:t.state==="ringing"&&!t.incoming?"cancel":"hangup"}).catch(()=>{}),this.finish("completed"))}toggleMute(){this.muted=!this.muted,this.stream?.getAudioTracks().forEach(t=>{t.enabled=!this.muted}),this.render()}async sendStats(){try{let t=await this.pc.getStats(),e=null;t.forEach(n=>{if(n.type==="candidate-pair"&&n.state==="succeeded"&&n.nominated){let i=t.get(n.localCandidateId);e=i?.candidateType==="relay"?"relay":i?.candidateType==="srflx"?"srflx":"host"}}),e&&(this.call.icePath=e,at("/api/phone/call/stats",{callId:this.call.callId,icePath:e}).catch(()=>{}))}catch{}}endLocal(){this.stopRing();try{this.pc?.close()}catch{}this.pc=null,this.stream?.getTracks().forEach(t=>t.stop()),this.stream=null,this.offer=null,this.pendingIce=[],this.muted=!1,nt("#callAudio")?.remove()}finish(t){let e=this.call;this.endLocal(),e&&(e.state="ended",e.reason=t,this.render(),this.emit({kind:"call-ended",c:e}),this.lastEnded=e,setTimeout(()=>{this.call===e&&(this.call=null,this.render())},2200))}render(){let t=nt("#callUi"),e=this.call;if(!e){t?.remove();return}t||(t=p("div",{id:"callUi"}),document.body.append(t));let n=!!(this.g.venue?.open&&this.g.venue.match&&this.g.venue.match.status==="playing"),i=e.connectedAt?Math.floor((Date.now()-e.connectedAt)/1e3):0,r=`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`,o=e.state==="ended"?{completed:"Call ended",declined:"Call declined",missed:"Missed call",cancelled:"Missed call",busy:"They are busy",dnd:"Not available",failed:"Call failed"}[e.reason]||"Call ended":e.incoming&&e.state==="ringing"?"Incoming call":e.state==="ringing"?"Calling\u2026":e.rtc==="connected"?`In call \xB7 ${r}`:"Connecting\u2026",a=(c,u,h,d)=>p("button",{id:c,class:`cbtn ${u}`,onclick:d},h),l=e.state==="ended"?[]:e.incoming&&e.state==="ringing"?[a("callDecline","red","\u2716 Decline",()=>this.decline()),a("callAnswer","green","\u{1F4DE} Answer",()=>this.answer())]:[a("callMute",this.muted?"on":"",this.muted?"\u{1F507} Muted":"\u{1F399} Mute",()=>this.toggleMute()),a("callHang","red",e.state==="ringing"?"\u2716 Cancel":"\u{1F4F5} Hang up",()=>this.hangup())];t.className=n?"banner":"",t.replaceChildren(p("div",{class:"cinner"},p("div",{class:"cavatar"},"\u{1F4DE}"),p("div",{class:"cname"},`@${e.with}`),p("div",{class:"cstate",id:"callState"},o),p("div",{class:"crow"},l))),clearInterval(this.uiTick),e.state==="active"&&(this.uiTick=setInterval(()=>{this.call?this.render():clearInterval(this.uiTick)},1e3))}};var lx={online:"#2e9b5e",home:"#2a7de1",in_call:"#e0a020",dnd:"#d6402f",offline:"#aaa"},Au=[["calls","\u{1F4DE}","Phone"],["messages","\u{1F4AC}","Messages"],["contacts","\u{1F465}","Contacts"],["wallet","\u{1F4B0}","Wallet"],["jobs","\u{1F4BC}","Jobs"],["home","\u{1F3E0}","Home"],["land","\u{1F30D}","Land"],["garage","\u{1F697}","Garage"],["games","\u{1F3AE}","Games"],["map","\u{1F5FA}","Map"],["ranks","\u{1F3C6}","Ranks"],["alerts","\u{1F514}","Alerts"],["more","\u2699\uFE0F","Settings"]],bo=s=>p("i",{class:"pdot",title:s,style:`background:${lx[s]||"#aaa"}`}),ac=s=>new Date(s).toLocaleTimeString("en-NG",{hour:"numeric",minute:"2-digit"}),cx=s=>`${Math.floor(s/6e4)}:${String(Math.round(s/1e3)%60).padStart(2,"0")}`,Mo=class{constructor(t){this.ui=t,this.g=t.g,this.p=t.g.phone2,this.stack=[],this.cur="home",this.off=null}open(t="home"){this.ui.openSheet("Phone",[],()=>{this.off?.(),this.off=null,clearInterval(this.chatTimer)}),this.frame=p("div",{class:"phoneframe"}),this.status=p("div",{class:"pstatus"}),this.screen=p("div",{class:"pscreen"}),this.nav=p("div",{class:"pnav"},p("button",{id:"phBack",onclick:()=>this.back(),"aria-label":"Back"},"\u25C0"),p("button",{id:"phHome",onclick:()=>this.go("home",!0),"aria-label":"Home"},"\u25CF"),p("button",{id:"phMenu",onclick:()=>this.ui.closeSheet(),"aria-label":"Close phone"},"\u2715")),this.frame.append(this.status,this.screen,this.nav),this.ui.setSheetBody([this.frame]),this.stack=[],this.cur=null,this.off=this.p?.on?.(e=>this.onEvent(e)),this.go(t,!0),this.statusTick=setInterval(()=>this.drawStatus(),15e3)}drawStatus(){if(!this.status.isConnected)return clearInterval(this.statusTick);let t=this.g.user?.gameTime||{},e=this.p?.badges||{};this.status.replaceChildren(p("span",{},ac(Date.now())),p("span",{class:"mut"},this.p?.call?"\u{1F4DE} in call":""),p("span",{},`${e.missed?"\u{1F4F5}"+e.missed+" ":""}\u{1F4F6} \u{1F50B}`))}go(t,e=!1){e?this.stack=[]:this.cur&&this.stack.push(this.cur),this.cur=t,this.draw()}back(){if(!this.stack.length)return this.cur!=="home"?this.go("home",!0):this.ui.closeSheet();this.cur=this.stack.pop(),this.draw()}async draw(){this.drawStatus(),clearInterval(this.chatTimer);let t=this.cur;this.screen.replaceChildren(p("p",{class:"mut"},"Loading\u2026"));let e;if(t==="home")e=this.homeScreen();else if(t==="contacts")e=await this.contacts();else if(t==="messages")e=await this.messages();else if(t==="calls")e=await this.calls();else if(t==="settings")e=await this.settings();else if(t.startsWith("chat:"))e=await this.chat(t.slice(5));else{if(t==="map")return this.ui.closeSheet(),this.ui.openMap();t==="more"?e=[...await this.settings(),...[].concat(await this.ui.tab_more())]:this.ui["tab_"+t]?e=await this.ui["tab_"+t]():e=[p("p",{},"Nothing here yet.")]}if(this.cur===t){let n=(Au.find(i=>i[0]===t)||[])[2]||(t.startsWith("chat:")?"@"+t.slice(5):"");this.screen.replaceChildren(...t==="home"?[]:[p("div",{class:"ptitle"},n)],...[].concat(e)),this.nav.querySelector("#phBack").disabled=t==="home"&&!this.stack.length&&!1}}onEvent(t){this.screen?.isConnected&&(t.kind==="message"&&this.cur==="messages"?this.draw():t.kind==="message"&&this.cur===`chat:${t.m.from}`?this.chatPoll?.():t.kind==="friends"&&(this.cur==="contacts"||this.cur==="home")?this.draw():t.kind==="read"&&this.cur?.startsWith("chat:")?this.chatPoll?.():t.kind==="call-ended"&&this.cur==="calls"&&this.draw())}homeScreen(){let t=this.p?.badges||{},e={messages:t.msgs,contacts:t.reqs,calls:t.missed,alerts:this.g.unread};return[p("div",{class:"pgrid"},Au.map(([n,i,r])=>p("button",{class:"papp","data-app":n,onclick:()=>{n==="calls"&&(this.p.badges.missed=0),this.go(n)}},p("span",{class:"pico"},i,e[n]?p("b",{class:"pbadge"},String(e[n])):""),p("span",{class:"plab"},r))),...this.sponsored?[]:[]),p("p",{class:"mut",style:"text-align:center;margin:8px 0 0"},"Calls and chats are friends only. 18+.")]}async contacts(){if(this.g.user?.guest)return[p("p",{},"Create a free account to add friends, chat and call.")];let t=await this.ui.guard(()=>Dt("/api/phone/friends"));if(!t)return[];this.p.badges.reqs=t.incoming.length,this.p.drawBadge();let e=p("input",{class:"sheet-input",id:"friendName",placeholder:"Add a friend: @username",maxlength:20}),n=i=>p("div",{class:"prow","data-friend":i.username},p("span",{},bo(i.state),p("b",{},` @${i.username}`),p("small",{class:"mut"},` \xB7 ${i.state.replace("_"," ")}`),i.unread?p("b",{class:"pbadge inl"},String(i.unread)):""),p("span",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>this.go("chat:"+i.username)},"\u{1F4AC}"),p("button",{class:"btn small",disabled:this.p.usable?null:"disabled",onclick:()=>this.p.dial(i.username)},"\u{1F4DE}"),p("button",{class:"btn small ghost",onclick:()=>this.more(i.username)},"\u22EF")));return[p("div",{class:"row"},e,p("button",{class:"btn small",id:"friendAdd",onclick:async()=>{let i=await this.ui.guard(()=>at("/api/phone/friends/request",{username:e.value.replace("@","")}));i&&(this.ui.toast(i.status==="accepted"?"You are now friends!":"Friend request sent."),this.draw())}},"Add")),t.incoming.length?p("div",{},p("b",{},"Requests"),p("div",{class:"list"},t.incoming.map(i=>p("div",{"data-req":i.id},p("span",{},`@${i.from}`),p("span",{class:"row"},p("button",{class:"btn small",onclick:async()=>{await this.ui.guard(()=>at("/api/phone/friends/respond",{id:i.id,accept:!0})),this.draw()}},"Accept"),p("button",{class:"btn small ghost",onclick:async()=>{await this.ui.guard(()=>at("/api/phone/friends/respond",{id:i.id,accept:!1})),this.draw()}},"Decline")))))):"",p("b",{},`Friends (${t.friends.length})`),t.friends.length?p("div",{class:"list"},t.friends.map(n)):p("p",{class:"mut"},"No friends yet. Type a username above, or tap a player name in the chat."),t.outgoing.length?p("p",{class:"mut"},`Waiting for: ${t.outgoing.map(i=>"@"+i.to).join(", ")}`):""]}more(t){this.ui.openSheet(`@${t}`,[p("div",{class:"col"},p("button",{class:"btn ghost",onclick:async()=>{await this.ui.guard(()=>at("/api/phone/friends/remove",{username:t})),this.ui.closeSheet(),this.ui.phone("contacts")}},"Remove friend"),p("button",{class:"btn ghost",onclick:()=>this.ui.setBlock(t,"mute")},"Mute (hide their chats, calls and voice notes)"),p("button",{class:"btn red",onclick:()=>this.ui.setBlock(t,"block")},"Block")),p("p",{class:"mut"},"Mute and block apply to chats, calls and voice notes.")])}async messages(){let t=await this.ui.guard(()=>Dt("/api/phone/threads"));return t?(this.p.badges.msgs=t.threads.reduce((e,n)=>e+n.unread,0),this.p.drawBadge(),[p("button",{class:"btn small",id:"newChat",onclick:()=>this.go("contacts")},"\uFF0B New chat from Contacts"),t.threads.length?p("div",{class:"list"},t.threads.map(e=>p("div",{class:"prow tap","data-thread":e.with,onclick:()=>this.go("chat:"+e.with)},p("span",{},bo(e.state),p("b",{},` @${e.with}`),p("div",{class:"mut small"},e.last?e.last.kind==="voice"?"\u{1F3A4} Voice note":e.last.text:"")),e.unread?p("b",{class:"pbadge inl"},String(e.unread)):""))):p("p",{class:"mut"},"No chats yet. Open Contacts and tap \u{1F4AC} on a friend.")]):[]}async chat(t){let e=p("div",{class:"chatlog","data-chat-open":t}),n=0,i=new Set,r="offline",o=f=>{if(f.kind==="system")return p("div",{class:"sysmsg"},f.text);let g=f.mine,x=f.kind==="voice"?this.voiceBubble(f):p("span",{},f.text);return p("div",{class:`bub ${g?"me":"them"}`,"data-msg":f.id},x,p("small",{class:"mut"},ac(f.at)))},a=async(f=!0)=>{let g=await Dt(`/api/phone/thread?with=${encodeURIComponent(t)}&after=${n}${f?"":"&read=0"}`).catch(()=>null);if(g){r=g.state,l.replaceChildren(bo(g.state),p("b",{},` @${t}`),p("small",{class:"mut"},` ${g.state.replace("_"," ")}`)),g.friends||d.replaceChildren(p("p",{class:"mut"},"You can only chat with friends."),p("button",{class:"btn small",onclick:async()=>{await this.ui.guard(()=>at("/api/phone/friends/request",{username:t})),this.ui.toast("Friend request sent.")}},"Send friend request"));for(let x of g.messages)i.has(x.id)||(i.add(x.id),n=Math.max(n,x.id),e.append(o(x)),e.scrollTop=e.scrollHeight);e.querySelectorAll(".bub.me").forEach(x=>{x.classList.toggle("read",Number(x.dataset.msg)<=g.readByThem)})}};this.chatPoll=()=>a();let l=p("div",{class:"chead"}),c=p("input",{class:"sheet-input",id:"phChatInput",placeholder:"Message\u2026",maxlength:500,onkeydown:f=>{f.stopPropagation(),f.key==="Enter"&&u()}}),u=async()=>{let f=c.value.trim();if(!f)return;c.value="",await this.ui.guard(()=>at("/api/phone/messages",{to:t,text:f}))&&await a()},h=this.recorder(t,()=>a()),d=p("div",{class:"row chcomp"},c,p("button",{class:"btn small",id:"phChatSend",onclick:u},"Send"),h.btn);return await a(),this.chatTimer=setInterval(()=>{if(!e.isConnected)return clearInterval(this.chatTimer);a()},4e3),[p("div",{class:"row sp"},l,p("button",{class:"btn small",id:"phChatCall",onclick:()=>this.p.dial(t)},"\u{1F4DE} Call")),e,d,p("p",{class:"mut small"},"Report a message or voice note: press and hold it. Mute and block are under Contacts \u22EF.")]}voiceBubble(t){let e=t.voice;if(e.gone)return p("span",{class:"mut"},"\u{1F3A4} Voice note expired or removed");let n=(e.waveform?.length?e.waveform:Array.from({length:28},(o,a)=>30+a*37%60)).map(o=>p("i",{style:`height:${Math.max(12,o*.3)}px`})),i=p("button",{class:"vplay","data-voice":e.id,onclick:()=>this.play(e.id,i)},"\u25B6");return p("span",{class:"vnote"},i,p("span",{class:"vwave"},n),p("small",{},cx(e.durationMs)),p("button",{class:"vrep",title:"Report",onclick:()=>this.ui.reportSheet("voice_note",String(e.id),"a voice note")},"\u{1F6A9}"))}play(t,e){let n=this.audio;if(n&&(n.pause(),this.audioBtn&&(this.audioBtn.textContent="\u25B6"),this.audioId===t)){this.audio=null;return}let i=this.audio=new Audio(`/api/phone/voice/${t}`);this.audioId=t,this.audioBtn=e,e.textContent="\u23F8",i.onended=()=>{e.textContent="\u25B6"},i.onerror=()=>{e.textContent="\u25B6",this.ui.toast("Could not play that voice note.")},i.play().catch(()=>{e.textContent="\u25B6"})}recorder(t,e){let n=Tu(),i=p("button",{class:"btn small alt",id:"recBtn",title:"Voice note"},"\u{1F3A4}"),r=null,o=[],a=0,l=null,c=null,u=[],h=null,d=null;if(!n||!navigator.mediaDevices?.getUserMedia||window.__naDemo)return i.disabled=!0,i.title=window.__naDemo?"Voice notes need the live server":"Your browser cannot record voice notes",{btn:i};let f=g=>{if(clearInterval(c),!r)return;let x=r;r=null,x.onstop=async()=>{l?.getTracks().forEach(D=>D.stop());try{d?.close()}catch{}if(i.textContent="\u{1F3A4}",i.classList.remove("rec"),!g)return;let y=new Blob(o,{type:x.mimeType||n}),m=Date.now()-a,v=u.length?u.join(","):"",S=await fetch(`/api/phone/voice?to=${encodeURIComponent(t)}`,{method:"POST",headers:{"content-type":(y.type||n).split(";")[0],"x-duration-ms":String(m),"x-waveform":v},body:y}),_=await S.json().catch(()=>({}));S.ok?e():this.ui.toast(_.message||"Could not send the voice note.")},x.stop()};return i.onclick=async()=>{if(r)return f(!0);if(await this.p.consentOk()){try{l=await navigator.mediaDevices.getUserMedia({audio:!0})}catch(g){return this.ui.toast(this.p.micMsg(g))}o=[],u=[],r=new MediaRecorder(l,{mimeType:n,audioBitsPerSecond:24e3}),r.ondataavailable=g=>{g.data.size&&o.push(g.data)};try{d=new(window.AudioContext||window.webkitAudioContext),h=d.createAnalyser(),d.createMediaStreamSource(l).connect(h)}catch{h=null}r.start(250),a=Date.now(),i.textContent="\u23F9 0s",i.classList.add("rec"),c=setInterval(()=>{let g=Math.round((Date.now()-a)/1e3);if(i.textContent=`\u23F9 ${g}s`,h){let x=new Uint8Array(h.fftSize);h.getByteTimeDomainData(x);let y=0;for(let m of x)y=Math.max(y,Math.abs(m-128));u.length<48&&g*1e3%1250<1e3&&u.push(Math.min(100,Math.round(y*1.6)))}g>=60&&f(!0)},500)}},i.oncontextmenu=g=>{g.preventDefault(),f(!1)},{btn:i}}async calls(){let t=await this.ui.guard(()=>Dt("/api/phone/friends"));if(!t)return[];let e=await this.ui.guard(()=>Dt("/api/phone/threads")),n=[];for(let i of e?.threads||[])i.last?.kind==="system"&&n.push({who:i.with,text:i.last.text,at:i.last.at});return n.sort((i,r)=>r.at-i.at),[p("p",{class:"mut"},"Call a friend. Calls are voice only, peer to peer, never recorded."),p("div",{class:"list"},t.friends.map(i=>p("div",{"data-call-friend":i.username},p("span",{},bo(i.state),` @${i.username}`),p("button",{class:"btn small",disabled:i.state==="offline"||i.state==="dnd"?"disabled":null,onclick:()=>this.p.dial(i.username)},"\u{1F4DE} Call")))),t.friends.length?"":p("p",{class:"mut"},"No friends yet. Add some in Contacts."),n.length?p("div",{},p("b",{},"Recent"),p("div",{class:"list"},n.slice(0,8).map(i=>p("div",{},p("span",{},`${i.text}`),p("span",{class:"mut"},`@${i.who} \xB7 ${ac(i.at)}`))))):""]}async settings(){if(this.g.user?.guest)return[];let t=await this.ui.guard(()=>Dt("/api/phone/settings"));if(!t)return[];let e=(i,r)=>async()=>{await this.ui.guard(()=>at("/api/phone/settings",{[i]:r})),this.draw()},n=(i,r,o)=>p("div",{class:"prow"},p("span",{},i),p("button",{class:`btn small ${r?"":"ghost"}`,"data-setting":o,onclick:e(o,!r)},r?"On":"Off"));return[n("Do not disturb (calls go to missed)",t.dnd,"dnd"),n("Show my online dot to friends",t.showPresence,"showPresence"),p("div",{class:"prow"},p("span",{},"Calls from"),p("button",{class:"btn small ghost","data-setting":"callsFrom",onclick:e("callsFrom",t.callsFrom==="friends"?"nobody":"friends")},t.callsFrom)),p("div",{class:"prow"},p("span",{},"Voice notes from"),p("button",{class:"btn small ghost","data-setting":"voiceNotesFrom",onclick:e("voiceNotesFrom",t.voiceNotesFrom==="friends"?"nobody":"friends")},t.voiceNotesFrom)),p("p",{class:"mut small"},t.voiceConsent?"Voice notice accepted.":"You will be asked to accept the voice notice the first time you record or call.")]}};var hx=s=>{let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}};function lc(s,t){let e=[];if(s.forEach((i,r)=>{i||e.push(r)}),!e.length)return s;let n=e[Math.floor(t()*e.length)];return s[n]=t()<.1?4:2,s}function Ru(s){let t=hx(s),e=Array(16).fill(0);return lc(e,t),lc(e,t),{grid:e,score:0,rng:t,moves:0,over:!1}}function ux(s){let t=s.filter(Boolean),e=[],n=0;for(let i=0;i<t.length;i++)t[i]===t[i+1]?(e.push(t[i]*2),n+=t[i]*2,i++):e.push(t[i]);for(;e.length<4;)e.push(0);return{out:e,gained:n}}function Cu(s,t){let e=s.slice(),n=0,i=(r,o)=>r*4+o;for(let r=0;r<4;r++){let o=[];for(let c=0;c<4;c++)o.push(t==="L"?i(r,c):t==="R"?i(r,3-c):i(t==="U"?c:3-c,r));let{out:a,gained:l}=ux(o.map(c=>s[c]));n+=l,o.forEach((c,u)=>{e[c]=a[u]})}return{grid:e,gained:n,moved:e.some((r,o)=>r!==s[o])}}var dx=s=>["L","R","U","D"].some(t=>Cu(s,t).moved);function Iu(s,t){if(s.over||!"LRUD".includes(t)||t.length!==1)return!1;let e=Cu(s.grid,t);return e.moved?(s.grid=e.grid,s.score+=e.gained,s.moves++,lc(s.grid,s.rng),dx(s.grid)||(s.over=!0),!0):!1}var px={merge:"Merge Am",memory:"Pair Am",word:"Word of the Day"},mx={danfo:"\u{1F68C}",keke:"\u{1F6FA}",suya:"\u{1F362}",akara:"\u{1F96F}",ankara:"\u{1F9F5}",naira:"\u20A6",agbada:"\u{1F458}",gele:"\u{1F451}"},gx=s=>new Promise(t=>setTimeout(t,s));async function Pu(s){let t=await s.guard(()=>Dt("/api/casual"));return t?[p("div",{class:"row sp"},p("b",{},"\u{1F3AE} Break games"),p("span",{class:"tag amber"},`Today ${pt(t.earnedToday)} / ${pt(t.dailyCap)}`)),p("p",{class:"mut"},"Quick games for a breather. Game money only: small rewards, capped every day (ESTIMATE numbers). No cash-out."),t.rewardsOn?"":p("p",{class:"mut"},"Your account is brand new: you can play now and rewards start in a few minutes."),p("div",{class:"list"},t.games.map(e=>p("div",{},p("span",{},p("b",{},e.name),p("small",{class:"mut"},` \xB7 ${e.blurb} (also at ${e.where})${e.best?` \xB7 best ${e.best}`:""}${e.doneToday?" \xB7 done today \u2713":""}`)),p("button",{class:"btn small alt","data-casual":e.id,onclick:()=>cc(s,e.id)},"Play"))))]:[]}function cc(s,t){let e=p("div",{class:"casual"}),n=null;s.openSheet(px[t],e,()=>n?.()),t==="merge"?n=xx(s,e):t==="memory"?n=yx(s,e):vx(s,e)}function hc(s,t,e){let n=[p("b",{},e),t.reward?p("span",{class:"tag green"},`+${pt(t.reward)} game money`):p("span",{class:"tag"},"No reward this time"),t.note?p("small",{class:"mut"},t.note):""];return t.reward&&s.toast(`+${pt(t.reward)} game money. Nice one!`,"money"),s.g.refreshMe?.(),p("div",{class:"banner win casualres"},...n)}function xx(s,t){let e=null,n=null,i="",r=!1,o=p("div",{class:"mgrid"}),a=p("b",{id:"mScore"},"0"),l=p("div",{}),c=()=>{o.replaceChildren(...n.grid.map(m=>p("div",{class:`mt mt${Math.min(m,2048)}`,"data-v":m},m?String(m):""))),a.textContent=String(n.score)},u=m=>{r||!n||Iu(n,m)&&(i+=m,c(),n.over&&h())},h=async()=>{if(r)return;r=!0;let m=await s.guard(()=>at("/api/casual/merge/submit",{runId:e.runId,moves:i}));l.replaceChildren(m?hc(s,m,`Score ${m.score} \xB7 biggest tile ${m.best}`):p("p",{class:"mut"},"Could not count that game (too short or too fast). Try again."),p("button",{class:"btn alt",onclick:d},"Play again"))},d=async()=>{let m=await s.guard(()=>at("/api/casual/merge/start"));m&&(e=m,n=Ru(m.seed),i="",r=!1,l.replaceChildren(),c())},f=m=>{let v={ArrowLeft:"L",ArrowRight:"R",ArrowUp:"U",ArrowDown:"D"}[m.key];v&&(m.preventDefault(),m.stopPropagation(),u(v))};document.addEventListener("keydown",f,!0);let g=0,x=0;o.addEventListener("pointerdown",m=>{g=m.clientX,x=m.clientY}),o.addEventListener("pointerup",m=>{let v=m.clientX-g,S=m.clientY-x;Math.max(Math.abs(v),Math.abs(S))<24||u(Math.abs(v)>Math.abs(S)?v>0?"R":"L":S>0?"D":"U")});let y=p("div",{class:"mpad"},["L","U","D","R"].map(m=>p("button",{class:"btn small","data-dir":m,onclick:()=>u(m)},{L:"\u2B05",U:"\u2B06",D:"\u2B07",R:"\u27A1"}[m])));return t.replaceChildren(p("div",{class:"row sp"},p("span",{},"Score ",a),p("button",{class:"btn small ghost",id:"mFinish",onclick:()=>i.length>=20?h():s.toast("Play at least 20 moves first.")},"Finish and claim")),p("p",{class:"mut"},"Slide with arrows or swipe. Equal tiles join. The server replays your moves to check the score."),o,y,l),d(),window.__merge={move:u,get log(){return i},get game(){return n}},()=>document.removeEventListener("keydown",f,!0)}function yx(s,t){let e=null,n=!1,i=[],r=!1,o=p("div",{}),a=p("b",{id:"pMoves"},"Tries 0"),l=g=>p("button",{class:"mc","data-i":g,onclick:()=>d(g)},"\u2753"),c=p("div",{class:"mgrid mem"}),u=(g,x,y)=>{let m=c.children[g];m.textContent=mx[x]||"?",m.classList.add("up"),y&&m.classList.add("ok")},h=g=>{let x=c.children[g];x.textContent="\u2753",x.classList.remove("up")},d=async g=>{if(n||r||c.children[g].classList.contains("up"))return;n=!0;let x=await s.guard(()=>at("/api/casual/memory/flip",{runId:e.runId,i:g}));if(!x){n=!1;return}u(g,x.symbolName,x.result==="match"),a.textContent=`Tries ${x.moves}`,x.result==="match"?(u(x.other,x.symbolName,!0),i.push(g,x.other)):x.result==="miss"&&(await gx(800),h(g),h(x.other)),x.done&&(r=!0,o.replaceChildren(hc(s,x,`Done in ${x.moves} tries`),p("button",{class:"btn alt",onclick:f},"Play again"))),n=!1},f=async()=>{let g=await s.guard(()=>at("/api/casual/memory/start"));g&&(e=g,r=!1,n=!1,i=[],a.textContent="Tries 0",c.replaceChildren(...Array.from({length:g.cards},(x,y)=>l(y))),o.replaceChildren())};return t.replaceChildren(p("div",{class:"row sp"},a,p("span",{class:"mut"},"Fewer tries = more game money")),c,o),f(),null}function vx(s,t){let e=null,n="",i=p("div",{class:"wgrid"}),r=p("div",{}),o=p("div",{class:"wkeys"}),a=()=>{let d={};for(let f of e.guesses)[...f.word].forEach((g,x)=>{d[g]=Math.max(d[g]??-1,f.marks[x])});return d},l=()=>{let d=[];for(let g=0;g<e.maxGuesses;g++){let x=e.guesses[g],y=x?x.word:g===e.guesses.length?n.padEnd(5):"     ";d.push(p("div",{class:"wrow"},[...y].map((m,v)=>p("span",{class:`wl ${x?"m"+x.marks[v]:""}`},m.trim().toUpperCase()))))}i.replaceChildren(...d);let f=a();o.replaceChildren(...["qwertyuiop","asdfghjkl","zxcvbnm"].map(g=>p("div",{class:"wkr"},[...g].map(x=>p("button",{class:`wk ${f[x]!=null?"m"+f[x]:""}`,"data-k":x,onclick:()=>c(x)},x.toUpperCase())))),p("div",{class:"wkr"},p("button",{class:"btn small",onclick:()=>c("<")},"\u232B"),p("button",{class:"btn small alt",id:"wEnter",onclick:()=>c(">")},"Enter")))},c=async d=>{if(!(!e||e.status!=="playing")){if(d==="<")n=n.slice(0,-1);else if(d===">"){if(n.length!==5)return s.toast("Type 5 letters.");let f=await s.guard(()=>at("/api/casual/word/guess",{word:n}));if(!f)return;e.guesses=f.guesses,e.status=f.status,n="",f.status!=="playing"&&(e.answer=f.answer,u(f))}else n.length<5&&(n+=d);l()}},u=d=>r.replaceChildren(hc(s,d||{reward:e.reward},e.status==="won"?`Correct! The word was ${e.answer.toUpperCase()}`:`Not today. The word was ${e.answer.toUpperCase()}`),p("p",{class:"mut"},"A new word comes tomorrow.")),h=d=>{s.sheetOpen&&(/^[a-z]$/i.test(d.key)&&!d.ctrlKey&&!d.metaKey?(d.stopPropagation(),d.preventDefault(),c(d.key.toLowerCase())):d.key==="Backspace"?(d.preventDefault(),d.stopPropagation(),c("<")):d.key==="Enter"&&(d.preventDefault(),d.stopPropagation(),c(">")))};document.addEventListener("keydown",h,!0),s.onClose=()=>document.removeEventListener("keydown",h,!0),t.replaceChildren(p("p",{class:"mut"},"Guess the 5-letter word in six tries. Green = right place, amber = in the word, grey = not there. Nigerian and everyday words."),i,r,o),Dt("/api/casual/word").then(d=>{e=d,l(),d.status!=="playing"&&u()}).catch(()=>s.toast("Could not load today's word."))}var So={house:"#8fb0c9",kiosk:"#9bc59d",market:"#e0a85c",office:"#9aa3b8",tower:"#6c7aa6",shop:"#f0c04a",airport:"#cfd8e3"},bx={house:"House",kiosk:"Kiosk",market:"Market",office:"Office block",tower:"Tower block",shop:"Shop",airport:"Airport terminal"},Mx={venue_mamaput:"\u{1F372}",venue_viewing:"\u{1F4FA}",venue_joint:"\u{1F3B2}",venue_meco:"\u{1F527}",venue_motors:"\u{1F697}"},Lu=[["districts","Districts","#d9c7a3"],["roads","Roads and names","#3d4046"],["buildings","Buildings","#8fb0c9"],["venues","Venues and shops","#ffc20e"],["jobs","Jobs","#4aa3ff"],["homes","Homes for rent","#e56b6f"],["plots","Land plots","#7fb069"],["landmarks","Landmarks","#b44cff"],["billboards","Billboard spots","#35c46b"],["players","Players nearby","#ffffff"]],uc={districts:!0,roads:!0,buildings:!0,venues:!0,jobs:!0,homes:!0,plots:!0,landmarks:!0,billboards:!1,players:!0},wx=s=>{let t=s.width/2;return{x0:Math.min(s.x1,s.x2)-(s.x1===s.x2?t:0),x1:Math.max(s.x1,s.x2)+(s.x1===s.x2?t:0),z0:Math.min(s.z1,s.z2)-(s.z1===s.z2?t:0),z1:Math.max(s.z1,s.z2)+(s.z1===s.z2?t:0)}},wo=s=>`\u20A6${Math.round(s).toLocaleString("en-NG")}`;function Du(s){let t=a=>s.placeById?.[a]||(s.places||[]).find(l=>l.id===a),e=[];for(let a of s.venues||[])e.push({type:"venue",id:a.id,name:a.name,x:a.x,z:a.z,icon:Mx[a.id]||"\u{1F3B2}",lines:[a.blurb||"A place to hang out.",a.hours?`Open ${a.hours[0]}:00 to ${a.hours[1]}:00`:""],placeId:a.id,group:"Venues"});for(let a of s.shops||[])(s.venues||[]).some(l=>l.shopId===a.id)||e.push({type:"shop",id:a.id,name:a.name,x:a.x,z:a.z,icon:"\u{1F6D2}",lines:[a.desc||"Shop"],placeId:a.id,group:"Shops"});for(let a of s.jobs||[])e.push({type:"job",id:a.id,name:a.label,x:a.x,z:a.z,icon:"\u{1F4BC}",lines:["Job: start a shift here"],placeId:a.id,group:"Jobs"});for(let a of s.landmarks||[])e.push({type:"landmark",id:a.id,name:a.name,x:a.x,z:a.z,icon:"\u26F2",lines:["Landmark"],placeId:t(a.id)?a.id:null,group:"Landmarks"});for(let a of s.buildings)a.kind==="airport"&&e.push({type:"landmark",id:a.id,name:a.label||"Airport",x:a.x,z:a.z,icon:"\u2708\uFE0F",lines:["Landmark"],placeId:t("airport")?"airport":null,group:"Landmarks"});for(let a of s.plots||[])e.push({type:"plot",id:a.id,name:a.name,x:a.x,z:a.z,size:a.size,icon:"\u{1F30D}",lines:[`${a.area} \xB7 ${a.sqm} sqm`,`Price ${wo(a.price)} \xB7 growth ${(a.growthPerWeek*100).toFixed(0)}%/week (ESTIMATE)`,`Omo-onile risk: ${a.risk}`],placeId:a.id,group:"Land plots"});for(let a of s.properties||[])e.push({type:"house",id:a.id,name:a.name,x:a.door.x,z:a.door.z,icon:"\u{1F3E0}",lines:[`${a.tierLabel}`,a.price?`Price ${wo(a.price)}`:`Rent ${wo(a.rent)}/week`,a.area||""],placeId:a.id,buildingId:a.buildingId,group:"Homes"});for(let a of s.billboards||[])a.surface!=="lagoon_plot"&&e.push({type:"billboard",id:a.id,name:`Billboard spot ${a.id}`,x:a.x,z:a.z,icon:"\u{1FAA7}",lines:[`${a.tier} tier ad space (${a.w}x${a.h} m)`,"Advertise from the ads page"],placeId:null,group:"Billboard spots"});let n=(s.roads||[]).map(a=>({...a,rect:wx(a),vertical:a.x1===a.x2})),i=(s.districts||[]).map(a=>({...a})),r=s.buildings.map(a=>{let l=(s.properties||[]).find(u=>u.id===a.propertyId),c=bx[a.kind]||a.kind;return{...a,name:a.label||l?.name||c,kindName:c,rect:{x0:a.x-a.w/2,x1:a.x+a.w/2,z0:a.z-a.d/2,z1:a.z+a.d/2},property:l||null}}),o=[...e.filter(a=>a.type!=="billboard"),...n.map(a=>({type:"road",id:a.id,name:a.name,x:(a.x1+a.x2)/2,z:(a.z1+a.z2)/2,group:"Roads",lines:[`${a.vertical?"North-south":"East-west"} road`]})),...i.map(a=>({type:"district",id:a.id,name:a.name,x:(a.x0+a.x1)/2,z:(a.z0+a.z1)/2,group:"Districts",lines:["District"]}))];return{city:s,items:e,roads:n,districts:i,buildings:r,catalogue:o,bounds:s.bounds,water:s.water||null,zones:s.zones||[]}}function Uu(s,t,e=12){let n=String(t||"").trim().toLowerCase();if(!n)return s.catalogue.filter(r=>["venue","shop","landmark","district"].includes(r.type)).slice(0,e);let i=[];for(let r of s.catalogue){let o=r.name.toLowerCase(),a=-1;o.startsWith(n)?a=3:o.split(/[\s(]+/).some(l=>l.startsWith(n))?a=2:(o.includes(n)||(r.group||"").toLowerCase().startsWith(n))&&(a=1),a>0&&i.push([a,r])}return i.sort((r,o)=>o[0]-r[0]||r[1].name.localeCompare(o[1].name)).slice(0,e).map(r=>r[1])}function Nu(s,t,e,n,i=uc,r=[]){let o=16/n,a=h=>Math.hypot(h.x-t,h.z-e)<=o;for(let h of r)if(i.players&&a(h))return{type:"player",id:h.id,name:`@${h.name}`,x:h.x,z:h.z,lines:["Another player nearby"]};let l={venue:"venues",shop:"venues",job:"jobs",landmark:"landmarks",house:"homes",billboard:"billboards",plot:"plots"},c=null,u=1/0;for(let h of s.items){if(!i[l[h.type]]||h.type==="house"&&n<1.5||h.type==="plot")continue;let d=Math.hypot(h.x-t,h.z-e);d<=o&&d<u&&(c=h,u=d)}if(c)return c;if(i.buildings){for(let h of s.buildings)if(t>=h.rect.x0&&t<=h.rect.x1&&e>=h.rect.z0&&e<=h.rect.z1){let d=h.property;return{type:"building",id:h.id,name:h.name,x:h.x,z:h.z,rect:h.rect,icon:d?"\u{1F3E0}":"\u{1F3E2}",placeId:d?.id||null,lines:[h.kindName+(h.floors>1?` \xB7 ${h.floors} floors`:""),d?`${d.tierLabel} \xB7 rent ${wo(d.rent)}/week`:""].filter(Boolean),group:"Buildings"}}}if(i.plots){for(let h of s.items)if(h.type==="plot"&&Math.abs(h.x-t)<=h.size/2&&Math.abs(h.z-e)<=h.size/2)return{...h,rect:{x0:h.x-h.size/2,x1:h.x+h.size/2,z0:h.z-h.size/2,z1:h.z+h.size/2}}}if(i.roads){for(let h of s.roads)if(t>=h.rect.x0&&t<=h.rect.x1&&e>=h.rect.z0&&e<=h.rect.z1)return{type:"road",id:h.id,name:h.name,x:t,z:e,rect:h.rect,lines:[`${h.vertical?"North-south":"East-west"} road \xB7 ${h.width} m wide`],group:"Roads"}}if(i.districts){for(let h of s.districts)if(t>=h.x0&&t<h.x1&&e>=h.z0&&e<h.z1)return{type:"district",id:h.id,name:h.name,x:t,z:e,lines:["District"],group:"Districts"}}return s.water&&e>=s.water.minZ&&e<=s.water.maxZ&&t>=s.water.minX&&t<=s.water.maxX?{type:"water",id:"water",name:"Lagoon",x:t,z:e,lines:["Water. No swimming!"]}:null}var Ti={district:s=>s<2.2,road:s=>s>=.9,venue:s=>s>=1.2,shop:s=>s>=1.8,job:s=>s>=2.6,landmark:s=>s>=.9,plot:s=>s>=1.4,house:s=>s>=3,building:s=>s>=3.6,billboard:s=>s>=3,player:s=>s>=1.5};var Eo=class{constructor(t){this.g=t,this.model=null,this.layers={...uc},this.open_=!1,this.cache=null,this.sel=null,this.hover=null,this.pins=new Map}get isOpen(){return this.open_}open(t){if(this.open_)return;let e=this.g;this.model=this.model||Du(e.city),this.open_=!0,this.dpr=Math.min(2,window.devicePixelRatio||1),this.canvas=p("canvas",{class:"bm-canvas"}),this.ctx=this.canvas.getContext("2d"),this.card=p("div",{class:"bm-card hidden"}),this.list=p("div",{class:"bm-list hidden"}),this.legend=p("div",{class:"bm-legend hidden"}),this.input=p("input",{class:"bm-search",placeholder:"Search places, roads, districts\u2026",type:"search",autocomplete:"off"}),this.input.addEventListener("input",()=>this.showList()),this.input.addEventListener("focus",()=>this.showList());let n=p("div",{class:"bm-top"},p("b",{class:"bm-title"},`\u{1F5FA} ${e.city.name||"Map"}`),this.input,p("button",{class:"bm-btn",id:"bmMe",title:"Centre on me",onclick:()=>this.centreMe()},"\u25CE"),p("button",{class:"bm-btn",id:"bmLegend",title:"Layers",onclick:()=>this.legend.classList.toggle("hidden")},"\u2630"),p("button",{class:"bm-btn",id:"bmClose",onclick:()=>this.close()},"\u2715")),i=p("div",{class:"bm-zoom"},p("button",{class:"bm-btn",id:"bmIn",onclick:()=>this.zoomBy(1.5)},"+"),p("button",{class:"bm-btn",id:"bmOut",onclick:()=>this.zoomBy(1/1.5)},"\u2212"));this.root=p("div",{id:"bigmap"},this.canvas,n,this.list,this.legend,i,this.card),document.body.appendChild(this.root),this.drawLegend(),this.resize(),this.fit();let r=e.ctrl;r&&(this.v.cx=r.x,this.v.cz=r.z,this.v.k=Math.max(this.v.k,1.6)),this.bind(),this.onKey=a=>{a.key==="Escape"&&(a.target===this.input?(this.input.blur(),this.list.classList.add("hidden")):this.close(),a.stopPropagation())},document.addEventListener("keydown",this.onKey,!0),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize);let o=()=>{this.open_&&(this.draw(),this.raf=requestAnimationFrame(o))};this.raf=requestAnimationFrame(o),t&&this.focusOn(this.model.catalogue.find(a=>a.id===t)),window.__bigmap=this}close(){this.open_&&(this.open_=!1,cancelAnimationFrame(this.raf),document.removeEventListener("keydown",this.onKey,!0),removeEventListener("resize",this.onResize),this.root.remove(),this.cache=null)}toggle(){this.open_?this.close():this.open()}resize(){let t=this.root.getBoundingClientRect();this.W=Math.max(200,Math.round(t.width)),this.H=Math.max(200,Math.round(t.height)),this.canvas.width=this.W*this.dpr,this.canvas.height=this.H*this.dpr,this.canvas.style.width=this.W+"px",this.canvas.style.height=this.H+"px"}extent(){let t=this.model.bounds,e=this.model.water;return{x0:Math.min(t.minX,e?.minX??t.minX),x1:Math.max(t.maxX,e?.maxX??t.maxX),z0:t.minZ,z1:Math.max(t.maxZ,e?.maxZ??t.maxZ)}}fit(){let t=this.model.bounds;this.kMin=Math.min(this.W/(t.maxX-t.minX+40),this.H/(t.maxZ-t.minZ+40))*.9,this.kMax=14,this.v={cx:(t.minX+t.maxX)/2,cz:(t.minZ+t.maxZ)/2,k:this.kMin*1.05}}sx(t){return(t-this.v.cx)*this.v.k+this.W/2}sz(t){return(t-this.v.cz)*this.v.k+this.H/2}wx(t){return(t-this.W/2)/this.v.k+this.v.cx}wz(t){return(t-this.H/2)/this.v.k+this.v.cz}zoomAt(t,e,n){let i=this.wx(t),r=this.wz(e);this.v.k=Math.min(this.kMax,Math.max(this.kMin,this.v.k*n)),this.v.cx=i-(t-this.W/2)/this.v.k,this.v.cz=r-(e-this.H/2)/this.v.k}zoomBy(t){this.zoomAt(this.W/2,this.H/2,t)}centreMe(){let t=this.g.ctrl;this.v.cx=t.x,this.v.cz=t.z,this.v.k=Math.max(this.v.k,2.5)}focusOn(t){t&&(this.v.cx=t.x,this.v.cz=t.z,this.v.k=Math.max(this.v.k,t.type==="district"?this.kMin*1.8:t.type==="road"?2:4.5))}drawStatic(t,e,n,i,r){let o=this.model,a=this.extent(),l=this.layers;t.fillStyle="#2b6f8a",t.fillRect(e(a.x0-100),n(a.z0-100),(a.x1-a.x0+200)*i,(a.z1-a.z0+200)*i);let c=o.bounds;if(t.fillStyle="#d3cdb4",t.fillRect(e(c.minX),n(c.minZ),(c.maxX-c.minX)*i,(c.maxZ-c.minZ)*i),o.water){t.fillStyle="#3d86a6",t.fillRect(e(o.water.minX),n(o.water.minZ),(o.water.maxX-o.water.minX)*i,(o.water.maxZ-o.water.minZ)*i),t.strokeStyle="#ffffff40",t.lineWidth=Math.max(1,i*.4);for(let h=o.water.minZ+14;h<o.water.maxZ;h+=22){t.beginPath();for(let d=o.water.minX;d<o.water.maxX;d+=30)t.moveTo(e(d),n(h)),t.quadraticCurveTo(e(d+7),n(h-3),e(d+15),n(h));t.stroke()}}if(l.districts)for(let h of o.districts)t.fillStyle=h.color+"88",t.fillRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);t.fillStyle="#c3c8a6";for(let h of o.zones)t.fillRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);if(l.districts){t.setLineDash([6,5]),t.strokeStyle="#6b5b3e99",t.lineWidth=1.2;for(let h of o.districts)t.strokeRect(e(h.x0),n(h.z0),(h.x1-h.x0)*i,(h.z1-h.z0)*i);t.setLineDash([])}if(l.plots){for(let h of o.items)if(h.type==="plot"){let d=e(h.x-h.size/2),f=n(h.z-h.size/2),g=h.size*i;t.fillStyle="#9bc47a",t.fillRect(d,f,g,g),t.strokeStyle="#4f7a3a",t.lineWidth=1.5,t.setLineDash([5,3]),t.strokeRect(d,f,g,g),t.setLineDash([]),t.beginPath();for(let x=0;x<=g;x+=Math.max(6,g/6))t.moveTo(d+x,f),t.lineTo(d,f+x);t.strokeStyle="#4f7a3a55",t.stroke()}}if(l.roads){for(let h of o.roads){let d=h.width*i;t.lineCap="butt",t.strokeStyle="#b9b39a",t.lineWidth=d+6*Math.min(1.5,i/2),t.beginPath(),t.moveTo(e(h.x1),n(h.z1)),t.lineTo(e(h.x2),n(h.z2)),t.stroke()}for(let h of o.roads){let d=h.width*i;t.strokeStyle="#3d4046",t.lineWidth=d,t.beginPath(),t.moveTo(e(h.x1),n(h.z1)),t.lineTo(e(h.x2),n(h.z2)),t.stroke()}for(let h of o.roads)if(t.strokeStyle="#f2d23c",t.lineWidth=Math.max(1,i*.35),t.setLineDash([i*4,i*3]),t.beginPath(),t.moveTo(e(h.x1),n(h.z1)),t.lineTo(e(h.x2),n(h.z2)),t.stroke(),t.setLineDash([]),i>=2.5){t.strokeStyle="#ffffffaa",t.lineWidth=Math.max(1,i*.2);for(let d of[-h.width/2+.8,h.width/2-.8])t.beginPath(),h.vertical?(t.moveTo(e(h.x1+d),n(h.z1)),t.lineTo(e(h.x2+d),n(h.z2))):(t.moveTo(e(h.x1),n(h.z1+d)),t.lineTo(e(h.x2),n(h.z2+d))),t.stroke()}}if(l.buildings)for(let h of o.buildings){let d=e(h.rect.x0),f=n(h.rect.z0),g=h.w*i,x=h.d*i;t.fillStyle=So[h.kind]||"#999",t.fillRect(d,f,g,x),t.fillStyle="#00000022",t.fillRect(d+g*.08,f+x*.08,g*.84,x*.84),t.fillStyle=So[h.kind]||"#999",t.fillRect(d+g*.12,f+x*.12,g*.76,x*.76),t.strokeStyle="#33333388",t.lineWidth=1,t.strokeRect(d,f,g,x)}let u=(o.city.landmarks||[]).find(h=>h.kind==="plaza");u&&l.landmarks&&(t.fillStyle="#e8dfc2",t.beginPath(),t.arc(e(u.x),n(u.z),11*i,0,7),t.fill(),t.fillStyle="#6fb7d6",t.beginPath(),t.arc(e(u.x),n(u.z),4*i,0,7),t.fill())}staticLayer(){let t=JSON.stringify([this.layers.districts,this.layers.roads,this.layers.buildings,this.layers.plots,this.layers.landmarks]),e=this.extent(),n=e.x1-e.x0+200,i=e.z1-e.z0+100,r=Math.min(3,3e3/Math.max(n,i));if(this.cache&&this.cache.key===t)return this.cache;let o=document.createElement("canvas");o.width=Math.ceil(n*r),o.height=Math.ceil(i*r);let a=o.getContext("2d"),l=e.x0-100,c=e.z0-50;return this.drawStatic(a,u=>(u-l)*r,u=>(u-c)*r,r),this.cache={key:t,cv:o,ppu:r,ox:l,oz:c},this.cache}draw(){let t=this.ctx,e=this.v.k,n=this.dpr;t.setTransform(n,0,0,n,0,0),t.clearRect(0,0,this.W,this.H);let i=this.staticLayer();e<=i.ppu*1.2?(t.imageSmoothingEnabled=!0,t.drawImage(i.cv,this.sx(i.ox),this.sz(i.oz),i.cv.width*e/i.ppu,i.cv.height*e/i.ppu)):this.drawStatic(t,r=>this.sx(r),r=>this.sz(r),e,!0),this.drawLabels(t,e),this.drawDynamic(t,e)}text(t,e,n,i,r={}){t.font=`${r.w||700} ${r.s||12}px Nunito, system-ui, sans-serif`,t.textAlign=r.a||"center",t.textBaseline="middle",t.lineWidth=3.5,t.strokeStyle=r.stroke||"#fffdf3e6",t.lineJoin="round",t.strokeText(e,n,i),t.fillStyle=r.fill||"#2a2a2a",t.fillText(e,n,i)}onScreen(t,e,n=40){return t>-n&&e>-n&&t<this.W+n&&e<this.H+n}drawLabels(t,e){let n=this.model,i=this.layers;if(i.districts&&Ti.district(e)){let o=Math.min(1,(2.2-e)/.8);t.globalAlpha=Math.max(.35,o);for(let a of n.districts)this.text(t,a.name.toUpperCase(),this.sx((a.x0+a.x1)/2),this.sz((a.z0+a.z1)/2),{s:Math.max(13,Math.min(30,e*12)),w:800,fill:"#5b4a2a",stroke:"#ffffff99"});t.globalAlpha=1}if(i.roads&&Ti.road(e))for(let o of n.roads){let a=o.vertical?o.z2-o.z1:o.x2-o.x1,l=Math.max(1,Math.floor(Math.abs(a)/170));for(let c=0;c<l;c++){let u=(c+.5)/l,h=o.x1+(o.x2-o.x1)*u,d=o.z1+(o.z2-o.z1)*u,f=this.sx(h),g=this.sz(d);this.onScreen(f,g)&&(t.save(),t.translate(f,g),o.vertical&&t.rotate(-Math.PI/2),this.text(t,o.name,0,0,{s:Math.max(10,Math.min(15,e*4.2)),fill:"#fff",stroke:"#3d4046"}),t.restore())}}let r={venue:"venues",shop:"venues",job:"jobs",landmark:"landmarks",house:"homes",billboard:"billboards"};for(let o of n.items){if(o.type==="plot"){i.plots&&Ti.plot(e)&&this.text(t,o.name,this.sx(o.x),this.sz(o.z),{s:11,fill:"#2f5a1f"});continue}if(!i[r[o.type]]||o.type==="house"&&e<1.5)continue;let a=this.sx(o.x),l=this.sz(o.z);if(!this.onScreen(a,l))continue;let u=o.type==="venue"||o.type==="landmark"?Math.max(18,Math.min(30,e*9)):o.type==="billboard"?14:Math.max(14,Math.min(22,e*6));t.fillStyle=o.type==="billboard"?"#35c46b":o.type==="job"?"#4aa3ff":o.type==="house"?"#e56b6f":"#ffc20e",t.beginPath(),t.arc(a,l,u*.62,0,7),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke(),t.font=`${u*.78}px system-ui`,t.textAlign="center",t.textBaseline="middle",t.fillStyle="#000",t.fillText(o.icon,a,l+1),Ti[o.type]?.(e)&&o.type!=="billboard"&&this.text(t,o.name,a,l+u*.62+9,{s:o.type==="venue"?12:11})}if(i.buildings&&Ti.building(e))for(let o of n.buildings){let a=this.sx(o.x),l=this.sz(o.z);this.onScreen(a,l)&&this.text(t,o.name,a,l,{s:10,w:600})}}playersNow(){let t=[];for(let e of this.g.ghosts?.map?.values?.()||[])e.root&&t.push({id:e.id,name:e.name,x:e.root.position.x,z:e.root.position.z,color:e.color});return t}drawDynamic(t,e){let n=this.layers;this.others=this.playersNow();let i=performance.now(),r=this.sel||this.hover;r?.rect?(t.strokeStyle="#ff3b30",t.lineWidth=3,t.setLineDash([]),t.strokeRect(this.sx(r.rect.x0),this.sz(r.rect.z0),(r.rect.x1-r.rect.x0)*e,(r.rect.z1-r.rect.z0)*e)):r&&r.x!=null&&(t.strokeStyle="#ff3b30",t.lineWidth=3,t.beginPath(),t.arc(this.sx(r.x),this.sz(r.z),20,0,7),t.stroke());let o=this.g.waypoint;if(o&&(t.fillStyle="#b44cff",t.beginPath(),t.arc(this.sx(o.x),this.sz(o.z),7,0,7),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke()),n.players)for(let f of this.others){let g=this.sx(f.x),x=this.sz(f.z);this.onScreen(g,x)&&(t.fillStyle="#fff",t.beginPath(),t.arc(g,x,5,0,7),t.fill(),t.fillStyle=f.color||"#2a9d8f",t.beginPath(),t.arc(g,x,3.4,0,7),t.fill(),Ti.player(e)&&this.text(t,f.name,g,x-12,{s:10}))}let a=this.g.ctrl,l=this.sx(a.x),c=this.sz(a.z);t.strokeStyle=`rgba(255,59,48,${.5-.4*Math.abs(Math.sin(i/500))})`,t.lineWidth=3,t.beginPath(),t.arc(l,c,14+4*Math.abs(Math.sin(i/500)),0,7),t.stroke(),t.save(),t.translate(l,c),t.rotate(-a.ry+Math.PI/2),t.fillStyle="#ff3b30",t.beginPath(),t.moveTo(0,-11),t.lineTo(8,9),t.lineTo(0,5),t.lineTo(-8,9),t.closePath(),t.fill(),t.strokeStyle="#fff",t.lineWidth=2,t.stroke(),t.restore(),this.text(t,"You",l,c+22,{s:11,fill:"#b3261e"});let u=[10,20,50,100,200].find(f=>f*e>=60)||200,h=14,d=this.H-18;t.fillStyle="#fffdf3cc",t.fillRect(h-6,d-14,u*e+12,26),t.strokeStyle="#333",t.lineWidth=2,t.beginPath(),t.moveTo(h,d+4),t.lineTo(h,d+8),t.lineTo(h+u*e,d+8),t.lineTo(h+u*e,d+4),t.stroke(),this.text(t,`${u} m`,h+u*e/2,d-4,{s:11,stroke:"transparent"}),this.text(t,"N \u25B2",this.W-34,this.H-20,{s:12,w:800})}hitAt(t,e){return Nu(this.model,this.wx(t),this.wz(e),this.v.k,this.layers,this.others||this.playersNow())}select(t){this.sel=t,this.showCard(t,!0)}showCard(t,e){if(!t){this.card.classList.add("hidden");return}let n=this.g;this.card.classList.remove("hidden"),this.card.classList.toggle("pinned",!!e);let i=[p("div",{class:"row sp"},p("b",{},`${t.icon?t.icon+" ":""}${t.name}`),e?p("button",{class:"bm-x",onclick:()=>{this.sel=null,this.card.classList.add("hidden")}},"\u2715"):""),...(t.lines||[]).filter(Boolean).map(r=>p("div",{class:"mut"},r))];e&&t.placeId?i.push(p("div",{class:"row"},p("button",{class:"btn small alt",id:"bmOpen",onclick:()=>{this.close(),n.ui.place(t.placeId)}},"Open and travel"),p("button",{class:"btn small ghost",onclick:()=>{n.setWaypoint(t.x,t.z,t.name),n.ui.toast(`Waypoint set: ${t.name}.`),this.close()}},"\u{1F4CD} Waypoint"))):e&&t.x!=null&&i.push(p("div",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>{n.setWaypoint(t.x,t.z,t.name),n.ui.toast(`Waypoint set: ${t.name}.`),this.close()}},"\u{1F4CD} Set waypoint here"))),this.card.replaceChildren(...i)}showList(){let t=Uu(this.model,this.input.value);this.list.classList.remove("hidden"),this.list.replaceChildren(...t.length?t.map(e=>p("button",{class:"bm-item","data-id":e.id,onclick:()=>{this.list.classList.add("hidden"),this.input.blur(),this.focusOn(e),this.select({...e,rect:e.type==="plot"?{x0:e.x-e.size/2,x1:e.x+e.size/2,z0:e.z-e.size/2,z1:e.z+e.size/2}:void 0})}},p("span",{},`${e.icon||(e.type==="road"?"\u{1F6E3}":"\u{1F4CD}")} ${e.name}`),p("small",{class:"mut"},e.group))):[p("div",{class:"mut",style:"padding:10px"},"Nothing found.")])}drawLegend(){let t=e=>p("label",{class:"bm-lg"},p("input",{type:"checkbox","data-layer":e[0],checked:this.layers[e[0]],onchange:n=>{this.layers[e[0]]=n.target.checked,this.cache=null}}),p("i",{style:`background:${e[2]}`}),e[1]);this.legend.replaceChildren(p("b",{},"Layers"),...Lu.map(t),p("b",{style:"margin-top:6px"},"Buildings"),p("div",{class:"bm-kinds"},Object.entries(So).map(([e,n])=>p("span",{},p("i",{style:`background:${n}`}),e))))}bind(){let t=this.canvas,e=new Map,n=null,i=null,r=0;t.addEventListener("wheel",a=>{a.preventDefault();let l=t.getBoundingClientRect();this.zoomAt(a.clientX-l.left,a.clientY-l.top,Math.exp(-a.deltaY*.0015))},{passive:!1}),t.addEventListener("pointerdown",a=>{if(t.setPointerCapture(a.pointerId),e.set(a.pointerId,{x:a.clientX,y:a.clientY}),r=0,this.list.classList.add("hidden"),e.size===1)n={x:a.clientX,y:a.clientY};else if(e.size===2){let[l,c]=[...e.values()];i={d:Math.hypot(l.x-c.x,l.y-c.y)},n=null}}),t.addEventListener("pointermove",a=>{let l=t.getBoundingClientRect();if(!e.has(a.pointerId)){if(a.pointerType==="mouse"&&!this.sel){let c=this.hitAt(a.clientX-l.left,a.clientY-l.top);this.hover=c,this.showCard(c,!1),t.style.cursor=c&&c.type!=="water"?"pointer":"grab"}return}if(e.set(a.pointerId,{x:a.clientX,y:a.clientY}),e.size===2&&i){let[c,u]=[...e.values()],h=Math.hypot(c.x-u.x,c.y-u.y);this.zoomAt((c.x+u.x)/2-l.left,(c.y+u.y)/2-l.top,h/i.d),i.d=h,r=99}else if(n){let c=a.clientX-n.x,u=a.clientY-n.y;r+=Math.abs(c)+Math.abs(u),n.x=a.clientX,n.y=a.clientY,this.v.cx-=c/this.v.k,this.v.cz-=u/this.v.k}});let o=a=>{let l=t.getBoundingClientRect(),c=e.has(a.pointerId);if(e.delete(a.pointerId),e.size<2&&(i=null),e.size){if(e.size===1){let[u]=[...e.values()];n={x:u.x,y:u.y}}}else{if(c&&r<8&&a.type==="pointerup"){let u=this.hitAt(a.clientX-l.left,a.clientY-l.top);this.select(u)}n=null}};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",o)}};var us=s=>s[Math.floor(Math.random()*s.length)],Sx={wage:s=>us([`Nailed it! ${pt(s)} don enter your pocket.`,`Oya collect your ${pt(s)}. Hustle pays!`,`Correct hustle! +${pt(s)}`]),shiftStart:()=>us(["Oya, na work time! Shift don start.","Shift don start. No dull!"]),bought:s=>us([`Correct! You pay ${pt(s)}.`,`Paid ${pt(s)}. Enjoy am!`]),home:()=>us(["Congrats, na your house be this!","New keys, new vibes. Welcome home!"]),plot:()=>"Congrats, the land is yours! Watch out for omo-onile.",travel:s=>s?`Safe journey! ${pt(s)} gone for transport.`:"Enjoy the ride, free of charge.",hit:s=>`Nailed it! +${s}% bonus on this shift.`,miss:()=>"Ah ah, you miss am! No bonus this time.",sold:s=>`Sold. ${pt(s)} back in your pocket.`,blocked:()=>"Something is in the way."},Ex={INSUFFICIENT_FUNDS:()=>us(["Your pocket dry o. Money no reach.","No cash for that one. Go hustle first!"]),TOO_FAR:()=>us(["You dey far o. Move closer.","Walk go there first, oga."]),TOO_TIRED:()=>"You don tire. Eat or rest first!",TOO_HUNGRY:()=>"Hunger dey vex you. Buy food first.",BLOCKED:()=>"Something is in the way.",COOLDOWN:null,LOGIN_REQUIRED:()=>"Session don end. Please log in again."},Fe=(s,...t)=>Sx[s](...t),To=class{constructor(t){this.g=t,this.sheetOpen=!1,this.onClose=null,this.mm=nt("#minimap").getContext("2d"),nt("#minimap").style.cursor="pointer",nt("#minimap").title="Open the full map (M)",nt("#minimap").addEventListener("click",()=>this.openMap()),this.chatOn=!1,this.sfxOn=!0,this.actx=null,nt("#sheetX").onclick=()=>this.closeSheet(),nt("#sheetWrap").addEventListener("pointerdown",e=>{e.target.id==="sheetWrap"&&this.closeSheet()}),nt("#phoneBtn").onclick=()=>this.phone(),nt("#muteBtn").onclick=()=>{this.sfxOn=!this.sfxOn,nt("#muteBtn").textContent=this.sfxOn?"\u{1F50A}":"\u{1F507}"},nt("#carBtn").onclick=()=>t.toggleCar(),nt("#chatForm").addEventListener("submit",async e=>{e.preventDefault();let n=nt("#chatInput"),i=n.value.trim();if(!i)return this.hideChat();n.value="",this.hideChat();try{await at("/api/chat",{text:i})}catch(r){this.error(r)}}),addEventListener("keydown",e=>{if(e.target.closest("input,textarea")){e.key==="Escape"&&(this.hideChat(),e.target.blur());return}if(e.key==="Escape"&&this.sheetOpen&&this.closeSheet(),!t.playing)return;let n=e.key.toLowerCase();n==="t"||n==="enter"?(e.preventDefault(),this.showChat()):n==="p"?this.phone():n==="m"?this.openMap():n==="c"?t.toggleCar():(n==="f"||n===" ")&&(this.sheetOpen||t.doAction())}),nt("#actionBtn").onclick=()=>t.doAction()}sfx(t){if(this.sfxOn)try{this.actx||(this.actx=new(window.AudioContext||window.webkitAudioContext));let e=this.actx,n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination);let r={coin:[[880,.07],[1320,.12]],ok:[[520,.08],[780,.1]],bad:[[180,.18]],horn:[[330,.22],[330,.22]],thunk:[[110,.09]],knock:[[140,.06],[140,.06],[140,.06]]}[t]||[[600,.08]],o=e.currentTime;n.type=t==="horn"?"sawtooth":"triangle",i.gain.setValueAtTime(.08,o);for(let[a,l]of r)n.frequency.setValueAtTime(a,o),o+=l;i.gain.exponentialRampToValueAtTime(1e-4,o+.05),n.start(),n.stop(o+.08)}catch{}}haptic(t=15){try{navigator.vibrate?.(t)}catch{}}toast(t,e=""){let n=p("div",{class:`toast ${e}`},t),i=nt("#toasts");for(i.append(n);i.children.length>3;)i.firstChild.remove();setTimeout(()=>n.remove(),4300),e==="bad"?this.sfx("bad"):e==="money"&&(this.sfx("coin"),this.haptic())}error(t){if(t instanceof Mn){if(t.status===401&&t.code==="LOGIN_REQUIRED"){this.g.sessionLost();return}let e=Ex[t.code];this.toast(e?e():t.message,"bad")}else console.error(t),this.toast("Something went wrong. Try again.","bad")}showChat(){nt("#chatForm").classList.add("on"),nt("#chatInput").focus()}hideChat(){nt("#chatForm").classList.remove("on"),nt("#game").focus()}addChat(t,e,n){let i=p("div",{style:"pointer-events:auto;cursor:pointer",title:"Tap to report, mute or block",onclick:()=>this.playerMenu(t,n&&{kind:"chat",target:n,text:`${t}: ${e}`})},`${t}: ${e}`);for(nt("#chatlog").append(i);nt("#chatlog").children.length>5;)nt("#chatlog").firstChild.remove();setTimeout(()=>i.remove(),14e3)}playerMenu(t,e){if(t===this.g.user?.username)return;this.openSheet(`@${t}`,[e?p("p",{class:"mut"},`"${e.text}"`):"",p("div",{class:"row"},e?p("button",{class:"btn red",onclick:()=>this.reportSheet(e.kind,e.target,e.text)},"\u{1F6A9} Report"):"",p("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"mute")},"\u{1F507} Mute"),p("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"block")},"\u26D4 Block")),p("p",{class:"mut"},"Mute: you stop seeing their chat and messages. Block: they cannot message you, knock on your door or sit at your tables, and you will not see each other.")])}async setBlock(t,e){await this.guard(()=>at("/api/social/mute",{username:t,kind:e}))&&(this.toast(e==="block"?`@${t} blocked.`:e==="mute"?`@${t} muted.`:`@${t} unblocked.`),this.closeSheet())}reportSheet(t,e,n=""){let i={abusive:"Abusive or insulting",sexual:"Sexual content",hate:"Hate or discrimination",scam_spam:"Scam or spam",personal_info:"Shares personal info",misleading:"Misleading",other:"Something else"},r="abusive",o=p("input",{class:"sheet-input",maxlength:200,placeholder:"Anything we should know? (optional)"}),a=p("div",{class:"chips"}),l=()=>a.replaceChildren(...Object.entries(i).map(([c,u])=>p("button",{class:`chip ${c===r?"on":""}`,onclick:()=>{r=c,l()}},u)));l(),this.openSheet("Report",[p("p",{class:"mut"},n?`Reporting: ${n}`:"Tell us what is wrong."),a,o,p("div",{class:"row"},p("button",{class:"btn red",onclick:async()=>{let c=await this.guard(()=>at("/api/report",{kind:t,target:String(e),reason:r,detail:o.value}));c&&(this.toast(c.message),this.closeSheet())}},"Send report"),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")),p("p",{class:"mut"},"Reports go to a human reviewer. False reports can limit your own account.")])}hud(t){nt("#cash").textContent=pt(t.cash),nt("#sav").textContent="\u{1F3E6} "+pt(t.savings),nt("#energyBar").style.width=t.energy+"%",nt("#hungerBar").style.width=t.hunger+"%",nt("#moodBar").style.width=(t.mood??60)+"%",nt("#moodBar").style.background=(t.mood??60)>=this.g.cfg.moodHappyAt?"#f7c948":"#e58fb3",nt("#energyBar").style.background=t.energy<20?"#d6402f":"#35c46b",nt("#hungerBar").style.background=t.hunger<20?"#d6402f":"#f29a2e";let e=nt("#shiftbar");if(t.shift){let n=this.g.cfg.jobs?.find(r=>r.id===t.shift.jobId),i=Math.max(0,t.shift.endsAt-this.g.serverNow());e.classList.remove("hidden"),e.textContent=i>0?`\u{1F4BC} ${n?.name||"Shift"} \xB7 ${Math.ceil(i/1e3)}s left`:`\u{1F4BC} ${n?.name||"Shift"} done: collect your pay!`}else e.classList.add("hidden")}clock(t){let e=(t.hour+11)%12+1,n=t.hour<6||t.hour>=19;nt("#clock").textContent=`${n?"\u{1F319}":"\u{1F31E}"} ${e}:${String(t.minute).padStart(2,"0")} ${t.hour>=12?"PM":"AM"} \xB7 Day ${t.day}`}badge(t){let e=nt("#phoneBadge");e.textContent=t,e.classList.toggle("hidden",!t)}loc(t){nt("#loc").textContent=t}waypoint(t,e){let n=nt("#waypoint");if(!t)return n.classList.add("hidden");n.classList.remove("hidden"),n.textContent=`\u{1F4CD} ${t.label} \xB7 ${Math.round(e)} m`}action(t){let e=nt("#actionBtn");if(!t)return e.classList.add("hidden");e.classList.remove("hidden"),e.textContent=t}minimap(t,e,n,i,r){let o=this.mm,a=300,l=a/520,c=e.bounds,u=d=>(d-c.minX)*l+8,h=d=>(d-c.minZ)*l+8;o.clearRect(0,0,a,a),o.fillStyle="#c9c3ad",o.fillRect(0,0,a,a),o.fillStyle="#2b6f8a",o.fillRect(0,h(c.maxZ),a,a),o.fillStyle="#3d4046";for(let d of e.roads)o.fillRect(u(Math.min(d.x1,d.x2))-(d.x1===d.x2?d.width*l/2:0),h(Math.min(d.z1,d.z2))-(d.z1===d.z2?d.width*l/2:0),d.x1===d.x2?d.width*l:Math.abs(d.x2-d.x1)*l,d.z1===d.z2?d.width*l:Math.abs(d.z2-d.z1)*l);o.fillStyle="#8f8a79";for(let d of e.buildings)o.fillRect(u(d.x-d.w/2),h(d.z-d.d/2),d.w*l,d.d*l);o.fillStyle="#ffc20e";for(let d of e.shops)o.fillRect(u(d.x)-3,h(d.z)-3,6,6);o.fillStyle="#4aa3ff";for(let d of e.jobs)o.fillRect(u(d.x)-3,h(d.z)-3,6,6);o.fillStyle="#35c46b";for(let d of e.billboards)d.surface!=="lagoon_plot"&&o.fillRect(u(d.x)-2,h(d.z)-2,4,4);i&&(o.fillStyle="#b44cff",o.beginPath(),o.arc(u(i.x),h(i.z),7,0,7),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke()),o.fillStyle="#fff";for(let d of n.map.values())d.root&&(o.beginPath(),o.arc(u(d.root.position.x),h(d.root.position.z),3.5,0,7),o.fill());o.save(),o.translate(u(t.x),h(t.z)),o.rotate(-t.ry+Math.PI/2),o.fillStyle="#ff3b30",o.beginPath(),o.moveTo(0,-8),o.lineTo(6,7),o.lineTo(-6,7),o.closePath(),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke(),o.restore()}openSheet(t,e,n){this.onClose=n||null,nt("#sheetTitle").textContent=t,nt("#sheetBody").replaceChildren(...[].concat(e)),nt("#sheetWrap").classList.remove("hidden"),this.sheetOpen=!0,this.g.ctrl.frozen=!0}setSheetBody(t){nt("#sheetBody").replaceChildren(...[].concat(t))}closeSheet(){if(!this.sheetOpen)return;nt("#sheetWrap").classList.add("hidden"),this.sheetOpen=!1,this.g.ctrl.frozen=this.g.busy,clearInterval(this.tick);let t=this.onClose;this.onClose=null,t?.(),nt("#game").focus()}async guard(t){try{return await t()}catch(e){return this.error(e),null}}async place(t){let n=this.g.city.places.find(o=>o.id===t);if(!n)return;let i=p("div",{});this.openSheet(n.name,i),clearInterval(this.tick),(async()=>{let o=await Dt(`/api/travel/quote?place=${encodeURIComponent(t)}`).catch(d=>(this.error(d),null));if(!o||!this.sheetOpen)return;let a=o.distance<22,l=a?null:this.lastMode&&o.modes.find(d=>d.id===this.lastMode)?this.lastMode:"keke",c=p("div",{}),u=p("div",{}),h=()=>{let d=p("div",{class:"chips"},o.modes.map(x=>p("button",{class:`chip ${x.id===l?"on":""}`,onclick:()=>{l=x.id,this.lastMode=x.id,h()}},{walk:"\u{1F6B6}",keke:"\u{1F6FA}",danfo:"\u{1F68C}",car:"\u{1F697}"}[x.id]||""," ",x.label,p("small",{},x.fare?`${pt(x.fare)} \xB7 ${x.seconds}s`:`free \xB7 ~${x.seconds}s`)))),f=o.modes.find(x=>x.id===l),g=p("button",{class:"btn big alt",disabled:a||!f,onclick:()=>this.go(n,f,o)},a?"You're here":l==="walk"?"Set waypoint & walk":`Go \xB7 ${pt(f.fare)}`);u.replaceChildren(p("div",{class:"row sp"},p("span",{class:"mut"},`${Math.round(o.distance)} m away`),p("span",{class:`tag ${o.rush?"amber":"green"}`},(o.rush?"\u23F0 ":"")+o.traffic)),a?"":d,g)};h(),i.replaceChildren(p("div",{class:"mut"},`${n.area} \xB7 ${Ax(n.type)}`),c,u),this.fillPlaceInfo(c,n,o)})()}async go(t,e,n){let i=this.g;if(e.id==="walk"){i.setWaypoint(t.x,t.z,t.name),this.closeSheet(),this.toast(`Waypoint set: ${t.name}. Follow the purple pin.`);return}let r=await this.guard(()=>at("/api/travel",{placeId:t.id,mode:e.id,pos:i.pos()}));r&&(this.closeSheet(),i.update(r.user),i.runCommute(r,t,n))}fillPlaceInfo(t,e,n){e.type==="shop"?this.shopBlock(t,e.id):e.type==="job"?this.jobBlock(t,e.id):e.type==="house"?this.houseBlock(t,e.id):e.type==="plot"?this.plotBlock(t,e.id):e.type==="venue"?this.venueBlock(t,e):t.replaceChildren(p("p",{class:"mut"},e.id==="airport"?"Fast travel to other cities (Abuja, Port Harcourt) comes later. The airport also hosts premium ad boards.":"A public landmark. Wave to the neighbours."))}venueBlock(t,e){let n=Tx(this.g.pos(),e)<20,i=e.hours?`Open ${e.hours[0]}:00 to ${e.hours[1]}:00`:"";t.replaceChildren(p("p",{class:"mut"},i),p("p",{},e.id==="venue_motors"?"Look at the cars, compare running costs and buy one. Placeholder prices are ESTIMATES.":e.id==="venue_meco"?"Meco fixes cars. Check your car, or pay a placeholder (ESTIMATE) fee for a quick service.":"Step inside to eat, chat, and play Whot or Ayo against other players. \u{1F3B2} Game money only."),p("button",{class:"btn big alt",disabled:!n,id:"venueEnter",onclick:()=>{this.closeSheet(),this.g.venue.show(e.id)}},n?"Go inside":"Walk to the door first"))}async shopBlock(t,e){let n=await this.guard(()=>Dt("/api/shops"));if(!n)return;let i=n.shops.find(a=>a.id===e);if(!i)return;this.g.shops=n.shops;let r="local",o=()=>{let a=Math.hypot(this.g.ctrl.x-i.x,this.g.ctrl.z-i.z)<24,l=n.channels.delivery;t.replaceChildren(p("p",{class:"mut"},i.desc),p("div",{class:"row"},p("span",{class:`tag ${i.status.open?"green":"red"}`},i.status.text),p("span",{class:"tag"},i.channel==="market"?`Market \xD7${n.channels.market.mult}`:`Supermarket \xD7${n.channels.supermarket.mult}`)),p("div",{class:"chips"},p("button",{class:`chip ${r==="local"?"on":""}`,onclick:()=>{r="local",o()}},i.channel==="market"?"Market stall":"In store",p("small",{},a?"you are here":"walk there")),p("button",{class:`chip ${r==="delivery"?"on":""}`,onclick:()=>{r="delivery",o()}},"\u{1F6F5} Delivery",p("small",{},`\xD7${l.mult} + ${pt(l.fee)} fee`))),p("div",{class:"list"},i.items.map(c=>{let u=r==="delivery"?c.deliveryPrice:c.price,h=r==="local"&&(!i.status.open||!a);return p("div",{},p("div",{},p("b",{},c.name),p("div",{class:"mut"},[c.hunger?`\u{1F372} +${c.hunger}`:"",c.energy?`\u26A1 +${c.energy}`:""].filter(Boolean).join("  "))),p("button",{class:"btn small",disabled:h,onclick:()=>this.buy(i,c,r,u,l.fee)},`${pt(u)}${r==="delivery"?"+"+l.fee:""}`))})),r==="local"&&!a?p("p",{class:"mut"},"Walk or ride to the shop to buy here, or switch to delivery."):"")};o()}async buy(t,e,n,i,r){let o=await this.guard(()=>at("/api/shop/buy",{shopId:t.id,itemId:e.id,channel:n,qty:1,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Fe("bought",o.spent),"money"))}jobBlock(t,e){let n=this.g,i=(n.cfg.jobs||[]).filter(o=>o.location===e),r=async()=>{let o=await this.guard(()=>Dt("/api/jobs"));if(!o)return;let a=n.user,l=o.jobs.filter(h=>h.location===e),c=a.shift,u=l.map(h=>{let d=c&&c.jobId===h.id,f=d?Math.max(0,c.endsAt-n.serverNow()):0;return p("div",{class:"card",style:"margin:8px 0;padding:12px;box-shadow:none;border:2px solid #e3dcc2"},p("div",{class:"row sp"},p("b",{},h.name),p("span",{class:"tag amber"},`${pt(h.wage)} / ${h.durationSec}s`)),p("div",{class:"mut"},h.desc),p("div",{class:"mut"},`\u26A1 -${h.energyCost}  \u{1F372} -${h.hungerCost}  \xB7 cooldown ${h.cooldownSec}s${h.locked?` \xB7 \u{1F512} ${h.shiftsNeeded} more shift(s) to unlock`:""}`),d?p("div",{},p("div",{class:"progress"},p("i",{style:`width:${Math.min(100,100-f/(h.durationSec*10))}%`})),f>0?p("div",{class:"mut"},`${Math.ceil(f/1e3)}s left`):"",p("div",{class:"row"},p("button",{class:"btn alt",onclick:()=>this.miniGame(r)},"\u{1F3AF} Quick task (+25%)"),p("button",{class:"btn",disabled:f>0,onclick:async()=>{let g=await this.guard(()=>at("/api/jobs/claim"));g&&(n.update(g.user),this.toast(Fe("wage",g.wage),"money"),r())}},f>0?"Working\u2026":"Collect pay"))):p("button",{class:"btn",style:"margin-top:6px",disabled:h.locked||!!c||h.cooldownLeftMs>0,onclick:async()=>{let g=await this.guard(()=>at("/api/jobs/start",{jobId:h.id,pos:n.pos()}));g&&(n.update(g.user),this.toast(Fe("shiftStart")),r())}},h.cooldownLeftMs>0?`Break (${Math.ceil(h.cooldownLeftMs/1e3)}s)`:c?"Finish your shift first":"Start shift"))});t.replaceChildren(...u)};r(),clearInterval(this.tick),this.tick=setInterval(()=>{this.sheetOpen&&!this.mgOpen&&r()},2500)}async miniGame(t){let e=await this.guard(()=>at("/api/jobs/task/start"));if(!e)return;this.mgOpen=!0;let n,i=p("div",{class:"cur"}),r=p("div",{class:"zone",style:`left:${(e.target-e.width/2)*100}%;width:${e.width*100}%`}),o=p("div",{class:"mgbar"},r,i),a=p("div",{class:"big",style:'font:400 22px "Lilita One";min-height:30px'}),l=!1,c=d=>{let f=d-Math.floor(d);return f<.5?f*2:2-f*2},u=()=>{i.style.left=`calc(${c((this.g.serverNow()-e.startedAt)/e.periodMs)*100}% - 4px)`,l||(n=requestAnimationFrame(u))};u();let h=p("button",{class:"btn big alt",onclick:async()=>{if(l){this.mgOpen=!1,t();return}l=!0;let d=await this.guard(()=>at("/api/jobs/task/stop"));cancelAnimationFrame(n),d?(i.style.left=`calc(${d.pos*100}% - 4px)`,a.textContent=d.hit?Fe("hit",d.bonusPct):Fe("miss"),this.sfx(d.hit?"coin":"bad"),h.textContent="Back to work"):(this.mgOpen=!1,t())}},"STOP!");this.setSheetBody(p("div",{class:"minigame"},p("p",{class:"mut"},"Stop the gold bar inside the green zone. One try per shift."),o,a,h))}async houseBlock(t,e){let n=this.g,i=await this.guard(()=>Dt("/api/properties"));if(!i)return;n.props=i.properties,n.world.setMarkers(i.properties);let r=i.properties.find(f=>f.id===e);if(!r)return;let o=n.cfg.maxNameLen,a=r.status==="yours",l={home:"They're home right now",online:"Online, but out and about",away:"Not around right now"}[r.presence],c=r.owner?`@${r.owner}'s ${r.name}`:`${r.baseName}`,u=a?p("div",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>this.rename(r,()=>this.houseBlock(t,e))},"\u270F\uFE0F Rename"),p("span",{class:"mut"},`max ${o} characters`)):"",h=Math.hypot(n.ctrl.x-r.door.x,n.ctrl.z-r.door.z)<30,d=[];d.push(p("div",{class:"row"},r.owner?p("div",{class:"avatar",style:`background:${r.ownerColor||"#2e9b5e"}`},r.owner[0].toUpperCase()):p("div",{class:"avatar",style:"background:#8a8f98"},"\u{1F3E0}"),p("div",{},p("b",{style:"font-size:18px"},c),p("div",{class:"mut"},`${r.tierLabel} \xB7 ${r.area}`)))),r.owner&&d.push(p("div",{class:"row sp"},p("span",{},p("span",{class:`dot ${r.presence}`}),l),p("span",{class:"tag"},`${r.items} items`))),d.push(u),a?(d.push(p("div",{class:"row"},p("span",{class:"tag green"},r.mode==="own"?"You own this":`Rent ${pt(r.rent)}/day`),r.nextRentDue?p("span",{class:"mut"},`next rent ${new Date(r.nextRentDue).toLocaleString("en-NG",{weekday:"short",hour:"numeric",minute:"2-digit"})}`):"")),d.push(p("div",{class:"row"},p("button",{class:"btn",onclick:()=>{this.closeSheet(),n.enterHome()}},"\u{1F6AA} Go inside"),p("button",{class:"btn ghost",onclick:()=>this.confirm(r.mode==="own"?"Sell for about 70% of what you paid?":"Move out? (no refund)",async()=>{let f=await this.guard(()=>at("/api/property/release"));f&&(n.update(f.user),this.toast(f.refund?Fe("sold",f.refund):"You moved out."),this.houseBlock(t,e))})},r.mode==="own"?"Sell house":"Move out")))):r.owner?(d.push(p("div",{class:"row"},p("button",{class:"btn",disabled:r.presence!=="home"||!h,onclick:()=>this.knock(r)},"\u{1F3E0} Visit"),p("button",{class:"btn ghost",onclick:()=>this.message(r.owner)},"\u{1F4AC} Message"),p("button",{class:"btn ghost small",title:"Mute, block or report",onclick:()=>this.playerMenu(r.owner,r.hasCustomName&&!r.nameHidden?{kind:"house_name",target:r.id,text:`${r.owner}'s "${r.name}"`}:null)},"\u22EF"))),d.push(p("div",{class:"mut"},"You can only drop by when they're home"+(h?".":" and you are at the door.")))):(d.push(p("p",{class:"mut"},`${r.rooms} room(s). Rent ${pt(r.rent)} per day (first day paid up front)${r.price?` \xB7 or buy for ${pt(r.price)}`:" \xB7 rent only"}.`)),d.push(p("div",{class:"row"},p("button",{class:"btn",disabled:!h,onclick:()=>this.review(r,"rent",()=>this.houseBlock(t,e))},`Rent \xB7 ${pt(r.rent)}`),r.price?p("button",{class:"btn alt",disabled:!h,onclick:()=>this.review(r,"own",()=>this.houseBlock(t,e))},`Buy \xB7 ${pt(r.price)}`):"")),h||d.push(p("div",{class:"mut"},"Get to the door first (use the travel chips below)."))),t.replaceChildren(...d)}review(t,e,n){let i=e==="own"?t.price:t.rent,r=p("div",{},p("h3",{},"Review"),p("p",{},`${t.baseName} \xB7 ${t.tierLabel} \xB7 ${t.area}`),p("p",{},e==="own"?`Price ${pt(i)} (one-off). You can sell back later for about 70%.`:`Rent ${pt(i)} per day. Day 1 is paid now. Miss ${this.g.cfg.evictAfter||2} rent days and you are evicted.`),p("div",{class:"row"},p("button",{class:"btn alt",onclick:async()=>{let o=await this.guard(()=>at("/api/property/acquire",{propertyId:t.id,mode:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Fe("home"),"money"),this.sfx("ok"),n(),this.g.refreshProps())}},`Pay ${pt(i)}`),p("button",{class:"btn ghost",onclick:n},"Back")));this.setSheetBody(r)}confirm(t,e){this.setSheetBody(p("div",{},p("p",{},t),p("div",{class:"row"},p("button",{class:"btn red",onclick:e},"Yes"),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel"))))}rename(t,e){let n=this.g.cfg.maxNameLen,i=p("input",{class:"sheet-input",maxlength:n,value:t.name});this.setSheetBody(p("div",{},p("h3",{},"Name your house"),i,p("p",{class:"mut"},`3-${n} characters. Rude names get refused.`),p("div",{class:"row"},p("button",{class:"btn",onclick:async()=>{let r=await this.guard(()=>at("/api/property/name",{name:i.value}));r&&(this.g.update(r.user),this.toast(`Your house is now "${r.name}"`,"money"),this.g.refreshProps(),e())}},"Save"),p("button",{class:"btn ghost",onclick:e},"Cancel")))),i.focus(),i.select()}message(t){let e=p("input",{class:"sheet-input",maxlength:140,placeholder:`Message @${t}\u2026`});this.setSheetBody(p("div",{},p("h3",{},`Message @${t}`),e,p("div",{class:"row"},p("button",{class:"btn",onclick:async()=>{await this.guard(()=>at("/api/dm",{to:t,text:e.value}))&&(this.toast("Message sent."),this.closeSheet())}},"Send"),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")))),e.focus()}async knock(t){let e=await this.guard(()=>at("/api/visit/knock",{propertyId:t.id,pos:this.g.pos()}));if(!e)return;this.sfx("knock");let n=this.g,i=!0,r=p("b",{}),o=p("div",{style:"text-align:center"},p("h3",{},"Knock knock\u2026"),p("p",{},`Waiting for @${e.owner} to open the door of ${e.name}`),p("p",{},r),p("button",{class:"btn ghost",onclick:async()=>{i=!1,await at("/api/visit/cancel").catch(()=>{}),this.closeSheet()}},"Walk away"));this.setSheetBody(o),this.onClose=()=>{i=!1};let a=Date.now(),l=async()=>{if(!i||!this.sheetOpen)return;r.textContent=`${Math.max(0,Math.ceil((e.expiresAt-n.serverNow())/1e3))}s`;let c=n.lastKnocks?.mine;if(c&&c.id===e.knockId){if(c.status==="accepted"){i=!1,this.closeSheet(),this.toast("Come in!","money"),n.enterAsVisitor(t.id);return}if(c.status==="declined"){i=!1,o.replaceChildren(p("p",{},`@${e.owner} isn't receiving visitors right now. \u{1F6AA}`),p("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}if(c.status==="expired"){i=!1,o.replaceChildren(p("p",{},`No answer at @${e.owner}'s door.`),p("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}}setTimeout(l,800)};n.net.nudge(),l()}hostKnock(t){if(this.knockShown===t.id)return;this.knockShown=t.id,this.sfx("knock");let e=p("div",{class:"toast money",style:"pointer-events:auto"},p("div",{},`\u{1F6AA} @${t.from} is at your door!`),p("div",{class:"row"},p("button",{class:"btn small",onclick:async()=>{e.remove(),await this.guard(()=>at("/api/visit/respond",{knockId:t.id,accept:!0}))&&this.toast(`@${t.from} is coming in.`)}},"Let in"),p("button",{class:"btn small red",onclick:async()=>{e.remove(),await this.guard(()=>at("/api/visit/respond",{knockId:t.id,accept:!1}))}},"Not now")));nt("#toasts").append(e),setTimeout(()=>e.remove(),Math.max(1e3,t.expiresAt-this.g.serverNow()))}async plotBlock(t,e){let n=this.g,i=await this.guard(()=>Dt("/api/plots"));if(!i)return;let r=i.plots.find(c=>c.id===e);if(!r)return;n.plots=i.plots;let o=Math.hypot(n.ctrl.x-r.x,n.ctrl.z-r.z)<r.size/2+25,a=p("span",{class:`tag ${r.risk==="high"?"red":r.risk==="medium"?"amber":"green"}`},`Omo-onile risk: ${r.risk}`),l=[p("div",{class:"row"},p("b",{},r.name),a),p("div",{class:"row"},p("span",{class:"tag"},`${r.sqm} sqm`),p("span",{class:"tag green"},`\u{1F4C8} ~${r.growthPerWeekPct}%/week (ESTIMATE)`)),p("div",{class:"mut"},"Prices, growth and risk are placeholders for testing. Land value compounds over real days; omo-onile may demand a levy.")];r.status==="yours"?l.push(p("p",{},`Your plot. Value now ${pt(r.value)} \xB7 sell for ${pt(r.sellValue)}`),p("button",{class:"btn red",onclick:()=>this.confirm(`Sell for ${pt(r.sellValue)}?`,async()=>{let c=await this.guard(()=>at("/api/plot/sell",{plotId:e}));c&&(n.update(c.user),this.toast(Fe("sold",c.value),"money"),this.plotBlock(t,e),this.closeSheet())})},"Sell plot")):r.status==="taken"?l.push(p("p",{class:"mut"},`Owned by @${r.owner}.`)):l.push(p("p",{},`Price ${pt(r.price)}`),p("button",{class:"btn alt",disabled:!o,onclick:()=>this.setSheetBody(p("div",{},p("h3",{},"Review"),p("p",{},`${r.name} \xB7 ${r.area} \xB7 ${r.sqm} sqm`),p("p",{},`Price ${pt(r.price)}. ${r.risk==="high"?"Omo-onile risk is HIGH: expect levy demands.":r.risk==="medium"?"Some omo-onile risk.":"Documents are clean (low risk)."}`),p("div",{class:"row"},p("button",{class:"btn alt",onclick:async()=>{let c=await this.guard(()=>at("/api/plot/buy",{plotId:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:n.pos()}));c&&(n.update(c.user),this.toast(Fe("plot"),"money"),this.closeSheet())}},`Pay ${pt(r.price)}`),p("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Back"))))},"Buy plot"),o?"":p("div",{class:"mut"},"Walk up to the plot first.")),t.replaceChildren(...l)}async board(t){let e=this.g,n=Math.floor(e.serverNow()/e.ads.rot),i=e.ads.currentFor(t,n),r=e.world.boards[t].def,o=[p("div",{class:"mut"},`${{road_billboard:"Road billboard",airport_board:"Airport board",lagoon_plot:"Lagoon plot"}[r.surface]} \xB7 ${t}`)];i?o.push(p("h3",{},i.b),i.h?p("p",{},i.h):"",p("span",{class:"tag amber"},"Sponsored"),p("div",{class:"row"},p("button",{class:"btn ghost small",onclick:()=>this.reportSheet("ad_creative",i.c,`${i.b}${i.h?": "+i.h:""}`)},"\u{1F6A9} Report this ad"),p("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>at("/api/ads/tap",{campaign:i.c,slot:t,pos:e.pos()}));a&&(window.open(a.path,"_blank","noopener"),this.toast(`Opening ${a.brand}'s page in a new tab.`))}},"Visit advertiser"))):o.push(p("h3",{},"Your ad here"),p("p",{},"This board is free. Brands rent boards at /advertise (test mode)."),p("a",{href:"/advertise",target:"_blank",rel:"noopener",class:"btn"},"Advertise on this board")),this.openSheet("Billboard",o)}phone(t){return this.g.cfg.phone&&this.g.phone2?(this.shell||(this.shell=new Mo(this)),this.shell.open(t||"home")):this.phoneLegacy(t||"wallet")}phoneLegacy(t="wallet"){let e=this.g,n=[["wallet","\u{1F4B0} Wallet"],["jobs","\u{1F4BC} Jobs"],["home","\u{1F3E0} Home"],["land","\u{1F30D} Land"],["ranks","\u{1F3C6} Ranks"],["garage","\u{1F697} Garage"],["games","\u{1F3AE} Games"],["map","\u{1F5FA} Map"],["alerts","\u{1F514} Alerts"],["more","\u2699\uFE0F More"]],i=p("div",{}),r=t,o=p("div",{class:"tabrow"}),a=()=>o.replaceChildren(...n.map(([c,u])=>p("button",{class:c===r?"on":"",onclick:()=>{r=c,a(),l()}},u))),l=async()=>{i.replaceChildren(p("p",{class:"mut"},"Loading\u2026"));let u=await this["tab_"+r].call(this);i.replaceChildren(...[].concat(u))};a(),this.openSheet("Phone",[o,i]),l()}async tab_wallet(){let t=this.g,e=t.user,n=await this.guard(()=>Dt("/api/ledger")),i=p("input",{class:"sheet-input",type:"number",min:100,placeholder:"Amount \u20A6"}),r=p("input",{class:"sheet-input",placeholder:"Send to @username"}),o=a=>async()=>{let l=await this.guard(()=>at("/api/bank",{dir:a,amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));l&&(t.update(l.user),this.toast(a==="deposit"?"Saved in the bank.":"Withdrawn.","money"),this.setSheetBody([]),this.phone("wallet"))};return[p("div",{class:"row sp"},p("div",{},p("div",{class:"mut"},"Cash"),p("b",{style:"font-size:26px"},pt(e.cash))),p("div",{},p("div",{class:"mut"},"Savings (\u22480.5%/day, ESTIMATE)"),p("b",{style:"font-size:22px"},pt(e.savings))),p("div",{},p("div",{class:"mut"},"Net worth"),p("b",{},pt(e.netWorth)))),i,p("div",{class:"row"},p("button",{class:"btn",onclick:o("deposit")},"Save"),p("button",{class:"btn ghost",onclick:o("withdraw")},"Withdraw"),p("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>at("/api/transfer",{to:r.value.replace("@",""),amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));a&&(t.update(a.user),this.toast("Sent!","money"))}},"Send money")),r,p("p",{class:"mut"},"Transfers are capped and rate-limited. New accounts wait a few minutes. Guests cannot send money."),p("div",{class:"card",style:"box-shadow:none;border:2px dashed #cfc8ac;padding:12px;margin:10px 0"},p("b",{},"Test top-up"),p("div",{class:"mut"},"TEST MODE: adds pretend \u20A6, no payment is taken. Real payments (Monipay) come later."),p("div",{class:"chips"},(t.cfg.topupOptions||[]).map(a=>p("button",{class:"chip",onclick:async()=>{let l=await this.guard(()=>at("/api/topup/test",{amount:a,idem:crypto.randomUUID?.()||String(Math.random())}));l&&(t.update(l.user),this.toast(`+${pt(a)} (test)`,"money"))}},`+${pt(a)}`)))),p("b",{},"Recent activity"),p("div",{class:"list"},(n?.rows||[]).slice(0,12).map(a=>p("div",{},p("span",{},a.reason.replaceAll("_"," ")),p("b",{style:`color:${a.amount<0?"#d6402f":"#0b7a49"}`},(a.amount>0?"+":"")+pt(a.amount)))))]}async tab_jobs(){let t=await this.guard(()=>Dt("/api/jobs"));return t?[p("p",{class:"mut"},"Tap a job to set a waypoint. Start shifts at the job location."),p("div",{class:"list"},t.jobs.map(e=>p("div",{},p("div",{},p("b",{},e.name),p("div",{class:"mut"},`${pt(e.wage)} \xB7 ${e.durationSec}s \xB7 ${e.place}${e.locked?" \xB7 \u{1F512}":""}`)),p("button",{class:"btn small ghost",onclick:()=>{this.g.setWaypoint(e.x,e.z,e.name),this.closeSheet()}},"\u{1F4CD}"))))]:[]}async tab_home(){let t=this.g,e=t.user,n=await this.guard(()=>Dt("/api/properties"));return n?(t.props=n.properties,t.world.setMarkers(n.properties),e.home?[p("h3",{},e.home.name),p("div",{class:"mut"},`${e.home.tierLabel} \xB7 ${e.home.area}`),p("div",{class:"row"},p("button",{class:"btn",onclick:()=>{this.closeSheet(),t.setWaypoint(e.home.door.x,e.home.door.z,e.home.name)}},"\u{1F4CD} Waypoint"),p("button",{class:"btn alt",onclick:()=>this.place(e.home.id)},"Open house card"))]:[p("p",{class:"mut"},"Find a place: green arrows over doors mean available. Tap a house to rent or buy."),p("div",{class:"list"},n.properties.filter(i=>i.status==="available").slice(0,12).map(i=>p("div",{},p("div",{},p("b",{},i.baseName),p("div",{class:"mut"},`${i.tierLabel} \xB7 ${i.area} \xB7 ${pt(i.rent)}/day${i.price?` \xB7 buy ${pt(i.price)}`:""}`)),p("button",{class:"btn small ghost",onclick:()=>this.place(i.id)},"View"))))]):[]}async tab_land(){let t=await this.guard(()=>Dt("/api/plots"));return t?[p("div",{class:"list"},t.plots.map(e=>p("div",{},p("div",{},p("b",{},e.name),p("div",{class:"mut"},`${e.area} \xB7 ${pt(e.price)} \xB7 risk ${e.risk} \xB7 ${e.status}`)),p("button",{class:"btn small ghost",onclick:()=>this.place(e.id)},"View"))))]:[]}async tab_ranks(){let t=await this.guard(()=>Dt("/api/leaderboard"));return t?[p("p",{class:"mut"},"Net worth = cash + savings + property (70%) + land (95%). Bots are hidden."),p("div",{class:"list"},t.rows.map(e=>p("div",{},p("span",{},`#${e.rank} ${e.name}${e.guest?" (guest)":""}`),p("b",{},pt(e.netWorth)))))]:[]}openMap(t){this.bigmap=this.bigmap||new Eo(this.g),this.sheetOpen&&this.closeSheet(),this.bigmap.isOpen?this.bigmap.close():this.bigmap.open(t)}async tab_map(){return this.openMap(),[]}async tab_games(){return Pu(this)}playCasual(t){cc(this,t)}async tab_garage(){let t=await this.guard(()=>Dt("/api/garage"));if(!t)return[];let e=this.g,n=e.city.places.find(r=>r.id==="venue_motors"),i=t.cars.length?p("div",{class:"list"},t.cars.map(r=>p("div",{},p("span",{},`${r.active?"\u2705 ":""}${r.name}`,p("small",{class:"mut"},` \xB7 worth ${pt(r.value)} (paid ${pt(r.paid)}) \xB7 ${r.ageDays}d old \xB7 ${r.conditionLabel} ${r.condition}%`)),p("span",{class:"row"},r.active?"":p("button",{class:"btn small",onclick:async()=>{await this.guard(()=>at("/api/garage/use",{carId:r.id})),this.phone("garage")}},"Use"),p("button",{class:"btn small ghost",onclick:()=>this.confirm(`Sell ${r.name} for about ${pt(r.value)}?`,async()=>{let o=await this.guard(()=>at("/api/garage/sell",{carId:r.id,idemKey:crypto.randomUUID?.()}));o&&(this.toast(`Sold for ${pt(o.value)}.`,"money"),e.refreshMe()),this.phone("garage")})},"Sell"))))):p("p",{class:"mut"},"No car of your own yet. You are using a borrowed car: higher cost per trip, slower, no mood perk.");return[p("div",{class:"row sp"},p("b",{},`Garage (${t.cars.length}/${t.slots})`),p("span",{class:"mut"},`Driving: ${t.active.label}`)),i,p("p",{class:"mut"},`Resale: about ${Math.round((1-t.resale.firstDriveOffFraction)*100)}% on day one, then about ${Math.round(t.resale.perDayDepreciation*100)}% less per day, never below ${Math.round(t.resale.floorFraction*100)}%. All figures are ESTIMATES.`),p("button",{class:"btn",id:"openGarage",onclick:()=>e.garage.show()},"\u{1F6AA} Open my garage"),n?p("button",{class:"btn alt",onclick:()=>{this.closeSheet(),this.place(n.id)}},"\u{1F3EA} Visit Naija Auto Mart"):""]}async tab_alerts(){let t=await this.guard(()=>Dt("/api/notifications"));return this.g.markRead(),t?[p("div",{class:"list"},t.rows.map(e=>p("div",{},p("span",{},e.text),p("span",{class:"mut"},new Date(e.created_at).toLocaleTimeString("en-NG",{hour:"numeric",minute:"2-digit"})))))]:[]}async tab_more(){let t=this.g,e=await this.guard(()=>Dt("/api/social/blocks")),n=p("div",{class:"list"},(e?.rows||[]).map(i=>p("div",{},p("span",{},`@${i.username} \xB7 ${i.kind}`),p("button",{class:"btn small ghost",onclick:async()=>{await this.setBlock(i.username,null),this.phone("more")}},"Undo"))));return[p("b",{},"Muted and blocked"),(e?.rows||[]).length?n:p("p",{class:"mut"},"Nobody. Tap a chat line or the \u22EF on a house card to mute, block or report."),p("div",{class:"row"},p("a",{class:"btn ghost",href:"/advertise",target:"_blank",rel:"noopener"},"Advertise"),p("a",{class:"btn ghost",href:"/methodology",target:"_blank",rel:"noopener"},"How ads are counted"),p("a",{class:"btn ghost",href:"/stats.html",target:"_blank",rel:"noopener"},"Stats")),p("p",{class:"mut"},`${t.cfg.name} v0 \xB7 test build. In-game \u20A6 is fictional with no cash-out. 18+.`),p("div",{class:"row"},p("button",{class:"btn red",onclick:()=>t.logout()},"Log out"))]}},Tx=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z),Ax=s=>({venue:"Place to hang out",shop:"Shop",job:"Work",house:"House",plot:"Land plot",landmark:"Landmark"})[s]||s;var Ao=class{constructor(t){this.g=t,this.interval=3e3,this.fails=0,this.timer=null,this.running=!1,this.trail=[],this.notifSince=0,this.chatSince=void 0,this.adsVersion=0,this.since=0,this.ws=null,this.inflight=!1}start(){this.running||(this.running=!0,this.tick(),this.openWs())}stop(){this.running=!1,clearTimeout(this.timer);try{this.ws?.close()}catch{}this.ws=null}nudge(){this.running&&(clearTimeout(this.timer),this.timer=setTimeout(()=>this.tick(),50))}sample(t){this.trail.push(t),this.trail.length>60&&this.trail.shift()}async tick(){if(!this.running||this.inflight)return;this.inflight=!0;let t=this.g,e=t.serverNow(),n=!1,i=this.trail.splice(0).map(r=>({a:Math.max(0,Math.round(e-r.t)),x:+r.x.toFixed(2),z:+r.z.toFixed(2),ry:+r.ry.toFixed(3)}));try{let r={trail:i,mode:t.ctrl.mode,since:this.since,notifSince:this.notifSince,adsVersion:this.adsVersion,evidence:t.ads.take(),activity:t.activity||""};this.chatSince!==void 0&&(r.chatSince=this.chatSince);let o=performance.now(),a=await at("/api/heartbeat",r),l=performance.now()-o;t.clockSync(a.now,l),this.since=a.now,this.fails=0,n=!0,t.setConn(!0),this.interval=a.interval||3e3,this.adsVersion=a.adsVersion,this.chatSince=a.chatCursor,a.notifs?.length&&(this.notifSince=a.notifs[a.notifs.length-1].id),t.onHeartbeat(a)}catch(r){if(this.fails++,r instanceof Mn&&r.status===401){this.stop(),t.sessionLost();return}this.fails>=3&&t.setConn(!1)}finally{this.inflight=!1}this.running&&(this.timer=setTimeout(()=>this.tick(),n?this.interval:Math.min(15e3,1500*2**Math.min(this.fails,3))))}openWs(){if(!window.__naDemo)try{let t=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`);this.ws=t,t.onmessage=e=>{try{let n=JSON.parse(e.data);n.type==="notification"?(this.g.onPush(n),this.nudge()):typeof n.type=="string"&&n.type.startsWith("phone.")&&this.g.phone2?.onPush(n)}catch{}},t.onclose=()=>{this.running&&setTimeout(()=>this.running&&this.openWs(),5e3)},t.onerror=()=>{}}catch{}}};var Pe=(s,t={})=>new Kt({color:s,...t}),wn=s=>new Jt({color:s});function Qe(s){return{box:(i,r,o,a,l=0,c=r/2,u=0,h)=>{let d=new et(new Bt(i,r,o),h||Pe(a));return d.position.set(l,c,u),s.add(d),d},cyl:(i,r,o,a=0,l=r/2,c=0,u=14,h,d)=>{let f=new et(new Me(d??i,i,r,u),h||Pe(o));return f.position.set(a,l,c),s.add(f),f},sph:(i,r,o,a,l,c)=>{let u=new et(new an(i,12,9),c||Pe(r));return u.position.set(o,a,l),s.add(u),u}}}var ku=(s,t=1,e=1)=>{let n=document.createElement("canvas");n.width=n.height=128,s(n.getContext("2d"));let i=new _i(n);return i.wrapS=i.wrapT=yi,i.repeat.set(t,e),i.magFilter=Be,i};function Rx(s,t,e){let n=s?.a||"#cdbb98",i=s?.b||n,r=s?.style||"plain";return r==="checker"||r==="dance"?Pe(16777215,{map:ku(o=>{o.fillStyle=n,o.fillRect(0,0,128,128),o.fillStyle=i,o.fillRect(0,0,64,64),o.fillRect(64,64,64,64)},t/1.6,e/1.6)}):r==="planks"?Pe(16777215,{map:ku(o=>{for(let a=0;a<4;a++)o.fillStyle=a%2?n:i,o.fillRect(0,a*32,128,32),o.fillStyle="rgba(0,0,0,.28)",o.fillRect(0,a*32,128,2),o.fillRect(a*53%100+10,a*32,2,32)},t/2.4,e/1.2)}):Pe(n)}var Cx=(s,t,e)=>{let n={warm:[2760984,1,16773328],dim:[1053983,.55,11189230],neon:[1313314,.55,16761087],work:[2106666,.95,16774880],bright:[2306106,1.15,16777215],club:[460045,.32,12029183],sunset:[1970696,.6,16757611]}[t]||[1911589,1,16777215];s.background=new Mt(n[0]),e.hemi.intensity=n[1],e.sun.color.set(n[2]),e.sun.intensity=t==="club"?.15:t==="neon"?.4:t==="dim"?.35:t==="sunset"?.5:1};function Ix(s,t,e,n,i,r,o){let a=i.big?2:1.3,l=i.big?1.45:1.8,c=new Xt,u=Qe(c);if(u.box(n+.24,a+.24,.1,o,0,l,0),u.box(n,a,.14,0,0,l,0,new Jt({color:i.blind?1713203:10475775,transparent:!0,opacity:.85})),u.box(.06,a,.16,o,0,l,0),i.big&&u.box(n,.06,.16,o,0,l,0),i.blind)for(let h=0;h<5;h++)u.box(n,.04,.17,5924216,0,l-a/2+(h+.5)*a/5,0);u.box(n+.4,.08,.3,o,0,l-a/2-.12,.08),t==="back"?c.position.set(e,0,-r.d/2+.12):(c.rotation.y=Math.PI/2,c.position.set(-r.w/2+.12,0,e)),s.add(c)}function Ou(s,t,e,n,i,r){let o=e||{},a=new Mt(o.trim||n||"#555"),l=new et(new Bt(t.w,.2,t.d),Rx(o.floor,t.w,t.d));l.position.y=-.1,s.add(l);let c=Pe(o.wall||"#f1e7cf"),u=3.4,h=new et(new Bt(t.w,u,.2),c);h.position.set(0,u/2,-t.d/2);let d=new et(new Bt(.2,u,t.d),c);d.position.set(-t.w/2,u/2,0),s.add(h,d);let f=Qe(s);f.box(t.w,.5,.24,a,0,3.1,-t.d/2+.02),f.box(.24,.5,t.d,a,-t.w/2+.02,3.1,0),f.box(t.w,.35,.22,a,0,.17,-t.d/2+.02),f.box(.22,.35,t.d,a,-t.w/2+.02,.17,0),f.box(t.w+.2,.3,.2,5592405,0,.15,t.d/2+.1);for(let x of o.windows||[])Ix(s,x.wall,x.at,x.w,x,t,a);let g=new et(new Bt(2.2,.04,.4),new Jt({color:16761358}));if(g.position.set(0,.06,t.d/2+.1),s.add(g),o.floor?.style==="dance"){let x=[],y=[8072383,3835647,16711790,448160,16760331];for(let m=0;m<5;m++)for(let v=0;v<4;v++){let S=new et(new Bt(.96,.05,.96),new Jt({color:y[(m+v)%5]}));S.position.set(-2+m,.03,-.7+v),s.add(S),x.push(S)}i.push(m=>x.forEach((v,S)=>v.material.color.setHex(y[(Math.floor(m*2)+S+Math.floor(S/5))%5])))}o.mood&&Cx(s,o.mood,r)}var dc={shelf(s,t,e){t.box(2.2,1.7,.45,e.c||9067051,0,.85,0);for(let n=0;n<3;n++){t.box(2.1,.05,.5,5978650,0,.45+n*.5,.02);for(let i=0;i<4;i++)e.bottles?t.cyl(.07,.3,[15087942,2792847,16032353,9358054][i],-.8+i*.5,.62+n*.5,.05,8):e.pots&&n<2?t.cyl(.17,.2,[11883578,12632256,15320170,9279918][i],-.8+i*.5,.57+n*.5,.05,10):t.box(.3,.25,.25,[15320170,14034984,2792847,4553629][(n+i)%4],-.8+i*.5,.6+n*.5,.05)}},fridge(s,t){t.box(1,2,.9,15265522),t.box(.04,.5,.04,5592405,.35,1.5,.47),t.box(.9,.04,.9,11583173,0,1.2,.01)},stool(s,t,e){t.cyl(.32,.08,e.c||15087942,0,.62);for(let[n,i]of[[-.2,-.2],[.2,-.2],[-.2,.2],[.2,.2]])t.cyl(.04,.6,5592405,n,.3,i,6)},table(s,t,e){t.cyl(.6,.07,e.c||16777215,0,.78,0,16),t.cyl(.07,.75,7829367,0,.38)},lanterns(s,t,e,n,i){for(let o=0;o<7;o++){let a=-n.w/2+.6+o*(n.w-1.2)/6,l=t.sph(.16,0,a,2.75+Math.sin(o*1.3)*.08,0,wn(e.c[o%e.c.length]))}t.box(n.w-.6,.02,.02,3355443,0,2.95,0)},fan(s,t,e,n,i){t.cyl(.07,.5,7829367,0,3.1);let r=new Xt;r.position.y=2.85;for(let o=0;o<3;o++){let a=new et(new Bt(1.5,.03,.22),Pe(14540253));a.rotation.y=o*Math.PI/1.5,r.add(a)}s.add(r),i.push(o=>{r.rotation.y=o*6})},plant(s,t){t.cyl(.3,.45,11883578,0,.22,0,10,null,.22),t.sph(.5,3120730,0,.95,0),t.sph(.34,4240235,.2,1.25,.1)},menu(s,t,e){let n=Ne(e.text,"#fff3c4");n.scale.set(3.4,.85,1),n.position.set(0,2.2,.05),s.add(n)},bench(s,t,e){let n=e.w||2.4;t.box(n,.1,.55,9067051,0,.45),t.box(n,.5,.08,7029286,0,.8,.3);for(let i of[-1,1])t.box(.1,.45,.5,5978650,i*(n/2-.15),.22)},speaker(s,t,e){let n=e.tall?2.3:1.2;t.box(.9,n,.7,1447450),t.cyl(.28,.06,819,0,n*.3,.37,14).rotation.x=Math.PI/2,t.cyl(.18,.06,819,0,n*.75,.37,12).rotation.x=Math.PI/2},pennants(s,t,e,n){for(let r=0;r<9;r++){let o=-n.w/2+.7+r*(n.w-1.4)/8,a=new et(new vn(.17,.4,3),wn(e.c[r%e.c.length]));a.position.set(o,2.65,0),a.rotation.z=Math.PI,s.add(a)}t.box(n.w-1,.02,.02,3355443,0,2.86,0)},neon(s,t,e,n,i){t.box(4.2,.9,.08,1118481,0,2.2,0);let r=Ne(e.text,e.c||"#ff4fd8");r.scale.set(4.2,1,1),r.position.set(0,2.2,.1),s.add(r);let o=t.box(4.4,.06,.06,0,0,1.7,.05,wn(e.c||"#ff4fd8"));i.push(a=>{o.material.color.set(e.c||"#ff4fd8").multiplyScalar(.6+.4*Math.sin(a*5))})},lamp(s,t,e){t.cyl(.02,1.2,819,0,3);let n=new et(new vn(.55,.4,14,1,!0),new Jt({color:e.c,side:ye}));n.position.y=2.25,s.add(n);let i=new et(new Me(.5,.9,1.4,14,1,!0),new Jt({color:e.c,transparent:!0,opacity:.1,side:ye}));i.position.y=1.4,s.add(i)},rug(s,t,e){t.box(e.w||3,.03,e.d||2,e.c||14263361,0,.02),t.box((e.w||3)-.3,.035,(e.d||2)-.3,0,0,.022,0,Pe(e.c||14263361,{transparent:!0,opacity:.4}))},lift(s,t){for(let e of[-1.5,1.5])t.box(.22,2.6,.3,14711552,e,1.3,0);t.box(3.4,.2,.35,14711552,0,2.55),t.box(2.6,.12,1.6,4475472,0,.65,.7),t.box(.2,.6,.2,9080725,0,.3,.7)},toolwall(s,t){t.box(2.4,1.6,.1,9211795,0,1.6);let e=[14034984,2792847,16032353,4553629,15320170];for(let n=0;n<8;n++)t.box(.07,.5+n%3*.12,.05,e[n%5],-1+n*.28,1.6,.08);t.box(2,.08,.3,1365,0,.9,.1)},tyres(s,t){for(let e=0;e<3;e++){let n=new et(new Fs(.34,.14,8,16),Pe(1710618));n.rotation.x=Math.PI/2,n.position.y=.16+e*.28,s.add(n)}},drum(s,t,e){t.cyl(.38,.95,e.c||3038890,0,.48,0,14),t.cyl(.4,.05,546,0,.8,0,14),t.cyl(.4,.05,546,0,.2,0,14)},hazard(s,t,e){let n=Math.round((e.w||6)/.6);for(let i=0;i<n;i++)t.box(.3,.025,e.d||.8,i%2?16766474:2236962,-(e.w||6)/2+.3+i*.6,.015,0)},bench2(s,t){t.box(.7,.9,2.2,7040885,0,.45),t.box(.8,.07,2.3,14711552,0,.93),t.box(.2,.2,.3,14034984,0,1.05,-.6)},turntable(s,t,e,n,i){let r=t.cyl(1.55,.14,14540253,0,.07,0,28);t.cyl(1.6,.04,12071466,0,.16,0,28,null,1.6).scale.set(1,1,1),i.push(o=>{r.rotation.y=o*.15})},spot(s,t,e){let n=new et(new vn(1,2.6,16,1,!0),new Jt({color:e.c,transparent:!0,opacity:.1,side:ye}));n.position.y=1.6,n.rotation.x=Math.PI,s.add(n)},desk(s,t){t.box(2.4,.95,.8,8083510),t.box(2.5,.07,.9,14205861,0,.98),t.box(.5,.35,.05,546,-.5,1.28,-.1),t.box(.3,.05,.2,12632256,.4,1.03,.1)},stage(s,t,e){t.box(e.w,.35,e.d,2827584,0,.175),t.box(e.w,.04,.06,16732120,0,.37,e.d/2)},rig(s,t,e,n,i){t.box(n.w-1.5,.08,.08,819,0,3.15,-n.d/2+2);let r=e.warm?[16758531,16483584,16765286,15167313]:[16711790,3835647,448160,16760331,8599788,16471559],o=r.map((a,l)=>{let c=new et(new vn(.5,3,12,1,!0),new Jt({color:a,transparent:!0,opacity:.16,side:ye})),u=new Xt;return u.position.set(-(n.w-2.5)/2+l*(n.w-2.5)/(r.length-1),3.1,-n.d/2+2),c.position.y=-1.5,c.rotation.x=Math.PI,u.add(c),s.add(u),u});i.push(a=>o.forEach((l,c)=>{l.rotation.z=Math.sin(a*1.3+c)*.5,l.rotation.x=Math.cos(a*.9+c*1.7)*.45}))},discoball(s,t,e,n,i){let r=new et(new os(.5,1),new Kt({color:14540253,flatShading:!0,emissive:4473958}));r.position.y=2.6,s.add(r),t.cyl(.015,.6,2184,0,3.2),i.push(o=>{r.rotation.y=o*1.2})},bar(s,t,e){let n=e.len||4;t.box(.35,2.4,n,1840144,.1,1.2,0);let i=[15087942,2792847,16032353,9358054,15320170];for(let r=0;r<2;r++){t.box(.3,.05,n-.4,5978650,.28,1.2+r*.55,0);for(let o=0;o<9;o++)t.cyl(.07,.34,i[(o+r)%5],.3,1.4+r*.55,-n/2+.4+o*(n-.8)/8,8)}t.box(.05,.1,n-.3,e.c||16732120,.27,1.05,0,wn(e.c||16732120))},barstool(s,t){t.cyl(.26,.1,12653087,0,.8),t.cyl(.05,.75,3003,0,.4,0,8),t.cyl(.22,.04,1092,0,.04)},sofa(s,t,e){s.rotation.y=(e.rot||0)*-Math.PI/2,t.box(2.2,.5,.9,e.c||10289672,0,.3),t.box(2.2,.6,.25,e.c||10289672,0,.7,.35),t.box(.25,.5,.9,e.c||10289672,-1.05,.55),t.box(.25,.5,.9,e.c||10289672,1.05,.55)},rope(s,t,e){let n=e.w||2.4;for(let i of[-1,1])t.cyl(.05,1,13938487,i*n/2,.5,0,8),t.sph(.09,13938487,i*n/2,1.02,0);t.box(n,.07,.07,10289672,0,.85,0)},ledstrip(s,t,e,n,i){let r=t.box(n.w,.06,.06,0,0,.8,-n.d/2+.16,wn(e.c)),o=t.box(.06,.06,n.d,0,-n.w/2+.16,.8,0,wn(e.c));i.push(a=>{let l=new Mt(e.c).offsetHSL(Math.sin(a*.4)*.12,0,0);r.material.color.copy(l),o.material.color.copy(l)}),s.position.set(0,0,0)},mirror(s,t,e){t.box(1.9,1.7,.06,819,0,1.75);let n=new et(e.oval?new Kr(.85,24):new Ee(1.7,1.5),new Jt({color:13625847}));n.position.set(0,1.75,.04),e.oval&&n.scale.set(.9,1,1),s.add(n),t.box(2,.08,.3,1911,0,.95,.1);for(let i=0;i<3;i++)t.cyl(.05,.22,[15087942,2792847,16032353][i],-.6+i*.6,1.08,.1,8)},poleSign(s,t,e,n,i){let r=t.cyl(.18,1.7,16777215,0,1.2,0,14),o=new Xt;o.position.y=1.2;for(let a=0;a<6;a++){let l=new et(new Me(.19,.19,.16,14),Pe(a%2?14034984:1920728));l.position.y=-.8+a*.28,o.add(l)}s.add(o),t.cyl(.24,.12,2184,0,2.1),i.push(a=>{o.rotation.y=a*2})},dryer(s,t){t.cyl(.07,1,1911,0,.5,0,8),t.box(.7,.35,.7,12105920,0,1.2),t.sph(.42,15046811,0,1.55,0),t.box(.5,.2,.5,13684950,0,.1)}};function zu(s,t,e,n){for(let i of t||[]){let r=dc[i.k];if(!r)continue;let o=new Xt,a=Qe(o);o.position.set(i.x||0,0,i.z||0),(i.k==="lanterns"||i.k==="pennants")&&(o.position.x=0),r(o,a,i,e,n),s.add(o)}}function Bu(s,t,e){let n=Qe(t),i=new Mt(s.color||"#888");if(s.type==="dance"){let r=new et(new Fn(.4,.55,28),new Jt({color:16777215,side:ye,transparent:!0,opacity:.7}));return r.rotation.x=-Math.PI/2,r.position.y=.07,t.add(r),e.push(o=>{r.scale.setScalar(1+.25*Math.sin(o*4))}),!0}if(s.type==="dj"){n.box(3.2,.95,.9,1381658),n.box(3.3,.06,1,2894900,0,.98);let r=[-.9,.9].map(a=>{let l=n.cyl(.34,.04,273,a,1.03,.05,20);return n.cyl(.1,.05,16732120,a,1.05,.05,10),l});n.box(.7,.1,.5,819,0,1.05,.05),n.box(.7,.4,.04,657936,1.2,1.2,-.35).rotation.x=-.2;let o=n.box(3,.1,.03,0,0,.55,.46,wn(16711790));return e.push(a=>{r.forEach(l=>{l.rotation.y=a*3}),o.material.color.setHSL(a*.2%1,1,.55)}),!0}if(s.type==="bar"){n.box(1,1.1,3.8,2825492,0,.55,0),n.box(1.15,.08,3.95,i,0,1.13,0),n.box(.06,.12,3.7,16732120,-.5,.95,0,wn(16732120));for(let r=0;r<4;r++)n.cyl(.07,.2,13625847,.1,1.27,-1.3+r*.85,8);return n.cyl(.04,.3,13421772,.35,1.3,.3,8),!0}if(s.type==="songs"){t.rotation.y=-Math.PI/2,n.box(2.6,2,.12,1053466,0,1.7),n.box(2.4,.3,.14,8072383,0,2.5,.02);let o=[16711790,3835647,448160,16760331,8599788].map((a,l)=>n.box(2,.12,.15,a,0,2.05-l*.28,.02,wn(a)));return e.push(a=>o.forEach((l,c)=>{l.scale.x=.55+.45*Math.abs(Math.sin(a*1.5+c))})),!0}if(s.type==="vip")return n.box(2,.08,1,1710618,0,.5,0),n.cyl(.5,.06,13938487,0,.55,0,16),n.cyl(.06,.5,2184,0,.27),n.box(.2,.3,.2,13625847,.1,.72,.1),n.sph(.12,16765286,-.2,.7,0,wn(16765286)),!0;if(s.type==="style")return n.cyl(.55,.12,819,0,.06,0,18),n.cyl(.1,.5,11184810,0,.35,0,8),n.box(.95,.22,.95,i,0,.7),n.box(.95,1,.2,i,0,1.25,.45),n.box(.36,.22,.2,i,0,1.9,.45),n.box(.12,.2,.8,819,-.55,.95,.05),n.box(.12,.2,.8,819,.55,.95,.05),n.box(.7,.08,.4,2184,0,.3,-.7),!0;if(s.type==="basin"){n.box(1.2,.9,.9,14607078,0,.45,0);let r=n.cyl(.42,.12,16777215,0,.96,0,16);return n.cyl(.04,.4,11184810,0,1.2,-.3,8),n.box(.1,.1,.4,11184810,0,1.38,-.15),n.box(.9,.7,.3,819,0,.75,.95),!0}return!1}var Px=new Jt({color:10475775,transparent:!0,opacity:.8});function Fu(s,t,e,n){let i=t.w*e,r=t.d*e,o=Qe(s),a=7031339;for(let d of t.windows||[]){let f=new Xt,g=Qe(f),x=d.w*e;g.box(x+.2,1.5,.12,16777215,0,1.9,0),g.box(x,1.3,.15,0,0,1.9,0,Px),g.box(.05,1.3,.16,16777215,0,1.9,0),g.box(x,.05,.16,16777215,0,1.9,0),g.box(x+.3,.08,.3,16777215,0,1.12,.08),d.wall==="back"?f.position.set(d.at*e,0,.05):d.wall==="left"?(f.rotation.y=Math.PI/2,f.position.set(.05,0,d.at*e)):(f.rotation.y=Math.PI/2,f.position.set(i,0,d.at*e)),s.add(f)}o.box(.14,.45,r,12432546,i,.22,r/2,Pe(12432546,{transparent:!0,opacity:.55}));let l=t.door.x*e,c=t.door.w*e;o.box(l,.45,.14,12432546,l/2,.22,r,Pe(12432546,{transparent:!0,opacity:.55})),o.box(i-l-c,.45,.14,12432546,l+c+(i-l-c)/2,.22,r,Pe(12432546,{transparent:!0,opacity:.55})),o.box(.14,2.4,.14,a,l,1.2,r),o.box(.14,2.4,.14,a,l+c,1.2,r),o.box(c+.14,.14,.16,a,l+c/2,2.4,r);let u=new Xt;u.position.set(l,0,r);let h=new et(new Bt(c*.92,2.3,.07),Pe(9067051));if(h.position.set(c*.46,1.15,0),u.add(h),u.rotation.y=1,s.add(u),t.corridor){let d=t.corridor.depth*e;o.box(i+.6,.12,d,9276810,i/2,-.06,r+d/2),o.box(i+.6,.5,.14,1911,i/2,.25,r+d);for(let g=0;g<t.corridor.doors;g++){let x=(g+.5)*i/t.corridor.doors;o.box(.9,.04,.6,[12653087,2792847,15320170,4553629][g%4],x,.02,r+d-.5)}let f=Ne("Shared corridor","#d9d9d9");f.scale.set(3.6,.9,1),f.position.set(i/2,1.2,r+d*.55),s.add(f)}if(t.veranda){let d=1.6*e/1.4;o.box(c+2.6,.14,d,13219740,l+c/2,-.05,r+d/2);for(let f of[-1,1])o.cyl(.1,2.5,16117990,l+c/2+f*(c/2+1.1),1.25,r+d-.2,8);o.box(c+2.8,.1,.2,9268815,l+c/2,2.55,r+d-.2)}for(let d of t.fixtures||[]){let f=new Xt,g=Qe(f),x=d.w*e,y=d.d*e;(Lx[d.kind]||(()=>{}))(f,g,x,y,d,n,e),f.position.set(d.x*e,0,d.z*e),s.add(f)}}var Lx={bed(s,t,e,n,i){let r=i.king?1.1:1;t.box(e-.1,.35,n-.1,7029286,e/2,.18,n/2),t.box(e-.3,.25,n-.35,i.king?8072383:4878245,e/2,.5,n/2+.1),t.box(e-.1,1*r,.15,7029286,e/2,.7,.08);for(let o of i.king?[-1,1]:[0])t.box(e*(i.king?.36:.7),.2,.5,16777215,e/2+o*e*.25,.75,.5);t.box(e-.3,.12,n*.5,i.king?13938487:15320170,e/2,.65,n*.65)},wardrobe(s,t,e,n){t.box(e-.1,2.5,n-.1,8014372,e/2,1.25,n/2),t.box(.04,2.3,.05,3810322,e/2,1.25,n-.04);for(let i of[-1,1])t.box(.05,.3,.05,13938487,e/2+i*.15,1.25,n-.02)},curtain(s,t,e){t.box(e-.2,2.2,.06,15167313,e/2,1.3,.12);for(let n=1;n<6;n++)t.box(.03,2.2,.08,12603439,n*(e-.2)/6,1.3,.13);t.box(e,.05,.05,819,e/2,2.45,.1)},bucket(s,t,e,n){t.cyl(.3,.45,2792847,e/2,.22,n/2,12,null,.24),t.cyl(.26,.02,9358054,e/2,.44,n/2,12),t.cyl(.3,.45,15167313,e/2+.5,.22,n/2-.3,12,null,.24)},ensuite(s,t,e,n){t.box(e-.1,.05,n-.1,12109772,e/2,.03,n/2),t.box(.1,2.3,n-.1,14673898,.05,1.15,n/2),t.box(.1,.9,n*.5,14673898,e/2,.45,n-.05),t.box(.55,.4,.7,16777215,e-.6,.2,.6),t.box(.5,.7,.2,16777215,e-.6,.75,.3),t.box(e*.4,.05,.1,9358054,e*.3,2.3,.5),t.cyl(.2,.08,16777215,.45,.9,.35,12),t.box(.5,.8,.4,16777215,.45,.4,.35)},kitchenette(s,t,e,n){t.box(e-.1,.95,n-.1,14209732,e/2,.48,n/2),t.box(e-.05,.07,n-.05,4868682,e/2,.98,n/2);let i=e>=n;t.cyl(.22,.05,12632256,i?e*.3:e/2,1.04,i?n/2:n*.3,12);for(let r of[-1,1])t.cyl(.12,.03,273,i?e*.7+r*.28:e/2+r*.15,1.03,i?n/2:n*.7+r*.28,10);i?t.box(e-.1,.7,.35,9268815,e/2,2,.2):t.box(.35,.7,n-.1,9268815,.2,2,n/2)},partition(s,t,e,n){t.box(e-.05,2.6,n*.4,15326403,e/2,1.3,n*.2)},stairs(s,t,e,n,i){let r=Math.max(6,Math.round(n/.4)),o=e-.1;for(let a=0;a<r;a++){let l=.35*(a+1);t.box(o,l,n/r,i.grand?15854816:12101770,e/2,l/2,n-(a+.5)*n/r)}i.grand&&t.box(o*.5,.05,n-.2,10289672,e/2,.35*r+.03,n/2),t.box(.08,1,n,5978650,.05,.9,n/2),t.box(e,.35*(r+1),.15,1911,e/2,.35*(r+1)/2,.05)},landing(s,t,e,n){t.box(e-.1,.08,n-.1,13482904,e/2,.05,n/2),t.box(.06,.9,n-.1,5978650,e-.08,.5,n/2),t.box(e-.1,.9,.06,5978650,e/2,.5,n-.08);for(let i=0;i<8;i++)t.box(.04,.9,.04,9067051,e-.08,.5,.2+i*(n-.4)/7)},pillar(s,t,e,n){t.cyl(.38,3,16117990,e/2,1.5,n/2,16),t.cyl(.5,.2,14209214,e/2,.1,n/2,16),t.cyl(.5,.2,14209214,e/2,2.9,n/2,16)},bar(s,t,e,n){t.box(e-.1,1.1,n-.1,3876374,e/2,.55,n/2),t.box(e+.1,.08,n,13938487,e/2,1.14,n/2);for(let i=0;i<6;i++)t.cyl(.07,.3,[15087942,2792847,16032353][i%3],e/2,1.3,.5+i*(n-1)/5,8);for(let i=0;i<3;i++)t.cyl(.22,.08,12653087,e+.5,.8,.8+i*1.2,10)},chandelier(s,t,e,n,i,r){let o=new Xt;o.position.set(e/2,3,n/2);let a=new et(new Fs(.6,.05,6,20),new Jt({color:13938487}));a.rotation.x=Math.PI/2,o.add(a);for(let c=0;c<8;c++){let u=c/8*Math.PI*2,h=new et(new an(.09,8,6),new Jt({color:16773560}));h.position.set(Math.cos(u)*.6,0,Math.sin(u)*.6),o.add(h)}let l=new et(new Me(.02,.02,.8),new Jt({color:8947848}));l.position.y=.4,o.add(l),s.add(o),r.push(c=>{o.rotation.y=c*.3,o.position.y=3+Math.sin(c)*.03})}};function Hu(s,t){let e={w:11.4,d:7.2},n=Qe(s),i=new et(new Bt(e.w,.2,e.d),Pe(9277331));i.position.y=-.1,s.add(i);let r=Pe(14472904),o=new et(new Bt(e.w,3.6,.2),r);o.position.set(0,1.8,-e.d/2);let a=new et(new Bt(.2,3.6,e.d),r);a.position.set(-e.w/2,1.8,0),s.add(o,a),n.box(e.w,.4,.22,14711552,0,3.4,-e.d/2+.02),n.box(.22,.4,e.d,14711552,-e.w/2+.02,3.4,0);let l=Qe(s);for(let h=0;h<9;h++)l.box(4.2,.2,.08,h%2?12172482:11185845,-2.4,.15+h*.26,-e.d/2+.14);n.box(2.8,.95,.7,7040885,3.4,.48,-e.d/2+.6),n.box(2.9,.07,.8,14711552,3.4,.98,-e.d/2+.6),n.box(2.6,1.3,.08,9211795,3.4,2,-e.d/2+.16);for(let h=0;h<7;h++)n.box(.07,.5,.05,[14034984,2792847,16032353][h%3],2.4+h*.33,2,-e.d/2+.22);for(let h=0;h<3;h++){let d=-3.5+h*3.5;for(let g of[-1.55,1.55])n.box(.08,.02,4.8,16777215,d+g,.015,.6);n.box(3.1,.02,.08,16777215,d,.015,3);let f=Ne(`SLOT ${h+1}`,"#ffe08a");f.scale.set(2.6,.65,1),f.position.set(d,.1,3),f.material.depthTest=!0,s.add(f)}for(let h=0;h<3;h++){let d=new et(new vn(.3,.35,12,1,!0),new Jt({color:16773560,side:ye}));d.position.set(-3.5+h*3.5,3.2,.5),s.add(d);let f=new et(new Me(.2,1.5,3,14,1,!0),new Jt({color:16773560,transparent:!0,opacity:.06,side:ye}));f.position.set(-3.5+h*3.5,1.7,.5),s.add(f)}let c=new Xt;c.position.set(5,0,2.6),Qe(c),dc.tyres(c,Qe(c),{}),s.add(c);let u=new Xt;return u.position.set(-5,0,2.8),dc.drum(u,Qe(u),{}),s.add(u),e}var Ot=1.4,Vu={tv:2238513,sofa:11883578,fridge:15265522,rug:14263361,plant:3120730,table:10251068,gen:12597547,bed:4878245},ds=(s,t)=>t%2?{w:s.d,d:s.w}:{w:s.w,d:s.d},Gu=(s,t)=>s.x<t.x+t.w&&t.x<s.x+s.w&&s.z<t.z+t.d&&t.z<s.z+s.d,Ro=class{constructor(t){this.g=t,this.el=nt("#interior"),this.open=!1}async show(t,e){let n=this.g,i=await Dt(`/api/property/${t}/interior`).catch(r=>(n.ui.error(r),null));return i?(this.data=i,this.propertyId=t,this.visitor=!!i.visitor,this.catalog=Object.fromEntries((i.catalog||n.cfg.furniture||[]).map(r=>[r.id,r])),this.placed=i.placed.map(r=>({...r})),this.buy=!1,this.sel=null,this.rot=0,this.open=!0,n.busy=!0,n.ctrl.frozen=!0,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),!0):!1}build(){let t=this.data,e=t.room.w,n=t.room.d;this.canvas=p("canvas"),this.el.append(this.canvas),this.r=new xn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new yn,this.scene.background=new Mt(1911589),this.cam=new be(42,1,.1,200),this.yaw=Math.PI/4,this.pitch=.78,this.dist=Math.max(e,n)*Ot*1.7,this.center=new P(e*Ot/2,0,n*Ot/2),this.scene.add(new _n(16777215,8943462,1));let i=new bn(16773328,1.1);i.position.set(6,12,4),this.scene.add(i);let r=new et(new Bt(e*Ot,.2,n*Ot),this.floorMat=new Kt({color:t.floor?.hex||"#b98a56"}));r.position.set(e*Ot/2,-.1,n*Ot/2),this.scene.add(r);let o=new eo(Math.max(e,n)*Ot,Math.max(e,n),9206357,11049072);o.scale.set(e/Math.max(e,n),1,n/Math.max(e,n)),o.position.set(e*Ot/2,.01,n*Ot/2),this.grid=o,this.scene.add(o);let a=this.wallMat=new Kt({color:t.wall?.hex||"#f1e7cf"}),l=new et(new Bt(e*Ot,3.4,.2),a);l.position.set(e*Ot/2,1.7,-.1);let c=new et(new Bt(.2,3.4,n*Ot),a);c.position.set(-.1,1.7,n*Ot/2),this.scene.add(l,c);let u=new et(new Bt(e*Ot,.5,.22),new Kt({color:34641}));u.position.set(e*Ot/2,.25,-.1),this.scene.add(u),this.anim=[],this.t0=performance.now(),Fu(this.scene,t.room,Ot,this.anim);for(let f of t.room.reserved.filter(g=>g.what==="doorway")){let g=new et(new Bt(f.w*Ot-.1,f.what==="bed"?.7:.02,f.d*Ot-.1),new Kt({color:f.what==="bed"?Vu.bed:14866879,transparent:f.what!=="bed",opacity:f.what==="bed"?1:.6}));if(g.position.set((f.x+f.w/2)*Ot,f.what==="bed"?.35:.02,(f.z+f.d/2)*Ot),this.scene.add(g),f.what==="bed"){let x=new et(new Bt(f.w*Ot-.4,.2,.5),new Kt({color:16777215}));x.position.set((f.x+f.w/2)*Ot,.8,(f.z+.4)*Ot),this.scene.add(x)}}let h=t.room.reserved.find(f=>f.what==="doorway"),d=new et(new Bt(h.w*Ot,.04,.12),new Jt({color:16761358}));d.position.set((h.x+h.w/2)*Ot,.05,n*Ot),this.scene.add(d),this.items=new Xt,this.scene.add(this.items),this.ghost=new et(new Bt(1,1,1),new Jt({color:3523691,transparent:!0,opacity:.55})),this.ghost.visible=!1,this.scene.add(this.ghost),this.rebuildItems(),this.bindInput(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}meshFor(t,e){let n=this.catalog[t],i=ds(n,e),r={tv:1.1,sofa:.9,fridge:2,rug:.04,plant:1.2,table:.8,gen:.8}[t]||1,o=new Xt,a=new et(new Bt(i.w*Ot-.12,r,i.d*Ot-.12),new Kt({color:Vu[t]||10066329}));if(a.position.y=r/2,o.add(a),t==="sofa"){let l=new et(new Bt(e%2?.3:i.w*Ot-.12,.7,e%2?i.d*Ot-.12:.3),new Kt({color:9321767}));l.position.set(e===1?-(i.w*Ot/2-.2):e===3?i.w*Ot/2-.2:0,1,e===0?-(i.d*Ot/2-.2):e===2?i.d*Ot/2-.2:0),o.add(l)}if(t==="tv"){let l=new et(new Bt(i.w*Ot-.3,r-.3,i.d*Ot-.3),new Jt({color:3501245}));l.position.y=r/2+.05,l.scale.multiplyScalar(.98),o.add(l),a.scale.set(1,.9,1)}if(t==="plant"){let l=new et(new an(.5,10,8),new Kt({color:3523691}));l.position.y=1.45,o.add(l),a.scale.set(.5,.6,.5),a.position.y=.3}return o.position.set(0,0,0),o}rebuildItems(){this.items.clear(),this.meshes={};for(let t of this.placed)this.sel&&this.sel.id===t.id&&this.sel.fromPlaced||this.addItem(t)}addItem(t){let e=ds(this.catalog[t.id],t.rot),n=this.meshFor(t.id,t.rot);n.position.set((t.x+e.w/2)*Ot,0,(t.z+e.d/2)*Ot),n.userData={id:t.id},this.items.add(n),this.meshes[t.id]=n}canPlace(t,e,n,i){let r=this.data,o=this.catalog[t],a=ds(o,i),l={x:e,z:n,w:a.w,d:a.d};if(e<0||n<0||e+a.w>r.room.w||n+a.d>r.room.d)return!1;for(let c of r.room.reserved)if(Gu(l,c))return!1;for(let c of this.placed){if(c.id===t)continue;let u=this.catalog[c.id];if(u.layer==="floor"==(o.layer==="floor")){let h=ds(u,c.rot);if(Gu(l,{x:c.x,z:c.z,w:h.w,d:h.d}))return!1}}return!0}chrome(){let t=this.data,e=this.g.ui;this.guestsEl=p("div",{class:"iguests"}),this.feed=p("div",{class:"ifeed"}),this.lastEvent=0;let n=p("div",{class:"ihead"},p("div",{},p("h3",{},this.visitor?`@${t.owner}'s ${t.name}`:t.name),p("div",{style:"font-size:13px"},`${t.tierLabel} \xB7 ${t.area} \xB7 \u2764\uFE0F `,p("span",{id:"loveCount"},t.loves||0)),this.guestsEl),p("div",{class:"row"},this.visitor?"":p("button",{class:"btn small",id:"paintBtn",onclick:()=>this.paintPanel()},"\u{1F3A8} Paint"),this.visitor?"":p("button",{class:"btn small alt",id:"buyToggle",onclick:()=>this.toggleBuy()},"\u{1F6CB} Buy mode"),p("button",{class:"btn small red",id:"interiorLeave",onclick:()=>this.leave()},"Leave")));this.tool=p("div",{class:"itool hidden"});let i=p("div",{class:"iacts"},...(this.visitor?[["love","\u{1F60D} Love your house"],["greet","\u{1F44B} Greet"],["hype","\u{1F525} Hype"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]:[["greet","\u{1F44B} Greet"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]).map(([a,l])=>p("button",{class:"btn small ghost","data-act":a,onclick:()=>this.act(a)},l))),r=p("input",{class:"sheet-input",id:"roomSay",maxlength:120,placeholder:"Say something nice\u2026",onkeydown:a=>{a.key==="Enter"&&this.say(r),a.stopPropagation()}}),o=p("div",{class:"ibar"},this.feed,i,p("div",{class:"row"},r,p("button",{class:"btn small",onclick:()=>this.say(r)},"Send")));this.paint=p("div",{class:"ipaint hidden"}),this.el.append(n,this.tool,this.paint,o),this.startPoll()}startPoll(){clearInterval(this.pt);let t=async()=>{if(!this.open)return;let e=await Dt(`/api/room?propertyId=${this.propertyId}&since=${this.lastEvent}`).catch(n=>n);if(e instanceof Error){e.status===403&&this.visitor&&(this.g.ui.toast("The host asked you to step out. No wahala."),this.leave());return}this.room=e,this.drawRoom(e)};t(),this.pt=setInterval(t,2500)}drawRoom(t){if(nt("#loveCount")&&(nt("#loveCount").textContent=t.loves),this.guestsEl.replaceChildren(p("small",{},t.isOwner?t.guests.length?"Guests: ":"No guests right now":`Host ${t.ownerHome?"\u{1F7E2} home":"\u26AA out"} \xB7 guests: `),...t.guests.map(i=>p("span",{class:"gchip"},"@"+i,t.isOwner?p("button",{title:"Ask to leave",onclick:()=>this.kick(i)},"\u2715"):p("button",{title:"Mute or report",onclick:()=>this.g.ui.playerMenu(i)},"\u22EF")))),!t.isOwner){let i=this.el.querySelector("[data-act=love]");i&&(i.disabled=t.lovedToday)}let e=this.el.querySelector("[data-act=sofa]"),n=this.el.querySelector("[data-act=tv]");e&&(e.disabled=!t.can.sofa),n&&(n.disabled=!t.can.tv),(t.wall.hex!==this.data.wall?.hex||t.floor.hex!==this.data.floor?.hex)&&(this.data.wall=t.wall,this.data.floor=t.floor,this.wallMat.color.set(t.wall.hex),this.floorMat.color.set(t.floor.hex));for(let i of t.events){if(i.id<=this.lastEvent)continue;this.lastEvent=i.id;let r=p("div",{class:`ev ${i.kind}`,onclick:()=>i.kind==="say"&&i.u!==this.g.user.username&&this.g.ui.playerMenu(i.u)},i.kind==="say"?`${i.u}: ${i.t}`:i.t);for(this.feed.append(r);this.feed.children.length>6;)this.feed.firstChild.remove()}}async act(t){let e=this.g.ui;t==="love"?await e.guard(()=>at("/api/visit/love",{propertyId:this.propertyId}))&&(e.toast("You showed some love \u{1F60D}"),this.g.refreshMe()):await e.guard(()=>at("/api/visit/act",{propertyId:this.propertyId,action:t}))&&this.g.refreshMe(),this.startPoll()}async say(t){let e=t.value.trim();if(!e)return;await this.g.ui.guard(()=>at("/api/room/say",{propertyId:this.propertyId,text:e}))&&(t.value="",this.startPoll())}async kick(t){await this.g.ui.guard(()=>at("/api/visit/kick",{propertyId:this.propertyId,username:t}))&&(this.g.ui.toast(`@${t} was asked to leave.`),this.startPoll())}paintPanel(){let t=this.data.palette;if(!t)return;let e=this.paint;if(!e.classList.contains("hidden"))return e.classList.add("hidden");let n=this.data.wall?.id,i=this.data.floor?.id,r=()=>{let o=(a,l,c)=>p("div",{class:"swatches"},a.map(u=>p("button",{class:`sw ${u.id===l?"on":""}`,title:u.name,"data-colour":u.id,style:`background:${u.hex}`,onclick:()=>{c(u.id),r()}})));e.replaceChildren(p("div",{class:"row sp"},p("b",{},"\u{1F3A8} Paint and floor"),p("button",{class:"btn small ghost",onclick:()=>e.classList.add("hidden")},"\u2715")),p("small",{},"Walls"),o(t.walls,n,a=>{n=a,this.preview(n,i)}),p("small",{},"Floor"),o(t.floors,i,a=>{i=a,this.preview(n,i)}),p("button",{class:"btn alt",id:"paintApply",onclick:async()=>{let a=await this.g.ui.guard(()=>at("/api/property/decor",{propertyId:this.propertyId,wall:n,floor:i,idemKey:crypto.randomUUID?.()}));a&&(this.data.wall=a.wall,this.data.floor=a.floor,this.preview(a.wall.id,a.floor.id),this.g.ui.toast(a.charged?`Fresh look! \u2212${pt(a.charged)}`:"Already looks like that.","money"),this.g.refreshMe(),e.classList.add("hidden"))}},`Apply \xB7 ${pt(t.price)}`))};r(),e.classList.remove("hidden")}preview(t,e){let n=this.data.palette,i=n.walls.find(o=>o.id===t),r=n.floors.find(o=>o.id===e);i&&this.wallMat.color.set(i.hex),r&&this.floorMat.color.set(r.hex)}toggleBuy(t=!this.buy){this.buy=t,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),nt("#buyToggle").textContent=t?"\u2705 Done":"\u{1F6CB} Buy mode",this.tool.classList.toggle("hidden",!t),t&&this.drawTool()}drawTool(){let t=this.sel,e=Object.values(this.catalog),n=new Set(this.placed.map(r=>r.id)),i=[];if(t){let r=this.catalog[t.id];i.push(p("div",{class:"row sp"},p("b",{},`${r.name} (${r.w}\xD7${r.d})`),p("span",{class:"mut"},"Tap the floor to place \xB7 R to rotate")),p("div",{class:"row"},p("button",{class:"btn small",onclick:()=>{this.rot=(this.rot+1)%4,this.drawTool()}},"\u27F3 Rotate"),t.fromPlaced?p("button",{class:"btn small red",onclick:()=>this.sell(t.id)},`Sell +${pt(Math.floor(r.price*(this.data.sellFraction||.5)))}`):p("span",{class:"tag amber"},`Costs ${pt(r.price)}`),p("button",{class:"btn small ghost",onclick:()=>{this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool()}},"Cancel")))}i.push(p("div",{class:"cat"},e.map(r=>p("button",{class:`${t?.id===r.id?"on":""} ${n.has(r.id)?"own":""}`,onclick:()=>{let o=this.placed.find(a=>a.id===r.id);this.sel={id:r.id,fromPlaced:!!o},this.rot=o?o.rot:0,this.rebuildItems(),this.drawTool()}},`${r.name}`,p("div",{class:"mut"},n.has(r.id)?"placed \xB7 tap to move":`${pt(r.price)} \xB7 ${r.w}\xD7${r.d}`))))),this.tool.replaceChildren(...i)}async place(t,e){let n=this.sel;if(!n)return;if(!this.canPlace(n.id,t,e,this.rot)){this.g.ui.toast(Fe("blocked"),"bad");return}let i=await this.g.ui.guard(()=>at("/api/property/furniture",{itemId:n.id,x:t,z:e,rot:this.rot,idem:crypto.randomUUID?.()||String(Math.random())}));i&&(this.g.update(i.user),this.placed=i.interior.placed,this.data={...this.data,...i.interior,visitor:!1},this.g.ui.sfx("thunk"),this.g.ui.haptic(20),i.charged&&this.g.ui.toast(Fe("bought",i.charged),"money"),this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool())}async sell(t){let e=await this.g.ui.guard(()=>at("/api/property/furniture/sell",{itemId:t}));e&&(this.g.update(e.user),this.placed=e.interior.placed,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.g.ui.toast(Fe("sold",e.refund),"money"),this.drawTool())}cellAt(t){let e=this.canvas.getBoundingClientRect(),n=new ct((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new ii;i.setFromCamera(n,this.cam);let r=-i.ray.origin.y/i.ray.direction.y;if(!(r>0))return null;let o=i.ray.origin.clone().addScaledVector(i.ray.direction,r);return{x:o.x/Ot,z:o.z/Ot}}updateGhost(t){if(!this.sel)return;let e=this.cellAt(t);if(!e)return;let n=ds(this.catalog[this.sel.id],this.rot),i=Math.round(e.x-n.w/2),r=Math.round(e.z-n.d/2);this.hover={x:i,z:r};let o=this.canPlace(this.sel.id,i,r,this.rot);this.ghost.visible=!0,this.ghost.scale.set(n.w*Ot-.1,.9,n.d*Ot-.1),this.ghost.position.set((i+n.w/2)*Ot,.45,(r+n.d/2)*Ot),this.ghost.material.color.setHex(o?3523691:14696751)}bindInput(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,y:n.clientY,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x,r=n.clientY-t.y;t.x=n.clientX,t.y=n.clientY,t.moved+=Math.abs(i)+Math.abs(r),(!this.sel||t.moved>14)&&(this.yaw=Math.max(Math.PI/4-.8,Math.min(Math.PI/4+.8,this.yaw-i*.006)),this.pitch=Math.max(.5,Math.min(1.2,this.pitch+r*.004)))}this.buy&&this.updateGhost(n)}),e.addEventListener("pointerup",n=>{if(t&&t.moved<8&&this.buy)if(this.sel)this.updateGhost(n),this.hover&&this.place(this.hover.x,this.hover.z);else{let i=this.cellAt(n);if(i){let r=this.placed.find(o=>{let a=ds(this.catalog[o.id],o.rot);return i.x>=o.x&&i.x<o.x+a.w&&i.z>=o.z&&i.z<o.z+a.d});r&&(this.sel={id:r.id,fromPlaced:!0},this.rot=r.rot,this.rebuildItems(),this.drawTool())}}t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(6,Math.min(40,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{if(!this.open)return;let i=n.key.toLowerCase();i==="r"&&this.sel?(this.rot=(this.rot+1)%4,this.drawTool()):(i==="delete"||i==="backspace")&&this.sel?.fromPlaced?this.sell(this.sel.id):i==="escape"?this.leave():i==="b"&&!this.visitor&&this.toggleBuy()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){if(!this.open)return;let t=this.center;this.cam.position.set(t.x+Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,t.z+Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(t.x,.4,t.z);{let e=(performance.now()-this.t0)/1e3;for(let n of this.anim||[])n(e)}this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}async leave(){this.open&&(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,await at("/api/property/leave").catch(()=>{}),this.g.net.nudge(),nt("#game").focus())}};var Gs={circle:["\u25CF","#d6402f"],triangle:["\u25B2","#2e7dd1"],cross:["\u271A","#2e9b5e"],square:["\u25A0","#8a5ad1"],star:["\u2605","#e0a020"],whot:["W","#222"]},Dx=s=>{let t=7;for(let e of String(s))t=t*31+e.charCodeAt(0)>>>0;return t},Wu={dance:"\u{1F483}",dj:"\u{1F3A7}",bar:"\u{1F964}",songs:"\u{1F3B5}",vip:"\u{1F451}",style:"\u2702\uFE0F",basin:"\u{1F6BF}",eat:"\u{1F372}",game:"\u{1F3B2}",board:"\u{1F3C6}",poster:"\u{1F4DC}",tv:"\u{1F4FA}",car:"\u{1F697}",check:"\u{1F50D}",service:"\u{1F527}"},Ux={whot:"Whot",ludo:"Ludo",dominoes:"Dominoes",draughts:"Draughts",ayo:"Ayo"},Co=class{constructor(t){this.g=t,this.el=nt("#venue"),this.open=!1,this.shotId=null}async show(t){let e=this.g,n=await e.ui.guard(()=>at("/api/venue/enter",{venueId:t,pos:e.pos()}));return n?(this.data=n,this.id=t,this.open=!0,e.busy=!0,e.ctrl.frozen=!0,this.matchId=null,this.match=null,this.dismissed=this.dismissed||new Set,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),this.poll(),!0):!1}build(){let t=this.data,e=t.room;this.canvas=p("canvas"),this.el.append(this.canvas),this.r=new xn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new yn,this.scene.background=new Mt(1911589),this.cam=new be(42,1,.1,100),this.yaw=Math.PI/5,this.pitch=.82,this.dist=15,this.hemi=new _n(16777215,8943462,1);let n=this.sun=new bn(16773328,1);n.position.set(5,10,6),this.scene.add(this.hemi,n),this.anim=[],this.t0=performance.now(),this.lights={hemi:this.hemi,sun:this.sun},Ou(this.scene,e,t.room,t.sign,this.anim,this.lights);let i=new Xt;this.scene.add(i),zu(i,t.room?.decor,e,this.anim),this.stations=new Xt,this.scene.add(this.stations),this.people=new Xt,this.scene.add(this.people),this.meshes={};for(let r of t.stations)this.addStation(r);this.bind(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}addStation(t){let e=new Xt,n=new Mt(t.color||"#888"),i=a=>new Kt({color:a}),r=(a,l,c,u,h)=>{let d=new et(new Bt(a,l,c),i(u));return d.position.y=h??l/2,e.add(d),d};if(!Bu(t,e,this.anim)){if(t.type==="eat")r(3.4,1,.9,n),r(3.5,.12,1,15909198,1.05);else if(t.type==="game"){let a=new et(new Me(.95,.95,.12,20),i(n));a.position.y=.8,e.add(a);let l=new et(new Me(.12,.2,.8,8),i(4862752));if(l.position.y=.4,e.add(l),t.game==="ludo")r(1.5,.1,1.5,16446950,.91),[14041135,3054430,14721056,3046865].forEach((c,u)=>{let h=r(.6,.05,.6,c,.97);h.position.x=(u%2?1:-1)*.45,h.position.z=(u<2?-1:1)*.45});else for(let c=0;c<4;c++){let u=r(.34,.03,.5,[14041135,3046865,14721056,3054430][c],.88);u.position.x=-.5+c*.33,u.rotation.y=.2*c-.3}for(let c of[-1.25,1.25]){let u=new et(new Me(.28,.28,.5,10),i(3352862));u.position.set(c,.25,0),e.add(u)}}else if(t.type==="board")r(2.4,1.5,.12,n,1.6).position.z=-.1,r(2.2,1.3,.14,998183,1.6).position.z=-.08;else if(t.type==="poster")r(.1,1.4,1.2,n,1.6);else if(t.type==="tv")r(2.8,1.5,.2,1381653,1.8),r(2.6,1.3,.22,2778565,1.8),r(3,.5,.8,7031339,.25);else if(t.type==="check"){let a=ri(t.color||"#3a7ca5");a.scale.setScalar(.34),a.position.y=.55,e.add(a),r(2,.5,1.1,5593696,.25),r(.2,.4,.2,14721056,.7).position.x=1.15}else if(t.type==="service"){r(2,.9,.7,7040885,.45),r(1.7,.08,.6,14711552,.94);for(let a=0;a<3;a++)r(.25,.25,.25,[14041135,3046865,14721056][a],1.1).position.x=-.6+a*.6}else if(t.type==="car"){let a=ri(t.color||"#888");a.scale.setScalar(.38),a.rotation.y=Math.PI/6,e.add(a),r(1.8,.06,1,14540253,.03)}}let o=Ne(`${Wu[t.type]||""} ${t.label}`.slice(0,26),"#fff3c4");o.scale.set(2.8,.7,1),o.position.y=t.type==="dj"?2.3:t.type==="songs"?3.3:t.type==="dance"?1.2:t.type==="style"?2.5:t.type==="car"?1.8:t.type==="tv"?3:t.type==="board"?2.8:2.1,e.add(o),e.position.set(t.x,0,t.z),t.type==="poster"&&(e.rotation.y=0),e.traverse(a=>{a.userData.stationId=t.id}),this.stations.add(e),this.meshes[t.id]=e}people_refresh(){this.people.clear();let t=this.data,e=new Set,n=(i,r,o,a)=>{if(e.has(i))return;e.add(i);let l=Vs(r||"#2e9b5e");l.scale.setScalar(.55),l.position.set(o,0,a);let c=Ne("@"+i,"#ffffff");c.scale.set(1.6,.4,1),c.position.y=2.2,l.add(c),this.people.add(l)};for(let i of t.stations)i.type==="game"&&i.match&&i.match.players.forEach((o,a)=>n(o,null,i.x+[-1.25,1.25,-.5,.5][a],i.z+(a<2?.5:1.5)));for(let i of t.occupants){let r=Dx(i.username);n(i.username,i.color,-3+r%7*1,t.room.d/2-1.1-(r>>4)%2*.8)}}chrome(){let t=this.data;this.strip=p("div",{class:"vstrip"}),this.panel=p("div",{class:"vpanel hidden"});let e=p("div",{class:"ihead"},p("div",{},p("h3",{},t.name),p("div",{style:"font-size:13px"},`${t.blurb} \xB7 open ${t.hours[0]}:00 to ${t.hours[1]}:00`),p("div",{class:"tag amber",style:"display:inline-block;margin-top:4px"},"\u{1F3B2} Game money only \xB7 18+")),p("div",{class:"row"},p("button",{class:"btn small red",id:"venueLeave",onclick:()=>this.leave()},"Leave")));this.el.append(e,this.strip,this.panel),this.drawStrip(),this.people_refresh()}drawStrip(){let t=this.data;this.strip.replaceChildren(...t.stations.map(e=>{let n=e.match,i=e.type==="game"?n?n.status==="waiting"?`waiting ${n.players.length}/${n.max}: @${n.host}${n.stake?" \xB7 \u20A6"+n.stake:""}`:n.players.join(" v "):"free table":e.type==="car"?pt(e.price||0)+" (est.)":"";return p("button",{class:`vst ${n?.you?"mine":""}`,"data-station":e.id,onclick:()=>this.pick(e.id)},`${Wu[e.type]||"\u2022"} ${e.label}`,i?p("small",{},i):"")}))}price(t){return this.g.cfg.cars?.[t]?.price??this.catalog?.find(e=>e.id===t)?.price??0}async pick(t){await this.refreshVenue();let e=this.data.stations.find(n=>n.id===t);e&&this.station(e)}async station(t){let e=this.g.ui;if(t.type==="eat"){let n=p("div");e.openSheet(t.label,n),e.shopBlock(n,t.shopId)}else if(t.type==="poster")e.openSheet(t.label,[p("p",{},t.text),p("p",{class:"mut"},"Reports, mutes and blocks work here too: tap a name in the chat.")]);else if(t.type==="tv"){let n=await e.guard(()=>at("/api/venue/act",{venueId:this.id,stationId:t.id}));n&&(e.toast(n.text),this.g.net.nudge())}else t.type==="board"?this.board():t.type==="car"?this.carSheet(t):t.type==="check"||t.type==="service"?this.mechanicSheet(t):t.type==="casual"?e.playCasual(t.game):["dance","dj","bar","songs","vip","basin"].includes(t.type)?this.leisureAct(t):t.type==="style"?this.salonSheet(t):t.type==="game"&&this.sitPanel(t)}async board(t="all"){let e=this.g.ui,n=await e.guard(()=>Dt("/api/scoreboard"+(t==="all"?"":`?kind=${t}`)));if(!n)return;let i=Math.max(0,n.endsAt-this.g.serverNow()),r=p("div",{class:"chips"},["all","whot","ludo","dominoes","draughts","ayo"].map(o=>p("button",{class:`chip ${o===t?"on":""}`,onclick:()=>this.board(o)},o==="all"?"All games":Ux[o])));e.openSheet("Weekly scoreboard",[r,n.rows.length?p("div",{class:"list"},n.rows.map(o=>p("div",{},p("span",{},`${o.rank}. @${o.username}`),p("span",{class:"mut"},`${o.wins}W ${o.draws}D ${o.losses}L \xB7 `),p("b",{},`${o.points} pts`)))):p("p",{class:"mut"},"Nobody has played this week yet. Be the first!"),p("p",{class:"mut"},`${n.scoring} Resets in ${Math.floor(i/864e5)}d ${Math.floor(i%864e5/36e5)}h.`)])}async leisureAct(t){let e=this.g.ui,n=await e.guard(()=>at("/api/venue/act",{venueId:this.id,stationId:t.id,idem:`${t.id}${Date.now()}`}));if(n){if(t.type==="songs"){e.openSheet("Song slot board",[p("p",{},"\u{1F3B5} Tonight\u2019s lineup"),p("div",{class:"list",id:"songSlots"},n.slots.map(i=>p("div",{},p("span",{},`Slot ${i.slot}`),p("span",{class:"mut"},i.title)))),p("p",{class:"mut"},n.note)]);return}e.toast(n.text),n.mood!=null&&this.g.refreshMe?.(),this.g.net.nudge()}}async salonSheet(t){let e=this.g.ui,n=await e.guard(()=>Dt(`/api/salon?venueId=${this.id}`));if(!n)return;let i=n.styles.map(r=>p("button",{class:"btn alt","data-style":r.id,onclick:async()=>{let o=await e.guard(()=>at("/api/salon/style",{venueId:this.id,stationId:t.id,styleId:r.id,idem:`${r.id}${Date.now()}`}));o&&(e.toast(o.text),e.closeSheet(),this.g.net.nudge())}},`${r.name} \xB7 ${pt(r.fee)} \xB7 +${r.mood} mood`));e.openSheet(t.label,[p("p",{},n.current?`Your look: ${n.current.name}${n.current.fresh?" \u2728 fresh":""}`:"Pick a style. A fresh look gives a small mood boost."),p("div",{class:"col"},i),p("p",{class:"mut"},n.note)])}async mechanicSheet(t){let e=this.g.ui,n=await e.guard(()=>Dt("/api/mechanic"));if(!n)return;let i=l=>p("div",{class:"cbar"},p("i",{style:`width:${l}%`})),r=n.cars.length?p("div",{class:"list"},n.cars.map(l=>p("div",{"data-car":l.id},p("span",{},`${l.active?"\u2705 ":""}${l.name}`,p("small",{class:"mut"},` \xB7 ${l.label}${l.perkUntil?" \xB7 perk on":""}`)),p("span",{style:"min-width:90px"},i(l.condition),p("small",{class:"mut"},` ${l.condition}%`))))):p("p",{class:"mut"},"Your garage is empty. Meco only works on cars you own.");if(t.type==="check"){e.openSheet("Check my car",[p("p",{},n.text),r,p("p",{class:"mut"},`Condition drops a little each day. Below ${n.roughBelow}% a car is rough and rides give less mood. Service fee: ${pt(n.fee)} (ESTIMATE).`)]);return}let o=n.active,a=!!o?.perkUntil;e.openSheet("Service",[p("div",{class:"tag amber"},"Placeholder fee \xB7 ESTIMATE"),o?p("p",{},`${o.name}: ${o.label} (${o.condition}%)`):p("p",{class:"mut"},"You need your own active car. Borrowed cars are not serviced here."),p("p",{class:"mut"},`Service resets condition and gives about ${n.perk.minutes} minutes of cheaper fuel (${n.perk.farePctOff}% off) and +${n.perk.extraMood} mood on rides.`),p("button",{class:"btn big alt",id:"mecoService",disabled:!o||a,onclick:async()=>{let l=await e.guard(()=>at("/api/mechanic/service",{idemKey:crypto.randomUUID?.()}));l&&(e.closeSheet(),e.toast(l.text,"money"),this.g.refreshMe?.())}},a?"Already serviced":`Service \xB7 ${pt(n.fee)}`)])}async carSheet(t){let e=this.g.ui,n=await e.guard(()=>Dt("/api/garage"));if(!n)return;this.catalog=n.catalogue;let i=n.catalogue.find(l=>l.id===t.model),r=n.active,o=n.cars.some(l=>l.model===t.model),a=(l,c)=>p("div",{class:"row sp"},p("span",{class:"mut"},l),p("b",{},c));e.openSheet(i.name,[p("div",{class:"tag amber"},"Placeholder model \xB7 price is an ESTIMATE"),a("Price",pt(i.price)),a("Fuel per 100 m","\u20A6"+(i.perM*100).toFixed(0)+` (borrowed: \u20A6${(n.borrowed.perM*100).toFixed(0)} + \u20A6${n.borrowed.base} tip)`),a("Speed",`${i.speed} (borrowed ${n.borrowed.speed})`),a("Mood on a nice ride",`+${i.mood}`),a("Resale",`about ${Math.round((1-n.resale.firstDriveOffFraction)*100)}% right after purchase, then about ${Math.round(n.resale.perDayDepreciation*100)}% less per day (never below ${Math.round(n.resale.floorFraction*100)}%)`),a("Your car now",r.label),p("button",{class:"btn big alt",disabled:n.cars.length>=n.slots,onclick:async()=>{await e.guard(()=>at("/api/garage/buy",{model:i.id,idemKey:crypto.randomUUID?.()}))&&(e.closeSheet(),e.toast(`Congrats! ${i.name} is in your garage \u{1F697}`,"money"),this.g.refreshMe?.())}},o?"Buy another":`Buy \xB7 ${pt(i.price)}`),n.cars.length>=n.slots?p("p",{class:"mut"},"Garage full: sell a car in Phone \u2192 Garage."):""])}sitPanel(t){let e=this.data.stakes,n=0,i=t.match,r=this.g.cfg,o={ludo:"Ludo table (2 to 4 players)",dominoes:"Dominoes table (2 to 4 players)",draughts:"Draughts board (2 players)",ayo:"Ayo board (2 players)",whot:"Whot bench"}[t.game]||"Table",a=[p("div",{class:"row sp"},p("b",{},`${t.label}`),p("button",{class:"btn small ghost",onclick:()=>this.panel.classList.add("hidden")},"\u2715"))];if(i&&i.you){this.focusMatch(i.id);return}if(i&&i.status==="active")a.push(p("p",{class:"mut"},`Game in progress: ${i.players.map(l=>"@"+l).join(", ")}. Try another table.`));else if(i)a.push(p("p",{},`${i.players.map(l=>"@"+l).join(", ")} ${i.players.length>1?"are":"is"} waiting (${i.players.length}/${i.max}).`),p("p",{class:"mut"},i.stake?`Stake \u20A6${i.stake} each (game money). Winner takes the whole pot.`:"Friendly game: no stake."),p("button",{class:"btn big alt",onclick:()=>this.sit(t,0)},i.stake?`Join \xB7 stake ${pt(i.stake)}`:"Join the game"));else{let l=()=>c.replaceChildren(...e.map(h=>p("button",{class:`chip ${h===n?"on":""}`,onclick:()=>{n=h,l(),u.textContent=h?`Sit and wait \xB7 stake ${pt(h)}`:"Sit and wait \xB7 friendly"}},h?pt(h):"Friendly"))),c=p("div",{class:"chips"}),u=p("button",{class:"btn big alt",onclick:()=>this.sit(t,n)},"Sit and wait \xB7 friendly");l(),a.push(p("p",{class:"mut"},`${o}: sit down and wait for others to join (Ludo and Dominoes: host starts when 2 to 4 are seated). Pick a stake (game money, held safely until the game ends).`),c,u)}a.push(p("p",{class:"mut"},"\u{1F3B2} Game money only. No cash value, no cash-out.")),this.showPanel(a)}showPanel(t){this.panel.replaceChildren(...[].concat(t)),this.panel.classList.remove("hidden")}async sit(t,e){let n=await this.g.ui.guard(()=>at("/api/game/sit",{venueId:this.id,stationId:t.id,stake:e}));n&&(this.focusMatch(n.id,n),this.g.net.nudge())}focusMatch(t,e){this.matchId=t,e?this.renderMatch(e):this.pollGame()}async pollGame(){if(!this.matchId)return;let t=await Dt(`/api/game?id=${this.matchId}`).catch(()=>null);t&&this.renderMatch(t)}renderMatch(t){if(this.match=t,this.dismissed.has(t.id))return;this.matchId=t.id;let e=this.g.user?.username,n=[],i=p("div",{class:"row sp"},p("b",{},`${t.label} \xB7 ${t.players.map(r=>r.name).join(", ")}`),p("span",{class:"tag amber"},t.stake?`Stake ${pt(t.stake)} \xB7 pot ${pt(t.pot)}`:"Friendly"));if(n.push(i),t.status==="waiting")n.push(p("p",{},`Seated ${t.players.length}/${t.max} \xB7 waiting for players\u2026 \u23F3`),p("div",{class:"row"},t.players.map(r=>p("span",{class:"tag"},"@"+r.name))),p("p",{class:"mut"},"Your stake is held safely and comes back if nobody joins."),t.canStart?p("button",{class:"btn big alt",id:"ludoStart",onclick:()=>this.startMatch(t)},`\u25B6 Start now with ${t.players.length} players`):t.max>2&&t.isHost?p("p",{class:"mut"},"Need at least 2 players to start."):"",p("button",{class:"btn ghost",onclick:()=>this.leaveMatch(t)},"Leave the table"));else if(t.status==="active"){let r=t.board?.mine,o=Math.max(0,Math.ceil((t.deadlineAt-this.g.serverNow())/1e3));n.push(p("div",{class:"row sp"},p("span",{class:r?"tag green":"tag"},r?"\u{1F7E2} Your turn":`\u23F3 @${t.turn}'s turn`),p("span",{class:"mut",id:"gtimer"},`${o}s`))),n.push(({ludo:()=>this.ludoBoard(t),dominoes:()=>this.dominoBoard(t),draughts:()=>this.draughtsBoard(t),ayo:()=>this.ayoBoard(t)}[t.kind]||(()=>this.whotBoard(t)))()),n.push(p("div",{class:"row"},p("button",{class:"btn small ghost",onclick:()=>this.g.ui.confirm?.call(this.g.ui,t.kind==="ludo"||t.kind==="dominoes"?"Leave this game? You are out and your stake stays in the pot.":"Resign this game? Your opponent wins the pot.",()=>this.leaveMatch(t))},"\u{1F3F3} Resign")))}else{let r=t.result||{};n.push(p("div",{class:`banner ${r.youWon?"win":r.draw?"draw":"lose"}`},r.cancelled?`Table closed. ${r.why||""}`:r.draw?"\u{1F91D} Draw":r.youWon?`\u{1F3C6} You won! ${t.stake?"+"+pt(t.pot):""}`:`You lost. ${r.why||""}`),p("button",{class:"btn alt",onclick:()=>{this.dismissed.add(t.id),this.matchId=null,this.panel.classList.add("hidden"),this.g.net.nudge(),this.refreshVenue()}},"Back to the room")),this.g.refreshMe?.()}n.push(p("p",{class:"mut"},"\u{1F3B2} Game money only.")),this.showPanel(n)}card(t,{onclick:e,disabled:n,mini:i}={}){let[r,o]=Gs[t.s];return p("button",{class:`wcard ${i?"mini":""}`,"data-card":t.id,disabled:!!n,style:`--c:${o}`,onclick:e},p("span",{class:"n"},t.s==="whot"?"20":t.n),p("span",{class:"g"},r))}whotBoard(t){let e=t.board,n=p("div",{class:"whot"}),i=p("div",{class:"row"},p("div",{},p("small",{class:"mut"},"Top card"),this.card(e.top,{disabled:!0})),p("div",{},p("small",{class:"mut"},"Shape to match"),p("div",{class:"shape",style:`color:${Gs[e.shape][1]}`},Gs[e.shape][0])),p("div",{class:"mut"},`Opponent: ${e.oppCount} cards`,p("br"),`Market: ${e.market}`),e.last?p("div",{class:"mut"},this.lastText(t)):""),r=p("div",{class:"hand"},e.hand.map(a=>this.card(a,{disabled:!e.mine||!e.playable.includes(a.id),onclick:()=>a.s==="whot"?this.pickShape(t,a):this.move(t,{card:a.id})}))),o=p("button",{class:"btn small",id:"whotDraw",disabled:!e.mine,onclick:()=>this.move(t,{action:"draw"})},"\u{1F0CF} Draw one card");return n.append(i,r,o),this.shapeBox=p("div",{class:"chips"}),n.append(this.shapeBox),n}lastText(t){let e=t.board.last;if(!e)return"";let n=e.who===t.you?"You":"They";if(e.effect==="draw")return`${n} drew a card.`;let i={hold:"Hold on!",suspend:"Suspension!",pick2:"Pick two!",pick3:"Pick three!",market:"General market!",whot:"Whot!"}[e.effect];return`${n} played ${e.card.replace(/[a-z]+/,"")}${i?" \xB7 "+i:""}`}pickShape(t,e){this.shapeBox.replaceChildren(p("b",{},"Call a shape: "),...["circle","triangle","cross","square","star"].map(n=>p("button",{class:"chip",style:`color:${Gs[n][1]}`,"data-shape":n,onclick:()=>this.move(t,{card:e.id,shape:n})},Gs[n][0]+" "+n)))}ayoBoard(t){let e=t.board,n=t.youSeat,i=n===0?0:6,r=n===0?6:0,o=[0,1,2,3,4,5].map(h=>i+h),a=[5,4,3,2,1,0].map(h=>r+h),l=(h,d)=>{let f=h-i,g=d&&e.legal.includes(f);return p("button",{class:`pit ${d?"mine":""} ${g?"legal":""}`,"data-pit":h,disabled:!g,onclick:()=>this.move(t,{house:f})},p("b",{},e.pits[h]))},c=1-n,u=t.players.find(h=>h.seat===c)?.name;return p("div",{class:"ayo"},p("div",{class:"row sp"},p("span",{class:"mut"},`@${u} captured: ${e.store[c]}`),p("span",{class:"mut"},e.last?`Last: house ${e.last.house+1}${e.last.captured?` \xB7 captured ${e.last.captured}`:""}`:"")),p("div",{class:"pits"},a.map(h=>l(h,!1))),p("div",{class:"pits"},o.map(h=>l(h,!0))),p("div",{class:"row sp"},p("b",{},`You captured: ${e.store[n]} (first to 25 wins)`)))}dominoBoard(t){let e=t.board,n=["\xB7","\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"],i=m=>p("span",{class:"dh"},n[m]),r=(m,v,S={})=>p("button",{class:`dtile ${S.mini?"mini":""}`,"data-tile":S.id||"",disabled:!!S.disabled,onclick:S.onclick},i(m),p("i",{}),i(v)),o=p("div",{class:"row"},t.players.map(m=>p("span",{class:`tag ${m.seat===e.turn?"green":""}`},`${m.you?"You":"@"+m.name}: ${e.counts[m.seat]}${e.out[m.seat]?" (out)":""}`)),p("span",{class:"tag amber"},`Boneyard ${e.yard}`)),a=p("div",{class:"dchain"},e.chain.length?e.chain.map(m=>r(m[0],m[1],{mini:!0,disabled:!0})):p("span",{class:"mut"},"No tiles down yet. Play any tile to start.")),l=p("div",{class:"row"}),c=this.dpick&&e.playable.includes(this.dpick)?this.dpick:null;c||(this.dpick=null);let u=m=>{this.dpick=null,this.move(t,m)};if(c){let m=e.ends;l.replaceChildren(p("span",{class:"mut"},`Tile ${c}: which end?`),p("button",{class:"btn small alt",id:"domLeft",onclick:()=>u({tile:c,end:"left"})},`\u25C0 Left (${m[0]})`),p("button",{class:"btn small alt",id:"domRight",onclick:()=>u({tile:c,end:"right"})},`Right (${m[1]}) \u25B6`))}let h=m=>{let[v,S]=m.split("-").map(Number),_=e.ends;if(!_||_[0]===_[1]||!((v===_[0]||S===_[0])&&(v===_[1]||S===_[1])))return u({tile:m});this.dpick=m,this.renderMatch(t)},d=p("div",{class:"hand"},e.hand.map(m=>{let[v,S]=m.split("-").map(Number);return r(v,S,{id:m,disabled:!e.mine||!e.playable.includes(m),onclick:()=>h(m)})})),f=e.canDraw?p("button",{class:"btn alt",id:"domDraw",onclick:()=>this.move(t,{action:"draw"})},`Draw from the boneyard (${e.yard})`):"",g=e.last,x=g?t.players.find(m=>m.seat===g.who)?.name:null,y=g?g.pass?`@${x} had no play and passed.`:g.draw?`@${x} drew a tile.`:`@${x} played ${g.tile}.`:"";return p("div",{class:"domino"},o,a,p("p",{class:"mut"},y),l,d,f,e.mine&&!e.playable.length&&!e.canDraw?p("p",{class:"mut"},"No play: you pass."):"",e.tiles?p("p",{class:"mut"},"Final hands: "+t.players.map(m=>`@${m.name} ${e.tiles[m.seat].join(" ")||"(empty)"}`).join(" \xB7 ")):"")}draughtsBoard(t){let e=t.board,n=t.youSeat,i=n===1,r=this.dsel,o=e.legal||[],a=new Set(o.map(x=>x.from)),l=r?o.filter(x=>x.from===r).map(x=>x.to):[],c=[...Array(8).keys()];i&&c.reverse();let u=[...Array(8).keys()];i&&u.reverse();let h=p("div",{class:"dgrid"},c.flatMap(x=>u.map(y=>{let m=e.board[x*8+y],v=`${x},${y}`,S=(x+y)%2===1,_=m&&m<=2==(n===0),D=`dcell ${S?"dk":"lt"} ${r===v?"sel":""} ${l.includes(v)?"dest":""} ${e.mine&&a.has(v)?"can":""}`,A=m?p("span",{class:`dp ${m<=2?"p0":"p1"} ${_?"mine":""}`},m===2||m===4?"\u265B":""):"";return p("button",{class:D,"data-cell":v,disabled:!S||!e.mine,onclick:()=>{if(l.includes(v)){let C=o.filter(I=>I.from===r&&I.to===v);this.dsel=null,this.move(t,{from:r,to:v,path:C[0].path})}else a.has(v)?(this.dsel=v,this.renderMatch(t)):(this.dsel=null,this.renderMatch(t))}},A)}))),d=t.players.find(x=>x.seat===1-n)?.name,f=e.last,g=f?`${f.who===n?"You":"@"+d} moved ${f.captured?`and captured ${f.captured}`:""}${f.crowned?" \xB7 crowned \u{1F451}":""}`:"";return p("div",{class:"draughts"},p("div",{class:"row sp"},p("span",{class:"mut"},`You ${e.count[n]} \xB7 @${d} ${e.count[1-n]}`),e.mine&&e.mustJump?p("span",{class:"tag amber"},"You must capture!"):""),h,p("p",{class:"mut"},g))}ludoBoard(t){let e=t.board,n=["#d6402f","#2e9b5e","#e0a020","#2e7dd1"],i=["Red","Green","Yellow","Blue"],r=A=>e.corners[A],o=250,a=o/2,l=104,c=13,u=(A,C=l)=>{let I=A/52*2*Math.PI-Math.PI/2;return[a+C*Math.cos(I),a+C*Math.sin(I)]},h=p("div",{class:"ludo",style:`width:${o}px;height:${o}px`});for(let A=0;A<52;A++){let[C,I]=u(A),E=[0,13,26,39].indexOf(A);h.append(p("i",{class:`lc ${e.safe.includes(A)?"safe":""}`,style:`left:${C-6}px;top:${I-6}px;${E>=0?`background:${n[E]}`:""}`}))}for(let A=0;A<4;A++)for(let C=1;C<=5;C++){let[I,E]=u(A*13,l-C*15);h.append(p("i",{class:"lc hc",style:`left:${I-5}px;top:${E-5}px;background:${n[A]}55`}))}let d={},f=(A,C,I)=>{let E,w;if(I===-1){let F=u(r(A)*13,l+22);[E,w]=[F[0]+C%2*10-5,F[1]+Math.floor(C/2)*10-5]}else I<=50?[E,w]=u(e.cells[A][C]):I<56?[E,w]=u(r(A)*13,l-(I-50)*15):[E,w]=[a-12+r(A)*8,a-4];let L=`${Math.round(E)},${Math.round(w)}`,z=d[L]=(d[L]||0)+1;return[E+(z-1)*4-7,w-(z-1)*3-7]};e.tokens.forEach((A,C)=>A.forEach((I,E)=>{let[w,L]=f(C,E,I),z=C===t.youSeat;h.append(p("b",{class:`ltok ${z&&e.legal.includes(E)?"legal":""}`,"data-seat":C,"data-tok":E,style:`left:${w}px;top:${L}px;background:${n[r(C)]}`},z?String(E+1):""))}));let g=p("div",{class:"row",style:"flex-wrap:wrap"},t.players.map(A=>p("span",{class:"tag",style:`border-left:6px solid ${n[r(A.seat)]}`},`${i[r(A.seat)]} @${A.name}${A.out?" (left)":""}${A.you?" (you)":""}`))),x=p("div",{class:"die",id:"ludoDie"},e.die?["","\u2680","\u2681","\u2682","\u2683","\u2684","\u2685"][e.die]:"\u{1F3B2}"),y=e.last,m=y?`${y.who===t.youSeat?"You":"@"+t.players.find(A=>A.seat===y.who)?.name} rolled ${y.die}${y.note?" \xB7 "+y.note:""}${y.captured?` \xB7 sent ${y.captured} token(s) home!`:""}${y.home?" \xB7 token home! \u{1F3E0}":""}`:"",v=p("button",{class:"btn big alt",id:"ludoRoll",disabled:!e.canRoll,onclick:()=>this.move(t,{action:"roll"})},"\u{1F3B2} Roll the die"),S=e.tokens[t.youSeat]||[],_=A=>A===-1?"in base":A===56?"HOME \u2714":A>50?`home column ${A-50}/5`:`step ${A}`,D=p("div",{class:"chips"},S.map((A,C)=>p("button",{class:`chip ${e.legal.includes(C)?"on":""}`,"data-token":C,disabled:!e.legal.includes(C),onclick:()=>this.move(t,{token:C})},`Token ${C+1}: ${_(A)}`)));return p("div",{class:"ludowrap"},g,p("div",{class:"row"},h,p("div",{},x,v)),p("p",{class:"mut"},m),e.mine&&e.die?p("p",{},`You rolled ${e.die}. Pick a token to move:`):"",D,p("p",{class:"mut"},"Roll a 6 to leave base. A 6 gives another roll. Land on a rival (off the safe \u2B50 cells) to send them home."))}async startMatch(t){let e=await this.g.ui.guard(()=>at("/api/game/start",{matchId:t.id}));e?this.renderMatch(e):this.pollGame()}async move(t,e){let n=await this.g.ui.guard(()=>at("/api/game/move",{matchId:t.id,...e}));n?(this.renderMatch(n),this.g.ui.sfx("ok")):this.pollGame()}async leaveMatch(t){let e=await this.g.ui.guard(()=>at("/api/game/leave",{matchId:t.id}));this.g.ui.closeSheet(),e?this.renderMatch(e):this.pollGame(),this.refreshVenue()}async refreshVenue(){let t=await Dt(`/api/venue?id=${this.id}`).catch(()=>null);t&&this.open&&(this.data=t,this.drawStrip(),this.people_refresh())}poll(){clearInterval(this.pt),this.pt=setInterval(async()=>{if(!this.open)return;if(await this.refreshVenue(),this.matchId)await this.pollGame();else{let e=this.data.stations.find(n=>n.match?.you);e&&!this.dismissed.has(e.match.id)&&this.focusMatch(e.match.id)}let t=nt("#gtimer");t&&this.match?.status==="active"&&(t.textContent=`${Math.max(0,Math.ceil((this.match.deadlineAt-this.g.serverNow())/1e3))}s`)},1500)}tap(t){let e=this.canvas.getBoundingClientRect(),n=new ct((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new ii;i.setFromCamera(n,this.cam);let r=i.intersectObjects(this.stations.children,!0)[0];if(r){let o=r.object.userData.stationId;this.pick(o)}}bind(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x;t.x=n.clientX,t.moved+=Math.abs(i),this.yaw=Math.max(Math.PI/5-.7,Math.min(Math.PI/5+.7,this.yaw-i*.006))}}),e.addEventListener("pointerup",n=>{t&&t.moved<8&&this.tap(n),t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(9,Math.min(24,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{this.open&&n.key==="Escape"&&!this.g.ui.sheetOpen&&this.leave()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){if(!this.open)return;this.cam.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(0,.6,.3);let t=(performance.now()-this.t0)/1e3;for(let e of this.anim)e(t);this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}async leave(){!this.open||!await this.g.ui.guard(()=>at("/api/venue/leave"))||(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,this.g.net.nudge(),nt("#game").focus())}};var Io=class{constructor(t){this.g=t,this.open=!1}async show(){let t=this.g,e=await t.ui.guard(()=>Dt("/api/garage"));if(!e)return!1;this.d=e,this.open=!0,t.ui.closeSheet?.(),this.el=p("div",{id:"garageView"}),document.body.append(this.el),this.canvas=p("canvas"),this.el.append(this.canvas),this.r=new xn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new yn,this.scene.background=new Mt(2306106),this.cam=new be(42,1,.1,100),this.yaw=Math.PI/6,this.pitch=.78,this.dist=15.5,this.anim=[],this.t0=performance.now(),this.scene.add(new _n(16777215,8943462,1.05));let n=new bn(16773328,.9);return n.position.set(4,10,6),this.scene.add(n),Hu(this.scene,this.anim),this.cars=new Xt,this.scene.add(this.cars),this.fill(),this.chrome(),this.bind(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize),this.loop(),!0}fill(){this.cars.clear();let t=this.d;this.slotCars=[];for(let e=0;e<t.slots;e++){let n=t.cars[e],i=-3.5+e*3.5;if(!n){let a=Ne("Empty slot","#9aa5b1");a.scale.set(2.6,.65,1),a.position.set(i,1,.4),this.cars.add(a);continue}let r=ri(n.color);r.scale.setScalar(.62),r.position.set(i,.05,.5),r.rotation.y=Math.PI/2+0,r.userData.carId=n.id,this.cars.add(r),this.slotCars.push(r);let o=Ne(`${n.active?"\u2705 ":""}${n.name}`,n.active?"#b9f6ca":"#fff3c4");if(o.scale.set(3,.75,1),o.position.set(i,2,.5),this.cars.add(o),n.active){let a=new et(new Fn(1.6,1.85,40),new Jt({color:3523691,side:ye,transparent:!0,opacity:.85}));a.rotation.x=-Math.PI/2,a.position.set(i,.04,.5),this.cars.add(a),this.anim.push(l=>{a.material.opacity=.55+.3*Math.sin(l*3)})}}}chrome(){let t=this.d,e=this.info=p("div",{class:"gv-info"}),n=p("div",{class:"ihead"},p("div",{},p("h3",{},"My garage"),p("div",{style:"font-size:13px"},`${t.cars.length}/${t.slots} slots used \xB7 driving ${t.active.label}`)),p("button",{class:"btn small red",id:"garageClose",onclick:()=>this.close()},"Close")),i=p("div",{class:"gv-list"},t.cars.map(r=>p("button",{class:"btn small alt","data-car":r.id,onclick:()=>this.pick(r)},`${r.active?"\u2705 ":""}${r.name}`)),t.cars.length?"":p("span",{class:"mut"},"No cars yet. Visit the Naija Auto Mart."));this.el.append(n,i,e),t.cars[0]&&this.pick(t.cars.find(r=>r.active)||t.cars[0])}pick(t){let e=n=>p("div",{class:"cbar"},p("i",{style:`width:${n}%`}));this.info.replaceChildren(p("b",{},t.name),p("div",{class:"mut"},`Worth ${pt(t.value)} (paid ${pt(t.paid)}) \xB7 ${t.ageDays}d old \xB7 ${t.conditionLabel} ${t.condition}%`),e(t.condition),p("div",{class:"row"},t.active?p("span",{class:"tag"},"Driving this one"):p("button",{class:"btn small",id:"garageUse",onclick:async()=>{await this.g.ui.guard(()=>at("/api/garage/use",{carId:t.id}))&&(this.d=await Dt("/api/garage"),this.fill(),this.el.querySelectorAll(".ihead,.gv-list,.gv-info").forEach(i=>i.remove()),this.chrome())}},"Use this car"),p("span",{class:"mut"},"Prices and values are ESTIMATES.")))}bind(){let t=null,e=this.canvas;e.onpointerdown=n=>{t={x:n.clientX,y:n.clientY,yaw:this.yaw,pitch:this.pitch},e.setPointerCapture(n.pointerId)},e.onpointermove=n=>{t&&(this.yaw=t.yaw-(n.clientX-t.x)*.006,this.pitch=Math.min(1.2,Math.max(.35,t.pitch+(n.clientY-t.y)*.004)))},e.onpointerup=()=>{t=null},e.onwheel=n=>{n.preventDefault(),this.dist=Math.min(24,Math.max(8,this.dist+n.deltaY*.01))}}resize(){let t=innerWidth,e=innerHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix(),this.dist=Math.max(this.dist,t/e<.8?21:15.5)}loop(){if(!this.open)return;this.cam.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(0,.6,.2);let t=(performance.now()-this.t0)/1e3;for(let e of this.anim)e(t);this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}close(){this.open&&(this.open=!1,cancelAnimationFrame(this.raf),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.remove())}};var $u=["Tap any building or sign to see it on the map and travel there.","Take a shift at the Corner Mart: the quick task gives +25% if you stop the bar in the green.","Knock at a house when its owner is home. They can let you in.","Land plots grow in value, but omo-onile may come for a levy.","Delivery costs more but works from anywhere.","Press C to hop in your car. Press T to chat."],fc=class{constructor(){this.playing=!1,this.busy=!1,this.user=null,this.clockOffset=0,this.cfg={},this.lastKnocks=null,this.waypoint=null,this.commute=null,this.worldTime=null,this.plots=[],this.props=[],this.shops=[],this.fpsAcc=0,this.activity=""}yieldTargets(){let t=[];if(this.ctrl&&!this.busy&&t.push({x:this.ctrl.x,z:this.ctrl.z,r:.6}),this.ghosts)for(let e of this.ghosts.map.values())e.root&&t.push({x:e.root.position.x,z:e.root.position.z,r:.6});return t}horn(t,e){let n=performance.now();if(!(n-(this.lastHorn||0)<3e3||!this.ctrl||Math.hypot(e.x-this.ctrl.x,e.z-this.ctrl.z)>30)){this.lastHorn=n;try{let i=this.hornCtx||(this.hornCtx=new(window.AudioContext||window.webkitAudioContext)),r=i.createOscillator(),o=i.createGain();r.type="square",r.frequency.value=t.type==="danfo"?330:440,o.gain.value=.015,r.connect(o).connect(i.destination),r.start(),r.stop(i.currentTime+.18)}catch{}}}serverNow(){return Date.now()+this.clockOffset}clockSync(t,e){let n=t+e/2-Date.now();this.clockOffset=this.clockOffset?this.clockOffset*.7+n*.3:n}pos(){return{x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}}progress(t,e){nt("#loadBar").style.width=t+"%",e&&(nt("#loadTip").textContent=e)}async boot(){try{this.progress(8,"Reaching the server\u2026");let[t,e]=await Promise.all([Dt("/api/config"),Dt("/api/city")]);this.cfg=t,this.city=e,e.area=(i,r)=>r>125?"Lagoon Front":i<0&&r<0?"Yaba":i>=0&&r<0?"Ikeja":i<0?"Surulere":"Lekki Phase 1",nt("#tagline").textContent=t.tagline||"",document.title=t.name,this.progress(30,"Building the district\u2026"),await new Promise(i=>setTimeout(i,30)),this.renderer=new xn({canvas:nt("#game"),antialias:devicePixelRatio<2,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.camera=new be(58,1,.5,900),this.camera.position.set(0,14,20),this.world=pu(e),this.scene=this.world.scene,this.decorate(),this.progress(60,"Putting traffic on the road\u2026"),await new Promise(i=>setTimeout(i,30)),this.traffic=new po(this.scene,e.trafficLoops),this.traffic.onHorn=(i,r)=>this.horn(i,r),this.walkers=new mo(this.scene,e.zones),this.ghosts=new go(this.scene),this.ads=new vo(this.world,e,()=>this.serverNow()),this.ui=new To(this),this.net=new Ao(this),this.interior=new Ro(this),this.venue=new Co(this),this.garage=new Io(this),this.ctrl=new yo(nt("#game"),e,this.world.colliders,"#00a859","You"),this.scene.add(this.ctrl.root),addEventListener("resize",()=>this.resize()),this.resize(),this.bindAuth(),this.progress(85,$u[Math.floor(Math.random()*$u.length)]);let n=await Dt("/api/me").catch(()=>null);this.progress(100,"Ready!"),await new Promise(i=>setTimeout(i,250)),this.loop(performance.now()),nt("#loading").classList.add("hidden"),n?await this.enter(n.user):nt("#auth").classList.remove("hidden")}catch(t){console.error(t),nt("#loadTip").textContent=t instanceof Mn?t.message:"Could not start the game. Is WebGL enabled? Refresh to retry.",nt("#loadBar").style.background="#d6402f"}}decorate(){let t=this.scene;this.plotMeshes={};let e=ho();for(let i of this.city.plots||[]){let r=new Xt,o=new et(new Ee(i.size,i.size).rotateX(-Math.PI/2),new Kt({color:15327944,transparent:!0,opacity:.9}));o.position.set(i.x,.12,i.z),r.add(o);let a=new zs(new jr(new Bt(i.size,.2,i.size)),new ss({color:16761358}));a.position.set(i.x,.2,i.z),r.add(a);let l=new et(new Me(.12,.12,4),new Kt({color:7036746}));l.position.set(i.x,2,i.z+i.size/2-1),r.add(l);let c=new et(new Ee(2.6,1.6),new Jt({color:3523691,side:ye}));c.position.set(i.x+1.3,3.2,i.z+i.size/2-1),r.add(c),this.plotMeshes[i.id]={sq:o,flag:c},t.add(r)}let n=this.city.shops.find(i=>i.id==="shop_market");if(n){let i=new et(new Bt(7,.25,4),new Kt({color:14043695}));i.position.set(n.x,3,n.z);let r=new et(new Bt(6,1.1,2),new Kt({color:9136957}));r.position.set(n.x,.55,n.z+.5);let o=new et(new Bt(5.2,.3,1.2),new Kt({color:15185994}));o.position.set(n.x,1.25,n.z+.5),t.add(i,r,o);for(let a of[-3.2,3.2]){let l=new et(new Me(.1,.1,3),new Kt({color:5592405}));l.position.set(n.x+a,1.5,n.z-1.5),t.add(l)}}for(let i of this.city.venues||[]){let r=Ne(i.name,i.sign||"#333");r.scale.set(8,2,1),r.position.set(i.x,8.5,i.z),t.add(r);let o=new et(new Fn(1.4,1.9,24).rotateX(-Math.PI/2),new Jt({color:16761358,side:ye}));o.position.set(i.x,.15,i.z),t.add(o)}this.dest=new et(new Fn(1.2,1.7,28).rotateX(-Math.PI/2),new Jt({color:11816191,side:ye})),this.dest.visible=!1,t.add(this.dest)}resize(){let t=innerWidth,e=innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.size={w:t,h:e}}bindAuth(){let t="guest",e=nt("#authForm"),n=i=>{t=i,Ql("#authTabs button").forEach(r=>r.classList.toggle("on",r.dataset.t===i)),nt("#fUser").classList.toggle("hidden",i==="guest"),nt("#fPass").classList.toggle("hidden",i==="guest"),nt("#authGo").textContent={guest:"Play as guest",signup:"Create account",login:"Log in"}[i],nt("#authErr").textContent=""};n("guest"),Ql("#authTabs button").forEach(i=>i.onclick=()=>n(i.dataset.t)),e.onsubmit=async i=>{i.preventDefault();let r=new FormData(e),o=nt("#age18").checked;if(nt("#authErr").textContent="",t!=="login"&&!o){nt("#authErr").textContent="You must confirm you are 18 or older to play.";return}let a=nt("#authGo");a.disabled=!0;try{let l=await at(`/api/auth/${t}`,{username:r.get("username"),password:r.get("password"),age18:o});nt("#auth").classList.add("hidden"),await this.enter(l.user)}catch(l){nt("#authErr").textContent=l.message}finally{a.disabled=!1}}}async enter(t){this.playing=!0,this.user=t,nt("#hud").classList.remove("hidden"),this.cfg.jobs=(await Dt("/api/jobs").catch(()=>({jobs:[]}))).jobs,this.ctrl.setLook(t.color,t.username);let e=this.city.spawns,n=e[t.id%e.length],i=t.pos&&(t.pos.x||t.pos.z)?t.pos:null;this.ctrl.teleport(i?.x??n.x,i?.z??n.z),this.ctrl.ry=n.ry||0,this.ctrl.camYaw=this.ctrl.ry,this.camera.position.set(this.ctrl.x-10,12,this.ctrl.z+12),this.update(t),this.net.start(),this.phone2=new _o(this),this.phone2.start(),this.refreshProps(),Dt("/api/plots").then(r=>{this.plots=r.plots,this.refreshPlots()}).catch(()=>{}),this.ui.toast(t.guest?`Welcome, ${t.username}! You are playing as a guest.`:`Welcome back, ${t.username}!`),!localStorage.getItem("na_tip")&&!matchMedia("(pointer: coarse)").matches&&(localStorage.setItem("na_tip","1"),setTimeout(()=>{this.ui.sheetOpen||this.ui.toast("Tip: tap a building or the ground near a sign to open its sheet.")},1800))}async refreshProps(){let t=await Dt("/api/properties").catch(()=>null);t&&(this.props=t.properties,this.world.setMarkers(t.properties))}refreshPlots(){for(let t of this.plots){let e=this.plotMeshes[t.id];e&&e.flag.material.color.setHex(t.status==="available"?3523691:t.status==="yours"?16761358:9080728)}}async refreshMe(){let t=await Dt("/api/me").catch(()=>null);t?.user&&this.update(t.user)}update(t){t&&(this.user=t,this.ui.hud(t))}sessionLost(){this.playing&&(this.playing=!1,this.net.stop(),nt("#hud").classList.add("hidden"),this.ui.closeSheet(),nt("#auth").classList.remove("hidden"),nt("#authErr").textContent="Your session ended. Please sign in again.")}async logout(){await at("/api/auth/logout").catch(()=>{}),this.playing=!1,this.net.stop(),location.reload()}setConn(t){nt("#conn").classList.toggle("hidden",t)}markRead(){this.ui.badge(0),this.unread=0}toggleCar(){if(!this.playing||this.busy)return;let t=this.ctrl.toggleCar();this.ui.sfx(t==="drive"?"horn":"ok"),this.net.nudge()}onHeartbeat(t){this.update(t.me),this.worldTime=t.world,this.ui.clock(t.world),this.world.setTime(t.world.minutesOfDay),this.ghosts.ingest(t.players,this.serverNow()),this.ads.setSnapshot(t.ads);for(let e of t.chat||[])this.ui.addChat(e.u,e.t,e.id);for(let e of t.notifs||[])["knock","dm","knock_in","knock_no"].includes(e.kind),this.unread=(this.unread||0)+1,this.ui.toast(e.text,["omo_onile"].includes(e.kind)?"bad":e.kind==="dm"?"":"money");this.ui.badge(this.unread||0),this.lastKnocks=t.knocks;for(let e of t.knocks?.incoming||[])this.ui.hostKnock(e);t.teleport&&!t.teleport.travelMs&&!this.commute&&this.ctrl.teleport(t.teleport.x,t.teleport.z),t.me.shift&&t.me.shift.endsAt<=this.serverNow()&&this.lastShiftDone!==t.me.shift.id&&(this.lastShiftDone=t.me.shift.id,this.ui.toast("Shift done! Open the job sheet to collect your pay.","money"))}onPush(t){t.kind==="knock"&&this.ui.sfx("knock")}nearest(t=18){let e=null,n=t,i=this.ctrl.x,r=this.ctrl.z;for(let o of this.city.places){let a=Math.hypot(o.x-i,o.z-r);a<n&&(n=a,e=o)}return e?{place:e,d:n}:null}tapPlace(t,e){let n=new ct(t/this.size.w*2-1,-(e/this.size.h)*2+1),i=new ii;i.setFromCamera(n,this.camera);let r=Object.values(this.world.boards).map(h=>h.panel),o=i.intersectObjects(r,!1)[0];if(o){let h=Object.keys(this.world.boards).find(d=>this.world.boards[d].panel===o.object);if(h)return this.ui.board(h)}let a=-i.ray.origin.y/i.ray.direction.y;if(!(a>0))return;let l=i.ray.origin.clone().addScaledVector(i.ray.direction,a),c=null,u=20;for(let h of this.city.places){let d=Math.hypot(h.x-l.x,h.z-l.z);d<u&&(u=d,c=h)}for(let h of this.city.properties){let d=this.city.buildings.find(f=>f.id===h.buildingId);if(d&&Math.abs(l.x-d.x)<d.w/2+2&&Math.abs(l.z-d.z)<d.d/2+2){c=this.city.places.find(f=>f.id===h.id);break}}c?(this.ui.sfx("ok"),this.ui.place(c.id)):this.setWaypoint(l.x,l.z,"Tapped spot")}doAction(){if(!this.playing||this.busy||this.ui.sheetOpen)return;let t=this.nearBoard||null,e=this.nearest(this.actionRange||18);e?this.ui.place(e.place.id):t&&this.ui.board(t)}setWaypoint(t,e,n){this.waypoint={x:t,z:e,label:n},this.dest.visible=!0,this.dest.position.set(t,.3,e)}enterHome(){at("/api/property/enter").then(()=>this.interior.show(this.user.home.id)).catch(t=>this.ui.error(t))}async enterAsVisitor(t){this.ui.sfx("ok"),await this.interior.show(t,!0)}runCommute(t,e,n){this.busy=!0,this.ctrl.frozen=!0,this.commute={t0:performance.now(),dur:t.seconds*1e3,from:t.from,to:t.to,mode:t.mode},nt("#commute").classList.remove("hidden"),nt("#commuteTitle").textContent=`${{keke:"\u{1F6FA} Keke",danfo:"\u{1F68C} Danfo",car:"\u{1F697} Your car"}[t.mode]} to ${e.name}`,nt("#commuteSub").textContent=`${n.traffic}${t.fare?" \xB7 "+this.fmt(t.fare):""}`,this.ui.sfx("horn"),this.ui.toast(Fe("travel",t.fare)),this.ctrl.mode=t.mode==="car"?"drive":"walk",this.ctrl.applyMode();let i=t.to.x-t.from.x,r=t.to.z-t.from.z;this.ctrl.ry=Math.atan2(-r,i),this.ctrl.camYaw=this.ctrl.ry,this.net.trail.length=0}fmt(t){return"\u20A6"+Math.round(t).toLocaleString("en-NG")}stepCommute(t){let e=this.commute;if(!e)return!1;let n=Math.min(1,(t-e.t0)/e.dur),i=n<.5?2*n*n:1-Math.pow(-2*n+2,2)/2;return this.ctrl.x=e.from.x+(e.to.x-e.from.x)*i,this.ctrl.z=e.from.z+(e.to.z-e.from.z)*i,this.ctrl.v=0,this.ctrl.root.position.set(this.ctrl.x,0,this.ctrl.z),this.ctrl.root.rotation.y=this.ctrl.ry,nt("#commuteBar").style.width=n*100+"%",n>=1&&(this.commute=null,this.busy=!1,this.ctrl.frozen=!1,this.ctrl.mode="walk",this.ctrl.applyMode(),nt("#commute").classList.add("hidden"),this.ctrl.teleport(e.to.x,e.to.z),this.ui.sfx("ok"),this.ui.toast("You have arrived."),this.net.nudge(),this.waypoint=null,this.dest.visible=!1),!0}loop(t){let e=t;this.lastSample=0;let n=i=>{requestAnimationFrame(n);let r=Math.min(.1,(i-e)/1e3);if(e=i,!this.playing){this.idleCam(i),this.renderer.render(this.scene,this.camera);return}if(this.interior.open||this.venue.open||this.garage.open)return;let o=this.serverNow()/1e3;if(this.traffic.update(o,this.yieldTargets(),r),this.walkers.update(o),this.ghosts.update(this.serverNow()-1100),this.world.animate(r*1e3),this.stepCommute(i)?this.ctrl.placeCamera(this.camera,r):this.ctrl.update(r),this.commute||(this.ctrl.placeCamera(this.camera,r),i-this.lastSample>250&&(this.lastSample=i,this.net.sample({t:this.serverNow(),x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}))),this.ctrl.lastTap&&!this.ui.sheetOpen&&!this.busy){let a=this.ctrl.lastTap;this.ctrl.lastTap=null,i-a.t<400&&this.tapPlace(a.x,a.y)}this.ads.update(this.camera,this.size,this.ctrl,r*1e3),this.hudStep(i),this.renderer.render(this.scene,this.camera)};requestAnimationFrame(n)}idleCam(t){let e=t/9e3;this.camera.position.set(Math.cos(e)*70,38,Math.sin(e)*70-20),this.camera.lookAt(0,4,-20),this.camera.updateMatrixWorld()}hudStep(t){if(t-(this.hudT||0)<200)return;this.hudT=t;let e=this.ctrl,n=this.nearest(this.actionRange||18),i=this.ads.nearest(e.x,e.z,30);this.nearBoard=i;let r=this.city.area(e.x,e.z),o=this.roadName(e.x,e.z);this.ui.loc(`\u{1F4CD} ${n?n.place.name:o||r}${n||o?" \xB7 "+r:""}`);let a=null;if(n&&!this.ui.sheetOpen){let l=n.place;if(a={shop:`\u{1F6D2} ${l.name}`,job:"\u{1F4BC} Work here",house:`\u{1F3E0} ${l.name}`,plot:`\u{1F30D} ${l.name}`,landmark:`\u{1F4CD} ${l.name}`}[l.type],l.type==="shop"){let c=this.shops.find(u=>u.id===l.id);c&&!c.status.open&&(a=`\u{1F512} ${l.name}: ${c.status.text}`)}}else i&&!this.ui.sheetOpen&&(a="\u{1F4E2} Billboard");if(this.ui.action(this.busy?null:a),this.waypoint){let l=Math.hypot(this.waypoint.x-e.x,this.waypoint.z-e.z);l<5&&(this.waypoint=null,this.dest.visible=!1,this.ui.toast("You have arrived.")),this.ui.waypoint(this.waypoint,l)}else this.ui.waypoint(null);this.dest.visible&&this.dest.scale.setScalar(1+Math.sin(t/200)*.15),this.ui.minimap(e,this.city,this.ghosts,this.waypoint),this.user?.shift&&this.ui.hud(this.user),this.activity=e.mode}roadName(t,e){for(let n of this.city.roads)if(n.z1===n.z2?Math.abs(e-n.z1)<n.width/2&&t>=Math.min(n.x1,n.x2)&&t<=Math.max(n.x1,n.x2):Math.abs(t-n.x1)<n.width/2&&e>=Math.min(n.z1,n.z2)&&e<=Math.max(n.z1,n.z2))return n.name||"On the road";return null}},Xu=new fc;window.__game=Xu;Xu.boot();})();
