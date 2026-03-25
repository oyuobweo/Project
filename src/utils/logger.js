/**
 * @file logger.js
 * @description 마스터 룰 4번(에러 및 관측성) 규격 준수 로그 시스템
 * 포맷: [Time] [Level] [Module] [ErrorCode] Message
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

export const createLogger = (moduleName) => {
  const formatMessage = (level, message, errorCode = '000', data = null) => {
    const time = new Date().toISOString();
    const baseMsg = `[${time}] [${level}] [${moduleName}] [${errorCode}] ${message}`;
    return data ? `${baseMsg} | Data: ${JSON.stringify(data)}` : baseMsg;
  };

  return {
    info: (msg, data) => console.log(formatMessage(LOG_LEVELS.INFO, msg, '000', data)),
    warn: (msg, errorCode, data) => console.warn(formatMessage(LOG_LEVELS.WARN, msg, errorCode, data)),
    error: (msg, errorCode, data) => console.error(formatMessage(LOG_LEVELS.ERROR, msg, errorCode, data)),
    debug: (msg, data) => console.debug(formatMessage(LOG_LEVELS.DEBUG, msg, '000', data))
  };
};
