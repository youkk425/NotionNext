/**
 * Endspace 主题专用图标集（内联 SVG，替代 remixicon-react）
 *
 * 背景：remixicon-react@1.0.0 是纯 CJS 老包，生产构建（webpack tree-shaking）
 * 对 default import 的 interop 处理会导致 "X is not defined"，
 * 使主题在服务端加载失败并回退 example（本地 dev 正常，生产必现）。
 * 内联 SVG 组件完全自包含，无第三方依赖，props 与 remixicon 原组件兼容。
 */
export const GithubFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z' />
  </svg>
)

export const WeiboFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M17.525 11.378c1.263.392 2.669 1.336 2.669 3.004 0 2.763-3.98 6.239-9.964 6.239-4.565 0-9.23-2.213-9.23-5.852 0-1.902 1.204-4.102 3.277-6.177 2.773-2.77 6.004-4.033 7.219-2.816.537.537.588 1.464.244 2.572-.178.557.525.25.525.25 2.24-.938 4.196-.994 4.909.027.38.543.343 1.306-.008 2.19-.163.407.048.471.36.563zm-7.282 7.939c3.641-.362 6.401-2.592 6.167-4.983-.237-2.391-3.382-4.038-7.023-3.677-3.64.36-6.403 2.59-6.167 4.98.237 2.394 3.382 4.039 7.023 3.68zM6.16 14.438c.754-1.527 2.712-2.39 4.446-1.94 1.793.463 2.707 2.154 1.976 3.8-.744 1.682-2.882 2.578-4.695 1.993-1.752-.566-2.493-2.294-1.727-3.853zm1.446 2.587c.568.257 1.325.013 1.676-.55.346-.568.163-1.217-.407-1.459-.563-.237-1.291.008-1.64.553-.354.547-.189 1.202.371 1.456zm2.206-1.808c.219.092.501-.012.628-.231.123-.22.044-.466-.178-.548-.216-.084-.486.018-.613.232-.123.214-.054.458.163.547zM19.873 9.5a.725.725 0 1 1-1.378-.451 1.38 1.38 0 0 0-.288-1.357 1.395 1.395 0 0 0-1.321-.425.723.723 0 1 1-.303-1.416 2.836 2.836 0 0 1 3.29 3.649zm-3.916-6.575A5.831 5.831 0 0 1 21.5 4.72a5.836 5.836 0 0 1 1.22 5.704.838.838 0 0 1-1.06.54.844.844 0 0 1-.542-1.062 4.143 4.143 0 0 0-4.807-5.327.845.845 0 0 1-.354-1.65z' />
  </svg>
)

export const BilibiliFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.18.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0zm.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.199 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25zm-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25zm7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25z' />
  </svg>
)

export const TelegramFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.11-8.83l.013-.007.87 2.87c.112.311.266.367.453.341.188-.025.287-.126.41-.244l1.188-1.148 2.55 1.888c.466.257.801.124.917-.432l1.657-7.822c.183-.728-.137-1.02-.702-.788l-9.733 3.76c-.664.266-.66.638-.12.803l2.497.78z' />
  </svg>
)

export const InstagramFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' />
  </svg>
)

export const YoutubeFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z' />
  </svg>
)

export const LinkedinBoxFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z' />
  </svg>
)

export const WechatFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M18.574 13.711a.91.91 0 0 0 .898-.898c0-.498-.399-.898-.898-.898s-.898.4-.898.898c0 .5.4.898.898.898zm-4.425 0a.91.91 0 0 0 .898-.898c0-.498-.4-.898-.898-.898-.5 0-.898.4-.898.898 0 .5.399.898.898.898zm6.567 5.04a.347.347 0 0 0-.172.37c0 .048 0 .097.025.147.098.417.294 1.081.294 1.106 0 .073.025.122.025.172a.22.22 0 0 1-.221.22c-.05 0-.074-.024-.123-.048l-1.449-.836a.799.799 0 0 0-.344-.098c-.073 0-.147 0-.196.024-.688.197-1.4.295-2.161.295-3.66 0-6.607-2.457-6.607-5.505 0-3.047 2.947-5.505 6.607-5.505 3.659 0 6.606 2.458 6.606 5.505 0 1.647-.884 3.146-2.284 4.154zM16.673 8.099a9.105 9.105 0 0 0-.28-.005c-4.174 0-7.606 2.86-7.606 6.505 0 .554.08 1.09.228 1.6h-.089a9.963 9.963 0 0 1-2.584-.368c-.074-.025-.148-.025-.222-.025a.832.832 0 0 0-.418.123l-1.748 1.005c-.05.025-.099.05-.148.05a.273.273 0 0 1-.27-.27c0-.074.024-.123.049-.197.024-.024.246-.834.369-1.324 0-.05.024-.123.024-.172a.556.556 0 0 0-.221-.442C2.058 13.376 1 11.586 1 9.598 1 5.945 4.57 3 8.95 3c3.765 0 6.93 2.169 7.723 5.098zm-5.154.418c.573 0 1.026-.477 1.026-1.026 0-.573-.453-1.026-1.026-1.026s-1.026.453-1.026 1.026.453 1.026 1.026 1.026zm-5.26 0c.573 0 1.027-.477 1.027-1.026 0-.573-.454-1.026-1.027-1.026-.572 0-1.026.453-1.026 1.026s.454 1.026 1.026 1.026z' />
  </svg>
)

export const GlobeFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M13 21h5v2H6v-2h5v-1.05a10.002 10.002 0 0 1-7.684-4.988l1.737-.992A8 8 0 1 0 15.97 3.053l.992-1.737A9.996 9.996 0 0 1 22 10c0 5.185-3.947 9.449-9 9.95V21zm-1-4a7 7 0 1 1 0-14 7 7 0 0 1 0 14z' />
  </svg>
)

export const MailFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z' />
  </svg>
)

export const ListCheck2Icon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M11 4h10v2H11V4zm0 4h6v2h-6V8zm0 6h10v2H11v-2zm0 4h6v2h-6v-2zM3 4h6v6H3V4zm2 2v2h2V6H5zm-2 8h6v6H3v-6zm2 2v2h2v-2H5z' />
  </svg>
)

export const CloseFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
  </svg>
)

export const TimeFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-10V7h-2v7h6v-2h-4z' />
  </svg>
)

export const FolderFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2z' />
  </svg>
)

export const PriceTag3FillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm2.828 8.486a2 2 0 1 0 2.828-2.829 2 2 0 0 0-2.828 2.829z' />
  </svg>
)

export const BellFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M13.414 10.586l.48.486.465.485.459.492c3.458 3.764 5.472 7.218 4.607 8.083-.4.4-1.356.184-2.64-.507a9.006 9.006 0 0 1-10.403-.592l2.98-2.98a2 2 0 1 0-1.45-1.569l.035.155-2.979 2.98a9.007 9.007 0 0 1-.592-10.405c-.692-1.283-.908-2.238-.508-2.639.977-.976 5.25 1.715 9.546 6.01zm6.364-6.364a2 2 0 0 1-.164 2.976 9.015 9.015 0 0 1 .607 8.47c-1.189-1.954-3.07-4.174-5.393-6.496l-.537-.532c-2.128-2.079-4.156-3.764-5.958-4.86a9.015 9.015 0 0 1 8.471.607 2 2 0 0 1 2.974-.165z' />
  </svg>
)

export const RadarFillIcon = ({ size = 24, color = 'currentColor', className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={'remixicon-icon' + (className ? ' ' + className : '')}
    {...rest}>
    <path d='M14.368 4.398l-3.484 6.035 1.732 1L16.1 5.398c4.17 2.772 6.306 7.08 4.56 10.102-1.86 3.222-7.189 3.355-11.91.63C4.029 13.402 1.48 8.721 3.34 5.5c1.745-3.023 6.543-3.327 11.028-1.102zm1.516-2.625l1.732 1-1.5 2.598-1.732-1 1.5-2.598zM6.732 20H17v2H5.017a.995.995 0 0 1-.883-.5 1.005 1.005 0 0 1 0-1l2.25-3.897 1.732 1L6.732 20z' />
  </svg>
)
