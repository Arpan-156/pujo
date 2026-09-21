$path = 'C:\Users\ARPAN\.gemini\antigravity\brain\5c5a48db-e22f-4c84-90bb-dbde5fafe87b\.user_uploaded\media_1789982171626.jpg'
$dest = 'c:\Users\ARPAN\Downloads\pujo-source\pujo\public\images\panchami.jpg'

Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($path)
Write-Host "Width: $($img.Width), Height: $($img.Height)"

# Crop bottom 60 pixels to remove watermark
$cropHeight = $img.Height - 60
$bmp = New-Object System.Drawing.Bitmap $img.Width, $cropHeight
$g = [System.Drawing.Graphics]::FromImage($bmp)
$rect = New-Object System.Drawing.Rectangle 0, 0, $img.Width, $cropHeight
$g.DrawImage($img, $rect, 0, 0, $img.Width, $cropHeight, [System.Drawing.GraphicsUnit]::Pixel)

$bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Host "Cropped and saved to $dest"

