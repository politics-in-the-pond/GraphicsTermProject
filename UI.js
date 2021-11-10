
// AssetLoader
// AssetLoader.add.webFont('webFont', 'fonts/web-font.css');
// AssetLoader.add.image('sprites/asset-active.png');
// AssetLoader.add.spriteSheet('sprites/sheet.png', 'sprites/sheet.json');
// AssetLoader.add.bitmapText('fonts/bitmap-font.png', 'fonts/bitmap-font.json');
// Set a progress listener, can be used to create progress bars

class UI{
      constructor(renderer){
        this.instance = new ThreeUI(renderer.domElement, 720);
        this.loadBox();
      }

      loadBox()
      {
        var sprite = this.instance.createRectangle('#FF6D92', 0, 0, 500, 100);
        sprite.alpha = 1; // Default
        sprite.x = 50;
        sprite.y = 50;
        sprite.pivot.x = 0.5; // Default
        sprite.pivot.y = 0.5; // Default
        sprite.anchor.x = ThreeUI.anchors.left; // Default
        sprite.anchor.y = ThreeUI.anchors.top; // Default
      }
    }
    export { UI };