class ConsoleOutput {
  _console= console;
  createLog (util) {
    return (...args) => {
      const fun = this._console[util] ? this._console[util] : this._console.log;
      fun.apply(void 0, args);
    };
  }

  log (...args) {
    this.createLog('log')(...args);
  }

  /**
   * 输出版本
   * @param {String} title 标题
   * @param {String} version 版号
   */
  versionLog (title, version) {
    this.createLog('log')(
      `%c ${title} %c V${version} `,
      'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;',
      'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
    );
  }

  /**
   * 错误追踪
   * @param {String} message 错误信息
   */
  errorTrace (message) {
    this.createLog('trace')(
      `%c[ERROR]%c ${message} `,
      'background: #FCEEE0; color: #FF5066; font-weight: bolder;',
      'color: #EA3322;'
    );
  }

  /**
   * 错误
   * @param {String} message 错误信息
   */
  error (message) {
    this.createLog('error')(
      `%c[ERROR]%c ${message} `,
      'color: #FF5066; font-weight: bolder;',
      'color: #EA3322;'
    );
  }

  /**
   * 警告
   * @param {String} message 错误信息
   */
  warn (message) {
    this.createLog('warn')(
      `%c[WARN]%c ${message} `,
      'color: #DC933D; font-weight: bolder;',
      'color: #000;'
    );
  }

  /**
   * @type 贪吃蛇定制信息
   * 死亡
   * @param {String} message 死亡信息
   * @param {Number} score 分数
   */
  snakeDie (message, score) {
    this.createLog('log')(
      `%c[死亡]%c ${message}, 最终分数 ${score}`,
      'background:#FEFBE7; color: #DC933D; font-weight: bolder;',
      'background:#FEFBE7; color: #000;'
    );
  }
}

export default new ConsoleOutput();