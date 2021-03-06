param($installPath, $toolsPath, $package, $project)

$path = [System.IO.Path]
$rootName = "gallery-sm-menu"
$projectRoot = $path::GetDirectoryName($project.FileName)
$galleryPath = $path::Combine($projectRoot, "Scripts\yui3-gallery\build\$rootName")
$extension = ".js"
$archivePath = "$galleryPath\previous"

if (!(test-path -path $galleryPath))
{
    write-host "Creating path $galleryPath"
    new-item $galleryPath -type directory
}

foreach($fileSuffix in $extension, "-debug$extension", "-min$extension")
{
    $fileName = "$rootName$fileSuffix"
    $filePath = "$galleryPath\$fileName"

    if(test-path -path $filePath)
    {
        if(!(test-path -path $archivePath))
        {
            write-host "Creating path $archivePath"
            new-item $archivePath -type directory
        }
        
        write-host "Moving $filePath to $archivePath\$fileName"
        move-item $filePath "$archivePath\$fileName"
    }

	write-host "Moving $toolsPath\$fileName to $galleryPath\$fileName"
	move-item "$projectRoot\$fileName" "$galleryPath\$fileName"
        
    try
    {
        $project.ProjectItems.Item($fileName).Remove()
        write-host "Removed $fileName from Project"
    }
    catch
    {
        write-host "Error removing $fileName from Project: $($_.Exception.Message)"
    }
}