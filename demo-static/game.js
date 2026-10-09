(()=>{var uu=0,el=1,du=2;var ph=1,fu=2,Mn=3,hn=0,Be=1,We=2,Vn=0,Bi=1,nl=2,il=3,sl=4,pu=5,ci=100,mu=101,gu=102,xu=103,_u=104,yu=200,vu=201,Mu=202,bu=203,Qo=204,ta=205,wu=206,Su=207,Eu=208,Tu=209,Au=210,Ru=211,Cu=212,Iu=213,Pu=214,ea=0,na=1,ia=2,Vi=3,sa=4,ra=5,oa=6,aa=7,Tc=0,Lu=1,Du=2,Gn=0,Uu=1,Nu=2,Ou=3,Fu=4,Bu=5,zu=6,ku=7;var mh=300,Gi=301,Wi=302,ca=303,la=304,Zr=306,ys=1e3,hi=1001,ha=1002,Xe=1003,Hu=1004;var Bs=1005;var cn=1006,xo=1007;var ui=1008;var Tn=1009,gh=1010,xh=1011,vs=1012,Ac=1013,di=1014,ln=1015,Ls=1016,Rc=1017,Cc=1018,Xi=1020,_h=35902,yh=1021,vh=1022,nn=1023,Mh=1024,bh=1025,zi=1026,$i=1027,Ic=1028,Pc=1029,wh=1030,Lc=1031;var Dc=1033,gr=33776,xr=33777,_r=33778,yr=33779,ua=35840,da=35841,fa=35842,pa=35843,ma=36196,ga=37492,xa=37496,_a=37808,ya=37809,va=37810,Ma=37811,ba=37812,wa=37813,Sa=37814,Ea=37815,Ta=37816,Aa=37817,Ra=37818,Ca=37819,Ia=37820,Pa=37821,vr=36492,La=36494,Da=36495,Sh=36283,Ua=36284,Na=36285,Oa=36286;var br=2300,Fa=2301,_o=2302,rl=2400,ol=2401,al=2402;var Vu=3200,Gu=3201;var Eh=0,Wu=1,Hn="",Ue="srgb",Ki="srgb-linear",Jr="linear",oe="srgb";var _i=7680;var cl=519,Xu=512,$u=513,Yu=514,Th=515,qu=516,Zu=517,Ju=518,Ku=519,Ba=35044;var ll="300 es",Sn=2e3,wr=2001,Xn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Mr=Math.PI/180,za=180/Math.PI;function Wn(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[s&255]+Ie[s>>8&255]+Ie[s>>16&255]+Ie[s>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Te(s,t,e){return Math.max(t,Math.min(e,s))}function ju(s,t){return(s%t+t)%t}function yo(s,t,e){return(1-e)*s+e*t}function an(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var at=class s{constructor(t=0,e=0){s.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},kt=class s{constructor(t,e,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=i[0],m=i[3],p=i[6],S=i[1],T=i[4],M=i[7],U=i[2],R=i[5],C=i[8];return r[0]=o*x+a*S+c*U,r[3]=o*m+a*T+c*R,r[6]=o*p+a*M+c*C,r[1]=l*x+h*S+u*U,r[4]=l*m+h*T+u*R,r[7]=l*p+h*M+u*C,r[2]=d*x+f*S+g*U,r[5]=d*m+f*T+g*R,r[8]=d*p+f*M+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(i*l-h*n)*x,t[2]=(a*n-i*o)*x,t[3]=d*x,t[4]=(h*e-i*c)*x,t[5]=(i*r-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(vo.makeScale(t,e)),this}rotate(t){return this.premultiply(vo.makeRotation(-t)),this}translate(t,e){return this.premultiply(vo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},vo=new kt;function Ah(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Sr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Qu(){let s=Sr("canvas");return s.style.display="block",s}var hl={};function ps(s){s in hl||(hl[s]=!0,console.warn(s))}function td(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function ed(s){let t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function nd(s){let t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var jt={enabled:!0,workingColorSpace:Ki,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(s.r=En(s.r),s.g=En(s.g),s.b=En(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Jr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function En(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ki(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ul=[.64,.33,.3,.6,.15,.06],dl=[.2126,.7152,.0722],fl=[.3127,.329],pl=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);jt.define({[Ki]:{primaries:ul,whitePoint:fl,transfer:Jr,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:dl,workingColorSpaceConfig:{unpackColorSpace:Ue},outputColorSpaceConfig:{drawingBufferColorSpace:Ue}},[Ue]:{primaries:ul,whitePoint:fl,transfer:oe,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:dl,outputColorSpaceConfig:{drawingBufferColorSpace:Ue}}});var yi,ka=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{yi===void 0&&(yi=Sr("canvas")),yi.width=t.width,yi.height=t.height;let n=yi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=yi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Sr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=En(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(En(e[n]/255)*255):e[n]=En(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},id=0,Er=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=Wn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Mo(i[o].image)):r.push(Mo(i[o]))}else r=Mo(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Mo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ka.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var sd=0,ze=class s extends Xn{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=hi,i=hi,r=cn,o=ui,a=nn,c=Tn,l=s.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=Wn(),this.name="",this.source=new Er(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ys:t.x=t.x-Math.floor(t.x);break;case hi:t.x=t.x<0?0:1;break;case ha:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ys:t.y=t.y-Math.floor(t.y);break;case hi:t.y=t.y<0?0:1;break;case ha:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=mh;ze.DEFAULT_ANISOTROPY=1;var _e=class s{constructor(t=0,e=0,n=0,i=1){s.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(l+1)/2,M=(f+1)/2,U=(p+1)/2,R=(h+d)/4,C=(u+x)/4,P=(g+m)/4;return T>M&&T>U?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=R/n,r=C/n):M>U?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=R/i,r=P/i):U<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(U),n=C/r,i=P/r),this.set(n,i,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-x)/S,this.z=(d-h)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ha=class extends Xn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new ze(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Er(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},An=class extends Ha{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Tr=class extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Va=class extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qe=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==d||l!==f||h!==g){let m=1-a,p=c*d+l*f+h*g+u*x,S=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){let U=Math.sqrt(T),R=Math.atan2(U,p*S);m=Math.sin(m*R)/U,a=Math.sin(a*R)/U}let M=a*S;if(c=c*m+d*M,l=l*m+f*M,h=h*m+g*M,u=u*m+x*M,m===1-a){let U=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=U,l*=U,h*=U,u*=U}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class s{constructor(t=0,e=0,n=0){s.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return bo.copy(this).projectOnVector(t),this.sub(bo)}reflect(t){return this.sub(bo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},bo=new I,gl=new qe,Rn=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qe):Qe.fromBufferAttribute(r,o),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zs.copy(n.boundingBox)),zs.applyMatrix4(t.matrixWorld),this.union(zs)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),ks.subVectors(this.max,ss),vi.subVectors(t.a,ss),Mi.subVectors(t.b,ss),bi.subVectors(t.c,ss),Nn.subVectors(Mi,vi),On.subVectors(bi,Mi),ei.subVectors(vi,bi);let e=[0,-Nn.z,Nn.y,0,-On.z,On.y,0,-ei.z,ei.y,Nn.z,0,-Nn.x,On.z,0,-On.x,ei.z,0,-ei.x,-Nn.y,Nn.x,0,-On.y,On.x,0,-ei.y,ei.x,0];return!wo(e,vi,Mi,bi,ks)||(e=[1,0,0,0,1,0,0,0,1],!wo(e,vi,Mi,bi,ks))?!1:(Hs.crossVectors(Nn,On),e=[Hs.x,Hs.y,Hs.z],wo(e,vi,Mi,bi,ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},gn=[new I,new I,new I,new I,new I,new I,new I,new I],Qe=new I,zs=new Rn,vi=new I,Mi=new I,bi=new I,Nn=new I,On=new I,ei=new I,ss=new I,ks=new I,Hs=new I,ni=new I;function wo(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ni.fromArray(s,r);let a=i.x*Math.abs(ni.x)+i.y*Math.abs(ni.y)+i.z*Math.abs(ni.z),c=t.dot(ni),l=e.dot(ni),h=n.dot(ni);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var rd=new Rn,rs=new I,So=new I,$n=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):rd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rs.subVectors(t,this.center);let e=rs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(rs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(So.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rs.copy(t.center).add(So)),this.expandByPoint(rs.copy(t.center).sub(So))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},xn=new I,Eo=new I,Vs=new I,Fn=new I,To=new I,Gs=new I,Ao=new I,Ms=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Eo.copy(t).add(e).multiplyScalar(.5),Vs.copy(e).sub(t).normalize(),Fn.copy(this.origin).sub(Eo);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Vs),a=Fn.dot(this.direction),c=-Fn.dot(Vs),l=Fn.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Eo).addScaledVector(Vs,d),f}intersectSphere(t,e){xn.subVectors(t.center,this.origin);let n=xn.dot(this.direction),i=xn.dot(xn)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,n,i,r){To.subVectors(e,t),Gs.subVectors(n,t),Ao.crossVectors(To,Gs);let o=this.direction.dot(Ao),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fn.subVectors(this.origin,t);let c=a*this.direction.dot(Gs.crossVectors(Fn,Gs));if(c<0)return null;let l=a*this.direction.dot(To.cross(Fn));if(l<0||c+l>o)return null;let h=-a*Fn.dot(Ao);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ee=class s{constructor(t,e,n,i,r,o,a,c,l,h,u,d,f,g,x,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,h,u,d,f,g,x,m)}set(t,e,n,i,r,o,a,c,l,h,u,d,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/wi.setFromMatrixColumn(t,0).length(),r=1/wi.setFromMatrixColumn(t,1).length(),o=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,f=c*u,g=l*h,x=l*u;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,f=c*u,g=l*h,x=l*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+x,e[1]=c*u,e[5]=x*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+x,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(od,t,ad)}lookAt(t,e,n){let i=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Bn.crossVectors(n,Ve),Bn.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Bn.crossVectors(n,Ve)),Bn.normalize(),Ws.crossVectors(Ve,Bn),i[0]=Bn.x,i[4]=Ws.x,i[8]=Ve.x,i[1]=Bn.y,i[5]=Ws.y,i[9]=Ve.y,i[2]=Bn.z,i[6]=Ws.z,i[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],S=n[3],T=n[7],M=n[11],U=n[15],R=i[0],C=i[4],P=i[8],E=i[12],b=i[1],L=i[5],k=i[9],z=i[13],W=i[2],Q=i[6],Y=i[10],et=i[14],X=i[3],lt=i[7],mt=i[11],At=i[15];return r[0]=o*R+a*b+c*W+l*X,r[4]=o*C+a*L+c*Q+l*lt,r[8]=o*P+a*k+c*Y+l*mt,r[12]=o*E+a*z+c*et+l*At,r[1]=h*R+u*b+d*W+f*X,r[5]=h*C+u*L+d*Q+f*lt,r[9]=h*P+u*k+d*Y+f*mt,r[13]=h*E+u*z+d*et+f*At,r[2]=g*R+x*b+m*W+p*X,r[6]=g*C+x*L+m*Q+p*lt,r[10]=g*P+x*k+m*Y+p*mt,r[14]=g*E+x*z+m*et+p*At,r[3]=S*R+T*b+M*W+U*X,r[7]=S*C+T*L+M*Q+U*lt,r[11]=S*P+T*k+M*Y+U*mt,r[15]=S*E+T*z+M*et+U*At,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*f-n*c*f)+x*(+e*c*f-e*l*d+r*o*d-i*o*f+i*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],S=u*m*l-x*d*l+x*c*f-a*m*f-u*c*p+a*d*p,T=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,M=h*x*l-g*u*l+g*a*f-o*x*f-h*a*p+o*u*p,U=g*u*c-h*x*c-g*a*d+o*x*d+h*a*m-o*u*m,R=e*S+n*T+i*M+r*U;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/R;return t[0]=S*C,t[1]=(x*d*r-u*m*r-x*i*f+n*m*f+u*i*p-n*d*p)*C,t[2]=(a*m*r-x*c*r+x*i*l-n*m*l-a*i*p+n*c*p)*C,t[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*f-n*c*f)*C,t[4]=T*C,t[5]=(h*m*r-g*d*r+g*i*f-e*m*f-h*i*p+e*d*p)*C,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*p-e*c*p)*C,t[7]=(o*d*r-h*c*r+h*i*l-e*d*l-o*i*f+e*c*f)*C,t[8]=M*C,t[9]=(g*u*r-h*x*r-g*n*f+e*x*f+h*n*p-e*u*p)*C,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*p+e*a*p)*C,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*C,t[12]=U*C,t[13]=(h*x*i-g*u*i+g*n*d-e*x*d-h*n*m+e*u*m)*C,t[14]=(g*a*i-o*x*i-g*n*c+e*x*c+o*n*m-e*a*m)*C,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,x=o*h,m=o*u,p=a*u,S=c*l,T=c*h,M=c*u,U=n.x,R=n.y,C=n.z;return i[0]=(1-(x+p))*U,i[1]=(f+M)*U,i[2]=(g-T)*U,i[3]=0,i[4]=(f-M)*R,i[5]=(1-(d+p))*R,i[6]=(m+S)*R,i[7]=0,i[8]=(g+T)*C,i[9]=(m-S)*C,i[10]=(1-(d+x))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=wi.set(i[0],i[1],i[2]).length(),o=wi.set(i[4],i[5],i[6]).length(),a=wi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],tn.copy(this);let l=1/r,h=1/o,u=1/a;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,e.setFromRotationMatrix(tn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Sn){let c=this.elements,l=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),f,g;if(a===Sn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===wr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Sn){let c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(o-r),d=(e+t)*l,f=(n+i)*h,g,x;if(a===Sn)g=(o+r)*u,x=-2*u;else if(a===wr)g=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},wi=new I,tn=new ee,od=new I(0,0,0),ad=new I(1,1,1),Bn=new I,Ws=new I,Ve=new I,xl=new ee,_l=new qe,Ze=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Te(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Te(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return _l.setFromEuler(this),this.setFromQuaternion(_l,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ze.DEFAULT_ORDER="XYZ";var bs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},cd=0,yl=new I,Si=new qe,_n=new ee,Xs=new I,os=new I,ld=new I,hd=new qe,vl=new I(1,0,0),Ml=new I(0,1,0),bl=new I(0,0,1),wl={type:"added"},ud={type:"removed"},Ei={type:"childadded",child:null},Ro={type:"childremoved",child:null},Ae=class s extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new I,e=new Ze,n=new qe,i=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ee},normalMatrix:{value:new kt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis(vl,t)}rotateY(t){return this.rotateOnAxis(Ml,t)}rotateZ(t){return this.rotateOnAxis(bl,t)}translateOnAxis(t,e){return yl.copy(t).applyQuaternion(this.quaternion),this.position.add(yl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(vl,t)}translateY(t){return this.translateOnAxis(Ml,t)}translateZ(t){return this.translateOnAxis(bl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Xs.copy(t):Xs.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_n.lookAt(os,Xs,this.up):_n.lookAt(Xs,os,this.up),this.quaternion.setFromRotationMatrix(_n),i&&(_n.extractRotation(i.matrixWorld),Si.setFromRotationMatrix(_n),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(wl),Ei.child=t,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ud),Ro.child=t,this.dispatchEvent(Ro),Ro.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_n.multiply(t.parent.matrixWorld)),t.applyMatrix4(_n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(wl),Ei.child=t,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,t,ld),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,hd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Ae.DEFAULT_UP=new I(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var en=new I,yn=new I,Co=new I,vn=new I,Ti=new I,Ai=new I,Sl=new I,Io=new I,Po=new I,Lo=new I,Do=new _e,Uo=new _e,No=new _e,wn=class s{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),en.subVectors(t,e),i.cross(en);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){en.subVectors(i,e),yn.subVectors(n,e),Co.subVectors(t,e);let o=en.dot(en),a=en.dot(yn),c=en.dot(Co),l=yn.dot(yn),h=yn.dot(Co),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,vn.x),c.addScaledVector(o,vn.y),c.addScaledVector(a,vn.z),c)}static getInterpolatedAttribute(t,e,n,i,r,o){return Do.setScalar(0),Uo.setScalar(0),No.setScalar(0),Do.fromBufferAttribute(t,e),Uo.fromBufferAttribute(t,n),No.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Do,r.x),o.addScaledVector(Uo,r.y),o.addScaledVector(No,r.z),o}static isFrontFacing(t,e,n,i){return en.subVectors(n,e),yn.subVectors(t,e),en.cross(yn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),en.cross(yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;Ti.subVectors(i,n),Ai.subVectors(r,n),Io.subVectors(t,n);let c=Ti.dot(Io),l=Ai.dot(Io);if(c<=0&&l<=0)return e.copy(n);Po.subVectors(t,i);let h=Ti.dot(Po),u=Ai.dot(Po);if(h>=0&&u<=h)return e.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ti,o);Lo.subVectors(t,r);let f=Ti.dot(Lo),g=Ai.dot(Lo);if(g>=0&&f<=g)return e.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Ai,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Sl.subVectors(r,i),a=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(Sl,a);let p=1/(m+x+d);return o=x*p,a=d*p,e.copy(n).addScaledVector(Ti,o).addScaledVector(Ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Rh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},$s={h:0,s:0,l:0};function Oo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var Tt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=ju(t,1),e=Te(e,0,1),n=Te(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Oo(o,r,t+1/3),this.g=Oo(o,r,t),this.b=Oo(o,r,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){let n=Rh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=En(t.r),this.g=En(t.g),this.b=En(t.b),this}copyLinearToSRGB(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return jt.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Te(Pe.r*255,0,255))*65536+Math.round(Te(Pe.g*255,0,255))*256+Math.round(Te(Pe.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Pe.copy(this),e);let n=Pe.r,i=Pe.g,r=Pe.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ue){jt.fromWorkingColorSpace(Pe.copy(this),t);let e=Pe.r,n=Pe.g,i=Pe.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL($s);let n=yo(zn.h,$s.h,e),i=yo(zn.s,$s.s,e),r=yo(zn.l,$s.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pe=new Tt;Tt.NAMES=Rh;var dd=0,Cn=class extends Xn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Wn(),this.name="",this.blending=Bi,this.side=hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qo,this.blendDst=ta,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qo&&(n.blendSrc=this.blendSrc),this.blendDst!==ta&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ve=class extends Cn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ye=new I,Ys=new at,be=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ba,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ys.fromBufferAttribute(this,e),Ys.applyMatrix3(t),this.setXY(e,Ys.x,Ys.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=an(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=an(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=an(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=an(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ba&&(t.usage=this.usage),t}};var Ar=class extends be{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Rr=class extends be{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Yt=class extends be{constructor(t,e,n){super(new Float32Array(t),e,n)}},fd=0,Ye=new ee,Fo=new Ae,Ri=new I,Ge=new Rn,as=new Rn,Ee=new I,ge=class s extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ah(t)?Rr:Ar)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Fo.lookAt(t),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Yt(n,3))}else{for(let n=0,i=e.count;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Ge.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ge.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Ge.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ge.min),this.boundingBox.expandByPoint(Ge.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $n);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(Ge.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];as.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(Ge.min,as.min),Ge.expandByPoint(Ee),Ee.addVectors(Ge.max,as.max),Ge.expandByPoint(Ee)):(Ge.expandByPoint(as.min),Ge.expandByPoint(as.max))}Ge.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ee.fromBufferAttribute(a,l),c&&(Ri.fromBufferAttribute(t,l),Ee.add(Ri)),i=Math.max(i,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new be(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new I,c[P]=new I;let l=new I,h=new I,u=new I,d=new at,f=new at,g=new at,x=new I,m=new I;function p(P,E,b){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,P),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,b),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),a[P].add(x),a[E].add(x),a[b].add(x),c[P].add(m),c[E].add(m),c[b].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let P=0,E=S.length;P<E;++P){let b=S[P],L=b.start,k=b.count;for(let z=L,W=L+k;z<W;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let T=new I,M=new I,U=new I,R=new I;function C(P){U.fromBufferAttribute(i,P),R.copy(U);let E=a[P];T.copy(E),T.sub(U.multiplyScalar(U.dot(E))).normalize(),M.crossVectors(R,E);let L=M.dot(c[P])<0?-1:1;o.setXYZW(P,T.x,T.y,T.z,L)}for(let P=0,E=S.length;P<E;++P){let b=S[P],L=b.start,k=b.count;for(let z=L,W=L+k;z<W;z+=3)C(t.getX(z+0)),C(t.getX(z+1)),C(t.getX(z+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new be(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},El=new ee,ii=new Ms,qs=new $n,Tl=new I,Zs=new I,Js=new I,Ks=new I,Bo=new I,js=new I,Al=new I,Qs=new I,gt=class extends Ae{constructor(t=new ge,e=new ve){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){js.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Bo.fromBufferAttribute(u,t),o?js.addScaledVector(Bo,h):js.addScaledVector(Bo.sub(e),h))}e.add(js)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qs.copy(n.boundingSphere),qs.applyMatrix4(r),ii.copy(t.ray).recast(t.near),!(qs.containsPoint(ii.origin)===!1&&(ii.intersectSphere(qs,Tl)===null||ii.origin.distanceToSquared(Tl)>(t.far-t.near)**2))&&(El.copy(r).invert(),ii.copy(t.ray).applyMatrix4(El),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ii)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,U=T;M<U;M+=3){let R=a.getX(M),C=a.getX(M+1),P=a.getX(M+2);i=tr(this,p,t,n,l,h,u,R,C,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let S=a.getX(m),T=a.getX(m+1),M=a.getX(m+2);i=tr(this,o,t,n,l,h,u,S,T,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,U=T;M<U;M+=3){let R=M,C=M+1,P=M+2;i=tr(this,p,t,n,l,h,u,R,C,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let S=m,T=m+1,M=m+2;i=tr(this,o,t,n,l,h,u,S,T,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function pd(s,t,e,n,i,r,o,a){let c;if(t.side===Be?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===hn,a),c===null)return null;Qs.copy(a),Qs.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(Qs);return l<e.near||l>e.far?null:{distance:l,point:Qs.clone(),object:s}}function tr(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,Zs),s.getVertexPosition(c,Js),s.getVertexPosition(l,Ks);let h=pd(s,t,e,n,Zs,Js,Ks,Al);if(h){let u=new I;wn.getBarycoord(Al,Zs,Js,Ks,u),i&&(h.uv=wn.getInterpolatedAttribute(i,a,c,l,u,new at)),r&&(h.uv1=wn.getInterpolatedAttribute(r,a,c,l,u,new at)),o&&(h.normal=wn.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new I,materialIndex:0};wn.getNormal(Zs,Js,Ks,d.normal),h.face=d,h.barycoord=u}return h}var qt=class s extends ge{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(u,2));function g(x,m,p,S,T,M,U,R,C,P,E){let b=M/C,L=U/P,k=M/2,z=U/2,W=R/2,Q=C+1,Y=P+1,et=0,X=0,lt=new I;for(let mt=0;mt<Y;mt++){let At=mt*L-z;for(let Gt=0;Gt<Q;Gt++){let Qt=Gt*b-k;lt[x]=Qt*S,lt[m]=At*T,lt[p]=W,l.push(lt.x,lt.y,lt.z),lt[x]=0,lt[m]=0,lt[p]=R>0?1:-1,h.push(lt.x,lt.y,lt.z),u.push(Gt/C),u.push(1-mt/P),et+=1}}for(let mt=0;mt<P;mt++)for(let At=0;At<C;At++){let Gt=d+At+Q*mt,Qt=d+At+Q*(mt+1),Z=d+(At+1)+Q*(mt+1),y=d+(At+1)+Q*mt;c.push(Gt,Qt,y),c.push(Qt,Z,y),X+=6}a.addGroup(f,X,E),f+=X,d+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Yi(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function De(s){let t={};for(let e=0;e<s.length;e++){let n=Yi(s[e]);for(let i in n)t[i]=n[i]}return t}function md(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Ch(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var gd={clone:Yi,merge:De},xd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,un=class extends Cn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xd,this.fragmentShader=_d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Yi(t.uniforms),this.uniformsGroups=md(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Cr=class extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=Sn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},kn=new I,Rl=new at,Cl=new at,Me=class extends Cr{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=za*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return za*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(kn.x,kn.y).multiplyScalar(-t/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-t/kn.z)}getViewSize(t,e){return this.getViewBounds(t,Rl,Cl),e.subVectors(Cl,Rl)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Mr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ci=-90,Ii=1,Ga=class extends Ae{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Me(Ci,Ii,t,e);i.layers=this.layers,this.add(i);let r=new Me(Ci,Ii,t,e);r.layers=this.layers,this.add(r);let o=new Me(Ci,Ii,t,e);o.layers=this.layers,this.add(o);let a=new Me(Ci,Ii,t,e);a.layers=this.layers,this.add(a);let c=new Me(Ci,Ii,t,e);c.layers=this.layers,this.add(c);let l=new Me(Ci,Ii,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===wr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ir=class extends ze{constructor(t,e,n,i,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Gi,super(t,e,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Wa=class extends An{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ir(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:cn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new qt(5,5,5),r=new un({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:Vn});r.uniforms.tEquirect.value=e;let o=new gt(i,r),a=e.minFilter;return e.minFilter===ui&&(e.minFilter=cn),new Ga(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},zo=new I,yd=new I,vd=new kt,bn=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=zo.subVectors(n,e).cross(yd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(zo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||vd.getNormalMatrix(t),i=this.coplanarPoint(zo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},si=new $n,er=new I,ws=class{constructor(t=new bn,e=new bn,n=new bn,i=new bn,r=new bn,o=new bn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Sn){let n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],x=i[10],m=i[11],p=i[12],S=i[13],T=i[14],M=i[15];if(n[0].setComponents(c-r,d-l,m-f,M-p).normalize(),n[1].setComponents(c+r,d+l,m+f,M+p).normalize(),n[2].setComponents(c+o,d+h,m+g,M+S).normalize(),n[3].setComponents(c-o,d-h,m-g,M-S).normalize(),n[4].setComponents(c-a,d-u,m-x,M-T).normalize(),e===Sn)n[5].setComponents(c+a,d+u,m+x,M+T).normalize();else if(e===wr)n[5].setComponents(a,u,x,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(t){return si.center.set(0,0,0),si.radius=.7071067811865476,si.applyMatrix4(t.matrixWorld),this.intersectsSphere(si)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(er.x=i.normal.x>0?t.max.x:t.min.x,er.y=i.normal.y>0?t.max.y:t.min.y,er.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(er)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ih(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Md(s){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];s.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}var Re=class s extends ge{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let S=p*d-o;for(let T=0;T<l;T++){let M=T*u-r;g.push(M,-S,0),x.push(0,0,1),m.push(T/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){let T=S+l*p,M=S+l*(p+1),U=S+1+l*(p+1),R=S+1+l*p;f.push(T,M,R),f.push(M,U,R)}this.setIndex(f),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(x,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}},bd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wd=`#ifdef USE_ALPHAHASH
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
#endif`,Sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Td=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rd=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Id=`#ifdef USE_BATCHING
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
#endif`,Pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ld=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ud=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
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
#endif`,Od=`#ifdef USE_BUMPMAP
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
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Xd=`#define PI 3.141592653589793
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
} // validated`,$d=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yd=`vec3 transformedNormal = objectNormal;
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
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tf=`#ifdef USE_ENVMAP
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
#endif`,ef=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nf=`#ifdef USE_ENVMAP
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
#endif`,sf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rf=`#ifdef USE_ENVMAP
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
#endif`,of=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hf=`#ifdef USE_GRADIENTMAP
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
}`,uf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pf=`uniform bool receiveShadow;
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
#endif`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_f=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vf=`PhysicalMaterial material;
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
#endif`,Mf=`struct PhysicalMaterial {
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
}`,bf=`
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
#endif`,wf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ef=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Af=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,If=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Lf=`#if defined( USE_POINTS_UV )
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
#endif`,Df=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Uf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Of=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ff=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bf=`#ifdef USE_MORPHTARGETS
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
#endif`,zf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Hf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xf=`#ifdef USE_NORMALMAP
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
#endif`,$f=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ep=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,np=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,op=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ap=`float getShadowMask() {
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
}`,cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lp=`#ifdef USE_SKINNING
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
#endif`,hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,up=`#ifdef USE_SKINNING
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
#endif`,dp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gp=`#ifdef USE_TRANSMISSION
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
#endif`,xp=`#ifdef USE_TRANSMISSION
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,bp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wp=`uniform sampler2D t2D;
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
}`,Sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rp=`#include <common>
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
}`,Cp=`#if DEPTH_PACKING == 3200
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
}`,Ip=`#define DISTANCE
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
}`,Pp=`#define DISTANCE
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
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`uniform float scale;
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
}`,Np=`uniform vec3 diffuse;
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
}`,Op=`#include <common>
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
}`,Fp=`uniform vec3 diffuse;
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
}`,Bp=`#define LAMBERT
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
}`,zp=`#define LAMBERT
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
}`,kp=`#define MATCAP
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
}`,Hp=`#define MATCAP
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
}`,Vp=`#define NORMAL
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
}`,Gp=`#define NORMAL
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
}`,Wp=`#define PHONG
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
}`,Xp=`#define PHONG
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
}`,$p=`#define STANDARD
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
}`,Yp=`#define STANDARD
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
}`,qp=`#define TOON
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
}`,Zp=`#define TOON
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
}`,Jp=`uniform float size;
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
}`,Kp=`uniform vec3 diffuse;
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
}`,jp=`#include <common>
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
}`,Qp=`uniform vec3 color;
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
}`,tm=`uniform float rotation;
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
}`,em=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:bd,alphahash_pars_fragment:wd,alphamap_fragment:Sd,alphamap_pars_fragment:Ed,alphatest_fragment:Td,alphatest_pars_fragment:Ad,aomap_fragment:Rd,aomap_pars_fragment:Cd,batching_pars_vertex:Id,batching_vertex:Pd,begin_vertex:Ld,beginnormal_vertex:Dd,bsdfs:Ud,iridescence_fragment:Nd,bumpmap_pars_fragment:Od,clipping_planes_fragment:Fd,clipping_planes_pars_fragment:Bd,clipping_planes_pars_vertex:zd,clipping_planes_vertex:kd,color_fragment:Hd,color_pars_fragment:Vd,color_pars_vertex:Gd,color_vertex:Wd,common:Xd,cube_uv_reflection_fragment:$d,defaultnormal_vertex:Yd,displacementmap_pars_vertex:qd,displacementmap_vertex:Zd,emissivemap_fragment:Jd,emissivemap_pars_fragment:Kd,colorspace_fragment:jd,colorspace_pars_fragment:Qd,envmap_fragment:tf,envmap_common_pars_fragment:ef,envmap_pars_fragment:nf,envmap_pars_vertex:sf,envmap_physical_pars_fragment:mf,envmap_vertex:rf,fog_vertex:of,fog_pars_vertex:af,fog_fragment:cf,fog_pars_fragment:lf,gradientmap_pars_fragment:hf,lightmap_pars_fragment:uf,lights_lambert_fragment:df,lights_lambert_pars_fragment:ff,lights_pars_begin:pf,lights_toon_fragment:gf,lights_toon_pars_fragment:xf,lights_phong_fragment:_f,lights_phong_pars_fragment:yf,lights_physical_fragment:vf,lights_physical_pars_fragment:Mf,lights_fragment_begin:bf,lights_fragment_maps:wf,lights_fragment_end:Sf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:Tf,logdepthbuf_pars_vertex:Af,logdepthbuf_vertex:Rf,map_fragment:Cf,map_pars_fragment:If,map_particle_fragment:Pf,map_particle_pars_fragment:Lf,metalnessmap_fragment:Df,metalnessmap_pars_fragment:Uf,morphinstance_vertex:Nf,morphcolor_vertex:Of,morphnormal_vertex:Ff,morphtarget_pars_vertex:Bf,morphtarget_vertex:zf,normal_fragment_begin:kf,normal_fragment_maps:Hf,normal_pars_fragment:Vf,normal_pars_vertex:Gf,normal_vertex:Wf,normalmap_pars_fragment:Xf,clearcoat_normal_fragment_begin:$f,clearcoat_normal_fragment_maps:Yf,clearcoat_pars_fragment:qf,iridescence_pars_fragment:Zf,opaque_fragment:Jf,packing:Kf,premultiplied_alpha_fragment:jf,project_vertex:Qf,dithering_fragment:tp,dithering_pars_fragment:ep,roughnessmap_fragment:np,roughnessmap_pars_fragment:ip,shadowmap_pars_fragment:sp,shadowmap_pars_vertex:rp,shadowmap_vertex:op,shadowmask_pars_fragment:ap,skinbase_vertex:cp,skinning_pars_vertex:lp,skinning_vertex:hp,skinnormal_vertex:up,specularmap_fragment:dp,specularmap_pars_fragment:fp,tonemapping_fragment:pp,tonemapping_pars_fragment:mp,transmission_fragment:gp,transmission_pars_fragment:xp,uv_pars_fragment:_p,uv_pars_vertex:yp,uv_vertex:vp,worldpos_vertex:Mp,background_vert:bp,background_frag:wp,backgroundCube_vert:Sp,backgroundCube_frag:Ep,cube_vert:Tp,cube_frag:Ap,depth_vert:Rp,depth_frag:Cp,distanceRGBA_vert:Ip,distanceRGBA_frag:Pp,equirect_vert:Lp,equirect_frag:Dp,linedashed_vert:Up,linedashed_frag:Np,meshbasic_vert:Op,meshbasic_frag:Fp,meshlambert_vert:Bp,meshlambert_frag:zp,meshmatcap_vert:kp,meshmatcap_frag:Hp,meshnormal_vert:Vp,meshnormal_frag:Gp,meshphong_vert:Wp,meshphong_frag:Xp,meshphysical_vert:$p,meshphysical_frag:Yp,meshtoon_vert:qp,meshtoon_frag:Zp,points_vert:Jp,points_frag:Kp,shadow_vert:jp,shadow_frag:Qp,sprite_vert:tm,sprite_frag:em},ct={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},on={basic:{uniforms:De([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:De([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:De([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:De([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:De([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:De([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:De([ct.points,ct.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:De([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:De([ct.common,ct.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:De([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:De([ct.sprite,ct.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:De([ct.common,ct.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:De([ct.lights,ct.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};on.physical={uniforms:De([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var nr={r:0,b:0,g:0},ri=new Ze,nm=new ee;function im(s,t,e,n,i,r,o){let a=new Tt(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(S){let T=S.isScene===!0?S.background:null;return T&&T.isTexture&&(T=(S.backgroundBlurriness>0?e:t).get(T)),T}function x(S){let T=!1,M=g(S);M===null?p(a,c):M&&M.isColor&&(p(M,1),T=!0);let U=s.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,o):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(S,T){let M=g(T);M&&(M.isCubeTexture||M.mapping===Zr)?(h===void 0&&(h=new gt(new qt(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:Yi(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(U,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ri.copy(T.backgroundRotation),ri.x*=-1,ri.y*=-1,ri.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(nm.makeRotationFromEuler(ri)),h.material.toneMapped=jt.getTransfer(M.colorSpace)!==oe,(u!==M||d!==M.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=M,d=M.version,f=s.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new gt(new Re(2,2),new un({name:"BackgroundMaterial",uniforms:Yi(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=jt.getTransfer(M.colorSpace)!==oe,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=M,d=M.version,f=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,T){S.getRGB(nr,Ch(s)),n.buffers.color.setClear(nr.r,nr.g,nr.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),c=T,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:x,addToRenderList:m}}function sm(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(b,L,k,z,W){let Q=!1,Y=u(z,k,L);r!==Y&&(r=Y,l(r.object)),Q=f(b,z,k,W),Q&&g(b,z,k,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,M(b,L,k,z),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return s.createVertexArray()}function l(b){return s.bindVertexArray(b)}function h(b){return s.deleteVertexArray(b)}function u(b,L,k){let z=k.wireframe===!0,W=n[b.id];W===void 0&&(W={},n[b.id]=W);let Q=W[L.id];Q===void 0&&(Q={},W[L.id]=Q);let Y=Q[z];return Y===void 0&&(Y=d(c()),Q[z]=Y),Y}function d(b){let L=[],k=[],z=[];for(let W=0;W<e;W++)L[W]=0,k[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:k,attributeDivisors:z,object:b,attributes:{},index:null}}function f(b,L,k,z){let W=r.attributes,Q=L.attributes,Y=0,et=k.getAttributes();for(let X in et)if(et[X].location>=0){let mt=W[X],At=Q[X];if(At===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(At=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(At=b.instanceColor)),mt===void 0||mt.attribute!==At||At&&mt.data!==At.data)return!0;Y++}return r.attributesNum!==Y||r.index!==z}function g(b,L,k,z){let W={},Q=L.attributes,Y=0,et=k.getAttributes();for(let X in et)if(et[X].location>=0){let mt=Q[X];mt===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(mt=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(mt=b.instanceColor));let At={};At.attribute=mt,mt&&mt.data&&(At.data=mt.data),W[X]=At,Y++}r.attributes=W,r.attributesNum=Y,r.index=z}function x(){let b=r.newAttributes;for(let L=0,k=b.length;L<k;L++)b[L]=0}function m(b){p(b,0)}function p(b,L){let k=r.newAttributes,z=r.enabledAttributes,W=r.attributeDivisors;k[b]=1,z[b]===0&&(s.enableVertexAttribArray(b),z[b]=1),W[b]!==L&&(s.vertexAttribDivisor(b,L),W[b]=L)}function S(){let b=r.newAttributes,L=r.enabledAttributes;for(let k=0,z=L.length;k<z;k++)L[k]!==b[k]&&(s.disableVertexAttribArray(k),L[k]=0)}function T(b,L,k,z,W,Q,Y){Y===!0?s.vertexAttribIPointer(b,L,k,W,Q):s.vertexAttribPointer(b,L,k,z,W,Q)}function M(b,L,k,z){x();let W=z.attributes,Q=k.getAttributes(),Y=L.defaultAttributeValues;for(let et in Q){let X=Q[et];if(X.location>=0){let lt=W[et];if(lt===void 0&&(et==="instanceMatrix"&&b.instanceMatrix&&(lt=b.instanceMatrix),et==="instanceColor"&&b.instanceColor&&(lt=b.instanceColor)),lt!==void 0){let mt=lt.normalized,At=lt.itemSize,Gt=t.get(lt);if(Gt===void 0)continue;let Qt=Gt.buffer,Z=Gt.type,y=Gt.bytesPerElement,G=Z===s.INT||Z===s.UNSIGNED_INT||lt.gpuType===Ac;if(lt.isInterleavedBufferAttribute){let q=lt.data,rt=q.stride,ot=lt.offset;if(q.isInstancedInterleavedBuffer){for(let Rt=0;Rt<X.locationSize;Rt++)p(X.location+Rt,q.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Rt=0;Rt<X.locationSize;Rt++)m(X.location+Rt);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let Rt=0;Rt<X.locationSize;Rt++)T(X.location+Rt,At/X.locationSize,Z,mt,rt*y,(ot+At/X.locationSize*Rt)*y,G)}else{if(lt.isInstancedBufferAttribute){for(let q=0;q<X.locationSize;q++)p(X.location+q,lt.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let q=0;q<X.locationSize;q++)m(X.location+q);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let q=0;q<X.locationSize;q++)T(X.location+q,At/X.locationSize,Z,mt,At*y,At/X.locationSize*q*y,G)}}else if(Y!==void 0){let mt=Y[et];if(mt!==void 0)switch(mt.length){case 2:s.vertexAttrib2fv(X.location,mt);break;case 3:s.vertexAttrib3fv(X.location,mt);break;case 4:s.vertexAttrib4fv(X.location,mt);break;default:s.vertexAttrib1fv(X.location,mt)}}}}S()}function U(){P();for(let b in n){let L=n[b];for(let k in L){let z=L[k];for(let W in z)h(z[W].object),delete z[W];delete L[k]}delete n[b]}}function R(b){if(n[b.id]===void 0)return;let L=n[b.id];for(let k in L){let z=L[k];for(let W in z)h(z[W].object),delete z[W];delete L[k]}delete n[b.id]}function C(b){for(let L in n){let k=n[L];if(k[b.id]===void 0)continue;let z=k[b.id];for(let W in z)h(z[W].object),delete z[W];delete k[b.id]}}function P(){E(),o=!0,r!==i&&(r=i,l(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:E,dispose:U,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function rm(s,t,e){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function om(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==nn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let P=C===Ls&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Tn&&n.convert(C)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ln&&!P)}function c(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),U=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:M,vertexTextures:U,maxSamples:R}}function am(s){let t=this,e=null,n=0,i=!1,r=!1,o=new bn,a=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{let S=r?0:n,T=S*4,M=p.clippingState||null;c.value=M,M=h(g,d,T,f);for(let U=0;U!==T;++U)M[U]=e[U];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,M=f;T!==x;++T,M+=4)o.copy(u[T]).applyMatrix4(S,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function cm(s){let t=new WeakMap;function e(o,a){return a===ca?o.mapping=Gi:a===la&&(o.mapping=Wi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===ca||a===la)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Wa(c.height);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Pr=class extends Cr{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Fi=4,Il=[.125,.215,.35,.446,.526,.582],li=20,ko=new Pr,Pl=new Tt,Ho=null,Vo=0,Go=0,Wo=!1,ai=(1+Math.sqrt(5))/2,Pi=1/ai,Ll=[new I(-ai,Pi,0),new I(ai,Pi,0),new I(-Pi,0,ai),new I(Pi,0,ai),new I(0,ai,-Pi),new I(0,ai,Pi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Lr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ho,Vo,Go),this._renderer.xr.enabled=Wo,t.scissorTest=!1,ir(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Gi||t.mapping===Wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ho=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Wo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Ls,format:nn,colorSpace:Ki,depthBuffer:!1},i=Dl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dl(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lm(r)),this._blurMaterial=hm(r,t,e)}return i}_compileMaterial(t){let e=new gt(this._lodPlanes[0],t);this._renderer.compile(e,ko)}_sceneToCubeUV(t,e,n,i){let a=new Me(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Pl),h.toneMapping=Gn,h.autoClear=!1;let f=new ve({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),g=new gt(new qt,f),x=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Pl),x=!0);for(let p=0;p<6;p++){let S=p%3;S===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):S===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let T=this._cubeSize;ir(i,S*T,p>2?T:0,T,T),h.setRenderTarget(i),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Gi||t.mapping===Wi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new gt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;ir(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,ko)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ll[(i-r-1)%Ll.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new gt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*li-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):li;m>li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${li}`);let p=[],S=0;for(let C=0;C<li;++C){let P=C/x,E=Math.exp(-P*P/2);p.push(E),C===0?S+=E:C<m&&(S+=2*E)}for(let C=0;C<p.length;C++)p[C]=p[C]/S;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:T}=this;d.dTheta.value=g,d.mipInt.value=T-n;let M=this._sizeLods[i],U=3*M*(i>T-Fi?i-T+Fi:0),R=4*(this._cubeSize-M);ir(e,U,R,3*M,2*M),c.setRenderTarget(e),c.render(u,ko)}};function lm(s){let t=[],e=[],n=[],i=s,r=s-Fi+1+Il.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);e.push(a);let c=1/a;o>s-Fi?c=Il[o-s+Fi-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,S=new Float32Array(x*g*f),T=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let R=0;R<f;R++){let C=R%3*2/3-1,P=R>2?0:-1,E=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];S.set(E,x*g*R),T.set(d,m*g*R);let b=[R,R,R,R,R,R];M.set(b,p*g*R)}let U=new ge;U.setAttribute("position",new be(S,x)),U.setAttribute("uv",new be(T,m)),U.setAttribute("faceIndex",new be(M,p)),t.push(U),i>Fi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Dl(s,t,e){let n=new An(s,t,e);return n.texture.mapping=Zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ir(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function hm(s,t,e){let n=new Float32Array(li),i=new I(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ul(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Nl(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Uc(){return`

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
	`}function um(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ca||c===la,h=c===Gi||c===Wi;if(l||h){let u=t.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Lr(s)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Lr(s)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function dm(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&ps("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function fm(s,t,e,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let g in d.attributes)t.remove(d.attributes[g]);for(let g in d.morphAttributes){let x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)t.update(d[g],s.ARRAY_BUFFER);let f=u.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)t.update(x[m],s.ARRAY_BUFFER)}}function l(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let S=f.array;x=f.version;for(let T=0,M=S.length;T<M;T+=3){let U=S[T+0],R=S[T+1],C=S[T+2];d.push(U,R,R,C,C,U)}}else if(g!==void 0){let S=g.array;x=g.version;for(let T=0,M=S.length/3-1;T<M;T+=3){let U=T+0,R=T+1,C=T+2;d.push(U,R,R,C,C,U)}}else return;let m=new(Ah(d)?Rr:Ar)(d,1);m.version=x;let p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function pm(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*x[S];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function mm(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function gm(s,t,e){let n=new WeakMap,i=new _e;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let E=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],T=0;f===!0&&(T=1),g===!0&&(T=2),x===!0&&(T=3);let M=a.attributes.position.count*T,U=1;M>t.maxTextureSize&&(U=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let R=new Float32Array(M*U*4*u),C=new Tr(R,M,U,u);C.type=ln,C.needsUpdate=!0;let P=T*4;for(let b=0;b<u;b++){let L=m[b],k=p[b],z=S[b],W=M*U*4*b;for(let Q=0;Q<L.count;Q++){let Y=Q*P;f===!0&&(i.fromBufferAttribute(L,Q),R[W+Y+0]=i.x,R[W+Y+1]=i.y,R[W+Y+2]=i.z,R[W+Y+3]=0),g===!0&&(i.fromBufferAttribute(k,Q),R[W+Y+4]=i.x,R[W+Y+5]=i.y,R[W+Y+6]=i.z,R[W+Y+7]=0),x===!0&&(i.fromBufferAttribute(z,Q),R[W+Y+8]=i.x,R[W+Y+9]=i.y,R[W+Y+10]=i.z,R[W+Y+11]=z.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new at(M,U)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",g),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function xm(s,t,e,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Dr=class extends ze{constructor(t,e,n,i,r,o,a,c,l,h=zi){if(h!==zi&&h!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===zi&&(n=di),n===void 0&&h===$i&&(n=Xi),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Xe,this.minFilter=c!==void 0?c:Xe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Ph=new ze,Ol=new Dr(1,1),Lh=new Tr,Dh=new Va,Uh=new Ir,Fl=[],Bl=[],zl=new Float32Array(16),kl=new Float32Array(9),Hl=new Float32Array(4);function ji(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=Fl[i];if(r===void 0&&(r=new Float32Array(i),Fl[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function we(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Kr(s,t){let e=Bl[t];e===void 0&&(e=new Int32Array(t),Bl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function _m(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ym(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function vm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function Mm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function bm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(we(e,n))return;Hl.set(n),s.uniformMatrix2fv(this.addr,!1,Hl),Se(e,n)}}function wm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(we(e,n))return;kl.set(n),s.uniformMatrix3fv(this.addr,!1,kl),Se(e,n)}}function Sm(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(we(e,n))return;zl.set(n),s.uniformMatrix4fv(this.addr,!1,zl),Se(e,n)}}function Em(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Tm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function Am(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function Rm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function Cm(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Im(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function Pm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function Lm(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function Dm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ol.compareFunction=Th,r=Ol):r=Ph,e.setTexture2D(t||r,i)}function Um(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Dh,i)}function Nm(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Uh,i)}function Om(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Lh,i)}function Fm(s){switch(s){case 5126:return _m;case 35664:return ym;case 35665:return vm;case 35666:return Mm;case 35674:return bm;case 35675:return wm;case 35676:return Sm;case 5124:case 35670:return Em;case 35667:case 35671:return Tm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Im;case 36295:return Pm;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Nm;case 36289:case 36303:case 36311:case 36292:return Om}}function Bm(s,t){s.uniform1fv(this.addr,t)}function zm(s,t){let e=ji(t,this.size,2);s.uniform2fv(this.addr,e)}function km(s,t){let e=ji(t,this.size,3);s.uniform3fv(this.addr,e)}function Hm(s,t){let e=ji(t,this.size,4);s.uniform4fv(this.addr,e)}function Vm(s,t){let e=ji(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Gm(s,t){let e=ji(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Wm(s,t){let e=ji(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Xm(s,t){s.uniform1iv(this.addr,t)}function $m(s,t){s.uniform2iv(this.addr,t)}function Ym(s,t){s.uniform3iv(this.addr,t)}function qm(s,t){s.uniform4iv(this.addr,t)}function Zm(s,t){s.uniform1uiv(this.addr,t)}function Jm(s,t){s.uniform2uiv(this.addr,t)}function Km(s,t){s.uniform3uiv(this.addr,t)}function jm(s,t){s.uniform4uiv(this.addr,t)}function Qm(s,t,e){let n=this.cache,i=t.length,r=Kr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Ph,r[o])}function tg(s,t,e){let n=this.cache,i=t.length,r=Kr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Dh,r[o])}function eg(s,t,e){let n=this.cache,i=t.length,r=Kr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Uh,r[o])}function ng(s,t,e){let n=this.cache,i=t.length,r=Kr(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Lh,r[o])}function ig(s){switch(s){case 5126:return Bm;case 35664:return zm;case 35665:return km;case 35666:return Hm;case 35674:return Vm;case 35675:return Gm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return $m;case 35668:case 35672:return Ym;case 35669:case 35673:return qm;case 5125:return Zm;case 36294:return Jm;case 36295:return Km;case 36296:return jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return eg;case 36289:case 36303:case 36311:case 36292:return ng}}var Xa=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Fm(e.type)}},$a=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ig(e.type)}},Ya=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},Xo=/(\w+)(\])?(\[|\.)?/g;function Vl(s,t){s.seq.push(t),s.map[t.id]=t}function sg(s,t,e){let n=s.name,i=n.length;for(Xo.lastIndex=0;;){let r=Xo.exec(n),o=Xo.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Vl(e,l===void 0?new Xa(a,s,t):new $a(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Ya(a),Vl(e,u)),e=u}}}var Hi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);sg(r,o,this)}}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function Gl(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var rg=37297,og=0;function ag(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var Wl=new kt;function cg(s){jt._getMatrix(Wl,jt.workingColorSpace,s);let t=`mat3( ${Wl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case Jr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Xl(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+ag(s.getShaderSource(t),o)}else return i}function lg(s,t){let e=cg(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function hg(s,t){let e;switch(t){case Uu:e="Linear";break;case Nu:e="Reinhard";break;case Ou:e="Cineon";break;case Fu:e="ACESFilmic";break;case zu:e="AgX";break;case ku:e="Neutral";break;case Bu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var sr=new I;function ug(){jt.getLuminanceCoefficients(sr);let s=sr.x.toFixed(4),t=sr.y.toFixed(4),e=sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ms).join(`
`)}function fg(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function pg(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function ms(s){return s!==""}function $l(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function qa(s){return s.replace(mg,xg)}var gg=new Map;function xg(s,t){let e=Vt[t];if(e===void 0){let n=gg.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return qa(e)}var _g=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ql(s){return s.replace(_g,yg)}function yg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Zl(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function vg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ph?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===fu?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Mn&&(t="SHADOWMAP_TYPE_VSM"),t}function Mg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Gi:case Wi:t="ENVMAP_TYPE_CUBE";break;case Zr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Wi:t="ENVMAP_MODE_REFRACTION";break}return t}function wg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Tc:t="ENVMAP_BLENDING_MULTIPLY";break;case Lu:t="ENVMAP_BLENDING_MIX";break;case Du:t="ENVMAP_BLENDING_ADD";break}return t}function Sg(s){let t=s.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Eg(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=vg(e),l=Mg(e),h=bg(e),u=wg(e),d=Sg(e),f=dg(e),g=fg(r),x=i.createProgram(),m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ms).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ms).join(`
`),p.length>0&&(p+=`
`)):(m=[Zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ms).join(`
`),p=[Zl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Gn?hg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,lg("linearToOutputTexel",e.outputColorSpace),ug(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ms).join(`
`)),o=qa(o),o=$l(o,e),o=Yl(o,e),a=qa(a),a=$l(a,e),a=Yl(a,e),o=ql(o),a=ql(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let T=S+m+o,M=S+p+a,U=Gl(i,i.VERTEX_SHADER,T),R=Gl(i,i.FRAGMENT_SHADER,M);i.attachShader(x,U),i.attachShader(x,R),e.index0AttributeName!==void 0?i.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(x,0,"position"),i.linkProgram(x);function C(L){if(s.debug.checkShaderErrors){let k=i.getProgramInfoLog(x).trim(),z=i.getShaderInfoLog(U).trim(),W=i.getShaderInfoLog(R).trim(),Q=!0,Y=!0;if(i.getProgramParameter(x,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,x,U,R);else{let et=Xl(i,U,"vertex"),X=Xl(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(x,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+et+`
`+X)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(z===""||W==="")&&(Y=!1);Y&&(L.diagnostics={runnable:Q,programLog:k,vertexShader:{log:z,prefix:m},fragmentShader:{log:W,prefix:p}})}i.deleteShader(U),i.deleteShader(R),P=new Hi(i,x),E=pg(i,x)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(x,rg)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=og++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=U,this.fragmentShader=R,this}var Tg=0,Za=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ja(t),e.set(t,n)),n}},Ja=class{constructor(t){this.id=Tg++,this.code=t,this.usedTimes=0}};function Ag(s,t,e,n,i,r,o){let a=new bs,c=new Za,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,b,L,k,z){let W=k.fog,Q=z.geometry,Y=E.isMeshStandardMaterial?k.environment:null,et=(E.isMeshStandardMaterial?e:t).get(E.envMap||Y),X=et&&et.mapping===Zr?et.image.height:null,lt=g[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let mt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,At=mt!==void 0?mt.length:0,Gt=0;Q.morphAttributes.position!==void 0&&(Gt=1),Q.morphAttributes.normal!==void 0&&(Gt=2),Q.morphAttributes.color!==void 0&&(Gt=3);let Qt,Z,y,G;if(lt){let re=on[lt];Qt=re.vertexShader,Z=re.fragmentShader}else Qt=E.vertexShader,Z=E.fragmentShader,c.update(E),y=c.getVertexShaderID(E),G=c.getFragmentShaderID(E);let q=s.getRenderTarget(),rt=s.state.buffers.depth.getReversed(),ot=z.isInstancedMesh===!0,Rt=z.isBatchedMesh===!0,Ct=!!E.map,It=!!E.matcap,Wt=!!et,D=!!E.aoMap,me=!!E.lightMap,Xt=!!E.bumpMap,Zt=!!E.normalMap,Lt=!!E.displacementMap,he=!!E.emissiveMap,Pt=!!E.metalnessMap,A=!!E.roughnessMap,v=E.anisotropy>0,B=E.clearcoat>0,K=E.dispersion>0,tt=E.iridescence>0,J=E.sheen>0,St=E.transmission>0,ut=v&&!!E.anisotropyMap,xt=B&&!!E.clearcoatMap,Kt=B&&!!E.clearcoatNormalMap,nt=B&&!!E.clearcoatRoughnessMap,_t=tt&&!!E.iridescenceMap,Ut=tt&&!!E.iridescenceThicknessMap,Nt=J&&!!E.sheenColorMap,yt=J&&!!E.sheenRoughnessMap,Jt=!!E.specularMap,Ht=!!E.specularColorMap,ce=!!E.specularIntensityMap,N=St&&!!E.transmissionMap,ht=St&&!!E.thicknessMap,$=!!E.gradientMap,j=!!E.alphaMap,pt=E.alphaTest>0,dt=!!E.alphaHash,Bt=!!E.extensions,xe=Gn;E.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(xe=s.toneMapping);let Ce={shaderID:lt,shaderType:E.type,shaderName:E.name,vertexShader:Qt,fragmentShader:Z,defines:E.defines,customVertexShaderID:y,customFragmentShaderID:G,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Rt,batchingColor:Rt&&z._colorsTexture!==null,instancing:ot,instancingColor:ot&&z.instanceColor!==null,instancingMorph:ot&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:q===null?s.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ki,alphaToCoverage:!!E.alphaToCoverage,map:Ct,matcap:It,envMap:Wt,envMapMode:Wt&&et.mapping,envMapCubeUVHeight:X,aoMap:D,lightMap:me,bumpMap:Xt,normalMap:Zt,displacementMap:d&&Lt,emissiveMap:he,normalMapObjectSpace:Zt&&E.normalMapType===Wu,normalMapTangentSpace:Zt&&E.normalMapType===Eh,metalnessMap:Pt,roughnessMap:A,anisotropy:v,anisotropyMap:ut,clearcoat:B,clearcoatMap:xt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:nt,dispersion:K,iridescence:tt,iridescenceMap:_t,iridescenceThicknessMap:Ut,sheen:J,sheenColorMap:Nt,sheenRoughnessMap:yt,specularMap:Jt,specularColorMap:Ht,specularIntensityMap:ce,transmission:St,transmissionMap:N,thicknessMap:ht,gradientMap:$,opaque:E.transparent===!1&&E.blending===Bi&&E.alphaToCoverage===!1,alphaMap:j,alphaTest:pt,alphaHash:dt,combine:E.combine,mapUv:Ct&&x(E.map.channel),aoMapUv:D&&x(E.aoMap.channel),lightMapUv:me&&x(E.lightMap.channel),bumpMapUv:Xt&&x(E.bumpMap.channel),normalMapUv:Zt&&x(E.normalMap.channel),displacementMapUv:Lt&&x(E.displacementMap.channel),emissiveMapUv:he&&x(E.emissiveMap.channel),metalnessMapUv:Pt&&x(E.metalnessMap.channel),roughnessMapUv:A&&x(E.roughnessMap.channel),anisotropyMapUv:ut&&x(E.anisotropyMap.channel),clearcoatMapUv:xt&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:yt&&x(E.sheenRoughnessMap.channel),specularMapUv:Jt&&x(E.specularMap.channel),specularColorMapUv:Ht&&x(E.specularColorMap.channel),specularIntensityMapUv:ce&&x(E.specularIntensityMap.channel),transmissionMapUv:N&&x(E.transmissionMap.channel),thicknessMapUv:ht&&x(E.thicknessMap.channel),alphaMapUv:j&&x(E.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Zt||v),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Q.attributes.uv&&(Ct||j),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:rt,skinning:z.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Gt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:xe,decodeVideoTexture:Ct&&E.map.isVideoTexture===!0&&jt.getTransfer(E.map.colorSpace)===oe,decodeVideoTextureEmissive:he&&E.emissiveMap.isVideoTexture===!0&&jt.getTransfer(E.emissiveMap.colorSpace)===oe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===We,flipSided:E.side===Be,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Bt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&E.extensions.multiDraw===!0||Rt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function p(E){let b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(let L in E.defines)b.push(L),b.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(S(b,E),T(b,E),b.push(s.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function S(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function T(E,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),E.push(a.mask)}function M(E){let b=g[E.type],L;if(b){let k=on[b];L=gd.clone(k.uniforms)}else L=E.uniforms;return L}function U(E,b){let L;for(let k=0,z=h.length;k<z;k++){let W=h[k];if(W.cacheKey===b){L=W,++L.usedTimes;break}}return L===void 0&&(L=new Eg(s,b,E,r),h.push(L)),L}function R(E){if(--E.usedTimes===0){let b=h.indexOf(E);h[b]=h[h.length-1],h.pop(),E.destroy()}}function C(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:U,releaseProgram:R,releaseShaderCache:C,programs:h,dispose:P}}function Rg(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Cg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Jl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Kl(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,g,x,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Cg),n.length>1&&n.sort(d||Jl),i.length>1&&i.sort(d||Jl)}function h(){for(let u=t,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function Ig(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new Kl,s.set(n,[o])):i>=r.length?(o=new Kl,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Pg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Tt};break;case"SpotLight":e={position:new I,direction:new I,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":e={color:new Tt,position:new I,halfWidth:new I,halfHeight:new I};break}return s[t.id]=e,e}}}function Lg(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Dg=0;function Ug(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ng(s){let t=new Pg,e=Lg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);let i=new I,r=new ee,o=new ee;function a(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,S=0,T=0,M=0,U=0,R=0,C=0;l.sort(Ug);for(let E=0,b=l.length;E<b;E++){let L=l[E],k=L.color,z=L.intensity,W=L.distance,Q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=k.r*z,u+=k.g*z,d+=k.b*z;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],z);C++}else if(L.isDirectionalLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let et=L.shadow,X=e.get(L);X.shadowIntensity=et.intensity,X.shadowBias=et.bias,X.shadowNormalBias=et.normalBias,X.shadowRadius=et.radius,X.shadowMapSize=et.mapSize,n.directionalShadow[f]=X,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=L.shadow.matrix,S++}n.directional[f]=Y,f++}else if(L.isSpotLight){let Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(k).multiplyScalar(z),Y.distance=W,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[x]=Y;let et=L.shadow;if(L.map&&(n.spotLightMap[U]=L.map,U++,et.updateMatrices(L),L.castShadow&&R++),n.spotLightMatrix[x]=et.matrix,L.castShadow){let X=e.get(L);X.shadowIntensity=et.intensity,X.shadowBias=et.bias,X.shadowNormalBias=et.normalBias,X.shadowRadius=et.radius,X.shadowMapSize=et.mapSize,n.spotShadow[x]=X,n.spotShadowMap[x]=Q,M++}x++}else if(L.isRectAreaLight){let Y=t.get(L);Y.color.copy(k).multiplyScalar(z),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=Y,m++}else if(L.isPointLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){let et=L.shadow,X=e.get(L);X.shadowIntensity=et.intensity,X.shadowBias=et.bias,X.shadowNormalBias=et.normalBias,X.shadowRadius=et.radius,X.shadowMapSize=et.mapSize,X.shadowCameraNear=et.camera.near,X.shadowCameraFar=et.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=Q,n.pointShadowMatrix[g]=L.shadow.matrix,T++}n.point[g]=Y,g++}else if(L.isHemisphereLight){let Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(z),Y.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=Y,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.directionalLength!==f||P.pointLength!==g||P.spotLength!==x||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==S||P.numPointShadows!==T||P.numSpotShadows!==M||P.numSpotMaps!==U||P.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=M+U-R,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,P.directionalLength=f,P.pointLength=g,P.spotLength=x,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=S,P.numPointShadows=T,P.numSpotShadows=M,P.numSpotMaps=U,P.numLightProbes=C,n.version=Dg++)}function c(l,h){let u=0,d=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){let T=l[p];if(T.isDirectionalLight){let M=n.directional[u];M.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),u++}else if(T.isSpotLight){let M=n.spot[f];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),f++}else if(T.isRectAreaLight){let M=n.rectArea[g];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){let M=n.point[d];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){let M=n.hemi[x];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function jl(s){let t=new Ng(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Og(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new jl(s),t.set(i,[a])):r>=o.length?(a=new jl(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Ka=class extends Cn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ja=class extends Cn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Fg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bg=`uniform sampler2D shadow_pass;
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
}`;function zg(s,t,e){let n=new ws,i=new at,r=new at,o=new _e,a=new Ka({depthPacking:Gu}),c=new ja,l={},h=e.maxTextureSize,u={[hn]:Be,[Be]:hn,[We]:We},d=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:Fg,fragmentShader:Bg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new ge;g.setAttribute("position",new be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new gt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ph;let p=this.type;this.render=function(R,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let E=s.getRenderTarget(),b=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Vn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let z=p!==Mn&&this.type===Mn,W=p===Mn&&this.type!==Mn;for(let Q=0,Y=R.length;Q<Y;Q++){let et=R[Q],X=et.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);let lt=X.getFrameExtents();if(i.multiply(lt),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/lt.x),i.x=r.x*lt.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/lt.y),i.y=r.y*lt.y,X.mapSize.y=r.y)),X.map===null||z===!0||W===!0){let At=this.type!==Mn?{minFilter:Xe,magFilter:Xe}:{};X.map!==null&&X.map.dispose(),X.map=new An(i.x,i.y,At),X.map.texture.name=et.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();let mt=X.getViewportCount();for(let At=0;At<mt;At++){let Gt=X.getViewport(At);o.set(r.x*Gt.x,r.y*Gt.y,r.x*Gt.z,r.y*Gt.w),k.viewport(o),X.updateMatrices(et,At),n=X.getFrustum(),M(C,P,X.camera,et,this.type)}X.isPointLightShadow!==!0&&this.type===Mn&&S(X,P),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(E,b,L)};function S(R,C){let P=t.update(x);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new An(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(C,null,P,d,x,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(C,null,P,f,x,null)}function T(R,C,P,E){let b=null,L=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)b=L;else if(b=P.isPointLight===!0?c:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let k=b.uuid,z=C.uuid,W=l[k];W===void 0&&(W={},l[k]=W);let Q=W[z];Q===void 0&&(Q=b.clone(),W[z]=Q,C.addEventListener("dispose",U)),b=Q}if(b.visible=C.visible,b.wireframe=C.wireframe,E===Mn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:u[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){let k=s.properties.get(b);k.light=P}return b}function M(R,C,P,E,b){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&b===Mn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);let z=t.update(R),W=R.material;if(Array.isArray(W)){let Q=z.groups;for(let Y=0,et=Q.length;Y<et;Y++){let X=Q[Y],lt=W[X.materialIndex];if(lt&&lt.visible){let mt=T(R,lt,E,b);R.onBeforeShadow(s,R,C,P,z,mt,X),s.renderBufferDirect(P,null,z,mt,R,X),R.onAfterShadow(s,R,C,P,z,mt,X)}}}else if(W.visible){let Q=T(R,W,E,b);R.onBeforeShadow(s,R,C,P,z,Q,null),s.renderBufferDirect(P,null,z,Q,R,null),R.onAfterShadow(s,R,C,P,z,Q,null)}}let k=R.children;for(let z=0,W=k.length;z<W;z++)M(k[z],C,P,E,b)}function U(R){R.target.removeEventListener("dispose",U);for(let P in l){let E=l[P],b=R.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}var kg={[ea]:na,[ia]:oa,[sa]:aa,[Vi]:ra,[na]:ea,[oa]:ia,[aa]:sa,[ra]:Vi};function Hg(s,t){function e(){let N=!1,ht=new _e,$=null,j=new _e(0,0,0,0);return{setMask:function(pt){$!==pt&&!N&&(s.colorMask(pt,pt,pt,pt),$=pt)},setLocked:function(pt){N=pt},setClear:function(pt,dt,Bt,xe,Ce){Ce===!0&&(pt*=xe,dt*=xe,Bt*=xe),ht.set(pt,dt,Bt,xe),j.equals(ht)===!1&&(s.clearColor(pt,dt,Bt,xe),j.copy(ht))},reset:function(){N=!1,$=null,j.set(-1,0,0,0)}}}function n(){let N=!1,ht=!1,$=null,j=null,pt=null;return{setReversed:function(dt){if(ht!==dt){let Bt=t.get("EXT_clip_control");ht?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);let xe=pt;pt=null,this.setClear(xe)}ht=dt},getReversed:function(){return ht},setTest:function(dt){dt?q(s.DEPTH_TEST):rt(s.DEPTH_TEST)},setMask:function(dt){$!==dt&&!N&&(s.depthMask(dt),$=dt)},setFunc:function(dt){if(ht&&(dt=kg[dt]),j!==dt){switch(dt){case ea:s.depthFunc(s.NEVER);break;case na:s.depthFunc(s.ALWAYS);break;case ia:s.depthFunc(s.LESS);break;case Vi:s.depthFunc(s.LEQUAL);break;case sa:s.depthFunc(s.EQUAL);break;case ra:s.depthFunc(s.GEQUAL);break;case oa:s.depthFunc(s.GREATER);break;case aa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=dt}},setLocked:function(dt){N=dt},setClear:function(dt){pt!==dt&&(ht&&(dt=1-dt),s.clearDepth(dt),pt=dt)},reset:function(){N=!1,$=null,j=null,pt=null,ht=!1}}}function i(){let N=!1,ht=null,$=null,j=null,pt=null,dt=null,Bt=null,xe=null,Ce=null;return{setTest:function(re){N||(re?q(s.STENCIL_TEST):rt(s.STENCIL_TEST))},setMask:function(re){ht!==re&&!N&&(s.stencilMask(re),ht=re)},setFunc:function(re,Ke,pn){($!==re||j!==Ke||pt!==pn)&&(s.stencilFunc(re,Ke,pn),$=re,j=Ke,pt=pn)},setOp:function(re,Ke,pn){(dt!==re||Bt!==Ke||xe!==pn)&&(s.stencilOp(re,Ke,pn),dt=re,Bt=Ke,xe=pn)},setLocked:function(re){N=re},setClear:function(re){Ce!==re&&(s.clearStencil(re),Ce=re)},reset:function(){N=!1,ht=null,$=null,j=null,pt=null,dt=null,Bt=null,xe=null,Ce=null}}}let r=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,S=null,T=null,M=null,U=null,R=null,C=new Tt(0,0,0),P=0,E=!1,b=null,L=null,k=null,z=null,W=null,Q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,et=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=et>=1):X.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=et>=2);let lt=null,mt={},At=s.getParameter(s.SCISSOR_BOX),Gt=s.getParameter(s.VIEWPORT),Qt=new _e().fromArray(At),Z=new _e().fromArray(Gt);function y(N,ht,$,j){let pt=new Uint8Array(4),dt=s.createTexture();s.bindTexture(N,dt),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Bt=0;Bt<$;Bt++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(ht,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,pt):s.texImage2D(ht+Bt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,pt);return dt}let G={};G[s.TEXTURE_2D]=y(s.TEXTURE_2D,s.TEXTURE_2D,1),G[s.TEXTURE_CUBE_MAP]=y(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[s.TEXTURE_2D_ARRAY]=y(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),G[s.TEXTURE_3D]=y(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),q(s.DEPTH_TEST),o.setFunc(Vi),Xt(!1),Zt(el),q(s.CULL_FACE),D(Vn);function q(N){h[N]!==!0&&(s.enable(N),h[N]=!0)}function rt(N){h[N]!==!1&&(s.disable(N),h[N]=!1)}function ot(N,ht){return u[N]!==ht?(s.bindFramebuffer(N,ht),u[N]=ht,N===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ht),N===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ht),!0):!1}function Rt(N,ht){let $=f,j=!1;if(N){$=d.get(ht),$===void 0&&($=[],d.set(ht,$));let pt=N.textures;if($.length!==pt.length||$[0]!==s.COLOR_ATTACHMENT0){for(let dt=0,Bt=pt.length;dt<Bt;dt++)$[dt]=s.COLOR_ATTACHMENT0+dt;$.length=pt.length,j=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,j=!0);j&&s.drawBuffers($)}function Ct(N){return g!==N?(s.useProgram(N),g=N,!0):!1}let It={[ci]:s.FUNC_ADD,[mu]:s.FUNC_SUBTRACT,[gu]:s.FUNC_REVERSE_SUBTRACT};It[xu]=s.MIN,It[_u]=s.MAX;let Wt={[yu]:s.ZERO,[vu]:s.ONE,[Mu]:s.SRC_COLOR,[Qo]:s.SRC_ALPHA,[Au]:s.SRC_ALPHA_SATURATE,[Eu]:s.DST_COLOR,[wu]:s.DST_ALPHA,[bu]:s.ONE_MINUS_SRC_COLOR,[ta]:s.ONE_MINUS_SRC_ALPHA,[Tu]:s.ONE_MINUS_DST_COLOR,[Su]:s.ONE_MINUS_DST_ALPHA,[Ru]:s.CONSTANT_COLOR,[Cu]:s.ONE_MINUS_CONSTANT_COLOR,[Iu]:s.CONSTANT_ALPHA,[Pu]:s.ONE_MINUS_CONSTANT_ALPHA};function D(N,ht,$,j,pt,dt,Bt,xe,Ce,re){if(N===Vn){x===!0&&(rt(s.BLEND),x=!1);return}if(x===!1&&(q(s.BLEND),x=!0),N!==pu){if(N!==m||re!==E){if((p!==ci||M!==ci)&&(s.blendEquation(s.FUNC_ADD),p=ci,M=ci),re)switch(N){case Bi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nl:s.blendFunc(s.ONE,s.ONE);break;case il:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case sl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Bi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nl:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case il:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case sl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,T=null,U=null,R=null,C.set(0,0,0),P=0,m=N,E=re}return}pt=pt||ht,dt=dt||$,Bt=Bt||j,(ht!==p||pt!==M)&&(s.blendEquationSeparate(It[ht],It[pt]),p=ht,M=pt),($!==S||j!==T||dt!==U||Bt!==R)&&(s.blendFuncSeparate(Wt[$],Wt[j],Wt[dt],Wt[Bt]),S=$,T=j,U=dt,R=Bt),(xe.equals(C)===!1||Ce!==P)&&(s.blendColor(xe.r,xe.g,xe.b,Ce),C.copy(xe),P=Ce),m=N,E=!1}function me(N,ht){N.side===We?rt(s.CULL_FACE):q(s.CULL_FACE);let $=N.side===Be;ht&&($=!$),Xt($),N.blending===Bi&&N.transparent===!1?D(Vn):D(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);let j=N.stencilWrite;a.setTest(j),j&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),he(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?q(s.SAMPLE_ALPHA_TO_COVERAGE):rt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(N){b!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),b=N)}function Zt(N){N!==uu?(q(s.CULL_FACE),N!==L&&(N===el?s.cullFace(s.BACK):N===du?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):rt(s.CULL_FACE),L=N}function Lt(N){N!==k&&(Y&&s.lineWidth(N),k=N)}function he(N,ht,$){N?(q(s.POLYGON_OFFSET_FILL),(z!==ht||W!==$)&&(s.polygonOffset(ht,$),z=ht,W=$)):rt(s.POLYGON_OFFSET_FILL)}function Pt(N){N?q(s.SCISSOR_TEST):rt(s.SCISSOR_TEST)}function A(N){N===void 0&&(N=s.TEXTURE0+Q-1),lt!==N&&(s.activeTexture(N),lt=N)}function v(N,ht,$){$===void 0&&(lt===null?$=s.TEXTURE0+Q-1:$=lt);let j=mt[$];j===void 0&&(j={type:void 0,texture:void 0},mt[$]=j),(j.type!==N||j.texture!==ht)&&(lt!==$&&(s.activeTexture($),lt=$),s.bindTexture(N,ht||G[N]),j.type=N,j.texture=ht)}function B(){let N=mt[lt];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{s.texSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function St(){try{s.texSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Kt(){try{s.texStorage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function nt(){try{s.texStorage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _t(){try{s.texImage2D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ut(){try{s.texImage3D.apply(s,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(N){Qt.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),Qt.copy(N))}function yt(N){Z.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function Jt(N,ht){let $=l.get(ht);$===void 0&&($=new WeakMap,l.set(ht,$));let j=$.get(N);j===void 0&&(j=s.getUniformBlockIndex(ht,N.name),$.set(N,j))}function Ht(N,ht){let j=l.get(ht).get(N);c.get(ht)!==j&&(s.uniformBlockBinding(ht,j,N.__bindingPointIndex),c.set(ht,j))}function ce(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},lt=null,mt={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,S=null,T=null,M=null,U=null,R=null,C=new Tt(0,0,0),P=0,E=!1,b=null,L=null,k=null,z=null,W=null,Qt.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:q,disable:rt,bindFramebuffer:ot,drawBuffers:Rt,useProgram:Ct,setBlending:D,setMaterial:me,setFlipSided:Xt,setCullFace:Zt,setLineWidth:Lt,setPolygonOffset:he,setScissorTest:Pt,activeTexture:A,bindTexture:v,unbindTexture:B,compressedTexImage2D:K,compressedTexImage3D:tt,texImage2D:_t,texImage3D:Ut,updateUBOMapping:Jt,uniformBlockBinding:Ht,texStorage2D:Kt,texStorage3D:nt,texSubImage2D:J,texSubImage3D:St,compressedTexSubImage2D:ut,compressedTexSubImage3D:xt,scissor:Nt,viewport:yt,reset:ce}}function Ql(s,t,e,n){let i=Vg(n);switch(e){case yh:return s*t;case Mh:return s*t;case bh:return s*t*2;case Ic:return s*t/i.components*i.byteLength;case Pc:return s*t/i.components*i.byteLength;case wh:return s*t*2/i.components*i.byteLength;case Lc:return s*t*2/i.components*i.byteLength;case vh:return s*t*3/i.components*i.byteLength;case nn:return s*t*4/i.components*i.byteLength;case Dc:return s*t*4/i.components*i.byteLength;case gr:case xr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case _r:case yr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case da:case pa:return Math.max(s,16)*Math.max(t,8)/4;case ua:case fa:return Math.max(s,8)*Math.max(t,8)/2;case ma:case ga:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case xa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case _a:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ya:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case va:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case ba:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case wa:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ea:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ta:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Ca:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ia:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Pa:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case vr:case La:case Da:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Sh:case Ua:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Na:case Oa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vg(s){switch(s){case Tn:case gh:return{byteLength:1,components:1};case vs:case xh:case Ls:return{byteLength:2,components:1};case Rc:case Cc:return{byteLength:2,components:4};case di:case Ac:case ln:return{byteLength:4,components:1};case _h:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Gg(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new at,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return f?new OffscreenCanvas(A,v):Sr("canvas")}function x(A,v,B){let K=1,tt=Pt(A);if((tt.width>B||tt.height>B)&&(K=B/Math.max(tt.width,tt.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let J=Math.floor(K*tt.width),St=Math.floor(K*tt.height);u===void 0&&(u=g(J,St));let ut=v?g(J,St):u;return ut.width=J,ut.height=St,ut.getContext("2d").drawImage(A,0,0,J,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+J+"x"+St+")."),ut}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){s.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(A,v,B,K,tt=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let J=v;if(v===s.RED&&(B===s.FLOAT&&(J=s.R32F),B===s.HALF_FLOAT&&(J=s.R16F),B===s.UNSIGNED_BYTE&&(J=s.R8)),v===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.R8UI),B===s.UNSIGNED_SHORT&&(J=s.R16UI),B===s.UNSIGNED_INT&&(J=s.R32UI),B===s.BYTE&&(J=s.R8I),B===s.SHORT&&(J=s.R16I),B===s.INT&&(J=s.R32I)),v===s.RG&&(B===s.FLOAT&&(J=s.RG32F),B===s.HALF_FLOAT&&(J=s.RG16F),B===s.UNSIGNED_BYTE&&(J=s.RG8)),v===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.RG8UI),B===s.UNSIGNED_SHORT&&(J=s.RG16UI),B===s.UNSIGNED_INT&&(J=s.RG32UI),B===s.BYTE&&(J=s.RG8I),B===s.SHORT&&(J=s.RG16I),B===s.INT&&(J=s.RG32I)),v===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.RGB8UI),B===s.UNSIGNED_SHORT&&(J=s.RGB16UI),B===s.UNSIGNED_INT&&(J=s.RGB32UI),B===s.BYTE&&(J=s.RGB8I),B===s.SHORT&&(J=s.RGB16I),B===s.INT&&(J=s.RGB32I)),v===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),B===s.UNSIGNED_INT&&(J=s.RGBA32UI),B===s.BYTE&&(J=s.RGBA8I),B===s.SHORT&&(J=s.RGBA16I),B===s.INT&&(J=s.RGBA32I)),v===s.RGB&&B===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),v===s.RGBA){let St=tt?Jr:jt.getTransfer(K);B===s.FLOAT&&(J=s.RGBA32F),B===s.HALF_FLOAT&&(J=s.RGBA16F),B===s.UNSIGNED_BYTE&&(J=St===oe?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function M(A,v){let B;return A?v===null||v===di||v===Xi?B=s.DEPTH24_STENCIL8:v===ln?B=s.DEPTH32F_STENCIL8:v===vs&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===di||v===Xi?B=s.DEPTH_COMPONENT24:v===ln?B=s.DEPTH_COMPONENT32F:v===vs&&(B=s.DEPTH_COMPONENT16),B}function U(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Xe&&A.minFilter!==cn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function R(A){let v=A.target;v.removeEventListener("dispose",R),P(v),v.isVideoTexture&&h.delete(v)}function C(A){let v=A.target;v.removeEventListener("dispose",C),b(v)}function P(A){let v=n.get(A);if(v.__webglInit===void 0)return;let B=A.source,K=d.get(B);if(K){let tt=K[v.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&E(A),Object.keys(K).length===0&&d.delete(B)}n.remove(A)}function E(A){let v=n.get(A);s.deleteTexture(v.__webglTexture);let B=A.source,K=d.get(B);delete K[v.__cacheKey],o.memory.textures--}function b(A){let v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let tt=0;tt<v.__webglFramebuffer[K].length;tt++)s.deleteFramebuffer(v.__webglFramebuffer[K][tt]);else s.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)s.deleteFramebuffer(v.__webglFramebuffer[K]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let B=A.textures;for(let K=0,tt=B.length;K<tt;K++){let J=n.get(B[K]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(B[K])}n.remove(A)}let L=0;function k(){L=0}function z(){let A=L;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),L+=1,A}function W(A){let v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function Q(A,v){let B=n.get(A);if(A.isVideoTexture&&Lt(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){let K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(B,A,v);return}}e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+v)}function Y(A,v){let B=n.get(A);if(A.version>0&&B.__version!==A.version){Z(B,A,v);return}e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+v)}function et(A,v){let B=n.get(A);if(A.version>0&&B.__version!==A.version){Z(B,A,v);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+v)}function X(A,v){let B=n.get(A);if(A.version>0&&B.__version!==A.version){y(B,A,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+v)}let lt={[ys]:s.REPEAT,[hi]:s.CLAMP_TO_EDGE,[ha]:s.MIRRORED_REPEAT},mt={[Xe]:s.NEAREST,[Hu]:s.NEAREST_MIPMAP_NEAREST,[Bs]:s.NEAREST_MIPMAP_LINEAR,[cn]:s.LINEAR,[xo]:s.LINEAR_MIPMAP_NEAREST,[ui]:s.LINEAR_MIPMAP_LINEAR},At={[Xu]:s.NEVER,[Ku]:s.ALWAYS,[$u]:s.LESS,[Th]:s.LEQUAL,[Yu]:s.EQUAL,[Ju]:s.GEQUAL,[qu]:s.GREATER,[Zu]:s.NOTEQUAL};function Gt(A,v){if(v.type===ln&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===cn||v.magFilter===xo||v.magFilter===Bs||v.magFilter===ui||v.minFilter===cn||v.minFilter===xo||v.minFilter===Bs||v.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,lt[v.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,lt[v.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,lt[v.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,mt[v.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,mt[v.minFilter]),v.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,At[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Xe||v.minFilter!==Bs&&v.minFilter!==ui||v.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Qt(A,v){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",R));let K=v.source,tt=d.get(K);tt===void 0&&(tt={},d.set(K,tt));let J=W(v);if(J!==A.__cacheKey){tt[J]===void 0&&(tt[J]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),tt[J].usedTimes++;let St=tt[A.__cacheKey];St!==void 0&&(tt[A.__cacheKey].usedTimes--,St.usedTimes===0&&E(v)),A.__cacheKey=J,A.__webglTexture=tt[J].texture}return B}function Z(A,v,B){let K=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=s.TEXTURE_3D);let tt=Qt(A,v),J=v.source;e.bindTexture(K,A.__webglTexture,s.TEXTURE0+B);let St=n.get(J);if(J.version!==St.__version||tt===!0){e.activeTexture(s.TEXTURE0+B);let ut=jt.getPrimaries(jt.workingColorSpace),xt=v.colorSpace===Hn?null:jt.getPrimaries(v.colorSpace),Kt=v.colorSpace===Hn||ut===xt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let nt=x(v.image,!1,i.maxTextureSize);nt=he(v,nt);let _t=r.convert(v.format,v.colorSpace),Ut=r.convert(v.type),Nt=T(v.internalFormat,_t,Ut,v.colorSpace,v.isVideoTexture);Gt(K,v);let yt,Jt=v.mipmaps,Ht=v.isVideoTexture!==!0,ce=St.__version===void 0||tt===!0,N=J.dataReady,ht=U(v,nt);if(v.isDepthTexture)Nt=M(v.format===$i,v.type),ce&&(Ht?e.texStorage2D(s.TEXTURE_2D,1,Nt,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,Nt,nt.width,nt.height,0,_t,Ut,null));else if(v.isDataTexture)if(Jt.length>0){Ht&&ce&&e.texStorage2D(s.TEXTURE_2D,ht,Nt,Jt[0].width,Jt[0].height);for(let $=0,j=Jt.length;$<j;$++)yt=Jt[$],Ht?N&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,yt.width,yt.height,_t,Ut,yt.data):e.texImage2D(s.TEXTURE_2D,$,Nt,yt.width,yt.height,0,_t,Ut,yt.data);v.generateMipmaps=!1}else Ht?(ce&&e.texStorage2D(s.TEXTURE_2D,ht,Nt,nt.width,nt.height),N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,_t,Ut,nt.data)):e.texImage2D(s.TEXTURE_2D,0,Nt,nt.width,nt.height,0,_t,Ut,nt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ht&&ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ht,Nt,Jt[0].width,Jt[0].height,nt.depth);for(let $=0,j=Jt.length;$<j;$++)if(yt=Jt[$],v.format!==nn)if(_t!==null)if(Ht){if(N)if(v.layerUpdates.size>0){let pt=Ql(yt.width,yt.height,v.format,v.type);for(let dt of v.layerUpdates){let Bt=yt.data.subarray(dt*pt/yt.data.BYTES_PER_ELEMENT,(dt+1)*pt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,dt,yt.width,yt.height,1,_t,Bt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,nt.depth,_t,yt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,$,Nt,yt.width,yt.height,nt.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?N&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,$,0,0,0,yt.width,yt.height,nt.depth,_t,Ut,yt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,$,Nt,yt.width,yt.height,nt.depth,0,_t,Ut,yt.data)}else{Ht&&ce&&e.texStorage2D(s.TEXTURE_2D,ht,Nt,Jt[0].width,Jt[0].height);for(let $=0,j=Jt.length;$<j;$++)yt=Jt[$],v.format!==nn?_t!==null?Ht?N&&e.compressedTexSubImage2D(s.TEXTURE_2D,$,0,0,yt.width,yt.height,_t,yt.data):e.compressedTexImage2D(s.TEXTURE_2D,$,Nt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?N&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,yt.width,yt.height,_t,Ut,yt.data):e.texImage2D(s.TEXTURE_2D,$,Nt,yt.width,yt.height,0,_t,Ut,yt.data)}else if(v.isDataArrayTexture)if(Ht){if(ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ht,Nt,nt.width,nt.height,nt.depth),N)if(v.layerUpdates.size>0){let $=Ql(nt.width,nt.height,v.format,v.type);for(let j of v.layerUpdates){let pt=nt.data.subarray(j*$/nt.data.BYTES_PER_ELEMENT,(j+1)*$/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,nt.width,nt.height,1,_t,Ut,pt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,_t,Ut,nt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,nt.width,nt.height,nt.depth,0,_t,Ut,nt.data);else if(v.isData3DTexture)Ht?(ce&&e.texStorage3D(s.TEXTURE_3D,ht,Nt,nt.width,nt.height,nt.depth),N&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,_t,Ut,nt.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,nt.width,nt.height,nt.depth,0,_t,Ut,nt.data);else if(v.isFramebufferTexture){if(ce)if(Ht)e.texStorage2D(s.TEXTURE_2D,ht,Nt,nt.width,nt.height);else{let $=nt.width,j=nt.height;for(let pt=0;pt<ht;pt++)e.texImage2D(s.TEXTURE_2D,pt,Nt,$,j,0,_t,Ut,null),$>>=1,j>>=1}}else if(Jt.length>0){if(Ht&&ce){let $=Pt(Jt[0]);e.texStorage2D(s.TEXTURE_2D,ht,Nt,$.width,$.height)}for(let $=0,j=Jt.length;$<j;$++)yt=Jt[$],Ht?N&&e.texSubImage2D(s.TEXTURE_2D,$,0,0,_t,Ut,yt):e.texImage2D(s.TEXTURE_2D,$,Nt,_t,Ut,yt);v.generateMipmaps=!1}else if(Ht){if(ce){let $=Pt(nt);e.texStorage2D(s.TEXTURE_2D,ht,Nt,$.width,$.height)}N&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t,Ut,nt)}else e.texImage2D(s.TEXTURE_2D,0,Nt,_t,Ut,nt);m(v)&&p(K),St.__version=J.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function y(A,v,B){if(v.image.length!==6)return;let K=Qt(A,v),tt=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+B);let J=n.get(tt);if(tt.version!==J.__version||K===!0){e.activeTexture(s.TEXTURE0+B);let St=jt.getPrimaries(jt.workingColorSpace),ut=v.colorSpace===Hn?null:jt.getPrimaries(v.colorSpace),xt=v.colorSpace===Hn||St===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let Kt=v.isCompressedTexture||v.image[0].isCompressedTexture,nt=v.image[0]&&v.image[0].isDataTexture,_t=[];for(let j=0;j<6;j++)!Kt&&!nt?_t[j]=x(v.image[j],!0,i.maxCubemapSize):_t[j]=nt?v.image[j].image:v.image[j],_t[j]=he(v,_t[j]);let Ut=_t[0],Nt=r.convert(v.format,v.colorSpace),yt=r.convert(v.type),Jt=T(v.internalFormat,Nt,yt,v.colorSpace),Ht=v.isVideoTexture!==!0,ce=J.__version===void 0||K===!0,N=tt.dataReady,ht=U(v,Ut);Gt(s.TEXTURE_CUBE_MAP,v);let $;if(Kt){Ht&&ce&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Jt,Ut.width,Ut.height);for(let j=0;j<6;j++){$=_t[j].mipmaps;for(let pt=0;pt<$.length;pt++){let dt=$[pt];v.format!==nn?Nt!==null?Ht?N&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,dt.width,dt.height,Nt,dt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Jt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,0,0,dt.width,dt.height,Nt,yt,dt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt,Jt,dt.width,dt.height,0,Nt,yt,dt.data)}}}else{if($=v.mipmaps,Ht&&ce){$.length>0&&ht++;let j=Pt(_t[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ht,Jt,j.width,j.height)}for(let j=0;j<6;j++)if(nt){Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,_t[j].width,_t[j].height,Nt,yt,_t[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Jt,_t[j].width,_t[j].height,0,Nt,yt,_t[j].data);for(let pt=0;pt<$.length;pt++){let Bt=$[pt].image[j].image;Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,Bt.width,Bt.height,Nt,yt,Bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Jt,Bt.width,Bt.height,0,Nt,yt,Bt.data)}}else{Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Nt,yt,_t[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Jt,Nt,yt,_t[j]);for(let pt=0;pt<$.length;pt++){let dt=$[pt];Ht?N&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,0,0,Nt,yt,dt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,pt+1,Jt,Nt,yt,dt.image[j])}}}m(v)&&p(s.TEXTURE_CUBE_MAP),J.__version=tt.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function G(A,v,B,K,tt,J){let St=r.convert(B.format,B.colorSpace),ut=r.convert(B.type),xt=T(B.internalFormat,St,ut,B.colorSpace),Kt=n.get(v),nt=n.get(B);if(nt.__renderTarget=v,!Kt.__hasExternalTextures){let _t=Math.max(1,v.width>>J),Ut=Math.max(1,v.height>>J);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,J,xt,_t,Ut,v.depth,0,St,ut,null):e.texImage2D(tt,J,xt,_t,Ut,0,St,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),Zt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,tt,nt.__webglTexture,0,Xt(v)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,tt,nt.__webglTexture,J),e.bindFramebuffer(s.FRAMEBUFFER,null)}function q(A,v,B){if(s.bindRenderbuffer(s.RENDERBUFFER,A),v.depthBuffer){let K=v.depthTexture,tt=K&&K.isDepthTexture?K.type:null,J=M(v.stencilBuffer,tt),St=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=Xt(v);Zt(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,J,v.width,v.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,J,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,J,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,St,s.RENDERBUFFER,A)}else{let K=v.textures;for(let tt=0;tt<K.length;tt++){let J=K[tt],St=r.convert(J.format,J.colorSpace),ut=r.convert(J.type),xt=T(J.internalFormat,St,ut,J.colorSpace),Kt=Xt(v);B&&Zt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Kt,xt,v.width,v.height):Zt(v)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Kt,xt,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,xt,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function rt(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let K=n.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Q(v.depthTexture,0);let tt=K.__webglTexture,J=Xt(v);if(v.depthTexture.format===zi)Zt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(v.depthTexture.format===$i)Zt(v)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function ot(A){let v=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){let K=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){let tt=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",tt)};K.addEventListener("dispose",tt),v.__depthDisposeCallback=tt}v.__boundDepthTexture=K}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");rt(v.__webglFramebuffer,A)}else if(B){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=s.createRenderbuffer(),q(v.__webglDepthbuffer[K],A,!1);else{let tt=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,J)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),q(v.__webglDepthbuffer,A,!1);else{let K=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Rt(A,v,B){let K=n.get(A);v!==void 0&&G(K.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&ot(A)}function Ct(A){let v=A.texture,B=n.get(A),K=n.get(v);A.addEventListener("dispose",C);let tt=A.textures,J=A.isWebGLCubeRenderTarget===!0,St=tt.length>1;if(St||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=v.version,o.memory.textures++),J){B.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[ut]=[];for(let xt=0;xt<v.mipmaps.length;xt++)B.__webglFramebuffer[ut][xt]=s.createFramebuffer()}else B.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let ut=0;ut<v.mipmaps.length;ut++)B.__webglFramebuffer[ut]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(St)for(let ut=0,xt=tt.length;ut<xt;ut++){let Kt=n.get(tt[ut]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&Zt(A)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ut=0;ut<tt.length;ut++){let xt=tt[ut];B.__webglColorRenderbuffer[ut]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[ut]);let Kt=r.convert(xt.format,xt.colorSpace),nt=r.convert(xt.type),_t=T(xt.internalFormat,Kt,nt,xt.colorSpace,A.isXRRenderTarget===!0),Ut=Xt(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,_t,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,B.__webglColorRenderbuffer[ut])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),q(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Gt(s.TEXTURE_CUBE_MAP,v);for(let ut=0;ut<6;ut++)if(v.mipmaps&&v.mipmaps.length>0)for(let xt=0;xt<v.mipmaps.length;xt++)G(B.__webglFramebuffer[ut][xt],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,xt);else G(B.__webglFramebuffer[ut],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(v)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ut=0,xt=tt.length;ut<xt;ut++){let Kt=tt[ut],nt=n.get(Kt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),Gt(s.TEXTURE_2D,Kt),G(B.__webglFramebuffer,A,Kt,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,0),m(Kt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ut=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,K.__webglTexture),Gt(ut,v),v.mipmaps&&v.mipmaps.length>0)for(let xt=0;xt<v.mipmaps.length;xt++)G(B.__webglFramebuffer[xt],A,v,s.COLOR_ATTACHMENT0,ut,xt);else G(B.__webglFramebuffer,A,v,s.COLOR_ATTACHMENT0,ut,0);m(v)&&p(ut),e.unbindTexture()}A.depthBuffer&&ot(A)}function It(A){let v=A.textures;for(let B=0,K=v.length;B<K;B++){let tt=v[B];if(m(tt)){let J=S(A),St=n.get(tt).__webglTexture;e.bindTexture(J,St),p(J),e.unbindTexture()}}}let Wt=[],D=[];function me(A){if(A.samples>0){if(Zt(A)===!1){let v=A.textures,B=A.width,K=A.height,tt=s.COLOR_BUFFER_BIT,J=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,St=n.get(A),ut=v.length>1;if(ut)for(let xt=0;xt<v.length;xt++)e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let xt=0;xt<v.length;xt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),ut){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);let Kt=n.get(v[xt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Kt,0)}s.blitFramebuffer(0,0,B,K,0,0,B,K,tt,s.NEAREST),c===!0&&(Wt.length=0,D.length=0,Wt.push(s.COLOR_ATTACHMENT0+xt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Wt.push(J),D.push(J),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Wt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ut)for(let xt=0;xt<v.length;xt++){e.bindFramebuffer(s.FRAMEBUFFER,St.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);let Kt=n.get(v[xt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,St.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,Kt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let v=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function Xt(A){return Math.min(i.maxSamples,A.samples)}function Zt(A){let v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Lt(A){let v=o.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function he(A,v){let B=A.colorSpace,K=A.format,tt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Ki&&B!==Hn&&(jt.getTransfer(B)===oe?(K!==nn||tt!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function Pt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=et,this.setTextureCube=X,this.rebindTextures=Rt,this.setupRenderTarget=Ct,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=G,this.useMultisampledRTT=Zt}function Wg(s,t){function e(n,i=Hn){let r,o=jt.getTransfer(i);if(n===Tn)return s.UNSIGNED_BYTE;if(n===Rc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Cc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===_h)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===gh)return s.BYTE;if(n===xh)return s.SHORT;if(n===vs)return s.UNSIGNED_SHORT;if(n===Ac)return s.INT;if(n===di)return s.UNSIGNED_INT;if(n===ln)return s.FLOAT;if(n===Ls)return s.HALF_FLOAT;if(n===yh)return s.ALPHA;if(n===vh)return s.RGB;if(n===nn)return s.RGBA;if(n===Mh)return s.LUMINANCE;if(n===bh)return s.LUMINANCE_ALPHA;if(n===zi)return s.DEPTH_COMPONENT;if(n===$i)return s.DEPTH_STENCIL;if(n===Ic)return s.RED;if(n===Pc)return s.RED_INTEGER;if(n===wh)return s.RG;if(n===Lc)return s.RG_INTEGER;if(n===Dc)return s.RGBA_INTEGER;if(n===gr||n===xr||n===_r||n===yr)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===yr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===da||n===fa||n===pa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ua)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===da)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ma||n===ga||n===xa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ma||n===ga)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_a||n===ya||n===va||n===Ma||n===ba||n===wa||n===Sa||n===Ea||n===Ta||n===Aa||n===Ra||n===Ca||n===Ia||n===Pa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_a)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ya)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===va)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ma)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ba)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ea)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ta)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Aa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ra)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ca)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ia)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vr||n===La||n===Da)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===vr)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===La)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sh||n===Ua||n===Na||n===Oa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===vr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Na)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var Qa=class extends Me{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},fe=class extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}},Xg={type:"move"},gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xg)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new fe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},$g=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yg=`
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

}`,tc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new ze,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new un({vertexShader:$g,fragmentShader:Yg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new gt(new Re(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ec=class extends Xn{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,x=new tc,m=e.getContextAttributes(),p=null,S=null,T=[],M=[],U=new at,R=null,C=new Me;C.viewport=new _e;let P=new Me;P.viewport=new _e;let E=[C,P],b=new Qa,L=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let y=T[Z];return y===void 0&&(y=new gs,T[Z]=y),y.getTargetRaySpace()},this.getControllerGrip=function(Z){let y=T[Z];return y===void 0&&(y=new gs,T[Z]=y),y.getGripSpace()},this.getHand=function(Z){let y=T[Z];return y===void 0&&(y=new gs,T[Z]=y),y.getHandSpace()};function z(Z){let y=M.indexOf(Z.inputSource);if(y===-1)return;let G=T[y];G!==void 0&&(G.update(Z.inputSource,Z.frame,l||o),G.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Q);for(let Z=0;Z<T.length;Z++){let y=M[Z];y!==null&&(M[Z]=null,T[Z].disconnect(y))}L=null,k=null,x.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,S=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Q),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(U),i.renderState.layers===void 0){let y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,y),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new An(f.framebufferWidth,f.framebufferHeight,{format:nn,type:Tn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let y=null,G=null,q=null;m.depth&&(q=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,y=m.stencil?$i:zi,G=m.stencil?Xi:di);let rt={colorFormat:e.RGBA8,depthFormat:q,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(rt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new An(d.textureWidth,d.textureHeight,{format:nn,type:Tn,depthTexture:new Dr(d.textureWidth,d.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,y),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Qt.setContext(i),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q(Z){for(let y=0;y<Z.removed.length;y++){let G=Z.removed[y],q=M.indexOf(G);q>=0&&(M[q]=null,T[q].disconnect(G))}for(let y=0;y<Z.added.length;y++){let G=Z.added[y],q=M.indexOf(G);if(q===-1){for(let ot=0;ot<T.length;ot++)if(ot>=M.length){M.push(G),q=ot;break}else if(M[ot]===null){M[ot]=G,q=ot;break}if(q===-1)break}let rt=T[q];rt&&rt.connect(G)}}let Y=new I,et=new I;function X(Z,y,G){Y.setFromMatrixPosition(y.matrixWorld),et.setFromMatrixPosition(G.matrixWorld);let q=Y.distanceTo(et),rt=y.projectionMatrix.elements,ot=G.projectionMatrix.elements,Rt=rt[14]/(rt[10]-1),Ct=rt[14]/(rt[10]+1),It=(rt[9]+1)/rt[5],Wt=(rt[9]-1)/rt[5],D=(rt[8]-1)/rt[0],me=(ot[8]+1)/ot[0],Xt=Rt*D,Zt=Rt*me,Lt=q/(-D+me),he=Lt*-D;if(y.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(he),Z.translateZ(Lt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),rt[10]===-1)Z.projectionMatrix.copy(y.projectionMatrix),Z.projectionMatrixInverse.copy(y.projectionMatrixInverse);else{let Pt=Rt+Lt,A=Ct+Lt,v=Xt-he,B=Zt+(q-he),K=It*Ct/A*Pt,tt=Wt*Ct/A*Pt;Z.projectionMatrix.makePerspective(v,B,K,tt,Pt,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function lt(Z,y){y===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(y.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let y=Z.near,G=Z.far;x.texture!==null&&(x.depthNear>0&&(y=x.depthNear),x.depthFar>0&&(G=x.depthFar)),b.near=P.near=C.near=y,b.far=P.far=C.far=G,(L!==b.near||k!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),L=b.near,k=b.far),C.layers.mask=Z.layers.mask|2,P.layers.mask=Z.layers.mask|4,b.layers.mask=C.layers.mask|P.layers.mask;let q=Z.parent,rt=b.cameras;lt(b,q);for(let ot=0;ot<rt.length;ot++)lt(rt[ot],q);rt.length===2?X(b,C,P):b.projectionMatrix.copy(C.projectionMatrix),mt(Z,b,q)};function mt(Z,y,G){G===null?Z.matrix.copy(y.matrixWorld):(Z.matrix.copy(G.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(y.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(y.projectionMatrix),Z.projectionMatrixInverse.copy(y.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=za*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Z){c=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(b)};let At=null;function Gt(Z,y){if(h=y.getViewerPose(l||o),g=y,h!==null){let G=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let q=!1;G.length!==b.cameras.length&&(b.cameras.length=0,q=!0);for(let ot=0;ot<G.length;ot++){let Rt=G[ot],Ct=null;if(f!==null)Ct=f.getViewport(Rt);else{let Wt=u.getViewSubImage(d,Rt);Ct=Wt.viewport,ot===0&&(t.setRenderTargetTextures(S,Wt.colorTexture,d.ignoreDepthValues?void 0:Wt.depthStencilTexture),t.setRenderTarget(S))}let It=E[ot];It===void 0&&(It=new Me,It.layers.enable(ot),It.viewport=new _e,E[ot]=It),It.matrix.fromArray(Rt.transform.matrix),It.matrix.decompose(It.position,It.quaternion,It.scale),It.projectionMatrix.fromArray(Rt.projectionMatrix),It.projectionMatrixInverse.copy(It.projectionMatrix).invert(),It.viewport.set(Ct.x,Ct.y,Ct.width,Ct.height),ot===0&&(b.matrix.copy(It.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),q===!0&&b.cameras.push(It)}let rt=i.enabledFeatures;if(rt&&rt.includes("depth-sensing")){let ot=u.getDepthInformation(G[0]);ot&&ot.isValid&&ot.texture&&x.init(t,ot,i.renderState)}}for(let G=0;G<T.length;G++){let q=M[G],rt=T[G];q!==null&&rt!==void 0&&rt.update(q,y,l||o)}At&&At(Z,y),y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:y}),g=null}let Qt=new Ih;Qt.setAnimationLoop(Gt),this.setAnimationLoop=function(Z){At=Z},this.dispose=function(){}}},oi=new Ze,qg=new ee;function Zg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ch(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,T,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,S,T):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Be&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Be&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=t.get(p),T=S.envMap,M=S.envMapRotation;T&&(m.envMap.value=T,oi.copy(M),oi.x*=-1,oi.y*=-1,oi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),m.envMapRotation.value.setFromMatrix4(qg.makeRotationFromEuler(oi)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=T*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Jg(s,t,e,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,T){let M=T.program;n.uniformBlockBinding(S,M)}function l(S,T){let M=i[S.id];M===void 0&&(g(S),M=h(S),i[S.id]=M,S.addEventListener("dispose",m));let U=T.program;n.updateUBOMapping(S,U);let R=t.render.frame;r[S.id]!==R&&(d(S),r[S.id]=R)}function h(S){let T=u();S.__bindingPointIndex=T;let M=s.createBuffer(),U=S.__size,R=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,U,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,T,M),M}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let T=i[S.id],M=S.uniforms,U=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let R=0,C=M.length;R<C;R++){let P=Array.isArray(M[R])?M[R]:[M[R]];for(let E=0,b=P.length;E<b;E++){let L=P[E];if(f(L,R,E,U)===!0){let k=L.__offset,z=Array.isArray(L.value)?L.value:[L.value],W=0;for(let Q=0;Q<z.length;Q++){let Y=z[Q],et=x(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,k+W,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,W),W+=et.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(S,T,M,U){let R=S.value,C=T+"_"+M;if(U[C]===void 0)return typeof R=="number"||typeof R=="boolean"?U[C]=R:U[C]=R.clone(),!0;{let P=U[C];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return U[C]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(S){let T=S.uniforms,M=0,U=16;for(let C=0,P=T.length;C<P;C++){let E=Array.isArray(T[C])?T[C]:[T[C]];for(let b=0,L=E.length;b<L;b++){let k=E[b],z=Array.isArray(k.value)?k.value:[k.value];for(let W=0,Q=z.length;W<Q;W++){let Y=z[W],et=x(Y),X=M%U,lt=X%et.boundary,mt=X+lt;M+=lt,mt!==0&&U-mt<et.storage&&(M+=U-mt),k.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=et.storage}}}let R=M%U;return R>0&&(M+=U-R),S.__size=M,S.__cache={},this}function x(S){let T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),T}function m(S){let T=S.target;T.removeEventListener("dispose",m);let M=o.indexOf(T.__bindingPointIndex);o.splice(M,1),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function p(){for(let S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}var Yn=class{constructor(t={}){let{canvas:e=Qu(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,S=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=Gn,this.toneMappingExposure=1;let M=this,U=!1,R=0,C=0,P=null,E=-1,b=null,L=new _e,k=new _e,z=null,W=new Tt(0),Q=0,Y=e.width,et=e.height,X=1,lt=null,mt=null,At=new _e(0,0,Y,et),Gt=new _e(0,0,Y,et),Qt=!1,Z=new ws,y=!1,G=!1,q=new ee,rt=new ee,ot=new I,Rt=new _e,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},It=!1;function Wt(){return P===null?X:1}let D=n;function me(w,O){return e.getContext(w,O)}try{let w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),D===null){let O="webgl2";if(D=me(O,w),D===null)throw me(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Xt,Zt,Lt,he,Pt,A,v,B,K,tt,J,St,ut,xt,Kt,nt,_t,Ut,Nt,yt,Jt,Ht,ce,N;function ht(){Xt=new dm(D),Xt.init(),Ht=new Wg(D,Xt),Zt=new om(D,Xt,t,Ht),Lt=new Hg(D,Xt),Zt.reverseDepthBuffer&&d&&Lt.buffers.depth.setReversed(!0),he=new mm(D),Pt=new Rg,A=new Gg(D,Xt,Lt,Pt,Zt,Ht,he),v=new cm(M),B=new um(M),K=new Md(D),ce=new sm(D,K),tt=new fm(D,K,he,ce),J=new xm(D,tt,K,he),Nt=new gm(D,Zt,A),nt=new am(Pt),St=new Ag(M,v,B,Xt,Zt,ce,nt),ut=new Zg(M,Pt),xt=new Ig,Kt=new Og(Xt),Ut=new im(M,v,B,Lt,J,f,c),_t=new zg(M,J,Zt),N=new Jg(D,he,Zt,Lt),yt=new rm(D,Xt,he),Jt=new pm(D,Xt,he),he.programs=St.programs,M.capabilities=Zt,M.extensions=Xt,M.properties=Pt,M.renderLists=xt,M.shadowMap=_t,M.state=Lt,M.info=he}ht();let $=new ec(M,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let w=Xt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Xt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(w){w!==void 0&&(X=w,this.setSize(Y,et,!1))},this.getSize=function(w){return w.set(Y,et)},this.setSize=function(w,O,H=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=w,et=O,e.width=Math.floor(w*X),e.height=Math.floor(O*X),H===!0&&(e.style.width=w+"px",e.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(Y*X,et*X).floor()},this.setDrawingBufferSize=function(w,O,H){Y=w,et=O,X=H,e.width=Math.floor(w*H),e.height=Math.floor(O*H),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(At)},this.setViewport=function(w,O,H,V){w.isVector4?At.set(w.x,w.y,w.z,w.w):At.set(w,O,H,V),Lt.viewport(L.copy(At).multiplyScalar(X).round())},this.getScissor=function(w){return w.copy(Gt)},this.setScissor=function(w,O,H,V){w.isVector4?Gt.set(w.x,w.y,w.z,w.w):Gt.set(w,O,H,V),Lt.scissor(k.copy(Gt).multiplyScalar(X).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(w){Lt.setScissorTest(Qt=w)},this.setOpaqueSort=function(w){lt=w},this.setTransparentSort=function(w){mt=w},this.getClearColor=function(w){return w.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(w=!0,O=!0,H=!0){let V=0;if(w){let F=!1;if(P!==null){let it=P.texture.format;F=it===Dc||it===Lc||it===Pc}if(F){let it=P.texture.type,ft=it===Tn||it===di||it===vs||it===Xi||it===Rc||it===Cc,Mt=Ut.getClearColor(),bt=Ut.getClearAlpha(),Ot=Mt.r,zt=Mt.g,wt=Mt.b;ft?(g[0]=Ot,g[1]=zt,g[2]=wt,g[3]=bt,D.clearBufferuiv(D.COLOR,0,g)):(x[0]=Ot,x[1]=zt,x[2]=wt,x[3]=bt,D.clearBufferiv(D.COLOR,0,x))}else V|=D.COLOR_BUFFER_BIT}O&&(V|=D.DEPTH_BUFFER_BIT),H&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),xt.dispose(),Kt.dispose(),Pt.dispose(),v.dispose(),B.dispose(),J.dispose(),ce.dispose(),N.dispose(),St.dispose(),$.dispose(),$.removeEventListener("sessionstart",Yc),$.removeEventListener("sessionend",qc),ti.stop()};function j(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),U=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),U=!1;let w=he.autoReset,O=_t.enabled,H=_t.autoUpdate,V=_t.needsUpdate,F=_t.type;ht(),he.autoReset=w,_t.enabled=O,_t.autoUpdate=H,_t.needsUpdate=V,_t.type=F}function dt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Bt(w){let O=w.target;O.removeEventListener("dispose",Bt),xe(O)}function xe(w){Ce(w),Pt.remove(w)}function Ce(w){let O=Pt.get(w).programs;O!==void 0&&(O.forEach(function(H){St.releaseProgram(H)}),w.isShaderMaterial&&St.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,H,V,F,it){O===null&&(O=Ct);let ft=F.isMesh&&F.matrixWorld.determinant()<0,Mt=cu(w,O,H,V,F);Lt.setMaterial(V,ft);let bt=H.index,Ot=1;if(V.wireframe===!0){if(bt=tt.getWireframeAttribute(H),bt===void 0)return;Ot=2}let zt=H.drawRange,wt=H.attributes.position,te=zt.start*Ot,le=(zt.start+zt.count)*Ot;it!==null&&(te=Math.max(te,it.start*Ot),le=Math.min(le,(it.start+it.count)*Ot)),bt!==null?(te=Math.max(te,0),le=Math.min(le,bt.count)):wt!=null&&(te=Math.max(te,0),le=Math.min(le,wt.count));let ue=le-te;if(ue<0||ue===1/0)return;ce.setup(F,V,Mt,H,bt);let Fe,ne=yt;if(bt!==null&&(Fe=K.get(bt),ne=Jt,ne.setIndex(Fe)),F.isMesh)V.wireframe===!0?(Lt.setLineWidth(V.wireframeLinewidth*Wt()),ne.setMode(D.LINES)):ne.setMode(D.TRIANGLES);else if(F.isLine){let Et=V.linewidth;Et===void 0&&(Et=1),Lt.setLineWidth(Et*Wt()),F.isLineSegments?ne.setMode(D.LINES):F.isLineLoop?ne.setMode(D.LINE_LOOP):ne.setMode(D.LINE_STRIP)}else F.isPoints?ne.setMode(D.POINTS):F.isSprite&&ne.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ne.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))ne.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Et=F._multiDrawStarts,mn=F._multiDrawCounts,ie=F._multiDrawCount,je=bt?K.get(bt).bytesPerElement:1,xi=Pt.get(V).currentProgram.getUniforms();for(let He=0;He<ie;He++)xi.setValue(D,"_gl_DrawID",He),ne.render(Et[He]/je,mn[He])}else if(F.isInstancedMesh)ne.renderInstances(te,ue,F.count);else if(H.isInstancedBufferGeometry){let Et=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,mn=Math.min(H.instanceCount,Et);ne.renderInstances(te,ue,mn)}else ne.render(te,ue)};function re(w,O,H){w.transparent===!0&&w.side===We&&w.forceSinglePass===!1?(w.side=Be,w.needsUpdate=!0,Fs(w,O,H),w.side=hn,w.needsUpdate=!0,Fs(w,O,H),w.side=We):Fs(w,O,H)}this.compile=function(w,O,H=null){H===null&&(H=w),p=Kt.get(H),p.init(O),T.push(p),H.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),w!==H&&w.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let V=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let it=F.material;if(it)if(Array.isArray(it))for(let ft=0;ft<it.length;ft++){let Mt=it[ft];re(Mt,H,F),V.add(Mt)}else re(it,H,F),V.add(it)}),T.pop(),p=null,V},this.compileAsync=function(w,O,H=null){let V=this.compile(w,O,H);return new Promise(F=>{function it(){if(V.forEach(function(ft){Pt.get(ft).currentProgram.isReady()&&V.delete(ft)}),V.size===0){F(w);return}setTimeout(it,10)}Xt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Ke=null;function pn(w){Ke&&Ke(w)}function Yc(){ti.stop()}function qc(){ti.start()}let ti=new Ih;ti.setAnimationLoop(pn),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(w){Ke=w,$.setAnimationLoop(w),w===null?ti.stop():ti.start()},$.addEventListener("sessionstart",Yc),$.addEventListener("sessionend",qc),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(O),O=$.getCamera()),w.isScene===!0&&w.onBeforeRender(M,w,O,P),p=Kt.get(w,T.length),p.init(O),T.push(p),rt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Z.setFromProjectionMatrix(rt),G=this.localClippingEnabled,y=nt.init(this.clippingPlanes,G),m=xt.get(w,S.length),m.init(),S.push(m),$.enabled===!0&&$.isPresenting===!0){let it=M.xr.getDepthSensingMesh();it!==null&&go(it,O,-1/0,M.sortObjects)}go(w,O,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(lt,mt),It=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,It&&Ut.addToRenderList(m,w),this.info.render.frame++,y===!0&&nt.beginShadows();let H=p.state.shadowsArray;_t.render(H,w,O),y===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,F=m.transmissive;if(p.setupLights(),O.isArrayCamera){let it=O.cameras;if(F.length>0)for(let ft=0,Mt=it.length;ft<Mt;ft++){let bt=it[ft];Jc(V,F,w,bt)}It&&Ut.render(w);for(let ft=0,Mt=it.length;ft<Mt;ft++){let bt=it[ft];Zc(m,w,bt,bt.viewport)}}else F.length>0&&Jc(V,F,w,O),It&&Ut.render(w),Zc(m,w,O);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(M,w,O),ce.resetDefaultState(),E=-1,b=null,T.pop(),T.length>0?(p=T[T.length-1],y===!0&&nt.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function go(w,O,H,V){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Z.intersectsSprite(w)){V&&Rt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(rt);let ft=J.update(w),Mt=w.material;Mt.visible&&m.push(w,ft,Mt,H,Rt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Z.intersectsObject(w))){let ft=J.update(w),Mt=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Rt.copy(w.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Rt.copy(ft.boundingSphere.center)),Rt.applyMatrix4(w.matrixWorld).applyMatrix4(rt)),Array.isArray(Mt)){let bt=ft.groups;for(let Ot=0,zt=bt.length;Ot<zt;Ot++){let wt=bt[Ot],te=Mt[wt.materialIndex];te&&te.visible&&m.push(w,ft,te,H,Rt.z,wt)}}else Mt.visible&&m.push(w,ft,Mt,H,Rt.z,null)}}let it=w.children;for(let ft=0,Mt=it.length;ft<Mt;ft++)go(it[ft],O,H,V)}function Zc(w,O,H,V){let F=w.opaque,it=w.transmissive,ft=w.transparent;p.setupLightsView(H),y===!0&&nt.setGlobalState(M.clippingPlanes,H),V&&Lt.viewport(L.copy(V)),F.length>0&&Os(F,O,H),it.length>0&&Os(it,O,H),ft.length>0&&Os(ft,O,H),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Jc(w,O,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[V.id]===void 0&&(p.state.transmissionRenderTarget[V.id]=new An(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?Ls:Tn,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let it=p.state.transmissionRenderTarget[V.id],ft=V.viewport||L;it.setSize(ft.z,ft.w);let Mt=M.getRenderTarget();M.setRenderTarget(it),M.getClearColor(W),Q=M.getClearAlpha(),Q<1&&M.setClearColor(16777215,.5),M.clear(),It&&Ut.render(H);let bt=M.toneMapping;M.toneMapping=Gn;let Ot=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),p.setupLightsView(V),y===!0&&nt.setGlobalState(M.clippingPlanes,V),Os(w,H,V),A.updateMultisampleRenderTarget(it),A.updateRenderTargetMipmap(it),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let wt=0,te=O.length;wt<te;wt++){let le=O[wt],ue=le.object,Fe=le.geometry,ne=le.material,Et=le.group;if(ne.side===We&&ue.layers.test(V.layers)){let mn=ne.side;ne.side=Be,ne.needsUpdate=!0,Kc(ue,H,V,Fe,ne,Et),ne.side=mn,ne.needsUpdate=!0,zt=!0}}zt===!0&&(A.updateMultisampleRenderTarget(it),A.updateRenderTargetMipmap(it))}M.setRenderTarget(Mt),M.setClearColor(W,Q),Ot!==void 0&&(V.viewport=Ot),M.toneMapping=bt}function Os(w,O,H){let V=O.isScene===!0?O.overrideMaterial:null;for(let F=0,it=w.length;F<it;F++){let ft=w[F],Mt=ft.object,bt=ft.geometry,Ot=V===null?ft.material:V,zt=ft.group;Mt.layers.test(H.layers)&&Kc(Mt,O,H,bt,Ot,zt)}}function Kc(w,O,H,V,F,it){w.onBeforeRender(M,O,H,V,F,it),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(M,O,H,V,w,it),F.transparent===!0&&F.side===We&&F.forceSinglePass===!1?(F.side=Be,F.needsUpdate=!0,M.renderBufferDirect(H,O,V,F,w,it),F.side=hn,F.needsUpdate=!0,M.renderBufferDirect(H,O,V,F,w,it),F.side=We):M.renderBufferDirect(H,O,V,F,w,it),w.onAfterRender(M,O,H,V,F,it)}function Fs(w,O,H){O.isScene!==!0&&(O=Ct);let V=Pt.get(w),F=p.state.lights,it=p.state.shadowsArray,ft=F.state.version,Mt=St.getParameters(w,F.state,it,O,H),bt=St.getProgramCacheKey(Mt),Ot=V.programs;V.environment=w.isMeshStandardMaterial?O.environment:null,V.fog=O.fog,V.envMap=(w.isMeshStandardMaterial?B:v).get(w.envMap||V.environment),V.envMapRotation=V.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Ot===void 0&&(w.addEventListener("dispose",Bt),Ot=new Map,V.programs=Ot);let zt=Ot.get(bt);if(zt!==void 0){if(V.currentProgram===zt&&V.lightsStateVersion===ft)return Qc(w,Mt),zt}else Mt.uniforms=St.getUniforms(w),w.onBeforeCompile(Mt,M),zt=St.acquireProgram(Mt,bt),Ot.set(bt,zt),V.uniforms=Mt.uniforms;let wt=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(wt.clippingPlanes=nt.uniform),Qc(w,Mt),V.needsLights=hu(w),V.lightsStateVersion=ft,V.needsLights&&(wt.ambientLightColor.value=F.state.ambient,wt.lightProbe.value=F.state.probe,wt.directionalLights.value=F.state.directional,wt.directionalLightShadows.value=F.state.directionalShadow,wt.spotLights.value=F.state.spot,wt.spotLightShadows.value=F.state.spotShadow,wt.rectAreaLights.value=F.state.rectArea,wt.ltc_1.value=F.state.rectAreaLTC1,wt.ltc_2.value=F.state.rectAreaLTC2,wt.pointLights.value=F.state.point,wt.pointLightShadows.value=F.state.pointShadow,wt.hemisphereLights.value=F.state.hemi,wt.directionalShadowMap.value=F.state.directionalShadowMap,wt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,wt.spotShadowMap.value=F.state.spotShadowMap,wt.spotLightMatrix.value=F.state.spotLightMatrix,wt.spotLightMap.value=F.state.spotLightMap,wt.pointShadowMap.value=F.state.pointShadowMap,wt.pointShadowMatrix.value=F.state.pointShadowMatrix),V.currentProgram=zt,V.uniformsList=null,zt}function jc(w){if(w.uniformsList===null){let O=w.currentProgram.getUniforms();w.uniformsList=Hi.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Qc(w,O){let H=Pt.get(w);H.outputColorSpace=O.outputColorSpace,H.batching=O.batching,H.batchingColor=O.batchingColor,H.instancing=O.instancing,H.instancingColor=O.instancingColor,H.instancingMorph=O.instancingMorph,H.skinning=O.skinning,H.morphTargets=O.morphTargets,H.morphNormals=O.morphNormals,H.morphColors=O.morphColors,H.morphTargetsCount=O.morphTargetsCount,H.numClippingPlanes=O.numClippingPlanes,H.numIntersection=O.numClipIntersection,H.vertexAlphas=O.vertexAlphas,H.vertexTangents=O.vertexTangents,H.toneMapping=O.toneMapping}function cu(w,O,H,V,F){O.isScene!==!0&&(O=Ct),A.resetTextureUnits();let it=O.fog,ft=V.isMeshStandardMaterial?O.environment:null,Mt=P===null?M.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ki,bt=(V.isMeshStandardMaterial?B:v).get(V.envMap||ft),Ot=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,zt=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),wt=!!H.morphAttributes.position,te=!!H.morphAttributes.normal,le=!!H.morphAttributes.color,ue=Gn;V.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ue=M.toneMapping);let Fe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ne=Fe!==void 0?Fe.length:0,Et=Pt.get(V),mn=p.state.lights;if(y===!0&&(G===!0||w!==b)){let $e=w===b&&V.id===E;nt.setState(V,w,$e)}let ie=!1;V.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==mn.state.version||Et.outputColorSpace!==Mt||F.isBatchedMesh&&Et.batching===!1||!F.isBatchedMesh&&Et.batching===!0||F.isBatchedMesh&&Et.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Et.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Et.instancing===!1||!F.isInstancedMesh&&Et.instancing===!0||F.isSkinnedMesh&&Et.skinning===!1||!F.isSkinnedMesh&&Et.skinning===!0||F.isInstancedMesh&&Et.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Et.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Et.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Et.instancingMorph===!1&&F.morphTexture!==null||Et.envMap!==bt||V.fog===!0&&Et.fog!==it||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==nt.numPlanes||Et.numIntersection!==nt.numIntersection)||Et.vertexAlphas!==Ot||Et.vertexTangents!==zt||Et.morphTargets!==wt||Et.morphNormals!==te||Et.morphColors!==le||Et.toneMapping!==ue||Et.morphTargetsCount!==ne)&&(ie=!0):(ie=!0,Et.__version=V.version);let je=Et.currentProgram;ie===!0&&(je=Fs(V,O,F));let xi=!1,He=!1,ns=!1,de=je.getUniforms(),rn=Et.uniforms;if(Lt.useProgram(je.program)&&(xi=!0,He=!0,ns=!0),V.id!==E&&(E=V.id,He=!0),xi||b!==w){Lt.buffers.depth.getReversed()?(q.copy(w.projectionMatrix),ed(q),nd(q),de.setValue(D,"projectionMatrix",q)):de.setValue(D,"projectionMatrix",w.projectionMatrix),de.setValue(D,"viewMatrix",w.matrixWorldInverse);let Dn=de.map.cameraPosition;Dn!==void 0&&Dn.setValue(D,ot.setFromMatrixPosition(w.matrixWorld)),Zt.logarithmicDepthBuffer&&de.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&de.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,He=!0,ns=!0)}if(F.isSkinnedMesh){de.setOptional(D,F,"bindMatrix"),de.setOptional(D,F,"bindMatrixInverse");let $e=F.skeleton;$e&&($e.boneTexture===null&&$e.computeBoneTexture(),de.setValue(D,"boneTexture",$e.boneTexture,A))}F.isBatchedMesh&&(de.setOptional(D,F,"batchingTexture"),de.setValue(D,"batchingTexture",F._matricesTexture,A),de.setOptional(D,F,"batchingIdTexture"),de.setValue(D,"batchingIdTexture",F._indirectTexture,A),de.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&de.setValue(D,"batchingColorTexture",F._colorsTexture,A));let is=H.morphAttributes;if((is.position!==void 0||is.normal!==void 0||is.color!==void 0)&&Nt.update(F,H,je),(He||Et.receiveShadow!==F.receiveShadow)&&(Et.receiveShadow=F.receiveShadow,de.setValue(D,"receiveShadow",F.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(rn.envMap.value=bt,rn.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&O.environment!==null&&(rn.envMapIntensity.value=O.environmentIntensity),He&&(de.setValue(D,"toneMappingExposure",M.toneMappingExposure),Et.needsLights&&lu(rn,ns),it&&V.fog===!0&&ut.refreshFogUniforms(rn,it),ut.refreshMaterialUniforms(rn,V,X,et,p.state.transmissionRenderTarget[w.id]),Hi.upload(D,jc(Et),rn,A)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Hi.upload(D,jc(Et),rn,A),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&de.setValue(D,"center",F.center),de.setValue(D,"modelViewMatrix",F.modelViewMatrix),de.setValue(D,"normalMatrix",F.normalMatrix),de.setValue(D,"modelMatrix",F.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let $e=V.uniformsGroups;for(let Dn=0,Un=$e.length;Dn<Un;Dn++){let tl=$e[Dn];N.update(tl,je),N.bind(tl,je)}}return je}function lu(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function hu(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,O,H){Pt.get(w.texture).__webglTexture=O,Pt.get(w.depthTexture).__webglTexture=H;let V=Pt.get(w);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,O){let H=Pt.get(w);H.__webglFramebuffer=O,H.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(w,O=0,H=0){P=w,R=O,C=H;let V=!0,F=null,it=!1,ft=!1;if(w){let bt=Pt.get(w);if(bt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(D.FRAMEBUFFER,null),V=!1;else if(bt.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(bt.__hasExternalTextures)A.rebindTextures(w,Pt.get(w.texture).__webglTexture,Pt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let wt=w.depthTexture;if(bt.__boundDepthTexture!==wt){if(wt!==null&&Pt.has(wt)&&(w.width!==wt.image.width||w.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}let Ot=w.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(ft=!0);let zt=Pt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(zt[O])?F=zt[O][H]:F=zt[O],it=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?F=Pt.get(w).__webglMultisampledFramebuffer:Array.isArray(zt)?F=zt[H]:F=zt,L.copy(w.viewport),k.copy(w.scissor),z=w.scissorTest}else L.copy(At).multiplyScalar(X).floor(),k.copy(Gt).multiplyScalar(X).floor(),z=Qt;if(Lt.bindFramebuffer(D.FRAMEBUFFER,F)&&V&&Lt.drawBuffers(w,F),Lt.viewport(L),Lt.scissor(k),Lt.setScissorTest(z),it){let bt=Pt.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,bt.__webglTexture,H)}else if(ft){let bt=Pt.get(w.texture),Ot=O||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,bt.__webglTexture,H||0,Ot)}E=-1},this.readRenderTargetPixels=function(w,O,H,V,F,it,ft){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=Pt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ft!==void 0&&(Mt=Mt[ft]),Mt){Lt.bindFramebuffer(D.FRAMEBUFFER,Mt);try{let bt=w.texture,Ot=bt.format,zt=bt.type;if(!Zt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Zt.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-V&&H>=0&&H<=w.height-F&&D.readPixels(O,H,V,F,Ht.convert(Ot),Ht.convert(zt),it)}finally{let bt=P!==null?Pt.get(P).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(w,O,H,V,F,it,ft){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=Pt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ft!==void 0&&(Mt=Mt[ft]),Mt){let bt=w.texture,Ot=bt.format,zt=bt.type;if(!Zt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Zt.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=w.width-V&&H>=0&&H<=w.height-F){Lt.bindFramebuffer(D.FRAMEBUFFER,Mt);let wt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,wt),D.bufferData(D.PIXEL_PACK_BUFFER,it.byteLength,D.STREAM_READ),D.readPixels(O,H,V,F,Ht.convert(Ot),Ht.convert(zt),0);let te=P!==null?Pt.get(P).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,te);let le=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await td(D,le,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,wt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,it),D.deleteBuffer(wt),D.deleteSync(le),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,O=null,H=0){w.isTexture!==!0&&(ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,w=arguments[1]);let V=Math.pow(2,-H),F=Math.floor(w.image.width*V),it=Math.floor(w.image.height*V),ft=O!==null?O.x:0,Mt=O!==null?O.y:0;A.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,ft,Mt,F,it),Lt.unbindTexture()},this.copyTextureToTexture=function(w,O,H=null,V=null,F=0){w.isTexture!==!0&&(ps("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1],O=arguments[2],F=arguments[3]||0,H=null);let it,ft,Mt,bt,Ot,zt,wt,te,le,ue=w.isCompressedTexture?w.mipmaps[F]:w.image;H!==null?(it=H.max.x-H.min.x,ft=H.max.y-H.min.y,Mt=H.isBox3?H.max.z-H.min.z:1,bt=H.min.x,Ot=H.min.y,zt=H.isBox3?H.min.z:0):(it=ue.width,ft=ue.height,Mt=ue.depth||1,bt=0,Ot=0,zt=0),V!==null?(wt=V.x,te=V.y,le=V.z):(wt=0,te=0,le=0);let Fe=Ht.convert(O.format),ne=Ht.convert(O.type),Et;O.isData3DTexture?(A.setTexture3D(O,0),Et=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Et=D.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Et=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);let mn=D.getParameter(D.UNPACK_ROW_LENGTH),ie=D.getParameter(D.UNPACK_IMAGE_HEIGHT),je=D.getParameter(D.UNPACK_SKIP_PIXELS),xi=D.getParameter(D.UNPACK_SKIP_ROWS),He=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ue.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ue.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,bt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ot),D.pixelStorei(D.UNPACK_SKIP_IMAGES,zt);let ns=w.isDataArrayTexture||w.isData3DTexture,de=O.isDataArrayTexture||O.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){let rn=Pt.get(w),is=Pt.get(O),$e=Pt.get(rn.__renderTarget),Dn=Pt.get(is.__renderTarget);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,$e.__webglFramebuffer),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let Un=0;Un<Mt;Un++)ns&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Pt.get(w).__webglTexture,F,zt+Un),w.isDepthTexture?(de&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Pt.get(O).__webglTexture,F,le+Un),D.blitFramebuffer(bt,Ot,it,ft,wt,te,it,ft,D.DEPTH_BUFFER_BIT,D.NEAREST)):de?D.copyTexSubImage3D(Et,F,wt,te,le+Un,bt,Ot,it,ft):D.copyTexSubImage2D(Et,F,wt,te,le+Un,bt,Ot,it,ft);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else de?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(Et,F,wt,te,le,it,ft,Mt,Fe,ne,ue.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(Et,F,wt,te,le,it,ft,Mt,Fe,ue.data):D.texSubImage3D(Et,F,wt,te,le,it,ft,Mt,Fe,ne,ue):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,F,wt,te,it,ft,Fe,ne,ue.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,F,wt,te,ue.width,ue.height,Fe,ue.data):D.texSubImage2D(D.TEXTURE_2D,F,wt,te,it,ft,Fe,ne,ue);D.pixelStorei(D.UNPACK_ROW_LENGTH,mn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ie),D.pixelStorei(D.UNPACK_SKIP_PIXELS,je),D.pixelStorei(D.UNPACK_SKIP_ROWS,xi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,He),F===0&&O.generateMipmaps&&D.generateMipmap(Et),Lt.unbindTexture()},this.copyTextureToTexture3D=function(w,O,H=null,V=null,F=0){return w.isTexture!==!0&&(ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,w=arguments[2],O=arguments[3],F=arguments[4]||0),ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,O,H,V,F)},this.initRenderTarget=function(w){Pt.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),Lt.unbindTexture()},this.resetState=function(){R=0,C=0,P=null,Lt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}};var Ur=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Tt(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},qn=class extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ze,this.environmentIntensity=1,this.environmentRotation=new Ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Nr=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ba,this.updateRanges=[],this.version=0,this.uuid=Wn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Wn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Le=new I,Ss=class s{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=an(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=an(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=an(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=an(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=an(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new s(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Es=class extends Cn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Li,cs=new I,Di=new I,Ui=new I,Ni=new at,ls=new at,Nh=new ee,rr=new I,hs=new I,or=new I,th=new at,$o=new at,eh=new at,Or=class extends Ae{constructor(t=new Es){if(super(),this.isSprite=!0,this.type="Sprite",Li===void 0){Li=new ge;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Nr(e,5);Li.setIndex([0,1,2,0,2,3]),Li.setAttribute("position",new Ss(n,3,0,!1)),Li.setAttribute("uv",new Ss(n,2,3,!1))}this.geometry=Li,this.material=t,this.center=new at(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Di.setFromMatrixScale(this.matrixWorld),Nh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ui.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Di.multiplyScalar(-Ui.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;ar(rr.set(-.5,-.5,0),Ui,o,Di,i,r),ar(hs.set(.5,-.5,0),Ui,o,Di,i,r),ar(or.set(.5,.5,0),Ui,o,Di,i,r),th.set(0,0),$o.set(1,0),eh.set(1,1);let a=t.ray.intersectTriangle(rr,hs,or,!1,cs);if(a===null&&(ar(hs.set(-.5,.5,0),Ui,o,Di,i,r),$o.set(0,1),a=t.ray.intersectTriangle(rr,or,hs,!1,cs),a===null))return;let c=t.ray.origin.distanceTo(cs);c<t.near||c>t.far||e.push({distance:c,point:cs.clone(),uv:wn.getInterpolation(cs,rr,hs,or,th,$o,eh,new at),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function ar(s,t,e,n,i,r){Ni.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(ls.x=r*Ni.x-i*Ni.y,ls.y=i*Ni.x+r*Ni.y):ls.copy(Ni),s.copy(t),s.x+=ls.x,s.y+=ls.y,s.applyMatrix4(Nh)}var nc=class extends ze{constructor(t=null,e=1,n=1,i,r,o,a,c,l=Xe,h=Xe,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ts=class extends be{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Oi=new ee,nh=new ee,cr=[],ih=new Rn,Kg=new ee,us=new gt,ds=new $n,As=class extends gt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ts(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Kg)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Oi),ih.copy(t.boundingBox).applyMatrix4(Oi),this.boundingBox.union(ih)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new $n),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Oi),ds.copy(t.boundingSphere).applyMatrix4(Oi),this.boundingSphere.union(ds)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(us.geometry=this.geometry,us.material=this.material,us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(n),t.ray.intersectsSphere(ds)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Oi),nh.multiplyMatrices(n,Oi),us.matrixWorld=nh,us.raycast(t,cr);for(let o=0,a=cr.length;o<a;o++){let c=cr[o];c.instanceId=r,c.object=this,e.push(c)}cr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ts(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new nc(new Float32Array(i*this.count),i,this.count,Ic,ln));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var qi=class extends Cn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Fr=new I,Br=new I,sh=new ee,fs=new Ms,lr=new $n,Yo=new I,rh=new I,ic=class extends Ae{constructor(t=new ge,e=new qi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Fr.fromBufferAttribute(e,i-1),Br.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Fr.distanceTo(Br);t.setAttribute("lineDistance",new Yt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(i),lr.radius+=r,t.ray.intersectsSphere(lr)===!1)return;sh.copy(i).invert(),fs.copy(t.ray).applyMatrix4(sh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=h.getX(x),S=h.getX(x+1),T=hr(this,t,fs,c,p,S);T&&e.push(T)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),p=hr(this,t,fs,c,x,m);p&&e.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=hr(this,t,fs,c,x,x+1);p&&e.push(p)}if(this.isLineLoop){let x=hr(this,t,fs,c,g-1,f);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function hr(s,t,e,n,i,r){let o=s.geometry.attributes.position;if(Fr.fromBufferAttribute(o,i),Br.fromBufferAttribute(o,r),e.distanceSqToSegment(Fr,Br,Yo,rh)>n)return;Yo.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Yo);if(!(c<t.near||c>t.far))return{distance:c,point:rh.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}var oh=new I,ah=new I,Rs=class extends ic{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)oh.fromBufferAttribute(e,i),ah.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+oh.distanceTo(ah);t.setAttribute("lineDistance",new Yt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Cs=class extends ze{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Je=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new at:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new I,i=[],r=[],o=[],a=new I,c=new ee;for(let f=0;f<=t;f++){let g=f/t;i[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(Te(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Te(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Is=class extends Je{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new at){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},sc=class extends Is{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Nc(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var ur=new I,qo=new Nc,Zo=new Nc,Jo=new Nc,rc=class extends Je{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(ur.subVectors(i[0],i[1]).add(i[0]),l=ur);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(ur.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ur),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),qo.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,x,m),Zo.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,x,m),Jo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(qo.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Zo.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Jo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(qo.calc(c),Zo.calc(c),Jo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ch(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function jg(s,t){let e=1-s;return e*e*t}function Qg(s,t){return 2*(1-s)*s*t}function t0(s,t){return s*s*t}function xs(s,t,e,n){return jg(s,t)+Qg(s,e)+t0(s,n)}function e0(s,t){let e=1-s;return e*e*e*t}function n0(s,t){let e=1-s;return 3*e*e*s*t}function i0(s,t){return 3*(1-s)*s*s*t}function s0(s,t){return s*s*s*t}function _s(s,t,e,n,i){return e0(s,t)+n0(s,e)+i0(s,n)+s0(s,i)}var zr=class extends Je{constructor(t=new at,e=new at,n=new at,i=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new at){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_s(t,i.x,r.x,o.x,a.x),_s(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},oc=class extends Je{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_s(t,i.x,r.x,o.x,a.x),_s(t,i.y,r.y,o.y,a.y),_s(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},kr=class extends Je{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ac=class extends Je{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Hr=class extends Je{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(xs(t,i.x,r.x,o.x),xs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},cc=class extends Je{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(xs(t,i.x,r.x,o.x),xs(t,i.y,r.y,o.y),xs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vr=class extends Je{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(ch(a,c.x,l.x,h.x,u.x),ch(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new at().fromArray(i))}return this}},lh=Object.freeze({__proto__:null,ArcCurve:sc,CatmullRomCurve3:rc,CubicBezierCurve:zr,CubicBezierCurve3:oc,EllipseCurve:Is,LineCurve:kr,LineCurve3:ac,QuadraticBezierCurve:Hr,QuadraticBezierCurve3:cc,SplineCurve:Vr}),lc=class extends Je{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new lh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new lh[i.type]().fromJSON(i))}return this}},hc=class extends lc{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new kr(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new Hr(this.currentPoint.clone(),new at(t,e),new at(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new zr(this.currentPoint.clone(),new at(t,e),new at(n,i),new at(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Vr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){let l=new Is(t,e,n,i,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},uc=class s extends ge{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Te(i,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new I,d=new at,f=new I,g=new I,x=new I,m=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-m,f.z=p*0,x.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),c.push(f.x,f.y,f.z),x.copy(g)}for(let S=0;S<=e;S++){let T=n+S*h*i,M=Math.sin(T),U=Math.cos(T);for(let R=0;R<=t.length-1;R++){u.x=t[R].x*M,u.y=t[R].y,u.z=t[R].x*U,o.push(u.x,u.y,u.z),d.x=S/e,d.y=R/(t.length-1),a.push(d.x,d.y);let C=c[3*R+0]*M,P=c[3*R+1],E=c[3*R+0]*U;l.push(C,P,E)}}for(let S=0;S<e;S++)for(let T=0;T<t.length-1;T++){let M=T+S*t.length,U=M,R=M+t.length,C=M+t.length+1,P=M+1;r.push(U,R,P),r.push(C,P,R)}this.setIndex(r),this.setAttribute("position",new Yt(o,3)),this.setAttribute("uv",new Yt(a,2)),this.setAttribute("normal",new Yt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.points,t.segments,t.phiStart,t.phiLength)}},Zi=class s extends uc{constructor(t=1,e=1,n=4,i=8){let r=new hc;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new s(t.radius,t.length,t.capSegments,t.radialSegments)}};var Ne=class s extends ge{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,x=[],m=n/2,p=0;S(),o===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Yt(u,3)),this.setAttribute("normal",new Yt(d,3)),this.setAttribute("uv",new Yt(f,2));function S(){let M=new I,U=new I,R=0,C=(e-t)/n;for(let P=0;P<=r;P++){let E=[],b=P/r,L=b*(e-t)+t;for(let k=0;k<=i;k++){let z=k/i,W=z*c+a,Q=Math.sin(W),Y=Math.cos(W);U.x=L*Q,U.y=-b*n+m,U.z=L*Y,u.push(U.x,U.y,U.z),M.set(Q,C,Y).normalize(),d.push(M.x,M.y,M.z),f.push(z,1-b),E.push(g++)}x.push(E)}for(let P=0;P<i;P++)for(let E=0;E<r;E++){let b=x[E][P],L=x[E+1][P],k=x[E+1][P+1],z=x[E][P+1];(t>0||E!==0)&&(h.push(b,L,z),R+=3),(e>0||E!==r-1)&&(h.push(L,k,z),R+=3)}l.addGroup(p,R,0),p+=R}function T(M){let U=g,R=new at,C=new I,P=0,E=M===!0?t:e,b=M===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,m*b,0),d.push(0,b,0),f.push(.5,.5),g++;let L=g;for(let k=0;k<=i;k++){let W=k/i*c+a,Q=Math.cos(W),Y=Math.sin(W);C.x=E*Y,C.y=m*b,C.z=E*Q,u.push(C.x,C.y,C.z),d.push(0,b,0),R.x=Q*.5+.5,R.y=Y*.5*b+.5,f.push(R.x,R.y),g++}for(let k=0;k<i;k++){let z=U+k,W=L+k;M===!0?h.push(W,W+1,z):h.push(W+1,W,z),P+=3}l.addGroup(p,P,M===!0?1:2),p+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Gr=class s extends Ne{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new s(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},dc=class s extends ge{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let T=new I,M=new I,U=new I;for(let R=0;R<e.length;R+=3)f(e[R+0],T),f(e[R+1],M),f(e[R+2],U),c(T,M,U,S)}function c(S,T,M,U){let R=U+1,C=[];for(let P=0;P<=R;P++){C[P]=[];let E=S.clone().lerp(M,P/R),b=T.clone().lerp(M,P/R),L=R-P;for(let k=0;k<=L;k++)k===0&&P===R?C[P][k]=E:C[P][k]=E.clone().lerp(b,k/L)}for(let P=0;P<R;P++)for(let E=0;E<2*(R-P)-1;E++){let b=Math.floor(E/2);E%2===0?(d(C[P][b+1]),d(C[P+1][b]),d(C[P][b])):(d(C[P][b+1]),d(C[P+1][b+1]),d(C[P+1][b]))}}function l(S){let T=new I;for(let M=0;M<r.length;M+=3)T.x=r[M+0],T.y=r[M+1],T.z=r[M+2],T.normalize().multiplyScalar(S),r[M+0]=T.x,r[M+1]=T.y,r[M+2]=T.z}function h(){let S=new I;for(let T=0;T<r.length;T+=3){S.x=r[T+0],S.y=r[T+1],S.z=r[T+2];let M=m(S)/2/Math.PI+.5,U=p(S)/Math.PI+.5;o.push(M,1-U)}g(),u()}function u(){for(let S=0;S<o.length;S+=6){let T=o[S+0],M=o[S+2],U=o[S+4],R=Math.max(T,M,U),C=Math.min(T,M,U);R>.9&&C<.1&&(T<.2&&(o[S+0]+=1),M<.2&&(o[S+2]+=1),U<.2&&(o[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function f(S,T){let M=S*3;T.x=t[M+0],T.y=t[M+1],T.z=t[M+2]}function g(){let S=new I,T=new I,M=new I,U=new I,R=new at,C=new at,P=new at;for(let E=0,b=0;E<r.length;E+=9,b+=6){S.set(r[E+0],r[E+1],r[E+2]),T.set(r[E+3],r[E+4],r[E+5]),M.set(r[E+6],r[E+7],r[E+8]),R.set(o[b+0],o[b+1]),C.set(o[b+2],o[b+3]),P.set(o[b+4],o[b+5]),U.copy(S).add(T).add(M).divideScalar(3);let L=m(U);x(R,b+0,S,L),x(C,b+2,T,L),x(P,b+4,M,L)}}function x(S,T,M,U){U<0&&S.x===1&&(o[T]=S.x-1),M.x===0&&M.z===0&&(o[T]=U/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.vertices,t.indices,t.radius,t.details)}};var dr=new I,fr=new I,Ko=new I,pr=new wn,Wr=class extends ge{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(Mr*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){o?(l[0]=o.getX(g),l[1]=o.getX(g+1),l[2]=o.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:x,b:m,c:p}=pr;if(x.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),pr.getNormal(Ko),u[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let S=0;S<3;S++){let T=(S+1)%3,M=u[S],U=u[T],R=pr[h[S]],C=pr[h[T]],P=`${M}_${U}`,E=`${U}_${M}`;E in d&&d[E]?(Ko.dot(d[E].normal)<=r&&(f.push(R.x,R.y,R.z),f.push(C.x,C.y,C.z)),d[E]=null):P in d||(d[P]={index0:l[S],index1:l[T],normal:Ko.clone()})}}for(let g in d)if(d[g]){let{index0:x,index1:m}=d[g];dr.fromBufferAttribute(a,x),fr.fromBufferAttribute(a,m),f.push(dr.x,dr.y,dr.z),f.push(fr.x,fr.y,fr.z)}this.setAttribute("position",new Yt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var Xr=class s extends dc{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new s(t.radius,t.detail)}};var Ps=class s extends ge{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],c=[],l=[],h=[],u=t,d=(e-t)/i,f=new I,g=new at;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){let p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<i;x++){let m=x*(n+1);for(let p=0;p<n;p++){let S=p+m,T=S,M=S+n+1,U=S+n+2,R=S+1;a.push(T,M,R),a.push(M,U,R)}}this.setIndex(a),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(l,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var dn=class s extends ge{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new I,d=new I,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let S=[],T=p/n,M=0;p===0&&o===0?M=.5/e:p===n&&c===Math.PI&&(M=-.5/e);for(let U=0;U<=e;U++){let R=U/e;u.x=-t*Math.cos(i+R*r)*Math.sin(o+T*a),u.y=t*Math.cos(o+T*a),u.z=t*Math.sin(i+R*r)*Math.sin(o+T*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(R+M,1-T),S.push(l++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){let T=h[p][S+1],M=h[p][S],U=h[p+1][S],R=h[p+1][S+1];(p!==0||o>0)&&f.push(T,M,R),(p!==n-1||c<Math.PI)&&f.push(M,U,R)}this.setIndex(f),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(x,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var $t=class extends Cn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eh,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=Tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function mr(s,t,e){return!s||!e&&s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function r0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}var Ji=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fc=class extends Ji{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rl,endingEnd:rl}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ol:r=t,a=2*e-n;break;case al:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ol:o=t,c=2*n-e;break;case al:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-e)/(i-e),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,S=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,T=(-1-f)*m+(1.5+f)*x+.5*g,M=f*m-f*x;for(let U=0;U!==a;++U)r[U]=p*o[h+U]+S*o[l+U]+T*o[c+U]+M*o[u+U];return r}},pc=class extends Ji{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},mc=class extends Ji{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},sn=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=mr(e,this.TimeBufferType),this.values=mr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:mr(t.times,Array),values:mr(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new mc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new pc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new fc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case br:e=this.InterpolantFactoryMethodDiscrete;break;case Fa:e=this.InterpolantFactoryMethodLinear;break;case _o:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return br;case this.InterpolantFactoryMethodLinear:return Fa;case this.InterpolantFactoryMethodSmooth:return _o}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&r0(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===_o,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(i)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};sn.prototype.TimeBufferType=Float32Array;sn.prototype.ValueBufferType=Float32Array;sn.prototype.DefaultInterpolation=Fa;var fi=class extends sn{constructor(t,e,n){super(t,e,n)}};fi.prototype.ValueTypeName="bool";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=br;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;var gc=class extends sn{};gc.prototype.ValueTypeName="color";var xc=class extends sn{};xc.prototype.ValueTypeName="number";var _c=class extends Ji{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e),l=t*a;for(let h=l+a;l!==h;l+=4)qe.slerpFlat(r,0,o,l-a,o,l,c);return r}},$r=class extends sn{InterpolantFactoryMethodLinear(t){return new _c(this.times,this.values,this.getValueSize(),t)}};$r.prototype.ValueTypeName="quaternion";$r.prototype.InterpolantFactoryMethodSmooth=void 0;var pi=class extends sn{constructor(t,e,n){super(t,e,n)}};pi.prototype.ValueTypeName="string";pi.prototype.ValueBufferType=Array;pi.prototype.DefaultInterpolation=br;pi.prototype.InterpolantFactoryMethodLinear=void 0;pi.prototype.InterpolantFactoryMethodSmooth=void 0;var yc=class extends sn{};yc.prototype.ValueTypeName="vector";var vc=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},o0=new vc,Mc=class{constructor(t){this.manager=t!==void 0?t:o0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Mc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yr=class extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Zn=class extends Yr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Tt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},jo=new ee,hh=new I,uh=new I,bc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ws,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;hh.setFromMatrixPosition(t.matrixWorld),e.position.copy(hh),uh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uh),e.updateMatrixWorld(),jo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var wc=class extends bc{constructor(){super(new Pr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Jn=class extends Yr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new wc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Oc="\\[\\]\\.:\\/",a0=new RegExp("["+Oc+"]","g"),Fc="[^"+Oc+"]",c0="[^"+Oc.replace("\\.","")+"]",l0=/((?:WC+[\/:])*)/.source.replace("WC",Fc),h0=/(WCOD+)?/.source.replace("WCOD",c0),u0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fc),d0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fc),f0=new RegExp("^"+l0+h0+u0+d0+"$"),p0=["material","materials","bones","map"],Sc=class{constructor(t,e,n){let i=n||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},pe=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(a0,"")}static parseTrackName(t){let e=f0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);p0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[i];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Sc;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var A0=new Float32Array(1);var dh=new ee,Kn=class{constructor(t,e,n=0,i=1/0){this.ray=new Ms(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new bs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return dh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dh),this}intersectObject(t,e=!0,n=[]){return Ec(t,this,n,e),n.sort(fh),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Ec(t[i],this,n,e);return n.sort(fh),n}};function fh(s,t){return s.distance-t.distance}function Ec(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Ec(r[o],t,e,!0)}}var qr=class extends Rs{constructor(t=10,e=10,n=4473924,i=8947848){n=new Tt(n),i=new Tt(i);let r=e/2,o=t/e,a=t/2,c=[],l=[];for(let d=0,f=0,g=-a;d<=e;d++,g+=o){c.push(-a,0,g,a,0,g),c.push(g,0,-a,g,0,a);let x=d===r?n:i;x.toArray(l,f),f+=3,x.toArray(l,f),f+=3,x.toArray(l,f),f+=3,x.toArray(l,f),f+=3}let h=new ge;h.setAttribute("position",new Yt(c,3)),h.setAttribute("color",new Yt(l,3));let u=new qi({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");var fn=class extends Error{constructor(t,e){super(e?.message||"Request failed"),this.status=t,this.code=e?.error||"ERROR",this.data=e||{}}};async function Oh(s,t,e,n={}){let i;try{i=await fetch(t,{method:s,credentials:"same-origin",headers:e!==void 0&&!n.raw?{"content-type":"application/json",...n.headers||{}}:n.headers||{},body:n.raw?e:e!==void 0?JSON.stringify(e):void 0})}catch{throw new fn(0,{error:"NETWORK",message:"Cannot reach the server. Check your connection."})}let r=null;try{r=await i.json()}catch{}if(!i.ok)throw new fn(i.status,r||{message:`Server error (${i.status})`});return r}var se=s=>Oh("GET",s),Dt=(s,t={})=>Oh("POST",s,t),vt=s=>"\u20A6"+Math.round(s).toLocaleString("en-NG"),st=(s,t=document)=>t.querySelector(s),Bc=(s,t=document)=>[...t.querySelectorAll(s)];function _(s,t={},...e){let n=document.createElement(s);for(let[i,r]of Object.entries(t||{}))i==="class"?n.className=r:i.startsWith("on")?n.addEventListener(i.slice(2),r):r!==!1&&r!=null&&n.setAttribute(i,r===!0?"":r);for(let i of e.flat())i!=null&&i!==!1&&n.append(i.nodeType?i:document.createTextNode(String(i)));return n}function Bh(s,t=!1){let e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,c=new ge,l=0;for(let h=0;h<s.length;++h){let u=s[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0,u=[];for(let d=0;d<s.length;++d){let f=s[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=s[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Fh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);let g=Fh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Fh(s){let t,e,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new be(o,e,n),c=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){let x=h.getComponent(d,g);a.setComponent(d+u,g,x)}}else o.set(h.array,c);c+=h.count*e}return i!==void 0&&(a.gpuType=i),a}function Qi(s){return function(){s|=0,s=s+1831565813|0;let t=Math.imul(s^s>>>15,1|s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var jr=new Tt,zc=new ee,Qr=new qe,to=new Ze,eo=new I,no=new I,ke=class{constructor(t=1,e=.035){this.parts=[],this.rnd=Qi(t),this.jit=e,this.uvScale=.14}_col(t,e){jr.set(t);let n=1+(this.rnd()*2-1)*(e??this.jit);return[jr.r*n,jr.g*n,jr.b*n]}_push(t,e,n,i,r,o={}){t.index&&(t=t.toNonIndexed()),to.set(o.rx||0,o.ry||0,o.rz||0,"YXZ"),Qr.setFromEuler(to),eo.set(e,n,i),no.set(o.sx??1,o.sy??1,o.sz??1),zc.compose(eo,Qr,no),t.applyMatrix4(zc);let a=t.attributes.position,c=t.attributes.normal,l=a.count,h=new Float32Array(l*3),u=t.attributes.uv&&o.keepUV?null:new Float32Array(l*2),[d,f,g]=this._col(r,o.jit);for(let x=0;x<l;x++){let m=1;if(!o.noAO&&Math.abs(c.getY(x))<.5&&(m=.8+.2*Math.min(1,Math.max(0,a.getY(x)/2.4))),o.shade&&(m*=o.shade),h[x*3]=d*m,h[x*3+1]=f*m,h[x*3+2]=g*m,u){let p=Math.abs(c.getX(x)),S=Math.abs(c.getY(x)),T=Math.abs(c.getZ(x)),M=a.getX(x),U=a.getY(x),R=a.getZ(x),C,P;S>=p&&S>=T?(C=M,P=R):p>=T?(C=R,P=U):(C=M,P=U),u[x*2]=C*this.uvScale,u[x*2+1]=P*this.uvScale}}t.setAttribute("color",new be(h,3)),u&&t.setAttribute("uv",new be(u,2));for(let x of Object.keys(t.attributes))["position","normal","color","uv"].includes(x)||t.deleteAttribute(x);return this.parts.push(t),this}box(t,e,n,i,r,o,a,c){return this._push(new qt(t,e,n),i,r+e/2,o,a,c)}cyl(t,e,n,i,r,o,a,c,l){return this._push(new Ne(t,e,n,i),r,o+n/2,a,c,l)}wheel(t,e,n,i,r,o,a={}){return this._push(new Ne(t,t,e,10),n,i,r,o,{...a,rx:Math.PI/2,noAO:!0})}sphere(t,e,n,i,r,o={}){return this._push(new dn(t,o.ws||8,o.hs||6),e,n,i,r,o)}ico(t,e,n,i,r,o={}){return this._push(new Xr(t,o.detail||0),e,n,i,r,o)}capsule(t,e,n,i,r,o,a={}){return this._push(new Zi(t,e,3,8),n,i+t+e/2,r,o,a)}cone(t,e,n,i,r,o,a,c){return this.cyl(.001,t,e,n,i,r,o,a,c)}plane(t,e,n,i,r,o,a){return this._push(new Re(t,e),n,i,r,o,a)}gable(t,e,n,i,r,o,a,c={}){let l=t/2,h=e/2,u=[[-l,0,-h],[l,0,-h],[l,0,h],[-l,0,h],[0,n,-h],[0,n,h]],d=[[0,3,5,0,5,4],[1,4,5,1,5,2],[0,4,1],[3,2,5],[0,1,2,0,2,3]],f=[];for(let x of d)for(let m of x)f.push(...u[m]);let g=new ge;return g.setAttribute("position",new Yt(f,3)),g.computeVertexNormals(),this._push(g,i,r,o,a,c)}quad(t,e,n,i,r,o={}){let a=new ge;return a.setAttribute("position",new Yt([...t,...e,...n,...t,...n,...i],3)),a.computeVertexNormals(),this._push(a,0,0,0,r,o)}uvQuad(t,e,n,i,r,o=16777215,a={}){let c=new ge;c.setAttribute("position",new Yt([...t,...e,...n,...t,...n,...i],3));let[l,h,u,d,f,g,x,m]=r;return c.setAttribute("uv",new Yt([l,h,u,d,f,g,l,h,f,g,x,m],2)),c.computeVertexNormals(),this._push(c,0,0,0,o,{...a,keepUV:!0,noAO:!0})}addGeo(t,e,n,i,r=0){let o=t.clone();return to.set(0,r,0),Qr.setFromEuler(to),eo.set(e,n,i),no.set(1,1,1),o.applyMatrix4(zc.compose(eo,Qr,no)),this.parts.push(o),this}build(){if(!this.parts.length)return new ge;let t=Bh(this.parts,!1);return this.parts.forEach(e=>e.dispose()),this.parts=[],t.computeBoundingSphere(),t.computeBoundingBox(),t}};var Pn=(s,t)=>{let e=document.createElement("canvas");return e.width=s,e.height=t,e};function kc(s){let t=s;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Ln=(s,t=!1)=>{let e=new Cs(s);return e.colorSpace=Ue,e.anisotropy=4,t&&(e.wrapS=e.wrapT=ys),e};function zh(){let t=Pn(128,128),e=Pn(128,128),n=t.getContext("2d"),i=e.getContext("2d");n.fillStyle="#ffffff",n.fillRect(0,0,128,128),i.fillStyle="#000",i.fillRect(0,0,128,128);let r=(o,a)=>{o.fillStyle=a,o.fillRect(34,30,60,56)};return r(n,"#6f8796"),n.fillStyle="rgba(0,0,0,.18)",n.fillRect(34,30,60,3),n.fillRect(34,83,60,3),n.fillRect(62,30,4,56),n.fillStyle="rgba(0,0,0,.08)",n.fillRect(0,118,128,10),r(i,"#ffd27a"),{map:Ln(t,!0),emissiveMap:Ln(e,!0)}}function kh(){let s=Pn(64,256),t=s.getContext("2d"),e=kc(3);t.fillStyle="#34373c",t.fillRect(0,0,64,256);for(let i=0;i<500;i++){let r=40+e()*30;t.fillStyle=`rgb(${r},${r+2},${r+5})`,t.fillRect(e()*64,e()*256,1+e()*2,1+e()*2)}t.fillStyle="#e8e6df",t.fillRect(2,0,2,256),t.fillRect(60,0,2,256),t.fillStyle="#f2c744";for(let i=0;i<256;i+=64)t.fillRect(30,i+8,4,36);return Ln(s,!0)}function Hh(){let s=Pn(128,128),t=s.getContext("2d"),e=kc(8);t.fillStyle="#b9b5a6",t.fillRect(0,0,128,128);for(let n=0;n<700;n++){let i=150+e()*60;t.fillStyle=`rgba(${i},${i-4},${i-14},.5)`,t.fillRect(e()*128,e()*128,1+e()*3,1+e()*3)}t.strokeStyle="rgba(80,76,66,.35)",t.lineWidth=1;for(let n=0;n<=128;n+=32)t.beginPath(),t.moveTo(n,0),t.lineTo(n,128),t.moveTo(0,n),t.lineTo(128,n),t.stroke();return Ln(s,!0)}function Vh(){let s=Pn(256,256),t=s.getContext("2d"),e=kc(12);t.fillStyle="#2b6f8a",t.fillRect(0,0,256,256);for(let n=0;n<160;n++){t.strokeStyle=`rgba(255,255,255,${.05+e()*.12})`,t.lineWidth=1+e()*2;let i=e()*256,r=e()*256;t.beginPath(),t.moveTo(i,r),t.quadraticCurveTo(i+14,r-5,i+30,r),t.stroke()}return Ln(s,!0)}function io(){let s=Pn(64,64),t=s.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,.55)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Ln(s)}function Gh(s,t="#ffffff"){let e=Pn(256,64),n=e.getContext("2d");n.font="700 30px Nunito, system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle";let i=Math.min(244,n.measureText(s).width+24);n.fillStyle="rgba(0,0,0,.55)",n.beginPath(),n.roundRect(128-i/2,10,i,44,14),n.fill(),n.fillStyle=t,n.fillText(s,128,33);let r=new Cs(e);return r.colorSpace=Ue,r}function Wh(s,t,e,n="Advertise here: /advertise",i=0){let r=Pn(s,t),o=r.getContext("2d"),a=[["#0b6b3a","#f6c744"],["#1e3a8a","#fb923c"],["#7c2d12","#fde68a"],["#14532d","#ffffff"]],[c,l]=a[i%a.length],h=o.createLinearGradient(0,0,s,t);h.addColorStop(0,c),h.addColorStop(1,"#0a0a0a"),o.fillStyle=h,o.fillRect(0,0,s,t),o.fillStyle=l,o.globalAlpha=.12;for(let u=0;u<8;u++)o.beginPath(),o.arc(s*(u/7),t*.9,t*.35,0,7),o.fill();return o.globalAlpha=1,o.fillStyle=l,o.textAlign="center",o.font=`800 ${Math.round(t*.2)}px "Lilita One", Nunito, sans-serif`,o.fillText("YOUR AD HERE",s/2,t*.42),o.fillStyle="#fff",o.font=`700 ${Math.round(t*.085)}px Nunito, sans-serif`,o.fillText(n,s/2,t*.58),o.font=`600 ${Math.round(t*.06)}px Nunito, sans-serif`,o.globalAlpha=.75,o.fillText(e,s/2,t*.72),o.globalAlpha=1,o.fillStyle="rgba(255,255,255,.85)",o.font=`700 ${Math.round(t*.05)}px Nunito, sans-serif`,o.textAlign="right",o.fillText("House ad",s-14,t-12),Ln(r)}function Xh(s,t,e,n){let i=Pn(t,e),r=i.getContext("2d");return r.fillStyle="#111",r.fillRect(0,0,t,e),r.drawImage(s,0,0,t,e),r.fillStyle="rgba(0,0,0,.6)",r.fillRect(t-190,e-36,190,36),r.fillStyle="#fff",r.font="700 20px Nunito, sans-serif",r.textAlign="right",r.fillText("Sponsored \xB7 "+String(n||"").slice(0,14),t-10,e-11),Ln(i)}function $h(s,t){return Ln(s,t)}var so=(s,t,e)=>new Tt(s).lerp(new Tt(t),e);function m0(s,t,e="#fff",n=512,i=128){let r=document.createElement("canvas");r.width=n,r.height=i;let o=r.getContext("2d");o.fillStyle=t,o.fillRect(0,0,n,i),o.strokeStyle="rgba(255,255,255,.7)",o.lineWidth=6,o.strokeRect(6,6,n-12,i-12),o.fillStyle=e,o.textAlign="center",o.textBaseline="middle";let a=62;for(o.font=`${a}px "Lilita One", Nunito, sans-serif`;o.measureText(s).width>n-40&&a>18;)a-=4,o.font=`${a}px "Lilita One", Nunito, sans-serif`;return o.fillText(s,n/2,i/2+3),$h(r)}function Yh(s){let t=new qn,e=new fe;t.add(e);let n=[],i={},r={},o=[],a=new Zn(14675967,7036746,.9);t.add(a);let c=new Jn(16773590,1.4);c.position.set(120,200,80),t.add(c);let l=new $t({vertexColors:!0}),h=zh(),u=new $t({vertexColors:!0,map:h.map,emissive:16777215,emissiveMap:h.emissiveMap,emissiveIntensity:0}),d=y=>{let G=new ke(y,.04);return G.uvScale=1/3.4,G},f=new ke(7,.03),g=d(11),x=new ke(5,0),m=Qi(99),p=s.bounds,S=Hh();S.repeat.set(60,60);let T=new gt(new Re(900,900).rotateX(-Math.PI/2),new $t({map:S,color:13617590}));T.position.set(0,-.02,-60),e.add(T);for(let y of s.zones)f.box(y.x1-y.x0+6,.2,y.z1-y.z0+6,(y.x0+y.x1)/2,-.02,(y.z0+y.z1)/2,12433318,{noAO:!0,jit:.02});let M=kh(),U=[];for(let y of s.roads){let G=Math.hypot(y.x2-y.x1,y.z2-y.z1),q=Math.abs(y.x2-y.x1)>Math.abs(y.z2-y.z1),rt=M.clone();rt.needsUpdate=!0,rt.repeat.set(1,G/56);let ot=new gt(new Re(y.width,G).rotateX(-Math.PI/2),new $t({map:rt}));ot.position.set((y.x1+y.x2)/2,.02+(q?0:.005),(y.z1+y.z2)/2),q&&(ot.rotation.y=Math.PI/2),e.add(ot)}let R=s.roads.filter(y=>y.x1===y.x2).map(y=>y.x1),C=s.roads.filter(y=>y.z1===y.z2).map(y=>y.z1);for(let y of R)for(let G of C){f.box(14,.05,14,y,0,G,3422012,{noAO:!0,jit:0});for(let q=-3;q<=3;q++)for(let[rt,ot,Rt,Ct]of[[0,-8.5,1,3],[0,8.5,1,3],[-8.5,0,3,1],[8.5,0,3,1]])f.box(Rt,.06,Ct,y+rt+(rt===0?q*1.8:0),0,G+ot+(ot===0?q*1.8:0),15658730,{noAO:!0,jit:0})}for(let y of s.zones)for(let G=y.x0+12;G<y.x1-6;G+=38)for(let q of[y.z0+2,y.z1-2])P(f,G,q);function P(y,G,q){y.cyl(.12,.16,6.5,6,G,0,q,3882821,{noAO:!0}),y.box(1.4,.18,.3,G,6.4,q,3882821,{noAO:!0}),y.box(.6,.16,.4,G+.55,6.22,q,16773296,{noAO:!0,jit:0})}function E(y,G,q,rt=1){let ot=7*rt;y.cyl(.22*rt,.35*rt,ot,6,G,0,q,9071173,{noAO:!0});for(let Rt=0;Rt<7;Rt++){let Ct=Rt/7*Math.PI*2;y.box(.5*rt,.1,3.4*rt,G+Math.cos(Ct)*1.6*rt,ot+.1,q+Math.sin(Ct)*1.6*rt,3116858,{ry:-Ct+Math.PI/2,rx:.5,noAO:!0})}}for(let y=-230;y<240;y+=24)E(f,y,148+(m()*6-3),.9+m()*.5);for(let y=0;y<40;y++){let G=s.zones[m()*12|0];if(!G)continue;let q=G.x0+3+m()*(G.x1-G.x0-6),rt=G.z0+(m()<.5?3:G.z1-G.z0-3);rt<140&&E(f,q,rt,.7+m()*.4)}let b=[],L=(y,G,q,rt,ot,Rt,Ct,It)=>{let Wt=new gt(new Re(Rt,Ct),new ve({map:m0(y,G),side:hn}));return Wt.position.set(q,rt,ot),Wt.rotation.y=Math.atan2(It[0],It[1]),e.add(Wt),b.push(Wt),Wt},k=(y,G=.08)=>[y.x+y.face[0]*(y.w/2+G),y.z+y.face[1]*(y.d/2+G)];for(let y of s.buildings){let G=y.w/2,q=y.d/2;n.push({id:y.id,h:y.h,x0:y.x-G-.6,x1:y.x+G+.6,z0:y.z-q-.6,z1:y.z+q+.6});let[rt,ot]=y.face,Rt=Math.atan2(rt,ot);if(y.kind==="house"){if(g.box(y.w,y.h,y.d,y.x,0,y.z,y.color),y.tier===1){f.box(y.w+.6,.5,y.d+.6,y.x,y.h,y.z,7040368);for(let me=0;me<3;me++)f.box(1.2,1.4,1.2,y.x-y.w/3+me*(y.w/3),y.h+.5,y.z-y.d/4,3100527)}else f.gable(y.w+1.2,y.d+1.2,y.tier===3?3.4:2.6,y.x,y.h,y.z,y.roof);let[Ct,It]=k(y,.04),Wt=1.9;f.box(Math.abs(ot)>0?Wt:.3,2.8,Math.abs(ot)>0?.3:Wt,Ct,0,It,4861724,{noAO:!0}),f.box(Math.abs(ot)>0?3.4:1.6,.3,Math.abs(ot)>0?1.6:3.4,Ct+rt*.8,0,It+ot*.8,11117462,{noAO:!0}),y.tier===3&&f.box(Math.abs(ot)>0?y.w*.5:2,.25,Math.abs(ot)>0?2:y.d*.5,y.x+rt*(G+.8),y.h*.62,y.z+ot*(q+.8),12038821,{noAO:!0})}else if(y.kind==="tower")g.box(y.w,y.h,y.d,y.x,0,y.z,y.color),f.box(y.w*.7,3,y.d*.7,y.x,y.h,y.z,5990256),f.cyl(.2,.3,14,5,y.x,y.h+3,y.z,11580858,{noAO:!0}),f.box(.8,.8,.8,y.x,y.h+17,y.z,16726832,{noAO:!0,jit:0}),f.box(y.w+.4,1.4,y.d+.4,y.x,0,y.z,4936538,{noAO:!0});else if(y.kind==="shop"){g.box(y.w,y.h,y.d,y.x,0,y.z,y.color),f.box(y.w+.8,.4,y.d+.8,y.x,y.h,y.z,9080724);let[Ct,It]=k(y,.6);f.box(Math.abs(ot)?y.w-2:2.6,.3,Math.abs(ot)?2.6:y.d-2,Ct,3.9,It,13646123,{noAO:!0});let[Wt,D]=k(y,.12);L(y.label,y.sign||"#2c6fbb",Wt,5.4,D,Math.min(y.w-3,16),2.6,y.face);let[me,Xt]=k(y,.05);x.box(Math.abs(ot)?4:.2,2.6,Math.abs(ot)?.2:4,me,.2,Xt,10274777,{noAO:!0,jit:0})}else if(y.kind==="market"){for(let D of[-1,1])for(let me of[-1,1])f.cyl(.25,.25,4.4,6,y.x+D*(G-1),0,y.z+me*(q-1),7162945,{noAO:!0});f.box(y.w+1,.4,y.d+1,y.x,4.4,y.z,12554031,{noAO:!0});let Ct=[14172949,2001125,4431943,16635957,9315498,16011550];for(let D=0;D<12;D++){let me=y.x-G+3+D%4*((y.w-6)/3),Xt=y.z-q+5+Math.floor(D/4)*((y.d-10)/2);f.box(3.4,1,1.8,me,0,Xt,Ct[D%Ct.length]),f.box(3.8,.12,2.2,me,2.6,Xt,Ct[(D+2)%Ct.length],{noAO:!0})}let[It,Wt]=k(y,.5);L("BALOGUN-STYLE MARKET","#8d3b13",It,5.9,Wt,22,2.4,y.face)}else if(y.kind==="office"||y.kind==="kiosk"){if(g.box(y.w,y.h,y.d,y.x,0,y.z,y.color),f.box(y.w+.6,.3,y.d+.6,y.x,y.h,y.z,7040368),y.label){let[Ct,It]=k(y,.12);L(y.label,"#0b6b3a",Ct,y.h-1.3,It,Math.min(y.w-1,14),2.2,y.face)}}else if(y.kind==="airport"){g.box(y.w,y.h,y.d,y.x,0,y.z,y.color),f.box(y.w+6,.8,y.d+6,y.x,y.h,y.z,8951203),f.box(y.w*.9,2.2,3,y.x,3,y.z+y.d/2+.3,4877190,{noAO:!0}),f.box(8,26,8,y.x+y.w/2+12,0,y.z-6,13620957),f.box(12,6,12,y.x+y.w/2+12,26,y.z-6,7311272);let[Ct,It]=k(y,.12);L("AIRPORT (placeholder)","#124d8a",Ct,y.h+4,It,40,4,y.face)}}let z=s.landmarks.find(y=>y.id==="plaza");if(z){let y=z.x-52,G=z.z-52;f.box(30,.3,30,y,0,G,14143421,{noAO:!0}),f.cyl(5,5.5,.9,16,y,.3,G,9411235),f.cyl(.5,.7,3.5,8,y,.3,G,9411235),f.cyl(2.2,.6,.5,12,y,3.7,G,8376808,{noAO:!0});for(let q of[0,1,2,3])f.box(3,.6,1,y+Math.cos(q*1.57)*9,.3,G+Math.sin(q*1.57)*9,7162945,{ry:-q*1.57});f.cyl(.12,.12,14,6,y+12,.3,G-12,14540253,{noAO:!0});for(let[q,rt]of[[0,34641],[1,16777215],[2,34641]])f.box(.15,1.5,1.1,y+12+.1,11,G-12-.55+q*1.1,rt,{noAO:!0,jit:0});o.push({text:z.name,x:y,z:G})}let W=new $t({color:2106154});for(let y of s.billboards){let G=new fe;G.position.set(y.x,0,y.z),G.rotation.y=Math.atan2(y.nx,y.nz),e.add(G);let q=y.y,rt=Wt=>{let D=new gt(new Ne(.3,.38,q+y.h/2,8),W);D.position.set(Wt,(q+y.h/2)/2,-.4),G.add(D)};rt(-y.w*.3),rt(y.w*.3);let ot=new gt(new qt(y.w+.9,y.h+.9,.5),W);ot.position.set(0,q,0),G.add(ot);let Rt=new ve({color:16777215}),Ct=new gt(new Re(y.w,y.h),Rt);Ct.position.set(0,q,.27),G.add(Ct);let It=new gt(new qt(y.w+1.2,.25,.9),W);if(It.position.set(0,q+y.h/2+.55,.05),G.add(It),y.surface==="lagoon_plot"){let Wt=new gt(new qt(y.w+4,1.4,5),new $t({color:9141602}));Wt.position.set(0,-.2,-.4),G.add(Wt)}i[y.id]={def:y,group:G,panel:Ct,mat:Rt,current:null}}let Q=Vh();Q.repeat.set(20,8);let Y=new gt(new Re(s.water.maxX-s.water.minX,s.water.maxZ-s.water.minZ).rotateX(-Math.PI/2),new $t({map:Q,transparent:!0,opacity:.92}));Y.position.set(0,-.5,(s.water.minZ+s.water.maxZ)/2),e.add(Y),f.box(s.bounds.maxX-s.bounds.minX+40,1.2,4,0,-.9,p.maxZ-1,10130047,{noAO:!0});let et=new ke(31,.05);for(let y=0;y<26;y++){let G=-420+y*34+m()*10;et.box(14+m()*14,30+m()*70,14,G,-2,-340-m()*40,8031651,{noAO:!0})}for(let y=0;y<20;y++){let G=-330+y*34;et.box(26,1.6,6,G,12,310,9080210,{noAO:!0}),y%4===0&&et.box(2,26,2,G,-2,310,9080210,{noAO:!0})}let X=new gt(et.build(),new $t({vertexColors:!0,fog:!0}));e.add(X);for(let[y,G]of[[f,l],[g,u],[x,l]]){let q=y.build();q.attributes.position&&e.add(new gt(q,G))}let lt=new Gr(.8,1.6,4).rotateX(Math.PI);for(let y of s.properties){let G=new gt(lt,new ve({color:3523691}));G.position.set(y.door.x,5.2,y.door.z),e.add(G),r[y.id]=G}let mt={available:3523691,taken:9080728,yours:16761358},At={x:.004},Gt=new Tt("#9fd3ee");t.fog=new Ur(Gt,140,520);let Qt=0;return{scene:t,colliders:n,boards:i,doorMarkers:r,labels:o,root:e,setMarkers(y){for(let G of y){let q=r[G.id];q&&q.material.color.setHex(mt[G.status]||3523691)}},setTime(y){let q=(y/1440-.25)*Math.PI*2,rt=Math.sin(q),ot=Math.max(0,Math.min(1,rt*1.8+.25));Qt=1-ot;let Rt=Math.max(0,1-Math.abs(rt)*3.2),Ct=so(so("#0a1230","#8fd0f5",ot),"#f08a4b",Rt*.7);return t.background=Ct,t.fog.color.copy(Ct),c.intensity=.15+ot*1.4,c.color.set(so("#fff1d6","#ff9a55",Rt)),c.position.set(Math.cos(q)*200,Math.max(30,Math.sin(q)*220),80),a.intensity=.35+ot*.65,a.color.set(so("#2b3a6b","#dfefff",ot)),u.emissiveIntensity=Qt*.95,{day:ot,night:Qt}},animate(y){Q.offset.x+=y*.004,Q.offset.y+=y*.002},get night(){return Qt}}}var g0=1513499,jn=2634815,qh=16761358;function Zh(s,t,e,n=.4,i=.3){for(let r of t)for(let o of e)s.wheel(n,i,r,n,o,1710620),s.wheel(n*.5,i+.04,r,n,o,10133670)}function Jh(s){let t=new ke(11+(s?s()*99|0:0),.02),e=4.9;Zh(t,[1.55,-1.55],[.98,-.98],.42,.32),t.box(e,.85,2,0,.32,0,15313152),t.box(e,1.2,1.96,0,1.15,0,qh),t.box(e+.02,.26,2.04,0,.98,0,g0),t.box(e-.4,.1,1.94,0,2.35,0,14260736);for(let n of[1,-1]){for(let i=0;i<4;i++)t.plane(1,.62,-1.7+i*1.15,1.72,n*1,jn,{ry:n>0?0:Math.PI,noAO:!0});t.box(.08,.5,.03,.2,1.45,n*.99,2236962)}t.quad([2.46,1.35,.9],[2.46,1.35,-.9],[2.46,2.25,-.8],[2.46,2.25,.8],jn,{noAO:!0}),t.quad([-2.46,1.35,-.9],[-2.46,1.35,.9],[-2.46,2.25,.8],[-2.46,2.25,-.8],jn,{noAO:!0}),t.box(.18,.28,2.1,2.45,.28,0,2237480),t.box(.18,.28,2.1,-2.45,.28,0,2237480);for(let n of[.7,-.7])t.box(.06,.2,.32,2.46,.78,n,16774348,{noAO:!0}),t.box(.06,.2,.3,-2.46,.78,n*1.1,15022389,{noAO:!0});return t.box(3.4,.05,1.7,-.2,2.46,0,3355443),t.box(1.1,.5,.8,-.9,2.5,.2,9268835),t.box(.9,.4,.7,.5,2.5,-.3,4157365),t.box(.5,.35,.5,1.2,2.5,.35,12986408),t.box(.1,.12,.9,2.2,2.36,0,1118481),t.build()}function Kh(s=qh,t=1513499){let e=new ke(21,.02);e.wheel(.3,.2,1.2,.3,0,1710620);for(let n of[.68,-.68])e.wheel(.3,.22,-.65,.3,n,1710620);e.box(2.1,.7,1.2,-.3,.3,0,s),e.box(.9,.8,.62,1.05,.3,0,s),e.quad([1.52,1.1,.3],[1.52,1.1,-.3],[1,1.75,-.3],[1,1.75,.3],jn,{noAO:!0});for(let n of[.58,-.58])e.box(.08,.95,.08,-.3+.5,1,n,t);for(let n of[.58,-.58])e.box(.08,.95,.08,-1.2,1,n,t);return e.box(2.3,.1,1.45,-.25,1.95,0,t),e.box(.7,.35,1,-.8,.9,0,5125166),e.box(.06,.16,.2,1.52,.7,0,16774348,{noAO:!0}),e.build()}function jh(s){let t=new ke(31+(s()*99|0),.03);t.wheel(.34,.12,.7,.34,0,1710620),t.wheel(.34,.14,-.7,.34,0,1710620),t.box(1.5,.12,.14,0,.45,0,2829099),t.box(.45,.28,.3,.22,.6,0,[12986408,1402304,16761358][s()*3|0]),t.box(.8,.1,.3,-.3,.68,0,2236962),t.box(.08,.5,.08,.6,.5,0,8947848),t.box(.1,.07,.7,.62,1,0,2236962);let e=[34641,16761358,15094016,1402304,16777215,6953882][s()*6|0];return t.capsule(.17,.35,-.2,.78,0,e,{rz:-.25}),t.sphere(.15,-.07,1.62,0,13010498,{noAO:!0}),t.sphere(.17,-.07,1.68,0,[1118481,16761358,12986408][s()*3|0],{sy:.85,noAO:!0}),t.box(.45,.14,.24,.08,.8,0,3622735),s()>.45&&(t.capsule(.17,.32,-.65,.75,0,[15277667,4149685,38536][s()*3|0],{rz:.1}),t.sphere(.14,-.62,1.55,0,9262372,{noAO:!0})),t.build()}function Hc(s,t){let e=new ke(41+(t&255),.02),n=s==="suv",i=s==="hatch",r=n?4.6:i?3.8:4.5,o=n?.95:.7;Zh(e,[r*.32,-r*.32],[.82,-.82],n?.45:.37,.26),e.box(r,o,1.84,0,.3,0,t);let a=n?r*.68:i?r*.62:r*.5,c=n?-.2:i?-.25:-.3,l=n?.8:.62;e.box(a,l,1.66,c,.3+o,0,t);for(let h of[.84,-.84])e.plane(a*.46,l*.7,c+a*.22,.3+o+l*.5,h,jn,{ry:h>0?0:Math.PI,noAO:!0}),e.plane(a*.4,l*.7,c-a*.24,.3+o+l*.5,h,jn,{ry:h>0?0:Math.PI,noAO:!0});e.quad([c+a/2+.01,.3+o+.05,.75],[c+a/2+.01,.3+o+.05,-.75],[c+a/2-.35,.3+o+l-.05,-.72],[c+a/2-.35,.3+o+l-.05,.72],jn,{noAO:!0}),e.quad([c-a/2-.01,.3+o+.05,-.75],[c-a/2-.01,.3+o+.05,.75],[c-a/2+.3,.3+o+l-.05,.72],[c-a/2+.3,.3+o+l-.05,-.72],jn,{noAO:!0}),e.box(.15,.25,1.86,r/2,.22,0,2829099),e.box(.15,.25,1.86,-r/2,.22,0,2829099);for(let h of[.65,-.65])e.box(.05,.16,.36,r/2+.02,.7,h,16774348,{noAO:!0}),e.box(.05,.16,.34,-r/2-.02,.7,h,15022389,{noAO:!0});return e.build()}var Wc=new $t({vertexColors:!0}),x0=io(),_0=new Re(1,1).rotateX(-Math.PI/2),y0=new ve({map:x0,transparent:!0,depthWrite:!1}),Xc=(s,t)=>{let e=new gt(_0,y0);return e.scale.set(s,1,t),e.position.y=.08,e.renderOrder=1,e},co=s=>[Math.cos(s),-Math.sin(s)],Vc=new Map;function v0(s){if(Vc.has(s))return Vc.get(s);let t=new ke(3,.02);t.box(.42,.9,.36,0,0,.17,2899558,{noAO:!0}),t.box(.42,.9,.36,0,0,-.17,2899558,{noAO:!0}),t.box(.5,.85,.82,0,.85,0,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,.5,s,{noAO:!0}),t.box(.3,.8,.18,0,.9,-.5,s,{noAO:!0}),t.sphere(.27,0,2,0,9262372,{noAO:!0}),t.box(.48,.14,.52,-.02,2.14,0,1710618,{noAO:!0});let e=t.build();return Vc.set(s,e),e}function Ds(s){let t=new fe,e=new gt(v0(new Tt(s).getHex()),Wc);return e.scale.setScalar(.92),t.add(e),t.userData.body=e,t.add(Xc(1.6,1.6)),t}var Gc=new Map;function Us(s){let t=new Tt(s).getHex();Gc.has(t)||Gc.set(t,Hc("hatch",t));let e=new fe,n=new gt(Gc.get(t),Wc);return n.position.y=.12,e.add(n),e.add(Xc(5.2,2.8)),e}function Qn(s,t){let e=new Or(new Es({map:Gh(s,t),depthTest:!1,transparent:!0}));return e.scale.set(5.5,1.38,1),e.renderOrder=10,e}function tu(s,t=7){let e=s.length,n=[];for(let r=0;r<e;r++){let o=s[(r+e-1)%e],a=s[r],c=s[(r+1)%e],l=Qh([o[0]-a[0],o[1]-a[1]]),h=Qh([c[0]-a[0],c[1]-a[1]]),u=[a[0]+l[0]*t,a[1]+l[1]*t],d=[a[0]+h[0]*t,a[1]+h[1]*t];for(let f=0;f<=8;f++){let g=f/8;n.push([(1-g)*(1-g)*u[0]+2*(1-g)*g*a[0]+g*g*d[0],(1-g)*(1-g)*u[1]+2*(1-g)*g*a[1]+g*g*d[1]])}}let i=[0];for(let r=1;r<=n.length;r++){let o=n[r-1],a=n[r%n.length];i.push(i[r-1]+Math.hypot(a[0]-o[0],a[1]-o[1]))}return{pts:n,cum:i,length:i[i.length-1]}}var Qh=s=>{let t=Math.hypot(s[0],s[1])||1;return[s[0]/t,s[1]/t]};function eu(s,t,e){t=(t%s.length+s.length)%s.length;let n=0,i=s.cum.length-1;for(;i-n>1;){let c=n+i>>1;s.cum[c]<=t?n=c:i=c}let r=s.pts[n],o=s.pts[(n+1)%s.pts.length],a=(t-s.cum[n])/Math.max(1e-6,s.cum[n+1]-s.cum[n]);return e.x=r[0]+(o[0]-r[0])*a,e.z=r[1]+(o[1]-r[1])*a,e.yaw=Math.atan2(-(o[1]-r[1]),o[0]-r[0]),e}var ro=class{constructor(t,e){this.cars=[];let n=Qi(2026),i={},r=[16119285,11580858,2040616,12000284,1986444,3042106,14076328,8019006];for(let o of e){let a=tu(o.pts),c=6.5+n()*3,l=Math.max(3,Math.round(a.length/85));for(let h=0;h<l;h++){let u=o.npcs[n()*o.npcs.length|0],d;u==="danfo"?d=Jh(n):u==="keke"?d=Kh(n()>.2?16761358:3046706,1513499):u==="okada"?d=jh(n):d=Hc(["sedan","suv","hatch"][n()*3|0],r[n()*r.length|0]);let f=new fe,g=new gt(d,Wc);g.position.y=.12,f.add(g),f.add(Xc(u==="okada"?3:5.5,u==="okada"?1.4:2.8)),t.add(f),this.cars.push({g:f,P:a,speed:c*(u==="okada"?1.25:u==="danfo"?.9:1),off:a.length*h/l+n()*6,type:u})}}this.tmp={}}update(t){for(let e of this.cars)eu(e.P,e.speed*t+e.off,this.tmp),e.g.position.set(this.tmp.x,.02,this.tmp.z),e.g.rotation.y=this.tmp.yaw}},oo=class{constructor(t,e,n=36){let i=Qi(5),r=new Zi(.26,.8,2,6).translate(0,.65,0),o=new dn(.22,8,6).translate(0,1.65,0);this.body=new As(r,new $t,n),this.head=new As(o,new $t,n),this.body.frustumCulled=this.head.frustumCulled=!1,t.add(this.body,this.head),this.items=[];let a=new Tt,c=[34641,16761358,16777215,14172949,2001125,11342935,6953882,3622735,16361509],l=[9262372,13010498,7029286,4860951,10512698],h=e.filter(u=>u.z0<150);for(let u=0;u<n;u++){let d=h[i()*h.length|0],f=1.5,g=tu([[d.x0+f,d.z0+f],[d.x1-f,d.z0+f],[d.x1-f,d.z1-f],[d.x0+f,d.z1-f]],4);this.items.push({P:g,off:i()*g.length,v:1.1+i()*.7,dir:i()>.5?1:-1,ph:i()*6}),this.body.setColorAt(u,a.setHex(c[i()*c.length|0])),this.head.setColorAt(u,a.setHex(l[i()*l.length|0]))}this.m=new ee,this.q=new qe,this.p=new I,this.s=new I(1,1,1),this.tmp={},this.up=new I(0,1,0)}update(t){this.items.forEach((e,n)=>{eu(e.P,e.dir*e.v*t+e.off,this.tmp),this.q.setFromAxisAngle(this.up,this.tmp.yaw+(e.dir<0?Math.PI:0)),this.p.set(this.tmp.x,.2+Math.abs(Math.sin(t*6+e.ph))*.07,this.tmp.z),this.m.compose(this.p,this.q,this.s),this.body.setMatrixAt(n,this.m),this.head.setMatrixAt(n,this.m)}),this.body.instanceMatrix.needsUpdate=this.head.instanceMatrix.needsUpdate=!0}},ao=class{constructor(t){this.scene=t,this.map=new Map}ingest(t,e){let n=new Set;for(let i of t){n.add(i.id);let r=this.map.get(i.id);r||(r={id:i.id,name:i.n,color:i.c,mode:-1,samples:[],obj:null,tag:null,act:""},this.map.set(i.id,r)),r.mode=i.m,r.act=i.act||"";for(let[o,a,c,l]of i.s){let h=e+o;(!r.samples.length||h>r.samples[r.samples.length-1].t+50)&&r.samples.push({t:h,x:a,z:c,ry:l})}r.samples.length>60&&r.samples.splice(0,r.samples.length-60),this.build(r)}for(let[i,r]of this.map)n.has(i)||(this.scene.remove(r.root),this.map.delete(i))}build(t){let e=t.mode===1?"car":"walk";t.kind===e&&t.root||(t.root&&this.scene.remove(t.root),t.root=new fe,t.obj=e==="car"?Us(t.color):Ds(t.color),t.root.add(t.obj),t.tag=Qn(t.name,"#ffffff"),t.tag.position.set(0,e==="car"?4.2:3.6,0),t.root.add(t.tag),t.kind=e,this.scene.add(t.root),t.first=!0)}update(t){for(let e of this.map.values()){let n=e.samples;if(!n.length||!e.root)continue;let i=n[0],r=n[n.length-1];if(t<=n[0].t)i=r=n[0];else if(t>=n[n.length-1].t)i=r=n[n.length-1];else for(let d=0;d<n.length-1;d++)if(n[d].t<=t&&n[d+1].t>=t){i=n[d],r=n[d+1];break}let o=i===r?0:(t-i.t)/(r.t-i.t||1),a=i.x+(r.x-i.x)*o,c=i.z+(r.z-i.z)*o,l=r.ry-i.ry;l=Math.atan2(Math.sin(l),Math.cos(l));let h=i.ry+l*o;e.root.position.set(a,0,c),e.root.rotation.y=h;let u=Math.hypot(r.x-i.x,r.z-i.z)>.05&&i!==r;e.kind==="walk"&&(e.obj.userData.body.position.y=u?Math.abs(Math.sin(t/140))*.08:0)}}dispose(){for(let t of this.map.values())this.scene.remove(t.root);this.map.clear()}};var mi=(s,t,e)=>Math.max(t,Math.min(e,s)),nu=(s,t)=>Math.atan2(Math.sin(t-s),Math.cos(t-s)),lo=class{constructor(t,e,n,i,r){this.city=e,this.colliders=n,this.canvas=t,this.x=0,this.z=0,this.ry=0,this.mode="walk",this.v=0,this.cam=12,this.camYaw=0,this.camPitch=.62,this.dragT=0,this.frozen=!1,this.keys=new Set,this.joy={x:0,y:0,active:!1},this.run=!1,this.moving=!1,this.blocked=!1,this.root=new fe,this.setLook(i,r),this.bind()}setLook(t,e){this.color=t,this.name=e,this.avatar&&(this.root.remove(this.avatar),this.root.remove(this.carObj)),this.avatar=Ds(t),this.carObj=Us(t),this.root.add(this.avatar,this.carObj),this.carObj.visible=!1,this.tag||(this.tag=Qn(e||"You","#ffe27a"),this.root.add(this.tag)),this.applyMode()}applyMode(){this.avatar.visible=this.mode==="walk",this.carObj.visible=this.mode==="drive",this.tag.position.set(0,this.mode==="drive"?4.2:3.6,0)}toggleCar(){return this.mode=this.mode==="walk"?"drive":"walk",this.v=0,this.applyMode(),this.mode==="drive"&&(this.camYaw=this.ry),this.mode}teleport(t,e){this.x=t,this.z=e,this.v=0}bind(){let t=u=>{if(u.target.closest("input,textarea,select"))return;let d=u.key.toLowerCase();["arrowup","arrowdown","arrowleft","arrowright"," "].includes(d)&&u.preventDefault(),this.keys.add(d),d==="shift"&&(this.run=!0)},e=u=>{let d=u.key.toLowerCase();this.keys.delete(d),d==="shift"&&(this.run=!1)};addEventListener("keydown",t),addEventListener("keyup",e),addEventListener("blur",()=>{this.keys.clear(),this.run=!1});let n=null;this.canvas.addEventListener("pointerdown",u=>{u.target===this.canvas&&(n={id:u.pointerId,x:u.clientX,y:u.clientY,moved:0},this.canvas.setPointerCapture?.(u.pointerId))}),this.canvas.addEventListener("pointermove",u=>{if(!n||n.id!==u.pointerId)return;let d=u.clientX-n.x,f=u.clientY-n.y;n.x=u.clientX,n.y=u.clientY,n.moved+=Math.abs(d)+Math.abs(f),this.camYaw-=d*.006,this.camPitch=mi(this.camPitch+f*.004,.25,1.15),this.dragT=performance.now()});let i=u=>{n&&n.id===u.pointerId&&(this.lastTap=n.moved<6?{x:u.clientX,y:u.clientY,t:performance.now()}:null,n=null)};this.canvas.addEventListener("pointerup",i),this.canvas.addEventListener("pointercancel",i),this.canvas.addEventListener("wheel",u=>{this.cam=mi(this.cam+u.deltaY*.01,7,26),u.preventDefault()},{passive:!1});let r=document.getElementById("joy"),o=document.getElementById("joyKnob");if(!r)return;let a=null,c=52,l=u=>{let d=r.getBoundingClientRect(),f=u.clientX-(d.left+d.width/2),g=u.clientY-(d.top+d.height/2),x=Math.hypot(f,g);x>c&&(f=f/x*c,g=g/x*c),this.joy.x=f/c,this.joy.y=-g/c,o.style.transform=`translate(${f}px,${g}px)`};r.addEventListener("pointerdown",u=>{a=u.pointerId,r.setPointerCapture(u.pointerId),this.joy.active=!0,l(u),u.preventDefault()}),r.addEventListener("pointermove",u=>{u.pointerId===a&&l(u)});let h=u=>{u.pointerId===a&&(a=null,this.joy.x=this.joy.y=0,this.joy.active=!1,o.style.transform="")};r.addEventListener("pointerup",h),r.addEventListener("pointercancel",h)}input(){let t=this.keys,e=(t.has("d")||t.has("arrowright")?1:0)-(t.has("a")||t.has("arrowleft")?1:0),n=(t.has("w")||t.has("arrowup")?1:0)-(t.has("s")||t.has("arrowdown")?1:0);this.joy.active&&(e=this.joy.x,n=this.joy.y);let i=Math.hypot(e,n);return i>1&&(e/=i,n/=i),{ix:e,iy:n}}update(t){let{ix:e,iy:n}=this.frozen?{ix:0,iy:0}:this.input(),i=this.x,r=this.z;if(this.keys.has("q")&&(this.camYaw+=t*1.8),this.keys.has("e"),this.mode==="walk"){let l=Math.hypot(e,n);if(l>.08){let h=co(this.camYaw),u=[Math.sin(this.camYaw),Math.cos(this.camYaw)],d=h[0]*n+u[0]*e,f=h[1]*n+u[1]*e,g=Math.hypot(d,f);d/=g,f/=g;let x=(this.run?7:5.2)*Math.min(1,l);this.x+=d*x*t,this.z+=f*x*t,this.v=x;let m=Math.atan2(-f,d);this.ry+=nu(this.ry,m)*Math.min(1,t*12)}else this.v=0}else{let c=n>.15?n:n<-.15?n*.6:0,l=Math.abs(e)>.1?e:0,h=20;c>0?this.v+=15*c*t:c<0?this.v+=(this.v>0?24:8)*c*t:this.v-=Math.sign(this.v)*Math.min(Math.abs(this.v),6*t),this.v=mi(this.v,-6,h),this.ry-=l*Math.min(1,Math.abs(this.v)/5)*1.9*t*(this.v>=0?1:-1);let u=co(this.ry);this.x+=u[0]*this.v*t,this.z+=u[1]*this.v*t,performance.now()-this.dragT>1500&&(this.camYaw+=nu(this.camYaw,this.ry)*Math.min(1,t*3))}let o=this.mode==="drive"?2:.7;this.blocked=!1;for(let c=0;c<2;c++)for(let l of this.colliders){if(this.x<l.x0-o||this.x>l.x1+o||this.z<l.z0-o||this.z>l.z1+o)continue;let h=mi(this.x,l.x0,l.x1),u=mi(this.z,l.z0,l.z1),d=this.x-h,f=this.z-u,g=Math.hypot(d,f);if(g<o){if(g<1e-4){let x=[[l.x0-o-this.x,0],[l.x1+o-this.x,0],[0,l.z0-o-this.z],[0,l.z1+o-this.z]].sort((m,p)=>Math.hypot(...m)-Math.hypot(...p))[0];this.x+=x[0],this.z+=x[1]}else this.x=h+d/g*o,this.z=u+f/g*o;this.blocked=!0,this.mode==="drive"&&(this.v*=.5)}}let a=this.city.bounds;this.x=mi(this.x,a.minX+1,a.maxX-1),this.z=mi(this.z,a.minZ+1,a.maxZ-3),this.moving=Math.hypot(this.x-i,this.z-r)>.002,this.root.position.set(this.x,0,this.z),this.root.rotation.y=this.ry,this.mode==="walk"&&(this.avatar.userData.body.position.y=this.moving?Math.abs(Math.sin(performance.now()/120))*.09:0)}placeCamera(t,e){let n=this.cam*(this.mode==="drive"?1.4:1),i=co(this.camYaw),r=Math.sin(this.camPitch)*n,o=Math.cos(this.camPitch)*n,a=this.x-i[0]*o,c=this.z-i[1]*o,l=r+1.2,h=1-Math.pow(6e-4,e);t.position.x+=(a-t.position.x)*h,t.position.y+=(l-t.position.y)*h,t.position.z+=(c-t.position.z)*h,t.lookAt(this.x,1.6,this.z),t.updateMatrixWorld(),t.matrixWorldInverse.copy(t.matrixWorld).invert()}};var gi=new I,ho=class{constructor(t,e,n){this.world=t,this.city=e,this.now=n,this.rot=1e4,this.slots={},this.imgs=new Map,this.evidence=[],this.houseTex=new Map,this.state={},this.lastKey={},this.maxDist=90}setSnapshot(t){if(t){this.slots=t.slots||{},this.rot=t.rotationMs||1e4;for(let e of Object.values(this.slots))for(let n of e)this.loadImg(n.i)}}loadImg(t){if(this.imgs.has(t))return;let e={img:new Image,ok:!1,tex:{}};this.imgs.set(t,e),e.img.onload=()=>{e.ok=!0,this.lastKey={}},e.img.onerror=()=>{e.failed=!0},e.img.src=window.__naMedia?window.__naMedia(t):`/media/creative/${t}`}house(t,e,n){let i=this.houseTex.get(t);if(!i){let r=this.world.boards[t].def;i=Wh(e>=n*1.5?1024:768,e>=n*1.5?512:768,r.surface==="lagoon_plot"?"Lagoon plot":r.surface==="airport_board"?"Airport board":"Road billboard","Rent this board at /advertise",t.charCodeAt(t.length-1)),this.houseTex.set(t,i)}return i}currentFor(t,e){let n=this.slots[t];return!n||!n.length?null:n[e%n.length]}update(t,e,n,i){var a;let r=this.now(),o=Math.floor(r/this.rot);for(let[c,l]of Object.entries(this.world.boards)){let h=l.def,u=h.x-n.x,d=h.z-n.z,f=Math.hypot(u,d),g=this.currentFor(c,o),x=g?`c${g.c}`:"house";if(l.shownKey!==x||this.lastKey[c]!==x){let S=g&&this.imgs.get(g.i);if(g&&S&&S.ok){let T=S.tex[o%1]||(S.tex.t=S.tex.t||Xh(S.img,h.surface==="lagoon_plot"?768:1024,h.surface==="lagoon_plot"?768:512,g.b));l.mat.map=T,l.mat.color.set(16777215),l.mat.needsUpdate=!0,l.shownKey=x,this.lastKey[c]=x}else g?l.mat.map||(l.mat.map=this.house(c,h.w,h.h),l.mat.needsUpdate=!0):(l.mat.map=this.house(c,h.w,h.h),l.mat.needsUpdate=!0,l.shownKey=x,this.lastKey[c]=x)}let m=(a=this.state)[c]||(a[c]={win:o,camp:null,cont:0,best:0,pctSum:0,pctN:0});if(m.win!==o&&(this.flush(c,m),m.win=o,m.camp=g?g.c:null,m.cont=0,m.best=0,m.pctSum=0,m.pctN=0),m.camp=g?g.c:null,!g||f>this.maxDist+30||document.hidden){m.cont=0;continue}let p=this.visiblePct(t,e,l);p>=50?(m.cont+=i,m.best=Math.max(m.best,m.cont),m.pctSum+=p,m.pctN++):m.cont=0}}flush(t,e){!e.camp||e.best<300||this.evidence.length<120&&this.evidence.push({slot:t,win:e.win,c:e.camp,pct:Math.round(e.pctSum/Math.max(1,e.pctN)),ms:Math.round(Math.min(e.best,this.rot)),vis:!0})}take(){let t=this.evidence;return this.evidence=[],t}visiblePct(t,e,n){let i=n.def,r=i.x,o=i.y,a=i.z,c=t.position;if((c.x-r)*i.nx+(c.z-a)*i.nz<=0)return 0;for(let T of this.world.colliders){if(T.h<2)continue;let M=M0(c.x,c.z,r,a,T);if(M===null)continue;if(c.y+(o-c.y)*M<T.h)return 0}let l=i.nz,h=-i.nx,u=9,d=-9,f=9,g=-9;for(let[T,M]of[[-1,-1],[1,-1],[1,1],[-1,1]]){if(gi.set(r+l*T*i.w/2,o+M*i.h/2,a+h*T*i.w/2),gi.clone().applyMatrix4(t.matrixWorldInverse).z>-.1)return 0;gi.project(t),u=Math.min(u,gi.x),d=Math.max(d,gi.x),f=Math.min(f,gi.y),g=Math.max(g,gi.y)}if((g-f)/2*e.h<22)return 0;let m=(d-u)*(g-f),p=Math.max(0,Math.min(1,d)-Math.max(-1,u)),S=Math.max(0,Math.min(1,g)-Math.max(-1,f));return m>0?100*p*S/m:0}nearest(t,e,n=40){let i=null,r=n;for(let[o,a]of Object.entries(this.world.boards)){let c=Math.hypot(a.def.x-t,a.def.z-e);c<r&&(r=c,i=o)}return i}};function M0(s,t,e,n,i){let r=0,o=1,a=e-s,c=n-t;for(let[l,h]of[[-a,s-i.x0],[a,i.x1-s],[-c,t-i.z0],[c,i.z1-t]])if(l===0){if(h<0)return null}else{let u=h/l;if(l<0){if(u>o)return null;u>r&&(r=u)}else{if(u<r)return null;u<o&&(o=u)}}return r>.02&&r<.98?r:null}var ts=s=>s[Math.floor(Math.random()*s.length)],b0={wage:s=>ts([`Nailed it! ${vt(s)} don enter your pocket.`,`Oya collect your ${vt(s)}. Hustle pays!`,`Correct hustle! +${vt(s)}`]),shiftStart:()=>ts(["Oya, na work time! Shift don start.","Shift don start. No dull!"]),bought:s=>ts([`Correct! You pay ${vt(s)}.`,`Paid ${vt(s)}. Enjoy am!`]),home:()=>ts(["Congrats, na your house be this!","New keys, new vibes. Welcome home!"]),plot:()=>"Congrats, the land is yours! Watch out for omo-onile.",travel:s=>s?`Safe journey! ${vt(s)} gone for transport.`:"Enjoy the ride, free of charge.",hit:s=>`Nailed it! +${s}% bonus on this shift.`,miss:()=>"Ah ah, you miss am! No bonus this time.",sold:s=>`Sold. ${vt(s)} back in your pocket.`,blocked:()=>"Something is in the way."},w0={INSUFFICIENT_FUNDS:()=>ts(["Your pocket dry o. Money no reach.","No cash for that one. Go hustle first!"]),TOO_FAR:()=>ts(["You dey far o. Move closer.","Walk go there first, oga."]),TOO_TIRED:()=>"You don tire. Eat or rest first!",TOO_HUNGRY:()=>"Hunger dey vex you. Buy food first.",BLOCKED:()=>"Something is in the way.",COOLDOWN:null,LOGIN_REQUIRED:()=>"Session don end. Please log in again."},Oe=(s,...t)=>b0[s](...t),uo=class{constructor(t){this.g=t,this.sheetOpen=!1,this.onClose=null,this.mm=st("#minimap").getContext("2d"),this.chatOn=!1,this.sfxOn=!0,this.actx=null,st("#sheetX").onclick=()=>this.closeSheet(),st("#sheetWrap").addEventListener("pointerdown",e=>{e.target.id==="sheetWrap"&&this.closeSheet()}),st("#phoneBtn").onclick=()=>this.phone(),st("#muteBtn").onclick=()=>{this.sfxOn=!this.sfxOn,st("#muteBtn").textContent=this.sfxOn?"\u{1F50A}":"\u{1F507}"},st("#carBtn").onclick=()=>t.toggleCar(),st("#chatForm").addEventListener("submit",async e=>{e.preventDefault();let n=st("#chatInput"),i=n.value.trim();if(!i)return this.hideChat();n.value="",this.hideChat();try{await Dt("/api/chat",{text:i})}catch(r){this.error(r)}}),addEventListener("keydown",e=>{if(e.target.closest("input,textarea")){e.key==="Escape"&&(this.hideChat(),e.target.blur());return}if(e.key==="Escape"&&this.sheetOpen&&this.closeSheet(),!t.playing)return;let n=e.key.toLowerCase();n==="t"||n==="enter"?(e.preventDefault(),this.showChat()):n==="p"?this.phone():n==="c"?t.toggleCar():(n==="f"||n===" ")&&(this.sheetOpen||t.doAction())}),st("#actionBtn").onclick=()=>t.doAction()}sfx(t){if(this.sfxOn)try{this.actx||(this.actx=new(window.AudioContext||window.webkitAudioContext));let e=this.actx,n=e.createOscillator(),i=e.createGain();n.connect(i),i.connect(e.destination);let r={coin:[[880,.07],[1320,.12]],ok:[[520,.08],[780,.1]],bad:[[180,.18]],horn:[[330,.22],[330,.22]],thunk:[[110,.09]],knock:[[140,.06],[140,.06],[140,.06]]}[t]||[[600,.08]],o=e.currentTime;n.type=t==="horn"?"sawtooth":"triangle",i.gain.setValueAtTime(.08,o);for(let[a,c]of r)n.frequency.setValueAtTime(a,o),o+=c;i.gain.exponentialRampToValueAtTime(1e-4,o+.05),n.start(),n.stop(o+.08)}catch{}}haptic(t=15){try{navigator.vibrate?.(t)}catch{}}toast(t,e=""){let n=_("div",{class:`toast ${e}`},t),i=st("#toasts");for(i.append(n);i.children.length>3;)i.firstChild.remove();setTimeout(()=>n.remove(),4300),e==="bad"?this.sfx("bad"):e==="money"&&(this.sfx("coin"),this.haptic())}error(t){if(t instanceof fn){if(t.status===401&&t.code==="LOGIN_REQUIRED"){this.g.sessionLost();return}let e=w0[t.code];this.toast(e?e():t.message,"bad")}else console.error(t),this.toast("Something went wrong. Try again.","bad")}showChat(){st("#chatForm").classList.add("on"),st("#chatInput").focus()}hideChat(){st("#chatForm").classList.remove("on"),st("#game").focus()}addChat(t,e,n){let i=_("div",{style:"pointer-events:auto;cursor:pointer",title:"Tap to report, mute or block",onclick:()=>this.playerMenu(t,n&&{kind:"chat",target:n,text:`${t}: ${e}`})},`${t}: ${e}`);for(st("#chatlog").append(i);st("#chatlog").children.length>5;)st("#chatlog").firstChild.remove();setTimeout(()=>i.remove(),14e3)}playerMenu(t,e){if(t===this.g.user?.username)return;this.openSheet(`@${t}`,[e?_("p",{class:"mut"},`"${e.text}"`):"",_("div",{class:"row"},e?_("button",{class:"btn red",onclick:()=>this.reportSheet(e.kind,e.target,e.text)},"\u{1F6A9} Report"):"",_("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"mute")},"\u{1F507} Mute"),_("button",{class:"btn ghost",onclick:()=>this.setBlock(t,"block")},"\u26D4 Block")),_("p",{class:"mut"},"Mute: you stop seeing their chat and messages. Block: they cannot message you, knock on your door or sit at your tables, and you will not see each other.")])}async setBlock(t,e){await this.guard(()=>Dt("/api/social/mute",{username:t,kind:e}))&&(this.toast(e==="block"?`@${t} blocked.`:e==="mute"?`@${t} muted.`:`@${t} unblocked.`),this.closeSheet())}reportSheet(t,e,n=""){let i={abusive:"Abusive or insulting",sexual:"Sexual content",hate:"Hate or discrimination",scam_spam:"Scam or spam",personal_info:"Shares personal info",misleading:"Misleading",other:"Something else"},r="abusive",o=_("input",{class:"sheet-input",maxlength:200,placeholder:"Anything we should know? (optional)"}),a=_("div",{class:"chips"}),c=()=>a.replaceChildren(...Object.entries(i).map(([l,h])=>_("button",{class:`chip ${l===r?"on":""}`,onclick:()=>{r=l,c()}},h)));c(),this.openSheet("Report",[_("p",{class:"mut"},n?`Reporting: ${n}`:"Tell us what is wrong."),a,o,_("div",{class:"row"},_("button",{class:"btn red",onclick:async()=>{let l=await this.guard(()=>Dt("/api/report",{kind:t,target:String(e),reason:r,detail:o.value}));l&&(this.toast(l.message),this.closeSheet())}},"Send report"),_("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")),_("p",{class:"mut"},"Reports go to a human reviewer. False reports can limit your own account.")])}hud(t){st("#cash").textContent=vt(t.cash),st("#sav").textContent="\u{1F3E6} "+vt(t.savings),st("#energyBar").style.width=t.energy+"%",st("#hungerBar").style.width=t.hunger+"%",st("#moodBar").style.width=(t.mood??60)+"%",st("#moodBar").style.background=(t.mood??60)>=this.g.cfg.moodHappyAt?"#f7c948":"#e58fb3",st("#energyBar").style.background=t.energy<20?"#d6402f":"#35c46b",st("#hungerBar").style.background=t.hunger<20?"#d6402f":"#f29a2e";let e=st("#shiftbar");if(t.shift){let n=this.g.cfg.jobs?.find(r=>r.id===t.shift.jobId),i=Math.max(0,t.shift.endsAt-this.g.serverNow());e.classList.remove("hidden"),e.textContent=i>0?`\u{1F4BC} ${n?.name||"Shift"} \xB7 ${Math.ceil(i/1e3)}s left`:`\u{1F4BC} ${n?.name||"Shift"} done: collect your pay!`}else e.classList.add("hidden")}clock(t){let e=(t.hour+11)%12+1,n=t.hour<6||t.hour>=19;st("#clock").textContent=`${n?"\u{1F319}":"\u{1F31E}"} ${e}:${String(t.minute).padStart(2,"0")} ${t.hour>=12?"PM":"AM"} \xB7 Day ${t.day}`}badge(t){let e=st("#phoneBadge");e.textContent=t,e.classList.toggle("hidden",!t)}loc(t){st("#loc").textContent=t}waypoint(t,e){let n=st("#waypoint");if(!t)return n.classList.add("hidden");n.classList.remove("hidden"),n.textContent=`\u{1F4CD} ${t.label} \xB7 ${Math.round(e)} m`}action(t){let e=st("#actionBtn");if(!t)return e.classList.add("hidden");e.classList.remove("hidden"),e.textContent=t}minimap(t,e,n,i,r){let o=this.mm,a=300,c=a/520,l=e.bounds,h=d=>(d-l.minX)*c+8,u=d=>(d-l.minZ)*c+8;o.clearRect(0,0,a,a),o.fillStyle="#c9c3ad",o.fillRect(0,0,a,a),o.fillStyle="#2b6f8a",o.fillRect(0,u(l.maxZ),a,a),o.fillStyle="#3d4046";for(let d of e.roads)o.fillRect(h(Math.min(d.x1,d.x2))-(d.x1===d.x2?d.width*c/2:0),u(Math.min(d.z1,d.z2))-(d.z1===d.z2?d.width*c/2:0),d.x1===d.x2?d.width*c:Math.abs(d.x2-d.x1)*c,d.z1===d.z2?d.width*c:Math.abs(d.z2-d.z1)*c);o.fillStyle="#8f8a79";for(let d of e.buildings)o.fillRect(h(d.x-d.w/2),u(d.z-d.d/2),d.w*c,d.d*c);o.fillStyle="#ffc20e";for(let d of e.shops)o.fillRect(h(d.x)-3,u(d.z)-3,6,6);o.fillStyle="#4aa3ff";for(let d of e.jobs)o.fillRect(h(d.x)-3,u(d.z)-3,6,6);o.fillStyle="#35c46b";for(let d of e.billboards)d.surface!=="lagoon_plot"&&o.fillRect(h(d.x)-2,u(d.z)-2,4,4);i&&(o.fillStyle="#b44cff",o.beginPath(),o.arc(h(i.x),u(i.z),7,0,7),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke()),o.fillStyle="#fff";for(let d of n.map.values())d.root&&(o.beginPath(),o.arc(h(d.root.position.x),u(d.root.position.z),3.5,0,7),o.fill());o.save(),o.translate(h(t.x),u(t.z)),o.rotate(-t.ry+Math.PI/2),o.fillStyle="#ff3b30",o.beginPath(),o.moveTo(0,-8),o.lineTo(6,7),o.lineTo(-6,7),o.closePath(),o.fill(),o.strokeStyle="#fff",o.lineWidth=2,o.stroke(),o.restore()}openSheet(t,e,n){this.onClose=n||null,st("#sheetTitle").textContent=t,st("#sheetBody").replaceChildren(...[].concat(e)),st("#sheetWrap").classList.remove("hidden"),this.sheetOpen=!0,this.g.ctrl.frozen=!0}setSheetBody(t){st("#sheetBody").replaceChildren(...[].concat(t))}closeSheet(){if(!this.sheetOpen)return;st("#sheetWrap").classList.add("hidden"),this.sheetOpen=!1,this.g.ctrl.frozen=this.g.busy,clearInterval(this.tick);let t=this.onClose;this.onClose=null,t?.(),st("#game").focus()}async guard(t){try{return await t()}catch(e){return this.error(e),null}}async place(t){let n=this.g.city.places.find(o=>o.id===t);if(!n)return;let i=_("div",{});this.openSheet(n.name,i),clearInterval(this.tick),(async()=>{let o=await se(`/api/travel/quote?place=${encodeURIComponent(t)}`).catch(d=>(this.error(d),null));if(!o||!this.sheetOpen)return;let a=o.distance<22,c=a?null:this.lastMode&&o.modes.find(d=>d.id===this.lastMode)?this.lastMode:"keke",l=_("div",{}),h=_("div",{}),u=()=>{let d=_("div",{class:"chips"},o.modes.map(x=>_("button",{class:`chip ${x.id===c?"on":""}`,onclick:()=>{c=x.id,this.lastMode=x.id,u()}},{walk:"\u{1F6B6}",keke:"\u{1F6FA}",danfo:"\u{1F68C}",car:"\u{1F697}"}[x.id]||""," ",x.label,_("small",{},x.fare?`${vt(x.fare)} \xB7 ${x.seconds}s`:`free \xB7 ~${x.seconds}s`)))),f=o.modes.find(x=>x.id===c),g=_("button",{class:"btn big alt",disabled:a||!f,onclick:()=>this.go(n,f,o)},a?"You're here":c==="walk"?"Set waypoint & walk":`Go \xB7 ${vt(f.fare)}`);h.replaceChildren(_("div",{class:"row sp"},_("span",{class:"mut"},`${Math.round(o.distance)} m away`),_("span",{class:`tag ${o.rush?"amber":"green"}`},(o.rush?"\u23F0 ":"")+o.traffic)),a?"":d,g)};u(),i.replaceChildren(_("div",{class:"mut"},`${n.area} \xB7 ${E0(n.type)}`),l,h),this.fillPlaceInfo(l,n,o)})()}async go(t,e,n){let i=this.g;if(e.id==="walk"){i.setWaypoint(t.x,t.z,t.name),this.closeSheet(),this.toast(`Waypoint set: ${t.name}. Follow the purple pin.`);return}let r=await this.guard(()=>Dt("/api/travel",{placeId:t.id,mode:e.id,pos:i.pos()}));r&&(this.closeSheet(),i.update(r.user),i.runCommute(r,t,n))}fillPlaceInfo(t,e,n){e.type==="shop"?this.shopBlock(t,e.id):e.type==="job"?this.jobBlock(t,e.id):e.type==="house"?this.houseBlock(t,e.id):e.type==="plot"?this.plotBlock(t,e.id):e.type==="venue"?this.venueBlock(t,e):t.replaceChildren(_("p",{class:"mut"},e.id==="airport"?"Fast travel to other cities (Abuja, Port Harcourt) comes later. The airport also hosts premium ad boards.":"A public landmark. Wave to the neighbours."))}venueBlock(t,e){let n=S0(this.g.pos(),e)<20,i=e.hours?`Open ${e.hours[0]}:00 to ${e.hours[1]}:00`:"";t.replaceChildren(_("p",{class:"mut"},i),_("p",{},e.id==="venue_motors"?"Look at the cars, compare running costs and buy one. Placeholder prices are ESTIMATES.":"Step inside to eat, chat, and play Whot or Ayo against other players. \u{1F3B2} Game money only."),_("button",{class:"btn big alt",disabled:!n,id:"venueEnter",onclick:()=>{this.closeSheet(),this.g.venue.show(e.id)}},n?"Go inside":"Walk to the door first"))}async shopBlock(t,e){let n=await this.guard(()=>se("/api/shops"));if(!n)return;let i=n.shops.find(a=>a.id===e);if(!i)return;this.g.shops=n.shops;let r="local",o=()=>{let a=Math.hypot(this.g.ctrl.x-i.x,this.g.ctrl.z-i.z)<24,c=n.channels.delivery;t.replaceChildren(_("p",{class:"mut"},i.desc),_("div",{class:"row"},_("span",{class:`tag ${i.status.open?"green":"red"}`},i.status.text),_("span",{class:"tag"},i.channel==="market"?`Market \xD7${n.channels.market.mult}`:`Supermarket \xD7${n.channels.supermarket.mult}`)),_("div",{class:"chips"},_("button",{class:`chip ${r==="local"?"on":""}`,onclick:()=>{r="local",o()}},i.channel==="market"?"Market stall":"In store",_("small",{},a?"you are here":"walk there")),_("button",{class:`chip ${r==="delivery"?"on":""}`,onclick:()=>{r="delivery",o()}},"\u{1F6F5} Delivery",_("small",{},`\xD7${c.mult} + ${vt(c.fee)} fee`))),_("div",{class:"list"},i.items.map(l=>{let h=r==="delivery"?l.deliveryPrice:l.price,u=r==="local"&&(!i.status.open||!a);return _("div",{},_("div",{},_("b",{},l.name),_("div",{class:"mut"},[l.hunger?`\u{1F372} +${l.hunger}`:"",l.energy?`\u26A1 +${l.energy}`:""].filter(Boolean).join("  "))),_("button",{class:"btn small",disabled:u,onclick:()=>this.buy(i,l,r,h,c.fee)},`${vt(h)}${r==="delivery"?"+"+c.fee:""}`))})),r==="local"&&!a?_("p",{class:"mut"},"Walk or ride to the shop to buy here, or switch to delivery."):"")};o()}async buy(t,e,n,i,r){let o=await this.guard(()=>Dt("/api/shop/buy",{shopId:t.id,itemId:e.id,channel:n,qty:1,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Oe("bought",o.spent),"money"))}jobBlock(t,e){let n=this.g,i=(n.cfg.jobs||[]).filter(o=>o.location===e),r=async()=>{let o=await this.guard(()=>se("/api/jobs"));if(!o)return;let a=n.user,c=o.jobs.filter(u=>u.location===e),l=a.shift,h=c.map(u=>{let d=l&&l.jobId===u.id,f=d?Math.max(0,l.endsAt-n.serverNow()):0;return _("div",{class:"card",style:"margin:8px 0;padding:12px;box-shadow:none;border:2px solid #e3dcc2"},_("div",{class:"row sp"},_("b",{},u.name),_("span",{class:"tag amber"},`${vt(u.wage)} / ${u.durationSec}s`)),_("div",{class:"mut"},u.desc),_("div",{class:"mut"},`\u26A1 -${u.energyCost}  \u{1F372} -${u.hungerCost}  \xB7 cooldown ${u.cooldownSec}s${u.locked?` \xB7 \u{1F512} ${u.shiftsNeeded} more shift(s) to unlock`:""}`),d?_("div",{},_("div",{class:"progress"},_("i",{style:`width:${Math.min(100,100-f/(u.durationSec*10))}%`})),f>0?_("div",{class:"mut"},`${Math.ceil(f/1e3)}s left`):"",_("div",{class:"row"},_("button",{class:"btn alt",onclick:()=>this.miniGame(r)},"\u{1F3AF} Quick task (+25%)"),_("button",{class:"btn",disabled:f>0,onclick:async()=>{let g=await this.guard(()=>Dt("/api/jobs/claim"));g&&(n.update(g.user),this.toast(Oe("wage",g.wage),"money"),r())}},f>0?"Working\u2026":"Collect pay"))):_("button",{class:"btn",style:"margin-top:6px",disabled:u.locked||!!l||u.cooldownLeftMs>0,onclick:async()=>{let g=await this.guard(()=>Dt("/api/jobs/start",{jobId:u.id,pos:n.pos()}));g&&(n.update(g.user),this.toast(Oe("shiftStart")),r())}},u.cooldownLeftMs>0?`Break (${Math.ceil(u.cooldownLeftMs/1e3)}s)`:l?"Finish your shift first":"Start shift"))});t.replaceChildren(...h)};r(),clearInterval(this.tick),this.tick=setInterval(()=>{this.sheetOpen&&!this.mgOpen&&r()},2500)}async miniGame(t){let e=await this.guard(()=>Dt("/api/jobs/task/start"));if(!e)return;this.mgOpen=!0;let n,i=_("div",{class:"cur"}),r=_("div",{class:"zone",style:`left:${(e.target-e.width/2)*100}%;width:${e.width*100}%`}),o=_("div",{class:"mgbar"},r,i),a=_("div",{class:"big",style:'font:400 22px "Lilita One";min-height:30px'}),c=!1,l=d=>{let f=d-Math.floor(d);return f<.5?f*2:2-f*2},h=()=>{i.style.left=`calc(${l((this.g.serverNow()-e.startedAt)/e.periodMs)*100}% - 4px)`,c||(n=requestAnimationFrame(h))};h();let u=_("button",{class:"btn big alt",onclick:async()=>{if(c){this.mgOpen=!1,t();return}c=!0;let d=await this.guard(()=>Dt("/api/jobs/task/stop"));cancelAnimationFrame(n),d?(i.style.left=`calc(${d.pos*100}% - 4px)`,a.textContent=d.hit?Oe("hit",d.bonusPct):Oe("miss"),this.sfx(d.hit?"coin":"bad"),u.textContent="Back to work"):(this.mgOpen=!1,t())}},"STOP!");this.setSheetBody(_("div",{class:"minigame"},_("p",{class:"mut"},"Stop the gold bar inside the green zone. One try per shift."),o,a,u))}async houseBlock(t,e){let n=this.g,i=await this.guard(()=>se("/api/properties"));if(!i)return;n.props=i.properties,n.world.setMarkers(i.properties);let r=i.properties.find(f=>f.id===e);if(!r)return;let o=n.cfg.maxNameLen,a=r.status==="yours",c={home:"They're home right now",online:"Online, but out and about",away:"Not around right now"}[r.presence],l=r.owner?`@${r.owner}'s ${r.name}`:`${r.baseName}`,h=a?_("div",{class:"row"},_("button",{class:"btn small ghost",onclick:()=>this.rename(r,()=>this.houseBlock(t,e))},"\u270F\uFE0F Rename"),_("span",{class:"mut"},`max ${o} characters`)):"",u=Math.hypot(n.ctrl.x-r.door.x,n.ctrl.z-r.door.z)<30,d=[];d.push(_("div",{class:"row"},r.owner?_("div",{class:"avatar",style:`background:${r.ownerColor||"#2e9b5e"}`},r.owner[0].toUpperCase()):_("div",{class:"avatar",style:"background:#8a8f98"},"\u{1F3E0}"),_("div",{},_("b",{style:"font-size:18px"},l),_("div",{class:"mut"},`${r.tierLabel} \xB7 ${r.area}`)))),r.owner&&d.push(_("div",{class:"row sp"},_("span",{},_("span",{class:`dot ${r.presence}`}),c),_("span",{class:"tag"},`${r.items} items`))),d.push(h),a?(d.push(_("div",{class:"row"},_("span",{class:"tag green"},r.mode==="own"?"You own this":`Rent ${vt(r.rent)}/day`),r.nextRentDue?_("span",{class:"mut"},`next rent ${new Date(r.nextRentDue).toLocaleString("en-NG",{weekday:"short",hour:"numeric",minute:"2-digit"})}`):"")),d.push(_("div",{class:"row"},_("button",{class:"btn",onclick:()=>{this.closeSheet(),n.enterHome()}},"\u{1F6AA} Go inside"),_("button",{class:"btn ghost",onclick:()=>this.confirm(r.mode==="own"?"Sell for about 70% of what you paid?":"Move out? (no refund)",async()=>{let f=await this.guard(()=>Dt("/api/property/release"));f&&(n.update(f.user),this.toast(f.refund?Oe("sold",f.refund):"You moved out."),this.houseBlock(t,e))})},r.mode==="own"?"Sell house":"Move out")))):r.owner?(d.push(_("div",{class:"row"},_("button",{class:"btn",disabled:r.presence!=="home"||!u,onclick:()=>this.knock(r)},"\u{1F3E0} Visit"),_("button",{class:"btn ghost",onclick:()=>this.message(r.owner)},"\u{1F4AC} Message"),_("button",{class:"btn ghost small",title:"Mute, block or report",onclick:()=>this.playerMenu(r.owner,r.hasCustomName&&!r.nameHidden?{kind:"house_name",target:r.id,text:`${r.owner}'s "${r.name}"`}:null)},"\u22EF"))),d.push(_("div",{class:"mut"},"You can only drop by when they're home"+(u?".":" and you are at the door.")))):(d.push(_("p",{class:"mut"},`${r.rooms} room(s). Rent ${vt(r.rent)} per day (first day paid up front)${r.price?` \xB7 or buy for ${vt(r.price)}`:" \xB7 rent only"}.`)),d.push(_("div",{class:"row"},_("button",{class:"btn",disabled:!u,onclick:()=>this.review(r,"rent",()=>this.houseBlock(t,e))},`Rent \xB7 ${vt(r.rent)}`),r.price?_("button",{class:"btn alt",disabled:!u,onclick:()=>this.review(r,"own",()=>this.houseBlock(t,e))},`Buy \xB7 ${vt(r.price)}`):"")),u||d.push(_("div",{class:"mut"},"Get to the door first (use the travel chips below)."))),t.replaceChildren(...d)}review(t,e,n){let i=e==="own"?t.price:t.rent,r=_("div",{},_("h3",{},"Review"),_("p",{},`${t.baseName} \xB7 ${t.tierLabel} \xB7 ${t.area}`),_("p",{},e==="own"?`Price ${vt(i)} (one-off). You can sell back later for about 70%.`:`Rent ${vt(i)} per day. Day 1 is paid now. Miss ${this.g.cfg.evictAfter||2} rent days and you are evicted.`),_("div",{class:"row"},_("button",{class:"btn alt",onclick:async()=>{let o=await this.guard(()=>Dt("/api/property/acquire",{propertyId:t.id,mode:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:this.g.pos()}));o&&(this.g.update(o.user),this.toast(Oe("home"),"money"),this.sfx("ok"),n(),this.g.refreshProps())}},`Pay ${vt(i)}`),_("button",{class:"btn ghost",onclick:n},"Back")));this.setSheetBody(r)}confirm(t,e){this.setSheetBody(_("div",{},_("p",{},t),_("div",{class:"row"},_("button",{class:"btn red",onclick:e},"Yes"),_("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel"))))}rename(t,e){let n=this.g.cfg.maxNameLen,i=_("input",{class:"sheet-input",maxlength:n,value:t.name});this.setSheetBody(_("div",{},_("h3",{},"Name your house"),i,_("p",{class:"mut"},`3-${n} characters. Rude names get refused.`),_("div",{class:"row"},_("button",{class:"btn",onclick:async()=>{let r=await this.guard(()=>Dt("/api/property/name",{name:i.value}));r&&(this.g.update(r.user),this.toast(`Your house is now "${r.name}"`,"money"),this.g.refreshProps(),e())}},"Save"),_("button",{class:"btn ghost",onclick:e},"Cancel")))),i.focus(),i.select()}message(t){let e=_("input",{class:"sheet-input",maxlength:140,placeholder:`Message @${t}\u2026`});this.setSheetBody(_("div",{},_("h3",{},`Message @${t}`),e,_("div",{class:"row"},_("button",{class:"btn",onclick:async()=>{await this.guard(()=>Dt("/api/dm",{to:t,text:e.value}))&&(this.toast("Message sent."),this.closeSheet())}},"Send"),_("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Cancel")))),e.focus()}async knock(t){let e=await this.guard(()=>Dt("/api/visit/knock",{propertyId:t.id,pos:this.g.pos()}));if(!e)return;this.sfx("knock");let n=this.g,i=!0,r=_("b",{}),o=_("div",{style:"text-align:center"},_("h3",{},"Knock knock\u2026"),_("p",{},`Waiting for @${e.owner} to open the door of ${e.name}`),_("p",{},r),_("button",{class:"btn ghost",onclick:async()=>{i=!1,await Dt("/api/visit/cancel").catch(()=>{}),this.closeSheet()}},"Walk away"));this.setSheetBody(o),this.onClose=()=>{i=!1};let a=Date.now(),c=async()=>{if(!i||!this.sheetOpen)return;r.textContent=`${Math.max(0,Math.ceil((e.expiresAt-n.serverNow())/1e3))}s`;let l=n.lastKnocks?.mine;if(l&&l.id===e.knockId){if(l.status==="accepted"){i=!1,this.closeSheet(),this.toast("Come in!","money"),n.enterAsVisitor(t.id);return}if(l.status==="declined"){i=!1,o.replaceChildren(_("p",{},`@${e.owner} isn't receiving visitors right now. \u{1F6AA}`),_("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}if(l.status==="expired"){i=!1,o.replaceChildren(_("p",{},`No answer at @${e.owner}'s door.`),_("button",{class:"btn",onclick:()=>this.closeSheet()},"OK"));return}}setTimeout(c,800)};n.net.nudge(),c()}hostKnock(t){if(this.knockShown===t.id)return;this.knockShown=t.id,this.sfx("knock");let e=_("div",{class:"toast money",style:"pointer-events:auto"},_("div",{},`\u{1F6AA} @${t.from} is at your door!`),_("div",{class:"row"},_("button",{class:"btn small",onclick:async()=>{e.remove(),await this.guard(()=>Dt("/api/visit/respond",{knockId:t.id,accept:!0}))&&this.toast(`@${t.from} is coming in.`)}},"Let in"),_("button",{class:"btn small red",onclick:async()=>{e.remove(),await this.guard(()=>Dt("/api/visit/respond",{knockId:t.id,accept:!1}))}},"Not now")));st("#toasts").append(e),setTimeout(()=>e.remove(),Math.max(1e3,t.expiresAt-this.g.serverNow()))}async plotBlock(t,e){let n=this.g,i=await this.guard(()=>se("/api/plots"));if(!i)return;let r=i.plots.find(l=>l.id===e);if(!r)return;n.plots=i.plots;let o=Math.hypot(n.ctrl.x-r.x,n.ctrl.z-r.z)<r.size/2+25,a=_("span",{class:`tag ${r.risk==="high"?"red":r.risk==="medium"?"amber":"green"}`},`Omo-onile risk: ${r.risk}`),c=[_("div",{class:"row"},_("b",{},r.name),a),_("div",{class:"row"},_("span",{class:"tag"},`${r.sqm} sqm`),_("span",{class:"tag green"},`\u{1F4C8} ~${r.growthPerWeekPct}%/week (ESTIMATE)`)),_("div",{class:"mut"},"Prices, growth and risk are placeholders for testing. Land value compounds over real days; omo-onile may demand a levy.")];r.status==="yours"?c.push(_("p",{},`Your plot. Value now ${vt(r.value)} \xB7 sell for ${vt(r.sellValue)}`),_("button",{class:"btn red",onclick:()=>this.confirm(`Sell for ${vt(r.sellValue)}?`,async()=>{let l=await this.guard(()=>Dt("/api/plot/sell",{plotId:e}));l&&(n.update(l.user),this.toast(Oe("sold",l.value),"money"),this.plotBlock(t,e),this.closeSheet())})},"Sell plot")):r.status==="taken"?c.push(_("p",{class:"mut"},`Owned by @${r.owner}.`)):c.push(_("p",{},`Price ${vt(r.price)}`),_("button",{class:"btn alt",disabled:!o,onclick:()=>this.setSheetBody(_("div",{},_("h3",{},"Review"),_("p",{},`${r.name} \xB7 ${r.area} \xB7 ${r.sqm} sqm`),_("p",{},`Price ${vt(r.price)}. ${r.risk==="high"?"Omo-onile risk is HIGH: expect levy demands.":r.risk==="medium"?"Some omo-onile risk.":"Documents are clean (low risk)."}`),_("div",{class:"row"},_("button",{class:"btn alt",onclick:async()=>{let l=await this.guard(()=>Dt("/api/plot/buy",{plotId:e,idem:crypto.randomUUID?.()||String(Math.random()),pos:n.pos()}));l&&(n.update(l.user),this.toast(Oe("plot"),"money"),this.closeSheet())}},`Pay ${vt(r.price)}`),_("button",{class:"btn ghost",onclick:()=>this.closeSheet()},"Back"))))},"Buy plot"),o?"":_("div",{class:"mut"},"Walk up to the plot first.")),t.replaceChildren(...c)}async board(t){let e=this.g,n=Math.floor(e.serverNow()/e.ads.rot),i=e.ads.currentFor(t,n),r=e.world.boards[t].def,o=[_("div",{class:"mut"},`${{road_billboard:"Road billboard",airport_board:"Airport board",lagoon_plot:"Lagoon plot"}[r.surface]} \xB7 ${t}`)];i?o.push(_("h3",{},i.b),i.h?_("p",{},i.h):"",_("span",{class:"tag amber"},"Sponsored"),_("div",{class:"row"},_("button",{class:"btn ghost small",onclick:()=>this.reportSheet("ad_creative",i.c,`${i.b}${i.h?": "+i.h:""}`)},"\u{1F6A9} Report this ad"),_("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>Dt("/api/ads/tap",{campaign:i.c,slot:t,pos:e.pos()}));a&&(window.open(a.path,"_blank","noopener"),this.toast(`Opening ${a.brand}'s page in a new tab.`))}},"Visit advertiser"))):o.push(_("h3",{},"Your ad here"),_("p",{},"This board is free. Brands rent boards at /advertise (test mode)."),_("a",{href:"/advertise",target:"_blank",rel:"noopener",class:"btn"},"Advertise on this board")),this.openSheet("Billboard",o)}phone(t="wallet"){let e=this.g,n=[["wallet","\u{1F4B0} Wallet"],["jobs","\u{1F4BC} Jobs"],["home","\u{1F3E0} Home"],["land","\u{1F30D} Land"],["ranks","\u{1F3C6} Ranks"],["garage","\u{1F697} Garage"],["alerts","\u{1F514} Alerts"],["more","\u2699\uFE0F More"]],i=_("div",{}),r=t,o=_("div",{class:"tabrow"}),a=()=>o.replaceChildren(...n.map(([l,h])=>_("button",{class:l===r?"on":"",onclick:()=>{r=l,a(),c()}},h))),c=async()=>{i.replaceChildren(_("p",{class:"mut"},"Loading\u2026"));let h=await this["tab_"+r].call(this);i.replaceChildren(...[].concat(h))};a(),this.openSheet("Phone",[o,i]),c()}async tab_wallet(){let t=this.g,e=t.user,n=await this.guard(()=>se("/api/ledger")),i=_("input",{class:"sheet-input",type:"number",min:100,placeholder:"Amount \u20A6"}),r=_("input",{class:"sheet-input",placeholder:"Send to @username"}),o=a=>async()=>{let c=await this.guard(()=>Dt("/api/bank",{dir:a,amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));c&&(t.update(c.user),this.toast(a==="deposit"?"Saved in the bank.":"Withdrawn.","money"),this.setSheetBody([]),this.phone("wallet"))};return[_("div",{class:"row sp"},_("div",{},_("div",{class:"mut"},"Cash"),_("b",{style:"font-size:26px"},vt(e.cash))),_("div",{},_("div",{class:"mut"},"Savings (\u22480.5%/day, ESTIMATE)"),_("b",{style:"font-size:22px"},vt(e.savings))),_("div",{},_("div",{class:"mut"},"Net worth"),_("b",{},vt(e.netWorth)))),i,_("div",{class:"row"},_("button",{class:"btn",onclick:o("deposit")},"Save"),_("button",{class:"btn ghost",onclick:o("withdraw")},"Withdraw"),_("button",{class:"btn alt",onclick:async()=>{let a=await this.guard(()=>Dt("/api/transfer",{to:r.value.replace("@",""),amount:Math.floor(Number(i.value)),idem:crypto.randomUUID?.()||String(Math.random())}));a&&(t.update(a.user),this.toast("Sent!","money"))}},"Send money")),r,_("p",{class:"mut"},"Transfers are capped and rate-limited. New accounts wait a few minutes. Guests cannot send money."),_("div",{class:"card",style:"box-shadow:none;border:2px dashed #cfc8ac;padding:12px;margin:10px 0"},_("b",{},"Test top-up"),_("div",{class:"mut"},"TEST MODE: adds pretend \u20A6, no payment is taken. Real payments (Monipay) come later."),_("div",{class:"chips"},(t.cfg.topupOptions||[]).map(a=>_("button",{class:"chip",onclick:async()=>{let c=await this.guard(()=>Dt("/api/topup/test",{amount:a,idem:crypto.randomUUID?.()||String(Math.random())}));c&&(t.update(c.user),this.toast(`+${vt(a)} (test)`,"money"))}},`+${vt(a)}`)))),_("b",{},"Recent activity"),_("div",{class:"list"},(n?.rows||[]).slice(0,12).map(a=>_("div",{},_("span",{},a.reason.replaceAll("_"," ")),_("b",{style:`color:${a.amount<0?"#d6402f":"#0b7a49"}`},(a.amount>0?"+":"")+vt(a.amount)))))]}async tab_jobs(){let t=await this.guard(()=>se("/api/jobs"));return t?[_("p",{class:"mut"},"Tap a job to set a waypoint. Start shifts at the job location."),_("div",{class:"list"},t.jobs.map(e=>_("div",{},_("div",{},_("b",{},e.name),_("div",{class:"mut"},`${vt(e.wage)} \xB7 ${e.durationSec}s \xB7 ${e.place}${e.locked?" \xB7 \u{1F512}":""}`)),_("button",{class:"btn small ghost",onclick:()=>{this.g.setWaypoint(e.x,e.z,e.name),this.closeSheet()}},"\u{1F4CD}"))))]:[]}async tab_home(){let t=this.g,e=t.user,n=await this.guard(()=>se("/api/properties"));return n?(t.props=n.properties,t.world.setMarkers(n.properties),e.home?[_("h3",{},e.home.name),_("div",{class:"mut"},`${e.home.tierLabel} \xB7 ${e.home.area}`),_("div",{class:"row"},_("button",{class:"btn",onclick:()=>{this.closeSheet(),t.setWaypoint(e.home.door.x,e.home.door.z,e.home.name)}},"\u{1F4CD} Waypoint"),_("button",{class:"btn alt",onclick:()=>this.place(e.home.id)},"Open house card"))]:[_("p",{class:"mut"},"Find a place: green arrows over doors mean available. Tap a house to rent or buy."),_("div",{class:"list"},n.properties.filter(i=>i.status==="available").slice(0,12).map(i=>_("div",{},_("div",{},_("b",{},i.baseName),_("div",{class:"mut"},`${i.tierLabel} \xB7 ${i.area} \xB7 ${vt(i.rent)}/day${i.price?` \xB7 buy ${vt(i.price)}`:""}`)),_("button",{class:"btn small ghost",onclick:()=>this.place(i.id)},"View"))))]):[]}async tab_land(){let t=await this.guard(()=>se("/api/plots"));return t?[_("div",{class:"list"},t.plots.map(e=>_("div",{},_("div",{},_("b",{},e.name),_("div",{class:"mut"},`${e.area} \xB7 ${vt(e.price)} \xB7 risk ${e.risk} \xB7 ${e.status}`)),_("button",{class:"btn small ghost",onclick:()=>this.place(e.id)},"View"))))]:[]}async tab_ranks(){let t=await this.guard(()=>se("/api/leaderboard"));return t?[_("p",{class:"mut"},"Net worth = cash + savings + property (70%) + land (95%). Bots are hidden."),_("div",{class:"list"},t.rows.map(e=>_("div",{},_("span",{},`#${e.rank} ${e.name}${e.guest?" (guest)":""}`),_("b",{},vt(e.netWorth)))))]:[]}async tab_garage(){let t=await this.guard(()=>se("/api/garage"));if(!t)return[];let e=this.g,n=e.city.places.find(r=>r.id==="venue_motors"),i=t.cars.length?_("div",{class:"list"},t.cars.map(r=>_("div",{},_("span",{},`${r.active?"\u2705 ":""}${r.name}`,_("small",{class:"mut"},` \xB7 worth ${vt(r.value)} (paid ${vt(r.paid)}) \xB7 ${r.ageDays}d old`)),_("span",{class:"row"},r.active?"":_("button",{class:"btn small",onclick:async()=>{await this.guard(()=>Dt("/api/garage/use",{carId:r.id})),this.phone("garage")}},"Use"),_("button",{class:"btn small ghost",onclick:()=>this.confirm(`Sell ${r.name} for about ${vt(r.value)}?`,async()=>{let o=await this.guard(()=>Dt("/api/garage/sell",{carId:r.id,idemKey:crypto.randomUUID?.()}));o&&(this.toast(`Sold for ${vt(o.value)}.`,"money"),e.refreshMe()),this.phone("garage")})},"Sell"))))):_("p",{class:"mut"},"No car of your own yet. You are using a borrowed car: higher cost per trip, slower, no mood perk.");return[_("div",{class:"row sp"},_("b",{},`Garage (${t.cars.length}/${t.slots})`),_("span",{class:"mut"},`Driving: ${t.active.label}`)),i,_("p",{class:"mut"},`Resale: about ${Math.round((1-t.resale.firstDriveOffFraction)*100)}% on day one, then about ${Math.round(t.resale.perDayDepreciation*100)}% less per day, never below ${Math.round(t.resale.floorFraction*100)}%. All figures are ESTIMATES.`),n?_("button",{class:"btn alt",onclick:()=>{this.closeSheet(),this.place(n.id)}},"\u{1F3EA} Visit Naija Auto Mart"):""]}async tab_alerts(){let t=await this.guard(()=>se("/api/notifications"));return this.g.markRead(),t?[_("div",{class:"list"},t.rows.map(e=>_("div",{},_("span",{},e.text),_("span",{class:"mut"},new Date(e.created_at).toLocaleTimeString("en-NG",{hour:"numeric",minute:"2-digit"})))))]:[]}async tab_more(){let t=this.g,e=await this.guard(()=>se("/api/social/blocks")),n=_("div",{class:"list"},(e?.rows||[]).map(i=>_("div",{},_("span",{},`@${i.username} \xB7 ${i.kind}`),_("button",{class:"btn small ghost",onclick:async()=>{await this.setBlock(i.username,null),this.phone("more")}},"Undo"))));return[_("b",{},"Muted and blocked"),(e?.rows||[]).length?n:_("p",{class:"mut"},"Nobody. Tap a chat line or the \u22EF on a house card to mute, block or report."),_("div",{class:"row"},_("a",{class:"btn ghost",href:"/advertise",target:"_blank",rel:"noopener"},"Advertise"),_("a",{class:"btn ghost",href:"/methodology",target:"_blank",rel:"noopener"},"How ads are counted"),_("a",{class:"btn ghost",href:"/stats.html",target:"_blank",rel:"noopener"},"Stats")),_("p",{class:"mut"},`${t.cfg.name} v0 \xB7 test build. In-game \u20A6 is fictional with no cash-out. 18+.`),_("div",{class:"row"},_("button",{class:"btn red",onclick:()=>t.logout()},"Log out"))]}},S0=(s,t)=>Math.hypot(s.x-t.x,s.z-t.z),E0=s=>({venue:"Place to hang out",shop:"Shop",job:"Work",house:"House",plot:"Land plot",landmark:"Landmark"})[s]||s;var fo=class{constructor(t){this.g=t,this.interval=3e3,this.fails=0,this.timer=null,this.running=!1,this.trail=[],this.notifSince=0,this.chatSince=void 0,this.adsVersion=0,this.since=0,this.ws=null,this.inflight=!1}start(){this.running||(this.running=!0,this.tick(),this.openWs())}stop(){this.running=!1,clearTimeout(this.timer);try{this.ws?.close()}catch{}this.ws=null}nudge(){this.running&&(clearTimeout(this.timer),this.timer=setTimeout(()=>this.tick(),50))}sample(t){this.trail.push(t),this.trail.length>60&&this.trail.shift()}async tick(){if(!this.running||this.inflight)return;this.inflight=!0;let t=this.g,e=t.serverNow(),n=!1,i=this.trail.splice(0).map(r=>({a:Math.max(0,Math.round(e-r.t)),x:+r.x.toFixed(2),z:+r.z.toFixed(2),ry:+r.ry.toFixed(3)}));try{let r={trail:i,mode:t.ctrl.mode,since:this.since,notifSince:this.notifSince,adsVersion:this.adsVersion,evidence:t.ads.take(),activity:t.activity||""};this.chatSince!==void 0&&(r.chatSince=this.chatSince);let o=performance.now(),a=await Dt("/api/heartbeat",r),c=performance.now()-o;t.clockSync(a.now,c),this.since=a.now,this.fails=0,n=!0,t.setConn(!0),this.interval=a.interval||3e3,this.adsVersion=a.adsVersion,this.chatSince=a.chatCursor,a.notifs?.length&&(this.notifSince=a.notifs[a.notifs.length-1].id),t.onHeartbeat(a)}catch(r){if(this.fails++,r instanceof fn&&r.status===401){this.stop(),t.sessionLost();return}this.fails>=3&&t.setConn(!1)}finally{this.inflight=!1}this.running&&(this.timer=setTimeout(()=>this.tick(),n?this.interval:Math.min(15e3,1500*2**Math.min(this.fails,3))))}openWs(){if(!window.__naDemo)try{let t=new WebSocket(`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`);this.ws=t,t.onmessage=e=>{try{let n=JSON.parse(e.data);n.type==="notification"&&(this.g.onPush(n),this.nudge())}catch{}},t.onclose=()=>{this.running&&setTimeout(()=>this.running&&this.openWs(),5e3)},t.onerror=()=>{}}catch{}}};var Ft=1.4,iu={tv:2238513,sofa:11883578,fridge:15265522,rug:14263361,plant:3120730,table:10251068,gen:12597547,bed:4878245},es=(s,t)=>t%2?{w:s.d,d:s.w}:{w:s.w,d:s.d},su=(s,t)=>s.x<t.x+t.w&&t.x<s.x+s.w&&s.z<t.z+t.d&&t.z<s.z+s.d,po=class{constructor(t){this.g=t,this.el=st("#interior"),this.open=!1}async show(t,e){let n=this.g,i=await se(`/api/property/${t}/interior`).catch(r=>(n.ui.error(r),null));return i?(this.data=i,this.propertyId=t,this.visitor=!!i.visitor,this.catalog=Object.fromEntries((i.catalog||n.cfg.furniture||[]).map(r=>[r.id,r])),this.placed=i.placed.map(r=>({...r})),this.buy=!1,this.sel=null,this.rot=0,this.open=!0,n.busy=!0,n.ctrl.frozen=!0,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),!0):!1}build(){let t=this.data,e=t.room.w,n=t.room.d;this.canvas=_("canvas"),this.el.append(this.canvas),this.r=new Yn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new qn,this.scene.background=new Tt(1911589),this.cam=new Me(42,1,.1,200),this.yaw=Math.PI/4,this.pitch=.78,this.dist=Math.max(e,n)*Ft*1.7,this.center=new I(e*Ft/2,0,n*Ft/2),this.scene.add(new Zn(16777215,8943462,1));let i=new Jn(16773328,1.1);i.position.set(6,12,4),this.scene.add(i);let r=new gt(new qt(e*Ft,.2,n*Ft),this.floorMat=new $t({color:t.floor?.hex||"#b98a56"}));r.position.set(e*Ft/2,-.1,n*Ft/2),this.scene.add(r);let o=new qr(Math.max(e,n)*Ft,Math.max(e,n),9206357,11049072);o.scale.set(e/Math.max(e,n),1,n/Math.max(e,n)),o.position.set(e*Ft/2,.01,n*Ft/2),this.grid=o,this.scene.add(o);let a=this.wallMat=new $t({color:t.wall?.hex||"#f1e7cf"}),c=new gt(new qt(e*Ft,3.4,.2),a);c.position.set(e*Ft/2,1.7,-.1);let l=new gt(new qt(.2,3.4,n*Ft),a);l.position.set(-.1,1.7,n*Ft/2),this.scene.add(c,l);let h=new gt(new qt(e*Ft,.5,.22),new $t({color:34641}));h.position.set(e*Ft/2,.25,-.1),this.scene.add(h);for(let f of t.room.reserved){let g=new gt(new qt(f.w*Ft-.1,f.what==="bed"?.7:.02,f.d*Ft-.1),new $t({color:f.what==="bed"?iu.bed:14866879,transparent:f.what!=="bed",opacity:f.what==="bed"?1:.6}));if(g.position.set((f.x+f.w/2)*Ft,f.what==="bed"?.35:.02,(f.z+f.d/2)*Ft),this.scene.add(g),f.what==="bed"){let x=new gt(new qt(f.w*Ft-.4,.2,.5),new $t({color:16777215}));x.position.set((f.x+f.w/2)*Ft,.8,(f.z+.4)*Ft),this.scene.add(x)}}let u=t.room.reserved.find(f=>f.what==="doorway"),d=new gt(new qt(u.w*Ft,.04,.12),new ve({color:16761358}));d.position.set((u.x+u.w/2)*Ft,.05,n*Ft),this.scene.add(d),this.items=new fe,this.scene.add(this.items),this.ghost=new gt(new qt(1,1,1),new ve({color:3523691,transparent:!0,opacity:.55})),this.ghost.visible=!1,this.scene.add(this.ghost),this.rebuildItems(),this.bindInput(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}meshFor(t,e){let n=this.catalog[t],i=es(n,e),r={tv:1.1,sofa:.9,fridge:2,rug:.04,plant:1.2,table:.8,gen:.8}[t]||1,o=new fe,a=new gt(new qt(i.w*Ft-.12,r,i.d*Ft-.12),new $t({color:iu[t]||10066329}));if(a.position.y=r/2,o.add(a),t==="sofa"){let c=new gt(new qt(e%2?.3:i.w*Ft-.12,.7,e%2?i.d*Ft-.12:.3),new $t({color:9321767}));c.position.set(e===1?-(i.w*Ft/2-.2):e===3?i.w*Ft/2-.2:0,1,e===0?-(i.d*Ft/2-.2):e===2?i.d*Ft/2-.2:0),o.add(c)}if(t==="tv"){let c=new gt(new qt(i.w*Ft-.3,r-.3,i.d*Ft-.3),new ve({color:3501245}));c.position.y=r/2+.05,c.scale.multiplyScalar(.98),o.add(c),a.scale.set(1,.9,1)}if(t==="plant"){let c=new gt(new dn(.5,10,8),new $t({color:3523691}));c.position.y=1.45,o.add(c),a.scale.set(.5,.6,.5),a.position.y=.3}return o.position.set(0,0,0),o}rebuildItems(){this.items.clear(),this.meshes={};for(let t of this.placed)this.sel&&this.sel.id===t.id&&this.sel.fromPlaced||this.addItem(t)}addItem(t){let e=es(this.catalog[t.id],t.rot),n=this.meshFor(t.id,t.rot);n.position.set((t.x+e.w/2)*Ft,0,(t.z+e.d/2)*Ft),n.userData={id:t.id},this.items.add(n),this.meshes[t.id]=n}canPlace(t,e,n,i){let r=this.data,o=this.catalog[t],a=es(o,i),c={x:e,z:n,w:a.w,d:a.d};if(e<0||n<0||e+a.w>r.room.w||n+a.d>r.room.d)return!1;for(let l of r.room.reserved)if(su(c,l))return!1;for(let l of this.placed){if(l.id===t)continue;let h=this.catalog[l.id];if(h.layer==="floor"==(o.layer==="floor")){let u=es(h,l.rot);if(su(c,{x:l.x,z:l.z,w:u.w,d:u.d}))return!1}}return!0}chrome(){let t=this.data,e=this.g.ui;this.guestsEl=_("div",{class:"iguests"}),this.feed=_("div",{class:"ifeed"}),this.lastEvent=0;let n=_("div",{class:"ihead"},_("div",{},_("h3",{},this.visitor?`@${t.owner}'s ${t.name}`:t.name),_("div",{style:"font-size:13px"},`${t.tierLabel} \xB7 ${t.area} \xB7 \u2764\uFE0F `,_("span",{id:"loveCount"},t.loves||0)),this.guestsEl),_("div",{class:"row"},this.visitor?"":_("button",{class:"btn small",id:"paintBtn",onclick:()=>this.paintPanel()},"\u{1F3A8} Paint"),this.visitor?"":_("button",{class:"btn small alt",id:"buyToggle",onclick:()=>this.toggleBuy()},"\u{1F6CB} Buy mode"),_("button",{class:"btn small red",id:"interiorLeave",onclick:()=>this.leave()},"Leave")));this.tool=_("div",{class:"itool hidden"});let i=_("div",{class:"iacts"},...(this.visitor?[["love","\u{1F60D} Love your house"],["greet","\u{1F44B} Greet"],["hype","\u{1F525} Hype"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]:[["greet","\u{1F44B} Greet"],["sofa","\u{1F6CB} Sofa"],["tv","\u{1F4FA} TV"]]).map(([a,c])=>_("button",{class:"btn small ghost","data-act":a,onclick:()=>this.act(a)},c))),r=_("input",{class:"sheet-input",id:"roomSay",maxlength:120,placeholder:"Say something nice\u2026",onkeydown:a=>{a.key==="Enter"&&this.say(r),a.stopPropagation()}}),o=_("div",{class:"ibar"},this.feed,i,_("div",{class:"row"},r,_("button",{class:"btn small",onclick:()=>this.say(r)},"Send")));this.paint=_("div",{class:"ipaint hidden"}),this.el.append(n,this.tool,this.paint,o),this.startPoll()}startPoll(){clearInterval(this.pt);let t=async()=>{if(!this.open)return;let e=await se(`/api/room?propertyId=${this.propertyId}&since=${this.lastEvent}`).catch(n=>n);if(e instanceof Error){e.status===403&&this.visitor&&(this.g.ui.toast("The host asked you to step out. No wahala."),this.leave());return}this.room=e,this.drawRoom(e)};t(),this.pt=setInterval(t,2500)}drawRoom(t){if(st("#loveCount")&&(st("#loveCount").textContent=t.loves),this.guestsEl.replaceChildren(_("small",{},t.isOwner?t.guests.length?"Guests: ":"No guests right now":`Host ${t.ownerHome?"\u{1F7E2} home":"\u26AA out"} \xB7 guests: `),...t.guests.map(i=>_("span",{class:"gchip"},"@"+i,t.isOwner?_("button",{title:"Ask to leave",onclick:()=>this.kick(i)},"\u2715"):_("button",{title:"Mute or report",onclick:()=>this.g.ui.playerMenu(i)},"\u22EF")))),!t.isOwner){let i=this.el.querySelector("[data-act=love]");i&&(i.disabled=t.lovedToday)}let e=this.el.querySelector("[data-act=sofa]"),n=this.el.querySelector("[data-act=tv]");e&&(e.disabled=!t.can.sofa),n&&(n.disabled=!t.can.tv),(t.wall.hex!==this.data.wall?.hex||t.floor.hex!==this.data.floor?.hex)&&(this.data.wall=t.wall,this.data.floor=t.floor,this.wallMat.color.set(t.wall.hex),this.floorMat.color.set(t.floor.hex));for(let i of t.events){if(i.id<=this.lastEvent)continue;this.lastEvent=i.id;let r=_("div",{class:`ev ${i.kind}`,onclick:()=>i.kind==="say"&&i.u!==this.g.user.username&&this.g.ui.playerMenu(i.u)},i.kind==="say"?`${i.u}: ${i.t}`:i.t);for(this.feed.append(r);this.feed.children.length>6;)this.feed.firstChild.remove()}}async act(t){let e=this.g.ui;t==="love"?await e.guard(()=>Dt("/api/visit/love",{propertyId:this.propertyId}))&&(e.toast("You showed some love \u{1F60D}"),this.g.refreshMe()):await e.guard(()=>Dt("/api/visit/act",{propertyId:this.propertyId,action:t}))&&this.g.refreshMe(),this.startPoll()}async say(t){let e=t.value.trim();if(!e)return;await this.g.ui.guard(()=>Dt("/api/room/say",{propertyId:this.propertyId,text:e}))&&(t.value="",this.startPoll())}async kick(t){await this.g.ui.guard(()=>Dt("/api/visit/kick",{propertyId:this.propertyId,username:t}))&&(this.g.ui.toast(`@${t} was asked to leave.`),this.startPoll())}paintPanel(){let t=this.data.palette;if(!t)return;let e=this.paint;if(!e.classList.contains("hidden"))return e.classList.add("hidden");let n=this.data.wall?.id,i=this.data.floor?.id,r=()=>{let o=(a,c,l)=>_("div",{class:"swatches"},a.map(h=>_("button",{class:`sw ${h.id===c?"on":""}`,title:h.name,"data-colour":h.id,style:`background:${h.hex}`,onclick:()=>{l(h.id),r()}})));e.replaceChildren(_("div",{class:"row sp"},_("b",{},"\u{1F3A8} Paint and floor"),_("button",{class:"btn small ghost",onclick:()=>e.classList.add("hidden")},"\u2715")),_("small",{},"Walls"),o(t.walls,n,a=>{n=a,this.preview(n,i)}),_("small",{},"Floor"),o(t.floors,i,a=>{i=a,this.preview(n,i)}),_("button",{class:"btn alt",id:"paintApply",onclick:async()=>{let a=await this.g.ui.guard(()=>Dt("/api/property/decor",{propertyId:this.propertyId,wall:n,floor:i,idemKey:crypto.randomUUID?.()}));a&&(this.data.wall=a.wall,this.data.floor=a.floor,this.preview(a.wall.id,a.floor.id),this.g.ui.toast(a.charged?`Fresh look! \u2212${vt(a.charged)}`:"Already looks like that.","money"),this.g.refreshMe(),e.classList.add("hidden"))}},`Apply \xB7 ${vt(t.price)}`))};r(),e.classList.remove("hidden")}preview(t,e){let n=this.data.palette,i=n.walls.find(o=>o.id===t),r=n.floors.find(o=>o.id===e);i&&this.wallMat.color.set(i.hex),r&&this.floorMat.color.set(r.hex)}toggleBuy(t=!this.buy){this.buy=t,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),st("#buyToggle").textContent=t?"\u2705 Done":"\u{1F6CB} Buy mode",this.tool.classList.toggle("hidden",!t),t&&this.drawTool()}drawTool(){let t=this.sel,e=Object.values(this.catalog),n=new Set(this.placed.map(r=>r.id)),i=[];if(t){let r=this.catalog[t.id];i.push(_("div",{class:"row sp"},_("b",{},`${r.name} (${r.w}\xD7${r.d})`),_("span",{class:"mut"},"Tap the floor to place \xB7 R to rotate")),_("div",{class:"row"},_("button",{class:"btn small",onclick:()=>{this.rot=(this.rot+1)%4,this.drawTool()}},"\u27F3 Rotate"),t.fromPlaced?_("button",{class:"btn small red",onclick:()=>this.sell(t.id)},`Sell +${vt(Math.floor(r.price*(this.data.sellFraction||.5)))}`):_("span",{class:"tag amber"},`Costs ${vt(r.price)}`),_("button",{class:"btn small ghost",onclick:()=>{this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool()}},"Cancel")))}i.push(_("div",{class:"cat"},e.map(r=>_("button",{class:`${t?.id===r.id?"on":""} ${n.has(r.id)?"own":""}`,onclick:()=>{let o=this.placed.find(a=>a.id===r.id);this.sel={id:r.id,fromPlaced:!!o},this.rot=o?o.rot:0,this.rebuildItems(),this.drawTool()}},`${r.name}`,_("div",{class:"mut"},n.has(r.id)?"placed \xB7 tap to move":`${vt(r.price)} \xB7 ${r.w}\xD7${r.d}`))))),this.tool.replaceChildren(...i)}async place(t,e){let n=this.sel;if(!n)return;if(!this.canPlace(n.id,t,e,this.rot)){this.g.ui.toast(Oe("blocked"),"bad");return}let i=await this.g.ui.guard(()=>Dt("/api/property/furniture",{itemId:n.id,x:t,z:e,rot:this.rot,idem:crypto.randomUUID?.()||String(Math.random())}));i&&(this.g.update(i.user),this.placed=i.interior.placed,this.data={...this.data,...i.interior,visitor:!1},this.g.ui.sfx("thunk"),this.g.ui.haptic(20),i.charged&&this.g.ui.toast(Oe("bought",i.charged),"money"),this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.drawTool())}async sell(t){let e=await this.g.ui.guard(()=>Dt("/api/property/furniture/sell",{itemId:t}));e&&(this.g.update(e.user),this.placed=e.interior.placed,this.sel=null,this.ghost.visible=!1,this.rebuildItems(),this.g.ui.toast(Oe("sold",e.refund),"money"),this.drawTool())}cellAt(t){let e=this.canvas.getBoundingClientRect(),n=new at((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new Kn;i.setFromCamera(n,this.cam);let r=-i.ray.origin.y/i.ray.direction.y;if(!(r>0))return null;let o=i.ray.origin.clone().addScaledVector(i.ray.direction,r);return{x:o.x/Ft,z:o.z/Ft}}updateGhost(t){if(!this.sel)return;let e=this.cellAt(t);if(!e)return;let n=es(this.catalog[this.sel.id],this.rot),i=Math.round(e.x-n.w/2),r=Math.round(e.z-n.d/2);this.hover={x:i,z:r};let o=this.canPlace(this.sel.id,i,r,this.rot);this.ghost.visible=!0,this.ghost.scale.set(n.w*Ft-.1,.9,n.d*Ft-.1),this.ghost.position.set((i+n.w/2)*Ft,.45,(r+n.d/2)*Ft),this.ghost.material.color.setHex(o?3523691:14696751)}bindInput(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,y:n.clientY,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x,r=n.clientY-t.y;t.x=n.clientX,t.y=n.clientY,t.moved+=Math.abs(i)+Math.abs(r),(!this.sel||t.moved>14)&&(this.yaw=Math.max(Math.PI/4-.8,Math.min(Math.PI/4+.8,this.yaw-i*.006)),this.pitch=Math.max(.5,Math.min(1.2,this.pitch+r*.004)))}this.buy&&this.updateGhost(n)}),e.addEventListener("pointerup",n=>{if(t&&t.moved<8&&this.buy)if(this.sel)this.updateGhost(n),this.hover&&this.place(this.hover.x,this.hover.z);else{let i=this.cellAt(n);if(i){let r=this.placed.find(o=>{let a=es(this.catalog[o.id],o.rot);return i.x>=o.x&&i.x<o.x+a.w&&i.z>=o.z&&i.z<o.z+a.d});r&&(this.sel={id:r.id,fromPlaced:!0},this.rot=r.rot,this.rebuildItems(),this.drawTool())}}t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(6,Math.min(40,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{if(!this.open)return;let i=n.key.toLowerCase();i==="r"&&this.sel?(this.rot=(this.rot+1)%4,this.drawTool()):(i==="delete"||i==="backspace")&&this.sel?.fromPlaced?this.sell(this.sel.id):i==="escape"?this.leave():i==="b"&&!this.visitor&&this.toggleBuy()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){if(!this.open)return;let t=this.center;this.cam.position.set(t.x+Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,t.z+Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(t.x,.4,t.z),this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop())}async leave(){this.open&&(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,await Dt("/api/property/leave").catch(()=>{}),this.g.net.nudge(),st("#game").focus())}};var Ns={circle:["\u25CF","#d6402f"],triangle:["\u25B2","#2e7dd1"],cross:["\u271A","#2e9b5e"],square:["\u25A0","#8a5ad1"],star:["\u2605","#e0a020"],whot:["W","#222"]},T0=s=>{let t=7;for(let e of String(s))t=t*31+e.charCodeAt(0)>>>0;return t},ru={eat:"\u{1F372}",game:"\u{1F3B2}",board:"\u{1F3C6}",poster:"\u{1F4DC}",tv:"\u{1F4FA}",car:"\u{1F697}"},mo=class{constructor(t){this.g=t,this.el=st("#venue"),this.open=!1,this.shotId=null}async show(t){let e=this.g,n=await e.ui.guard(()=>Dt("/api/venue/enter",{venueId:t,pos:e.pos()}));return n?(this.data=n,this.id=t,this.open=!0,e.busy=!0,e.ctrl.frozen=!0,this.matchId=null,this.match=null,this.dismissed=this.dismissed||new Set,this.el.classList.remove("hidden"),this.el.replaceChildren(),this.build(),this.chrome(),this.loop(),this.poll(),!0):!1}build(){let t=this.data,e=t.room;this.canvas=_("canvas"),this.el.append(this.canvas),this.r=new Yn({canvas:this.canvas,antialias:!0}),this.r.setPixelRatio(Math.min(devicePixelRatio,2)),this.scene=new qn,this.scene.background=new Tt(1911589),this.cam=new Me(42,1,.1,100),this.yaw=Math.PI/5,this.pitch=.82,this.dist=15,this.scene.add(new Zn(16777215,8943462,1));let n=new Jn(16773328,1);n.position.set(5,10,6),this.scene.add(n);let i=new Tt(t.sign||"#555"),r=new gt(new qt(e.w,.2,e.d),new $t({color:13482904}));r.position.y=-.1,this.scene.add(r);let o=new $t({color:15853519}),a=new gt(new qt(e.w,3.2,.2),o);a.position.set(0,1.6,-e.d/2);let c=new gt(new qt(.2,3.2,e.d),o);c.position.set(-e.w/2,1.6,0);let l=new gt(new qt(e.w,.5,.22),new $t({color:i}));l.position.set(0,2.9,-e.d/2+.02),this.scene.add(a,c,l);let h=new gt(new qt(2.2,.04,.2),new ve({color:16761358}));h.position.set(0,.04,e.d/2),this.scene.add(h),this.stations=new fe,this.scene.add(this.stations),this.people=new fe,this.scene.add(this.people),this.meshes={};for(let u of t.stations)this.addStation(u);this.bind(),this.resize(),this.onResize=()=>this.resize(),addEventListener("resize",this.onResize)}addStation(t){let e=new fe,n=new Tt(t.color||"#888"),i=a=>new $t({color:a}),r=(a,c,l,h,u)=>{let d=new gt(new qt(a,c,l),i(h));return d.position.y=u??c/2,e.add(d),d};if(t.type==="eat")r(3.4,1,.9,n),r(3.5,.12,1,15909198,1.05);else if(t.type==="game"){let a=new gt(new Ne(.95,.95,.12,20),i(n));a.position.y=.8,e.add(a);let c=new gt(new Ne(.12,.2,.8,8),i(4862752));if(c.position.y=.4,e.add(c),t.game==="ayo"){r(1.5,.12,.6,8014370,.92);for(let l=0;l<12;l++){let h=new gt(new dn(.1,8,6),i(2824716));h.position.set(-.62+l%6*.25,1,l<6?.12:-.12),e.add(h)}}else for(let l=0;l<4;l++){let h=r(.34,.03,.5,[14041135,3046865,14721056,3054430][l],.88);h.position.x=-.5+l*.33,h.rotation.y=.2*l-.3}for(let l of[-1.25,1.25]){let h=new gt(new Ne(.28,.28,.5,10),i(3352862));h.position.set(l,.25,0),e.add(h)}}else if(t.type==="board")r(2.4,1.5,.12,n,1.6).position.z=-.1,r(2.2,1.3,.14,998183,1.6).position.z=-.08;else if(t.type==="poster")r(.1,1.4,1.2,n,1.6);else if(t.type==="tv")r(2.8,1.5,.2,1381653,1.8),r(2.6,1.3,.22,2778565,1.8),r(3,.5,.8,7031339,.25);else if(t.type==="car"){let a=Us(t.color||"#888");a.scale.setScalar(.38),a.rotation.y=Math.PI/6,e.add(a),r(1.8,.06,1,14540253,.03)}let o=Qn(`${ru[t.type]||""} ${t.label}`.slice(0,26),"#fff3c4");o.scale.set(2.8,.7,1),o.position.y=t.type==="car"?1.8:t.type==="tv"?3:t.type==="board"?2.8:2.1,e.add(o),e.position.set(t.x,0,t.z),t.type==="poster"&&(e.rotation.y=0),e.traverse(a=>{a.userData.stationId=t.id}),this.stations.add(e),this.meshes[t.id]=e}people_refresh(){this.people.clear();let t=this.data,e=new Set,n=(i,r,o,a)=>{if(e.has(i))return;e.add(i);let c=Ds(r||"#2e9b5e");c.scale.setScalar(.55),c.position.set(o,0,a);let l=Qn("@"+i,"#ffffff");l.scale.set(1.6,.4,1),l.position.y=2.2,c.add(l),this.people.add(c)};for(let i of t.stations)if(i.type==="game"&&i.match){let r=i.match;r.p1&&n(r.p1,null,i.x-1.25,i.z+.5),r.p2&&n(r.p2,null,i.x+1.25,i.z+.5)}for(let i of t.occupants){let r=T0(i.username);n(i.username,i.color,-3+r%7*1,t.room.d/2-1.1-(r>>4)%2*.8)}}chrome(){let t=this.data;this.strip=_("div",{class:"vstrip"}),this.panel=_("div",{class:"vpanel hidden"});let e=_("div",{class:"ihead"},_("div",{},_("h3",{},t.name),_("div",{style:"font-size:13px"},`${t.blurb} \xB7 open ${t.hours[0]}:00 to ${t.hours[1]}:00`),_("div",{class:"tag amber",style:"display:inline-block;margin-top:4px"},"\u{1F3B2} Game money only \xB7 18+")),_("div",{class:"row"},_("button",{class:"btn small red",id:"venueLeave",onclick:()=>this.leave()},"Leave")));this.el.append(e,this.strip,this.panel),this.drawStrip(),this.people_refresh()}drawStrip(){let t=this.data;this.strip.replaceChildren(...t.stations.map(e=>{let n=e.match,i=e.type==="game"?n?n.status==="waiting"?`waiting: @${n.p1}${n.stake?" \xB7 \u20A6"+n.stake:""}`:`${n.p1} vs ${n.p2}`:"free table":e.type==="car"?vt(e.price||0)+" (est.)":"";return _("button",{class:`vst ${n?.you?"mine":""}`,"data-station":e.id,onclick:()=>this.pick(e.id)},`${ru[e.type]||"\u2022"} ${e.label}`,i?_("small",{},i):"")}))}price(t){return this.g.cfg.cars?.[t]?.price??this.catalog?.find(e=>e.id===t)?.price??0}async pick(t){await this.refreshVenue();let e=this.data.stations.find(n=>n.id===t);e&&this.station(e)}async station(t){let e=this.g.ui;if(t.type==="eat"){let n=_("div");e.openSheet(t.label,n),e.shopBlock(n,t.shopId)}else if(t.type==="poster")e.openSheet(t.label,[_("p",{},t.text),_("p",{class:"mut"},"Reports, mutes and blocks work here too: tap a name in the chat.")]);else if(t.type==="tv"){let n=await e.guard(()=>Dt("/api/venue/act",{venueId:this.id,stationId:t.id}));n&&(e.toast(n.text),this.g.net.nudge())}else t.type==="board"?this.board():t.type==="car"?this.carSheet(t):t.type==="game"&&this.sitPanel(t)}async board(t="all"){let e=this.g.ui,n=await e.guard(()=>se("/api/scoreboard"+(t==="all"?"":`?kind=${t}`)));if(!n)return;let i=Math.max(0,n.endsAt-this.g.serverNow()),r=_("div",{class:"chips"},["all","whot","ayo"].map(o=>_("button",{class:`chip ${o===t?"on":""}`,onclick:()=>this.board(o)},o==="all"?"All games":o==="whot"?"Whot":"Ayo")));e.openSheet("Weekly scoreboard",[r,n.rows.length?_("div",{class:"list"},n.rows.map(o=>_("div",{},_("span",{},`${o.rank}. @${o.username}`),_("span",{class:"mut"},`${o.wins}W ${o.draws}D ${o.losses}L \xB7 `),_("b",{},`${o.points} pts`)))):_("p",{class:"mut"},"Nobody has played this week yet. Be the first!"),_("p",{class:"mut"},`${n.scoring} Resets in ${Math.floor(i/864e5)}d ${Math.floor(i%864e5/36e5)}h.`)])}async carSheet(t){let e=this.g.ui,n=await e.guard(()=>se("/api/garage"));if(!n)return;this.catalog=n.catalogue;let i=n.catalogue.find(c=>c.id===t.model),r=n.active,o=n.cars.some(c=>c.model===t.model),a=(c,l)=>_("div",{class:"row sp"},_("span",{class:"mut"},c),_("b",{},l));e.openSheet(i.name,[_("div",{class:"tag amber"},"Placeholder model \xB7 price is an ESTIMATE"),a("Price",vt(i.price)),a("Fuel per 100 m","\u20A6"+(i.perM*100).toFixed(0)+` (borrowed: \u20A6${(n.borrowed.perM*100).toFixed(0)} + \u20A6${n.borrowed.base} tip)`),a("Speed",`${i.speed} (borrowed ${n.borrowed.speed})`),a("Mood on a nice ride",`+${i.mood}`),a("Resale",`about ${Math.round((1-n.resale.firstDriveOffFraction)*100)}% right after purchase, then about ${Math.round(n.resale.perDayDepreciation*100)}% less per day (never below ${Math.round(n.resale.floorFraction*100)}%)`),a("Your car now",r.label),_("button",{class:"btn big alt",disabled:n.cars.length>=n.slots,onclick:async()=>{await e.guard(()=>Dt("/api/garage/buy",{model:i.id,idemKey:crypto.randomUUID?.()}))&&(e.closeSheet(),e.toast(`Congrats! ${i.name} is in your garage \u{1F697}`,"money"),this.g.refreshMe?.())}},o?"Buy another":`Buy \xB7 ${vt(i.price)}`),n.cars.length>=n.slots?_("p",{class:"mut"},"Garage full: sell a car in Phone \u2192 Garage."):""])}sitPanel(t){let e=this.data.stakes,n=0,i=t.match,r=this.g.cfg,o=t.game==="ayo"?"Ayo table":"Whot bench",a=[_("div",{class:"row sp"},_("b",{},`${t.label}`),_("button",{class:"btn small ghost",onclick:()=>this.panel.classList.add("hidden")},"\u2715"))];if(i&&i.you){this.focusMatch(i.id);return}if(i&&i.status==="active")a.push(_("p",{class:"mut"},`Game in progress: @${i.p1} vs @${i.p2}. Try another table.`));else if(i)a.push(_("p",{},`@${i.p1} is waiting for an opponent.`),_("p",{class:"mut"},i.stake?`Stake \u20A6${i.stake} each (game money). Winner takes \u20A6${i.stake*2}.`:"Friendly game: no stake."),_("button",{class:"btn big alt",onclick:()=>this.sit(t,0)},i.stake?`Join \xB7 stake ${vt(i.stake)}`:"Join the game"));else{let c=()=>l.replaceChildren(...e.map(u=>_("button",{class:`chip ${u===n?"on":""}`,onclick:()=>{n=u,c(),h.textContent=u?`Sit and wait \xB7 stake ${vt(u)}`:"Sit and wait \xB7 friendly"}},u?vt(u):"Friendly"))),l=_("div",{class:"chips"}),h=_("button",{class:"btn big alt",onclick:()=>this.sit(t,n)},"Sit and wait \xB7 friendly");c(),a.push(_("p",{class:"mut"},`${o}: sit down and wait for another player to join. Pick a stake (game money, held safely until the game ends).`),l,h)}a.push(_("p",{class:"mut"},"\u{1F3B2} Game money only. No cash value, no cash-out.")),this.showPanel(a)}showPanel(t){this.panel.replaceChildren(...[].concat(t)),this.panel.classList.remove("hidden")}async sit(t,e){let n=await this.g.ui.guard(()=>Dt("/api/game/sit",{venueId:this.id,stationId:t.id,stake:e}));n&&(this.focusMatch(n.id,n),this.g.net.nudge())}focusMatch(t,e){this.matchId=t,e?this.renderMatch(e):this.pollGame()}async pollGame(){if(!this.matchId)return;let t=await se(`/api/game?id=${this.matchId}`).catch(()=>null);t&&this.renderMatch(t)}renderMatch(t){if(this.match=t,this.dismissed.has(t.id))return;this.matchId=t.id;let e=this.g.user?.username,n=[],i=_("div",{class:"row sp"},_("b",{},`${t.kind==="ayo"?"Ayo":"Whot"} \xB7 ${t.p1} vs ${t.p2||"\u2026"}`),_("span",{class:"tag amber"},t.stake?`Stake ${vt(t.stake)} \xB7 pot ${vt(t.pot)}`:"Friendly"));if(n.push(i),t.status==="waiting")n.push(_("p",{},"Waiting for an opponent to sit down\u2026 \u23F3"),_("p",{class:"mut"},"Your stake is held safely and comes back if nobody joins."),_("button",{class:"btn ghost",onclick:()=>this.leaveMatch(t)},"Leave the table"));else if(t.status==="active"){let r=t.board?.mine,o=Math.max(0,Math.ceil((t.deadlineAt-this.g.serverNow())/1e3));n.push(_("div",{class:"row sp"},_("span",{class:r?"tag green":"tag"},r?"\u{1F7E2} Your turn":`\u23F3 @${t.turn}'s turn`),_("span",{class:"mut",id:"gtimer"},`${o}s`))),n.push(t.kind==="ayo"?this.ayoBoard(t):this.whotBoard(t)),n.push(_("div",{class:"row"},_("button",{class:"btn small ghost",onclick:()=>this.g.ui.confirm?.call(this.g.ui,"Resign this game? Your opponent wins the pot.",()=>this.leaveMatch(t))},"\u{1F3F3} Resign")))}else{let r=t.result||{};n.push(_("div",{class:`banner ${r.youWon?"win":r.draw?"draw":"lose"}`},r.cancelled?`Table closed. ${r.why||""}`:r.draw?"\u{1F91D} Draw":r.youWon?`\u{1F3C6} You won! ${t.stake?"+"+vt(t.stake*2):""}`:`You lost. ${r.why||""}`),_("button",{class:"btn alt",onclick:()=>{this.dismissed.add(t.id),this.matchId=null,this.panel.classList.add("hidden"),this.g.net.nudge(),this.refreshVenue()}},"Back to the room")),this.g.refreshMe?.()}n.push(_("p",{class:"mut"},"\u{1F3B2} Game money only.")),this.showPanel(n)}card(t,{onclick:e,disabled:n,mini:i}={}){let[r,o]=Ns[t.s];return _("button",{class:`wcard ${i?"mini":""}`,"data-card":t.id,disabled:!!n,style:`--c:${o}`,onclick:e},_("span",{class:"n"},t.s==="whot"?"20":t.n),_("span",{class:"g"},r))}whotBoard(t){let e=t.board,n=_("div",{class:"whot"}),i=_("div",{class:"row"},_("div",{},_("small",{class:"mut"},"Top card"),this.card(e.top,{disabled:!0})),_("div",{},_("small",{class:"mut"},"Shape to match"),_("div",{class:"shape",style:`color:${Ns[e.shape][1]}`},Ns[e.shape][0])),_("div",{class:"mut"},`Opponent: ${e.oppCount} cards`,_("br"),`Market: ${e.market}`),e.last?_("div",{class:"mut"},this.lastText(t)):""),r=_("div",{class:"hand"},e.hand.map(a=>this.card(a,{disabled:!e.mine||!e.playable.includes(a.id),onclick:()=>a.s==="whot"?this.pickShape(t,a):this.move(t,{card:a.id})}))),o=_("button",{class:"btn small",id:"whotDraw",disabled:!e.mine,onclick:()=>this.move(t,{action:"draw"})},"\u{1F0CF} Draw one card");return n.append(i,r,o),this.shapeBox=_("div",{class:"chips"}),n.append(this.shapeBox),n}lastText(t){let e=t.board.last;if(!e)return"";let n=e.who===t.you?"You":"They";if(e.effect==="draw")return`${n} drew a card.`;let i={hold:"Hold on!",suspend:"Suspension!",pick2:"Pick two!",pick3:"Pick three!",market:"General market!",whot:"Whot!"}[e.effect];return`${n} played ${e.card.replace(/[a-z]+/,"")}${i?" \xB7 "+i:""}`}pickShape(t,e){this.shapeBox.replaceChildren(_("b",{},"Call a shape: "),...["circle","triangle","cross","square","star"].map(n=>_("button",{class:"chip",style:`color:${Ns[n][1]}`,"data-shape":n,onclick:()=>this.move(t,{card:e.id,shape:n})},Ns[n][0]+" "+n)))}ayoBoard(t){let e=t.board,n=t.you==="a"?0:6,i=t.you==="a"?6:0,r=[0,1,2,3,4,5].map(l=>n+l),o=[5,4,3,2,1,0].map(l=>i+l),a=(l,h)=>{let u=l-n,d=h&&e.legal.includes(u);return _("button",{class:`pit ${h?"mine":""} ${d?"legal":""}`,"data-pit":l,disabled:!d,onclick:()=>this.move(t,{house:u})},_("b",{},e.pits[l]))},c=t.you==="a"?"b":"a";return _("div",{class:"ayo"},_("div",{class:"row sp"},_("span",{class:"mut"},`@${c==="a"?t.p1:t.p2} captured: ${e.store[c]}`),_("span",{class:"mut"},e.last?`Last: house ${e.last.house+1}${e.last.captured?` \xB7 captured ${e.last.captured}`:""}`:"")),_("div",{class:"pits"},o.map(l=>a(l,!1))),_("div",{class:"pits"},r.map(l=>a(l,!0))),_("div",{class:"row sp"},_("b",{},`You captured: ${e.store[t.you]} (first to 25 wins)`)))}async move(t,e){let n=await this.g.ui.guard(()=>Dt("/api/game/move",{matchId:t.id,...e}));n?(this.renderMatch(n),this.g.ui.sfx("ok")):this.pollGame()}async leaveMatch(t){let e=await this.g.ui.guard(()=>Dt("/api/game/leave",{matchId:t.id}));this.g.ui.closeSheet(),e?this.renderMatch(e):this.pollGame(),this.refreshVenue()}async refreshVenue(){let t=await se(`/api/venue?id=${this.id}`).catch(()=>null);t&&this.open&&(this.data=t,this.drawStrip(),this.people_refresh())}poll(){clearInterval(this.pt),this.pt=setInterval(async()=>{if(!this.open)return;if(await this.refreshVenue(),this.matchId)await this.pollGame();else{let e=this.data.stations.find(n=>n.match?.you);e&&!this.dismissed.has(e.match.id)&&this.focusMatch(e.match.id)}let t=st("#gtimer");t&&this.match?.status==="active"&&(t.textContent=`${Math.max(0,Math.ceil((this.match.deadlineAt-this.g.serverNow())/1e3))}s`)},1500)}tap(t){let e=this.canvas.getBoundingClientRect(),n=new at((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),i=new Kn;i.setFromCamera(n,this.cam);let r=i.intersectObjects(this.stations.children,!0)[0];if(r){let o=r.object.userData.stationId;this.pick(o)}}bind(){let t=null,e=this.canvas;e.addEventListener("pointerdown",n=>{t={x:n.clientX,moved:0,id:n.pointerId},e.setPointerCapture(n.pointerId)}),e.addEventListener("pointermove",n=>{if(t&&t.id===n.pointerId){let i=n.clientX-t.x;t.x=n.clientX,t.moved+=Math.abs(i),this.yaw=Math.max(Math.PI/5-.7,Math.min(Math.PI/5+.7,this.yaw-i*.006))}}),e.addEventListener("pointerup",n=>{t&&t.moved<8&&this.tap(n),t=null}),e.addEventListener("wheel",n=>{this.dist=Math.max(9,Math.min(24,this.dist+n.deltaY*.02)),n.preventDefault()},{passive:!1}),this.onKey=n=>{this.open&&n.key==="Escape"&&!this.g.ui.sheetOpen&&this.leave()},addEventListener("keydown",this.onKey)}resize(){let t=this.el.clientWidth,e=this.el.clientHeight;this.r.setSize(t,e,!1),this.cam.aspect=t/e,this.cam.updateProjectionMatrix()}loop(){this.open&&(this.cam.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,Math.sin(this.pitch)*this.dist,Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.cam.lookAt(0,.6,.3),this.r.render(this.scene,this.cam),this.raf=requestAnimationFrame(()=>this.loop()))}async leave(){!this.open||!await this.g.ui.guard(()=>Dt("/api/venue/leave"))||(this.open=!1,clearInterval(this.pt),cancelAnimationFrame(this.raf),removeEventListener("keydown",this.onKey),removeEventListener("resize",this.onResize),this.r.dispose(),this.el.classList.add("hidden"),this.el.replaceChildren(),this.g.busy=!1,this.g.ctrl.frozen=!1,this.g.net.nudge(),st("#game").focus())}};var ou=["Tap any building or sign to see it on the map and travel there.","Take a shift at the Corner Mart: the quick task gives +25% if you stop the bar in the green.","Knock at a house when its owner is home. They can let you in.","Land plots grow in value, but omo-onile may come for a levy.","Delivery costs more but works from anywhere.","Press C to hop in your car. Press T to chat."],$c=class{constructor(){this.playing=!1,this.busy=!1,this.user=null,this.clockOffset=0,this.cfg={},this.lastKnocks=null,this.waypoint=null,this.commute=null,this.worldTime=null,this.plots=[],this.props=[],this.shops=[],this.fpsAcc=0,this.activity=""}serverNow(){return Date.now()+this.clockOffset}clockSync(t,e){let n=t+e/2-Date.now();this.clockOffset=this.clockOffset?this.clockOffset*.7+n*.3:n}pos(){return{x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}}progress(t,e){st("#loadBar").style.width=t+"%",e&&(st("#loadTip").textContent=e)}async boot(){try{this.progress(8,"Reaching the server\u2026");let[t,e]=await Promise.all([se("/api/config"),se("/api/city")]);this.cfg=t,this.city=e,e.area=(i,r)=>r>125?"Lagoon Front":i<0&&r<0?"Yaba":i>=0&&r<0?"Ikeja":i<0?"Surulere":"Lekki Phase 1",st("#tagline").textContent=t.tagline||"",document.title=t.name,this.progress(30,"Building the district\u2026"),await new Promise(i=>setTimeout(i,30)),this.renderer=new Yn({canvas:st("#game"),antialias:devicePixelRatio<2,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.camera=new Me(58,1,.5,900),this.camera.position.set(0,14,20),this.world=Yh(e),this.scene=this.world.scene,this.decorate(),this.progress(60,"Putting traffic on the road\u2026"),await new Promise(i=>setTimeout(i,30)),this.traffic=new ro(this.scene,e.trafficLoops),this.walkers=new oo(this.scene,e.zones),this.ghosts=new ao(this.scene),this.ads=new ho(this.world,e,()=>this.serverNow()),this.ui=new uo(this),this.net=new fo(this),this.interior=new po(this),this.venue=new mo(this),this.ctrl=new lo(st("#game"),e,this.world.colliders,"#00a859","You"),this.scene.add(this.ctrl.root),addEventListener("resize",()=>this.resize()),this.resize(),this.bindAuth(),this.progress(85,ou[Math.floor(Math.random()*ou.length)]);let n=await se("/api/me").catch(()=>null);this.progress(100,"Ready!"),await new Promise(i=>setTimeout(i,250)),this.loop(performance.now()),st("#loading").classList.add("hidden"),n?await this.enter(n.user):st("#auth").classList.remove("hidden")}catch(t){console.error(t),st("#loadTip").textContent=t instanceof fn?t.message:"Could not start the game. Is WebGL enabled? Refresh to retry.",st("#loadBar").style.background="#d6402f"}}decorate(){let t=this.scene;this.plotMeshes={};let e=io();for(let i of this.city.plots||[]){let r=new fe,o=new gt(new Re(i.size,i.size).rotateX(-Math.PI/2),new $t({color:15327944,transparent:!0,opacity:.9}));o.position.set(i.x,.12,i.z),r.add(o);let a=new Rs(new Wr(new qt(i.size,.2,i.size)),new qi({color:16761358}));a.position.set(i.x,.2,i.z),r.add(a);let c=new gt(new Ne(.12,.12,4),new $t({color:7036746}));c.position.set(i.x,2,i.z+i.size/2-1),r.add(c);let l=new gt(new Re(2.6,1.6),new ve({color:3523691,side:We}));l.position.set(i.x+1.3,3.2,i.z+i.size/2-1),r.add(l),this.plotMeshes[i.id]={sq:o,flag:l},t.add(r)}let n=this.city.shops.find(i=>i.id==="shop_market");if(n){let i=new gt(new qt(7,.25,4),new $t({color:14043695}));i.position.set(n.x,3,n.z);let r=new gt(new qt(6,1.1,2),new $t({color:9136957}));r.position.set(n.x,.55,n.z+.5);let o=new gt(new qt(5.2,.3,1.2),new $t({color:15185994}));o.position.set(n.x,1.25,n.z+.5),t.add(i,r,o);for(let a of[-3.2,3.2]){let c=new gt(new Ne(.1,.1,3),new $t({color:5592405}));c.position.set(n.x+a,1.5,n.z-1.5),t.add(c)}}for(let i of this.city.venues||[]){let r=Qn(i.name,i.sign||"#333");r.scale.set(8,2,1),r.position.set(i.x,8.5,i.z),t.add(r);let o=new gt(new Ps(1.4,1.9,24).rotateX(-Math.PI/2),new ve({color:16761358,side:We}));o.position.set(i.x,.15,i.z),t.add(o)}this.dest=new gt(new Ps(1.2,1.7,28).rotateX(-Math.PI/2),new ve({color:11816191,side:We})),this.dest.visible=!1,t.add(this.dest)}resize(){let t=innerWidth,e=innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.size={w:t,h:e}}bindAuth(){let t="guest",e=st("#authForm"),n=i=>{t=i,Bc("#authTabs button").forEach(r=>r.classList.toggle("on",r.dataset.t===i)),st("#fUser").classList.toggle("hidden",i==="guest"),st("#fPass").classList.toggle("hidden",i==="guest"),st("#authGo").textContent={guest:"Play as guest",signup:"Create account",login:"Log in"}[i],st("#authErr").textContent=""};n("guest"),Bc("#authTabs button").forEach(i=>i.onclick=()=>n(i.dataset.t)),e.onsubmit=async i=>{i.preventDefault();let r=new FormData(e),o=st("#age18").checked;if(st("#authErr").textContent="",t!=="login"&&!o){st("#authErr").textContent="You must confirm you are 18 or older to play.";return}let a=st("#authGo");a.disabled=!0;try{let c=await Dt(`/api/auth/${t}`,{username:r.get("username"),password:r.get("password"),age18:o});st("#auth").classList.add("hidden"),await this.enter(c.user)}catch(c){st("#authErr").textContent=c.message}finally{a.disabled=!1}}}async enter(t){this.playing=!0,this.user=t,st("#hud").classList.remove("hidden"),this.cfg.jobs=(await se("/api/jobs").catch(()=>({jobs:[]}))).jobs,this.ctrl.setLook(t.color,t.username);let e=this.city.spawns,n=e[t.id%e.length],i=t.pos&&(t.pos.x||t.pos.z)?t.pos:null;this.ctrl.teleport(i?.x??n.x,i?.z??n.z),this.ctrl.ry=n.ry||0,this.ctrl.camYaw=this.ctrl.ry,this.camera.position.set(this.ctrl.x-10,12,this.ctrl.z+12),this.update(t),this.net.start(),this.refreshProps(),se("/api/plots").then(r=>{this.plots=r.plots,this.refreshPlots()}).catch(()=>{}),this.ui.toast(t.guest?`Welcome, ${t.username}! You are playing as a guest.`:`Welcome back, ${t.username}!`),!localStorage.getItem("na_tip")&&!matchMedia("(pointer: coarse)").matches&&(localStorage.setItem("na_tip","1"),setTimeout(()=>{this.ui.sheetOpen||this.ui.toast("Tip: tap a building or the ground near a sign to open its sheet.")},1800))}async refreshProps(){let t=await se("/api/properties").catch(()=>null);t&&(this.props=t.properties,this.world.setMarkers(t.properties))}refreshPlots(){for(let t of this.plots){let e=this.plotMeshes[t.id];e&&e.flag.material.color.setHex(t.status==="available"?3523691:t.status==="yours"?16761358:9080728)}}async refreshMe(){let t=await se("/api/me").catch(()=>null);t?.user&&this.update(t.user)}update(t){t&&(this.user=t,this.ui.hud(t))}sessionLost(){this.playing&&(this.playing=!1,this.net.stop(),st("#hud").classList.add("hidden"),this.ui.closeSheet(),st("#auth").classList.remove("hidden"),st("#authErr").textContent="Your session ended. Please sign in again.")}async logout(){await Dt("/api/auth/logout").catch(()=>{}),this.playing=!1,this.net.stop(),location.reload()}setConn(t){st("#conn").classList.toggle("hidden",t)}markRead(){this.ui.badge(0),this.unread=0}toggleCar(){if(!this.playing||this.busy)return;let t=this.ctrl.toggleCar();this.ui.sfx(t==="drive"?"horn":"ok"),this.net.nudge()}onHeartbeat(t){this.update(t.me),this.worldTime=t.world,this.ui.clock(t.world),this.world.setTime(t.world.minutesOfDay),this.ghosts.ingest(t.players,this.serverNow()),this.ads.setSnapshot(t.ads);for(let e of t.chat||[])this.ui.addChat(e.u,e.t,e.id);for(let e of t.notifs||[])["knock","dm","knock_in","knock_no"].includes(e.kind),this.unread=(this.unread||0)+1,this.ui.toast(e.text,["omo_onile"].includes(e.kind)?"bad":e.kind==="dm"?"":"money");this.ui.badge(this.unread||0),this.lastKnocks=t.knocks;for(let e of t.knocks?.incoming||[])this.ui.hostKnock(e);t.teleport&&!t.teleport.travelMs&&!this.commute&&this.ctrl.teleport(t.teleport.x,t.teleport.z),t.me.shift&&t.me.shift.endsAt<=this.serverNow()&&this.lastShiftDone!==t.me.shift.id&&(this.lastShiftDone=t.me.shift.id,this.ui.toast("Shift done! Open the job sheet to collect your pay.","money"))}onPush(t){t.kind==="knock"&&this.ui.sfx("knock")}nearest(t=18){let e=null,n=t,i=this.ctrl.x,r=this.ctrl.z;for(let o of this.city.places){let a=Math.hypot(o.x-i,o.z-r);a<n&&(n=a,e=o)}return e?{place:e,d:n}:null}tapPlace(t,e){let n=new at(t/this.size.w*2-1,-(e/this.size.h)*2+1),i=new Kn;i.setFromCamera(n,this.camera);let r=Object.values(this.world.boards).map(u=>u.panel),o=i.intersectObjects(r,!1)[0];if(o){let u=Object.keys(this.world.boards).find(d=>this.world.boards[d].panel===o.object);if(u)return this.ui.board(u)}let a=-i.ray.origin.y/i.ray.direction.y;if(!(a>0))return;let c=i.ray.origin.clone().addScaledVector(i.ray.direction,a),l=null,h=20;for(let u of this.city.places){let d=Math.hypot(u.x-c.x,u.z-c.z);d<h&&(h=d,l=u)}for(let u of this.city.properties){let d=this.city.buildings.find(f=>f.id===u.buildingId);if(d&&Math.abs(c.x-d.x)<d.w/2+2&&Math.abs(c.z-d.z)<d.d/2+2){l=this.city.places.find(f=>f.id===u.id);break}}l?(this.ui.sfx("ok"),this.ui.place(l.id)):this.setWaypoint(c.x,c.z,"Tapped spot")}doAction(){if(!this.playing||this.busy||this.ui.sheetOpen)return;let t=this.nearBoard||null,e=this.nearest(this.actionRange||18);e?this.ui.place(e.place.id):t&&this.ui.board(t)}setWaypoint(t,e,n){this.waypoint={x:t,z:e,label:n},this.dest.visible=!0,this.dest.position.set(t,.3,e)}enterHome(){Dt("/api/property/enter").then(()=>this.interior.show(this.user.home.id)).catch(t=>this.ui.error(t))}async enterAsVisitor(t){this.ui.sfx("ok"),await this.interior.show(t,!0)}runCommute(t,e,n){this.busy=!0,this.ctrl.frozen=!0,this.commute={t0:performance.now(),dur:t.seconds*1e3,from:t.from,to:t.to,mode:t.mode},st("#commute").classList.remove("hidden"),st("#commuteTitle").textContent=`${{keke:"\u{1F6FA} Keke",danfo:"\u{1F68C} Danfo",car:"\u{1F697} Your car"}[t.mode]} to ${e.name}`,st("#commuteSub").textContent=`${n.traffic}${t.fare?" \xB7 "+this.fmt(t.fare):""}`,this.ui.sfx("horn"),this.ui.toast(Oe("travel",t.fare)),this.ctrl.mode=t.mode==="car"?"drive":"walk",this.ctrl.applyMode();let i=t.to.x-t.from.x,r=t.to.z-t.from.z;this.ctrl.ry=Math.atan2(-r,i),this.ctrl.camYaw=this.ctrl.ry,this.net.trail.length=0}fmt(t){return"\u20A6"+Math.round(t).toLocaleString("en-NG")}stepCommute(t){let e=this.commute;if(!e)return!1;let n=Math.min(1,(t-e.t0)/e.dur),i=n<.5?2*n*n:1-Math.pow(-2*n+2,2)/2;return this.ctrl.x=e.from.x+(e.to.x-e.from.x)*i,this.ctrl.z=e.from.z+(e.to.z-e.from.z)*i,this.ctrl.v=0,this.ctrl.root.position.set(this.ctrl.x,0,this.ctrl.z),this.ctrl.root.rotation.y=this.ctrl.ry,st("#commuteBar").style.width=n*100+"%",n>=1&&(this.commute=null,this.busy=!1,this.ctrl.frozen=!1,this.ctrl.mode="walk",this.ctrl.applyMode(),st("#commute").classList.add("hidden"),this.ctrl.teleport(e.to.x,e.to.z),this.ui.sfx("ok"),this.ui.toast("You have arrived."),this.net.nudge(),this.waypoint=null,this.dest.visible=!1),!0}loop(t){let e=t;this.lastSample=0;let n=i=>{requestAnimationFrame(n);let r=Math.min(.1,(i-e)/1e3);if(e=i,!this.playing){this.idleCam(i),this.renderer.render(this.scene,this.camera);return}if(this.interior.open||this.venue.open)return;let o=this.serverNow()/1e3;if(this.traffic.update(o),this.walkers.update(o),this.ghosts.update(this.serverNow()-1100),this.world.animate(r*1e3),this.stepCommute(i)?this.ctrl.placeCamera(this.camera,r):this.ctrl.update(r),this.commute||(this.ctrl.placeCamera(this.camera,r),i-this.lastSample>250&&(this.lastSample=i,this.net.sample({t:this.serverNow(),x:this.ctrl.x,z:this.ctrl.z,ry:this.ctrl.ry}))),this.ctrl.lastTap&&!this.ui.sheetOpen&&!this.busy){let a=this.ctrl.lastTap;this.ctrl.lastTap=null,i-a.t<400&&this.tapPlace(a.x,a.y)}this.ads.update(this.camera,this.size,this.ctrl,r*1e3),this.hudStep(i),this.renderer.render(this.scene,this.camera)};requestAnimationFrame(n)}idleCam(t){let e=t/9e3;this.camera.position.set(Math.cos(e)*70,38,Math.sin(e)*70-20),this.camera.lookAt(0,4,-20),this.camera.updateMatrixWorld()}hudStep(t){if(t-(this.hudT||0)<200)return;this.hudT=t;let e=this.ctrl,n=this.nearest(this.actionRange||18),i=this.ads.nearest(e.x,e.z,30);this.nearBoard=i;let r=this.city.area(e.x,e.z),o=this.roadName(e.x,e.z);this.ui.loc(`\u{1F4CD} ${n?n.place.name:o||r}${n||o?" \xB7 "+r:""}`);let a=null;if(n&&!this.ui.sheetOpen){let c=n.place;if(a={shop:`\u{1F6D2} ${c.name}`,job:"\u{1F4BC} Work here",house:`\u{1F3E0} ${c.name}`,plot:`\u{1F30D} ${c.name}`,landmark:`\u{1F4CD} ${c.name}`}[c.type],c.type==="shop"){let l=this.shops.find(h=>h.id===c.id);l&&!l.status.open&&(a=`\u{1F512} ${c.name}: ${l.status.text}`)}}else i&&!this.ui.sheetOpen&&(a="\u{1F4E2} Billboard");if(this.ui.action(this.busy?null:a),this.waypoint){let c=Math.hypot(this.waypoint.x-e.x,this.waypoint.z-e.z);c<5&&(this.waypoint=null,this.dest.visible=!1,this.ui.toast("You have arrived.")),this.ui.waypoint(this.waypoint,c)}else this.ui.waypoint(null);this.dest.visible&&this.dest.scale.setScalar(1+Math.sin(t/200)*.15),this.ui.minimap(e,this.city,this.ghosts,this.waypoint),this.user?.shift&&this.ui.hud(this.user),this.activity=e.mode}roadName(t,e){for(let n of this.city.roads)if(n.z1===n.z2?Math.abs(e-n.z1)<n.width/2&&t>=Math.min(n.x1,n.x2)&&t<=Math.max(n.x1,n.x2):Math.abs(t-n.x1)<n.width/2&&e>=Math.min(n.z1,n.z2)&&e<=Math.max(n.z1,n.z2))return n.name||"On the road";return null}},au=new $c;window.__game=au;au.boot();})();
