import Utils from "../lib/Utils.js";

const ease = 
{
  exponentialIn: (t) => {
    return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: (t) => {
    return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: (t) => {
    return t == 0.0 || t == 1.0
      ? t
      : t < 0.5
        ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
  },
  sineOut: (t) => {
    const HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: (t) => {
    return t < 0.5
        ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
        : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: (t) => {
    return t * t * t;
  },
  cubicOut: (t) => {
    const f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: (t) => {
    return t < 0.5
      ? 4.0 * t * t * t
      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: (t) => {
    return -t * (t - 2.0);
  },
  quarticOut: (t) => {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  },
}

class De_Menu extends HTMLElement
{
  static tname = "de-menu";
    
  constructor()
  {
    super();
    Utils.Bind(this, "On_");

    this.numPoints = 2;
    this.duration = 600;
    this.delayPointsArray = [];
    this.delayPointsMax = 0;
    this.delayPerPath = 200;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
  }

  connectedCallback()
  {
    this.Render();
  }

  // public methods ===============================================================================

  Toggle() 
  {
    if (this.isOpened === false) 
    {
      this.Open();
    } 
    else 
    {
      this.Close();
    }
  }

  Open() 
  {
    if (!this.isAnimating) 
    {
      this.Init_Animation();
      this.isOpened = true;
      this.elm.classList.add('is-opened');
      document.body.classList.add('overflow-hidden');
      this.Do_Animation();
    }
  }

  Close() 
  {
    if (!this.isAnimating) 
    {
      this.Init_Animation();
      this.isOpened = false;
      this.elm.classList.remove('is-opened');
      document.body.classList.remove('overflow-hidden');
      this.Do_Animation();
    }
  }

  Init_Animation()
  {
    this.isAnimating = true;
    for (var i = 0; i < this.numPoints; i++) 
    {
      this.delayPointsArray[i] = 0;
    }
  }

  Do_Animation()
  {
    this.timeStart = Date.now();
    this.Render_Loop();
    if (this.isOpened === true) 
    {
      this.elmHamburger.classList.add('is-opened-navi');
      for (var i = 0; i < this.gNavItems.length; i++) 
      {
        this.gNavItems[i].classList.add('is-opened');
      }
    } 
    else 
    {
      this.elmHamburger.classList.remove('is-opened-navi');
      for (var i = 0; i < this.gNavItems.length; i++) 
      {
        this.gNavItems[i].classList.remove('is-opened');
      }
    }
  }

  // events =======================================================================================

  On_Click_Menu()
  {
    this.Toggle();
  }

  // rendering ====================================================================================

  Update_Path(time) 
  {
    const points = [];
    for (var i = 0; i < this.numPoints; i++) 
    {
      const thisEase = this.isOpened ? 
                        (i == 1) ? ease.cubicOut : ease.cubicInOut:
                        (i == 1) ? ease.cubicInOut : ease.cubicOut;
      points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100;
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (var i = 0; i < this.numPoints - 1; i++) 
    {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
    return str;
  }

  Render_Frame() 
  {
    if (this.isOpened) 
    {
      for (var i = 0; i < this.path.length; i++) 
      {
        this.path[i].setAttribute('d', this.Update_Path(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } 
    else 
    {
      for (var i = 0; i < this.path.length; i++) 
      {
        this.path[i].setAttribute('d', this.Update_Path(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }

  Render_Loop() 
  {
    this.Render_Frame();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) 
    {
      requestAnimationFrame(() => { this.Render_Loop(); });
    }
    else 
    {
      this.isAnimating = false;
    }
  }

  Render()
  {
    const html = `
      <div class="hamburger" id="hamburger">
        <div class="hamburger__line hamburger__line--01">
          <div class="hamburger__line-in hamburger__line-in--01"></div>
        </div>
        <div class="hamburger__line hamburger__line--02">
          <div class="hamburger__line-in hamburger__line-in--02"></div>
        </div>
        <div class="hamburger__line hamburger__line--03">
          <div class="hamburger__line-in hamburger__line-in--03"></div>
        </div>
        <div class="hamburger__line hamburger__line--cross01">
          <div class="hamburger__line-in hamburger__line-in--cross01"></div>
        </div>
        <div class="hamburger__line hamburger__line--cross02">
          <div class="hamburger__line-in hamburger__line-in--cross02"></div>
        </div>
      </div>

      <ul class="hamburger-navigation">
        <li><a id="option_home" href="index.html">Home</a></li>
        <li><a id="option_projects" href="projects.html">Projects</a></li>
        <li><a id="option_prod_tree" href="components_tree.html"">Content</a></li>
        <li><a id="option_products" href="products.html">Products</a></li>
        <li><a id="option_user" href="user.html">Account</a></li>
        <li><a id="option_signin">Sign In</a></li>
        <li><a id="option_signout">Sign Out</a></li>
      </ul>

      <svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path class="shape-overlays__path" d=""></path>
        <path class="shape-overlays__path" d=""></path>
        <path class="shape-overlays__path" d=""></path>
      </svg>
    `;
    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.Set_Id_Shortcuts(this, this);

    this.elmHamburger = this.querySelector('.hamburger');
    this.gNavItems = this.querySelectorAll('.hamburger-navigation');
    this.elm = this.querySelector('.shape-overlays');
    this.path = this.elm.querySelectorAll('path');
    this.sign_in = this.querySelector('#sign_in');
    this.sign_out = this.querySelector('#sign_out');

    this.elmHamburger.addEventListener("click", this.On_Click_Menu);
  }
}

Utils.Register_Element(De_Menu);

export default De_Menu;
